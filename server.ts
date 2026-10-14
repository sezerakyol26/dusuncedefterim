import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

// Ensure Gemini API Key is available
const defaultApiKey = process.env.GEMINI_API_KEY;
if (!defaultApiKey) {
  console.warn("Bilgilendirme: GEMINI_API_KEY henüz ayarlanmamış. Dahili akıllı Türkçe CBT ve farkındalık motoru aktif.");
}

function getAI(clientKey?: string): GoogleGenAI | null {
  const key = clientKey || process.env.GEMINI_API_KEY;
  if (!key || !key.trim()) {
    return null;
  }
  try {
    return new GoogleGenAI({
      apiKey: key.trim(),
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  } catch (err) {
    console.warn("GoogleGenAI başlatılamadı:", err);
    return null;
  }
}

const app = express();
const PORT = 3000;

app.use(express.json());

// 1. API: Generate Daily Inspiring Quote & Writing Prompt
app.get("/api/generate-prompt", async (req, res) => {
  const customKey = req.headers["x-gemini-api-key"] as string | undefined;
  const ai = getAI(customKey);

  if (ai) {
    try {
      const promptText = `Kişisel gelişim, farkındalık (mindfulness) veya psikoloji alanında derinlik katan, ilham verici Türkçe bir alıntı/özlü söz üret. Ayrıca bu sözü tamamlayan veya derinleştiren yararlı bir günlük tutma (journaling) sorusu eşleştir.
      Toksik olumlama (toxic positivity) yapmaktan kaçın, bunun yerine gerçekçi ve şefkatli bir dil kullan. Yanıtı JSON formatında ver.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: promptText,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              quote: {
                type: Type.STRING,
                description: "İlham verici alıntı veya özlü sözün kendisi (Türkçe)"
              },
              author: {
                type: Type.STRING,
                description: "Sözü söyleyen kişi veya kaynağı. Bulunamazsa 'Anonim' veya 'Bilinmeyen'"
              },
              journalPrompt: {
                type: Type.STRING,
                description: "Bugünkü düşünce defteri için ilham verici, derin ve şefkatli sorgulama sorusu"
              }
            },
            required: ["quote", "author", "journalPrompt"]
          }
        }
      });

      const data = JSON.parse(response.text?.trim() || "{}");
      if (data.quote && data.journalPrompt) {
        return res.json(data);
      }
    } catch (error: any) {
      console.warn("Gemini generate-prompt error, using fallback:", error.message);
    }
  }

  // High quality fallback
  const fallbackQuotes = [
    {
      quote: "Kendinizi dinlemek, hayatın gürültüsü içinde duyabileceğiniz en güzel fısıltıdır.",
      author: "Farkındalık Bilgeliği",
      journalPrompt: "Bugün zihninizin arka planında en çok hangi düşünce veya kaygının yankılandığını fark ediyorsunuz?"
    },
    {
      quote: "Bulutlar gelir ve gider. Gökyüzü ise her zaman oradadır ve sakindir.",
      author: "Pema Chödrön",
      journalPrompt: "Şu an gelip geçici olan hangi düşünceyi kalıcı sanarak kendinizi yoruyorsunuz?"
    },
    {
      quote: "Kendine şefkat göstermek, başarısızlığı kabul etmek değil; insan olduğunu hatırlamaktır.",
      author: "Dr. Kristin Neff",
      journalPrompt: "Bugün kendinize söylemeye en çok ihtiyaç duyduğunuz şefkatli cümle nedir?"
    }
  ];
  const chosen = fallbackQuotes[Math.floor(Math.random() * fallbackQuotes.length)];
  res.json(chosen);
});

// 2. API: Cognitive Reframer (Bilişsel Yeniden Çerçeveleme)
app.post("/api/generate-reframe", async (req, res) => {
  const { original } = req.body;
  if (!original || typeof original !== "string") {
    res.status(400).json({ error: "original thought is required and must be a string." });
    return;
  }

  const customKey = req.headers["x-gemini-api-key"] as string | undefined;
  const ai = getAI(customKey);

  if (ai) {
    try {
      const promptText = `Kullanıcı şu olumsuz veya kendini sabote eden (bilişsel çarpıtma içeren) düşüncesini paylaştı: "${original}".
      Lütfen bunu Bilişsel Davranışçı Terapi (CBT) yaklaşımlarına dayanarak analiz et. Boş ve samimiyetsiz bir iyimserlik sunmak yerine, gerçekçi, şefkatli, çözüm odaklı ve yapıcı bir pencereden yeniden formüle et (cognitive reframe).
      Kullanıcının duygularını yok saymadan, alternatif ve sağlıklı bir bakış açısı geliştir. Yanıtı JSON biçiminde ilet.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: promptText,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              original: {
                type: Type.STRING,
                description: "Orijinal olumsuz düşünce"
              },
              reframed: {
                type: Type.STRING,
                description: "Türkçe dilinde yapıcı, şefkatli ve gerçekçi bilişsel yeniden çerçeveleme önerisi"
              },
              distortionType: {
                type: Type.STRING,
                description: "Gözlemlenen bilişsel çarpıtma türü (örneğin 'Hep ya da Hiç Düşüncesi', 'Felaketleştirme', 'Zihin Okuma', 'Kişiselleştirme')"
              }
            },
            required: ["original", "reframed", "distortionType"]
          }
        }
      });

      const data = JSON.parse(response.text?.trim() || "{}");
      if (data.reframed) {
        return res.json(data);
      }
    } catch (error: any) {
      console.warn("Gemini generate-reframe error, using CBT fallback:", error.message);
    }
  }

  // Fallback Turkish CBT Reframer
  const lower = original.toLowerCase();
  let distortion = "Zihinsel Filtreleme & Aşırı Genelleme";
  let reframed = "Şu an hissettiğiniz zorluk çok anlaşılır; ancak bu anlık zorluk sizin tüm değerinizi veya geleceğinizi tanımlamaz. Bir adım geri çekilip sadece şu an kontrol edebileceğiniz küçük adıma odaklanmayı seçebilirsiniz.";

  if (lower.includes("asla") || lower.includes("her zaman") || lower.includes("hiçbir")) {
    distortion = "Hep ya da Hiç Düşüncesi (Siyah-Beyaz Bakış)";
    reframed = "Hayat siyah ve beyaz uçlardan ibaret değildir; arada sayısız ton ve gelişim fırsatı vardır. Mükemmel olmasını beklemek yerine 'yeterince iyi' olana izin verin.";
  } else if (lower.includes("mahv") || lower.includes("felaket") || lower.includes("korkunç")) {
    distortion = "Felaketleştirme";
    reframed = "Korku zihnimizde en kötü ihtimalleri büyütür. Fakat olasılık ile gerçeklik aynı şey değildir. Bugüne dek pek çok zorluğu aştınız, bu dalga da durulacaktır.";
  } else if (lower.includes("benim yüzümden") || lower.includes("suçluyum")) {
    distortion = "Kişiselleştirme";
    reframed = "Olayların pek çok farklı etkeni ve dinamiği vardır; tüm yükü tek başınıza sırtlanmak kendinize haksızlıktır. Yalnızca etki alanınızdakileri sahiplenin.";
  }

  res.json({
    original,
    reframed,
    distortionType: distortion
  });
});

// 3. API: Thought Feed Analysis (Zihinsel Ayna)
app.post("/api/analyze-thoughts", async (req, res) => {
  const { entries } = req.body;
  if (!entries || !Array.isArray(entries) || entries.length === 0) {
    res.status(400).json({ error: "entries array is required and must not be empty." });
    return;
  }

  const customKey = req.headers["x-gemini-api-key"] as string | undefined;
  const ai = getAI(customKey);

  if (ai) {
    try {
      const entriesSummary = entries
        .slice(0, 15)
        .map((entry: any, index: number) => {
          return `Düşünce #${index + 1}:
          - Kategori: ${entry.category}
          - Ruh Hali: ${entry.mood}
          - Tarih: ${entry.createdAt}
          - Metin: "${entry.content}"`;
        })
        .join("\n\n");

      const promptText = `Sen, bireysel gelişim, zihinsel sağlık ve farkındalık üzerine uzmanlaşmış eşsiz bir gelişim koçu ve terapistsin (Şefkatli ve profesyonel bir dil kullan).
      Kullanıcının son dönemde Düşünce Defteri uygulamasına kaydettiği yazıları ve duygu durumunu aşağıda paylaşıyorum:
      
      ${entriesSummary}
      
      Lütfen bu metinleri bütünsel olarak oku. Kullanıcının farkında olmadığı düşünce kalıplarını, zihinsel durum eğilimlerini ve zayıf/güçlü yönlerini belirle.
      Şu parametreleri içeren bir Türkçe analiz raporu üret:
      1. overallVibe: Genel zihinsel iklim, hissettikleri ve zihinsel akışı üzerine özetleyici şefkatli bir değerlendirme.
      2. cognitivePatterns: Son yazılarda gözlenen 2 ya da 3 adet zihinsel/bilişsel örüntü, inanç kalıbı veya eğilim (Her birini mutlaka 'Kalıp Başlığı: Şefkatli açıklama' biçiminde açık ve net bir başlıkla yapılandır).
      3. growthRecommendations: Kullanıcının zihinsel rahatlığı ve kişisel gelişimi için 2 ya da 3 adet şefkatli, uygulanabilir ve pratik gelişim tavsiyesi.
      4. introspectiveQuestion: Kullanıcının kendi içine dönüp derinleşerek zihninde yanıt arayabileceği, tetikleyici olmayan güçlü bir öz-sorgulama sorusu.
      
      Yanıtı kesinlikle verdiğim JSON şemasına göre sağla.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: promptText,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              overallVibe: {
                type: Type.STRING,
                description: "Genel zihinsel ve duygusal durum değerlendirmesi"
              },
              cognitivePatterns: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Gözlemlenen bilişsel ve zihinsel örüntülerin listesi"
              },
              growthRecommendations: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Harekete geçirici pratik kişisel gelişim adımları veya tavsiyeleri"
              },
              introspectiveQuestion: {
                type: Type.STRING,
                description: "Kullanıcıya özel öz sorgulama, zihinsel açılım sorusu"
              }
            },
            required: ["overallVibe", "cognitivePatterns", "growthRecommendations", "introspectiveQuestion"]
          }
        }
      });

      const data = JSON.parse(response.text?.trim() || "{}");
      if (data.overallVibe) {
        return res.json(data);
      }
    } catch (error: any) {
      console.warn("Gemini analyze-thoughts error, using fallback reflection:", error.message);
    }
  }

  // Fallback Reflection
  res.json({
    overallVibe: "Yazılarınız, hayatın getirdiği iniş çıkışların ortasında kendinize dürüstçe alan açmaya çalıştığınızı gösteriyor. Bazen belirsizlikler ve sorumluluklar sizi yorsa da, duygularınızı yazıya dökmeniz en büyük farkındalık gücünüz.",
    cognitivePatterns: [
      "Kontrol ve Gelecek Odaklılık: Zihniniz çoğunlukla henüz gerçekleşmemiş olasılıkları planlamaya ve kontrol altında tutmaya eğilim gösteriyor.",
      "Gizli Öz-Eleştiri: Zorlu durumlarda kendinize mola vermeyi hak edilmesi gereken bir lüks gibi görme kalıbı seziliyor.",
      "Duygusal Dayanıklılık: İç dünyanızda zorlayıcı hisler belirdiğinde onları yok saymak yerine anlamlandırma isteğiniz çok değerli bir güç."
    ],
    growthRecommendations: [
      "Zihinsel Molalar: Gün içinde karar vermeden veya telaşlanmadan önce 3 yavaş ve derin nefes alarak bedeninize dönün.",
      "Yargısız Kabul: Bir hata veya aksaklık olduğunda kendinize 'Şu an neye ihtiyacım var?' şefkatiyle yaklaşın.",
      "Günün Minik Zaferleri: Gün batarken sadece tamamladığınız tek bir küçük şeyi takdir edin."
    ],
    introspectiveQuestion: "Eğer bugün her şeyi mükemmel yapmak zorunda olmasaydınız, sadece kendiniz olmak için ne yapardınız?"
  });
});

// Vite Middleware & Static Fallback handling
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupServer();
