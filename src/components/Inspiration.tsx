import React, { useState, useEffect, useRef } from "react";
import { ThoughtCategory, Mood } from "../types";
import { aiService } from "../services/aiService";
import { 
  Sparkles, Brain, Wind, Play, Pause, RefreshCw, 
  ChevronRight, HelpCircle, Save, Check, Quote, 
  Copy, BookOpen, Volume2, VolumeX, Award, 
  ArrowRight, Lock, Unlock, ChevronDown, ChevronUp, 
  Info, Heart, Compass, AlertCircle 
} from "lucide-react";

interface QuoteItem {
  id: number;
  text: string;
  author: string;
  category: string;
  focus: string;
}

const MOTIVATIONAL_QUOTES: QuoteItem[] = [
  {
    id: 1,
    text: "Dün zekiydim, dünyayı değiştirmek istedim. Bugün bilgeyim, kendimi değiştiriyorum.",
    author: "Mevlana",
    category: "Kişisel Gelişim",
    focus: "Kendini Yenileme"
  },
  {
    id: 2,
    text: "Bulutlar gelir ve gider. Gökyüzü her zaman oradadır.",
    author: "Pema Chödrön",
    category: "Farkındalık",
    focus: "Kabullenme & Huzur"
  },
  {
    id: 3,
    text: "Her şeyin en büyüğü, kendini fethetmektir.",
    author: "Platon",
    category: "Zihinsel Güç",
    focus: "Özdisiplin"
  },
  {
    id: 4,
    text: "Karanlığı lanetlemektense, bir mum yakmak daha iyidir.",
    author: "Konfüçyüs",
    category: "Pozitif Düşünce",
    focus: "Umut ve Eylem"
  },
  {
    id: 5,
    text: "Kendine şefkat göstermek, başarısızlığı kabul etmek değil; insan olduğunu hatırlamaktır.",
    author: "Kristin Neff",
    category: "Öz-Şefkat",
    focus: "Öz-Kabul"
  },
  {
    id: 6,
    text: "Zorlukları aşmanın sırrı, onlarla savaşmak değil, yeni bir yol inşa etmektir.",
    author: "Dan Millman",
    category: "Kişisel Gelişim",
    focus: "Gelişim Zihniyeti"
  },
  {
    id: 7,
    text: "Hayat, senin ona kattığın anlam kadardır.",
    author: "Viktor Frankl",
    category: "Pozitif Düşünce",
    focus: "Anlam Arayışı"
  },
  {
    id: 8,
    text: "Küçük adımların gücünü asla küçümseme; çığlar da kar taneleriyle başlar.",
    author: "Lao Tzu",
    category: "Kişisel Gelişim",
    focus: "Kararlılık & İstikrar"
  },
  {
    id: 9,
    text: "Düşünceleriniz neyse, hayatınız da odur.",
    author: "Marcus Aurelius",
    category: "Pozitif Düşünce",
    focus: "Zihinsel Tutum"
  },
  {
    id: 10,
    text: "Mükemmel olmana gerek yok. Sadece dün olduğundan biraz daha farkında ve şefkatli ol.",
    author: "Farkındalık Yolu",
    category: "Öz-Şefkat",
    focus: "Kendini Sevmek"
  },
  {
    id: 11,
    text: "En büyük zafer hiç düşmemek değil, her düştüğünde tekrar ayağa kalkabilmektir.",
    author: "Nelson Mandela",
    category: "Zihinsel Güç",
    focus: "Yılmazlık"
  },
  {
    id: 12,
    text: "Şu an, sahip olduğun ve bir şeyleri değiştirebileceğin tek andır.",
    author: "Eckhart Tolle",
    category: "Farkındalık",
    focus: "Şimdiki Zaman"
  },
  {
    id: 13,
    text: "Kendine inanmaya başladığın an, nasıl yaşayacağını da öğrenmiş olursun.",
    author: "Goethe",
    category: "Kişisel Gelişim",
    focus: "İçsel Cesaret"
  },
  {
    id: 14,
    text: "İçimizdeki güç, karşılaştığımız tüm zorluklardan daha büyüktür.",
    author: "Ralph Waldo Emerson",
    category: "Zihinsel Güç",
    focus: "İçsel Güç"
  },
  {
    id: 15,
    text: "Gülümse; çünkü hayat, şikayet etmek için çok kısa ve parlamak için çok güzel.",
    author: "Pozitif Yaşam Felsefesi",
    category: "Pozitif Düşünce",
    focus: "Hayat Sevinci"
  }
];

interface JourneyStep {
  day: number;
  title: string;
  theme: string;
  guideline: string;
  prompt: string;
  category: ThoughtCategory;
  mood: Mood;
}

interface Journey {
  id: string;
  title: string;
  description: string;
  durationDays: number;
  icon: "Heart" | "Brain" | "Compass";
  badge: string;
  steps: JourneyStep[];
}

const GROWTH_JOURNEYS: Journey[] = [
  {
    id: "self-compassion",
    title: "5 Günlük Öz-Şefkat Patikası",
    description: "Kendi içinizdeki eleştirel sesi dindirip, kendinize zor zamanlarda destekleyici bir dost gibi yaklaşmayı öğrenin.",
    durationDays: 5,
    icon: "Heart",
    badge: "🌸",
    steps: [
      {
        day: 1,
        title: "İç Sesini Fark Et",
        theme: "İç sesinizin tonunu keşfetme",
        guideline: "Bugün hata yaptığınızda kendinize söylediğiniz ilk şeyi düşünün. Tonu sert mi, yoksa destekleyici mi?",
        prompt: "Bugün içsel eleştirmenimin bana en çok fısıldadığı o sert cümleyi yargılamadan yazıyorum. Bu ses gerçekten yardımcı mı oluyor, yoksa yıpratıyor mu?",
        category: ThoughtCategory.REFLECTION,
        mood: Mood.REFLECTIVE
      },
      {
        day: 2,
        title: "Mükemmeliyetçilik Tuzağı",
        theme: "Hata yapma özgürlüğünü geri kazanma",
        guideline: "Kusursuz olma standardı bizi hareketsiz kılar. Hataların büyüme fırsatları olduğunu kabul edelim.",
        prompt: "Hayatımda mükemmel olmaya çalışıp kendimi en çok yıprattığım alan hangisi? Kendime hata yapma hakkı tanısaydım zihnim nasıl ferahlardı?",
        category: ThoughtCategory.CHALLENGE,
        mood: Mood.ANXIOUS
      },
      {
        day: 3,
        title: "Ortak İnsanlık Paydası",
        theme: "Mücadelelerinizde yalnız olmadığınızı anlama",
        guideline: "Zorluk ve yetersizlik hissi sadece sizin başınıza gelmez; tüm insanların paylaştığı evrensel bir durumdur.",
        prompt: "Şu an zorlandığım konuda dünyada binlerce insanın benzer hisler yaşadığını bilmek bana nasıl hissettiriyor? Yalnız olmadığımı kendime nasıl hatırlatırım?",
        category: ThoughtCategory.REFLECTION,
        mood: Mood.CALM
      },
      {
        day: 4,
        title: "En Yakın Arkadaş Testi",
        theme: "Kendimize bir dostun gözünden bakmak",
        guideline: "En sevdiğiniz insan bir hata yapsaydı ona ne derdiniz? O şefkatli ve destekleyici sesi şimdi kendinize yöneltin.",
        prompt: "Zorlandığım bir konuda kendime en yakın arkadaşımın ağzından yazılmış, sakinleştirici, destekleyici ve sevgi dolu bir mektup yazıyorum:",
        category: ThoughtCategory.GRATITUDE,
        mood: Mood.CALM
      },
      {
        day: 5,
        title: "Kusurlarınla Gurur Duy",
        theme: "Kendimizi tüm eksiklerimizle kucaklama",
        guideline: "Öz-şefkat, kusurlarımıza rağmen sevilebilir ve biricik olduğumuzu kalpten hissetmektir.",
        prompt: "Geçmişteki hatalarıma ve tüm eksiklerime rağmen bugün kendimde en çok saygı duyduğum, sevdiğim ve gurur duyduğum o 2 şeyi kalbime fısıldayıp yazıyorum:",
        category: ThoughtCategory.GRATITUDE,
        mood: Mood.EXCITED
      }
    ]
  },
  {
    id: "growth-mindset",
    title: "3 Günlük Gelişim Zihniyeti",
    description: "Zorlukları zihninizi genişleten ve direncinizi artıran birer gelişim basamağı olarak konumlandırın.",
    durationDays: 3,
    icon: "Brain",
    badge: "⚡",
    steps: [
      {
        day: 1,
        title: "Hatalar En Büyük Öğretmendir",
        theme: "Başarısızlığı geri bildirim süreci olarak yeniden çerçeveleme",
        guideline: "Hata yapmak beceriksizliği değil, deneme cesaretini gösterir.",
        prompt: "Son dönemde 'başarısızlık' veya 'hata' olarak gördüğüm bir olayı ele alıyorum. Bu deneyim bana kendim veya yaşam hakkında hangi değerli dersi öğretti?",
        category: ThoughtCategory.CHALLENGE,
        mood: Mood.REFLECTIVE
      },
      {
        day: 2,
        title: "'Henüz' Sözcüğünün Gücü",
        theme: "Yetersizlik hissini gelişim sürecine dönüştürme",
        guideline: "'Bunu yapamıyorum' yerine 'Bunu *henüz* yapamıyorum' diyerek kendinize öğrenme şansı tanıyın.",
        prompt: "Şu an yetersiz hissettiğim veya yapamadığımı düşündüğüm bir konuyu seçiyorum. Bu cümlenin sonuna 'henüz' ekleyerek, gelişmek için atabileceğim ilk minik adımı planlıyorum:",
        category: ThoughtCategory.INTENTION,
        mood: Mood.CALM
      },
      {
        day: 3,
        title: "Çabayı Takdir Etmek",
        theme: "Sonuçlardan ziyade harcanan emeğe odaklanmak",
        guideline: "Sonuç her zaman kontrolümüzde olmasa da gösterdiğimiz samimi çaba tamamen bize aittir.",
        prompt: "Son günlerde gösterdiğim, dışarıdan kimsenin fark etmediği ama benim bildiğim o kararlı çabayı ve sabrı takdir ediyorum. Bu süreçte gösterdiğim irade için kendime teşekkür ediyorum:",
        category: ThoughtCategory.GRATITUDE,
        mood: Mood.EXCITED
      }
    ]
  },
  {
    id: "meaningful-living",
    title: "3 Günlük Anlam Arayışı",
    description: "Günlük koşturmacanın ortasında değerlerinize, amacınıza ve derin farkındalığınıza uyanın.",
    durationDays: 3,
    icon: "Compass",
    badge: "🌟",
    steps: [
      {
        day: 1,
        title: "Sıradan Anların Sihri",
        theme: "Sıradanlığın içindeki mucizeleri yakalama",
        guideline: "Yaşam büyük dönüm noktalarından ziyade, her gün sessizce akan minik anların toplamıdır.",
        prompt: "Bugün tamamen sıradan görünen ama ruhumu ısıtan veya yüzümde bir tebessüm oluşturan o anı (bir fincan kahve, rüzgarın esintisi, bir dostun selamı) en ince ayrıntısıyla yazıyorum:",
        category: ThoughtCategory.GRATITUDE,
        mood: Mood.CALM
      },
      {
        day: 2,
        title: "Değerler Pusulası",
        theme: "Pusulamızı en temel değerlerimizle hizalamak",
        guideline: "Kişisel değerleriniz doğrultusunda yaşamak, her fırtınada dengede kalmanızı sağlar.",
        prompt: "Benim için hayattaki en sarsılmaz 3 değer (örneğin dürüstlük, cesaret, yaratıcılık, sevgi) nedir? Bugün bu değerlerden birini küçük de olsa bir eylemle nasıl yaşattım?",
        category: ThoughtCategory.INTENTION,
        mood: Mood.REFLECTIVE
      },
      {
        day: 3,
        title: "Zorluklardaki Gizli Armağan",
        theme: "Krizleri anlamlı birer anlatıya dönüştürmek",
        guideline: "Yaşadığımız en büyük mücadeleler, gücümüzü ve bilgeliğimizi şekillendiren sessiz heykeltıraşlardır.",
        prompt: "Geçmişte beni çok zorlayan bir deneyimi düşünüyorum. O zorluk olmasaydı bugün sahip olduğum hangi bilge, dirençli ve güçlü yönüm hiç var olmayacaktı?",
        category: ThoughtCategory.REFLECTION,
        mood: Mood.REFLECTIVE
      }
    ]
  }
];

interface DistortionItem {
  name: string;
  description: string;
  example: string;
  antidote: string;
}

const COGNITIVE_DISTORTIONS_GUIDE: DistortionItem[] = [
  {
    name: "Felaketleştirme (Catastrophizing)",
    description: "Olası en kötü senaryoyu kesinlikle gerçekleşecekmiş gibi kabul etme eğilimi.",
    example: "\"Sınavda heyecanlanıp hata yaparsam tüm geleceğim tamamen biter.\"",
    antidote: "\"Bu durum zorlayıcı olsa da başa çıkabilirim. Hayat tek bir ana sığmayacak kadar geniştir.\""
  },
  {
    name: "Zihin Okuma (Mind Reading)",
    description: "Başkalarının ne düşündüğünü kanıt olmaksızın olumsuz şekilde bildiğini varsayma.",
    example: "\"Toplantıda konuşurken herkes içten içe benimle dalga geçiyordu.\"",
    antidote: "\"İnsanların zihnini okuyamam. Belki sadece yorgunlardır ya da kendi işlerine odaklanmışlardır.\""
  },
  {
    name: "Hep ya da Hiç Düşüncesi (All-or-Nothing)",
    description: "Durumları sadece siyah ve beyaz olarak görme; grilere, esnekliklere yer vermeme.",
    example: "\"Eğer bu projeyi kusursuz bitiremezsem, kendimi tamamen başarısız sayarım.\"",
    antidote: "\"Sonuç mükemmel olmasa da gösterdiğim çaba, öğrendiklerim ve kaydettiğim ilerleme paha biçilemez.\""
  },
  {
    name: "Kişiselleştirme (Personalization)",
    description: "Doğrudan sizinle ilgili olmayan olumsuz olayların tüm sorumluluğunu üstünüze alma.",
    example: "\"Arkadaşım bugün çok keyifsizdi, kesin dün söylediğim bir şeye alındı.\"",
    antidote: "\"Durumu etkileyen birçok faktör var. Keyifsizliğinin sebebi tamamen ben olmayabilirim, ona sormayı deneyebilirim.\""
  },
  {
    name: "Aşırı Genelleme (Overgeneralization)",
    description: "Tek bir olumsuz olayı hiç bitmeyecek bir yenilgi kalıbı olarak görme.",
    example: "\"Bu sunumu batırdım, zaten hiçbir şeyi beceremiyorum, her şey kötü gidiyor.\"",
    antidote: "\"Bu spesifik olayda zorlandım, ama bu benim her zaman başarısız olduğum veya olacağım anlamına gelmez.\""
  },
  {
    name: "-meli / -malı Cümleleri (Should Statements)",
    description: "Kendimizi veya başkalarını katı, esnemeyen kurallarla ve baskıyla motive etmeye çalışmak.",
    example: "\"Asla hata yapmamalıyım, her zaman güçlü görünmeli ve herkesi mutlu etmeliyim.\"",
    antidote: "\"Ben bir insanım ve hata yapmam çok doğal. Kendime esneklik, şefkat ve öğrenme alanı tanıyabilirim.\""
  }
];

interface InspirationProps {
  onAddEntry: (content: string, category: ThoughtCategory, mood: Mood) => void;
}

export default function Inspiration({ onAddEntry }: InspirationProps) {
  // 0. Sub-tab Routing State: breathing | cbt | journeys | quotes
  const [activeSubTab, setActiveSubTab] = useState<"breathing" | "cbt" | "journeys" | "quotes">("breathing");

  // Web Audio Context & Oscillator Refs for synthesis
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // 1. CBT Sandbox states
  const [originalThought, setOriginalThought] = useState("");
  const [loading, setLoading] = useState(false);
  const [reframeResult, setReframeResult] = useState<{ original: string; reframed: string; distortionType: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savedToDiary, setSavedToDiary] = useState(false);
  const [expandedDistortionIndex, setExpandedDistortionIndex] = useState<number | null>(null);

  // 2. Breathing Sync states
  const [isPlaying, setIsPlaying] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"INHALE" | "HOLD_IN" | "EXHALE" | "HOLD_OUT">("INHALE");
  const [timer, setTimer] = useState(4); // 4 seconds per phase
  const [soundEnabled, setSoundEnabled] = useState(false); // start muted by default for safety

  // 3. Guided Journeys States
  const [journeyProgress, setJourneyProgress] = useState<Record<string, number>>(() => {
    try {
      const cached = localStorage.getItem("thought_defteri_journey_progress");
      return cached ? JSON.parse(cached) : {};
    } catch {
      return {};
    }
  });
  const [selectedJourneyId, setSelectedJourneyId] = useState<string | null>(null);
  const [journeyResponse, setJourneyResponse] = useState("");
  const [journeySaved, setJourneySaved] = useState(false);

  // 4. Motivational Quotes states
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(() => {
    const day = new Date().getDate();
    return day % MOTIVATIONAL_QUOTES.length;
  });
  const [copied, setCopied] = useState(false);
  const [quoteSaved, setQuoteSaved] = useState(false);

  // Audio synthesis helper following strict Web Audio API guidelines
  const playPhaseSound = (phase: "INHALE" | "HOLD_IN" | "EXHALE" | "HOLD_OUT") => {
    if (!soundEnabled) return;
    try {
      // Ensure context is running
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // Stop previous synthesis cleanly
      stopCurrentSynthesis();

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (phase === "INHALE") {
        // Soft rising swell representing breathing in (Perfect fifth interval: A3 to E4)
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(330, now + 4);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.05, now + 3);
        gain.gain.linearRampToValueAtTime(0.01, now + 4); // Soft decay at apex
      } else if (phase === "HOLD_IN") {
        // Soft warm holding drone
        osc.type = "sine";
        osc.frequency.setValueAtTime(330, now);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 4);
      } else if (phase === "EXHALE") {
        // Deep release swell falling (E4 down to A3)
        osc.type = "sine";
        osc.frequency.setValueAtTime(330, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 4);

        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.03, now + 1); // gentle breath out push
        gain.gain.exponentialRampToValueAtTime(0.001, now + 4);
      } else if (phase === "HOLD_OUT") {
        // Very low, grounding deep meditation bowl hum (A2 grounding hum)
        osc.type = "sine";
        osc.frequency.setValueAtTime(110, now);

        gain.gain.setValueAtTime(0.004, now);
        gain.gain.linearRampToValueAtTime(0.004, now + 4);
      }

      osc.start(now);
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    } catch (err) {
      console.warn("Düşünce Defteri Audio Synthesis failed:", err);
    }
  };

  const stopCurrentSynthesis = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {}
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      try {
        gainNodeRef.current.disconnect();
      } catch (e) {}
      gainNodeRef.current = null;
    }
  };

  const stopAllAudioResources = () => {
    stopCurrentSynthesis();
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {}
      audioCtxRef.current = null;
    }
  };

  // Safe sound resource cleaning on unmount or tab switch
  useEffect(() => {
    return () => {
      stopAllAudioResources();
    };
  }, []);

  // Sync isPlaying with audio synth
  useEffect(() => {
    if (isPlaying) {
      playPhaseSound(breathPhase);
    } else {
      stopCurrentSynthesis();
    }
  }, [isPlaying, breathPhase, soundEnabled]);

  // Breathing metronome loop (4-4-4-4 Box Breathing)
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setBreathPhase((currentPhase) => {
              switch (currentPhase) {
                case "INHALE": return "HOLD_IN";
                case "HOLD_IN": return "EXHALE";
                case "EXHALE": return "HOLD_OUT";
                case "HOLD_OUT": return "INHALE";
                default: return "INHALE";
              }
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setBreathPhase("INHALE");
      setTimer(4);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const triggerSandboxReframe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!originalThought.trim()) return;

    setLoading(true);
    setError(null);
    setReframeResult(null);
    setSavedToDiary(false);

    try {
      const data = await aiService.generateReframe(originalThought);
      setReframeResult({
        original: data.original,
        reframed: data.reframed,
        distortionType: data.distortionType
      });
      setOriginalThought("");
    } catch (err: any) {
      setError(err.message || "Bir hata gerçekleşti.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveReframeToDiary = () => {
    if (!reframeResult) return;
    const content = `[Bilişsel Çarpıtma: ${reframeResult.distortionType}]\nOrijinal Düşünce: ${reframeResult.original}\n\nYeniden Çerçeveleme: ${reframeResult.reframed}`;
    onAddEntry(content, ThoughtCategory.REFLECTION, Mood.CALM);
    setSavedToDiary(true);
  };

  const handleNextQuote = () => {
    setCopied(false);
    setQuoteSaved(false);
    let nextIndex = currentQuoteIndex;
    if (MOTIVATIONAL_QUOTES.length > 1) {
      while (nextIndex === currentQuoteIndex) {
        nextIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
      }
    }
    setCurrentQuoteIndex(nextIndex);
  };

  const handleCopyQuote = () => {
    const q = MOTIVATIONAL_QUOTES[currentQuoteIndex];
    const textToCopy = `"${q.text}" — ${q.author} (${q.category})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveQuoteToDiary = () => {
    const q = MOTIVATIONAL_QUOTES[currentQuoteIndex];
    const content = `[Motivasyon Küpü: ${q.category}]\n"${q.text}"\n\n— ${q.author}\n\nBu özlü söz benim için bugünkü gelişim yolculuğumda ne ifade ediyor?`;
    onAddEntry(content, ThoughtCategory.REFLECTION, Mood.REFLECTIVE);
    setQuoteSaved(true);
  };

  // Guided Journey Steps Completion handlers
  const handleSaveJourneyStep = (journey: Journey, currentStep: JourneyStep) => {
    if (!journeyResponse.trim()) return;

    // Save to centralized journal entries with specific journey badge tags
    const content = `[Gelişim Patikası ${journey.badge}: ${journey.title} - Gün ${currentStep.day}: ${currentStep.title}]\n\nOdak Konu: ${currentStep.theme}\n\n${journeyResponse}`;
    onAddEntry(content, currentStep.category, currentStep.mood);

    // Update progress in localStorage
    const nextStepNum = currentStep.day;
    const updatedProgress = {
      ...journeyProgress,
      [journey.id]: nextStepNum
    };

    setJourneyProgress(updatedProgress);
    localStorage.setItem("thought_defteri_journey_progress", JSON.stringify(updatedProgress));

    setJourneyResponse("");
    setJourneySaved(true);
    setTimeout(() => {
      setJourneySaved(false);
    }, 4000);
  };

  const handleResetJourney = (journeyId: string) => {
    const updatedProgress = {
      ...journeyProgress,
      [journeyId]: 0
    };
    setJourneyProgress(updatedProgress);
    localStorage.setItem("thought_defteri_journey_progress", JSON.stringify(updatedProgress));
    setJourneyResponse("");
    setJourneySaved(false);
  };

  const currentPhase = (() => {
    switch (breathPhase) {
      case "INHALE":
        return { 
          title: "Nefes Al", 
          desc: "Karnınızdan yavaşça ve derin bir nefes çekin...", 
          circleClass: "scale-125 bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500",
          textColor: "text-emerald-600 dark:text-emerald-400"
        };
      case "HOLD_IN":
        return { 
          title: "Nefesini Tut", 
          desc: "Akciğerlerinizdeki doluluğun ve dinginliğin farkına varın...", 
          circleClass: "scale-125 bg-indigo-500/15 dark:bg-indigo-500/30 border-indigo-500 shadow-lg shadow-indigo-100 dark:shadow-none",
          textColor: "text-indigo-600 dark:text-indigo-400"
        };
      case "EXHALE":
        return { 
          title: "Nefes Ver", 
          desc: "Zihninizdeki gerginliği nefesinizle birlikte serbest bırakın...", 
          circleClass: "scale-75 bg-amber-500/10 dark:bg-amber-500/20 border-amber-500",
          textColor: "text-amber-600 dark:text-amber-400"
        };
      case "HOLD_OUT":
        return { 
          title: "Boşlukta Kal", 
          desc: "Zihninizin tamamen sessizleşmesine ve dingin kalmasına izin verin...", 
          circleClass: "scale-75 bg-slate-500/10 dark:bg-slate-500/20 border-slate-500",
          textColor: "text-slate-600 dark:text-slate-400"
        };
      default:
        return { 
          title: "Nefes Al", 
          desc: "Gevşemeye odaklanın...", 
          circleClass: "scale-100",
          textColor: "text-slate-500"
        };
    }
  })();

  const selectedJourney = GROWTH_JOURNEYS.find(j => j.id === selectedJourneyId);
  const currentStepIndex = selectedJourneyId ? (journeyProgress[selectedJourneyId] || 0) : 0;
  const isJourneyCompleted = selectedJourney ? currentStepIndex >= selectedJourney.durationDays : false;
  const activeJourneyStep = (selectedJourney && !isJourneyCompleted) ? selectedJourney.steps[currentStepIndex] : null;

  return (
    <div className="space-y-6 pb-28 animate-fadeIn" id="inspiration-tab-root">
      
      {/* 4-Tab iOS-style Segmented Navigation Control Bar */}
      <div className="bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-800 p-1.5 rounded-[24px] shadow-sm grid grid-cols-2 md:grid-cols-4 gap-1">
        <button
          onClick={() => { setActiveSubTab("breathing"); stopCurrentSynthesis(); }}
          className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === "breathing"
              ? "bg-[#A2845E] text-white shadow-sm"
              : "text-slate-505 hover:bg-stone-50 dark:text-slate-400 dark:hover:bg-stone-800/40"
          }`}
        >
          <Wind className="w-4 h-4" />
          <span>Nefes & Odak</span>
        </button>

        <button
          onClick={() => { setActiveSubTab("cbt"); stopCurrentSynthesis(); }}
          className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === "cbt"
              ? "bg-[#A2845E] text-white shadow-sm"
              : "text-slate-505 hover:bg-stone-50 dark:text-slate-400 dark:hover:bg-stone-800/40"
          }`}
        >
          <Brain className="w-4 h-4" />
          <span>CBT Dönüştürücü</span>
        </button>

        <button
          onClick={() => { setActiveSubTab("journeys"); stopCurrentSynthesis(); }}
          className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === "journeys"
              ? "bg-[#A2845E] text-white shadow-sm"
              : "text-slate-505 hover:bg-stone-50 dark:text-slate-400 dark:hover:bg-stone-800/40"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Gelişim Patikaları</span>
        </button>

        <button
          onClick={() => { setActiveSubTab("quotes"); stopCurrentSynthesis(); }}
          className={`py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeSubTab === "quotes"
              ? "bg-[#A2845E] text-white shadow-sm"
              : "text-slate-505 hover:bg-stone-50 dark:text-slate-400 dark:hover:bg-stone-800/40"
          }`}
        >
          <Quote className="w-4 h-4" />
          <span>Gelişim Kıvılcımı</span>
        </button>
      </div>

      {/* SUB-TAB 1: Breathing Meditation with Web Audio Cues */}
      {activeSubTab === "breathing" && (
        <div className="bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-5 shadow-sm animate-fadeIn" id="breathing-widget">
          <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-stone-800/40">
            <div className="flex items-center gap-2">
              <Wind className="w-5 h-5 text-[#A2845E]" />
              <h2 className="font-bold text-slate-850 dark:text-white text-base">Kutucuk Nefesi (Meditation Metronome)</h2>
            </div>
            
            {/* Audio metronome activation switch */}
            <button
              onClick={() => {
                setSoundEnabled(!soundEnabled);
                // Trigger context creation upon direct user interaction
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                if (!audioCtxRef.current) {
                  audioCtxRef.current = new AudioContextClass();
                }
              }}
              className={`p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                soundEnabled 
                  ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200/50 text-amber-800 dark:text-amber-400 font-bold" 
                  : "bg-stone-50 dark:bg-stone-955 border-[#E5E5EA] dark:border-stone-850 text-slate-400"
              }`}
              title={soundEnabled ? "Sesli asistanı kapat" : "Sesli yönlendirmeyi aç"}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4 animate-bounce" /> : <VolumeX className="w-4 h-4" />}
              <span className="text-[10px] uppercase font-mono tracking-wider font-extrabold hidden sm:inline">
                {soundEnabled ? "Sesli Yönlendirme: AÇIK" : "Yönlendirme Sesini Aç"}
              </span>
            </button>
          </div>

          <p className="text-xs text-slate-505 dark:text-slate-400 leading-relaxed font-serif">
            Yazmaya başlamadan önce, 4-4-4-4 (Kutucuk Nefesi) ritmiyle zihninizi sakinleştirebilirsiniz. {soundEnabled ? "Sesli yönlendirmemiz, gözlerinizi kapatarak nefese odaklanmanızı kolaylaştırmak için her safhada değişen iyileştirici tınlar üretecektir." : "Dilerseniz sağ üstten 'Sesli Yönlendirme' seçeneğini açarak gözleriniz kapalıyken de akustik metronom rehberliğinde çalışabilirsiniz."}
          </p>

          {/* Breathing Arena */}
          <div className="flex flex-col items-center justify-center py-6 space-y-6" id="breathing-ring-arena">
            <div className="relative w-48 h-48 flex items-center justify-center">
              {/* Outer Orbit */}
              <div className={`absolute inset-0 rounded-full border-2 border-dashed transition-all duration-1000 ${
                isPlaying ? "animate-spin-slow opacity-25 border-[#A2845E]" : "opacity-10"
              }`} />

              {/* Expanding inner circle */}
              <div className={`w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-[4000ms] ease-in-out ${currentPhase.circleClass}`}>
                <span className={`text-base font-extrabold ${currentPhase.textColor} select-none font-sans`}>
                  {isPlaying ? currentPhase.title : "Hazır mısın?"}
                </span>
                <span className="text-2xl font-black font-mono text-slate-850 dark:text-white mt-1 select-none">
                  {isPlaying ? `${timer}s` : "•"}
                </span>
              </div>
            </div>

            <div className="text-center max-w-xs space-y-1.5">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 min-h-4 font-serif">
                {isPlaying ? currentPhase.desc : "Egzersizi başlatmak için aşağıdaki oynat düğmesine basınız."}
              </p>
              <p className="text-[10px] text-[#8E8E93] uppercase tracking-wider font-extrabold font-mono">
                Süreç: 4s Al · 4s Tut · 4s Ver · 4s Bekle
              </p>
            </div>

            <button
              onClick={() => {
                setIsPlaying(!isPlaying);
                const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
                if (!audioCtxRef.current) {
                  audioCtxRef.current = new AudioContextClass();
                }
              }}
              className={`px-8 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${
                isPlaying 
                  ? "bg-rose-500 text-white hover:bg-rose-600" 
                  : "bg-[#A2845E] text-white hover:bg-[#8D704E] hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Egzersizi Durdur</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Egzersizi Başlat</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CBT Transform Sandbox & Distortions Encyclopedia */}
      {activeSubTab === "cbt" && (
        <div className="space-y-6">
          {/* CBT Sandbox */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-4 shadow-sm" id="cbt-sandbox-panel">
            <div className="flex items-center gap-2 pb-2.5 border-b border-[#E5E5EA] dark:border-stone-800/40">
              <Brain className="w-5 h-5 text-[#A2845E]" />
              <h2 className="font-bold text-slate-850 dark:text-white text-base">Zihinsel Dönüştürücü (CBT Sandbox)</h2>
            </div>

            <p className="text-xs text-slate-505 dark:text-slate-400 leading-relaxed font-serif">
              Zihninizi meşgul eden, sizi kısıtlayan ya da sabote eden olumsuz bir inancı veya kaygıyı buraya girin. Yapay zekâ bu düşünceyi saniyeler içinde analiz edecek, altında yatan bilişsel çarpıtmayı bulacak ve şefkatli bir gözlükle yeniden çerçeveleyecektir.
            </p>

            <form onSubmit={triggerSandboxReframe} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-extrabold text-[#8E8E93] uppercase tracking-widest block">
                  Zihnini Sıkıştıran Kaygı veya Olumsuz İnanç
                </label>
                <input
                  type="text"
                  value={originalThought}
                  onChange={(e) => setOriginalThought(e.target.value)}
                  placeholder="Örn: Bu sunumda hata yaparsam herkes benim tamamen beceriksiz olduğumu düşünecek..."
                  className="w-full text-xs p-3.5 rounded-2xl bg-[#FDFCFB] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-850 text-slate-800 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-[#A2845E]/10"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={loading || !originalThought.trim()}
                  className={`px-5 py-2.5 rounded-2xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                    originalThought.trim() && !loading
                      ? "bg-[#A2845E] text-white hover:bg-[#8D704E] hover:shadow transform hover:-translate-y-0.5 active:translate-y-0"
                      : "bg-[#F2F2F7] text-slate-400 dark:bg-stone-800 dark:text-stone-600 cursor-not-allowed"
                  }`}
                >
                  {loading ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Düşünce Sentezleniyor...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5 text-white animate-pulse" />
                      <span>Düşünceyi Yeniden Yapılandır</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {error && (
              <div className="bg-rose-50 dark:bg-rose-955/20 p-4 rounded-2xl text-xs text-rose-500">
                Hata: {error}. Tekrar deneyebilirsiniz.
              </div>
            )}

            {reframeResult && (
              <div className="grid grid-cols-1 gap-4 pt-4 border-t border-[#E5E5EA] dark:border-stone-800/60 animate-fadeIn" id="sandbox-results-panel">
                <div className="space-y-4">
                  <div className="p-4 bg-rose-50/40 dark:bg-rose-950/10 border-l-4 border-rose-400 rounded-2xl space-y-1">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-rose-600 dark:text-rose-400 flex items-center gap-1">
                      ⚠️ Fark Edilen Kısıtlayıcı İnanç
                    </span>
                    <p className="text-xs text-slate-650 dark:text-slate-350 italic font-serif">
                      "{reframeResult.original}"
                    </p>
                  </div>

                  <div className="bg-[#F2F2F7] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 p-3 rounded-2xl flex items-center justify-between text-xs">
                    <span className="text-[10px] text-slate-450 dark:text-slate-400 font-bold uppercase tracking-wider">Hata Türü Sınıflandırması:</span>
                    <span className="bg-[#FFF9E5] dark:bg-[#3E3326] text-[#A2845E] px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[9px] border border-[#FFD60A]/35">
                      {reframeResult.distortionType}
                    </span>
                  </div>

                  <div className="p-4 bg-[#FFF9E5] dark:bg-[#3E3326]/40 border border-[#FFD60A]/40 rounded-2xl space-y-2">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#A2845E] dark:text-[#FFF9E5] flex items-center gap-1">
                      ✨ Şefkatli & Gerçekçi Alternatif Görüş
                    </span>
                    <p className="text-xs text-slate-750 dark:text-[#FFF9E5] leading-relaxed font-serif italic font-medium">
                      "{reframeResult.reframed}"
                    </p>
                  </div>

                  <div className="flex justify-end pt-1">
                    {savedToDiary ? (
                      <span className="text-xs text-[#A2845E] dark:text-[#FFF9E5] font-bold flex items-center gap-1 animate-fadeIn bg-[#FFF9E5] dark:bg-[#3E3326]/40 px-3 py-1.5 rounded-xl border border-[#FFD60A]/35">
                        <Check className="w-3.5 h-3.5" />
                        Deftere Başarıyla Eklendi
                      </span>
                    ) : (
                      <button
                        onClick={handleSaveReframeToDiary}
                        className="px-4.5 py-2.5 rounded-xl border border-[#E5E5EA] text-slate-700 bg-white hover:bg-slate-50 hover:border-[#A2845E]/40 dark:bg-stone-900 dark:border-stone-800 dark:text-slate-300 dark:hover:bg-slate-800/60 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5 text-[#A2845E]" />
                        <span>Bu Formülasyonu Defterime Kaydet</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Cognitive Distortions Encyclopedia */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E5E5EA] dark:border-stone-800/40">
              <Info className="w-5 h-5 text-[#A2845E]" />
              <h2 className="font-bold text-slate-850 dark:text-white text-base">Bilişsel Çarpıtmalar Rehberi (Eğitici Köşe)</h2>
            </div>
            
            <p className="text-xs text-slate-505 dark:text-slate-400 leading-relaxed font-serif">
              Bazen beynimiz hayata filtreler koyarak bizi yanıltabilir. Bunlara <strong>bilişsel çarpıtmalar</strong> denir. Aşağıdaki sık karşılaşılan tuzakları inceleyerek kendi düşünce akışınızı çok daha aydınlık bir şekilde yakalayabilirsiniz:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {COGNITIVE_DISTORTIONS_GUIDE.map((dist, idx) => {
                const isExpanded = expandedDistortionIndex === idx;
                return (
                  <div 
                    key={idx}
                    className="border border-[#E5E5EA] dark:border-stone-850 rounded-2xl bg-stone-50/50 dark:bg-stone-950/60 overflow-hidden transition-all duration-200"
                  >
                    <button
                      type="button"
                      onClick={() => setExpandedDistortionIndex(isExpanded ? null : idx)}
                      className="w-full text-left p-4 flex items-center justify-between hover:bg-[#FFF9E5]/10 cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-full bg-[#EADEC9] dark:bg-stone-800 text-[#A2845E] dark:text-stone-300 text-[10px] font-bold flex items-center justify-center">
                          {idx + 1}
                        </span>
                        <h4 className="font-bold text-xs text-slate-800 dark:text-white">{dist.name}</h4>
                      </div>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-[#A2845E]" /> : <ChevronDown className="w-4 h-4 text-[#A2845E]" />}
                    </button>

                    {isExpanded && (
                      <div className="px-4 pb-4 pt-1 space-y-3.5 border-t border-[#E5E5EA]/50 dark:border-stone-850/50 text-xs animate-fadeIn">
                        <p className="text-slate-500 dark:text-stone-300 leading-relaxed font-serif italic">
                          "{dist.description}"
                        </p>
                        <div className="p-3 bg-rose-50/30 dark:bg-rose-955/10 border-l-2 border-rose-300 rounded-xl space-y-0.5">
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-rose-600">Örnek Düşünce:</span>
                          <p className="font-serif italic text-[#8E8E93] dark:text-stone-400">"{dist.example}"</p>
                        </div>
                        <div className="p-3 bg-[#FFF9E5]/30 dark:bg-[#3E3326]/20 border-l-2 border-[#A2845E] rounded-xl space-y-0.5">
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#A2845E] dark:text-[#FFF9E5]">Şefkatli Panzehir:</span>
                          <p className="font-serif italic text-slate-705 dark:text-[#FFF9E5]">"{dist.antidote}"</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: Guided Growth Journeys with Progress and Badges */}
      {activeSubTab === "journeys" && (
        <div className="space-y-6 animate-fadeIn">
          {!selectedJourneyId ? (
            /* Choose a Journey Screen */
            <div className="bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 pb-1">
                <Compass className="w-5 h-5 text-[#A2845E]" />
                <h2 className="font-bold text-slate-850 dark:text-white text-base">Gelişim Patikaları (Guided Journeys)</h2>
              </div>
              <p className="text-xs text-slate-505 dark:text-slate-400 leading-relaxed font-serif">
                Zihinsel esnekliğinizi, öz-şefkatinizi veya yaşamın anlamını artırmaya yönelik hazırlanan, bizzat psikoloji yaklaşımlarından ilham alan yapılandırılmış mikro gelişim yolculuklarını keşfedin. Her gün bir adım tamamlayarak kalıcı gelişim tohumları ekebilirsiniz:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 pt-2">
                {GROWTH_JOURNEYS.map((journey) => {
                  const completedSteps = journeyProgress[journey.id] || 0;
                  const isStarted = completedSteps > 0;
                  const isAllCompleted = completedSteps >= journey.durationDays;
                  const percent = Math.min(Math.round((completedSteps / journey.durationDays) * 100), 100);

                  return (
                    <div 
                      key={journey.id}
                      className="border border-[#E5E5EA] dark:border-stone-850 rounded-[28px] p-5 bg-stone-50/40 dark:bg-stone-950/40 flex flex-col justify-between space-y-4 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      {/* Top ribbon banner */}
                      <div className="flex items-start justify-between">
                        <div className="bg-[#FFF9E5] dark:bg-[#3E3326] h-12 w-12 rounded-2xl flex items-center justify-center text-xl border border-[#FFD60A]/35 group-hover:scale-105 transition-transform">
                          {journey.badge}
                        </div>
                        <span className="text-[10px] bg-[#EADEC9]/30 dark:bg-stone-800 px-2.5 py-1 rounded-full text-[#A2845E] dark:text-stone-300 font-extrabold uppercase tracking-wide">
                          {journey.durationDays} GÜNLÜK
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h3 className="font-bold text-sm text-slate-850 dark:text-white font-sans">{journey.title}</h3>
                        <p className="text-[11px] text-slate-500 dark:text-stone-300 leading-relaxed font-serif">
                          {journey.description}
                        </p>
                      </div>

                      {/* Progress Line */}
                      <div className="space-y-1 pt-1">
                        <div className="flex justify-between text-[9px] font-mono font-bold text-slate-400">
                          <span>{isAllCompleted ? "Tamamlandı" : `${completedSteps}/${journey.durationDays} Gün`}</span>
                          <span>{percent}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#A2845E] transition-all duration-500"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedJourneyId(journey.id)}
                        className={`w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                          isAllCompleted
                            ? "bg-emerald-500 text-white hover:bg-emerald-600"
                            : isStarted
                            ? "bg-[#A2845E] text-white hover:bg-[#8D704E]"
                            : "bg-white border border-[#E5E5EA] text-slate-700 hover:border-[#A2845E]/40 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-slate-800"
                        }`}
                      >
                        {isAllCompleted ? (
                          <>
                            <Award className="w-3.5 h-3.5" />
                            <span>Yolculuğu İncele</span>
                          </>
                        ) : isStarted ? (
                          <>
                            <span>Yolculuğa Devam Et</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Patikayı Başlat</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Active Journey Workspace Screen */
            <div className="bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-6 shadow-sm">
              
              {/* Workspace Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#E5E5EA] dark:border-stone-800/40 gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-[#FFF9E5] dark:bg-[#3E3326] h-11 w-11 rounded-2xl flex items-center justify-center text-xl border border-[#FFD60A]/35">
                    {selectedJourney.badge}
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#A2845E] dark:text-[#FFF9E5]">Aktif Gelişim Patikası</span>
                    <h3 className="font-bold text-slate-850 dark:text-white text-base font-sans">{selectedJourney.title}</h3>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleResetJourney(selectedJourney.id)}
                    className="px-3.5 py-2 border border-rose-200 text-rose-500 hover:bg-rose-50 dark:border-rose-950/20 dark:hover:bg-rose-955/10 rounded-xl text-[10px] font-bold transition-all cursor-pointer"
                  >
                    Gelişimi Sıfırla
                  </button>
                  <button
                    onClick={() => setSelectedJourneyId(null)}
                    className="px-4 py-2 border border-[#E5E5EA] text-slate-700 hover:bg-slate-50 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-800 rounded-xl text-[10px] font-bold transition-all cursor-pointer"
                  >
                    Patikalara Dön
                  </button>
                </div>
              </div>

              {/* Journey Step Map */}
              <div className="space-y-2">
                <span className="text-[10px] font-extrabold text-[#8E8E93] uppercase tracking-widest block">Yolculuk Yol Haritanız:</span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {selectedJourney.steps.map((step, idx) => {
                    const isCompleted = idx < currentStepIndex;
                    const isActive = idx === currentStepIndex && !isJourneyCompleted;
                    const isLocked = idx > currentStepIndex;

                    return (
                      <div 
                        key={step.day}
                        className={`p-3.5 rounded-2xl border text-center flex flex-col justify-between h-24 transition-all relative overflow-hidden ${
                          isCompleted
                            ? "bg-[#FFF9E5]/30 border-[#FFD60A]/20 dark:bg-[#3E3326]/10 dark:border-amber-950/20 text-[#A2845E] dark:text-[#FFF9E5]"
                            : isActive
                            ? "bg-white border-[#A2845E] ring-2 ring-[#A2845E]/10 dark:bg-stone-950 dark:border-[#A2845E]"
                            : "bg-stone-50/50 border-[#E5E5EA] text-slate-400 dark:bg-stone-950 dark:border-stone-850"
                        }`}
                      >
                        <div className="flex justify-between items-center text-[10px] font-mono font-bold">
                          <span>Gün {step.day}</span>
                          {isCompleted ? (
                            <Check className="w-3.5 h-3.5 text-emerald-500 font-bold" />
                          ) : isLocked ? (
                            <Lock className="w-3 h-3 text-slate-300 dark:text-stone-750" />
                          ) : (
                            <span className="h-2 w-2 rounded-full bg-[#A2845E] animate-ping" />
                          )}
                        </div>

                        <div className="text-[10px] font-bold leading-tight font-sans truncate text-left pt-1">
                          {step.title}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Active Step Panel / Journey Completed Screen */}
              {isJourneyCompleted ? (
                /* Celebration Box */
                <div className="bg-[#FFF9E5] dark:bg-[#3E3326]/40 p-8 rounded-[32px] border border-[#FFD60A]/35 text-center space-y-4 shadow-sm animate-fadeIn">
                  <span className="text-5xl block animate-bounce">🏆</span>
                  <div className="space-y-1">
                    <h4 className="font-bold text-[#A2845E] dark:text-[#FFF9E5] text-lg font-sans">Tebrikler, Patikayı Tamamladınız!</h4>
                    <p className="text-xs text-stone-700 dark:text-stone-300 font-serif italic max-w-md mx-auto leading-relaxed">
                      "{selectedJourney.title}" yolculuğundaki tüm gelişim ve şefkat egzersizlerini başarıyla tamamlayarak defterinize kaydettiniz. Bu derin özveri, zihninizde kalıcı farkındalık ve dinginlik meyveleri verecektir.
                    </p>
                  </div>
                  <div className="pt-2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-stone-950 text-[#A2845E] border border-[#FFD60A] rounded-full text-xs font-bold font-mono">
                      Kilidi Açılan Rozet: {selectedJourney.badge} Mezunu
                    </span>
                  </div>
                </div>
              ) : (
                /* Guided Step Input */
                <div className="bg-stone-50/80 dark:bg-stone-955/60 border border-[#E5E5EA] dark:border-stone-850 p-5 rounded-[28px] space-y-4 animate-fadeIn">
                  
                  {/* Step details banner */}
                  <div className="flex gap-3.5 items-start">
                    <div className="bg-[#A2845E] text-white font-mono font-bold h-7 w-7 rounded-lg text-xs flex items-center justify-center shrink-0">
                      {activeJourneyStep.day}
                    </div>
                    <div className="space-y-1">
                      <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#8E8E93]">Bugünün Odağı ve Teması:</span>
                      <h4 className="font-bold text-xs text-slate-800 dark:text-white">{activeJourneyStep.title} — {activeJourneyStep.theme}</h4>
                    </div>
                  </div>

                  {/* Reflection Guideline paragraph */}
                  <div className="bg-white dark:bg-stone-950 p-4 rounded-2xl border border-[#E5E5EA] dark:border-stone-850 space-y-1 shadow-xs">
                    <span className="text-[9px] text-[#A2845E] uppercase tracking-wider font-extrabold flex items-center gap-1">
                      💡 Rehberlik Yönergesi:
                    </span>
                    <p className="text-xs text-slate-655 dark:text-stone-300 leading-relaxed font-serif italic">
                      {activeJourneyStep.guideline}
                    </p>
                  </div>

                  {/* Core Prompt Box */}
                  <div className="p-4 bg-[#FFF9E5] dark:bg-[#3E3326]/30 border border-[#FFD60A]/35 rounded-2xl space-y-2">
                    <span className="text-[9px] text-[#A2845E] uppercase tracking-wider font-extrabold flex items-center gap-1">
                      ✨ Gelişim Sorusunu Yanıtlayın:
                    </span>
                    <p className="text-xs text-slate-800 dark:text-[#FFF9E5] leading-relaxed font-serif italic font-semibold">
                      "{activeJourneyStep.prompt}"
                    </p>
                  </div>

                  {/* Input form */}
                  <div className="space-y-3 pt-1">
                    <textarea
                      value={journeyResponse}
                      onChange={(e) => setJourneyResponse(e.target.value)}
                      placeholder="Buraya dök içini, süzgeçten geçir zihnini..."
                      className="w-full text-xs p-4 rounded-2xl bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-800 text-slate-800 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-[#A2845E]/10 min-h-24 resize-none transition-all leading-relaxed"
                      maxLength={1000}
                    />

                    <div className="flex justify-between items-center">
                      <span className="text-[10px] text-slate-400 font-mono">
                        {journeyResponse.length}/1000 karakter
                      </span>

                      {journeySaved ? (
                        <span className="text-xs text-[#A2845E] dark:text-[#FFF9E5] font-bold flex items-center gap-1 animate-fadeIn bg-[#FFF9E5] dark:bg-[#3E3326]/40 px-3.5 py-2 rounded-xl border border-[#FFD60A]/35">
                          <Check className="w-3.5 h-3.5 text-emerald-500 font-bold" />
                          Günlük Yazısı Deftere Eklendi & Sıradaki Gün Açıldı!
                        </span>
                      ) : (
                        <button
                          type="button"
                          disabled={!journeyResponse.trim()}
                          onClick={() => handleSaveJourneyStep(selectedJourney, activeJourneyStep)}
                          className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                            journeyResponse.trim()
                              ? "bg-[#A2845E] text-white hover:bg-[#8D704E] hover:shadow transform hover:-translate-y-0.5"
                              : "bg-[#F2F2F7] text-slate-400 dark:bg-stone-800 dark:text-stone-600 cursor-not-allowed"
                          }`}
                        >
                          <span>Günü Tamamla ve Kaydet</span>
                          <Check className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}
        </div>
      )}

      {/* SUB-TAB 4: Daily / Random Quotes */}
      {activeSubTab === "quotes" && (
        <div className="bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-5 shadow-sm animate-fadeIn" id="motivational-quotes-panel">
          <div className="flex items-center justify-between pb-2.5 border-b border-[#E5E5EA] dark:border-stone-800/40">
            <div className="flex items-center gap-2">
              <Quote className="w-5 h-5 text-[#A2845E]" />
              <h2 className="font-bold text-slate-850 dark:text-white text-base font-sans">Gelişim Kıvılcımı (Inspirational Cards)</h2>
            </div>
            <span className="text-[10px] bg-[#FFF9E5] dark:bg-[#3E3326]/50 px-2.5 py-1 rounded-full text-[#A2845E] dark:text-[#FFF9E5] font-extrabold uppercase tracking-wide border border-[#FFD60A]/35">
              {MOTIVATIONAL_QUOTES[currentQuoteIndex].category}
            </span>
          </div>

          <p className="text-xs text-slate-650 dark:text-slate-400 leading-relaxed font-serif">
            Kişisel gelişimi, motivasyonu ve olumlu düşünmeyi desteklemek için özenle seçilmiş alıntı kartı. Kendinize odaklanmak ve zihninizi pozitife yönlendirmek için yeni kıvılcımlar ateşleyebilirsiniz.
          </p>

          <div className="relative overflow-hidden bg-[#FFF9E5] dark:bg-[#3E3326]/30 border border-[#FFD60A]/25 rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[180px] shadow-sm transition-all duration-300">
            <div className="absolute top-0 right-0 p-4 opacity-5 select-none pointer-events-none">
              <Quote className="w-24 h-24 text-[#A2845E]" />
            </div>
            
            <div className="relative space-y-4">
              <blockquote className="text-lg md:text-xl font-serif italic text-[#A2845E] dark:text-[#FFF9E5] leading-relaxed font-semibold">
                "{MOTIVATIONAL_QUOTES[currentQuoteIndex].text}"
              </blockquote>
              
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-slate-800 dark:text-stone-200">
                  — {MOTIVATIONAL_QUOTES[currentQuoteIndex].author}
                </span>
                <span className="text-[10px] text-[#A2845E] dark:text-[#FFF9E5] uppercase font-mono font-extrabold tracking-wider">
                  Odak: {MOTIVATIONAL_QUOTES[currentQuoteIndex].focus}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 justify-between pt-1">
            <button
              onClick={handleNextQuote}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl text-xs font-bold bg-[#A2845E] text-white hover:bg-[#8D704E] shadow hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Yeni Alıntı Ateşle</span>
            </button>

            <div className="flex gap-2.5 w-full sm:w-auto justify-end">
              <button
                onClick={handleCopyQuote}
                className={`px-4 py-2.5 rounded-xl border border-[#E5E5EA] text-slate-705 bg-white hover:bg-slate-50 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-850 text-xs font-bold flex items-center justify-center gap-1.5 transition-all flex-1 sm:flex-none cursor-pointer ${copied ? "border-emerald-500 text-emerald-605 bg-emerald-50/10" : ""}`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Kopyalandı!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#A2845E]" />
                    <span>Kopyala</span>
                  </>
                )}
              </button>

              {quoteSaved ? (
                <span className="px-4 py-2.5 rounded-xl border border-[#FFD60A]/35 text-[#A2845E] dark:text-[#FFF9E5] bg-[#FFF9E5] dark:bg-[#3E3326]/40 text-xs font-extrabold flex items-center justify-center gap-1.5 animate-fadeIn">
                  <Check className="w-3.5 h-3.5" />
                  <span>Deftere Kaydedildi!</span>
                </span>
              ) : (
                <button
                  onClick={handleSaveQuoteToDiary}
                  className="px-4 py-2.5 rounded-xl border border-[#E5E5EA] text-slate-705 bg-white hover:bg-slate-50 hover:border-[#A2845E]/40 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-850 text-xs font-bold flex items-center justify-center gap-1.5 transition-all flex-1 sm:flex-none cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#A2845E]" />
                  <span>Defterime Kaydet</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
