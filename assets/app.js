// src/main.tsx
import { Component, StrictMode } from "react";
import { createRoot } from "react-dom/client";

// src/App.tsx
import { useState as useState5, useEffect as useEffect3 } from "react";

// src/data.ts
var CATEGORY_LABELS = {
  ["GRATITUDE" /* GRATITUDE */]: {
    label: "\u015E\xFCkran & Te\u015Fekk\xFCr",
    icon: "Heart",
    color: "text-rose-500",
    bg: "bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30"
  },
  ["IDEA" /* IDEA */]: {
    label: "Fikir & \u0130lham",
    icon: "Lightbulb",
    color: "text-amber-500",
    bg: "bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30"
  },
  ["INTENTION" /* INTENTION */]: {
    label: "G\xFCnl\xFCk Niyet",
    icon: "Compass",
    color: "text-emerald-500",
    bg: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30"
  },
  ["REFLECTION" /* REFLECTION */]: {
    label: "\xD6z-Yans\u0131tma",
    icon: "Users",
    color: "text-indigo-500",
    bg: "bg-indigo-50 border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/30"
  },
  ["CHALLENGE" /* CHALLENGE */]: {
    label: "Zorluklar & Kayg\u0131lar",
    icon: "AlertCircle",
    color: "text-sky-500",
    bg: "bg-sky-50 border-sky-100 dark:bg-sky-950/20 dark:border-sky-900/30"
  }
};
var MOOD_LABELS = {
  ["EXCITED" /* EXCITED */]: {
    label: "Canl\u0131 / Harika",
    emoji: "\u26A1",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30"
  },
  ["CALM" /* CALM */]: {
    label: "Sakin / Huzurlu",
    emoji: "\u{1F60C}",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30"
  },
  ["REFLECTIVE" /* REFLECTIVE */]: {
    label: "D\xFC\u015F\xFCnceli / Merakl\u0131",
    emoji: "\u{1F914}",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-950/30"
  },
  ["TIRED" /* TIRED */]: {
    label: "D\xFC\u015F\xFCk Enerji / Yorgun",
    emoji: "\u{1F614}",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30"
  },
  ["ANXIOUS" /* ANXIOUS */]: {
    label: "Stresli / Kayg\u0131l\u0131",
    emoji: "\u{1F92F}",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/30"
  },
  ["GRATEFUL" /* GRATEFUL */]: {
    label: "Minnettar / \u015E\xFCk\xFCr",
    emoji: "\u{1F64F}",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-950/30"
  },
  ["HOPEFUL" /* HOPEFUL */]: {
    label: "Umutlu / \u0130yimser",
    emoji: "\u{1F331}",
    color: "text-lime-600 dark:text-lime-400",
    bg: "bg-lime-50 dark:bg-lime-950/30"
  },
  ["PROUD" /* PROUD */]: {
    label: "\xD6zg\xFCvenli / Gururlu",
    emoji: "\u{1F31F}",
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950/30"
  },
  ["LOVED" /* LOVED */]: {
    label: "Sevgi Dolu / \u015Eefkatli",
    emoji: "\u{1F970}",
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-950/30"
  },
  ["SAD" /* SAD */]: {
    label: "H\xFCz\xFCnl\xFC / K\u0131rg\u0131n",
    emoji: "\u{1F327}\uFE0F",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30"
  },
  ["ANGRY" /* ANGRY */]: {
    label: "\xD6fkeli / Gergin",
    emoji: "\u{1F624}",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30"
  },
  ["OVERWHELMED" /* OVERWHELMED */]: {
    label: "Bunalm\u0131\u015F / Kar\u0131\u015F\u0131k",
    emoji: "\u{1F300}",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/30"
  },
  ["LONELY" /* LONELY */]: {
    label: "Yaln\u0131z / \u0130\xE7e \xC7ekilmi\u015F",
    emoji: "\u{1F342}",
    color: "text-stone-600 dark:text-stone-400",
    bg: "bg-stone-50 dark:bg-stone-900/40"
  }
};
var INITIAL_THOUGHTS = [
  {
    id: "sample-1",
    content: "Bug\xFCn sabah kahvemi i\xE7erken balkonda u\xE7u\u015Fan ku\u015Flar\u0131 izledim. Son zamanlardaki yo\u011Funlu\u011Fun ortas\u0131nda bu sessiz 5 dakika bana inan\u0131lmaz huzurlu ve zengin hissettirdi. Hayat\u0131n minik anlar\u0131ndaki g\xFCzelli\u011Fi bazen \xE7ok \xE7abuk unutuyoruz.",
    category: "GRATITUDE" /* GRATITUDE */,
    mood: "CALM" /* CALM */,
    createdAt: new Date(Date.now() - 36 * 36e5).toISOString(),
    // 36 hours ago
    isBookmarked: true
  },
  {
    id: "sample-2",
    content: "Yeni projeyle ilgili t\xFCm sorumlulu\u011Fu tek ba\u015F\u0131ma \xFCstlendi\u011Fimi ve kimseden yard\u0131m isteyemedi\u011Fimi fark ettim. 'E\u011Fer ben yapmazsam her \u015Fey mahvolur' inanc\u0131 beni a\u015F\u0131r\u0131 h\u0131rpal\u0131yor. Ekip arkada\u015Flar\u0131ma g\xFCvenmeyi ve g\xF6rev da\u011F\u0131l\u0131m\u0131 yapmay\u0131 denemeliyim.",
    category: "CHALLENGE" /* CHALLENGE */,
    mood: "ANXIOUS" /* ANXIOUS */,
    createdAt: new Date(Date.now() - 24 * 36e5).toISOString()
    // 24 hours ago
  },
  {
    id: "sample-3",
    content: "Bug\xFCn her karar\u0131m\u0131 aceleyle de\u011Fil, 3 derin nefes ald\u0131ktan sonra verece\u011Fim. Zihnimi yava\u015Flatarak tepki olu\u015Fturmak yerine bilin\xE7li ve \u015Fefkatli bir \u015Fekilde yan\u0131t vermeyi niyet ediyorum.",
    category: "INTENTION" /* INTENTION */,
    mood: "REFLECTIVE" /* REFLECTIVE */,
    createdAt: new Date(Date.now() - 3 * 36e5).toISOString(),
    // 3 hours ago
    isBookmarked: false
  }
];
var WRITING_PROMPTS = [
  {
    id: "p-1",
    title: "Minnettarl\u0131k Aray\u0131\u015F\u0131",
    prompt: "Bug\xFCn ger\xE7ekle\u015Fen ve hayat\u0131na k\xFC\xE7\xFCc\xFCk de olsa de\u011Fer katan, genellikle hafife ald\u0131\u011F\u0131n 3 basit durumu yaz.",
    category: "GRATITUDE" /* GRATITUDE */,
    suggestedMood: "CALM" /* CALM */
  },
  {
    id: "p-2",
    title: "Duygusal \u015Eefkat",
    prompt: "\u015Eu an i\xE7inde hissetti\u011Fin en belirgin yo\u011Fun duyguyu yarg\u0131lamadan tan\u0131mla. Bu duygu bir misafir olsayd\u0131, sana ne anlatmaya \xE7al\u0131\u015F\u0131yordu?",
    category: "REFLECTION" /* REFLECTION */,
    suggestedMood: "REFLECTIVE" /* REFLECTIVE */
  },
  {
    id: "p-3",
    title: "G\xFCnl\xFCk Odak",
    prompt: "Zihnini en \xE7ok me\u015Fgul eden konuyu bir kenara b\u0131raksayd\u0131n, bug\xFCn sadece 'kendin olmak' i\xE7in neye ihtiya\xE7 duyars\u0131n?",
    category: "INTENTION" /* INTENTION */,
    suggestedMood: "CALM" /* CALM */
  },
  {
    id: "p-4",
    title: "Fikir K\u0131v\u0131lc\u0131m\u0131",
    prompt: "Ba\u015Far\u0131s\u0131z olma ihtimalin s\u0131f\u0131r olsayd\u0131, bug\xFCn ad\u0131m ataca\u011F\u0131n o \xE7\u0131lg\u0131n, heyecan verici yenilik ne olurdu?",
    category: "IDEA" /* IDEA */,
    suggestedMood: "EXCITED" /* EXCITED */
  },
  {
    id: "p-5",
    title: "S\u0131n\u0131rlay\u0131c\u0131 \u0130nan\xE7lar",
    prompt: "Kafan\u0131n i\xE7inde s\xFCrekli tekrarlayan 'Ben bunu beceremem' ya da 'Geciktim' dedi\u011Fin inan\xE7 ne? Bu d\xFC\u015F\xFCncenin k\xF6keninde ne yat\u0131yor olabilir?",
    category: "CHALLENGE" /* CHALLENGE */,
    suggestedMood: "ANXIOUS" /* ANXIOUS */
  }
];

// src/components/DailyStream.tsx
import { useState } from "react";
import {
  Heart,
  Lightbulb,
  Compass,
  Users,
  AlertCircle,
  Trash2,
  Star,
  Search,
  Sparkles,
  BookOpen,
  Clock,
  Check,
  RefreshCw,
  Edit3,
  X,
  CheckCircle2
} from "lucide-react";

// src/services/aiService.ts
var STORAGE_KEY = "thought_defteri_gemini_key";
function getStoredGeminiKey() {
  try {
    return localStorage.getItem(STORAGE_KEY) || "";
  } catch {
    return "";
  }
}
function setStoredGeminiKey(key) {
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
var CBT_DISTORTIONS = [
  {
    type: "Hep ya da Hi\xE7 D\xFC\u015F\xFCncesi (Siyah-Beyaz Bak\u0131\u015F)",
    keywords: ["asla", "hi\xE7bir zaman", "her zaman", "tamamen", "hep", "kusursuz", "s\u0131f\u0131r", "b\xFCt\xFCn"],
    reframes: [
      "Hayat siyah ve beyaz u\xE7lardan de\u011Fil, aradaki gri tonlardan ve n\xFCanslardan olu\u015Fur. Bir alanda aksakl\u0131k olmas\u0131, t\xFCm \xE7aban\u0131n veya s\xFCrecin ge\xE7ersiz oldu\u011Fu anlam\u0131na gelmez. K\xFC\xE7\xFCk ad\u0131mlar ve k\u0131smi ilerlemeler de de\u011Ferlidir.",
      "Durumu 'tamamen ba\u015Far\u0131l\u0131' ya da 'tamamen ba\u015Far\u0131s\u0131z' diye ikiye ay\u0131rmak yerine, bug\xFCnk\xFC deneyimden hangi dersleri ald\u0131\u011F\u0131n\u0131za odaklanabilirsiniz. M\xFCkemmellik de\u011Fil, samimi bir geli\u015Fim hedeflemek zihni rahatlat\u0131r."
    ]
  },
  {
    type: "Felaketle\u015Ftirme (En K\xF6t\xFC Senaryoya Odaklanma)",
    keywords: ["mahvoldum", "felaket", "korkun\xE7", "k\u0131yamet", "dayanamam", "bittim", "her \u015Fey bitti", "korkuyorum"],
    reframes: [
      "Zihnimiz bazen kendimizi koruma refleksiyle en u\xE7 ve en ac\u0131 verici senaryolar\u0131 ger\xE7ekmi\u015F gibi canland\u0131rabilir. Ancak olas\u0131l\u0131k ile ger\xE7eklik ayn\u0131 \u015Fey de\u011Fildir. Bug\xFCne kadar benzer kayg\u0131lar\u0131n \xFCstesinden geldi\u011Finizi ve kaynaklar\u0131n\u0131z\u0131n sand\u0131\u011F\u0131n\u0131zdan g\xFC\xE7l\xFC oldu\u011Funu hat\u0131rlay\u0131n.",
      "\u015Eu anki durum zorlay\u0131c\u0131 ve yorucu olabilir; fakat bu kal\u0131c\u0131 bir felaket de\u011Fil, ge\xE7ici bir dalgad\u0131r. Derin bir nefes al\u0131p \u015Fu an do\u011Frudan etki edebilece\u011Finiz tek bir minik ad\u0131ma odaklan\u0131n."
    ]
  },
  {
    type: "Zihin Okuma & D\u0131\u015Fsal Varsay\u0131m",
    keywords: ["hakk\u0131mda d\xFC\u015F\xFCn\xFCyor", "benden nefret", "beni sevmiyor", "bence \xF6yle d\xFC\u015F\xFCn\xFCyor", "bana k\u0131zg\u0131n", "biliyorum kesin"],
    reframes: [
      "Ba\u015Fkalar\u0131n\u0131n zihnini okuma g\xFCc\xFCm\xFCz yoktur ve insanlar\u0131n davran\u0131\u015Flar\u0131 \xE7o\u011Funlukla kendi i\xE7 d\xFCnyalar\u0131, stresleri veya yorgunluklar\u0131yla ilgilidir. Do\u011Frudan a\xE7\u0131k ileti\u015Fim kurmad\u0131k\xE7a ba\u015Fkalar\u0131n\u0131n d\xFC\u015F\xFCncelerini kesin do\u011Fru kabul etmek gereksiz bir y\xFCk olu\u015Fturur.",
      "Kar\u015F\u0131 taraf\u0131n tavr\u0131n\u0131 ki\u015Fisel bir yarg\u0131 olarak almak yerine, tarafs\u0131z g\xF6zlemci rol\xFCne ge\xE7ebilirsiniz. \u0130htiya\xE7 duydu\u011Funuzda nazik ve net bir dille sormak varsay\u0131mlar\u0131 sonland\u0131r\u0131r."
    ]
  },
  {
    type: "Gereklilik/Meli-Mal\u0131 C\xFCmleleri (Kat\u0131 Kurallar)",
    keywords: ["zorunday\u0131m", "-meli", "-mal\u0131", "yapmal\u0131yd\u0131m", "hata yapmamal\u0131y\u0131m", "kusursuz olmal\u0131", "yeti\u015Fmeliydi"],
    reframes: [
      "Kendimize koydu\u011Fumuz kat\u0131 'meli-mal\u0131' kurallar\u0131, istek veya hedef olmaktan \xE7\u0131k\u0131p su\xE7luluk \xFCreten birer yarg\u0131ca d\xF6n\xFC\u015Febilir. 'Bunu m\xFCkemmel yapmal\u0131y\u0131m' yerine 'Elimden gelenin en iyisini yapmay\u0131 tercih ediyorum ve s\u0131n\u0131rlar\u0131m\u0131 kabul ediyorum' demek \xF6z-\u015Fefkati canland\u0131r\u0131r.",
      "\u0130nsani s\u0131n\u0131rlar\u0131n\u0131z\u0131 ve dinlenme ihtiyac\u0131n\u0131z\u0131 bir eksiklik de\u011Fil, dengeli bir ya\u015Fam\u0131n do\u011Fal gereksinimi olarak g\xF6rmeye izin verin."
    ]
  },
  {
    type: "Ki\u015Fiselle\u015Ftirme & Kendini A\u015F\u0131r\u0131 Su\xE7lama",
    keywords: ["benim y\xFCz\xFCmden", "ben su\xE7luyum", "ben olmasayd\u0131m", "ben beceriksizim", "yine ben"],
    reframes: [
      "Geli\u015Fen olaylar\u0131n pek \xE7ok farkl\u0131 bile\u015Feni, ko\u015Fulu ve di\u011Fer insanlar\u0131n pay\u0131 vard\u0131r. B\xFCt\xFCn sorumlulu\u011Fu tek ba\u015F\u0131na omuzlamak adil de\u011Fildir. Sadece kendi etki alan\u0131n\u0131zdaki davran\u0131\u015Flar\u0131 sahiplenin, geri kalan\u0131n\u0131 ak\u0131\u015Fa b\u0131rak\u0131n.",
      "Kendinizi bir hata \xFCzerinden b\xFCt\xFCn\xFCyle yarg\u0131lamak yerine, zor anlar ya\u015Fayan \u015Fefkate muhta\xE7 bir dosta yakla\u015F\u0131r gibi yakla\u015Fmay\u0131 deneyin."
    ]
  },
  {
    type: "A\u015F\u0131r\u0131 Genelleme & Etiketleme",
    keywords: ["herkes", "hi\xE7 kimse", "ben yetersizim", "aptal\u0131m", "\u015Fanss\u0131z\u0131m", "hep b\xF6yle olur"],
    reframes: [
      "Tekil bir olay ya da deneyim, sizin kim oldu\u011Funuzu veya gelece\u011Finizi tan\u0131mlamaz. Bir anl\u0131k yetersizlik hissi, genel olarak yetersiz oldu\u011Funuz anlam\u0131na gelmez. Kendinizi sert bir etiketle damgalamak yerine, durumun \xF6zg\xFCn ko\u015Fullar\u0131n\u0131 de\u011Ferlendirin.",
      "D\xFCn ya da bug\xFCn ya\u015Fananlar sonsuza dek s\xFCrecek bir kural de\u011Fildir. Her an yeni bir deneyim ve ba\u015Flang\u0131\xE7 i\xE7in bir kap\u0131 aralar."
    ]
  }
];
function generateLocalReframe(original) {
  const lower = original.toLowerCase();
  let matched = CBT_DISTORTIONS.find(
    (d) => d.keywords.some((k) => lower.includes(k))
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
function generateLocalReflection(entries) {
  if (!entries || entries.length === 0) {
    return {
      overallVibe: "Hen\xFCz analiz edilecek yeterli d\xFC\u015F\xFCnce kayd\u0131 bulunmuyor. Birka\xE7 d\xFC\u015F\xFCnce ekledikten sonra zihinsel ikliminizi ke\u015Ffedebilirsiniz.",
      cognitivePatterns: ["G\xF6zlem Ba\u015Flang\u0131c\u0131: D\xFC\u015F\xFCncelerinizi kaydetmeye devam ettik\xE7e zihinsel kal\u0131plar\u0131n\u0131z belirginle\u015Fecektir."],
      growthRecommendations: ["G\xFCnde bir kez 3 dakikan\u0131z\u0131 ay\u0131rarak o anki hislerinizi serbest\xE7e yaz\u0131n."],
      introspectiveQuestion: "Bug\xFCn i\xE7 sesiniz size en \xE7ok neyi f\u0131s\u0131ld\u0131yor?",
      generatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  }
  const moodCounts = {};
  entries.forEach((e) => {
    moodCounts[e.mood] = (moodCounts[e.mood] || 0) + 1;
  });
  const categoryCounts = {};
  entries.forEach((e) => {
    categoryCounts[e.category] = (categoryCounts[e.category] || 0) + 1;
  });
  let dominantMood = "CALM" /* CALM */;
  let maxCount = -1;
  for (const [m, count] of Object.entries(moodCounts)) {
    if (count > maxCount) {
      maxCount = count;
      dominantMood = m;
    }
  }
  const isAnxiousHeavy = (moodCounts["ANXIOUS" /* ANXIOUS */] || 0) + (moodCounts["OVERWHELMED" /* OVERWHELMED */] || 0) > entries.length * 0.3;
  const isGratitudeHeavy = (categoryCounts["GRATITUDE" /* GRATITUDE */] || 0) > 0;
  const isChallengeHeavy = (categoryCounts["CHALLENGE" /* CHALLENGE */] || 0) > 0;
  let overallVibe = "";
  if (isAnxiousHeavy) {
    overallVibe = `Son notlar\u0131n\u0131zda zihninizin belirli bir sorumluluk, belirsizlik veya kontrol aray\u0131\u015F\u0131yla yo\u011Funla\u015Ft\u0131\u011F\u0131 g\xF6zlemleniyor. Bir yandan y\xFCkleri omuzlarken di\u011Fer yandan kendinize yeterince nefes alma alan\u0131 tan\u0131makta zorlan\u0131yor olabilirsiniz. Bu yo\u011Funlu\u011Fu fark etmek, y\xFCk\xFC hafifletmenin ilk ve en k\u0131ymetli ad\u0131m\u0131d\u0131r.`;
  } else if (dominantMood === "CALM" /* CALM */ || dominantMood === "GRATEFUL" /* GRATEFUL */) {
    overallVibe = `Zihniniz dengeli, fark\u0131ndal\u0131k dolu ve sakin bir zeminde ak\u0131yor. G\xFCnl\xFCk hayat\u0131n k\xFC\xE7\xFCk detaylar\u0131ndaki g\xFCzellikleri ve i\xE7sel huzuru takdir edebilme yetiniz, zorlu anlarda s\u0131\u011F\u0131nabilece\u011Finiz en g\xFC\xE7l\xFC i\xE7 kayna\u011F\u0131n\u0131zd\u0131r.`;
  } else if (dominantMood === "EXCITED" /* EXCITED */ || dominantMood === "HOPEFUL" /* HOPEFUL */ || dominantMood === "PROUD" /* PROUD */) {
    overallVibe = `Yaz\u0131lar\u0131n\u0131zdan canl\u0131, \xFCretken ve umut vadeden bir enerji yay\u0131l\u0131yor. Yeni fikirler \xFCretme ve hedeflerinize y\xF6nelme motivasyonunuz y\xFCksek; bu dinami\u011Fi \xF6z-\u015Fefkatle dengeleyerek s\xFCrd\xFCrebilirsiniz.`;
  } else {
    overallVibe = `Son d\xF6nem notlar\u0131n\u0131z, derin bir i\xE7sel g\xF6zlem, sorgulama ve hayat\u0131n farkl\u0131 dinamiklerini anlamland\u0131rma s\xFCrecinde oldu\u011Funuzu yans\u0131t\u0131yor. Kendinize kar\u015F\u0131 yarg\u0131lay\u0131c\u0131 de\u011Fil, merakl\u0131 bir g\xF6zlemci gibi kalabilmeniz zihinsel berrakl\u0131\u011F\u0131n\u0131z\u0131 art\u0131r\u0131yor.`;
  }
  const cognitivePatterns = [];
  if (isChallengeHeavy || isAnxiousHeavy) {
    cognitivePatterns.push("Kontrol ve \xD6ng\xF6r\xFC E\u011Filimi: Gelece\u011Fe veya kontrol d\u0131\u015F\u0131 fakt\xF6rlere fazlaca odaklanarak \u015Fimdiki an\u0131n dinginli\u011Fini erteleme e\u011Filimi seziliyor.");
  }
  if (isGratitudeHeavy) {
    cognitivePatterns.push("\u015E\xFCkran Odakl\u0131 D\xF6n\xFC\u015F\xFCm: Zorlay\u0131c\u0131 \u015Fartlarda dahi k\xFC\xE7\xFCk kazan\u0131mlar\u0131 ve te\u015Fekk\xFCr edilecek detaylar\u0131 g\xF6rebilme zihinsel esnekli\u011Fi mevcut.");
  }
  cognitivePatterns.push("\u0130\xE7sel Yans\u0131tma ve Derinlik: Ya\u015Fanan olaylar\u0131 yaln\u0131zca y\xFCzeysel ge\xE7i\u015Ftirmek yerine, kendi duygu ve d\xFC\u015F\xFCnce s\xFCre\xE7lerinizle ba\u011Fda\u015Ft\u0131rarak anlamland\u0131rma beceriniz y\xFCksek.");
  if (cognitivePatterns.length < 3) {
    cognitivePatterns.push("Gereklilik Kal\u0131plar\u0131: Kendinize zaman zaman y\xFCksek standartlar koyarak mola vermeyi hak edilmesi gereken bir \xF6d\xFCl gibi alg\u0131lama e\u011Filimi g\xF6zleniyor.");
  }
  const growthRecommendations = [
    "Duygular\u0131n\u0131z\u0131 Bast\u0131rmadan Kar\u015F\u0131lay\u0131n: Zor bir his belirdi\u011Finde onu hemen \xE7\xF6zmeye \xE7al\u0131\u015Fmak yerine '\u015Eu an bu hissi deneyimliyorum ve bu insani' diyerek 2 dakika sadece nefesinizle kal\u0131n.",
    "Mikro \u015E\xFCkran Molalar\u0131: G\xFCn i\xE7inde zihniniz gerildi\u011Finde sadece \xE7evrenizdeki 3 nesneye dikkatle bak\u0131p duyular\u0131n\u0131zla ana d\xF6n\xFCn.",
    "Kendinize Yak\u0131n Bir Dost Gibi Konu\u015Fun: Kendinizi ele\u015Ftirirken kulland\u0131\u011F\u0131n\u0131z c\xFCmleleri, sevdi\u011Finiz bir dostunuza s\xF6yler miydiniz? Kendinize ayn\u0131 nezaketle seslenin."
  ];
  const introspectiveQuestion = isAnxiousHeavy ? "E\u011Fer \u015Fu an zihnimi me\u015Fgul eden bu durumun m\xFCkemmel \xE7\xF6z\xFClmesine gerek olmasayd\u0131, kendime nas\u0131l bir hafiflik hediye ederdim?" : "Bug\xFCn sadece bir \u015Feyleri ba\u015Farmak i\xE7in de\u011Fil, yaln\u0131zca 'var olmak' ve kendimle ba\u015F ba\u015Fa kalmak i\xE7in neye ihtiyac\u0131m var?";
  return {
    overallVibe,
    cognitivePatterns,
    growthRecommendations,
    introspectiveQuestion,
    generatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
}
async function callDirectGemini(apiKey, prompt, schema) {
  const models = ["gemini-2.5-flash", "gemini-1.5-flash", "gemini-2.0-flash"];
  let lastError = null;
  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const payload = {
        contents: [{ parts: [{ text: prompt }] }]
      };
      if (schema) {
        payload.generationConfig = {
          responseMimeType: "application/json",
          responseSchema: schema
        };
      }
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData?.error?.message || `Gemini API HTTP ${res.status}`);
      }
      const json = await res.json();
      const text = json?.candidates?.[0]?.content?.parts?.[0]?.text;
      if (!text) throw new Error("Gemini API bo\u015F yan\u0131t d\xF6nd\xFCrd\xFC.");
      if (schema) {
        return JSON.parse(text);
      }
      return text;
    } catch (e) {
      lastError = e;
    }
  }
  throw lastError || new Error("Gemini API modellerine ula\u015F\u0131lamad\u0131.");
}
var aiService = {
  // Test connection with an API key
  async testApiKey(key) {
    if (!key.trim()) {
      return { success: false, message: "L\xFCtfen bir API anahtar\u0131 giriniz." };
    }
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash?key=${key.trim()}`;
      const res = await fetch(url);
      if (res.status === 400 || res.status === 403) {
        const data = await res.json().catch(() => ({}));
        return { success: false, message: data?.error?.message || "Ge\xE7ersiz API Anahtar\u0131." };
      }
      return { success: true, message: "Ba\u011Flant\u0131 ba\u015Far\u0131l\u0131! Gemini 2.5 Flash aktif." };
    } catch (err) {
      return { success: false, message: "A\u011F veya ba\u011Flant\u0131 hatas\u0131: " + (err.message || String(err)) };
    }
  },
  // 1. Generate Daily Quote & Journaling Prompt
  async getDailyQuoteAndPrompt() {
    const key = getStoredGeminiKey();
    try {
      const headers = {};
      if (key) headers["x-gemini-api-key"] = key;
      const res = await fetch("/api/generate-prompt", { headers });
      if (res.ok) {
        const data = await res.json();
        if (data.quote && data.journalPrompt) {
          return { ...data, source: "gemini" };
        }
      }
    } catch {
    }
    if (key) {
      try {
        const prompt = `Ki\u015Fisel geli\u015Fim, fark\u0131ndal\u0131k veya psikoloji alan\u0131nda ilham verici T\xFCrk\xE7e bir al\u0131nt\u0131 ve bu s\xF6zle e\u015Fle\u015Fen derin bir g\xFCnl\xFCk tutma sorusu \xFCret. JSON \u015Femas\u0131nda ver: quote (string), author (string), journalPrompt (string).`;
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
    const quotes = [
      {
        quote: "Kendinizi dinlemek, hayat\u0131n g\xFCr\xFClt\xFCs\xFC i\xE7inde duyabilece\u011Finiz en g\xFCzel f\u0131s\u0131lt\u0131d\u0131r.",
        author: "Fark\u0131ndal\u0131k Bilgeli\u011Fi",
        journalPrompt: "Bug\xFCn zihninizin arka plan\u0131nda en \xE7ok hangi duygu veya d\xFC\u015F\xFCncenin yank\u0131land\u0131\u011F\u0131n\u0131 fark ediyorsunuz?"
      },
      {
        quote: "Bulutlar gelir ve gider. G\xF6ky\xFCz\xFC ise her zaman oradad\u0131r ve sakindir.",
        author: "Pema Ch\xF6dr\xF6n",
        journalPrompt: "\u015Eu an gelip ge\xE7ici olan hangi d\xFC\u015F\xFCnceyi kal\u0131c\u0131 sanarak kendinizi yoruyorsunuz?"
      },
      {
        quote: "Kendine \u015Fefkat g\xF6stermek, ba\u015Far\u0131s\u0131zl\u0131\u011F\u0131 kabul etmek de\u011Fil; insan oldu\u011Funu hat\u0131rlamakt\u0131r.",
        author: "Dr. Kristin Neff",
        journalPrompt: "Bug\xFCn kendinize s\xF6ylemeye en \xE7ok ihtiya\xE7 duydu\u011Funuz \u015Fefkatli c\xFCmle nedir?"
      }
    ];
    const chosen = quotes[Math.floor(Math.random() * quotes.length)];
    return { ...chosen, source: "local-engine" };
  },
  // 2. Generate CBT Reframe
  async generateReframe(original) {
    const key = getStoredGeminiKey();
    try {
      const headers = { "Content-Type": "application/json" };
      if (key) headers["x-gemini-api-key"] = key;
      const res = await fetch("/api/generate-reframe", {
        method: "POST",
        headers,
        body: JSON.stringify({ original })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.reframed && data.distortionType) {
          return { ...data, original, source: "gemini" };
        }
      }
    } catch {
    }
    if (key) {
      try {
        const promptText = `Kullan\u0131c\u0131 \u015Fu olumsuz veya kendini sabote eden d\xFC\u015F\xFCncesini payla\u015Ft\u0131: "${original}".
Bunu Bili\u015Fsel Davran\u0131\u015F\xE7\u0131 Terapi (CBT) yakla\u015F\u0131mlar\u0131na dayanarak analiz et. Ger\xE7ek\xE7i, \u015Fefkatli ve yap\u0131c\u0131 bir pencereden yeniden form\xFCle et (cognitive reframe).
JSON format\u0131nda yan\u0131tla: original (string), reframed (string), distortionType (string).`;
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
    return generateLocalReframe(original);
  },
  // 3. Analyze Thoughts (Zihinsel Ayna)
  async analyzeThoughts(entries) {
    const key = getStoredGeminiKey();
    try {
      const headers = { "Content-Type": "application/json" };
      if (key) headers["x-gemini-api-key"] = key;
      const res = await fetch("/api/analyze-thoughts", {
        method: "POST",
        headers,
        body: JSON.stringify({ entries })
      });
      if (res.ok) {
        const data = await res.json();
        if (data.overallVibe && data.cognitivePatterns) {
          return {
            overallVibe: data.overallVibe,
            cognitivePatterns: data.cognitivePatterns || [],
            growthRecommendations: data.growthRecommendations || [],
            introspectiveQuestion: data.introspectiveQuestion,
            generatedAt: (/* @__PURE__ */ new Date()).toISOString()
          };
        }
      }
    } catch {
    }
    if (key && entries.length > 0) {
      try {
        const entriesSummary = entries.slice(0, 15).map(
          (e, idx) => `#${idx + 1} (${e.category}, ${e.mood}, ${e.createdAt}): "${e.content}"`
        ).join("\n");
        const promptText = `Sen uzman bir fark\u0131ndal\u0131k ko\xE7u ve bili\u015Fsel terapistsin. Kullan\u0131c\u0131n\u0131n \u015Fu d\xFC\u015F\xFCnce defteri yaz\u0131lar\u0131n\u0131 analiz et:
${entriesSummary}
A\u015Fa\u011F\u0131daki JSON \u015Femas\u0131nda T\xFCrk\xE7e rapor \xFCret:
overallVibe (string), cognitivePatterns (array of string), growthRecommendations (array of string), introspectiveQuestion (string).`;
        const schema = {
          type: "OBJECT",
          properties: {
            overallVibe: { type: "STRING" },
            cognitivePatterns: { type: "ARRAY", items: { type: "STRING" } },
            growthRecommendations: { type: "ARRAY", items: { type: "STRING" } },
            introspectiveQuestion: { type: "STRING" }
          },
          required: ["overallVibe", "cognitivePatterns", "growthRecommendations", "introspectiveQuestion"]
        };
        const data = await callDirectGemini(key, promptText, schema);
        return {
          overallVibe: data.overallVibe,
          cognitivePatterns: data.cognitivePatterns || [],
          growthRecommendations: data.growthRecommendations || [],
          introspectiveQuestion: data.introspectiveQuestion,
          generatedAt: (/* @__PURE__ */ new Date()).toISOString()
        };
      } catch (e) {
        console.warn("Direct Gemini Analysis failed, falling back to local engine:", e);
      }
    }
    return generateLocalReflection(entries);
  }
};

// src/components/DailyStream.tsx
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function CategoryIcon({ category, className = "w-4 h-4" }) {
  switch (category) {
    case "GRATITUDE" /* GRATITUDE */:
      return /* @__PURE__ */ jsx(Heart, { className });
    case "IDEA" /* IDEA */:
      return /* @__PURE__ */ jsx(Lightbulb, { className });
    case "INTENTION" /* INTENTION */:
      return /* @__PURE__ */ jsx(Compass, { className });
    case "REFLECTION" /* REFLECTION */:
      return /* @__PURE__ */ jsx(Users, { className });
    case "CHALLENGE" /* CHALLENGE */:
      return /* @__PURE__ */ jsx(AlertCircle, { className });
    default:
      return /* @__PURE__ */ jsx(Compass, { className });
  }
}
function formatEntryDate(dateString) {
  try {
    const date = new Date(dateString);
    const now = /* @__PURE__ */ new Date();
    if (date.toDateString() === now.toDateString()) {
      return `Bug\xFCn, ${date.toLocaleTimeString("tr", { hour: "2-digit", minute: "2-digit" })}`;
    }
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `D\xFCn, ${date.toLocaleTimeString("tr", { hour: "2-digit", minute: "2-digit" })}`;
    }
    return date.toLocaleDateString("tr", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
  } catch (e) {
    return "Biraz \xF6nce";
  }
}
function DailyStream({
  entries,
  onAddEntry,
  onEditEntry,
  onDeleteEntry,
  onToggleBookmark
}) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("REFLECTION" /* REFLECTION */);
  const [mood, setMood] = useState("CALM" /* CALM */);
  const [activePromptId, setActivePromptId] = useState(null);
  const [activePromptText, setActivePromptText] = useState(null);
  const [filterCategory, setFilterCategory] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editContent, setEditContent] = useState("");
  const [editCategory, setEditCategory] = useState("REFLECTION" /* REFLECTION */);
  const [editMood, setEditMood] = useState("CALM" /* CALM */);
  const [reframeLoading, setReframeLoading] = useState({});
  const [reframeResults, setReframeResults] = useState({});
  const [reframeErrors, setReframeErrors] = useState({});
  const [showPromptsSelector, setShowPromptsSelector] = useState(false);
  const triggerReframe = async (id, text) => {
    setReframeLoading((prev) => ({ ...prev, [id]: true }));
    setReframeErrors((prev) => ({ ...prev, [id]: "" }));
    try {
      const data = await aiService.generateReframe(text);
      setReframeResults((prev) => ({
        ...prev,
        [id]: {
          reframed: data.reframed,
          distortionType: data.distortionType
        }
      }));
    } catch (err) {
      setReframeErrors((prev) => ({ ...prev, [id]: err.message || "Hata olu\u015Ftu." }));
    } finally {
      setReframeLoading((prev) => ({ ...prev, [id]: false }));
    }
  };
  const handleSelectPrompt = (promptId, promptText, suggestedCat, suggestedMood) => {
    setActivePromptId(promptId);
    setActivePromptText(promptText);
    setCategory(suggestedCat);
    if (suggestedMood) setMood(suggestedMood);
    setShowPromptsSelector(false);
  };
  const handleClearPrompt = () => {
    setActivePromptId(null);
    setActivePromptText(null);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    let submissionContent = content;
    if (activePromptText) {
      submissionContent = `[Soru: ${activePromptText}]

${content}`;
    }
    onAddEntry(submissionContent, category, mood);
    setContent("");
    handleClearPrompt();
  };
  const handleStartEdit = (entry) => {
    setEditingId(entry.id);
    setEditContent(entry.content);
    setEditCategory(entry.category);
    setEditMood(entry.mood);
  };
  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };
  const handleSaveEdit = (id) => {
    if (!editContent.trim()) return;
    onEditEntry(id, editContent.trim(), editCategory, editMood);
    setEditingId(null);
  };
  const getFilteredEntries = () => {
    return entries.filter((entry) => {
      const matchesCategory = filterCategory === "ALL" || filterCategory === "BOOKMARKED" && entry.isBookmarked || entry.category === filterCategory;
      const matchesSearch = searchQuery.trim() === "" || entry.content.toLowerCase().includes(searchQuery.toLowerCase()) || entry.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };
  const filteredEntries = getFilteredEntries();
  return /* @__PURE__ */ jsxs("div", { className: "space-y-6 pb-28", id: "daily-stream-container", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-800/80 p-5 sm:p-6 rounded-[32px] shadow-sm", id: "write-thought-widget", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-stone-800/50", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "relative flex h-2.5 w-2.5", children: [
            /* @__PURE__ */ jsx("span", { className: "animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A2845E] opacity-75" }),
            /* @__PURE__ */ jsx("span", { className: "relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A2845E]" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-semibold text-slate-800 dark:text-white", children: "\u015Eimdi Zihnini Hafiflet" })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => setShowPromptsSelector(!showPromptsSelector),
            className: "text-xs text-[#A2845E] dark:text-[#c4a682] font-semibold hover:underline flex items-center gap-1.5 p-1 rounded-lg hover:bg-[#F2F2F7] dark:hover:bg-stone-800 cursor-pointer",
            children: [
              /* @__PURE__ */ jsx(BookOpen, { className: "w-3.5 h-3.5" }),
              "Yazma Y\xF6nergesi Se\xE7"
            ]
          }
        )
      ] }),
      showPromptsSelector && /* @__PURE__ */ jsxs("div", { className: "bg-[#F2F2F7] dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-stone-800 p-3 rounded-2xl mt-4 space-y-2.5 animate-fadeIn", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-wider font-extrabold text-[#A2845E] dark:text-[#c4a682]", children: "\u0130lham Veren Konular" }),
        /* @__PURE__ */ jsx("div", { className: "grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1", children: WRITING_PROMPTS.map((p) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => handleSelectPrompt(p.id, p.prompt, p.category, p.suggestedMood),
            className: "text-left text-xs p-2.5 rounded-xl border border-white dark:border-stone-800 dark:bg-stone-950 bg-white hover:border-[#A2845E]/40 hover:bg-[#FFF9E5]/30 dark:hover:border-[#A2845E]/30 transition-all flex items-start justify-between group cursor-pointer",
            children: [
              /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx("span", { className: "font-bold text-slate-700 dark:text-slate-300 block", children: p.title }),
                /* @__PURE__ */ jsx("span", { className: "text-slate-500 dark:text-slate-400 font-normal leading-relaxed", children: p.prompt })
              ] }),
              /* @__PURE__ */ jsx(Check, { className: "w-3.5 h-3.5 text-[#A2845E] opacity-0 group-hover:opacity-100 transition-opacity ml-1.5 flex-shrink-0 mt-0.5" })
            ]
          },
          p.id
        )) })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 mt-3", children: [
        activePromptText && /* @__PURE__ */ jsxs("div", { className: "bg-[#FFF9E5] dark:bg-[#3E3326]/40 border border-[#FFD60A]/40 dark:border-[#A2845E]/30 px-3 py-2.5 rounded-xl flex items-start justify-between text-xs text-slate-700 dark:text-[#FFF9E5]", children: [
          /* @__PURE__ */ jsxs("span", { className: "leading-relaxed font-semibold", children: [
            "\u2728 ",
            activePromptText
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleClearPrompt,
              className: "text-[10px] font-bold text-slate-400 dark:text-slate-500 hover:text-rose-500 bg-white dark:bg-stone-855 p-1 rounded-full border border-slate-100 dark:border-stone-800 flex-shrink-0 ml-2 cursor-pointer",
              title: "\u0130lham\u0131 temizle",
              children: "\u2715"
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: content,
            onChange: (e) => setContent(e.target.value),
            placeholder: activePromptText ? "Bu soru sence neleri canland\u0131r\u0131yor? Buraya d\xF6k zihnini..." : "\u015Eu an akl\u0131ndan neler ge\xE7iyor? \xD6zg\xFCrce yaz ve zihnini hafiflet...",
            className: "w-full text-sm p-4 rounded-2xl bg-[#FDFCFB] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A2845E]/20 focus:border-[#A2845E] min-h-24 resize-none transition-all leading-relaxed",
            maxLength: 1e3
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-[#8E8E93] uppercase tracking-widest block", children: "KATEGOR\u0130" }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-1.5 shadow-sm border border-[#E5E5EA] dark:border-stone-800 p-1.5 rounded-xl bg-[#F2F2F7] dark:bg-stone-950", children: Object.keys(CATEGORY_LABELS).map((catName) => {
              const cat = catName;
              const value = CATEGORY_LABELS[cat];
              const isSelected = category === cat;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setCategory(cat),
                  title: value.label,
                  className: `py-2 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer ${isSelected ? "bg-[#A2845E] text-white shadow-sm" : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/40"}`,
                  children: [
                    /* @__PURE__ */ jsx(CategoryIcon, { category: cat, className: "w-4 h-4" }),
                    /* @__PURE__ */ jsx("span", { className: "text-[9px] font-bold mt-1 tracking-tight truncate max-w-full px-0.5", children: value.label.split(" ")[0] })
                  ]
                },
                cat
              );
            }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-[#8E8E93] uppercase tracking-widest block", children: "\u015EU ANK\u0130 H\u0130S" }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx("span", { className: "text-sm", children: MOOD_LABELS[mood]?.emoji }),
                /* @__PURE__ */ jsx("span", { className: "text-[#A2845E] dark:text-amber-400 font-bold", children: MOOD_LABELS[mood]?.label })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 p-2 rounded-2xl border border-[#E5E5EA] dark:border-stone-800 bg-[#F2F2F7] dark:bg-stone-950 max-h-40 overflow-y-auto", children: Object.keys(MOOD_LABELS).map((mName) => {
              const m = mName;
              const value = MOOD_LABELS[m];
              const isSelected = mood === m;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setMood(m),
                  title: value.label,
                  className: `px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer ${isSelected ? "bg-white dark:bg-stone-800 shadow-sm border border-amber-400 font-bold text-stone-900 dark:text-stone-100 scale-102" : "bg-white/60 dark:bg-stone-900/60 border border-transparent text-stone-600 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100 opacity-80 hover:opacity-100"}`,
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "text-base select-none leading-none", children: value.emoji }),
                    /* @__PURE__ */ jsx("span", { className: "text-[11px] leading-tight font-medium", children: value.label.split("/")[0].trim() })
                  ]
                },
                m
              );
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-2 border-t border-[#E5E5EA] dark:border-stone-800/40", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-xs font-mono text-slate-400 dark:text-slate-500", children: [
            content.length,
            "/1000 karakter"
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "submit",
              disabled: !content.trim(),
              className: `px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer ${content.trim() ? "bg-[#A2845E] text-white hover:bg-[#8D704E] hover:shadow transform hover:-translate-y-0.5 active:translate-y-0" : "bg-[#F2F2F7] text-slate-400 dark:bg-stone-800 dark:text-slate-600 cursor-not-allowed"}`,
              children: [
                /* @__PURE__ */ jsx("span", { children: "Deftere Kaydet" }),
                !activePromptText ? /* @__PURE__ */ jsx(Clock, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5" })
              ]
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-[#F2F2F7] dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-800/80 p-3 rounded-[24px] flex flex-col sm:flex-row items-center gap-3", id: "filters-container-box", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative w-full sm:flex-1", children: [
          /* @__PURE__ */ jsx(Search, { className: "absolute left-3.5 top-2.5 w-4 h-4 text-[#8E8E93]" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: searchQuery,
              onChange: (e) => setSearchQuery(e.target.value),
              placeholder: "D\xFC\u015F\xFCncelerini ara...",
              className: "w-full text-xs pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 text-slate-700 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A2845E]/10"
            }
          )
        ] }),
        searchQuery && /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setSearchQuery(""),
            className: "text-[10px] text-[#A2845E] hover:text-[#8D704E] bg-white dark:bg-stone-800 px-2.5 py-1 rounded-lg border border-[#E5E5EA] cursor-pointer",
            children: "Aramay\u0131 s\u0131f\u0131rla"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "overflow-x-auto scrollbar-none flex gap-1.5 pb-1 px-0.5", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setFilterCategory("ALL"),
            className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${filterCategory === "ALL" ? "bg-[#A2845E] border-[#A2845E] text-white" : "bg-white border-[#E5E5EA] text-slate-600 hover:bg-slate-50 dark:bg-stone-900 dark:border-stone-800 dark:text-slate-400"}`,
            children: [
              "T\xFCm\xFC (",
              entries.length,
              ")"
            ]
          }
        ),
        /* @__PURE__ */ jsxs(
          "button",
          {
            onClick: () => setFilterCategory("BOOKMARKED"),
            className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1 cursor-pointer ${filterCategory === "BOOKMARKED" ? "bg-amber-500 border-amber-500 text-white shadow-sm" : "bg-white border-[#E5E5EA] text-amber-500 dark:bg-stone-900 dark:border-stone-800 dark:hover:bg-slate-900/60"}`,
            children: [
              /* @__PURE__ */ jsx(Star, { className: "w-3.5 h-3.5 fill-current" }),
              "Y\u0131ld\u0131zl\u0131lar (",
              entries.filter((e) => e.isBookmarked).length,
              ")"
            ]
          }
        ),
        Object.keys(CATEGORY_LABELS).map((catName) => {
          const cat = catName;
          const detail = CATEGORY_LABELS[cat];
          const isSelected = filterCategory === cat;
          const count = entries.filter((e) => e.category === cat).length;
          return /* @__PURE__ */ jsxs(
            "button",
            {
              onClick: () => setFilterCategory(cat),
              className: `px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 cursor-pointer ${isSelected ? "bg-[#A2845E] border-[#A2845E] text-white" : "bg-white border-[#E5E5EA] text-slate-600 hover:bg-slate-50 dark:bg-stone-900 dark:border-stone-800 dark:text-slate-400"}`,
              children: [
                /* @__PURE__ */ jsx(CategoryIcon, { category: cat, className: "w-3.5 h-3.5" }),
                /* @__PURE__ */ jsx("span", { children: detail.label.split(" ")[0] }),
                /* @__PURE__ */ jsxs("span", { className: "opacity-60 text-[10px]", children: [
                  "(",
                  count,
                  ")"
                ] })
              ]
            },
            cat
          );
        })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "space-y-4", id: "entries-flow-list", children: filteredEntries.length === 0 ? /* @__PURE__ */ jsxs("div", { className: "bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 p-10 rounded-3xl text-center space-y-3", id: "empty-state", children: [
        /* @__PURE__ */ jsx("span", { className: "text-4xl block", children: "\u{1F343}" }),
        /* @__PURE__ */ jsx("h3", { className: "font-semibold text-slate-700 dark:text-slate-300", children: "Arad\u0131\u011F\u0131n d\xFC\u015F\xFCnce bulunamad\u0131" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 dark:text-slate-500 max-w-xs mx-auto leading-relaxed", children: "Bu kategori veya filtreyle e\u015Fle\u015Fen bir yaz\u0131 bulunmuyor. Yeni bir \u015Feyler karalayarak buray\u0131 canland\u0131rabilirsin." })
      ] }) : filteredEntries.map((entry) => {
        const isEditingThis = editingId === entry.id;
        const catDetail = CATEGORY_LABELS[entry.category] || CATEGORY_LABELS["REFLECTION" /* REFLECTION */];
        const moodDetail = MOOD_LABELS[entry.mood] || MOOD_LABELS["CALM" /* CALM */];
        const isChallenge = entry.category === "CHALLENGE" /* CHALLENGE */;
        const hasReframe = reframeResults[entry.id];
        const isReframeLoading = reframeLoading[entry.id];
        const reframeError = reframeErrors[entry.id];
        return /* @__PURE__ */ jsxs(
          "div",
          {
            className: "bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-800/80 rounded-[32px] p-5 sm:p-6 hover:shadow-md transition-all relative overflow-hidden",
            id: `thought-card-${entry.id}`,
            children: [
              /* @__PURE__ */ jsx("div", { className: `absolute top-0 left-0 right-0 h-1.5 ${catDetail.color.replace("text-", "bg-")}` }),
              isEditingThis ? (
                /* Inline Editing Mode */
                /* @__PURE__ */ jsxs("div", { className: "space-y-4 pt-1 animate-fadeIn", children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-2 border-b border-[#E5E5EA] dark:border-stone-800/60", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx(Edit3, { className: "w-4 h-4 text-[#A2845E]" }),
                      /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider", children: "D\xFC\u015F\xFCnceyi D\xFCzenle" })
                    ] }),
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleCancelEdit,
                        className: "p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer",
                        title: "Vazge\xE7",
                        children: /* @__PURE__ */ jsx(X, { className: "w-4 h-4" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      value: editContent,
                      onChange: (e) => setEditContent(e.target.value),
                      className: "w-full text-sm p-3.5 rounded-2xl bg-[#FDFCFB] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A2845E]/20 focus:border-[#A2845E] min-h-28 resize-none leading-relaxed",
                      maxLength: 1e3
                    }
                  ),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-[#8E8E93] uppercase tracking-wider block", children: "Kategori" }),
                    /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 rounded-xl bg-[#F2F2F7] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800", children: Object.keys(CATEGORY_LABELS).map((catName) => {
                      const cat = catName;
                      const value = CATEGORY_LABELS[cat];
                      const isSelected = editCategory === cat;
                      return /* @__PURE__ */ jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setEditCategory(cat),
                          className: `py-1.5 rounded-lg flex items-center justify-center gap-1 text-[11px] font-semibold transition-all cursor-pointer ${isSelected ? "bg-[#A2845E] text-white shadow-xs" : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50"}`,
                          children: [
                            /* @__PURE__ */ jsx(CategoryIcon, { category: cat, className: "w-3.5 h-3.5" }),
                            /* @__PURE__ */ jsx("span", { children: value.label.split(" ")[0] })
                          ]
                        },
                        cat
                      );
                    }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-[#8E8E93] uppercase tracking-wider block", children: "Duygu" }),
                    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 p-2 rounded-xl bg-[#F2F2F7] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 max-h-32 overflow-y-auto", children: Object.keys(MOOD_LABELS).map((mName) => {
                      const m = mName;
                      const val = MOOD_LABELS[m];
                      const isSelected = editMood === m;
                      return /* @__PURE__ */ jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: () => setEditMood(m),
                          className: `px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${isSelected ? "bg-white dark:bg-stone-800 border border-amber-400 font-bold text-stone-900 dark:text-stone-100 shadow-xs" : "bg-white/50 dark:bg-stone-900/50 text-stone-600 dark:text-stone-400 opacity-75 hover:opacity-100"}`,
                          children: [
                            /* @__PURE__ */ jsx("span", { children: val.emoji }),
                            /* @__PURE__ */ jsx("span", { className: "text-[10px]", children: val.label.split("/")[0].trim() })
                          ]
                        },
                        m
                      );
                    }) })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2 pt-2 border-t border-[#E5E5EA] dark:border-stone-800/60", children: [
                    /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: handleCancelEdit,
                        className: "px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer",
                        children: "Vazge\xE7"
                      }
                    ),
                    /* @__PURE__ */ jsxs(
                      "button",
                      {
                        type: "button",
                        onClick: () => handleSaveEdit(entry.id),
                        disabled: !editContent.trim(),
                        className: "px-5 py-2 rounded-xl text-xs font-bold bg-[#A2845E] text-white hover:bg-[#8D704E] flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50",
                        children: [
                          /* @__PURE__ */ jsx(CheckCircle2, { className: "w-3.5 h-3.5" }),
                          /* @__PURE__ */ jsx("span", { children: "De\u011Fi\u015Fiklikleri Kaydet" })
                        ]
                      }
                    )
                  ] })
                ] })
              ) : (
                /* Normal View Mode */
                /* @__PURE__ */ jsxs(Fragment, { children: [
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pb-3.5 border-b border-[#E5E5EA] dark:border-stone-800/40", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                      /* @__PURE__ */ jsx("div", { className: `p-2 rounded-xl bg-[#F2F2F7] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 ${catDetail.color}`, children: /* @__PURE__ */ jsx(CategoryIcon, { category: entry.category, className: "w-4 h-4" }) }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsx("span", { className: "text-[10px] font-extrabold text-[#8E8E93] uppercase tracking-wider block", children: "Kategori" }),
                        /* @__PURE__ */ jsx("span", { className: "text-xs font-bold text-slate-800 dark:text-white capitalize", children: catDetail.label })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 bg-[#F2F2F7] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 px-3 py-1 rounded-full text-xs", children: [
                      /* @__PURE__ */ jsx("span", { className: "text-base select-none leading-none", children: moodDetail.emoji }),
                      /* @__PURE__ */ jsx("span", { className: "font-bold text-[#8E8E93] dark:text-slate-400 text-[11px]", children: moodDetail.label.split("/")[0].trim() })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "py-4 text-sm text-slate-700 dark:text-slate-350 leading-relaxed font-normal whitespace-pre-wrap", children: entry.content }),
                  isChallenge && /* @__PURE__ */ jsxs("div", { className: "mt-2.5 mb-2 px-1", children: [
                    !hasReframe && !isReframeLoading && /* @__PURE__ */ jsxs(
                      "button",
                      {
                        onClick: () => triggerReframe(entry.id, entry.content),
                        className: "w-full text-xs font-bold py-3 border border-[#E5E5EA] bg-[#F2F2F7] text-[#A2845E] dark:border-stone-800 dark:bg-stone-950 dark:text-amber-400 rounded-2xl hover:bg-[#FFF9E5]/20 flex items-center justify-center gap-1.5 group transition-all cursor-pointer",
                        children: [
                          /* @__PURE__ */ jsx(Sparkles, { className: "w-3.5 h-3.5 text-[#A2845E] group-hover:scale-110 transition-transform" }),
                          /* @__PURE__ */ jsx("span", { children: "Bu D\xFC\u015F\xFCnceyi Yap\u0131c\u0131 Olarak Yeniden \xC7er\xE7evele (AI CBT)" })
                        ]
                      }
                    ),
                    isReframeLoading && /* @__PURE__ */ jsxs("div", { className: "w-full text-xs font-semibold py-3 bg-[#F2F2F7] dark:bg-stone-950/55 border border-[#E5E5EA] dark:border-stone-800 text-slate-500 dark:text-slate-400 rounded-2xl flex items-center justify-center gap-2 animate-pulse", children: [
                      /* @__PURE__ */ jsx(RefreshCw, { className: "w-3.5 h-3.5 animate-spin text-slate-400" }),
                      /* @__PURE__ */ jsx("span", { children: "Mevcut bili\u015Fsel \xF6r\xFCnt\xFC inceleniyor, \u015Fefkatli bir alternatif aran\u0131yor..." })
                    ] }),
                    hasReframe && /* @__PURE__ */ jsxs("div", { className: "bg-[#FFF9E5] dark:bg-[#3E3326]/40 border-l-4 border-[#A2845E] p-4 rounded-2xl space-y-2 animate-fadeIn", children: [
                      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
                        /* @__PURE__ */ jsxs("span", { className: "text-[10px] uppercase font-bold text-[#A2845E] dark:text-[#c4a682] tracking-wider flex items-center gap-1", children: [
                          /* @__PURE__ */ jsx(Sparkles, { className: "w-3 h-3 fill-current animate-pulse" }),
                          "Zihinsel Ayna Yeniden \xC7er\xE7evesi (CBT)"
                        ] }),
                        /* @__PURE__ */ jsx("span", { className: "text-[9px] bg-[#FFF9E5]/80 border border-[#E5E5EA] dark:border-stone-800 px-2 py-0.5 rounded-full text-[#A2845E] font-semibold", children: hasReframe.distortionType })
                      ] }),
                      /* @__PURE__ */ jsxs("p", { className: "text-xs text-slate-700 dark:text-slate-305 leading-relaxed font-serif italic pl-1 border-l-2 border-[#A2845E]/40", children: [
                        '"',
                        hasReframe.reframed,
                        '"'
                      ] })
                    ] }),
                    reframeError && /* @__PURE__ */ jsxs("p", { className: "text-[10px] text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 px-3 py-1.5 rounded-xl", children: [
                      "Yeniden yap\u0131land\u0131rma ba\u015Far\u0131s\u0131z oldu: ",
                      reframeError
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800/40 mt-1", children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 font-mono text-[10px] text-slate-400 dark:text-slate-500", children: [
                      /* @__PURE__ */ jsx(Clock, { className: "w-3 h-3" }),
                      /* @__PURE__ */ jsx("span", { children: formatEntryDate(entry.createdAt) })
                    ] }),
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => onToggleBookmark(entry.id),
                          className: `p-2 rounded-xl border border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-900 leading-none transition-all cursor-pointer ${entry.isBookmarked ? "text-amber-500 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/10 border-amber-100" : "text-slate-400 dark:text-slate-500"}`,
                          title: entry.isBookmarked ? "Y\u0131ld\u0131z\u0131 kald\u0131r" : "\xD6ne y\u0131ld\u0131zla",
                          children: /* @__PURE__ */ jsx(Star, { className: `w-4 h-4 ${entry.isBookmarked ? "fill-current" : ""}` })
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => handleStartEdit(entry),
                          className: "p-2 rounded-xl border border-slate-100 dark:border-slate-800/50 hover:bg-amber-50 dark:hover:bg-amber-950/20 text-slate-400 dark:text-slate-500 hover:text-[#A2845E] dark:hover:text-amber-400 leading-none transition-all cursor-pointer",
                          title: "D\xFC\u015F\xFCnceyi d\xFCzenle",
                          children: /* @__PURE__ */ jsx(Edit3, { className: "w-4 h-4" })
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          onClick: () => onDeleteEntry(entry.id),
                          className: "p-2 rounded-xl border border-slate-150 dark:border-slate-800/50 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 leading-none transition-all cursor-pointer",
                          title: "D\xFC\u015F\xFCnceyi sil",
                          children: /* @__PURE__ */ jsx(Trash2, { className: "w-4 h-4" })
                        }
                      )
                    ] })
                  ] })
                ] })
              )
            ]
          },
          entry.id
        );
      }) })
    ] })
  ] });
}

// src/components/AIInsights.tsx
import { useState as useState2, useEffect } from "react";
import { Sparkles as Sparkles2, Brain, HelpCircle as HelpCircle2, ArrowRight, CheckCircle2 as CheckCircle22, Loader2, ListTodo, BookmarkCheck, Lightbulb as Lightbulb2 } from "lucide-react";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function AIInsights({ entries, onAddEntry }) {
  const [reflection, setReflection] = useState2(null);
  const [loading, setLoading] = useState2(false);
  const [loadingStep, setLoadingStep] = useState2(0);
  const [error, setError] = useState2(null);
  const [answer, setAnswer] = useState2("");
  const [answerSubmitted, setAnswerSubmitted] = useState2(false);
  const [completedAdvice, setCompletedAdvice] = useState2({});
  const scanSteps = [
    "Zihinsel ak\u0131\u015F ve duygusal ton taran\u0131yor...",
    "Bili\u015Fsel e\u011Filimler ve inan\xE7 kal\u0131plar\u0131 k\xFCmeleniyor...",
    "\xD6z-\u015Fefkat odakl\u0131 geli\u015Fim patikalar\u0131 tasarlan\u0131yor...",
    "Aynan\u0131z parlat\u0131l\u0131yor, rapor haz\u0131rlan\u0131yor..."
  ];
  useEffect(() => {
    const cached = localStorage.getItem("thought_defteri_reflection");
    if (cached) {
      try {
        setReflection(JSON.parse(cached));
      } catch (e) {
        console.error("Error loading cached reflection", e);
      }
    }
  }, []);
  useEffect(() => {
    let interval;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < scanSteps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 2500);
    }
    return () => clearInterval(interval);
  }, [loading]);
  const triggerAnalysis = async () => {
    if (entries.length < 2) return;
    setLoading(true);
    setError(null);
    setAnswerSubmitted(false);
    setAnswer("");
    try {
      const data = await aiService.analyzeThoughts(entries);
      const newReflection = {
        overallVibe: data.overallVibe,
        cognitivePatterns: data.cognitivePatterns || [],
        growthRecommendations: data.growthRecommendations || [],
        introspectiveQuestion: data.introspectiveQuestion,
        generatedAt: data.generatedAt || (/* @__PURE__ */ new Date()).toISOString()
      };
      setReflection(newReflection);
      localStorage.setItem("thought_defteri_reflection", JSON.stringify(newReflection));
      setCompletedAdvice({});
    } catch (err) {
      setError(err.message || "Bilinmeyen bir hata olu\u015Ftu.");
    } finally {
      setLoading(false);
    }
  };
  const handleToggleAdvice = (index) => {
    const key = `advice-${index}`;
    setCompletedAdvice((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const parsePattern = (raw, idx) => {
    const cleanRaw = raw.trim().replace(/^["']/, "").replace(/["']$/, "").replace(/^\d+[\.\)\-\:]\s*/, "");
    const colonIndex = cleanRaw.indexOf(":");
    const dashIndex = cleanRaw.indexOf(" - ");
    if (colonIndex > 0 && colonIndex < 65) {
      return {
        title: cleanRaw.substring(0, colonIndex).trim(),
        description: cleanRaw.substring(colonIndex + 1).trim()
      };
    }
    if (dashIndex > 0 && dashIndex < 65) {
      return {
        title: cleanRaw.substring(0, dashIndex).trim(),
        description: cleanRaw.substring(dashIndex + 3).trim()
      };
    }
    return {
      title: `Zihinsel Kal\u0131p #${idx + 1}`,
      description: cleanRaw
    };
  };
  const handleSubmitAnswer = (e) => {
    e.preventDefault();
    if (!answer.trim() || !reflection) return;
    const combinedContent = `[Aynan\u0131n Sorusu: ${reflection.introspectiveQuestion}]

Cevab\u0131m: ${answer}`;
    onAddEntry(combinedContent, "REFLECTION" /* REFLECTION */, "REFLECTIVE" /* REFLECTIVE */);
    setAnswerSubmitted(true);
    setAnswer("");
  };
  const isEligible = entries.length >= 2;
  return /* @__PURE__ */ jsxs2("div", { className: "space-y-6 pb-28 animate-fadeIn", id: "ai-insights-container", children: [
    /* @__PURE__ */ jsxs2("div", { className: "bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-3 shadow-sm", children: [
      /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsx2(Brain, { className: "w-5 h-5 text-[#A2845E]" }),
        /* @__PURE__ */ jsx2("h2", { className: "font-bold text-slate-850 dark:text-white text-base", children: "Zihinsel Ayna" })
      ] }),
      /* @__PURE__ */ jsx2("p", { className: "text-xs text-slate-550 dark:text-slate-400 leading-relaxed", children: "Yazm\u0131\u015F oldu\u011Funuz t\xFCm d\xFC\u015F\xFCnceleri, hisleri ve niyetleri bir b\xFCt\xFCn olarak tarar. Bili\u015Fsel davran\u0131\u015F\xE7\u0131 yakla\u015F\u0131mlar\u0131 g\xF6zeterek zihninizdeki kal\u0131plar\u0131 \u015Fefkatle g\xF6rmenizi ve geli\u015Fim yollar\u0131 bulman\u0131z\u0131 hedefler." }),
      isEligible ? /* @__PURE__ */ jsxs2("div", { className: "pt-2 flex flex-col sm:flex-row items-center gap-3.5", children: [
        /* @__PURE__ */ jsxs2(
          "button",
          {
            onClick: triggerAnalysis,
            disabled: loading,
            className: `w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-all ${loading ? "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed" : "bg-[#A2845E] text-white hover:bg-[#8D704E] hover:shadow transform hover:-translate-y-0.5 active:translate-y-0"}`,
            children: [
              loading ? /* @__PURE__ */ jsx2(Loader2, { className: "w-4 h-4 animate-spin text-white" }) : /* @__PURE__ */ jsx2(Sparkles2, { className: "w-4 h-4 text-white animate-pulse" }),
              /* @__PURE__ */ jsx2("span", { children: reflection ? "Zihinsel Aynay\u0131 Yenile" : "Zihinsel Aynay\u0131 \u0130lk Kez Ba\u015Flat" })
            ]
          }
        ),
        reflection && !loading && /* @__PURE__ */ jsxs2("span", { className: "text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold", children: [
          "Son analiz: ",
          new Date(reflection.generatedAt).toLocaleDateString("tr", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })
        ] })
      ] }) : /* @__PURE__ */ jsxs2("div", { className: "bg-[#FFF9E5] dark:bg-[#3E3326]/40 border border-[#FFD60A]/35 p-4 rounded-2xl flex flex-col text-left space-y-1.5 mt-2", children: [
        /* @__PURE__ */ jsx2("span", { className: "text-xs font-bold text-[#A2845E] dark:text-[#FFF9E5] flex items-center gap-1.5", children: "\u26A0\uFE0F Yetersiz D\xFC\u015F\xFCnce Kayd\u0131 (En az 2 kay\u0131t gerekir)" }),
        /* @__PURE__ */ jsxs2("p", { className: "text-[11px] text-stone-700 dark:text-stone-300 leading-relaxed font-serif italic", children: [
          "Zihinsel Aynan\u0131z\u0131n d\xFC\u015F\xFCncelerinizdeki bili\u015Fsel \xF6r\xFCnt\xFCleri, duygusal e\u011Filimleri sa\u011Fl\u0131kl\u0131 bir \u015Fekilde analiz edebilmesi i\xE7in defterinizde en az 2 adet kay\u0131t bulunmal\u0131d\u0131r. \u015Eu an defterinizde ",
          /* @__PURE__ */ jsxs2("strong", { children: [
            entries.length,
            "/2"
          ] }),
          " kay\u0131t bulunmaktad\u0131r."
        ] })
      ] })
    ] }),
    loading && /* @__PURE__ */ jsxs2("div", { className: "bg-white dark:bg-stone-900 text-stone-800 dark:text-white p-8 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 shadow-lg space-y-6 flex flex-col items-center justify-center min-h-60 text-center animate-pulse", children: [
      /* @__PURE__ */ jsx2(Brain, { className: "w-12 h-12 text-[#A2845E] animate-bounce" }),
      /* @__PURE__ */ jsxs2("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsx2("h4", { className: "font-bold text-[#A2845E] text-base", children: "Zihninizin Aynas\u0131 Parlat\u0131l\u0131yor..." }),
        /* @__PURE__ */ jsxs2("div", { className: "bg-[#FFF9E5] dark:bg-[#3E3326]/40 px-6 py-4 rounded-2xl border border-[#FFD60A]/35 text-xs text-stone-700 dark:text-[#FFF9E5] max-w-sm leading-relaxed min-h-[4rem] flex items-center justify-center font-serif italic", children: [
          '"',
          scanSteps[loadingStep],
          '"'
        ] })
      ] }),
      /* @__PURE__ */ jsx2("div", { className: "flex gap-2.5", children: scanSteps.map((_, idx) => /* @__PURE__ */ jsx2(
        "div",
        {
          className: `w-3.5 h-1.5 rounded-full transition-all ${idx <= loadingStep ? "bg-[#A2845E]" : "bg-[#E5E5EA]/50 dark:bg-stone-800"}`
        },
        idx
      )) })
    ] }),
    error && /* @__PURE__ */ jsxs2("div", { className: "bg-rose-50 dark:bg-rose-955/20 border border-rose-100 dark:border-rose-900/30 p-4 rounded-2xl text-xs text-rose-600 dark:text-rose-400", children: [
      /* @__PURE__ */ jsx2("strong", { children: "Hata Meydana Geldi:" }),
      " ",
      error,
      ". L\xFCtfen internet ba\u011Flant\u0131n\u0131z\u0131 veya API anahtar\u0131n\u0131z\u0131 kontrol ederek tekrar deneyiniz."
    ] }),
    reflection && !loading && /* @__PURE__ */ jsxs2("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsx2("div", { className: "bg-[#A2845E] text-white border border-[#A2845E] p-6 rounded-[32px] relative overflow-hidden shadow-md", id: "insight-vibe-widget", children: /* @__PURE__ */ jsxs2("div", { className: "relative space-y-4", children: [
        /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx2("div", { className: "bg-white/10 p-2 rounded-xl", children: /* @__PURE__ */ jsx2(Sparkles2, { className: "w-4 h-4 text-white" }) }),
          /* @__PURE__ */ jsxs2("div", { children: [
            /* @__PURE__ */ jsx2("span", { className: "text-[10px] uppercase font-extrabold tracking-wider text-stone-200", children: "Zihinsel \u0130klim De\u011Ferlendirmesi" }),
            /* @__PURE__ */ jsx2("h3", { className: "font-serif text-white font-bold text-lg", children: "Genel Ruh Hali Aynas\u0131" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs2("p", { className: "text-xs text-white/95 leading-relaxed font-serif italic pl-3 border-l-2 border-white/40 whitespace-pre-wrap", children: [
          '"',
          reflection.overallVibe,
          '"'
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs2("div", { className: "bg-white dark:bg-stone-900 p-6 sm:p-7 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-5 shadow-sm", id: "insight-patterns-widget", children: [
        /* @__PURE__ */ jsxs2("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-stone-200/60 dark:border-stone-800/60", children: [
          /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsx2("div", { className: "p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#A2845E] border border-amber-200/40 dark:border-amber-900/30", children: /* @__PURE__ */ jsx2(Brain, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxs2("div", { children: [
              /* @__PURE__ */ jsx2("h3", { className: "font-bold text-stone-900 dark:text-stone-100 text-base leading-tight", children: "G\xF6zlenen Zihinsel \xD6r\xFCnt\xFCler" }),
              /* @__PURE__ */ jsx2("p", { className: "text-[11px] text-stone-500 dark:text-stone-400", children: "Yaz\u0131lar\u0131n\u0131zda tekrarlanan bili\u015Fsel patikalar ve zihinsel e\u011Filimler" })
            ] })
          ] }),
          reflection.cognitivePatterns && reflection.cognitivePatterns.length > 0 && /* @__PURE__ */ jsxs2("span", { className: "self-start sm:self-auto text-[11px] font-mono px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#A2845E] dark:text-amber-300 font-bold border border-amber-200/50 dark:border-amber-900/40", children: [
            reflection.cognitivePatterns.length,
            " Belirgin E\u011Filim"
          ] })
        ] }),
        /* @__PURE__ */ jsx2("p", { className: "text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif italic", children: "Bu \xF6r\xFCnt\xFCler sizi etiketlemek veya ele\u015Ftirmek i\xE7in de\u011Fil; zihninizin otomatik olarak hangi d\xFC\u015F\xFCnce kal\u0131plar\u0131na girdi\u011Fini \u015Fefkatle fark etmeniz i\xE7in tespit edilmi\u015Ftir." }),
        reflection.cognitivePatterns && reflection.cognitivePatterns.length > 0 ? /* @__PURE__ */ jsx2("div", { className: "space-y-3.5 pt-1", children: reflection.cognitivePatterns.map((pattern, idx) => {
          const parsed = parsePattern(pattern, idx);
          return /* @__PURE__ */ jsxs2(
            "div",
            {
              className: "p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] dark:bg-stone-950/80 border border-stone-200/80 dark:border-stone-850 hover:border-amber-300 dark:hover:border-amber-800/80 transition-all space-y-2.5 shadow-2xs",
              children: [
                /* @__PURE__ */ jsxs2("div", { className: "flex items-start gap-3.5", children: [
                  /* @__PURE__ */ jsx2("div", { className: "w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-[#A2845E] dark:text-amber-300 font-mono font-bold flex items-center justify-center shrink-0 text-xs shadow-2xs border border-amber-200/50 dark:border-amber-900/40 mt-0.5", children: idx + 1 }),
                  /* @__PURE__ */ jsxs2("div", { className: "space-y-1 flex-1", children: [
                    /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-2 flex-wrap", children: [
                      /* @__PURE__ */ jsx2("h4", { className: "font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 font-sans tracking-tight", children: parsed.title }),
                      /* @__PURE__ */ jsx2("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold", children: "Zihinsel E\u011Filim" })
                    ] }),
                    /* @__PURE__ */ jsx2("p", { className: "text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed font-sans font-normal pt-1", children: parsed.description })
                  ] })
                ] }),
                /* @__PURE__ */ jsxs2("div", { className: "pt-2 mt-1 border-t border-stone-200/60 dark:border-stone-850/70 flex items-center gap-1.5 text-[11px] text-[#A2845E] dark:text-amber-300 font-medium", children: [
                  /* @__PURE__ */ jsx2(Lightbulb2, { className: "w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" }),
                  /* @__PURE__ */ jsx2("span", { children: "Fark\u0131ndal\u0131k \u0130pucu: Bu d\xFC\u015F\xFCnce bir ger\xE7ek de\u011Fil, zihnin \xFCretti\u011Fi ge\xE7ici bir hava durumudur." })
                ] })
              ]
            },
            idx
          );
        }) }) : /* @__PURE__ */ jsxs2("div", { className: "p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/40 border border-stone-200/60 dark:border-stone-850 text-center py-6 space-y-2", children: [
          /* @__PURE__ */ jsx2("p", { className: "text-xs text-stone-500 dark:text-stone-400 font-serif italic", children: "Hen\xFCz kayda de\u011Fer belirgin bir zihinsel \xF6r\xFCnt\xFC k\xFCmelenemedi." }),
          /* @__PURE__ */ jsx2("p", { className: "text-[11px] text-stone-400", children: "Defterinize birka\xE7 d\xFC\u015F\xFCnce daha ekledikten sonra zihinsel aynay\u0131 yenileyebilirsiniz." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: "bg-white dark:bg-stone-900 p-6 sm:p-7 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-4 shadow-sm", id: "insight-advice-widget", children: [
        /* @__PURE__ */ jsxs2("div", { className: "flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-stone-800/40", children: [
          /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-2.5", children: [
            /* @__PURE__ */ jsx2("div", { className: "p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#A2845E] border border-amber-200/40 dark:border-amber-900/30", children: /* @__PURE__ */ jsx2(ListTodo, { className: "w-5 h-5" }) }),
            /* @__PURE__ */ jsxs2("div", { children: [
              /* @__PURE__ */ jsx2("h3", { className: "font-bold text-stone-850 dark:text-white text-base leading-tight", children: "\xD6z-\u015Eefkat Pratik G\xF6revleri" }),
              /* @__PURE__ */ jsx2("p", { className: "text-[11px] text-stone-500 dark:text-stone-400", children: "\xD6r\xFCnt\xFCleri d\xF6n\xFC\u015Ft\xFCrmek i\xE7in uygulanabilir somut ad\u0131mlar" })
            ] })
          ] }),
          /* @__PURE__ */ jsx2("span", { className: "text-[11px] font-mono text-stone-400", children: "\u0130nteraktif Liste" })
        ] }),
        reflection.growthRecommendations && reflection.growthRecommendations.length > 0 ? /* @__PURE__ */ jsxs2("div", { className: "space-y-3 pt-1", children: [
          /* @__PURE__ */ jsx2("span", { className: "text-[10px] text-[#8E8E93] font-extrabold uppercase tracking-wider block", children: "Uygulad\u0131\u011F\u0131n\u0131z pratikleri listeden i\u015Faretleyebilirsiniz:" }),
          reflection.growthRecommendations.map((recommendation, idx) => {
            const isDone = completedAdvice[`advice-${idx}`] || false;
            return /* @__PURE__ */ jsxs2(
              "button",
              {
                onClick: () => handleToggleAdvice(idx),
                className: `text-left w-full p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 text-xs sm:text-sm cursor-pointer ${isDone ? "bg-stone-100/60 border-stone-200 dark:bg-stone-950/40 dark:border-stone-850 text-stone-400 dark:text-stone-500 line-through" : "bg-[#FAF8F5] border-stone-200/80 text-stone-800 hover:bg-stone-100/80 dark:bg-stone-950/80 dark:border-stone-850 dark:text-stone-200 shadow-2xs"}`,
                children: [
                  /* @__PURE__ */ jsx2(CheckCircle22, { className: `w-4 h-4 mt-0.5 shrink-0 ${isDone ? "text-emerald-500 fill-emerald-100 dark:fill-emerald-950/60" : "text-stone-300 dark:text-stone-700"}` }),
                  /* @__PURE__ */ jsx2("p", { className: "leading-relaxed", children: recommendation })
                ]
              },
              idx
            );
          })
        ] }) : /* @__PURE__ */ jsx2("p", { className: "text-xs text-[#8E8E93] italic", children: "Hen\xFCz \xF6zel bir geli\u015Fim \xF6nerisi tasarlanmad\u0131." })
      ] }),
      /* @__PURE__ */ jsxs2("div", { className: "bg-[#FFF9E5] dark:bg-[#3E3326]/20 p-6 rounded-[32px] border border-[#FFD60A]/35 space-y-4 shadow-sm", id: "insight-challenge-widget", children: [
        /* @__PURE__ */ jsxs2("div", { className: "flex items-center gap-2 pb-1", children: [
          /* @__PURE__ */ jsx2(HelpCircle2, { className: "w-5 h-5 text-[#A2845E]" }),
          /* @__PURE__ */ jsx2("h3", { className: "font-bold text-slate-850 dark:text-white text-base", children: "Haftal\u0131k \xD6z-Sorgulama Sorusu" })
        ] }),
        /* @__PURE__ */ jsx2("div", { className: "bg-white dark:bg-stone-950 p-4 rounded-2xl border border-[#E5E5EA] dark:border-stone-850 shadow-sm", children: /* @__PURE__ */ jsxs2("p", { className: "text-xs text-slate-705 dark:text-slate-205 italic font-serif leading-relaxed font-bold", children: [
          '"',
          reflection.introspectiveQuestion,
          '"'
        ] }) }),
        answerSubmitted ? /* @__PURE__ */ jsxs2("div", { className: "bg-[#FFF9E5] dark:bg-[#3E3326]/40 border border-[#FFD60A]/35 p-3.5 rounded-2xl flex items-center gap-3", children: [
          /* @__PURE__ */ jsx2(BookmarkCheck, { className: "w-5 h-5 text-[#A2845E] flex-shrink-0" }),
          /* @__PURE__ */ jsxs2("div", { className: "text-xs", children: [
            /* @__PURE__ */ jsx2("div", { className: "font-bold text-[#A2845E] dark:text-white", children: "Yan\u0131tlama Ba\u015Far\u0131l\u0131!" }),
            /* @__PURE__ */ jsx2("div", { className: "text-[#8E8E93] mt-0.5", children: "Bu sorgulamaya verdi\u011Finiz yan\u0131t, de\u011Ferlendirilmek \xFCzere G\xFCnl\xFCk Defterinize eklendi." })
          ] })
        ] }) : /* @__PURE__ */ jsxs2("form", { onSubmit: handleSubmitAnswer, className: "space-y-3.5", children: [
          /* @__PURE__ */ jsx2(
            "textarea",
            {
              value: answer,
              onChange: (e) => setAnswer(e.target.value),
              placeholder: "Zihnini dinle, kalbinden ge\xE7en samimi cevab\u0131 buraya karala ve defterine yans\u0131t...",
              className: "w-full text-xs p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-850 text-slate-750 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-[#A2845E]/10 min-h-20 resize-none transition-all leading-relaxed",
              maxLength: 1e3
            }
          ),
          /* @__PURE__ */ jsx2("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxs2(
            "button",
            {
              type: "submit",
              disabled: !answer.trim(),
              className: `px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${answer.trim() ? "bg-[#A2845E] text-white hover:bg-[#8D704E] hover:shadow transform hover:-translate-y-0.5 active:translate-y-0" : "bg-[#F2F2F7] text-slate-400 dark:bg-stone-800 dark:text-stone-600 cursor-not-allowed"}`,
              children: [
                /* @__PURE__ */ jsx2("span", { children: "Cevab\u0131 Deftere Yans\u0131t" }),
                /* @__PURE__ */ jsx2(ArrowRight, { className: "w-3.5 h-3.5" })
              ]
            }
          ) })
        ] })
      ] })
    ] })
  ] });
}

// src/components/Inspiration.tsx
import { useState as useState3, useEffect as useEffect2, useRef } from "react";
import {
  Sparkles as Sparkles3,
  Brain as Brain2,
  Wind,
  Play,
  Pause,
  RefreshCw as RefreshCw2,
  ChevronRight,
  Save,
  Check as Check3,
  Quote,
  Copy,
  BookOpen as BookOpen2,
  Volume2,
  VolumeX,
  Award,
  ArrowRight as ArrowRight2,
  Lock,
  ChevronDown as ChevronDown2,
  ChevronUp,
  Info,
  Compass as Compass3
} from "lucide-react";
import { Fragment as Fragment2, jsx as jsx3, jsxs as jsxs3 } from "react/jsx-runtime";
var MOTIVATIONAL_QUOTES = [
  {
    id: 1,
    text: "D\xFCn zekiydim, d\xFCnyay\u0131 de\u011Fi\u015Ftirmek istedim. Bug\xFCn bilgeyim, kendimi de\u011Fi\u015Ftiriyorum.",
    author: "Mevlana",
    category: "Ki\u015Fisel Geli\u015Fim",
    focus: "Kendini Yenileme"
  },
  {
    id: 2,
    text: "Bulutlar gelir ve gider. G\xF6ky\xFCz\xFC her zaman oradad\u0131r.",
    author: "Pema Ch\xF6dr\xF6n",
    category: "Fark\u0131ndal\u0131k",
    focus: "Kabullenme & Huzur"
  },
  {
    id: 3,
    text: "Her \u015Feyin en b\xFCy\xFC\u011F\xFC, kendini fethetmektir.",
    author: "Platon",
    category: "Zihinsel G\xFC\xE7",
    focus: "\xD6zdisiplin"
  },
  {
    id: 4,
    text: "Karanl\u0131\u011F\u0131 lanetlemektense, bir mum yakmak daha iyidir.",
    author: "Konf\xFC\xE7y\xFCs",
    category: "Pozitif D\xFC\u015F\xFCnce",
    focus: "Umut ve Eylem"
  },
  {
    id: 5,
    text: "Kendine \u015Fefkat g\xF6stermek, ba\u015Far\u0131s\u0131zl\u0131\u011F\u0131 kabul etmek de\u011Fil; insan oldu\u011Funu hat\u0131rlamakt\u0131r.",
    author: "Kristin Neff",
    category: "\xD6z-\u015Eefkat",
    focus: "\xD6z-Kabul"
  },
  {
    id: 6,
    text: "Zorluklar\u0131 a\u015Fman\u0131n s\u0131rr\u0131, onlarla sava\u015Fmak de\u011Fil, yeni bir yol in\u015Fa etmektir.",
    author: "Dan Millman",
    category: "Ki\u015Fisel Geli\u015Fim",
    focus: "Geli\u015Fim Zihniyeti"
  },
  {
    id: 7,
    text: "Hayat, senin ona katt\u0131\u011F\u0131n anlam kadard\u0131r.",
    author: "Viktor Frankl",
    category: "Pozitif D\xFC\u015F\xFCnce",
    focus: "Anlam Aray\u0131\u015F\u0131"
  },
  {
    id: 8,
    text: "K\xFC\xE7\xFCk ad\u0131mlar\u0131n g\xFCc\xFCn\xFC asla k\xFC\xE7\xFCmseme; \xE7\u0131\u011Flar da kar taneleriyle ba\u015Flar.",
    author: "Lao Tzu",
    category: "Ki\u015Fisel Geli\u015Fim",
    focus: "Kararl\u0131l\u0131k & \u0130stikrar"
  },
  {
    id: 9,
    text: "D\xFC\u015F\xFCnceleriniz neyse, hayat\u0131n\u0131z da odur.",
    author: "Marcus Aurelius",
    category: "Pozitif D\xFC\u015F\xFCnce",
    focus: "Zihinsel Tutum"
  },
  {
    id: 10,
    text: "M\xFCkemmel olmana gerek yok. Sadece d\xFCn oldu\u011Fundan biraz daha fark\u0131nda ve \u015Fefkatli ol.",
    author: "Fark\u0131ndal\u0131k Yolu",
    category: "\xD6z-\u015Eefkat",
    focus: "Kendini Sevmek"
  },
  {
    id: 11,
    text: "En b\xFCy\xFCk zafer hi\xE7 d\xFC\u015Fmemek de\u011Fil, her d\xFC\u015Ft\xFC\u011F\xFCnde tekrar aya\u011Fa kalkabilmektir.",
    author: "Nelson Mandela",
    category: "Zihinsel G\xFC\xE7",
    focus: "Y\u0131lmazl\u0131k"
  },
  {
    id: 12,
    text: "\u015Eu an, sahip oldu\u011Fun ve bir \u015Feyleri de\u011Fi\u015Ftirebilece\u011Fin tek and\u0131r.",
    author: "Eckhart Tolle",
    category: "Fark\u0131ndal\u0131k",
    focus: "\u015Eimdiki Zaman"
  },
  {
    id: 13,
    text: "Kendine inanmaya ba\u015Flad\u0131\u011F\u0131n an, nas\u0131l ya\u015Fayaca\u011F\u0131n\u0131 da \xF6\u011Frenmi\u015F olursun.",
    author: "Goethe",
    category: "Ki\u015Fisel Geli\u015Fim",
    focus: "\u0130\xE7sel Cesaret"
  },
  {
    id: 14,
    text: "\u0130\xE7imizdeki g\xFC\xE7, kar\u015F\u0131la\u015Ft\u0131\u011F\u0131m\u0131z t\xFCm zorluklardan daha b\xFCy\xFCkt\xFCr.",
    author: "Ralph Waldo Emerson",
    category: "Zihinsel G\xFC\xE7",
    focus: "\u0130\xE7sel G\xFC\xE7"
  },
  {
    id: 15,
    text: "G\xFCl\xFCmse; \xE7\xFCnk\xFC hayat, \u015Fikayet etmek i\xE7in \xE7ok k\u0131sa ve parlamak i\xE7in \xE7ok g\xFCzel.",
    author: "Pozitif Ya\u015Fam Felsefesi",
    category: "Pozitif D\xFC\u015F\xFCnce",
    focus: "Hayat Sevinci"
  }
];
var GROWTH_JOURNEYS = [
  {
    id: "self-compassion",
    title: "5 G\xFCnl\xFCk \xD6z-\u015Eefkat Patikas\u0131",
    description: "Kendi i\xE7inizdeki ele\u015Ftirel sesi dindirip, kendinize zor zamanlarda destekleyici bir dost gibi yakla\u015Fmay\u0131 \xF6\u011Frenin.",
    durationDays: 5,
    icon: "Heart",
    badge: "\u{1F338}",
    steps: [
      {
        day: 1,
        title: "\u0130\xE7 Sesini Fark Et",
        theme: "\u0130\xE7 sesinizin tonunu ke\u015Ffetme",
        guideline: "Bug\xFCn hata yapt\u0131\u011F\u0131n\u0131zda kendinize s\xF6yledi\u011Finiz ilk \u015Feyi d\xFC\u015F\xFCn\xFCn. Tonu sert mi, yoksa destekleyici mi?",
        prompt: "Bug\xFCn i\xE7sel ele\u015Ftirmenimin bana en \xE7ok f\u0131s\u0131ldad\u0131\u011F\u0131 o sert c\xFCmleyi yarg\u0131lamadan yaz\u0131yorum. Bu ses ger\xE7ekten yard\u0131mc\u0131 m\u0131 oluyor, yoksa y\u0131prat\u0131yor mu?",
        category: "REFLECTION" /* REFLECTION */,
        mood: "REFLECTIVE" /* REFLECTIVE */
      },
      {
        day: 2,
        title: "M\xFCkemmeliyet\xE7ilik Tuza\u011F\u0131",
        theme: "Hata yapma \xF6zg\xFCrl\xFC\u011F\xFCn\xFC geri kazanma",
        guideline: "Kusursuz olma standard\u0131 bizi hareketsiz k\u0131lar. Hatalar\u0131n b\xFCy\xFCme f\u0131rsatlar\u0131 oldu\u011Funu kabul edelim.",
        prompt: "Hayat\u0131mda m\xFCkemmel olmaya \xE7al\u0131\u015F\u0131p kendimi en \xE7ok y\u0131pratt\u0131\u011F\u0131m alan hangisi? Kendime hata yapma hakk\u0131 tan\u0131sayd\u0131m zihnim nas\u0131l ferahlard\u0131?",
        category: "CHALLENGE" /* CHALLENGE */,
        mood: "ANXIOUS" /* ANXIOUS */
      },
      {
        day: 3,
        title: "Ortak \u0130nsanl\u0131k Paydas\u0131",
        theme: "M\xFCcadelelerinizde yaln\u0131z olmad\u0131\u011F\u0131n\u0131z\u0131 anlama",
        guideline: "Zorluk ve yetersizlik hissi sadece sizin ba\u015F\u0131n\u0131za gelmez; t\xFCm insanlar\u0131n payla\u015Ft\u0131\u011F\u0131 evrensel bir durumdur.",
        prompt: "\u015Eu an zorland\u0131\u011F\u0131m konuda d\xFCnyada binlerce insan\u0131n benzer hisler ya\u015Fad\u0131\u011F\u0131n\u0131 bilmek bana nas\u0131l hissettiriyor? Yaln\u0131z olmad\u0131\u011F\u0131m\u0131 kendime nas\u0131l hat\u0131rlat\u0131r\u0131m?",
        category: "REFLECTION" /* REFLECTION */,
        mood: "CALM" /* CALM */
      },
      {
        day: 4,
        title: "En Yak\u0131n Arkada\u015F Testi",
        theme: "Kendimize bir dostun g\xF6z\xFCnden bakmak",
        guideline: "En sevdi\u011Finiz insan bir hata yapsayd\u0131 ona ne derdiniz? O \u015Fefkatli ve destekleyici sesi \u015Fimdi kendinize y\xF6neltin.",
        prompt: "Zorland\u0131\u011F\u0131m bir konuda kendime en yak\u0131n arkada\u015F\u0131m\u0131n a\u011Fz\u0131ndan yaz\u0131lm\u0131\u015F, sakinle\u015Ftirici, destekleyici ve sevgi dolu bir mektup yaz\u0131yorum:",
        category: "GRATITUDE" /* GRATITUDE */,
        mood: "CALM" /* CALM */
      },
      {
        day: 5,
        title: "Kusurlar\u0131nla Gurur Duy",
        theme: "Kendimizi t\xFCm eksiklerimizle kucaklama",
        guideline: "\xD6z-\u015Fefkat, kusurlar\u0131m\u0131za ra\u011Fmen sevilebilir ve biricik oldu\u011Fumuzu kalpten hissetmektir.",
        prompt: "Ge\xE7mi\u015Fteki hatalar\u0131ma ve t\xFCm eksiklerime ra\u011Fmen bug\xFCn kendimde en \xE7ok sayg\u0131 duydu\u011Fum, sevdi\u011Fim ve gurur duydu\u011Fum o 2 \u015Feyi kalbime f\u0131s\u0131lday\u0131p yaz\u0131yorum:",
        category: "GRATITUDE" /* GRATITUDE */,
        mood: "EXCITED" /* EXCITED */
      }
    ]
  },
  {
    id: "growth-mindset",
    title: "3 G\xFCnl\xFCk Geli\u015Fim Zihniyeti",
    description: "Zorluklar\u0131 zihninizi geni\u015Fleten ve direncinizi art\u0131ran birer geli\u015Fim basama\u011F\u0131 olarak konumland\u0131r\u0131n.",
    durationDays: 3,
    icon: "Brain",
    badge: "\u26A1",
    steps: [
      {
        day: 1,
        title: "Hatalar En B\xFCy\xFCk \xD6\u011Fretmendir",
        theme: "Ba\u015Far\u0131s\u0131zl\u0131\u011F\u0131 geri bildirim s\xFCreci olarak yeniden \xE7er\xE7eveleme",
        guideline: "Hata yapmak beceriksizli\u011Fi de\u011Fil, deneme cesaretini g\xF6sterir.",
        prompt: "Son d\xF6nemde 'ba\u015Far\u0131s\u0131zl\u0131k' veya 'hata' olarak g\xF6rd\xFC\u011F\xFCm bir olay\u0131 ele al\u0131yorum. Bu deneyim bana kendim veya ya\u015Fam hakk\u0131nda hangi de\u011Ferli dersi \xF6\u011Fretti?",
        category: "CHALLENGE" /* CHALLENGE */,
        mood: "REFLECTIVE" /* REFLECTIVE */
      },
      {
        day: 2,
        title: "'Hen\xFCz' S\xF6zc\xFC\u011F\xFCn\xFCn G\xFCc\xFC",
        theme: "Yetersizlik hissini geli\u015Fim s\xFCrecine d\xF6n\xFC\u015Ft\xFCrme",
        guideline: "'Bunu yapam\u0131yorum' yerine 'Bunu *hen\xFCz* yapam\u0131yorum' diyerek kendinize \xF6\u011Frenme \u015Fans\u0131 tan\u0131y\u0131n.",
        prompt: "\u015Eu an yetersiz hissetti\u011Fim veya yapamad\u0131\u011F\u0131m\u0131 d\xFC\u015F\xFCnd\xFC\u011F\xFCm bir konuyu se\xE7iyorum. Bu c\xFCmlenin sonuna 'hen\xFCz' ekleyerek, geli\u015Fmek i\xE7in atabilece\u011Fim ilk minik ad\u0131m\u0131 planl\u0131yorum:",
        category: "INTENTION" /* INTENTION */,
        mood: "CALM" /* CALM */
      },
      {
        day: 3,
        title: "\xC7abay\u0131 Takdir Etmek",
        theme: "Sonu\xE7lardan ziyade harcanan eme\u011Fe odaklanmak",
        guideline: "Sonu\xE7 her zaman kontrol\xFCm\xFCzde olmasa da g\xF6sterdi\u011Fimiz samimi \xE7aba tamamen bize aittir.",
        prompt: "Son g\xFCnlerde g\xF6sterdi\u011Fim, d\u0131\u015Far\u0131dan kimsenin fark etmedi\u011Fi ama benim bildi\u011Fim o kararl\u0131 \xE7abay\u0131 ve sabr\u0131 takdir ediyorum. Bu s\xFCre\xE7te g\xF6sterdi\u011Fim irade i\xE7in kendime te\u015Fekk\xFCr ediyorum:",
        category: "GRATITUDE" /* GRATITUDE */,
        mood: "EXCITED" /* EXCITED */
      }
    ]
  },
  {
    id: "meaningful-living",
    title: "3 G\xFCnl\xFCk Anlam Aray\u0131\u015F\u0131",
    description: "G\xFCnl\xFCk ko\u015Fturmacan\u0131n ortas\u0131nda de\u011Ferlerinize, amac\u0131n\u0131za ve derin fark\u0131ndal\u0131\u011F\u0131n\u0131za uyan\u0131n.",
    durationDays: 3,
    icon: "Compass",
    badge: "\u{1F31F}",
    steps: [
      {
        day: 1,
        title: "S\u0131radan Anlar\u0131n Sihri",
        theme: "S\u0131radanl\u0131\u011F\u0131n i\xE7indeki mucizeleri yakalama",
        guideline: "Ya\u015Fam b\xFCy\xFCk d\xF6n\xFCm noktalar\u0131ndan ziyade, her g\xFCn sessizce akan minik anlar\u0131n toplam\u0131d\u0131r.",
        prompt: "Bug\xFCn tamamen s\u0131radan g\xF6r\xFCnen ama ruhumu \u0131s\u0131tan veya y\xFCz\xFCmde bir tebess\xFCm olu\u015Fturan o an\u0131 (bir fincan kahve, r\xFCzgar\u0131n esintisi, bir dostun selam\u0131) en ince ayr\u0131nt\u0131s\u0131yla yaz\u0131yorum:",
        category: "GRATITUDE" /* GRATITUDE */,
        mood: "CALM" /* CALM */
      },
      {
        day: 2,
        title: "De\u011Ferler Pusulas\u0131",
        theme: "Pusulam\u0131z\u0131 en temel de\u011Ferlerimizle hizalamak",
        guideline: "Ki\u015Fisel de\u011Ferleriniz do\u011Frultusunda ya\u015Famak, her f\u0131rt\u0131nada dengede kalman\u0131z\u0131 sa\u011Flar.",
        prompt: "Benim i\xE7in hayattaki en sars\u0131lmaz 3 de\u011Fer (\xF6rne\u011Fin d\xFCr\xFCstl\xFCk, cesaret, yarat\u0131c\u0131l\u0131k, sevgi) nedir? Bug\xFCn bu de\u011Ferlerden birini k\xFC\xE7\xFCk de olsa bir eylemle nas\u0131l ya\u015Fatt\u0131m?",
        category: "INTENTION" /* INTENTION */,
        mood: "REFLECTIVE" /* REFLECTIVE */
      },
      {
        day: 3,
        title: "Zorluklardaki Gizli Arma\u011Fan",
        theme: "Krizleri anlaml\u0131 birer anlat\u0131ya d\xF6n\xFC\u015Ft\xFCrmek",
        guideline: "Ya\u015Fad\u0131\u011F\u0131m\u0131z en b\xFCy\xFCk m\xFCcadeleler, g\xFCc\xFCm\xFCz\xFC ve bilgeli\u011Fimizi \u015Fekillendiren sessiz heykelt\u0131ra\u015Flard\u0131r.",
        prompt: "Ge\xE7mi\u015Fte beni \xE7ok zorlayan bir deneyimi d\xFC\u015F\xFCn\xFCyorum. O zorluk olmasayd\u0131 bug\xFCn sahip oldu\u011Fum hangi bilge, diren\xE7li ve g\xFC\xE7l\xFC y\xF6n\xFCm hi\xE7 var olmayacakt\u0131?",
        category: "REFLECTION" /* REFLECTION */,
        mood: "REFLECTIVE" /* REFLECTIVE */
      }
    ]
  }
];
var COGNITIVE_DISTORTIONS_GUIDE = [
  {
    name: "Felaketle\u015Ftirme (Catastrophizing)",
    description: "Olas\u0131 en k\xF6t\xFC senaryoyu kesinlikle ger\xE7ekle\u015Fecekmi\u015F gibi kabul etme e\u011Filimi.",
    example: '"S\u0131navda heyecanlan\u0131p hata yaparsam t\xFCm gelece\u011Fim tamamen biter."',
    antidote: '"Bu durum zorlay\u0131c\u0131 olsa da ba\u015Fa \xE7\u0131kabilirim. Hayat tek bir ana s\u0131\u011Fmayacak kadar geni\u015Ftir."'
  },
  {
    name: "Zihin Okuma (Mind Reading)",
    description: "Ba\u015Fkalar\u0131n\u0131n ne d\xFC\u015F\xFCnd\xFC\u011F\xFCn\xFC kan\u0131t olmaks\u0131z\u0131n olumsuz \u015Fekilde bildi\u011Fini varsayma.",
    example: '"Toplant\u0131da konu\u015Furken herkes i\xE7ten i\xE7e benimle dalga ge\xE7iyordu."',
    antidote: '"\u0130nsanlar\u0131n zihnini okuyamam. Belki sadece yorgunlard\u0131r ya da kendi i\u015Flerine odaklanm\u0131\u015Flard\u0131r."'
  },
  {
    name: "Hep ya da Hi\xE7 D\xFC\u015F\xFCncesi (All-or-Nothing)",
    description: "Durumlar\u0131 sadece siyah ve beyaz olarak g\xF6rme; grilere, esnekliklere yer vermeme.",
    example: '"E\u011Fer bu projeyi kusursuz bitiremezsem, kendimi tamamen ba\u015Far\u0131s\u0131z sayar\u0131m."',
    antidote: '"Sonu\xE7 m\xFCkemmel olmasa da g\xF6sterdi\u011Fim \xE7aba, \xF6\u011Frendiklerim ve kaydetti\u011Fim ilerleme paha bi\xE7ilemez."'
  },
  {
    name: "Ki\u015Fiselle\u015Ftirme (Personalization)",
    description: "Do\u011Frudan sizinle ilgili olmayan olumsuz olaylar\u0131n t\xFCm sorumlulu\u011Funu \xFCst\xFCn\xFCze alma.",
    example: '"Arkada\u015F\u0131m bug\xFCn \xE7ok keyifsizdi, kesin d\xFCn s\xF6yledi\u011Fim bir \u015Feye al\u0131nd\u0131."',
    antidote: '"Durumu etkileyen bir\xE7ok fakt\xF6r var. Keyifsizli\u011Finin sebebi tamamen ben olmayabilirim, ona sormay\u0131 deneyebilirim."'
  },
  {
    name: "A\u015F\u0131r\u0131 Genelleme (Overgeneralization)",
    description: "Tek bir olumsuz olay\u0131 hi\xE7 bitmeyecek bir yenilgi kal\u0131b\u0131 olarak g\xF6rme.",
    example: '"Bu sunumu bat\u0131rd\u0131m, zaten hi\xE7bir \u015Feyi beceremiyorum, her \u015Fey k\xF6t\xFC gidiyor."',
    antidote: '"Bu spesifik olayda zorland\u0131m, ama bu benim her zaman ba\u015Far\u0131s\u0131z oldu\u011Fum veya olaca\u011F\u0131m anlam\u0131na gelmez."'
  },
  {
    name: "-meli / -mal\u0131 C\xFCmleleri (Should Statements)",
    description: "Kendimizi veya ba\u015Fkalar\u0131n\u0131 kat\u0131, esnemeyen kurallarla ve bask\u0131yla motive etmeye \xE7al\u0131\u015Fmak.",
    example: '"Asla hata yapmamal\u0131y\u0131m, her zaman g\xFC\xE7l\xFC g\xF6r\xFCnmeli ve herkesi mutlu etmeliyim."',
    antidote: '"Ben bir insan\u0131m ve hata yapmam \xE7ok do\u011Fal. Kendime esneklik, \u015Fefkat ve \xF6\u011Frenme alan\u0131 tan\u0131yabilirim."'
  }
];
function Inspiration({ onAddEntry }) {
  const [activeSubTab, setActiveSubTab] = useState3("breathing");
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const [originalThought, setOriginalThought] = useState3("");
  const [loading, setLoading] = useState3(false);
  const [reframeResult, setReframeResult] = useState3(null);
  const [error, setError] = useState3(null);
  const [savedToDiary, setSavedToDiary] = useState3(false);
  const [expandedDistortionIndex, setExpandedDistortionIndex] = useState3(null);
  const [isPlaying, setIsPlaying] = useState3(false);
  const [breathPhase, setBreathPhase] = useState3("INHALE");
  const [timer, setTimer] = useState3(4);
  const [soundEnabled, setSoundEnabled] = useState3(false);
  const [journeyProgress, setJourneyProgress] = useState3(() => {
    const cached = localStorage.getItem("thought_defteri_journey_progress");
    return cached ? JSON.parse(cached) : {};
  });
  const [selectedJourneyId, setSelectedJourneyId] = useState3(null);
  const [journeyResponse, setJourneyResponse] = useState3("");
  const [journeySaved, setJourneySaved] = useState3(false);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState3(() => {
    const day = (/* @__PURE__ */ new Date()).getDate();
    return day % MOTIVATIONAL_QUOTES.length;
  });
  const [copied, setCopied] = useState3(false);
  const [quoteSaved, setQuoteSaved] = useState3(false);
  const playPhaseSound = (phase) => {
    if (!soundEnabled) return;
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }
      stopCurrentSynthesis();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;
      if (phase === "INHALE") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.exponentialRampToValueAtTime(330, now + 4);
        gain.gain.setValueAtTime(1e-3, now);
        gain.gain.exponentialRampToValueAtTime(0.05, now + 3);
        gain.gain.linearRampToValueAtTime(0.01, now + 4);
      } else if (phase === "HOLD_IN") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(330, now);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 4);
      } else if (phase === "EXHALE") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(330, now);
        osc.frequency.exponentialRampToValueAtTime(220, now + 4);
        gain.gain.setValueAtTime(0.01, now);
        gain.gain.linearRampToValueAtTime(0.03, now + 1);
        gain.gain.exponentialRampToValueAtTime(1e-3, now + 4);
      } else if (phase === "HOLD_OUT") {
        osc.type = "sine";
        osc.frequency.setValueAtTime(110, now);
        gain.gain.setValueAtTime(4e-3, now);
        gain.gain.linearRampToValueAtTime(4e-3, now + 4);
      }
      osc.start(now);
      oscillatorRef.current = osc;
      gainNodeRef.current = gain;
    } catch (err) {
      console.warn("D\xFC\u015F\xFCnce Defteri Audio Synthesis failed:", err);
    }
  };
  const stopCurrentSynthesis = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (e) {
      }
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      try {
        gainNodeRef.current.disconnect();
      } catch (e) {
      }
      gainNodeRef.current = null;
    }
  };
  const stopAllAudioResources = () => {
    stopCurrentSynthesis();
    if (audioCtxRef.current) {
      try {
        audioCtxRef.current.close();
      } catch (e) {
      }
      audioCtxRef.current = null;
    }
  };
  useEffect2(() => {
    return () => {
      stopAllAudioResources();
    };
  }, []);
  useEffect2(() => {
    if (isPlaying) {
      playPhaseSound(breathPhase);
    } else {
      stopCurrentSynthesis();
    }
  }, [isPlaying, breathPhase, soundEnabled]);
  useEffect2(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            setBreathPhase((currentPhase2) => {
              switch (currentPhase2) {
                case "INHALE":
                  return "HOLD_IN";
                case "HOLD_IN":
                  return "EXHALE";
                case "EXHALE":
                  return "HOLD_OUT";
                case "HOLD_OUT":
                  return "INHALE";
                default:
                  return "INHALE";
              }
            });
            return 4;
          }
          return prev - 1;
        });
      }, 1e3);
    } else {
      setBreathPhase("INHALE");
      setTimer(4);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);
  const triggerSandboxReframe = async (e) => {
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
    } catch (err) {
      setError(err.message || "Bir hata ger\xE7ekle\u015Fti.");
    } finally {
      setLoading(false);
    }
  };
  const handleSaveReframeToDiary = () => {
    if (!reframeResult) return;
    const content = `[Bili\u015Fsel \xC7arp\u0131tma: ${reframeResult.distortionType}]
Orijinal D\xFC\u015F\xFCnce: ${reframeResult.original}

Yeniden \xC7er\xE7eveleme: ${reframeResult.reframed}`;
    onAddEntry(content, "REFLECTION" /* REFLECTION */, "CALM" /* CALM */);
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
    const textToCopy = `"${q.text}" \u2014 ${q.author} (${q.category})`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2e3);
  };
  const handleSaveQuoteToDiary = () => {
    const q = MOTIVATIONAL_QUOTES[currentQuoteIndex];
    const content = `[Motivasyon K\xFCp\xFC: ${q.category}]
"${q.text}"

\u2014 ${q.author}

Bu \xF6zl\xFC s\xF6z benim i\xE7in bug\xFCnk\xFC geli\u015Fim yolculu\u011Fumda ne ifade ediyor?`;
    onAddEntry(content, "REFLECTION" /* REFLECTION */, "REFLECTIVE" /* REFLECTIVE */);
    setQuoteSaved(true);
  };
  const handleSaveJourneyStep = (journey, currentStep) => {
    if (!journeyResponse.trim()) return;
    const content = `[Geli\u015Fim Patikas\u0131 ${journey.badge}: ${journey.title} - G\xFCn ${currentStep.day}: ${currentStep.title}]

Odak Konu: ${currentStep.theme}

${journeyResponse}`;
    onAddEntry(content, currentStep.category, currentStep.mood);
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
    }, 4e3);
  };
  const handleResetJourney = (journeyId) => {
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
          desc: "Karn\u0131n\u0131zdan yava\u015F\xE7a ve derin bir nefes \xE7ekin...",
          circleClass: "scale-125 bg-emerald-500/10 dark:bg-emerald-500/20 border-emerald-500",
          textColor: "text-emerald-600 dark:text-emerald-400"
        };
      case "HOLD_IN":
        return {
          title: "Nefesini Tut",
          desc: "Akci\u011Ferlerinizdeki dolulu\u011Fun ve dinginli\u011Fin fark\u0131na var\u0131n...",
          circleClass: "scale-125 bg-indigo-500/15 dark:bg-indigo-500/30 border-indigo-500 shadow-lg shadow-indigo-100 dark:shadow-none",
          textColor: "text-indigo-600 dark:text-indigo-400"
        };
      case "EXHALE":
        return {
          title: "Nefes Ver",
          desc: "Zihninizdeki gerginli\u011Fi nefesinizle birlikte serbest b\u0131rak\u0131n...",
          circleClass: "scale-75 bg-amber-500/10 dark:bg-amber-500/20 border-amber-500",
          textColor: "text-amber-600 dark:text-amber-400"
        };
      case "HOLD_OUT":
        return {
          title: "Bo\u015Flukta Kal",
          desc: "Zihninizin tamamen sessizle\u015Fmesine ve dingin kalmas\u0131na izin verin...",
          circleClass: "scale-75 bg-slate-500/10 dark:bg-slate-500/20 border-slate-500",
          textColor: "text-slate-600 dark:text-slate-400"
        };
      default:
        return {
          title: "Nefes Al",
          desc: "Gev\u015Femeye odaklan\u0131n...",
          circleClass: "scale-100",
          textColor: "text-slate-500"
        };
    }
  })();
  const selectedJourney = GROWTH_JOURNEYS.find((j) => j.id === selectedJourneyId);
  const currentStepIndex = selectedJourneyId ? journeyProgress[selectedJourneyId] || 0 : 0;
  const isJourneyCompleted = selectedJourney ? currentStepIndex >= selectedJourney.durationDays : false;
  const activeJourneyStep = selectedJourney && !isJourneyCompleted ? selectedJourney.steps[currentStepIndex] : null;
  return /* @__PURE__ */ jsxs3("div", { className: "space-y-6 pb-28 animate-fadeIn", id: "inspiration-tab-root", children: [
    /* @__PURE__ */ jsxs3("div", { className: "bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-800 p-1.5 rounded-[24px] shadow-sm grid grid-cols-2 md:grid-cols-4 gap-1", children: [
      /* @__PURE__ */ jsxs3(
        "button",
        {
          onClick: () => {
            setActiveSubTab("breathing");
            stopCurrentSynthesis();
          },
          className: `py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${activeSubTab === "breathing" ? "bg-[#A2845E] text-white shadow-sm" : "text-slate-505 hover:bg-stone-50 dark:text-slate-400 dark:hover:bg-stone-800/40"}`,
          children: [
            /* @__PURE__ */ jsx3(Wind, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx3("span", { children: "Nefes & Odak" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs3(
        "button",
        {
          onClick: () => {
            setActiveSubTab("cbt");
            stopCurrentSynthesis();
          },
          className: `py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${activeSubTab === "cbt" ? "bg-[#A2845E] text-white shadow-sm" : "text-slate-505 hover:bg-stone-50 dark:text-slate-400 dark:hover:bg-stone-800/40"}`,
          children: [
            /* @__PURE__ */ jsx3(Brain2, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx3("span", { children: "CBT D\xF6n\xFC\u015Ft\xFCr\xFCc\xFC" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs3(
        "button",
        {
          onClick: () => {
            setActiveSubTab("journeys");
            stopCurrentSynthesis();
          },
          className: `py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${activeSubTab === "journeys" ? "bg-[#A2845E] text-white shadow-sm" : "text-slate-505 hover:bg-stone-50 dark:text-slate-400 dark:hover:bg-stone-800/40"}`,
          children: [
            /* @__PURE__ */ jsx3(Compass3, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx3("span", { children: "Geli\u015Fim Patikalar\u0131" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs3(
        "button",
        {
          onClick: () => {
            setActiveSubTab("quotes");
            stopCurrentSynthesis();
          },
          className: `py-3 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${activeSubTab === "quotes" ? "bg-[#A2845E] text-white shadow-sm" : "text-slate-505 hover:bg-stone-50 dark:text-slate-400 dark:hover:bg-stone-800/40"}`,
          children: [
            /* @__PURE__ */ jsx3(Quote, { className: "w-4 h-4" }),
            /* @__PURE__ */ jsx3("span", { children: "Geli\u015Fim K\u0131v\u0131lc\u0131m\u0131" })
          ]
        }
      )
    ] }),
    activeSubTab === "breathing" && /* @__PURE__ */ jsxs3("div", { className: "bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-5 shadow-sm animate-fadeIn", id: "breathing-widget", children: [
      /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-stone-800/40", children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx3(Wind, { className: "w-5 h-5 text-[#A2845E]" }),
          /* @__PURE__ */ jsx3("h2", { className: "font-bold text-slate-850 dark:text-white text-base", children: "Kutucuk Nefesi (Meditation Metronome)" })
        ] }),
        /* @__PURE__ */ jsxs3(
          "button",
          {
            onClick: () => {
              setSoundEnabled(!soundEnabled);
              const AudioContextClass = window.AudioContext || window.webkitAudioContext;
              if (!audioCtxRef.current) {
                audioCtxRef.current = new AudioContextClass();
              }
            },
            className: `p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${soundEnabled ? "bg-amber-50 dark:bg-amber-950/20 border-amber-200/50 text-amber-800 dark:text-amber-400 font-bold" : "bg-stone-50 dark:bg-stone-955 border-[#E5E5EA] dark:border-stone-850 text-slate-400"}`,
            title: soundEnabled ? "Sesli asistan\u0131 kapat" : "Sesli y\xF6nlendirmeyi a\xE7",
            children: [
              soundEnabled ? /* @__PURE__ */ jsx3(Volume2, { className: "w-4 h-4 animate-bounce" }) : /* @__PURE__ */ jsx3(VolumeX, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx3("span", { className: "text-[10px] uppercase font-mono tracking-wider font-extrabold hidden sm:inline", children: soundEnabled ? "Sesli Y\xF6nlendirme: A\xC7IK" : "Y\xF6nlendirme Sesini A\xE7" })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs3("p", { className: "text-xs text-slate-505 dark:text-slate-400 leading-relaxed font-serif", children: [
        "Yazmaya ba\u015Flamadan \xF6nce, 4-4-4-4 (Kutucuk Nefesi) ritmiyle zihninizi sakinle\u015Ftirebilirsiniz. ",
        soundEnabled ? "Sesli y\xF6nlendirmemiz, g\xF6zlerinizi kapatarak nefese odaklanman\u0131z\u0131 kolayla\u015Ft\u0131rmak i\xE7in her safhada de\u011Fi\u015Fen iyile\u015Ftirici t\u0131nlar \xFCretecektir." : "Dilerseniz sa\u011F \xFCstten 'Sesli Y\xF6nlendirme' se\xE7ene\u011Fini a\xE7arak g\xF6zleriniz kapal\u0131yken de akustik metronom rehberli\u011Finde \xE7al\u0131\u015Fabilirsiniz."
      ] }),
      /* @__PURE__ */ jsxs3("div", { className: "flex flex-col items-center justify-center py-6 space-y-6", id: "breathing-ring-arena", children: [
        /* @__PURE__ */ jsxs3("div", { className: "relative w-48 h-48 flex items-center justify-center", children: [
          /* @__PURE__ */ jsx3("div", { className: `absolute inset-0 rounded-full border-2 border-dashed transition-all duration-1000 ${isPlaying ? "animate-spin-slow opacity-25 border-[#A2845E]" : "opacity-10"}` }),
          /* @__PURE__ */ jsxs3("div", { className: `w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-[4000ms] ease-in-out ${currentPhase.circleClass}`, children: [
            /* @__PURE__ */ jsx3("span", { className: `text-base font-extrabold ${currentPhase.textColor} select-none font-sans`, children: isPlaying ? currentPhase.title : "Haz\u0131r m\u0131s\u0131n?" }),
            /* @__PURE__ */ jsx3("span", { className: "text-2xl font-black font-mono text-slate-850 dark:text-white mt-1 select-none", children: isPlaying ? `${timer}s` : "\u2022" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "text-center max-w-xs space-y-1.5", children: [
          /* @__PURE__ */ jsx3("p", { className: "text-xs font-semibold text-slate-700 dark:text-slate-300 min-h-4 font-serif", children: isPlaying ? currentPhase.desc : "Egzersizi ba\u015Flatmak i\xE7in a\u015Fa\u011F\u0131daki oynat d\xFC\u011Fmesine bas\u0131n\u0131z." }),
          /* @__PURE__ */ jsx3("p", { className: "text-[10px] text-[#8E8E93] uppercase tracking-wider font-extrabold font-mono", children: "S\xFCre\xE7: 4s Al \xB7 4s Tut \xB7 4s Ver \xB7 4s Bekle" })
        ] }),
        /* @__PURE__ */ jsx3(
          "button",
          {
            onClick: () => {
              setIsPlaying(!isPlaying);
              const AudioContextClass = window.AudioContext || window.webkitAudioContext;
              if (!audioCtxRef.current) {
                audioCtxRef.current = new AudioContextClass();
              }
            },
            className: `px-8 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 transition-all shadow-md ${isPlaying ? "bg-rose-500 text-white hover:bg-rose-600" : "bg-[#A2845E] text-white hover:bg-[#8D704E] hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0"}`,
            children: isPlaying ? /* @__PURE__ */ jsxs3(Fragment2, { children: [
              /* @__PURE__ */ jsx3(Pause, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx3("span", { children: "Egzersizi Durdur" })
            ] }) : /* @__PURE__ */ jsxs3(Fragment2, { children: [
              /* @__PURE__ */ jsx3(Play, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx3("span", { children: "Egzersizi Ba\u015Flat" })
            ] })
          }
        )
      ] })
    ] }),
    activeSubTab === "cbt" && /* @__PURE__ */ jsxs3("div", { className: "space-y-6", children: [
      /* @__PURE__ */ jsxs3("div", { className: "bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-4 shadow-sm", id: "cbt-sandbox-panel", children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2 pb-2.5 border-b border-[#E5E5EA] dark:border-stone-800/40", children: [
          /* @__PURE__ */ jsx3(Brain2, { className: "w-5 h-5 text-[#A2845E]" }),
          /* @__PURE__ */ jsx3("h2", { className: "font-bold text-slate-850 dark:text-white text-base", children: "Zihinsel D\xF6n\xFC\u015Ft\xFCr\xFCc\xFC (CBT Sandbox)" })
        ] }),
        /* @__PURE__ */ jsx3("p", { className: "text-xs text-slate-505 dark:text-slate-400 leading-relaxed font-serif", children: "Zihninizi me\u015Fgul eden, sizi k\u0131s\u0131tlayan ya da sabote eden olumsuz bir inanc\u0131 veya kayg\u0131y\u0131 buraya girin. Yapay zek\xE2 bu d\xFC\u015F\xFCnceyi saniyeler i\xE7inde analiz edecek, alt\u0131nda yatan bili\u015Fsel \xE7arp\u0131tmay\u0131 bulacak ve \u015Fefkatli bir g\xF6zl\xFCkle yeniden \xE7er\xE7eveleyecektir." }),
        /* @__PURE__ */ jsxs3("form", { onSubmit: triggerSandboxReframe, className: "space-y-4", children: [
          /* @__PURE__ */ jsxs3("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsx3("label", { className: "text-[10px] font-extrabold text-[#8E8E93] uppercase tracking-widest block", children: "Zihnini S\u0131k\u0131\u015Ft\u0131ran Kayg\u0131 veya Olumsuz \u0130nan\xE7" }),
            /* @__PURE__ */ jsx3(
              "input",
              {
                type: "text",
                value: originalThought,
                onChange: (e) => setOriginalThought(e.target.value),
                placeholder: "\xD6rn: Bu sunumda hata yaparsam herkes benim tamamen beceriksiz oldu\u011Fumu d\xFC\u015F\xFCnecek...",
                className: "w-full text-xs p-3.5 rounded-2xl bg-[#FDFCFB] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-850 text-slate-800 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-[#A2845E]/10"
              }
            )
          ] }),
          /* @__PURE__ */ jsx3("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx3(
            "button",
            {
              type: "submit",
              disabled: loading || !originalThought.trim(),
              className: `px-5 py-2.5 rounded-2xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer ${originalThought.trim() && !loading ? "bg-[#A2845E] text-white hover:bg-[#8D704E] hover:shadow transform hover:-translate-y-0.5 active:translate-y-0" : "bg-[#F2F2F7] text-slate-400 dark:bg-stone-800 dark:text-stone-600 cursor-not-allowed"}`,
              children: loading ? /* @__PURE__ */ jsxs3(Fragment2, { children: [
                /* @__PURE__ */ jsx3(RefreshCw2, { className: "w-3.5 h-3.5 animate-spin" }),
                /* @__PURE__ */ jsx3("span", { children: "D\xFC\u015F\xFCnce Sentezleniyor..." })
              ] }) : /* @__PURE__ */ jsxs3(Fragment2, { children: [
                /* @__PURE__ */ jsx3(Sparkles3, { className: "w-3.5 h-3.5 text-white animate-pulse" }),
                /* @__PURE__ */ jsx3("span", { children: "D\xFC\u015F\xFCnceyi Yeniden Yap\u0131land\u0131r" })
              ] })
            }
          ) })
        ] }),
        error && /* @__PURE__ */ jsxs3("div", { className: "bg-rose-50 dark:bg-rose-955/20 p-4 rounded-2xl text-xs text-rose-500", children: [
          "Hata: ",
          error,
          ". Tekrar deneyebilirsiniz."
        ] }),
        reframeResult && /* @__PURE__ */ jsx3("div", { className: "grid grid-cols-1 gap-4 pt-4 border-t border-[#E5E5EA] dark:border-stone-800/60 animate-fadeIn", id: "sandbox-results-panel", children: /* @__PURE__ */ jsxs3("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs3("div", { className: "p-4 bg-rose-50/40 dark:bg-rose-950/10 border-l-4 border-rose-400 rounded-2xl space-y-1", children: [
            /* @__PURE__ */ jsx3("span", { className: "text-[9px] uppercase tracking-wider font-extrabold text-rose-600 dark:text-rose-400 flex items-center gap-1", children: "\u26A0\uFE0F Fark Edilen K\u0131s\u0131tlay\u0131c\u0131 \u0130nan\xE7" }),
            /* @__PURE__ */ jsxs3("p", { className: "text-xs text-slate-650 dark:text-slate-350 italic font-serif", children: [
              '"',
              reframeResult.original,
              '"'
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "bg-[#F2F2F7] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 p-3 rounded-2xl flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsx3("span", { className: "text-[10px] text-slate-450 dark:text-slate-400 font-bold uppercase tracking-wider", children: "Hata T\xFCr\xFC S\u0131n\u0131fland\u0131rmas\u0131:" }),
            /* @__PURE__ */ jsx3("span", { className: "bg-[#FFF9E5] dark:bg-[#3E3326] text-[#A2845E] px-3 py-1 rounded-full font-bold uppercase tracking-wider text-[9px] border border-[#FFD60A]/35", children: reframeResult.distortionType })
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "p-4 bg-[#FFF9E5] dark:bg-[#3E3326]/40 border border-[#FFD60A]/40 rounded-2xl space-y-2", children: [
            /* @__PURE__ */ jsx3("span", { className: "text-[9px] uppercase tracking-wider font-extrabold text-[#A2845E] dark:text-[#FFF9E5] flex items-center gap-1", children: "\u2728 \u015Eefkatli & Ger\xE7ek\xE7i Alternatif G\xF6r\xFC\u015F" }),
            /* @__PURE__ */ jsxs3("p", { className: "text-xs text-slate-750 dark:text-[#FFF9E5] leading-relaxed font-serif italic font-medium", children: [
              '"',
              reframeResult.reframed,
              '"'
            ] })
          ] }),
          /* @__PURE__ */ jsx3("div", { className: "flex justify-end pt-1", children: savedToDiary ? /* @__PURE__ */ jsxs3("span", { className: "text-xs text-[#A2845E] dark:text-[#FFF9E5] font-bold flex items-center gap-1 animate-fadeIn bg-[#FFF9E5] dark:bg-[#3E3326]/40 px-3 py-1.5 rounded-xl border border-[#FFD60A]/35", children: [
            /* @__PURE__ */ jsx3(Check3, { className: "w-3.5 h-3.5" }),
            "Deftere Ba\u015Far\u0131yla Eklendi"
          ] }) : /* @__PURE__ */ jsxs3(
            "button",
            {
              onClick: handleSaveReframeToDiary,
              className: "px-4.5 py-2.5 rounded-xl border border-[#E5E5EA] text-slate-700 bg-white hover:bg-slate-50 hover:border-[#A2845E]/40 dark:bg-stone-900 dark:border-stone-800 dark:text-slate-300 dark:hover:bg-slate-800/60 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer",
              children: [
                /* @__PURE__ */ jsx3(Save, { className: "w-3.5 h-3.5 text-[#A2845E]" }),
                /* @__PURE__ */ jsx3("span", { children: "Bu Form\xFClasyonu Defterime Kaydet" })
              ]
            }
          ) })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxs3("div", { className: "bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-4 shadow-sm", children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2 pb-2 border-b border-[#E5E5EA] dark:border-stone-800/40", children: [
          /* @__PURE__ */ jsx3(Info, { className: "w-5 h-5 text-[#A2845E]" }),
          /* @__PURE__ */ jsx3("h2", { className: "font-bold text-slate-850 dark:text-white text-base", children: "Bili\u015Fsel \xC7arp\u0131tmalar Rehberi (E\u011Fitici K\xF6\u015Fe)" })
        ] }),
        /* @__PURE__ */ jsxs3("p", { className: "text-xs text-slate-505 dark:text-slate-400 leading-relaxed font-serif", children: [
          "Bazen beynimiz hayata filtreler koyarak bizi yan\u0131ltabilir. Bunlara ",
          /* @__PURE__ */ jsx3("strong", { children: "bili\u015Fsel \xE7arp\u0131tmalar" }),
          " denir. A\u015Fa\u011F\u0131daki s\u0131k kar\u015F\u0131la\u015F\u0131lan tuzaklar\u0131 inceleyerek kendi d\xFC\u015F\xFCnce ak\u0131\u015F\u0131n\u0131z\u0131 \xE7ok daha ayd\u0131nl\u0131k bir \u015Fekilde yakalayabilirsiniz:"
        ] }),
        /* @__PURE__ */ jsx3("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3 pt-2", children: COGNITIVE_DISTORTIONS_GUIDE.map((dist, idx) => {
          const isExpanded = expandedDistortionIndex === idx;
          return /* @__PURE__ */ jsxs3(
            "div",
            {
              className: "border border-[#E5E5EA] dark:border-stone-850 rounded-2xl bg-stone-50/50 dark:bg-stone-950/60 overflow-hidden transition-all duration-200",
              children: [
                /* @__PURE__ */ jsxs3(
                  "button",
                  {
                    type: "button",
                    onClick: () => setExpandedDistortionIndex(isExpanded ? null : idx),
                    className: "w-full text-left p-4 flex items-center justify-between hover:bg-[#FFF9E5]/10 cursor-pointer",
                    children: [
                      /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2.5", children: [
                        /* @__PURE__ */ jsx3("span", { className: "w-5 h-5 rounded-full bg-[#EADEC9] dark:bg-stone-800 text-[#A2845E] dark:text-stone-300 text-[10px] font-bold flex items-center justify-center", children: idx + 1 }),
                        /* @__PURE__ */ jsx3("h4", { className: "font-bold text-xs text-slate-800 dark:text-white", children: dist.name })
                      ] }),
                      isExpanded ? /* @__PURE__ */ jsx3(ChevronUp, { className: "w-4 h-4 text-[#A2845E]" }) : /* @__PURE__ */ jsx3(ChevronDown2, { className: "w-4 h-4 text-[#A2845E]" })
                    ]
                  }
                ),
                isExpanded && /* @__PURE__ */ jsxs3("div", { className: "px-4 pb-4 pt-1 space-y-3.5 border-t border-[#E5E5EA]/50 dark:border-stone-850/50 text-xs animate-fadeIn", children: [
                  /* @__PURE__ */ jsxs3("p", { className: "text-slate-500 dark:text-stone-300 leading-relaxed font-serif italic", children: [
                    '"',
                    dist.description,
                    '"'
                  ] }),
                  /* @__PURE__ */ jsxs3("div", { className: "p-3 bg-rose-50/30 dark:bg-rose-955/10 border-l-2 border-rose-300 rounded-xl space-y-0.5", children: [
                    /* @__PURE__ */ jsx3("span", { className: "text-[9px] uppercase tracking-wider font-extrabold text-rose-600", children: "\xD6rnek D\xFC\u015F\xFCnce:" }),
                    /* @__PURE__ */ jsxs3("p", { className: "font-serif italic text-[#8E8E93] dark:text-stone-400", children: [
                      '"',
                      dist.example,
                      '"'
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxs3("div", { className: "p-3 bg-[#FFF9E5]/30 dark:bg-[#3E3326]/20 border-l-2 border-[#A2845E] rounded-xl space-y-0.5", children: [
                    /* @__PURE__ */ jsx3("span", { className: "text-[9px] uppercase tracking-wider font-extrabold text-[#A2845E] dark:text-[#FFF9E5]", children: "\u015Eefkatli Panzehir:" }),
                    /* @__PURE__ */ jsxs3("p", { className: "font-serif italic text-slate-705 dark:text-[#FFF9E5]", children: [
                      '"',
                      dist.antidote,
                      '"'
                    ] })
                  ] })
                ] })
              ]
            },
            idx
          );
        }) })
      ] })
    ] }),
    activeSubTab === "journeys" && /* @__PURE__ */ jsx3("div", { className: "space-y-6 animate-fadeIn", children: !selectedJourneyId ? (
      /* Choose a Journey Screen */
      /* @__PURE__ */ jsxs3("div", { className: "bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-4 shadow-sm", children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2 pb-1", children: [
          /* @__PURE__ */ jsx3(Compass3, { className: "w-5 h-5 text-[#A2845E]" }),
          /* @__PURE__ */ jsx3("h2", { className: "font-bold text-slate-850 dark:text-white text-base", children: "Geli\u015Fim Patikalar\u0131 (Guided Journeys)" })
        ] }),
        /* @__PURE__ */ jsx3("p", { className: "text-xs text-slate-505 dark:text-slate-400 leading-relaxed font-serif", children: "Zihinsel esnekli\u011Finizi, \xF6z-\u015Fefkatinizi veya ya\u015Fam\u0131n anlam\u0131n\u0131 art\u0131rmaya y\xF6nelik haz\u0131rlanan, bizzat psikoloji yakla\u015F\u0131mlar\u0131ndan ilham alan yap\u0131land\u0131r\u0131lm\u0131\u015F mikro geli\u015Fim yolculuklar\u0131n\u0131 ke\u015Ffedin. Her g\xFCn bir ad\u0131m tamamlayarak kal\u0131c\u0131 geli\u015Fim tohumlar\u0131 ekebilirsiniz:" }),
        /* @__PURE__ */ jsx3("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4.5 pt-2", children: GROWTH_JOURNEYS.map((journey) => {
          const completedSteps = journeyProgress[journey.id] || 0;
          const isStarted = completedSteps > 0;
          const isAllCompleted = completedSteps >= journey.durationDays;
          const percent = Math.min(Math.round(completedSteps / journey.durationDays * 100), 100);
          return /* @__PURE__ */ jsxs3(
            "div",
            {
              className: "border border-[#E5E5EA] dark:border-stone-850 rounded-[28px] p-5 bg-stone-50/40 dark:bg-stone-950/40 flex flex-col justify-between space-y-4 relative overflow-hidden group shadow-sm hover:shadow-md transition-all duration-300",
              children: [
                /* @__PURE__ */ jsxs3("div", { className: "flex items-start justify-between", children: [
                  /* @__PURE__ */ jsx3("div", { className: "bg-[#FFF9E5] dark:bg-[#3E3326] h-12 w-12 rounded-2xl flex items-center justify-center text-xl border border-[#FFD60A]/35 group-hover:scale-105 transition-transform", children: journey.badge }),
                  /* @__PURE__ */ jsxs3("span", { className: "text-[10px] bg-[#EADEC9]/30 dark:bg-stone-800 px-2.5 py-1 rounded-full text-[#A2845E] dark:text-stone-300 font-extrabold uppercase tracking-wide", children: [
                    journey.durationDays,
                    " G\xDCNL\xDCK"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs3("div", { className: "space-y-1.5", children: [
                  /* @__PURE__ */ jsx3("h3", { className: "font-bold text-sm text-slate-850 dark:text-white font-sans", children: journey.title }),
                  /* @__PURE__ */ jsx3("p", { className: "text-[11px] text-slate-500 dark:text-stone-300 leading-relaxed font-serif", children: journey.description })
                ] }),
                /* @__PURE__ */ jsxs3("div", { className: "space-y-1 pt-1", children: [
                  /* @__PURE__ */ jsxs3("div", { className: "flex justify-between text-[9px] font-mono font-bold text-slate-400", children: [
                    /* @__PURE__ */ jsx3("span", { children: isAllCompleted ? "Tamamland\u0131" : `${completedSteps}/${journey.durationDays} G\xFCn` }),
                    /* @__PURE__ */ jsxs3("span", { children: [
                      percent,
                      "%"
                    ] })
                  ] }),
                  /* @__PURE__ */ jsx3("div", { className: "w-full h-1.5 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx3(
                    "div",
                    {
                      className: "h-full bg-[#A2845E] transition-all duration-500",
                      style: { width: `${percent}%` }
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsx3(
                  "button",
                  {
                    onClick: () => setSelectedJourneyId(journey.id),
                    className: `w-full py-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${isAllCompleted ? "bg-emerald-500 text-white hover:bg-emerald-600" : isStarted ? "bg-[#A2845E] text-white hover:bg-[#8D704E]" : "bg-white border border-[#E5E5EA] text-slate-700 hover:border-[#A2845E]/40 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-slate-800"}`,
                    children: isAllCompleted ? /* @__PURE__ */ jsxs3(Fragment2, { children: [
                      /* @__PURE__ */ jsx3(Award, { className: "w-3.5 h-3.5" }),
                      /* @__PURE__ */ jsx3("span", { children: "Yolculu\u011Fu \u0130ncele" })
                    ] }) : isStarted ? /* @__PURE__ */ jsxs3(Fragment2, { children: [
                      /* @__PURE__ */ jsx3("span", { children: "Yolculu\u011Fa Devam Et" }),
                      /* @__PURE__ */ jsx3(ArrowRight2, { className: "w-3.5 h-3.5" })
                    ] }) : /* @__PURE__ */ jsxs3(Fragment2, { children: [
                      /* @__PURE__ */ jsx3("span", { children: "Patikay\u0131 Ba\u015Flat" }),
                      /* @__PURE__ */ jsx3(ChevronRight, { className: "w-3.5 h-3.5" })
                    ] })
                  }
                )
              ]
            },
            journey.id
          );
        }) })
      ] })
    ) : (
      /* Active Journey Workspace Screen */
      /* @__PURE__ */ jsxs3("div", { className: "bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-6 shadow-sm", children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#E5E5EA] dark:border-stone-800/40 gap-3", children: [
          /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx3("div", { className: "bg-[#FFF9E5] dark:bg-[#3E3326] h-11 w-11 rounded-2xl flex items-center justify-center text-xl border border-[#FFD60A]/35", children: selectedJourney.badge }),
            /* @__PURE__ */ jsxs3("div", { children: [
              /* @__PURE__ */ jsx3("span", { className: "text-[9px] uppercase tracking-wider font-extrabold text-[#A2845E] dark:text-[#FFF9E5]", children: "Aktif Geli\u015Fim Patikas\u0131" }),
              /* @__PURE__ */ jsx3("h3", { className: "font-bold text-slate-850 dark:text-white text-base font-sans", children: selectedJourney.title })
            ] })
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx3(
              "button",
              {
                onClick: () => handleResetJourney(selectedJourney.id),
                className: "px-3.5 py-2 border border-rose-200 text-rose-500 hover:bg-rose-50 dark:border-rose-950/20 dark:hover:bg-rose-955/10 rounded-xl text-[10px] font-bold transition-all cursor-pointer",
                children: "Geli\u015Fimi S\u0131f\u0131rla"
              }
            ),
            /* @__PURE__ */ jsx3(
              "button",
              {
                onClick: () => setSelectedJourneyId(null),
                className: "px-4 py-2 border border-[#E5E5EA] text-slate-700 hover:bg-slate-50 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-800 rounded-xl text-[10px] font-bold transition-all cursor-pointer",
                children: "Patikalara D\xF6n"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs3("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsx3("span", { className: "text-[10px] font-extrabold text-[#8E8E93] uppercase tracking-widest block", children: "Yolculuk Yol Haritan\u0131z:" }),
          /* @__PURE__ */ jsx3("div", { className: "grid grid-cols-2 sm:grid-cols-5 gap-2", children: selectedJourney.steps.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isActive = idx === currentStepIndex && !isJourneyCompleted;
            const isLocked = idx > currentStepIndex;
            return /* @__PURE__ */ jsxs3(
              "div",
              {
                className: `p-3.5 rounded-2xl border text-center flex flex-col justify-between h-24 transition-all relative overflow-hidden ${isCompleted ? "bg-[#FFF9E5]/30 border-[#FFD60A]/20 dark:bg-[#3E3326]/10 dark:border-amber-950/20 text-[#A2845E] dark:text-[#FFF9E5]" : isActive ? "bg-white border-[#A2845E] ring-2 ring-[#A2845E]/10 dark:bg-stone-950 dark:border-[#A2845E]" : "bg-stone-50/50 border-[#E5E5EA] text-slate-400 dark:bg-stone-950 dark:border-stone-850"}`,
                children: [
                  /* @__PURE__ */ jsxs3("div", { className: "flex justify-between items-center text-[10px] font-mono font-bold", children: [
                    /* @__PURE__ */ jsxs3("span", { children: [
                      "G\xFCn ",
                      step.day
                    ] }),
                    isCompleted ? /* @__PURE__ */ jsx3(Check3, { className: "w-3.5 h-3.5 text-emerald-500 font-bold" }) : isLocked ? /* @__PURE__ */ jsx3(Lock, { className: "w-3 h-3 text-slate-300 dark:text-stone-750" }) : /* @__PURE__ */ jsx3("span", { className: "h-2 w-2 rounded-full bg-[#A2845E] animate-ping" })
                  ] }),
                  /* @__PURE__ */ jsx3("div", { className: "text-[10px] font-bold leading-tight font-sans truncate text-left pt-1", children: step.title })
                ]
              },
              step.day
            );
          }) })
        ] }),
        isJourneyCompleted ? (
          /* Celebration Box */
          /* @__PURE__ */ jsxs3("div", { className: "bg-[#FFF9E5] dark:bg-[#3E3326]/40 p-8 rounded-[32px] border border-[#FFD60A]/35 text-center space-y-4 shadow-sm animate-fadeIn", children: [
            /* @__PURE__ */ jsx3("span", { className: "text-5xl block animate-bounce", children: "\u{1F3C6}" }),
            /* @__PURE__ */ jsxs3("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsx3("h4", { className: "font-bold text-[#A2845E] dark:text-[#FFF9E5] text-lg font-sans", children: "Tebrikler, Patikay\u0131 Tamamlad\u0131n\u0131z!" }),
              /* @__PURE__ */ jsxs3("p", { className: "text-xs text-stone-700 dark:text-stone-300 font-serif italic max-w-md mx-auto leading-relaxed", children: [
                '"',
                selectedJourney.title,
                '" yolculu\u011Fundaki t\xFCm geli\u015Fim ve \u015Fefkat egzersizlerini ba\u015Far\u0131yla tamamlayarak defterinize kaydettiniz. Bu derin \xF6zveri, zihninizde kal\u0131c\u0131 fark\u0131ndal\u0131k ve dinginlik meyveleri verecektir.'
              ] })
            ] }),
            /* @__PURE__ */ jsx3("div", { className: "pt-2", children: /* @__PURE__ */ jsxs3("span", { className: "inline-flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-stone-950 text-[#A2845E] border border-[#FFD60A] rounded-full text-xs font-bold font-mono", children: [
              "Kilidi A\xE7\u0131lan Rozet: ",
              selectedJourney.badge,
              " Mezunu"
            ] }) })
          ] })
        ) : (
          /* Guided Step Input */
          /* @__PURE__ */ jsxs3("div", { className: "bg-stone-50/80 dark:bg-stone-955/60 border border-[#E5E5EA] dark:border-stone-850 p-5 rounded-[28px] space-y-4 animate-fadeIn", children: [
            /* @__PURE__ */ jsxs3("div", { className: "flex gap-3.5 items-start", children: [
              /* @__PURE__ */ jsx3("div", { className: "bg-[#A2845E] text-white font-mono font-bold h-7 w-7 rounded-lg text-xs flex items-center justify-center shrink-0", children: activeJourneyStep.day }),
              /* @__PURE__ */ jsxs3("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx3("span", { className: "text-[9px] uppercase tracking-wider font-extrabold text-[#8E8E93]", children: "Bug\xFCn\xFCn Oda\u011F\u0131 ve Temas\u0131:" }),
                /* @__PURE__ */ jsxs3("h4", { className: "font-bold text-xs text-slate-800 dark:text-white", children: [
                  activeJourneyStep.title,
                  " \u2014 ",
                  activeJourneyStep.theme
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs3("div", { className: "bg-white dark:bg-stone-950 p-4 rounded-2xl border border-[#E5E5EA] dark:border-stone-850 space-y-1 shadow-xs", children: [
              /* @__PURE__ */ jsx3("span", { className: "text-[9px] text-[#A2845E] uppercase tracking-wider font-extrabold flex items-center gap-1", children: "\u{1F4A1} Rehberlik Y\xF6nergesi:" }),
              /* @__PURE__ */ jsx3("p", { className: "text-xs text-slate-655 dark:text-stone-300 leading-relaxed font-serif italic", children: activeJourneyStep.guideline })
            ] }),
            /* @__PURE__ */ jsxs3("div", { className: "p-4 bg-[#FFF9E5] dark:bg-[#3E3326]/30 border border-[#FFD60A]/35 rounded-2xl space-y-2", children: [
              /* @__PURE__ */ jsx3("span", { className: "text-[9px] text-[#A2845E] uppercase tracking-wider font-extrabold flex items-center gap-1", children: "\u2728 Geli\u015Fim Sorusunu Yan\u0131tlay\u0131n:" }),
              /* @__PURE__ */ jsxs3("p", { className: "text-xs text-slate-800 dark:text-[#FFF9E5] leading-relaxed font-serif italic font-semibold", children: [
                '"',
                activeJourneyStep.prompt,
                '"'
              ] })
            ] }),
            /* @__PURE__ */ jsxs3("div", { className: "space-y-3 pt-1", children: [
              /* @__PURE__ */ jsx3(
                "textarea",
                {
                  value: journeyResponse,
                  onChange: (e) => setJourneyResponse(e.target.value),
                  placeholder: "Buraya d\xF6k i\xE7ini, s\xFCzge\xE7ten ge\xE7ir zihnini...",
                  className: "w-full text-xs p-4 rounded-2xl bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-800 text-slate-800 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-[#A2845E]/10 min-h-24 resize-none transition-all leading-relaxed",
                  maxLength: 1e3
                }
              ),
              /* @__PURE__ */ jsxs3("div", { className: "flex justify-between items-center", children: [
                /* @__PURE__ */ jsxs3("span", { className: "text-[10px] text-slate-400 font-mono", children: [
                  journeyResponse.length,
                  "/1000 karakter"
                ] }),
                journeySaved ? /* @__PURE__ */ jsxs3("span", { className: "text-xs text-[#A2845E] dark:text-[#FFF9E5] font-bold flex items-center gap-1 animate-fadeIn bg-[#FFF9E5] dark:bg-[#3E3326]/40 px-3.5 py-2 rounded-xl border border-[#FFD60A]/35", children: [
                  /* @__PURE__ */ jsx3(Check3, { className: "w-3.5 h-3.5 text-emerald-500 font-bold" }),
                  "G\xFCnl\xFCk Yaz\u0131s\u0131 Deftere Eklendi & S\u0131radaki G\xFCn A\xE7\u0131ld\u0131!"
                ] }) : /* @__PURE__ */ jsxs3(
                  "button",
                  {
                    type: "button",
                    disabled: !journeyResponse.trim(),
                    onClick: () => handleSaveJourneyStep(selectedJourney, activeJourneyStep),
                    className: `px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer ${journeyResponse.trim() ? "bg-[#A2845E] text-white hover:bg-[#8D704E] hover:shadow transform hover:-translate-y-0.5" : "bg-[#F2F2F7] text-slate-400 dark:bg-stone-800 dark:text-stone-600 cursor-not-allowed"}`,
                    children: [
                      /* @__PURE__ */ jsx3("span", { children: "G\xFCn\xFC Tamamla ve Kaydet" }),
                      /* @__PURE__ */ jsx3(Check3, { className: "w-3.5 h-3.5" })
                    ]
                  }
                )
              ] })
            ] })
          ] })
        )
      ] })
    ) }),
    activeSubTab === "quotes" && /* @__PURE__ */ jsxs3("div", { className: "bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-5 shadow-sm animate-fadeIn", id: "motivational-quotes-panel", children: [
      /* @__PURE__ */ jsxs3("div", { className: "flex items-center justify-between pb-2.5 border-b border-[#E5E5EA] dark:border-stone-800/40", children: [
        /* @__PURE__ */ jsxs3("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx3(Quote, { className: "w-5 h-5 text-[#A2845E]" }),
          /* @__PURE__ */ jsx3("h2", { className: "font-bold text-slate-850 dark:text-white text-base font-sans", children: "Geli\u015Fim K\u0131v\u0131lc\u0131m\u0131 (Inspirational Cards)" })
        ] }),
        /* @__PURE__ */ jsx3("span", { className: "text-[10px] bg-[#FFF9E5] dark:bg-[#3E3326]/50 px-2.5 py-1 rounded-full text-[#A2845E] dark:text-[#FFF9E5] font-extrabold uppercase tracking-wide border border-[#FFD60A]/35", children: MOTIVATIONAL_QUOTES[currentQuoteIndex].category })
      ] }),
      /* @__PURE__ */ jsx3("p", { className: "text-xs text-slate-650 dark:text-slate-400 leading-relaxed font-serif", children: "Ki\u015Fisel geli\u015Fimi, motivasyonu ve olumlu d\xFC\u015F\xFCnmeyi desteklemek i\xE7in \xF6zenle se\xE7ilmi\u015F al\u0131nt\u0131 kart\u0131. Kendinize odaklanmak ve zihninizi pozitife y\xF6nlendirmek i\xE7in yeni k\u0131v\u0131lc\u0131mlar ate\u015Fleyebilirsiniz." }),
      /* @__PURE__ */ jsxs3("div", { className: "relative overflow-hidden bg-[#FFF9E5] dark:bg-[#3E3326]/30 border border-[#FFD60A]/25 rounded-2xl p-6 md:p-8 flex flex-col justify-between min-h-[180px] shadow-sm transition-all duration-300", children: [
        /* @__PURE__ */ jsx3("div", { className: "absolute top-0 right-0 p-4 opacity-5 select-none pointer-events-none", children: /* @__PURE__ */ jsx3(Quote, { className: "w-24 h-24 text-[#A2845E]" }) }),
        /* @__PURE__ */ jsxs3("div", { className: "relative space-y-4", children: [
          /* @__PURE__ */ jsxs3("blockquote", { className: "text-lg md:text-xl font-serif italic text-[#A2845E] dark:text-[#FFF9E5] leading-relaxed font-semibold", children: [
            '"',
            MOTIVATIONAL_QUOTES[currentQuoteIndex].text,
            '"'
          ] }),
          /* @__PURE__ */ jsxs3("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsxs3("span", { className: "text-xs font-bold text-slate-800 dark:text-stone-200", children: [
              "\u2014 ",
              MOTIVATIONAL_QUOTES[currentQuoteIndex].author
            ] }),
            /* @__PURE__ */ jsxs3("span", { className: "text-[10px] text-[#A2845E] dark:text-[#FFF9E5] uppercase font-mono font-extrabold tracking-wider", children: [
              "Odak: ",
              MOTIVATIONAL_QUOTES[currentQuoteIndex].focus
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs3("div", { className: "flex flex-col sm:flex-row items-center gap-3 justify-between pt-1", children: [
        /* @__PURE__ */ jsxs3(
          "button",
          {
            onClick: handleNextQuote,
            className: "w-full sm:w-auto px-5 py-3 rounded-2xl text-xs font-bold bg-[#A2845E] text-white hover:bg-[#8D704E] shadow hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-1.5 cursor-pointer",
            children: [
              /* @__PURE__ */ jsx3(RefreshCw2, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsx3("span", { children: "Yeni Al\u0131nt\u0131 Ate\u015Fle" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs3("div", { className: "flex gap-2.5 w-full sm:w-auto justify-end", children: [
          /* @__PURE__ */ jsx3(
            "button",
            {
              onClick: handleCopyQuote,
              className: `px-4 py-2.5 rounded-xl border border-[#E5E5EA] text-slate-705 bg-white hover:bg-slate-50 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-850 text-xs font-bold flex items-center justify-center gap-1.5 transition-all flex-1 sm:flex-none cursor-pointer ${copied ? "border-emerald-500 text-emerald-605 bg-emerald-50/10" : ""}`,
              children: copied ? /* @__PURE__ */ jsxs3(Fragment2, { children: [
                /* @__PURE__ */ jsx3(Check3, { className: "w-3.5 h-3.5 text-emerald-600" }),
                /* @__PURE__ */ jsx3("span", { children: "Kopyaland\u0131!" })
              ] }) : /* @__PURE__ */ jsxs3(Fragment2, { children: [
                /* @__PURE__ */ jsx3(Copy, { className: "w-3.5 h-3.5 text-[#A2845E]" }),
                /* @__PURE__ */ jsx3("span", { children: "Kopyala" })
              ] })
            }
          ),
          quoteSaved ? /* @__PURE__ */ jsxs3("span", { className: "px-4 py-2.5 rounded-xl border border-[#FFD60A]/35 text-[#A2845E] dark:text-[#FFF9E5] bg-[#FFF9E5] dark:bg-[#3E3326]/40 text-xs font-extrabold flex items-center justify-center gap-1.5 animate-fadeIn", children: [
            /* @__PURE__ */ jsx3(Check3, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsx3("span", { children: "Deftere Kaydedildi!" })
          ] }) : /* @__PURE__ */ jsxs3(
            "button",
            {
              onClick: handleSaveQuoteToDiary,
              className: "px-4 py-2.5 rounded-xl border border-[#E5E5EA] text-slate-705 bg-white hover:bg-slate-50 hover:border-[#A2845E]/40 dark:bg-stone-900 dark:border-stone-800 dark:text-stone-300 dark:hover:bg-stone-850 text-xs font-bold flex items-center justify-center gap-1.5 transition-all flex-1 sm:flex-none cursor-pointer",
              children: [
                /* @__PURE__ */ jsx3(BookOpen2, { className: "w-3.5 h-3.5 text-[#A2845E]" }),
                /* @__PURE__ */ jsx3("span", { children: "Defterime Kaydet" })
              ]
            }
          )
        ] })
      ] })
    ] })
  ] });
}

// src/components/StatsDashboard.tsx
import { useState as useState4 } from "react";
import {
  Flame as Flame2,
  Activity,
  Sparkles as Sparkles4,
  TrendingUp,
  Calendar,
  Heart as Heart3,
  ChevronLeft,
  ChevronRight as ChevronRight2,
  X as X3,
  BookOpen as BookOpen3
} from "lucide-react";
import { jsx as jsx4, jsxs as jsxs4 } from "react/jsx-runtime";
function StatsDashboard({ entries }) {
  const [currentCalendarDate, setCurrentCalendarDate] = useState4(() => /* @__PURE__ */ new Date());
  const [selectedDayDate, setSelectedDayDate] = useState4(() => /* @__PURE__ */ new Date());
  const [calendarViewMode, setCalendarViewMode] = useState4("month");
  const formatDateKey = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const entriesByDate = entries.reduce((acc, entry) => {
    const d = new Date(entry.createdAt);
    const key = formatDateKey(d);
    if (!acc[key]) acc[key] = [];
    acc[key].push(entry);
    return acc;
  }, {});
  const calculateStreak = () => {
    if (entries.length === 0) return { current: 0, longest: 0 };
    const dates = entries.map((e) => new Date(e.createdAt).toDateString()).filter((value, index, self) => self.indexOf(value) === index).map((d) => new Date(d)).sort((a, b) => b.getTime() - a.getTime());
    if (dates.length === 0) return { current: 0, longest: 0 };
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;
    const today = /* @__PURE__ */ new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const firstDate = dates[0];
    firstDate.setHours(0, 0, 0, 0);
    const hasWrittenRecently = firstDate.getTime() === today.getTime() || firstDate.getTime() === yesterday.getTime();
    if (hasWrittenRecently) {
      currentStreak = 1;
      let checkDate = new Date(firstDate);
      for (let i = 1; i < dates.length; i++) {
        const nextDate = dates[i];
        nextDate.setHours(0, 0, 0, 0);
        const diffTime = Math.abs(checkDate.getTime() - nextDate.getTime());
        const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
        if (diffDays === 1) {
          currentStreak++;
          checkDate = nextDate;
        } else if (diffDays > 1) {
          break;
        }
      }
    } else {
      currentStreak = 0;
    }
    let maxStreak = 1;
    let checkDateLongest = dates[dates.length - 1];
    checkDateLongest.setHours(0, 0, 0, 0);
    for (let i = dates.length - 2; i >= 0; i--) {
      const currentDate = dates[i];
      currentDate.setHours(0, 0, 0, 0);
      const diffTime = Math.abs(currentDate.getTime() - checkDateLongest.getTime());
      const diffDays = Math.ceil(diffTime / (1e3 * 60 * 60 * 24));
      if (diffDays === 1) {
        tempStreak++;
        if (tempStreak > maxStreak) maxStreak = tempStreak;
      } else if (diffDays > 1) {
        tempStreak = 1;
      }
      checkDateLongest = currentDate;
    }
    longestStreak = Math.max(maxStreak, currentStreak, dates.length > 0 ? 1 : 0);
    return { current: currentStreak, longest: longestStreak };
  };
  const streak = calculateStreak();
  const categoryCounts = entries.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + 1;
    return acc;
  }, {});
  const totalEntries = entries.length || 1;
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {});
  let dominantMood = null;
  let maxMoodCount = -1;
  Object.keys(MOOD_LABELS).forEach((m) => {
    const key = m;
    const count = moodCounts[key] || 0;
    if (count > maxMoodCount && count > 0) {
      maxMoodCount = count;
      dominantMood = key;
    }
  });
  const getDailyMessage = () => {
    if (entries.length === 0) {
      return "Zihnindeki y\xFCk\xFC hafifletip fark\u0131ndal\u0131\u011F\u0131n\u0131 art\u0131rmak i\xE7in ilk d\xFC\u015F\xFCnceni yazmaya ne dersin?";
    }
    if (categoryCounts["GRATITUDE" /* GRATITUDE */] && categoryCounts["GRATITUDE" /* GRATITUDE */] > entries.length / 3) {
      return "Harika bir denge! G\xFCnl\xFCklerinde \u015F\xFCkran ve takdir temas\u0131 \xF6ne \xE7\u0131k\u0131yor. Minnet kas\u0131n\u0131 \xE7al\u0131\u015Ft\u0131rmak zihinsel direncini \xE7ok ciddi oranda destekler.";
    }
    if (categoryCounts["CHALLENGE" /* CHALLENGE */] && categoryCounts["CHALLENGE" /* CHALLENGE */] > entries.length / 3) {
      return "Zorluklar\u0131 yazarak serbest b\u0131rakmak son derece sa\u011Fl\u0131kl\u0131 bir ba\u015F etme y\xF6ntemidir. Bili\u015Fsel \xE7er\xE7eveleyiciyi deneyerek bu t\u0131kanm\u0131\u015F d\xFC\u015F\xFCncelere yeni alanlar a\xE7abilirsin.";
    }
    return "Defterini d\xFCzenli kullanarak kendine alan a\xE7\u0131yorsun. Yazmak, zihni organize etmenin ve \xF6z-\u015Fefkati \xF6\u011Frenmenin en somut, zarif yoludur.";
  };
  const calYear = currentCalendarDate.getFullYear();
  const calMonth = currentCalendarDate.getMonth();
  const currentMonthTitle = currentCalendarDate.toLocaleDateString("tr-TR", { month: "long", year: "numeric" });
  const prevMonth = () => {
    setCurrentCalendarDate(new Date(calYear, calMonth - 1, 1));
  };
  const nextMonth = () => {
    setCurrentCalendarDate(new Date(calYear, calMonth + 1, 1));
  };
  const goToToday = () => {
    const today = /* @__PURE__ */ new Date();
    setCurrentCalendarDate(today);
    setSelectedDayDate(today);
  };
  const firstDayOfMonthRaw = new Date(calYear, calMonth, 1).getDay();
  const firstWeekday = (firstDayOfMonthRaw + 6) % 7;
  const daysInCurrentMonth = new Date(calYear, calMonth + 1, 0).getDate();
  let activeDaysInMonth = 0;
  let totalEntriesInMonth = 0;
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const key = formatDateKey(new Date(calYear, calMonth, day));
    const dayList = entriesByDate[key] || [];
    if (dayList.length > 0) activeDaysInMonth++;
    totalEntriesInMonth += dayList.length;
  }
  const monthFillRate = Math.round(activeDaysInMonth / daysInCurrentMonth * 100);
  const selectedDayKey = selectedDayDate ? formatDateKey(selectedDayDate) : "";
  const selectedDayEntries = selectedDayKey ? entriesByDate[selectedDayKey] || [] : [];
  const selectedDayTitle = selectedDayDate ? selectedDayDate.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", weekday: "long" }) : "";
  const weekdays = ["Pzt", "Sal", "\xC7ar", "Per", "Cum", "Cmt", "Paz"];
  return /* @__PURE__ */ jsxs4("div", { className: "space-y-6 pb-24", id: "stats-dashboard-container", children: [
    /* @__PURE__ */ jsxs4("div", { className: "bg-[#A2845E] text-white p-6 rounded-[32px] shadow-md border border-[#A2845E]", id: "stats-hero-widget", children: [
      /* @__PURE__ */ jsxs4("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxs4("div", { children: [
          /* @__PURE__ */ jsx4("span", { className: "text-[10px] uppercase font-extrabold tracking-wider text-stone-200", children: "Geli\u015Fim Sevinci" }),
          /* @__PURE__ */ jsx4("h2", { className: "text-2xl font-bold font-serif text-white mt-1", children: "Zihinsel Geli\u015Fim Aynas\u0131" })
        ] }),
        /* @__PURE__ */ jsx4("div", { className: "bg-white/10 p-2.5 rounded-2xl", children: /* @__PURE__ */ jsx4(Sparkles4, { className: "w-5 h-5 text-white animate-pulse" }) })
      ] }),
      /* @__PURE__ */ jsxs4("p", { className: "text-xs text-stone-100 mt-4 leading-relaxed italic border-l-2 border-white/40 pl-3 font-serif", children: [
        '"',
        getDailyMessage(),
        '"'
      ] }),
      /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-2 gap-4 mt-6", children: [
        /* @__PURE__ */ jsxs4("div", { className: "bg-white dark:bg-stone-900 border border-transparent dark:border-stone-800 p-4 rounded-2xl flex items-center gap-3 shadow-sm", children: [
          /* @__PURE__ */ jsx4("div", { className: "bg-[#FFF9E5] dark:bg-[#3E3326]/50 p-2.5 rounded-xl", children: /* @__PURE__ */ jsx4(Flame2, { className: "w-5 h-5 text-[#A2845E] animate-pulse" }) }),
          /* @__PURE__ */ jsxs4("div", { children: [
            /* @__PURE__ */ jsxs4("div", { className: "text-xl font-bold text-slate-800 dark:text-white leading-tight", children: [
              streak.current,
              " G\xFCn"
            ] }),
            /* @__PURE__ */ jsx4("div", { className: "text-[10px] uppercase tracking-wider font-extrabold text-[#8E8E93]", children: "Aktif Seri" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "bg-white dark:bg-stone-900 border border-transparent dark:border-stone-800 p-4 rounded-2xl flex items-center gap-3 shadow-sm", children: [
          /* @__PURE__ */ jsx4("div", { className: "bg-[#FFF9E5] dark:bg-[#3E3326]/50 p-2.5 rounded-xl", children: /* @__PURE__ */ jsx4(TrendingUp, { className: "w-5 h-5 text-[#A2845E]" }) }),
          /* @__PURE__ */ jsxs4("div", { children: [
            /* @__PURE__ */ jsxs4("div", { className: "text-xl font-bold text-slate-800 dark:text-white leading-tight", children: [
              streak.longest,
              " G\xFCn"
            ] }),
            /* @__PURE__ */ jsx4("div", { className: "text-[10px] uppercase tracking-wider font-extrabold text-[#8E8E93]", children: "En Uzun Seri" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-800 p-6 rounded-[32px] shadow-sm space-y-5", id: "stats-calendar-card", children: [
      /* @__PURE__ */ jsxs4("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200/60 dark:border-stone-800/60", children: [
        /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsx4("div", { className: "p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#A2845E] border border-amber-200/40 dark:border-amber-900/30", children: /* @__PURE__ */ jsx4(Calendar, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs4("div", { children: [
            /* @__PURE__ */ jsx4("h3", { className: "font-bold text-stone-900 dark:text-stone-100 text-base leading-tight", children: "Yazma Rutini S\u0131cakl\u0131\u011F\u0131" }),
            /* @__PURE__ */ jsx4("p", { className: "text-[11px] text-stone-500 dark:text-stone-400", children: "Takvim \xFCzerinden t\xFCm yazma s\u0131kl\u0131\u011F\u0131n\u0131z\u0131 ve g\xFCnlerinizi ke\u015Ffedin" })
          ] })
        ] }),
        /* @__PURE__ */ jsx4("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxs4("div", { className: "bg-stone-100 dark:bg-stone-950 p-1 rounded-xl flex items-center border border-stone-200/60 dark:border-stone-800", children: [
          /* @__PURE__ */ jsx4(
            "button",
            {
              onClick: () => setCalendarViewMode("month"),
              className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${calendarViewMode === "month" ? "bg-white dark:bg-stone-800 text-[#A2845E] dark:text-amber-300 shadow-xs" : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"}`,
              children: "Ayl\u0131k Takvim"
            }
          ),
          /* @__PURE__ */ jsx4(
            "button",
            {
              onClick: () => setCalendarViewMode("year"),
              className: `px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${calendarViewMode === "year" ? "bg-white dark:bg-stone-800 text-[#A2845E] dark:text-amber-300 shadow-xs" : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"}`,
              children: "Y\u0131ll\u0131k Is\u0131 Haritas\u0131"
            }
          )
        ] }) })
      ] }),
      calendarViewMode === "month" && /* @__PURE__ */ jsxs4("div", { className: "space-y-4 animate-fadeIn", children: [
        /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx4(
              "button",
              {
                onClick: prevMonth,
                className: "p-1.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors cursor-pointer",
                title: "\xD6nceki Ay",
                children: /* @__PURE__ */ jsx4(ChevronLeft, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsx4("span", { className: "font-serif font-bold text-base text-stone-900 dark:text-stone-100 capitalize min-w-[130px] text-center", children: currentMonthTitle }),
            /* @__PURE__ */ jsx4(
              "button",
              {
                onClick: nextMonth,
                className: "p-1.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors cursor-pointer",
                title: "Sonraki Ay",
                children: /* @__PURE__ */ jsx4(ChevronRight2, { className: "w-4 h-4" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx4(
              "button",
              {
                onClick: goToToday,
                className: "text-xs px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 font-medium transition-colors cursor-pointer",
                children: "Bug\xFCn"
              }
            ),
            /* @__PURE__ */ jsxs4("span", { className: "text-[11px] font-mono px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-[#A2845E] dark:text-amber-300 font-bold border border-amber-200/40 dark:border-amber-900/40 hidden sm:inline", children: [
              activeDaysInMonth,
              " / ",
              daysInCurrentMonth,
              " G\xFCn Aktif (%",
              monthFillRate,
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx4("div", { className: "grid grid-cols-7 gap-1.5 text-center", children: weekdays.map((w, i) => /* @__PURE__ */ jsx4("div", { className: "text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider py-1 font-mono", children: w }, i)) }),
        /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-7 gap-1.5 sm:gap-2", children: [
          Array.from({ length: firstWeekday }).map((_, i) => /* @__PURE__ */ jsx4("div", { className: "h-10 sm:h-12 rounded-xl border border-transparent bg-stone-50/30 dark:bg-stone-950/20 opacity-30" }, `offset-${i}`)),
          Array.from({ length: daysInCurrentMonth }).map((_, i) => {
            const dayNum = i + 1;
            const thisDate = new Date(calYear, calMonth, dayNum);
            const key = formatDateKey(thisDate);
            const dayEntries = entriesByDate[key] || [];
            const count = dayEntries.length;
            const isToday = formatDateKey(/* @__PURE__ */ new Date()) === key;
            const isSelected = selectedDayKey === key;
            let bgClasses = "bg-stone-50 hover:bg-stone-100 dark:bg-stone-950/60 dark:hover:bg-stone-800/60 border-stone-200/60 dark:border-stone-850 text-stone-700 dark:text-stone-300";
            if (count === 1) {
              bgClasses = "bg-amber-100/90 hover:bg-amber-200/90 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 border-amber-300/80 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 font-semibold shadow-xs";
            } else if (count === 2) {
              bgClasses = "bg-[#C5A059] hover:bg-[#B58F49] text-white border-[#B58F49] font-bold shadow-xs";
            } else if (count >= 3) {
              bgClasses = "bg-[#8C6D44] hover:bg-[#785C38] text-white border-[#705634] font-extrabold shadow-sm";
            }
            return /* @__PURE__ */ jsxs4(
              "button",
              {
                onClick: () => setSelectedDayDate(thisDate),
                className: `h-11 sm:h-13 rounded-xl sm:rounded-2xl border p-1 sm:p-1.5 flex flex-col justify-between items-center transition-all cursor-pointer relative ${bgClasses} ${isToday ? "ring-2 ring-indigo-500/80 dark:ring-indigo-400" : ""} ${isSelected ? "scale-103 ring-2 ring-amber-500 shadow-md z-10" : ""}`,
                children: [
                  /* @__PURE__ */ jsxs4("div", { className: "w-full flex items-center justify-between text-[11px] sm:text-xs", children: [
                    /* @__PURE__ */ jsx4("span", { className: "font-mono leading-none", children: dayNum }),
                    isToday && /* @__PURE__ */ jsx4("span", { className: "w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 inline-block", title: "Bug\xFCn" })
                  ] }),
                  /* @__PURE__ */ jsx4("div", { className: "w-full flex items-center justify-center gap-0.5", children: count > 0 ? /* @__PURE__ */ jsx4("span", { className: "text-[10px] font-mono leading-none font-bold", children: count > 1 ? `${count}\u2605` : "\u2022" }) : /* @__PURE__ */ jsx4("span", { className: "text-[10px] opacity-20", children: "\u2022" }) })
                ]
              },
              `day-${dayNum}`
            );
          })
        ] }),
        /* @__PURE__ */ jsxs4("div", { className: "pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400 border-t border-stone-200/60 dark:border-stone-800/60", children: [
          /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsx4("span", { className: "text-[11px] font-medium", children: "Yo\u011Funluk:" }),
            /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-1.5 text-[10px] font-mono", children: [
              /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx4("span", { className: "w-3 h-3 rounded-md bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 inline-block" }),
                /* @__PURE__ */ jsx4("span", { children: "0" })
              ] }),
              /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx4("span", { className: "w-3 h-3 rounded-md bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-800 inline-block" }),
                /* @__PURE__ */ jsx4("span", { children: "1" })
              ] }),
              /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx4("span", { className: "w-3 h-3 rounded-md bg-[#C5A059] border border-[#B58F49] inline-block" }),
                /* @__PURE__ */ jsx4("span", { children: "2" })
              ] }),
              /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsx4("span", { className: "w-3 h-3 rounded-md bg-[#8C6D44] border border-[#705634] inline-block" }),
                /* @__PURE__ */ jsx4("span", { children: "3+" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs4("div", { className: "text-[11px] text-stone-500 dark:text-stone-400 font-serif", children: [
            "Bu ay toplam ",
            /* @__PURE__ */ jsxs4("strong", { className: "text-stone-800 dark:text-stone-200 font-bold", children: [
              totalEntriesInMonth,
              " d\xFC\u015F\xFCnce"
            ] }),
            " kaydedildi."
          ] })
        ] }),
        selectedDayDate && /* @__PURE__ */ jsxs4("div", { className: "p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] dark:bg-stone-950/80 border border-amber-200/50 dark:border-stone-800 space-y-3 animate-fadeIn shadow-xs", children: [
          /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between pb-2 border-b border-stone-200/60 dark:border-stone-800/60", children: [
            /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx4(BookOpen3, { className: "w-4 h-4 text-[#A2845E]" }),
              /* @__PURE__ */ jsx4("h4", { className: "font-bold text-stone-800 dark:text-stone-100 text-xs sm:text-sm font-serif", children: selectedDayTitle })
            ] }),
            /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxs4("span", { className: "text-[11px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-[#A2845E] dark:text-amber-300 font-mono font-bold", children: [
                selectedDayEntries.length,
                " Giri\u015F"
              ] }),
              /* @__PURE__ */ jsx4(
                "button",
                {
                  onClick: () => setSelectedDayDate(null),
                  className: "p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors",
                  title: "Kapat",
                  children: /* @__PURE__ */ jsx4(X3, { className: "w-3.5 h-3.5" })
                }
              )
            ] })
          ] }),
          selectedDayEntries.length > 0 ? /* @__PURE__ */ jsx4("div", { className: "space-y-2.5 max-h-60 overflow-y-auto pr-1", children: selectedDayEntries.map((e) => /* @__PURE__ */ jsxs4("div", { className: "p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200/60 dark:border-stone-800/80 space-y-1.5 shadow-2xs", children: [
            /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between text-[11px]", children: [
              /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsx4("span", { className: "text-base", children: MOOD_LABELS[e.mood]?.emoji }),
                /* @__PURE__ */ jsx4("span", { className: "font-semibold text-stone-700 dark:text-stone-300", children: CATEGORY_LABELS[e.category]?.label })
              ] }),
              /* @__PURE__ */ jsx4("span", { className: "text-stone-400 dark:text-stone-500 font-mono text-[10px]", children: new Date(e.createdAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" }) })
            ] }),
            /* @__PURE__ */ jsxs4("p", { className: "text-xs text-stone-800 dark:text-stone-200 font-serif leading-relaxed line-clamp-3", children: [
              '"',
              e.content,
              '"'
            ] })
          ] }, e.id)) }) : /* @__PURE__ */ jsx4("p", { className: "text-xs text-stone-500 dark:text-stone-400 font-serif italic py-1", children: "Bu tarihte hen\xFCz bir d\xFC\u015F\xFCnce kayd\u0131 bulunmuyor. Her g\xFCn bir c\xFCmleyle de olsa kendinize vakit ay\u0131rabilirsiniz." })
        ] })
      ] }),
      calendarViewMode === "year" && /* @__PURE__ */ jsxs4("div", { className: "space-y-4 animate-fadeIn", children: [
        /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs4("span", { className: "font-serif font-bold text-sm text-stone-900 dark:text-stone-100", children: [
            calYear,
            " Y\u0131l\u0131 Genel Yazma Yo\u011Funlu\u011Fu"
          ] }),
          /* @__PURE__ */ jsx4("span", { className: "text-[11px] text-stone-500 dark:text-stone-400 font-mono font-medium", children: "12 Ayl\u0131k Rutin \xD6zeti" })
        ] }),
        /* @__PURE__ */ jsx4("div", { className: "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3", children: Array.from({ length: 12 }).map((_, mIdx) => {
          const monthDate = new Date(calYear, mIdx, 1);
          const monthName = monthDate.toLocaleDateString("tr-TR", { month: "short" });
          const daysInM = new Date(calYear, mIdx + 1, 0).getDate();
          let activeDays = 0;
          let monthEntriesCount = 0;
          for (let d = 1; d <= daysInM; d++) {
            const k = formatDateKey(new Date(calYear, mIdx, d));
            const cnt = entriesByDate[k]?.length || 0;
            if (cnt > 0) activeDays++;
            monthEntriesCount += cnt;
          }
          return /* @__PURE__ */ jsxs4(
            "div",
            {
              onClick: () => {
                setCurrentCalendarDate(new Date(calYear, mIdx, 1));
                setCalendarViewMode("month");
              },
              className: "p-3 bg-stone-50 dark:bg-stone-950/60 rounded-2xl border border-stone-200/60 dark:border-stone-850 hover:border-amber-300 dark:hover:border-amber-800 transition-all cursor-pointer space-y-2 group",
              children: [
                /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between text-xs", children: [
                  /* @__PURE__ */ jsx4("span", { className: "font-bold font-serif text-stone-800 dark:text-stone-200 capitalize group-hover:text-[#A2845E]", children: monthName }),
                  /* @__PURE__ */ jsxs4("span", { className: "text-[10px] font-mono text-stone-400 font-bold", children: [
                    monthEntriesCount,
                    " giri\u015F"
                  ] })
                ] }),
                /* @__PURE__ */ jsx4("div", { className: "grid grid-cols-7 gap-1", children: Array.from({ length: daysInM }).map((_2, dIdx) => {
                  const k = formatDateKey(new Date(calYear, mIdx, dIdx + 1));
                  const cnt = entriesByDate[k]?.length || 0;
                  let dotColor = "bg-stone-200/60 dark:bg-stone-800/60";
                  if (cnt === 1) dotColor = "bg-amber-300 dark:bg-amber-700";
                  else if (cnt === 2) dotColor = "bg-[#C5A059]";
                  else if (cnt >= 3) dotColor = "bg-[#8C6D44]";
                  return /* @__PURE__ */ jsx4(
                    "div",
                    {
                      className: `w-full aspect-square rounded-xs ${dotColor}`,
                      title: `${dIdx + 1} ${monthName}: ${cnt} giri\u015F`
                    },
                    dIdx
                  );
                }) })
              ]
            },
            mIdx
          );
        }) }),
        /* @__PURE__ */ jsx4("p", { className: "text-[11px] text-stone-400 text-center italic", children: "Herhangi bir aya t\u0131klayarak o ay\u0131n detayl\u0131 takvim g\xF6r\xFCn\xFCm\xFCne ge\xE7ebilirsiniz." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs4("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxs4("div", { className: "bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-800 p-6 rounded-[32px] space-y-4 shadow-sm", id: "stats-categories-card", children: [
        /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx4(Activity, { className: "w-5 h-5 text-[#A2845E]" }),
          /* @__PURE__ */ jsx4("h3", { className: "font-semibold text-slate-800 dark:text-white text-base", children: "Yaz\u0131lan Konu Da\u011F\u0131l\u0131m\u0131" })
        ] }),
        /* @__PURE__ */ jsx4("div", { className: "space-y-3.5 pt-2", children: Object.keys(CATEGORY_LABELS).map((catName) => {
          const cat = catName;
          const count = categoryCounts[cat] || 0;
          const percentage = Math.round(count / totalEntries * 100);
          const { label, color } = CATEGORY_LABELS[cat];
          return /* @__PURE__ */ jsxs4("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between text-xs", children: [
              /* @__PURE__ */ jsx4("span", { className: "font-bold text-slate-700 dark:text-slate-300 font-serif", children: label }),
              /* @__PURE__ */ jsxs4("span", { className: "text-slate-500 dark:text-slate-400 font-mono font-bold text-[11px]", children: [
                count,
                " Adet (",
                percentage,
                "%)"
              ] })
            ] }),
            /* @__PURE__ */ jsx4("div", { className: "h-2 w-full bg-slate-100 dark:bg-stone-950 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx4(
              "div",
              {
                className: `h-full rounded-full transition-all duration-500 ${color.replace("text-", "bg-")}`,
                style: { width: `${percentage}%` }
              }
            ) })
          ] }, cat);
        }) })
      ] }),
      /* @__PURE__ */ jsxs4("div", { className: "bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-800 p-6 rounded-[32px] space-y-4 shadow-sm", id: "stats-moods-card", children: [
        /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx4(Heart3, { className: "w-5 h-5 text-[#A2845E]" }),
          /* @__PURE__ */ jsx4("h3", { className: "font-semibold text-slate-800 dark:text-white text-base", children: "Duygular\u0131n \u0130klimi" })
        ] }),
        dominantMood && MOOD_LABELS[dominantMood] ? /* @__PURE__ */ jsxs4("div", { className: "bg-[#FFF9E5] dark:bg-[#3E3326]/40 border border-[#FFD60A]/35 p-3.5 rounded-2xl flex items-center gap-3", children: [
          /* @__PURE__ */ jsx4("span", { className: "text-3xl", children: MOOD_LABELS[dominantMood].emoji }),
          /* @__PURE__ */ jsxs4("div", { children: [
            /* @__PURE__ */ jsx4("div", { className: "text-[10px] uppercase font-extrabold tracking-wider text-[#A2845E] dark:text-[#FFF9E5]", children: "Bask\u0131n Ruh Hali" }),
            /* @__PURE__ */ jsx4("div", { className: `text-sm font-bold ${MOOD_LABELS[dominantMood].color}`, children: MOOD_LABELS[dominantMood].label })
          ] })
        ] }) : /* @__PURE__ */ jsx4("div", { className: "text-xs text-slate-400 dark:text-slate-500 leading-snug italic py-1 font-serif", children: "Ruh hali e\u011Filimlerinizi g\xF6rmek i\xE7in d\xFC\u015F\xFCncelerinizi eklemeye devam ediniz." }),
        /* @__PURE__ */ jsx4("div", { className: "grid grid-cols-1 gap-1.5 pt-1 font-serif max-h-72 overflow-y-auto pr-1", children: Object.keys(MOOD_LABELS).map((mKey) => {
          const mood = mKey;
          const count = moodCounts[mood] || 0;
          const moodInfo = MOOD_LABELS[mood];
          if (!moodInfo) return null;
          const { label, emoji, color } = moodInfo;
          const ratio = entries.length > 0 ? count / entries.length : 0;
          return /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between text-xs p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-stone-950 transition-colors", children: [
            /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx4("span", { className: "text-base", children: emoji }),
              /* @__PURE__ */ jsx4("span", { className: "font-medium text-slate-700 dark:text-slate-300", children: label })
            ] }),
            /* @__PURE__ */ jsxs4("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsx4("div", { className: "w-16 h-1.5 bg-slate-100 dark:bg-stone-950 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx4(
                "div",
                {
                  className: `h-full rounded-full ${color.replace("text-", "bg-")}`,
                  style: { width: `${ratio * 100}%` }
                }
              ) }),
              /* @__PURE__ */ jsx4("span", { className: "text-[#A2845E] font-mono font-bold w-5 text-right", children: count })
            ] })
          ] }, mood);
        }) })
      ] })
    ] })
  ] });
}

// src/components/AppBrandIcon.tsx
import { jsx as jsx5 } from "react/jsx-runtime";
function AppBrandIcon({ size = "md", className = "", withShadow = true }) {
  const sizeMap = {
    sm: "w-7 h-7 rounded-lg",
    md: "w-10 h-10 rounded-2xl",
    lg: "w-16 h-16 rounded-[22px]",
    xl: "w-24 h-24 rounded-[30px]"
  };
  return /* @__PURE__ */ jsx5(
    "div",
    {
      className: `relative inline-flex items-center justify-center shrink-0 overflow-hidden select-none transition-transform duration-200 active:scale-95 ${sizeMap[size]} ${withShadow ? "shadow-md shadow-stone-900/15 dark:shadow-black/40" : ""} ${className}`,
      children: /* @__PURE__ */ jsx5(
        "img",
        {
          src: "/icon.svg",
          alt: "D\xFC\u015F\xFCnce Defteri \u0130konu",
          className: "w-full h-full object-cover rounded-inherit pointer-events-none",
          loading: "eager"
        }
      )
    }
  );
}

// src/App.tsx
import {
  BookOpen as BookOpen4,
  Sparkles as Sparkles5,
  Brain as Brain3,
  BarChart2,
  RefreshCw as RefreshCw3,
  Sun,
  Moon,
  Calendar as Calendar2,
  Cloud,
  CloudOff,
  Share,
  Download,
  Upload,
  FileText,
  ArrowRightLeft,
  Plus,
  KeyRound as KeyRound2,
  Check as Check4,
  CheckCircle2 as CheckCircle24,
  AlertCircle as AlertCircle3
} from "lucide-react";
import { collection, query, where, onSnapshot, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";

// src/firebase.ts
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// firebase-applet-config.json
var firebase_applet_config_default = {
  projectId: "melodic-curve-5wh20",
  appId: "1:910119657737:web:c86f1152845575c55cf3d8",
  apiKey: "AIzaSyAfeyh0RPA2r8TiuvxkI59hQNTL9IKOfQg",
  authDomain: "melodic-curve-5wh20.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-2f6e6073-86a9-4cb7-b256-71fbf34b43fa",
  storageBucket: "melodic-curve-5wh20.firebasestorage.app",
  messagingSenderId: "910119657737",
  measurementId: "",
  oAuthClientId: "910119657737-uf20pr65o2ei54sfc1t0o2hji75rs8g6.apps.googleusercontent.com",
  recaptchaSiteKey: ""
};

// src/firebase.ts
var app = null;
var firestoreDb = null;
try {
  if (getApps().length === 0) {
    app = initializeApp(firebase_applet_config_default);
  } else {
    app = getApps()[0];
  }
} catch (e) {
  console.warn("Firebase App ba\u015Flat\u0131lamad\u0131, yerel mod aktif:", e);
}
try {
  if (app) {
    try {
      if (firebase_applet_config_default.firestoreDatabaseId && firebase_applet_config_default.firestoreDatabaseId !== "(default)") {
        firestoreDb = getFirestore(app, firebase_applet_config_default.firestoreDatabaseId);
      } else {
        firestoreDb = getFirestore(app);
      }
    } catch {
      firestoreDb = getFirestore(app);
    }
  }
} catch (e) {
  console.warn("Firestore servisi ba\u015Flat\u0131lamad\u0131, yerel haf\u0131za (localStorage) aktif:", e);
}
var db = firestoreDb;

// src/App.tsx
import { jsx as jsx6, jsxs as jsxs5 } from "react/jsx-runtime";
function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: []
    },
    operationType,
    path
  };
  console.warn("Firestore Error:", JSON.stringify(errInfo));
}
function App() {
  const [entries, setEntries] = useState5([]);
  const [activeTab, setActiveTab] = useState5("timeline");
  const [darkMode, setDarkMode] = useState5(false);
  const [quoteData, setQuoteData] = useState5(null);
  const [loadingQuote, setLoadingQuote] = useState5(false);
  const [syncActive, setSyncActive] = useState5(() => localStorage.getItem("thought_defteri_sync_active") === "true");
  const [syncCode, setSyncCode] = useState5(() => localStorage.getItem("thought_defteri_sync_code") || "");
  const [isSyncDialogOpen, setIsSyncDialogOpen] = useState5(false);
  const [inputSyncCode, setInputSyncCode] = useState5("");
  const [syncLoading, setSyncLoading] = useState5(false);
  const [syncMessage, setSyncMessage] = useState5(null);
  const [syncError, setSyncError] = useState5(null);
  const [isBatchTextOpen, setIsBatchTextOpen] = useState5(false);
  const [batchTextInput, setBatchTextInput] = useState5("");
  const [importSuccessMsg, setImportSuccessMsg] = useState5(null);
  const [isIOS, setIsIOS] = useState5(false);
  const [isStandalone, setIsStandalone] = useState5(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState5(false);
  const [isInstallDialogOpen, setIsInstallDialogOpen] = useState5(false);
  const [isAiDialogOpen, setIsAiDialogOpen] = useState5(false);
  const [geminiApiKeyInput, setGeminiApiKeyInput] = useState5(() => getStoredGeminiKey());
  const [aiTestResult, setAiTestResult] = useState5(null);
  const [aiTesting, setAiTesting] = useState5(false);
  const [aiSavedNotice, setAiSavedNotice] = useState5(false);
  useEffect3(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(ios);
    const standalone = window.navigator.standalone || window.matchMedia("(display-mode: standalone)").matches;
    setIsStandalone(standalone);
    const dismissed = sessionStorage.getItem("thought_defteri_ios_prompt_dismissed") === "true";
    if (ios && !standalone && !dismissed) {
      setShowIOSPrompt(true);
    }
  }, []);
  useEffect3(() => {
    const cachedTheme = localStorage.getItem("thought_defteri_theme");
    if (cachedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
      updateThemeColor(true);
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
      updateThemeColor(false);
    }
    const cachedEntries = localStorage.getItem("thought_defteri_entries");
    let unsubscribe = null;
    if (syncActive && syncCode && db) {
      setSyncLoading(true);
      try {
        const q = query(
          collection(db, "entries"),
          where("syncCode", "==", syncCode)
        );
        unsubscribe = onSnapshot(q, (snapshot) => {
          const firestoreEntries = [];
          snapshot.forEach((doc2) => {
            const data = doc2.data();
            firestoreEntries.push({
              id: doc2.id,
              content: data.content,
              category: data.category,
              mood: data.mood,
              createdAt: data.createdAt,
              isBookmarked: data.isBookmarked || false
            });
          });
          firestoreEntries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          setEntries(firestoreEntries);
          localStorage.setItem("thought_defteri_entries", JSON.stringify(firestoreEntries));
          setSyncLoading(false);
        }, (error) => {
          console.error("Firestore real-time sync subscription error:", error);
          setSyncError("Bulut sunucusu senkronizasyon hatas\u0131.");
          setSyncLoading(false);
          handleFirestoreError(error, "list" /* LIST */, "entries");
        });
      } catch (err) {
        console.error("Firestore onSnapshot error:", err);
        setSyncError(err.message);
        setSyncLoading(false);
        handleFirestoreError(err, "list" /* LIST */, "entries");
      }
    } else {
      const cachedEntries2 = localStorage.getItem("thought_defteri_entries");
      if (cachedEntries2) {
        try {
          setEntries(JSON.parse(cachedEntries2));
        } catch (e) {
          setEntries(INITIAL_THOUGHTS);
        }
      } else {
        setEntries(INITIAL_THOUGHTS);
        localStorage.setItem("thought_defteri_entries", JSON.stringify(INITIAL_THOUGHTS));
      }
    }
    const cachedQuote = localStorage.getItem("thought_defteri_quote");
    const cachedQuoteTime = localStorage.getItem("thought_defteri_quote_timestamp");
    const isStale = !cachedQuoteTime || Date.now() - parseInt(cachedQuoteTime) > 12 * 36e5;
    if (cachedQuote && !isStale) {
      try {
        setQuoteData(JSON.parse(cachedQuote));
      } catch (e) {
        fetchNewQuote();
      }
    } else {
      fetchNewQuote();
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [syncActive, syncCode]);
  const fetchNewQuote = async () => {
    setLoadingQuote(true);
    try {
      const data = await aiService.getDailyQuoteAndPrompt();
      setQuoteData(data);
      localStorage.setItem("thought_defteri_quote", JSON.stringify(data));
      localStorage.setItem("thought_defteri_quote_timestamp", Date.now().toString());
    } catch (e) {
      setQuoteData({
        quote: "Kendinizi dinlemek, hayat\u0131n g\xFCr\xFClt\xFCs\xFC i\xE7inde duyabilece\u011Finiz en g\xFCzel f\u0131s\u0131lt\u0131d\u0131r.",
        author: "Fark\u0131ndal\u0131k Bilgeli\u011Fi",
        journalPrompt: "Bug\xFCn zihninizin arka plan\u0131nda en \xE7ok hangi d\xFC\u015F\xFCnce veya kayg\u0131n\u0131n yank\u0131land\u0131\u011F\u0131n\u0131 fark ediyorsunuz?"
      });
    } finally {
      setLoadingQuote(false);
    }
  };
  const updateThemeColor = (isDark) => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", isDark ? "#0c0a09" : "#FDFBF7");
    }
  };
  const handleToggleTheme = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    updateThemeColor(nextMode);
    if (nextMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("thought_defteri_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("thought_defteri_theme", "light");
    }
  };
  const enableSyncWithNewCode = async () => {
    setSyncLoading(true);
    setSyncError(null);
    setSyncMessage(null);
    try {
      const newCode = "DF-" + Math.floor(1e5 + Math.random() * 9e5);
      for (const entry of entries) {
        try {
          await setDoc(doc(db, "entries", entry.id), {
            ...entry,
            syncCode: newCode
          });
        } catch (dbErr) {
          handleFirestoreError(dbErr, "write" /* WRITE */, `entries/${entry.id}`);
        }
      }
      localStorage.setItem("thought_defteri_sync_code", newCode);
      localStorage.setItem("thought_defteri_sync_active", "true");
      setSyncCode(newCode);
      setSyncActive(true);
      setSyncMessage(`Yeni bulut e\u015Fitleme kodunuz olu\u015Fturuldu: ${newCode}. Bu kodu di\u011Fer cihazlar\u0131n\u0131za girerek senkronize kalabilirsiniz!`);
    } catch (err) {
      console.error("Create Cloud Code Error:", err);
      setSyncError("Yeni e\u015Fitleme kodu olu\u015Fturulurken bir hata olu\u015Ftu: " + err.message);
    } finally {
      setSyncLoading(false);
    }
  };
  const enableSyncWithExistingCode = async (enteredCode) => {
    const trimmed = enteredCode.trim().toUpperCase();
    if (!trimmed) return;
    setSyncLoading(true);
    setSyncError(null);
    setSyncMessage(null);
    try {
      const q = query(
        collection(db, "entries"),
        where("syncCode", "==", trimmed)
      );
      let querySnapshot;
      try {
        querySnapshot = await getDocs(q);
      } catch (dbErr) {
        handleFirestoreError(dbErr, "list" /* LIST */, "entries");
        return;
      }
      const fetchedEntries = [];
      querySnapshot.forEach((doc2) => {
        const data = doc2.data();
        fetchedEntries.push({
          id: doc2.id,
          content: data.content,
          category: data.category,
          mood: data.mood,
          createdAt: data.createdAt,
          isBookmarked: data.isBookmarked || false
        });
      });
      fetchedEntries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      const existingIds = new Set(fetchedEntries.map((e) => e.id));
      const localOnly = entries.filter((e) => !existingIds.has(e.id));
      if (localOnly.length > 0) {
        for (const entry of localOnly) {
          try {
            await setDoc(doc(db, "entries", entry.id), {
              ...entry,
              syncCode: trimmed
            });
          } catch (dbErr) {
            handleFirestoreError(dbErr, "write" /* WRITE */, `entries/${entry.id}`);
          }
          fetchedEntries.unshift(entry);
        }
        fetchedEntries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }
      setEntries(fetchedEntries);
      localStorage.setItem("thought_defteri_entries", JSON.stringify(fetchedEntries));
      localStorage.setItem("thought_defteri_sync_code", trimmed);
      localStorage.setItem("thought_defteri_sync_active", "true");
      setSyncCode(trimmed);
      setSyncActive(true);
      setSyncMessage("Bulut senkronizasyonu ba\u015Far\u0131yla etkinle\u015Ftirildi! T\xFCm verileriniz birle\u015Ftirildi ve e\u015Fitlendi.");
      setIsSyncDialogOpen(false);
    } catch (err) {
      console.error("Connect Cloud Sync Error:", err);
      setSyncError("Bulut sunucusuna ba\u011Flan\u0131rken hata olu\u015Ftu: " + err.message);
    } finally {
      setSyncLoading(false);
    }
  };
  const disableSync = () => {
    localStorage.removeItem("thought_defteri_sync_active");
    setSyncActive(false);
    setSyncMessage("Senkronizasyon devre d\u0131\u015F\u0131 b\u0131rak\u0131ld\u0131. Yaz\u0131lar\u0131n\u0131z yerel olarak kalmaya devam edecek.");
  };
  const handleExportJSON = () => {
    const backup = {
      appName: "D\xFC\u015F\xFCnce Defteri",
      version: "2.0",
      exportDate: (/* @__PURE__ */ new Date()).toISOString(),
      entriesCount: entries.length,
      entries
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dusunce-defteri-yedek-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link);
    setImportSuccessMsg(`T\xFCm d\xFC\u015F\xFCnceleriniz (${entries.length} not) JSON dosyas\u0131 olarak indirildi!`);
    setTimeout(() => setImportSuccessMsg(null), 4e3);
  };
  const handleImportJSON = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result);
        let importedList = [];
        if (Array.isArray(parsed)) {
          importedList = parsed;
        } else if (parsed && Array.isArray(parsed.entries)) {
          importedList = parsed.entries;
        } else {
          throw new Error("Ge\xE7erli bir D\xFC\u015F\xFCnce Defteri yedek format\u0131 bulunamad\u0131.");
        }
        const validEntries = importedList.map((item, idx) => ({
          id: item.id || `thought-import-${Date.now()}-${idx}`,
          content: String(item.content || ""),
          category: item.category || "felsefe",
          mood: item.mood || "d\xFC\u015F\xFCnceli",
          createdAt: item.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
          isBookmarked: Boolean(item.isBookmarked)
        })).filter((item) => item.content.trim().length > 0);
        if (validEntries.length === 0) {
          throw new Error("Dosyada ge\xE7erli not bulunamad\u0131.");
        }
        const existingMap = new Map(entries.map((ent) => [ent.id, ent]));
        validEntries.forEach((entry) => {
          existingMap.set(entry.id, entry);
        });
        const merged = Array.from(existingMap.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setEntries(merged);
        localStorage.setItem("thought_defteri_entries", JSON.stringify(merged));
        if (syncActive && syncCode && db) {
          for (const entry of validEntries) {
            try {
              await setDoc(doc(db, "entries", entry.id), { ...entry, syncCode });
            } catch (err) {
              console.warn("Firestore sync during import:", err);
            }
          }
        }
        setImportSuccessMsg(`Tebrikler! ${validEntries.length} adet d\xFC\u015F\xFCnce notu ba\u015Far\u0131yla y\xFCklendi ve birle\u015Ftirildi.`);
        setTimeout(() => setImportSuccessMsg(null), 5e3);
      } catch (err) {
        setSyncError("Yedek dosyas\u0131 okunurken hata: " + (err.message || "Bilinmeyen hata"));
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };
  const handleBatchTextImport = async () => {
    if (!batchTextInput.trim()) return;
    const items = batchTextInput.split(/\n\s*---\s*\n|\n{2,}/).map((t) => t.trim()).filter((t) => t.length > 0);
    if (items.length === 0) return;
    const newEntries = items.map((text, idx) => ({
      id: `thought-paste-${Date.now()}-${idx}`,
      content: text,
      category: "g\xFCnl\xFCk",
      mood: "d\xFC\u015F\xFCnceli",
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      isBookmarked: false
    }));
    const updated = [...newEntries, ...entries];
    setEntries(updated);
    localStorage.setItem("thought_defteri_entries", JSON.stringify(updated));
    if (syncActive && syncCode && db) {
      for (const entry of newEntries) {
        try {
          await setDoc(doc(db, "entries", entry.id), { ...entry, syncCode });
        } catch (err) {
          console.warn("Firestore upload during batch paste:", err);
        }
      }
    }
    setBatchTextInput("");
    setIsBatchTextOpen(false);
    setImportSuccessMsg(`${newEntries.length} adet yeni not ba\u015Far\u0131yla defterinize eklendi!`);
    setTimeout(() => setImportSuccessMsg(null), 4e3);
  };
  const handleAddEntry = async (content, category, mood) => {
    const rawId = `thought-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newEntry = {
      id: rawId,
      content,
      category,
      mood,
      createdAt: (/* @__PURE__ */ new Date()).toISOString(),
      isBookmarked: false
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("thought_defteri_entries", JSON.stringify(updated));
    if (syncActive && syncCode && db) {
      try {
        await setDoc(doc(db, "entries", rawId), {
          ...newEntry,
          syncCode
        });
      } catch (err) {
        console.error("Error setting doc in Firestore:", err);
        setSyncError("Yaz\u0131 buluta kaydedilemedi. \u0130nternet ba\u011Flant\u0131n\u0131z\u0131 kontrol ediniz.");
        handleFirestoreError(err, "write" /* WRITE */, `entries/${rawId}`);
      }
    }
  };
  const handleEditEntry = async (id, content, category, mood) => {
    let updatedEntry;
    const updated = entries.map((e) => {
      if (e.id === id) {
        const next = { ...e, content, category, mood };
        updatedEntry = next;
        return next;
      }
      return e;
    });
    setEntries(updated);
    localStorage.setItem("thought_defteri_entries", JSON.stringify(updated));
    if (syncActive && syncCode && db && updatedEntry) {
      try {
        await setDoc(doc(db, "entries", id), {
          ...updatedEntry,
          syncCode
        });
      } catch (err) {
        console.error("Error updating entry on Firestore:", err);
        setSyncError("Yaz\u0131 g\xFCncellemesi buluta iletilemedi.");
        handleFirestoreError(err, "write" /* WRITE */, `entries/${id}`);
      }
    }
  };
  const handleDeleteEntry = async (id) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem("thought_defteri_entries", JSON.stringify(updated));
    if (syncActive && syncCode && db) {
      try {
        await deleteDoc(doc(db, "entries", id));
      } catch (err) {
        console.error("Error deleting doc from Firestore:", err);
        setSyncError("Yaz\u0131 buluttan silinemedi.");
        handleFirestoreError(err, "delete" /* DELETE */, `entries/${id}`);
      }
    }
  };
  const handleToggleBookmark = async (id) => {
    let targetEntry;
    const updated = entries.map((e) => {
      if (e.id === id) {
        const nextState = { ...e, isBookmarked: !e.isBookmarked };
        targetEntry = nextState;
        return nextState;
      }
      return e;
    });
    setEntries(updated);
    localStorage.setItem("thought_defteri_entries", JSON.stringify(updated));
    if (syncActive && syncCode && db && targetEntry) {
      try {
        await setDoc(doc(db, "entries", id), {
          ...targetEntry,
          syncCode
        });
      } catch (err) {
        console.error("Error updating bookmark status on Firestore:", err);
        setSyncError("Favori g\xFCncellemesi buluta iletilemedi.");
        handleFirestoreError(err, "write" /* WRITE */, `entries/${id}`);
      }
    }
  };
  const getTurkishDate = () => {
    return (/* @__PURE__ */ new Date()).toLocaleDateString("tr", {
      weekday: "long",
      day: "numeric",
      month: "long"
    });
  };
  return /* @__PURE__ */ jsxs5("div", { className: `min-h-screen bg-[#FDFBF7] dark:bg-stone-950 font-sans transition-colors duration-200 pb-20`, children: [
    /* @__PURE__ */ jsx6("header", { className: "sticky top-0 z-30 w-full ios-glass border-b border-stone-200/60 dark:border-stone-850/70 shadow-xs transition-colors safe-top-padding pb-3.5", children: /* @__PURE__ */ jsxs5("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 flex items-center justify-between w-full", children: [
      /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-2.5 sm:gap-3", children: [
        /* @__PURE__ */ jsx6(AppBrandIcon, { size: "md" }),
        /* @__PURE__ */ jsxs5("div", { children: [
          /* @__PURE__ */ jsx6("h1", { className: "font-display font-bold text-base sm:text-lg text-stone-800 dark:text-stone-100 leading-tight", children: "D\xFC\u015F\xFCnce Defteri" }),
          /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-1 text-[11px] text-stone-400 dark:text-stone-500 font-medium", children: [
            /* @__PURE__ */ jsx6(Calendar2, { className: "w-3.5 h-3.5" }),
            /* @__PURE__ */ jsx6("span", { children: getTurkishDate() })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-1.5 sm:gap-2", children: [
        !isStandalone && /* @__PURE__ */ jsxs5(
          "button",
          {
            onClick: () => setIsInstallDialogOpen(true),
            className: "p-2 sm:p-2.5 rounded-xl border border-[#A2845E]/20 bg-[#FDFBF7] dark:border-stone-800 dark:bg-stone-900/60 text-[#A2845E] dark:text-stone-300 hover:bg-[#EADEC9]/30 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs",
            title: "iOS / Mobil Uygulama Olarak Y\xFCkle",
            children: [
              /* @__PURE__ */ jsx6(Download, { className: "w-4 h-4" }),
              /* @__PURE__ */ jsx6("span", { className: "text-xs font-semibold hidden md:inline", children: "Uygulamay\u0131 Y\xFCkle" })
            ]
          }
        ),
        /* @__PURE__ */ jsxs5(
          "button",
          {
            onClick: () => setIsSyncDialogOpen(true),
            className: `p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${syncActive ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:border-emerald-700/50 dark:bg-emerald-950/30 dark:text-emerald-400" : "border-stone-200/70 dark:border-stone-800/80 bg-white/60 dark:bg-stone-900/60 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"}`,
            title: "Bulut Senkronizasyonu (Cloud Sync)",
            children: [
              syncActive ? /* @__PURE__ */ jsx6(Cloud, { className: "w-4 h-4 text-emerald-500 animate-pulse" }) : /* @__PURE__ */ jsx6(CloudOff, { className: "w-4 h-4" }),
              syncActive && /* @__PURE__ */ jsx6("span", { className: "text-[10px] font-bold font-mono tracking-wider hidden sm:inline", children: syncCode })
            ]
          }
        ),
        /* @__PURE__ */ jsxs5(
          "button",
          {
            onClick: () => {
              setAiTestResult(null);
              setAiSavedNotice(false);
              setIsAiDialogOpen(true);
            },
            className: "p-2 sm:p-2.5 rounded-xl border border-amber-300/60 bg-amber-50/60 dark:border-amber-900/60 dark:bg-amber-950/30 text-[#A2845E] dark:text-amber-300 hover:bg-amber-100/60 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs",
            title: "Yapay Zeka (AI) Ayarlar\u0131",
            children: [
              /* @__PURE__ */ jsx6(Sparkles5, { className: "w-4 h-4 text-amber-500 animate-pulse" }),
              /* @__PURE__ */ jsx6("span", { className: "text-xs font-semibold hidden md:inline", children: "AI Ayarlar\u0131" })
            ]
          }
        ),
        /* @__PURE__ */ jsx6(
          "button",
          {
            onClick: fetchNewQuote,
            disabled: loadingQuote,
            className: "p-2 sm:p-2.5 rounded-xl border border-stone-200/70 dark:border-stone-800/80 bg-white/60 dark:bg-stone-900/60 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer",
            title: "S\xF6z\xFC ve yazma ilham\u0131n\u0131 yenile",
            children: /* @__PURE__ */ jsx6(RefreshCw3, { className: `w-4 h-4 ${loadingQuote ? "animate-spin text-amber-600" : ""}` })
          }
        ),
        /* @__PURE__ */ jsx6(
          "button",
          {
            onClick: handleToggleTheme,
            className: "p-2 sm:p-2.5 rounded-xl border border-stone-200/70 dark:border-stone-800/80 bg-white/60 dark:bg-stone-900/60 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer",
            title: darkMode ? "A\xE7\u0131k Tema" : "Koyu Tema",
            children: darkMode ? /* @__PURE__ */ jsx6(Sun, { className: "w-4 h-4 text-amber-500" }) : /* @__PURE__ */ jsx6(Moon, { className: "w-4 h-4 text-stone-500" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs5("main", { className: "max-w-2xl mx-auto px-4 md:px-6 pt-5", children: [
      quoteData && activeTab === "timeline" && /* @__PURE__ */ jsxs5("div", { className: "bg-[#A2845E] dark:bg-[#3E3326] text-white p-8 rounded-[32px] mb-6 shadow-xl shadow-[#A2845E]/10 relative overflow-hidden transition-all", id: "daily-quote-card", children: [
        /* @__PURE__ */ jsx6("div", { className: "absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" }),
        /* @__PURE__ */ jsx6("div", { className: "absolute -top-12 -left-12 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" }),
        /* @__PURE__ */ jsxs5("div", { className: "relative z-10 space-y-4", children: [
          /* @__PURE__ */ jsx6("span", { className: "px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block select-none", children: "G\xFCn\xFCn \u0130lham\u0131" }),
          /* @__PURE__ */ jsxs5("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxs5("blockquote", { className: "text-2xl md:text-3xl leading-snug font-serif italic font-medium", children: [
              '"',
              quoteData.quote,
              '"'
            ] }),
            /* @__PURE__ */ jsxs5("div", { className: "text-xs font-semibold text-white/80 tracking-wide font-mono", children: [
              "\u2014 ",
              quoteData.author
            ] }),
            /* @__PURE__ */ jsxs5("div", { className: "mt-6 pt-5 border-t border-white/20 text-xs text-white flex flex-col sm:flex-row sm:items-center gap-1.5 leading-relaxed bg-white/5 px-4 py-3 rounded-2xl", children: [
              /* @__PURE__ */ jsxs5("span", { className: "font-extrabold select-none text-[#FFF9E5] flex items-center gap-1", children: [
                /* @__PURE__ */ jsx6(Sparkles5, { className: "w-3.5 h-3.5" }),
                " Yazma Y\xF6nergesi:"
              ] }),
              /* @__PURE__ */ jsx6("span", { className: "font-medium opacity-90", children: quoteData.journalPrompt })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "min-h-120 animate-fadeIn", children: [
        activeTab === "timeline" && /* @__PURE__ */ jsx6(
          DailyStream,
          {
            entries,
            onAddEntry: handleAddEntry,
            onEditEntry: handleEditEntry,
            onDeleteEntry: handleDeleteEntry,
            onToggleBookmark: handleToggleBookmark
          }
        ),
        activeTab === "inspiration" && /* @__PURE__ */ jsx6(Inspiration, { onAddEntry: handleAddEntry }),
        activeTab === "insights" && /* @__PURE__ */ jsx6(
          AIInsights,
          {
            entries,
            onAddEntry: handleAddEntry
          }
        ),
        activeTab === "stats" && /* @__PURE__ */ jsx6(StatsDashboard, { entries })
      ] }, activeTab)
    ] }),
    /* @__PURE__ */ jsxs5("footer", { className: "fixed bottom-0 left-0 right-0 z-40 ios-glass border-t border-stone-200/60 dark:border-stone-850/70 px-2 pt-2 safe-bottom-padding shadow-2xl flex justify-around max-w-2xl mx-auto rounded-t-2xl sm:rounded-none", children: [
      /* @__PURE__ */ jsxs5(
        "button",
        {
          onClick: () => setActiveTab("timeline"),
          className: `flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl flex-1 transition-all ${activeTab === "timeline" ? "text-[#A2845E] dark:text-[#EADEC9] scale-102 font-bold" : "text-stone-400 dark:text-stone-500 font-medium hover:text-stone-600"}`,
          children: [
            /* @__PURE__ */ jsx6(BookOpen4, { className: "w-5 h-5 mb-1" }),
            /* @__PURE__ */ jsx6("span", { className: "text-[10px] tracking-wide select-none", children: "Defterim" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs5(
        "button",
        {
          onClick: () => setActiveTab("inspiration"),
          className: `flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl flex-1 transition-all ${activeTab === "inspiration" ? "text-[#A2845E] dark:text-[#EADEC9] scale-102 font-bold" : "text-stone-400 dark:text-stone-500 font-medium hover:text-stone-600"}`,
          children: [
            /* @__PURE__ */ jsx6(Sparkles5, { className: "w-5 h-5 mb-1 animate-pulse" }),
            /* @__PURE__ */ jsx6("span", { className: "text-[10px] tracking-wide select-none", children: "\u0130lham & Pratik" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs5(
        "button",
        {
          onClick: () => setActiveTab("insights"),
          className: `flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl flex-1 transition-all ${activeTab === "insights" ? "text-[#A2845E] dark:text-[#EADEC9] scale-102 font-bold" : "text-stone-400 dark:text-stone-500 font-medium hover:text-stone-600"}`,
          children: [
            /* @__PURE__ */ jsx6(Brain3, { className: "w-5 h-5 mb-1" }),
            /* @__PURE__ */ jsx6("span", { className: "text-[10px] tracking-wide select-none", children: "Zihinsel Ayna" })
          ]
        }
      ),
      /* @__PURE__ */ jsxs5(
        "button",
        {
          onClick: () => setActiveTab("stats"),
          className: `flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl flex-1 transition-all ${activeTab === "stats" ? "text-[#A2845E] dark:text-[#EADEC9] scale-102 font-bold" : "text-stone-400 dark:text-stone-500 font-medium hover:text-stone-600"}`,
          children: [
            /* @__PURE__ */ jsx6(BarChart2, { className: "w-5 h-5 mb-1" }),
            /* @__PURE__ */ jsx6("span", { className: "text-[10px] tracking-wide select-none", children: "Geli\u015Fim" })
          ]
        }
      )
    ] }),
    isSyncDialogOpen && /* @__PURE__ */ jsx6("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn", children: /* @__PURE__ */ jsxs5("div", { className: "bg-white dark:bg-stone-900 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 p-6 max-w-md w-full space-y-5 shadow-2xl relative", children: [
      /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-stone-800/40", children: [
        /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx6(Cloud, { className: "w-5 h-5 text-[#A2845E]" }),
          /* @__PURE__ */ jsx6("h3", { className: "font-bold text-slate-850 dark:text-white text-base font-serif", children: "Bulut Senkronizasyonu" })
        ] }),
        /* @__PURE__ */ jsx6(
          "button",
          {
            onClick: () => {
              setIsSyncDialogOpen(false);
              setSyncError(null);
              setSyncMessage(null);
            },
            className: "text-slate-400 hover:text-slate-600 dark:hover:text-white text-sm font-bold bg-[#F2F2F7] dark:bg-stone-850 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer",
            children: "\u2715"
          }
        )
      ] }),
      syncError && /* @__PURE__ */ jsxs5("div", { className: "p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950 rounded-2xl text-xs text-rose-600 dark:text-rose-400 leading-relaxed font-semibold", children: [
        "Hata: ",
        syncError
      ] }),
      syncMessage && /* @__PURE__ */ jsx6("div", { className: "p-3.5 bg-[#FFF9E5] dark:bg-[#3E3326]/40 border border-[#FFD60A]/35 rounded-2xl text-xs text-[#A2845E] dark:text-[#FFF9E5] leading-relaxed font-bold animate-fadeIn", children: syncMessage }),
      importSuccessMsg && /* @__PURE__ */ jsxs5("div", { className: "p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed font-bold animate-fadeIn flex items-center gap-2", children: [
        /* @__PURE__ */ jsx6(CheckCircle24, { className: "w-4 h-4 shrink-0" }),
        /* @__PURE__ */ jsx6("span", { children: importSuccessMsg })
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "space-y-4 font-sans text-slate-600 dark:text-stone-300", children: [
        /* @__PURE__ */ jsxs5("div", { className: "p-4 bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-2xl space-y-3", children: [
          /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs5("span", { className: "text-xs font-bold text-stone-800 dark:text-stone-200 font-serif flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx6(ArrowRightLeft, { className: "w-4 h-4 text-[#A2845E]" }),
              /* @__PURE__ */ jsx6("span", { children: "H\u0131zl\u0131 Veri Aktar\u0131m\u0131 & Yedekleme" })
            ] }),
            /* @__PURE__ */ jsxs5("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-white dark:bg-stone-900 font-mono text-stone-500 border border-stone-200/50", children: [
              entries.length,
              " Not Kay\u0131tl\u0131"
            ] })
          ] }),
          /* @__PURE__ */ jsx6("p", { className: "text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed font-serif", children: "D\xFC\u015F\xFCncelerinizi ba\u015Fka bir cihaza, telefona veya taray\u0131c\u0131ya ta\u015F\u0131mak i\xE7in tek t\u0131kla yede\u011Finizi indirin ya da y\xFCkleyin:" }),
          /* @__PURE__ */ jsxs5("div", { className: "grid grid-cols-2 gap-2 pt-1", children: [
            /* @__PURE__ */ jsxs5(
              "button",
              {
                onClick: handleExportJSON,
                className: "flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#A2845E] dark:hover:border-amber-500 rounded-xl text-xs font-bold text-stone-700 dark:text-stone-200 transition-all shadow-xs cursor-pointer",
                children: [
                  /* @__PURE__ */ jsx6(Download, { className: "w-3.5 h-3.5 text-[#A2845E]" }),
                  /* @__PURE__ */ jsx6("span", { children: "Yedek \u0130ndir (.json)" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs5("label", { className: "flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#A2845E] hover:bg-[#8D704E] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer text-center", children: [
              /* @__PURE__ */ jsx6(Upload, { className: "w-3.5 h-3.5" }),
              /* @__PURE__ */ jsx6("span", { children: "Yedek Y\xFCkle" }),
              /* @__PURE__ */ jsx6(
                "input",
                {
                  type: "file",
                  accept: ".json",
                  onChange: handleImportJSON,
                  className: "hidden"
                }
              )
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("div", { className: "p-4 bg-slate-50 dark:bg-stone-950 border border-slate-200/60 dark:border-stone-850 rounded-2xl space-y-2.5", children: [
          /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs5("span", { className: "text-xs font-bold text-slate-800 dark:text-stone-200 font-serif flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx6(FileText, { className: "w-4 h-4 text-indigo-500" }),
              /* @__PURE__ */ jsx6("span", { children: "Ba\u015Fka Uygulamadan Not Aktar" })
            ] }),
            /* @__PURE__ */ jsx6(
              "button",
              {
                onClick: () => setIsBatchTextOpen(!isBatchTextOpen),
                className: "text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer",
                children: isBatchTextOpen ? "Kapat \u25B2" : "A\xE7 \u25BC"
              }
            )
          ] }),
          /* @__PURE__ */ jsx6("p", { className: "text-[11px] text-slate-500 dark:text-stone-400 leading-relaxed font-serif", children: "Apple Notlar, Google Keep, Notion veya WhatsApp'taki eski notlar\u0131n\u0131z\u0131 kopyalay\u0131p buraya yap\u0131\u015Ft\u0131rabilirsiniz." }),
          isBatchTextOpen && /* @__PURE__ */ jsxs5("div", { className: "space-y-2 pt-1 animate-fadeIn", children: [
            /* @__PURE__ */ jsx6(
              "textarea",
              {
                rows: 4,
                value: batchTextInput,
                onChange: (e) => setBatchTextInput(e.target.value),
                placeholder: "Eski notlar\u0131n\u0131z\u0131 buraya yap\u0131\u015Ft\u0131r\u0131n. Her bir notu birbirinden ay\u0131rmak i\xE7in aralar\u0131na bo\u015F bir sat\u0131r veya '---' koyabilirsiniz...",
                className: "w-full text-xs p-3 rounded-xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 text-slate-800 dark:text-stone-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
              }
            ),
            /* @__PURE__ */ jsx6(
              "button",
              {
                disabled: !batchTextInput.trim(),
                onClick: handleBatchTextImport,
                className: "w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-xs",
                children: "Notlar\u0131 \u0130\xE7e Aktar ve Kaydet"
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("div", { className: "border-t border-[#E5E5EA] dark:border-stone-800 pt-3 space-y-3", children: [
          /* @__PURE__ */ jsxs5("span", { className: "text-xs font-bold text-slate-800 dark:text-stone-200 font-serif flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx6(Cloud, { className: "w-4 h-4 text-emerald-500" }),
            /* @__PURE__ */ jsx6("span", { children: "Bulut E\u015Fitleme Kodu" })
          ] }),
          syncActive ? (
            /* Active Sync UI Config */
            /* @__PURE__ */ jsxs5("div", { className: "space-y-4 bg-[#FFF9E5] dark:bg-[#3E3326]/20 border border-[#FFD60A]/25 p-4 rounded-2xl", children: [
              /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsx6("span", { className: "text-[10px] text-[#A2845E] dark:text-[#FFF9E5] font-extrabold uppercase tracking-wider font-sans", children: "E\u015Fitleme Durumu: Aktif \u{1F7E2}" }),
                /* @__PURE__ */ jsx6("span", { className: "text-[10px] font-bold text-slate-400 dark:text-slate-500 font-mono", children: "Real-time Sync" })
              ] }),
              /* @__PURE__ */ jsxs5("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsx6("span", { className: "text-[10px] block text-[#8E8E93] font-bold uppercase tracking-wider font-sans", children: "Sizin \xD6zel E\u015Fitleme Kodunuz:" }),
                /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsx6("div", { className: "flex-1 p-3 bg-white dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 rounded-xl text-center font-mono font-bold text-lg text-slate-800 dark:text-white tracking-widest select-all", children: syncCode }),
                  /* @__PURE__ */ jsx6(
                    "button",
                    {
                      onClick: () => {
                        navigator.clipboard.writeText(syncCode || "");
                        setSyncMessage("E\u015Fitleme kodu kopyaland\u0131! Di\u011Fer cihaz\u0131n\u0131zda bu kodu girin.");
                        setTimeout(() => setSyncMessage(null), 3500);
                      },
                      className: "px-4 py-3 bg-[#A2845E] hover:bg-[#8D704E] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer font-sans",
                      children: "Kopyala"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsx6("p", { className: "text-[10px] text-[#8E8E93] leading-relaxed pt-1 italic font-serif", children: "* Bu kodu di\u011Fer telefonunuzdaki veya bilgisayar\u0131n\u0131zdaki D\xFC\u015F\xFCnce Defteri men\xFCs\xFCne girerek iki cihaz\u0131 birbirine ba\u011Flayabilirsiniz." })
              ] }),
              /* @__PURE__ */ jsx6("div", { className: "pt-2", children: /* @__PURE__ */ jsx6(
                "button",
                {
                  onClick: disableSync,
                  className: "w-full py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer font-sans",
                  children: "Senkronizasyonu Durdur (Yerel Moda Ge\xE7)"
                }
              ) })
            ] })
          ) : (
            /* Inactive Sync Options UI */
            /* @__PURE__ */ jsxs5("div", { className: "space-y-3 font-sans", children: [
              /* @__PURE__ */ jsxs5("div", { className: "p-3.5 bg-[#F2F2F7] dark:bg-stone-950 border border-transparent dark:border-stone-850 rounded-2xl space-y-2", children: [
                /* @__PURE__ */ jsx6("div", { className: "text-xs font-bold text-slate-800 dark:text-white font-serif", children: "Yeni Bulut Alan\u0131 A\xE7" }),
                /* @__PURE__ */ jsx6("p", { className: "text-[11px] text-slate-500 dark:text-stone-400 leading-normal font-serif", children: "\u0130lk defa e\u015Fitliyorsan\u0131z, yeni bir e\u015Fitleme kodu olu\u015Fturarak t\xFCm yaz\u0131lar\u0131n\u0131z\u0131 buluta yedekleyin." }),
                /* @__PURE__ */ jsx6(
                  "button",
                  {
                    disabled: syncLoading,
                    onClick: enableSyncWithNewCode,
                    className: "w-full py-2 bg-[#A2845E] hover:bg-[#8D704E] text-white rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50",
                    children: syncLoading ? "Olu\u015Fturuluyor..." : "Bulut E\u015Fitlemeyi Ba\u015Flat"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs5("div", { className: "p-3.5 border border-[#E5E5EA] dark:border-stone-800 rounded-2xl space-y-2", children: [
                /* @__PURE__ */ jsx6("div", { className: "text-xs font-bold text-slate-800 dark:text-white font-serif", children: "Mevcut Kodla Ba\u011Flan" }),
                /* @__PURE__ */ jsxs5("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsx6(
                    "input",
                    {
                      maxLength: 12,
                      value: inputSyncCode,
                      onChange: (e) => setInputSyncCode(e.target.value.toUpperCase()),
                      placeholder: "\xD6rn: DF-928134",
                      className: "flex-1 text-center p-2 font-mono font-bold tracking-wider text-slate-800 dark:text-white bg-[#FDFCFB] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A2845E]/20 text-xs"
                    }
                  ),
                  /* @__PURE__ */ jsx6(
                    "button",
                    {
                      disabled: syncLoading || !inputSyncCode.trim(),
                      onClick: () => enableSyncWithExistingCode(inputSyncCode),
                      className: "py-2 px-3 bg-slate-800 dark:bg-stone-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition-all cursor-pointer disabled:opacity-50 shrink-0",
                      children: syncLoading ? "..." : "Ba\u011Fla"
                    }
                  )
                ] })
              ] })
            ] })
          )
        ] })
      ] })
    ] }) }),
    showIOSPrompt && /* @__PURE__ */ jsx6("div", { className: "fixed bottom-20 left-4 right-4 z-40 max-w-md mx-auto bg-[#FDFBF7] dark:bg-stone-900 border border-[#A2845E]/30 dark:border-stone-800 rounded-3xl p-4 shadow-2xl animate-fadeIn", children: /* @__PURE__ */ jsxs5("div", { className: "flex items-start justify-between gap-3", children: [
      /* @__PURE__ */ jsxs5("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsx6(AppBrandIcon, { size: "md", className: "shrink-0" }),
        /* @__PURE__ */ jsxs5("div", { className: "space-y-1", children: [
          /* @__PURE__ */ jsx6("h4", { className: "font-bold text-xs text-slate-850 dark:text-white font-sans", children: "D\xFC\u015F\xFCnce Defteri'ni Ana Ekrana Ekle" }),
          /* @__PURE__ */ jsx6("p", { className: "text-[11px] text-slate-500 dark:text-stone-300 leading-normal font-serif", children: "\xD6zel simgesiyle iPhone veya iPad'inizde tam ekran bir yerel uygulama gibi kullan\u0131n:" }),
          /* @__PURE__ */ jsxs5("div", { className: "pt-2 space-y-1.5 text-[11px] font-sans font-semibold text-slate-700 dark:text-stone-200", children: [
            /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx6("span", { className: "w-5 h-5 rounded-full bg-[#EADEC9] dark:bg-stone-800 text-[#A2845E] dark:text-stone-300 flex items-center justify-center font-bold text-[10px]", children: "1" }),
              /* @__PURE__ */ jsxs5("span", { className: "leading-snug", children: [
                "Safari'nin alt\u0131ndaki ",
                /* @__PURE__ */ jsxs5("strong", { className: "inline-flex items-center text-indigo-600 dark:text-indigo-400 font-sans", children: [
                  /* @__PURE__ */ jsx6(Share, { className: "w-3.5 h-3.5 mx-0.5 inline" }),
                  ' "Payla\u015F" (Share)'
                ] }),
                " butonuna dokunun."
              ] })
            ] }),
            /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx6("span", { className: "w-5 h-5 rounded-full bg-[#EADEC9] dark:bg-stone-800 text-[#A2845E] dark:text-stone-300 flex items-center justify-center font-bold text-[10px]", children: "2" }),
              /* @__PURE__ */ jsxs5("span", { className: "leading-snug", children: [
                "A\xE7\u0131lan men\xFCden ",
                /* @__PURE__ */ jsxs5("strong", { className: "inline-flex items-center text-indigo-600 dark:text-indigo-400 font-sans", children: [
                  /* @__PURE__ */ jsx6(Plus, { className: "w-3.5 h-3.5 mx-0.5 inline" }),
                  ' "Ana Ekrana Ekle"'
                ] }),
                " se\xE7ene\u011Fini bulun."
              ] })
            ] }),
            /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx6("span", { className: "w-5 h-5 rounded-full bg-[#EADEC9] dark:bg-stone-800 text-[#A2845E] dark:text-stone-300 flex items-center justify-center font-bold text-[10px]", children: "3" }),
              /* @__PURE__ */ jsxs5("span", { className: "leading-snug", children: [
                "Sa\u011F \xFCstteki ",
                /* @__PURE__ */ jsx6("strong", { className: "text-indigo-600 dark:text-indigo-400", children: '"Ekle" (Add)' }),
                " butonuna dokunun."
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx6(
        "button",
        {
          onClick: () => {
            setShowIOSPrompt(false);
            sessionStorage.setItem("thought_defteri_ios_prompt_dismissed", "true");
          },
          className: "text-slate-400 hover:text-slate-650 text-xs font-bold bg-[#F2F2F7] dark:bg-stone-850 h-6 w-6 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0",
          children: "\u2715"
        }
      )
    ] }) }),
    isInstallDialogOpen && /* @__PURE__ */ jsx6("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn", children: /* @__PURE__ */ jsxs5("div", { className: "bg-[#FDFBF7] dark:bg-stone-900 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 p-6 max-w-md w-full space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-stone-800/40", children: [
        /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsx6(AppBrandIcon, { size: "sm" }),
          /* @__PURE__ */ jsx6("h3", { className: "font-bold text-slate-850 dark:text-white text-base font-serif", children: "Uygulama \u0130konu & Y\xFCkleme" })
        ] }),
        /* @__PURE__ */ jsx6(
          "button",
          {
            onClick: () => setIsInstallDialogOpen(false),
            className: "text-slate-400 hover:text-slate-650 dark:hover:text-white text-sm font-bold bg-[#F2F2F7] dark:bg-stone-850 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer",
            children: "\u2715"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "p-4 rounded-2xl bg-gradient-to-b from-[#241E1A] to-[#120F0D] text-stone-100 border border-stone-800 shadow-inner space-y-3", children: [
        /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between text-[11px] text-amber-200/80 font-medium", children: [
          /* @__PURE__ */ jsx6("span", { children: "Yeni \xD6zel Simge Tasar\u0131m\u0131" }),
          /* @__PURE__ */ jsx6("span", { className: "text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono", children: "Retina & Vector SVG / PNG" })
        ] }),
        /* @__PURE__ */ jsxs5("div", { className: "grid grid-cols-2 gap-3 pt-1", children: [
          /* @__PURE__ */ jsxs5("div", { className: "bg-stone-900/80 rounded-xl p-3 border border-stone-800/80 flex flex-col items-center text-center space-y-2", children: [
            /* @__PURE__ */ jsx6("span", { className: "text-[10px] text-stone-400 font-semibold uppercase tracking-wider", children: "Mobil Ana Ekran" }),
            /* @__PURE__ */ jsxs5("div", { className: "p-2.5 bg-stone-950/60 rounded-2xl border border-white/5 flex flex-col items-center", children: [
              /* @__PURE__ */ jsx6(AppBrandIcon, { size: "lg", className: "shadow-lg shadow-black/60" }),
              /* @__PURE__ */ jsx6("span", { className: "text-[11px] font-medium text-stone-300 mt-1.5 tracking-tight", children: "Defter" })
            ] }),
            /* @__PURE__ */ jsx6("span", { className: "text-[10px] text-stone-400", children: "iOS & Android" })
          ] }),
          /* @__PURE__ */ jsxs5("div", { className: "bg-stone-900/80 rounded-xl p-3 border border-stone-800/80 flex flex-col items-center text-center space-y-2", children: [
            /* @__PURE__ */ jsx6("span", { className: "text-[10px] text-stone-400 font-semibold uppercase tracking-wider", children: "Masa\xFCst\xFC & Dock" }),
            /* @__PURE__ */ jsxs5("div", { className: "p-2.5 bg-stone-950/60 rounded-2xl border border-white/5 flex flex-col items-center", children: [
              /* @__PURE__ */ jsx6(AppBrandIcon, { size: "lg", className: "shadow-lg shadow-black/60" }),
              /* @__PURE__ */ jsx6("span", { className: "text-[11px] font-medium text-stone-300 mt-1.5 tracking-tight", children: "D\xFC\u015F\xFCnce Defteri" })
            ] }),
            /* @__PURE__ */ jsx6("span", { className: "text-[10px] text-stone-400", children: "Mac & Windows" })
          ] })
        ] }),
        /* @__PURE__ */ jsx6("p", { className: "text-[11px] text-stone-300/90 leading-relaxed font-serif pt-1 text-center", children: "Derin espresso zemin \xFCzerinde alt\u0131n varakl\u0131 a\xE7\u0131k defter ve zihinsel berrakl\u0131k k\u0131v\u0131lc\u0131m\u0131 (\u2726)." })
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "space-y-4 font-sans text-slate-600 dark:text-stone-300 text-xs", children: [
        /* @__PURE__ */ jsx6("p", { className: "leading-relaxed font-serif", children: "D\xFC\u015F\xFCnce Defteri, modern PWA (Progressive Web App) teknolojisini destekler. Taray\u0131c\u0131 \xE7ubu\u011Fu olmadan, masa\xFCst\xFC veya mobilde yerel bir uygulama gibi tam ekran \xE7al\u0131\u015F\u0131r." }),
        /* @__PURE__ */ jsxs5("div", { className: "p-4 bg-amber-50/20 dark:bg-amber-950/10 border border-amber-200/30 rounded-2xl space-y-3", children: [
          /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-2 text-amber-800 dark:text-amber-400 font-bold", children: [
            /* @__PURE__ */ jsx6("span", { className: "px-2 py-0.5 bg-amber-100 dark:bg-amber-900/40 rounded-lg text-[10px]", children: "iOS / Safari" }),
            /* @__PURE__ */ jsx6("span", { children: "iPhone ve iPad i\xE7in:" })
          ] }),
          /* @__PURE__ */ jsxs5("div", { className: "space-y-2 leading-relaxed", children: [
            /* @__PURE__ */ jsxs5("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx6("span", { className: "font-extrabold text-[#A2845E]", children: "1." }),
              /* @__PURE__ */ jsxs5("span", { children: [
                "Safari alt \xE7ubu\u011Fundaki ",
                /* @__PURE__ */ jsxs5("strong", { children: [
                  "Payla\u015F ",
                  /* @__PURE__ */ jsx6(Share, { className: "w-3.5 h-3.5 inline mx-0.5" }),
                  " (Share)"
                ] }),
                " butonuna dokunun."
              ] })
            ] }),
            /* @__PURE__ */ jsxs5("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx6("span", { className: "font-extrabold text-[#A2845E]", children: "2." }),
              /* @__PURE__ */ jsxs5("span", { children: [
                "A\u015Fa\u011F\u0131 kayd\u0131r\u0131p ",
                /* @__PURE__ */ jsx6("strong", { children: "Ana Ekrana Ekle (Add to Home Screen)" }),
                " se\xE7ene\u011Fini se\xE7in."
              ] })
            ] }),
            /* @__PURE__ */ jsxs5("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx6("span", { className: "font-extrabold text-[#A2845E]", children: "3." }),
              /* @__PURE__ */ jsxs5("span", { children: [
                "Sa\u011F \xFCstteki ",
                /* @__PURE__ */ jsx6("strong", { children: "Ekle (Add)" }),
                " butonuna bas\u0131n. Uygulama ana ekran\u0131n\u0131za bu \u015F\u0131k simgesiyle yerle\u015Fecektir!"
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("div", { className: "p-4 bg-indigo-50/20 dark:bg-indigo-950/10 border border-indigo-200/30 rounded-2xl space-y-3", children: [
          /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-2 text-indigo-800 dark:text-indigo-400 font-bold", children: [
            /* @__PURE__ */ jsx6("span", { className: "px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg text-[10px]", children: "Android / Chrome" }),
            /* @__PURE__ */ jsx6("span", { children: "Android Telefonlar i\xE7in:" })
          ] }),
          /* @__PURE__ */ jsxs5("div", { className: "space-y-2 leading-relaxed", children: [
            /* @__PURE__ */ jsxs5("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx6("span", { className: "font-extrabold text-indigo-600 dark:text-indigo-400", children: "1." }),
              /* @__PURE__ */ jsxs5("span", { children: [
                "Taray\u0131c\u0131 sa\u011F \xFCst\xFCndeki ",
                /* @__PURE__ */ jsx6("strong", { children: "\xFC\xE7 noktaya (\u22EE)" }),
                " dokunun."
              ] })
            ] }),
            /* @__PURE__ */ jsxs5("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsx6("span", { className: "font-extrabold text-indigo-600 dark:text-indigo-400", children: "2." }),
              /* @__PURE__ */ jsxs5("span", { children: [
                /* @__PURE__ */ jsx6("strong", { children: "Uygulamay\u0131 Y\xFCkle (Install App)" }),
                " ya da ",
                /* @__PURE__ */ jsx6("strong", { children: "Ana Ekrana Ekle" }),
                " se\xE7ene\u011Fine t\u0131klay\u0131n."
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs5("div", { className: "p-4 bg-slate-50 dark:bg-stone-950 border border-slate-200/50 dark:border-stone-850 rounded-2xl space-y-2", children: [
          /* @__PURE__ */ jsx6("div", { className: "font-bold text-slate-800 dark:text-stone-200", children: "Bilgisayarlar (Chrome/Edge/Safari/macOS) i\xE7in:" }),
          /* @__PURE__ */ jsxs5("p", { className: "leading-relaxed text-[11px] text-slate-500 dark:text-stone-400", children: [
            "Taray\u0131c\u0131n\u0131z\u0131n adres \xE7ubu\u011Funun sa\u011F taraf\u0131ndaki ",
            /* @__PURE__ */ jsx6("strong", { children: "Y\xFCkle (Install)" }),
            " ikonuna basarak uygulamay\u0131 bilgisayar\u0131n\u0131za ba\u011F\u0131ms\u0131z bir masa\xFCst\xFC pencere uygulamas\u0131 olarak kurabilirsiniz. Masa\xFCst\xFCn\xFCzde ve g\xF6rev \xE7ubu\u011Funda simgesiyle yer al\u0131r."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx6(
        "button",
        {
          onClick: () => setIsInstallDialogOpen(false),
          className: "w-full py-3 bg-[#A2845E] hover:bg-[#8D704E] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer text-center font-sans",
          children: "Anlad\u0131m"
        }
      )
    ] }) }),
    isAiDialogOpen && /* @__PURE__ */ jsx6("div", { className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn", children: /* @__PURE__ */ jsxs5("div", { className: "bg-[#FDFBF7] dark:bg-stone-900 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 p-6 max-w-md w-full space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto", children: [
      /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-stone-800/40", children: [
        /* @__PURE__ */ jsxs5("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsx6("div", { className: "p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-[#A2845E] dark:text-amber-300", children: /* @__PURE__ */ jsx6(Sparkles5, { className: "w-5 h-5" }) }),
          /* @__PURE__ */ jsxs5("div", { children: [
            /* @__PURE__ */ jsx6("h3", { className: "font-bold text-slate-850 dark:text-white text-base font-serif", children: "Yapay Zeka (AI) Ayarlar\u0131" }),
            /* @__PURE__ */ jsx6("span", { className: "text-[10px] text-stone-400 font-mono", children: "Google Gemini 2.5 Flash & Bili\u015Fsel CBT" })
          ] })
        ] }),
        /* @__PURE__ */ jsx6(
          "button",
          {
            onClick: () => setIsAiDialogOpen(false),
            className: "text-slate-400 hover:text-slate-650 dark:hover:text-white text-sm font-bold bg-[#F2F2F7] dark:bg-stone-850 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer",
            children: "\u2715"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-2", children: [
        /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between text-xs font-bold text-stone-800 dark:text-stone-200", children: [
          /* @__PURE__ */ jsxs5("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsx6("span", { className: "w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" }),
            /* @__PURE__ */ jsx6("span", { children: "AI Durumu: Kesintisiz Aktif" })
          ] }),
          /* @__PURE__ */ jsx6("span", { className: "text-[10px] font-mono px-2 py-0.5 rounded-full bg-white dark:bg-stone-900 border border-amber-200/50 text-[#A2845E] font-bold", children: geminiApiKeyInput.trim() ? "Gemini 2.5 Flash" : "Ak\u0131ll\u0131 Yerel CBT" })
        ] }),
        /* @__PURE__ */ jsx6("p", { className: "text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed font-serif", children: geminiApiKeyInput.trim() ? "Ki\u015Fisel Google Gemini API anahtar\u0131n\u0131z tan\u0131mland\u0131. Bili\u015Fsel analizler ve g\xFCn\xFCn ilhamlar\u0131 do\u011Frudan Google GenAI 2.5 Flash modeliyle \xFCretilir." : "Uygulama, API anahtar\u0131 olmasa bile \xE7al\u0131\u015Fan dahili ak\u0131ll\u0131 T\xFCrk\xE7e CBT ve \xF6z-\u015Fefkat analiz motoruna sahiptir. Dilerseniz kendi Google Gemini anahtar\u0131n\u0131z\u0131 ekleyerek bulut yapay zekas\u0131n\u0131 da ba\u011Flayabilirsiniz." })
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "space-y-3", children: [
        /* @__PURE__ */ jsx6("label", { className: "text-[11px] font-extrabold text-[#8E8E93] uppercase tracking-wider block", children: "Google Gemini API Anahtar\u0131 (Opsiyonel)" }),
        /* @__PURE__ */ jsxs5("div", { className: "relative", children: [
          /* @__PURE__ */ jsx6(KeyRound2, { className: "w-4 h-4 text-stone-400 absolute left-3 top-3" }),
          /* @__PURE__ */ jsx6(
            "input",
            {
              type: "password",
              value: geminiApiKeyInput,
              onChange: (e) => {
                setGeminiApiKeyInput(e.target.value);
                setAiTestResult(null);
                setAiSavedNotice(false);
              },
              placeholder: "AIzaSy...",
              className: "w-full text-xs pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A2845E]/20 focus:border-[#A2845E] font-mono"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs5("div", { className: "flex items-center justify-between text-[11px] text-stone-500", children: [
          /* @__PURE__ */ jsx6("span", { children: "Anahtar\u0131n\u0131z yok mu?" }),
          /* @__PURE__ */ jsx6(
            "a",
            {
              href: "https://aistudio.google.com/app/apikey",
              target: "_blank",
              rel: "noreferrer",
              className: "text-[#A2845E] dark:text-amber-400 font-bold hover:underline inline-flex items-center gap-1",
              children: "\xDCcretsiz Google AI Studio'dan Al \u2197"
            }
          )
        ] }),
        aiTestResult && /* @__PURE__ */ jsxs5("div", { className: `p-3 rounded-xl text-xs flex items-center gap-2 ${aiTestResult.success ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900" : "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900"}`, children: [
          aiTestResult.success ? /* @__PURE__ */ jsx6(Check4, { className: "w-4 h-4 shrink-0" }) : /* @__PURE__ */ jsx6(AlertCircle3, { className: "w-4 h-4 shrink-0" }),
          /* @__PURE__ */ jsx6("span", { children: aiTestResult.message })
        ] }),
        aiSavedNotice && /* @__PURE__ */ jsxs5("div", { className: "p-3 rounded-xl text-xs bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx6(CheckCircle24, { className: "w-4 h-4 shrink-0" }),
          /* @__PURE__ */ jsx6("span", { children: "Yapay zeka ayarlar\u0131n\u0131z ba\u015Far\u0131yla kaydedildi!" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs5("div", { className: "space-y-2 pt-2 border-t border-[#E5E5EA] dark:border-stone-800/40", children: [
        /* @__PURE__ */ jsxs5("div", { className: "grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsx6(
            "button",
            {
              type: "button",
              disabled: aiTesting || !geminiApiKeyInput.trim(),
              onClick: async () => {
                setAiTesting(true);
                setAiTestResult(null);
                const res = await aiService.testApiKey(geminiApiKeyInput);
                setAiTestResult(res);
                setAiTesting(false);
              },
              className: "px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 cursor-pointer transition-all",
              children: aiTesting ? "Test Ediliyor..." : "Ba\u011Flant\u0131y\u0131 Test Et"
            }
          ),
          /* @__PURE__ */ jsx6(
            "button",
            {
              type: "button",
              onClick: () => {
                setStoredGeminiKey(geminiApiKeyInput);
                setAiSavedNotice(true);
                setTimeout(() => {
                  setIsAiDialogOpen(false);
                }, 1200);
              },
              className: "px-4 py-2.5 bg-[#A2845E] hover:bg-[#8D704E] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer text-center",
              children: "Ayarlar\u0131 Kaydet"
            }
          )
        ] }),
        getStoredGeminiKey() && /* @__PURE__ */ jsx6(
          "button",
          {
            type: "button",
            onClick: () => {
              setStoredGeminiKey("");
              setGeminiApiKeyInput("");
              setAiTestResult(null);
              setAiSavedNotice(false);
            },
            className: "w-full py-1.5 text-[11px] text-rose-500 hover:text-rose-600 hover:underline cursor-pointer text-center",
            children: "Kay\u0131tl\u0131 Anahtar\u0131 Kald\u0131r (Yerel Motora D\xF6n)"
          }
        )
      ] })
    ] }) })
  ] });
}

// src/main.tsx
import { jsx as jsx7, jsxs as jsxs6 } from "react/jsx-runtime";
var ErrorBoundary = class extends Component {
  constructor(props) {
    super(props);
    this.handleReset = () => {
      localStorage.removeItem("thought_defteri_entries");
      localStorage.removeItem("thought_defteri_reflection");
      window.location.reload();
    };
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("D\xFC\u015F\xFCnce Defteri Yakalanan Hata:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return /* @__PURE__ */ jsx7("div", { style: {
        minHeight: "100vh",
        backgroundColor: "#FDFBF7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "system-ui, -apple-system, sans-serif"
      }, children: /* @__PURE__ */ jsxs6("div", { style: {
        maxWidth: "460px",
        width: "100%",
        backgroundColor: "#ffffff",
        borderRadius: "28px",
        border: "1px solid #E5E5EA",
        padding: "28px",
        boxShadow: "0 10px 25px -5px rgba(0,0,0,0.05)",
        textAlign: "center"
      }, children: [
        /* @__PURE__ */ jsx7("div", { style: { fontSize: "42px", marginBottom: "12px" }, children: "\u{1F4D6}" }),
        /* @__PURE__ */ jsx7("h2", { style: { fontSize: "18px", fontWeight: "bold", color: "#1C1814", marginBottom: "8px" }, children: "D\xFC\u015F\xFCnce Defteri A\xE7\u0131l\u0131rken Bir Aksamayla Kar\u015F\u0131la\u015F\u0131ld\u0131" }),
        /* @__PURE__ */ jsx7("p", { style: { fontSize: "12px", color: "#666", lineHeight: 1.5, marginBottom: "16px" }, children: "Taray\u0131c\u0131da \xF6nbelle\u011Fe al\u0131nm\u0131\u015F eski bir veri veya bir bile\u015Fen ba\u015Flat\u0131lamad\u0131. Endi\u015Felenmeyin, a\u015Fa\u011F\u0131daki ad\u0131mlarla d\xFCzeltebilirsiniz." }),
        this.state.error && /* @__PURE__ */ jsx7("div", { style: {
          backgroundColor: "#FFF9E5",
          border: "1px solid rgba(255, 214, 10, 0.4)",
          borderRadius: "12px",
          padding: "12px",
          fontSize: "11px",
          fontFamily: "monospace",
          color: "#8D704E",
          textAlign: "left",
          overflowX: "auto",
          marginBottom: "16px",
          maxHeight: "100px"
        }, children: this.state.error.toString() }),
        /* @__PURE__ */ jsxs6("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: [
          /* @__PURE__ */ jsx7(
            "button",
            {
              onClick: () => window.location.reload(),
              style: {
                backgroundColor: "#A2845E",
                color: "#ffffff",
                border: "none",
                borderRadius: "14px",
                padding: "12px",
                fontSize: "13px",
                fontWeight: "bold",
                cursor: "pointer"
              },
              children: "Sayfay\u0131 Yeniden Y\xFCkle"
            }
          ),
          /* @__PURE__ */ jsx7(
            "button",
            {
              onClick: this.handleReset,
              style: {
                backgroundColor: "#F2F2F7",
                color: "#555",
                border: "1px solid #E5E5EA",
                borderRadius: "14px",
                padding: "10px",
                fontSize: "12px",
                fontWeight: "600",
                cursor: "pointer"
              },
              children: "\xD6nbelle\u011Fi S\u0131f\u0131rla ve Yeniden Ba\u015Flat"
            }
          )
        ] })
      ] }) });
    }
    return this.props.children;
  }
};
createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsx7(StrictMode, { children: /* @__PURE__ */ jsx7(ErrorBoundary, { children: /* @__PURE__ */ jsx7(App, {}) }) })
);
