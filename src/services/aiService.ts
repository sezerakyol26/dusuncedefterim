import { ThoughtEntry, ThoughtCategory, Mood, AISelfReflection } from "../types";
import { MOOD_LABELS, CATEGORY_LABELS } from "../data";

export interface ReframeResponse {
  original: string;
  reframed: string;
  distortionType: string;
  source?: "gemini" | "local-engine";
}

export interface QuotePromptResponse {
  quote: string;
  author: string;
  journalPrompt: string;
  source?: "gemini" | "local-engine";
}

const STORAGE_KEY = "thought_defteri_gemini_key";

export function getStoredGeminiKey(): string {
  try {
    return localStorage.getItem(STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

export function setStoredGeminiKey(key: string): void {
  try {
    if (key.trim()) {
      localStorage.setItem(STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch (e) {
    console.error("Failed to store Gemini key:", e);
  }
}

// -------------------------------------------------------------
// Intelligent Turkish CBT & Psychological Reflection Engine (Fallback)
// -------------------------------------------------------------

const CBT_DISTORTIONS = [
  {
    type: "Hep ya da Hiç Düşüncesi (Siyah-Beyaz Bakış)",
    keywords: ["asla", "hiçbir zaman", "her zaman", "tamamen", "hep", "kusursuz", "sıfır", "bütün"],
    reframes: [
      "Hayat siyah ve beyaz uçlardan değil, aradaki gri tonlardan ve nüanslardan oluşur. Bir alanda aksaklık olması, tüm çabanın veya sürecin geçersiz olduğu anlamına gelmez. Küçük adımlar ve kısmi ilerlemeler de değerlidir.",
      "Durumu 'tamamen başarılı' ya da 'tamamen başarısız' diye ikiye ayırmak yerine, bugünkü deneyimden hangi dersleri aldığınıza odaklanabilirsiniz. Mükemmellik değil, samimi bir gelişim hedeflemek zihni rahatlatır."
    ]
  },
  {
    type: "Felaketleştirme (En Kötü Senaryoya Odaklanma)",
    keywords: ["mahvoldum", "felaket", "korkunç", "kıyamet", "dayanamam", "bittim", "her şey bitti", "korkuyorum"],
    reframes: [
      "Zihnimiz bazen kendimizi koruma refleksiyle en uç ve en acı verici senaryoları gerçekmiş gibi canlandırabilir. Ancak olasılık ile gerçeklik aynı şey değildir. Bugüne kadar benzer kaygıların üstesinden geldiğinizi ve kaynaklarınızın sandığınızdan güçlü olduğunu hatırlayın.",
      "Şu anki durum zorlayıcı ve yorucu olabilir; fakat bu kalıcı bir felaket değil, geçici bir dalgadır. Derin bir nefes alıp şu an doğrudan etki edebileceğiniz tek bir minik adıma odaklanın."
    ]
  },
  {
    type: "Zihin Okuma & Dışsal Varsayım",
    keywords: ["hakkımda düşünüyor", "benden nefret", "beni sevmiyor", "bence öyle düşünüyor", "bana kızgın", "biliyorum kesin"],
    reframes: [
      "Başkalarının zihnini okuma gücümüz yoktur ve insanların davranışları çoğunlukla kendi iç dünyaları, stresleri veya yorgunluklarıyla ilgilidir. Doğrudan açık iletişim kurmadıkça başkalarının düşüncelerini kesin doğru kabul etmek gereksiz bir yük oluşturur.",
      "Karşı tarafın tavrını kişisel bir yargı olarak almak yerine, tarafsız gözlemci rolüne geçebilirsiniz. İhtiyaç duyduğunuzda nazik ve net bir dille sormak varsayımları sonlandırır."
    ]
  },
  {
    type: "Gereklilik/Meli-Malı Cümleleri (Katı Kurallar)",
    keywords: ["zorundayım", "-meli", "-malı", "yapmalıydım", "hata yapmamalıyım", "kusursuz olmalı", "yetişmeliydi"],
    reframes: [
      "Kendimize koyduğumuz katı 'meli-malı' kuralları, istek veya hedef olmaktan çıkıp suçluluk üreten birer yargıca dönüşebilir. 'Bunu mükemmel yapmalıyım' yerine 'Elimden gelenin en iyisini yapmayı tercih ediyorum ve sınırlarımı kabul ediyorum' demek öz-şefkati canlandırır.",
      "İnsani sınırlarınızı ve dinlenme ihtiyacınızı bir eksiklik değil, dengeli bir yaşamın doğal gereksinimi olarak görmeye izin verin."
    ]
  },
  {
    type: "Kişiselleştirme & Kendini Aşırı Suçlama",
    keywords: ["benim yüzümden", "ben suçluyum", "ben olmasaydım", "ben beceriksizim", "yine ben"],
    reframes: [
      "Gelişen olayların pek çok farklı bileşeni, koşulu ve diğer insanların payı vardır. Bütün sorumluluğu tek başına omuzlamak adil değildir. Sadece kendi etki alanınızdaki davranışları sahiplenin, geri kalanını akışa bırakın.",
      "Kendinizi bir hata üzerinden bütünüyle yargılamak yerine, zor anlar yaşayan şefkate muhtaç bir dosta yaklaşır gibi yaklaşmayı deneyin."
    ]
  },
  {
    type: "Aşırı Genelleme & Etiketleme",
    keywords: ["herkes", "hiç kimse", "ben yetersizim", "aptalım", "şanssızım", "hep böyle olur"],
    reframes: [
      "Tekil bir olay ya da deneyim, sizin kim olduğunuzu veya geleceğinizi tanımlamaz. Bir anlık yetersizlik hissi, genel olarak yetersiz olduğunuz anlamına gelmez. Kendinizi sert bir etiketle damgalamak yerine, durumun özgün koşullarını değerlendirin.",
      "Dün ya da bugün yaşananlar sonsuza dek sürecek bir kural değildir. Her an yeni bir deneyim ve başlangıç için bir kapı aralar."
    ]
  }
];

export function generateLocalReframe(original: string): ReframeResponse {
  const lower = original.toLowerCase();
  
  // Find best matching distortion
  let matched = CBT_DISTORTIONS.find(d => 
    d.keywords.some(k => lower.includes(k))
  );

  if (!matched) {
    matched = CBT_DISTORTIONS[Math.floor(Math.random() * CBT_DISTORTIONS.length)];
  }

  const selectedReframe = matched.reframes[Math.floor(Math.random() * matched.reframes.length)];

  return {
    original,
    reframed: selectedReframe,
    distortionType: matched.type,
    source: "local-engine"
  };
}

export function generateLocalReflection(entries: ThoughtEntry[], timeframeLabel: string = "Tüm Zamanlar"): AISelfReflection {
  if (!entries || entries.length === 0) {
    return {
      overallVibe: "Henüz analiz edilecek yeterli düşünce kaydı bulunmuyor. Birkaç düşünce ekledikten sonra zihinsel ikliminizi keşfedebilirsiniz.",
      cognitivePatterns: ["Gözlem Başlangıcı: Düşüncelerinizi kaydetmeye devam ettikçe zihinsel kalıplarınız ve bilişsel eğilimleriniz belirginleşecektir."],
      growthRecommendations: ["Günde bir kez 3 dakikanızı ayırarak o anki hislerinizi serbestçe yazın."],
      introspectiveQuestion: "Bugün iç sesiniz size en çok neyi fısıldıyor?",
      mentalBalanceScore: 75,
      balanceStatus: "Gözlem ve Başlangıç Aşaması",
      emotionalMetrics: {
        clarity: 70,
        selfCompassion: 72,
        resilience: 75,
        energyLevel: 70
      },
      strengths: [
        "Farkındalık Niyeti: Kendine zaman ayırıp iç dünyasını yazıya dökme adımı atmak.",
        "Açık Fikirlilik: Yeni bir zihinsel pratik geliştirmeye istekli olmak."
      ],
      mindfulAffirmation: "Bugün kendime nazik davranmayı ve her anı olduğu gibi kabul etmeyi seçiyorum.",
      analyzedEntriesCount: 0,
      timeframe: timeframeLabel,
      generatedAt: new Date().toISOString()
    };
  }

  // Count moods
  const moodCounts: Record<string, number> = {};
  entries.forEach(e => {
    moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
  });

  const categoryCounts: Record<string, number> = {};
  entries.forEach(e => {
    categoryCounts[e.category] = (categoryCounts[e.category] || 0) + 1;
  });

  // Dominant mood
  let dominantMood = Mood.CALM;
  let maxCount = -1;
  for (const [m, count] of Object.entries(moodCounts)) {
    if (count > maxCount) {
      maxCount = count;
      dominantMood = m as Mood;
    }
  }

  const anxiousOrStressedCount = (moodCounts[Mood.ANXIOUS] || 0) + (moodCounts[Mood.OVERWHELMED] || 0) + (moodCounts[Mood.TIRED] || 0);
  const positiveMoodCount = (moodCounts[Mood.CALM] || 0) + (moodCounts[Mood.GRATEFUL] || 0) + (moodCounts[Mood.HOPEFUL] || 0) + (moodCounts[Mood.PROUD] || 0) + (moodCounts[Mood.EXCITED] || 0) + (moodCounts[Mood.LOVED] || 0);
  const reflectiveMoodCount = (moodCounts[Mood.REFLECTIVE] || 0);

  const gratitudeCount = categoryCounts[ThoughtCategory.GRATITUDE] || 0;
  const challengeCount = categoryCounts[ThoughtCategory.CHALLENGE] || 0;
  const intentionCount = categoryCounts[ThoughtCategory.INTENTION] || 0;
  const reflectionCount = categoryCounts[ThoughtCategory.REFLECTION] || 0;
  const ideaCount = categoryCounts[ThoughtCategory.IDEA] || 0;

  const isAnxiousHeavy = anxiousOrStressedCount > entries.length * 0.35;
  const isGratitudeHeavy = gratitudeCount > 0;
  const isChallengeHeavy = challengeCount > 0;

  // Calculate Mental Balance Score (62 - 96)
  let baseScore = 74;
  if (positiveMoodCount > anxiousOrStressedCount) baseScore += 8;
  if (isGratitudeHeavy) baseScore += 5;
  if (intentionCount > 0) baseScore += 4;
  if (challengeCount > 0 && positiveMoodCount > 0) baseScore += 3; // emotional resilience
  if (isAnxiousHeavy) baseScore -= 7;
  const mentalBalanceScore = Math.min(96, Math.max(62, baseScore));

  let balanceStatus = "Dengeli & Huzurlu Akış";
  if (isAnxiousHeavy) {
    balanceStatus = "Yenilenme & Öz-Şefkat İhtiyacı";
  } else if (dominantMood === Mood.EXCITED || dominantMood === Mood.HOPEFUL || dominantMood === Mood.PROUD) {
    balanceStatus = "Canlı, Üretken & Umutlu Dinamik";
  } else if (dominantMood === Mood.REFLECTIVE || reflectionCount > entries.length * 0.4) {
    balanceStatus = "Yüksek İçsel Farkındalık & Derinleşme";
  }

  // Emotional Metrics (Clamped 55-95)
  const clarity = Math.min(95, Math.max(60, 68 + (reflectionCount * 5) + (intentionCount * 4) - (moodCounts[Mood.OVERWHELMED] || 0) * 6));
  const selfCompassion = Math.min(95, Math.max(58, 70 + (gratitudeCount * 6) + ((moodCounts[Mood.LOVED] || 0) * 5) - (isAnxiousHeavy ? 5 : 0)));
  const resilience = Math.min(95, Math.max(65, 72 + (challengeCount * 5) + (positiveMoodCount * 3)));
  const energyLevel = Math.min(95, Math.max(55, 66 + ((moodCounts[Mood.EXCITED] || 0) * 8) + ((moodCounts[Mood.HOPEFUL] || 0) * 5) - ((moodCounts[Mood.TIRED] || 0) * 8)));

  let overallVibe = "";
  if (isAnxiousHeavy) {
    overallVibe = `Son dönem notlarınızda zihninizin belirli bir sorumluluk, belirsizlik veya kontrol arayışıyla yoğunlaştığı gözlemleniyor. Bir yandan yükleri omuzlarken diğer yandan kendinize yeterince nefes alma ve duraklama alanı tanımakta zorlanıyor olabilirsiniz. Bu yoğunluğu fark edip yazıya dökebilmeniz, yükü hafifletmenin en cesur adımıdır.`;
  } else if (dominantMood === Mood.CALM || dominantMood === Mood.GRATEFUL) {
    overallVibe = `Zihniniz dengeli, farkındalık dolu ve sakin bir zeminde akıyor. Günlük hayatın küçük detaylarındaki güzellikleri ve içsel huzuru takdir edebilme yetiniz, zorlu anlarda sığınabileceğiniz en güçlü iç kaynağınızdır.`;
  } else if (dominantMood === Mood.EXCITED || dominantMood === Mood.HOPEFUL || dominantMood === Mood.PROUD) {
    overallVibe = `Yazılarınızdan canlı, üretken ve geleceğe umutla bakan bir enerji yayılıyor. Yeni fikirler üretme ve hedeflerinize yönelme motivasyonunuz yüksek; bu dinamiği öz-şefkatle ve dengeli molalarla taçlandırmak sizi daha da güçlendirecektir.`;
  } else {
    overallVibe = `Son dönem notlarınız, derin bir içsel gözlem, sorgulama ve hayatın farklı dinamiklerini anlamlandırma sürecinde olduğunuzu yansıtıyor. Kendinize karşı yargılayıcı değil, meraklı bir araştırmacı gibi yaklaşabilmeniz zihinsel berraklığınızı artırıyor.`;
  }

  // Detect Personal Mindful Strengths
  const strengths: string[] = [];
  strengths.push("Öz-Farkındalık Cesareti: İç dünyanızdaki duyguları yok saymak veya ertelemek yerine dürüstçe adlandırıp yazıya dökebilme gücünüz.");
  
  if (isGratitudeHeavy || moodCounts[Mood.GRATEFUL]) {
    strengths.push("Minnettarlık ve Işık Arayışı: Hayatın koşturmacasında veya zorluklarında dahi teşekkür edilecek minik detayları yakalayabilme esnekliğiniz.");
  } else if (intentionCount > 0) {
    strengths.push("Bilinçli Yaşam Niyeti: Kararlarınızı otomatik pilotta değil, kendi iç pusulanıza ve değerlerinize göre belirleme iradeniz.");
  } else {
    strengths.push("Zihinsel Berraklık Arayışı: Düşüncelerinizi karmaşık bir yük olarak taşımak yerine analiz ederek hafifletme isteğiniz.");
  }

  if (isChallengeHeavy || moodCounts[Mood.ANXIOUS]) {
    strengths.push("Duygusal Dayanıklılık: Zorlukları bir yetersizlik olarak damgalamak yerine, gelişim ve öğrenme fırsatı olarak karşılama potansiyeliniz.");
  } else if (ideaCount > 0 || moodCounts[Mood.EXCITED]) {
    strengths.push("Yaratıcı ve Üretken Zihin: Yeni olasılıklar tasarlayabilme ve ilhamı somut adımlara dönüştürebilme dinamizminiz.");
  } else {
    strengths.push("İçsel Dinginlik Kapasitesi: Dış dünyanın gürültüsüne rağmen kendi iç merkezinize dönebilme kabiliyetiniz.");
  }

  // Cognitive Patterns
  const cognitivePatterns: string[] = [];
  if (isChallengeHeavy || isAnxiousHeavy) {
    cognitivePatterns.push("Kontrol ve Gelecek Odaklılık: Henüz gerçekleşmemiş olasılıkları planlamaya ve kontrol altında tutmaya eğilim göstererek şimdiki anın dinginliğini erteleme eğilimi seziliyor.");
  }
  if (isGratitudeHeavy) {
    cognitivePatterns.push("Şükran Odaklı Dönüşüm: Zorlayıcı koşullarda dahi küçük kazanımları ve teşekkür edilecek detayları görebilme zihinsel esnekliği mevcut.");
  }
  cognitivePatterns.push("İçsel Yansıtma ve Anlam Arayışı: Yaşanan olayları yalnızca yüzeysel geçiştirmek yerine, kendi duygu ve düşünce süreçlerinizle bağdaştırarak anlamlandırma beceriniz yüksek.");
  if (cognitivePatterns.length < 3) {
    cognitivePatterns.push("Gereklilik Kalıpları: Kendinize zaman zaman yüksek standartlar koyarak dinlenmeyi hak edilmesi gereken zorlu bir ödül gibi algılama eğilimi gözleniyor.");
  }

  const growthRecommendations: string[] = [
    "Duygularınızı Bastırmadan Karşılayın: Zor bir his belirdiğinde onu hemen çözmeye çalışmak yerine 'Şu an bu hissi deneyimliyorum ve bu insani' diyerek 2 dakika sadece nefesinizle kalın.",
    "Mikro Şükran Molaları: Gün içinde zihniniz gerildiğinde sadece çevrenizdeki 3 nesneye dikkatle bakıp duyularınızla ana dönün.",
    "Kendinize Yakın Bir Dost Gibi Konuşun: Kendinizi eleştirirken kullandığınız cümleleri, sevdiğiniz bir dosta söyler miydiniz? Kendinize aynı nezaketle seslenin."
  ];

  let mindfulAffirmation = "Bugün kendime nazik davranmayı, her şeyi tek başıma çözmek zorunda olmadığımı ve olduğum halimle değerli olduğumu hatırlıyorum.";
  if (isAnxiousHeavy) {
    mindfulAffirmation = "Şu an hissettiğim kaygı geçici bir dalgadır. Derin bir nefes alıyor ve yalnızca etki alanımdaki tek bir adıma odaklanıyorum.";
  } else if (dominantMood === Mood.CALM || dominantMood === Mood.GRATEFUL) {
    mindfulAffirmation = "İçimdeki huzur dış koşulların ötesindedir. Hayatın bana sunduğu küçük armağanları sevgiyle kucaklıyorum.";
  } else if (dominantMood === Mood.EXCITED || dominantMood === Mood.HOPEFUL) {
    mindfulAffirmation = "İçimdeki yaşam enerjisine ve potansiyele güveniyorum; acele etmeden, kendi ritmimde çiçek açıyorum.";
  }

  const introspectiveQuestion = isAnxiousHeavy
    ? "Eğer şu an zihnimi meşgul eden bu durumun mükemmel çözülmesine gerek olmasaydı, kendime bugün nasıl bir hafiflik hediye ederdim?"
    : "Bugün sadece bir şeyleri başarmak için değil, yalnızca 'var olmak' ve kendimle baş başa kalmak için neye ihtiyacım var?";

  return {
    overallVibe,
    cognitivePatterns,
    growthRecommendations,
    introspectiveQuestion,
    mentalBalanceScore,
    balanceStatus,
    emotionalMetrics: {
      clarity,
      selfCompassion,
      resilience,
      energyLevel
    },
    strengths,
    mindfulAffirmation,
    analyzedEntriesCount: entries.length,
    timeframe: timeframeLabel,
    generatedAt: new Date().toISOString()
  };
}

// -------------------------------------------------------------
// Direct Gemini API & Backend API Integration
// -------------------------------------------------------------

async function callDirectGemini(apiKey: string, prompt: string, schema?: any): Promise<any> {
  const models = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash"];
  let lastError: any = null;

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload: any = {
        contents: [{ parts: [{ text: prompt }] }],
      };

      if (schema) {
        payload.generationConfig = {
          responseMimeType: "application/json",
          responseSchema: schema,
        };
      }

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `Gemini API HTTP ${res.status}`);
      }

      const json = await res.json();
      const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Gemini API boş yanıt döndürdü.");

      if (schema) {
        return JSON.parse(text);
      }
      return text;
    } catch (e) {
      lastError = e;
      // Try next model if 404 or model specific issue
    }
  }

  throw lastError || new Error("Gemini API modellerine ulaşılamadı.");
}

export const aiService = {
  // Test connection with an API key
  async testApiKey(key: string): Promise<{ success: boolean; message: string }> {
    if (!key.trim()) {
      return { success: false, message: "Lütfen bir API anahtarı giriniz." };
    }
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash?key=${key.trim()}`;
      const res = await fetch(url);
      if (res.status === 400 || res.status === 403) {
        const data = await res.json().catch(() => ({}));
        return { success: false, message: data?.error?.message || "Geçersiz API Anahtarı." };
      }
      return { success: true, message: "Bağlantı başarılı! Gemini 2.5 Flash aktif." };
    } catch (err: any) {
      return { success: false, message: "Ağ veya bağlantı hatası: " + (err.message || String(err)) };
    }
  },

  // 1. Generate Daily Quote & Journaling Prompt
  async getDailyQuoteAndPrompt(): Promise<QuotePromptResponse> {
    const key = getStoredGeminiKey();

    // Try backend first
    try {
      const headers: Record<string, string> = {};
      if (key) headers["x-gemini-api-key"] = key;

      const res = await fetch("/api/generate-prompt", { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.quote && data.journalPrompt) {
          return { ...data, source: "gemini" };
        }
      }
    } catch {
      // Backend not running or offline, proceed
    }

    // If key is stored in browser, try direct Gemini API
    if (key) {
      try {
        const prompt = `Kişisel gelişim, farkındalık veya psikoloji alanında ilham verici Türkçe bir alıntı ve bu sözle eşleşen derin bir günlük tutma sorusu üret. JSON şemasında ver: quote (string), author (string), journalPrompt (string).`;
        const schema = {
          type: "OBJECT",
          properties: {
            quote: { type: "STRING" },
            author: { type: "STRING" },
            journalPrompt: { type: "STRING" }
          },
          required: ["quote", "author", "journalPrompt"]
        };
        const data = await callDirectGemini(key, prompt, schema);
        return { ...data, source: "gemini" };
      } catch (e) {
        console.warn("Direct Gemini Quote failed, using fallback:", e);
      }
    }

    // High quality offline fallback
    const quotes = [
      {
        quote: "Kendinizi dinlemek, hayatın gürültüsü içinde duyabileceğiniz en güzel fısıltıdır.",
        author: "Farkındalık Bilgeliği",
        journalPrompt: "Bugün zihninizin arka planında en çok hangi duygu veya düşüncenin yankılandığını fark ediyorsunuz?"
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

    const chosen = quotes[Math.floor(Math.random() * quotes.length)];
    return { ...chosen, source: "local-engine" };
  },

  // 2. Generate CBT Reframe
  async generateReframe(original: string): Promise<ReframeResponse> {
    const key = getStoredGeminiKey();

    // 1. Try backend
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (key) headers["x-gemini-api-key"] = key;

      const res = await fetch("/api/generate-reframe", {
        method: "POST",
        headers,
        body: JSON.stringify({ original }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.reframed && data.distortionType) {
          return { ...data, original, source: "gemini" };
        }
      }
    } catch {
      // Backend not reachable, proceed to direct or local
    }

    // 2. Try direct client Gemini API if key is saved
    if (key) {
      try {
        const promptText = `Kullanıcı şu olumsuz veya kendini sabote eden düşüncesini paylaştı: "${original}".
Bunu Bilişsel Davranışçı Terapi (CBT) yaklaşımlarına dayanarak analiz et. Gerçekçi, şefkatli ve yapıcı bir pencereden yeniden formüle et (cognitive reframe).
JSON formatında yanıtla: original (string), reframed (string), distortionType (string).`;

        const schema = {
          type: "OBJECT",
          properties: {
            original: { type: "STRING" },
            reframed: { type: "STRING" },
            distortionType: { type: "STRING" }
          },
          required: ["original", "reframed", "distortionType"]
        };

        const data = await callDirectGemini(key, promptText, schema);
        return { ...data, original, source: "gemini" };
      } catch (e) {
        console.warn("Direct Gemini Reframe failed, falling back to local engine:", e);
      }
    }

    // 3. Robust Local Intelligent Engine
    return generateLocalReframe(original);
  },

  // 3. Analyze Thoughts (Zihinsel Ayna)
  async analyzeThoughts(entries: ThoughtEntry[], timeframeLabel: string = "Tüm Zamanlar"): Promise<AISelfReflection> {
    const key = getStoredGeminiKey();
    const localBaseline = generateLocalReflection(entries, timeframeLabel);

    // 1. Try backend
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (key) headers["x-gemini-api-key"] = key;

      const res = await fetch("/api/analyze-thoughts", {
        method: "POST",
        headers,
        body: JSON.stringify({ entries, timeframe: timeframeLabel }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.overallVibe && data.cognitivePatterns) {
          return {
            overallVibe: data.overallVibe,
            cognitivePatterns: data.cognitivePatterns || localBaseline.cognitivePatterns,
            growthRecommendations: data.growthRecommendations || localBaseline.growthRecommendations,
            introspectiveQuestion: data.introspectiveQuestion || localBaseline.introspectiveQuestion,
            mentalBalanceScore: data.mentalBalanceScore || localBaseline.mentalBalanceScore,
            balanceStatus: data.balanceStatus || localBaseline.balanceStatus,
            emotionalMetrics: data.emotionalMetrics || localBaseline.emotionalMetrics,
            strengths: data.strengths || localBaseline.strengths,
            mindfulAffirmation: data.mindfulAffirmation || localBaseline.mindfulAffirmation,
            analyzedEntriesCount: entries.length,
            timeframe: timeframeLabel,
            generatedAt: new Date().toISOString()
          };
        }
      }
    } catch {
      // Proceed
    }

    // 2. Try direct client Gemini API if key is saved
    if (key && entries.length > 0) {
      try {
        const entriesSummary = entries.slice(0, 15).map((e, idx) => 
          `#${idx + 1} (${e.category}, ${e.mood}, ${e.createdAt}): "${e.content}"`
        ).join("\n");

        const promptText = `Sen uzman bir farkındalık koçu ve bilişsel terapistsin. Kullanıcının şu düşünce defteri yazılarını (${timeframeLabel}) analiz et:
${entriesSummary}

Aşağıdaki parametreleri içeren bir Türkçe analiz raporu üret:
1. overallVibe: Genel zihinsel iklim, hissettikleri ve zihinsel akışına dair şefkatli değerlendirme (string).
2. cognitivePatterns: Son yazılarda gözlenen 2-3 bilişsel örüntü ('Kalıp Adı: Açıklama' şeklinde) (array of string).
3. growthRecommendations: 2-3 pratik ve şefkatli öz-gelişim önerisi (array of string).
4. introspectiveQuestion: Kullanıcıya özel derin bir öz-sorgulama sorusu (string).
5. mentalBalanceScore: 0-100 arasında genel zihinsel denge puanı (number, örn: 82).
6. balanceStatus: Zihinsel iklimi özetleyen 2-4 kelimelik unvan (string, örn: 'Dengeli & Huzurlu Akış').
7. emotionalMetrics: clarity, selfCompassion, resilience, energyLevel (0-100 arası sayılar).
8. strengths: Kullanıcının yazılarında fark edilen 2-3 gizli psikolojik güç ve dayanıklılık kaynağı (array of string).
9. mindfulAffirmation: Bu ruh haline özel şifalı tek cümlelik bir günlük olumlama/mantra (string).`;

        const schema = {
          type: "OBJECT",
          properties: {
            overallVibe: { type: "STRING" },
            cognitivePatterns: { type: "ARRAY", items: { type: "STRING" } },
            growthRecommendations: { type: "ARRAY", items: { type: "STRING" } },
            introspectiveQuestion: { type: "STRING" },
            mentalBalanceScore: { type: "NUMBER" },
            balanceStatus: { type: "STRING" },
            emotionalMetrics: {
              type: "OBJECT",
              properties: {
                clarity: { type: "NUMBER" },
                selfCompassion: { type: "NUMBER" },
                resilience: { type: "NUMBER" },
                energyLevel: { type: "NUMBER" }
              },
              required: ["clarity", "selfCompassion", "resilience", "energyLevel"]
            },
            strengths: { type: "ARRAY", items: { type: "STRING" } },
            mindfulAffirmation: { type: "STRING" }
          },
          required: ["overallVibe", "cognitivePatterns", "growthRecommendations", "introspectiveQuestion"]
        };

        const data = await callDirectGemini(key, promptText, schema);
        return {
          overallVibe: data.overallVibe,
          cognitivePatterns: data.cognitivePatterns || localBaseline.cognitivePatterns,
          growthRecommendations: data.growthRecommendations || localBaseline.growthRecommendations,
          introspectiveQuestion: data.introspectiveQuestion || localBaseline.introspectiveQuestion,
          mentalBalanceScore: data.mentalBalanceScore || localBaseline.mentalBalanceScore,
          balanceStatus: data.balanceStatus || localBaseline.balanceStatus,
          emotionalMetrics: data.emotionalMetrics || localBaseline.emotionalMetrics,
          strengths: data.strengths || localBaseline.strengths,
          mindfulAffirmation: data.mindfulAffirmation || localBaseline.mindfulAffirmation,
          analyzedEntriesCount: entries.length,
          timeframe: timeframeLabel,
          generatedAt: new Date().toISOString()
        };
      } catch (e) {
        console.warn("Direct Gemini Analysis failed, falling back to local engine:", e);
      }
    }

    // 3. Fallback to Local Reflection Engine
    return localBaseline;
  }
};
