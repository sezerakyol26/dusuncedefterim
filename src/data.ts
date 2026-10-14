import { ThoughtEntry, ThoughtCategory, Mood, PromptTemplate } from "./types";

export const CATEGORY_LABELS: Record<ThoughtCategory, { label: string; icon: string; color: string; bg: string }> = {
  [ThoughtCategory.GRATITUDE]: {
    label: "Şükran & Teşekkür",
    icon: "Heart",
    color: "text-rose-500",
    bg: "bg-rose-50 border-rose-100 dark:bg-rose-950/20 dark:border-rose-900/30",
  },
  [ThoughtCategory.IDEA]: {
    label: "Fikir & İlham",
    icon: "Lightbulb",
    color: "text-amber-500",
    bg: "bg-amber-50 border-amber-100 dark:bg-amber-950/20 dark:border-amber-900/30",
  },
  [ThoughtCategory.INTENTION]: {
    label: "Günlük Niyet",
    icon: "Compass",
    color: "text-emerald-500",
    bg: "bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:border-emerald-900/30",
  },
  [ThoughtCategory.REFLECTION]: {
    label: "Öz-Yansıtma",
    icon: "Users",
    color: "text-indigo-500",
    bg: "bg-indigo-50 border-indigo-100 dark:bg-indigo-950/20 dark:border-indigo-900/30",
  },
  [ThoughtCategory.CHALLENGE]: {
    label: "Zorluklar & Kaygılar",
    icon: "AlertCircle",
    color: "text-sky-500",
    bg: "bg-sky-50 border-sky-100 dark:bg-sky-950/20 dark:border-sky-900/30",
  },
};

export const MOOD_LABELS: Record<Mood, { label: string; emoji: string; color: string; bg: string }> = {
  [Mood.EXCITED]: {
    label: "Canlı / Harika",
    emoji: "⚡",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-50 dark:bg-amber-950/30",
  },
  [Mood.CALM]: {
    label: "Sakin / Huzurlu",
    emoji: "😌",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
  },
  [Mood.REFLECTIVE]: {
    label: "Düşünceli / Meraklı",
    emoji: "🤔",
    color: "text-indigo-600 dark:text-indigo-400",
    bg: "bg-indigo-50 dark:bg-indigo-950/30",
  },
  [Mood.TIRED]: {
    label: "Düşük Enerji / Yorgun",
    emoji: "😔",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-50 dark:bg-purple-950/30",
  },
  [Mood.ANXIOUS]: {
    label: "Stresli / Kaygılı",
    emoji: "🤯",
    color: "text-rose-600 dark:text-rose-400",
    bg: "bg-rose-50 dark:bg-rose-950/30",
  },
  [Mood.GRATEFUL]: {
    label: "Minnettar / Şükür",
    emoji: "🙏",
    color: "text-teal-600 dark:text-teal-400",
    bg: "bg-teal-50 dark:bg-teal-950/30",
  },
  [Mood.HOPEFUL]: {
    label: "Umutlu / İyimser",
    emoji: "🌱",
    color: "text-lime-600 dark:text-lime-400",
    bg: "bg-lime-50 dark:bg-lime-950/30",
  },
  [Mood.PROUD]: {
    label: "Özgüvenli / Gururlu",
    emoji: "🌟",
    color: "text-yellow-600 dark:text-yellow-400",
    bg: "bg-yellow-50 dark:bg-yellow-950/30",
  },
  [Mood.LOVED]: {
    label: "Sevgi Dolu / Şefkatli",
    emoji: "🥰",
    color: "text-pink-600 dark:text-pink-400",
    bg: "bg-pink-50 dark:bg-pink-950/30",
  },
  [Mood.SAD]: {
    label: "Hüzünlü / Kırgın",
    emoji: "🌧️",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-50 dark:bg-blue-950/30",
  },
  [Mood.ANGRY]: {
    label: "Öfkeli / Gergin",
    emoji: "😤",
    color: "text-red-600 dark:text-red-400",
    bg: "bg-red-50 dark:bg-red-950/30",
  },
  [Mood.OVERWHELMED]: {
    label: "Bunalmış / Karışık",
    emoji: "🌀",
    color: "text-violet-600 dark:text-violet-400",
    bg: "bg-violet-50 dark:bg-violet-950/30",
  },
  [Mood.LONELY]: {
    label: "Yalnız / İçe Çekilmiş",
    emoji: "🍂",
    color: "text-stone-600 dark:text-stone-400",
    bg: "bg-stone-50 dark:bg-stone-900/40",
  },
};

export const INITIAL_THOUGHTS: ThoughtEntry[] = [
  {
    id: "sample-1",
    content: "Bugün sabah kahvemi içerken balkonda uçuşan kuşları izledim. Son zamanlardaki yoğunluğun ortasında bu sessiz 5 dakika bana inanılmaz huzurlu ve zengin hissettirdi. Hayatın minik anlarındaki güzelliği bazen çok çabuk unutuyoruz.",
    category: ThoughtCategory.GRATITUDE,
    mood: Mood.CALM,
    createdAt: new Date(Date.now() - 36 * 3600000).toISOString(), // 36 hours ago
    isBookmarked: true,
  },
  {
    id: "sample-2",
    content: "Yeni projeyle ilgili tüm sorumluluğu tek başıma üstlendiğimi ve kimseden yardım isteyemediğimi fark ettim. 'Eğer ben yapmazsam her şey mahvolur' inancı beni aşırı hırpalıyor. Ekip arkadaşlarıma güvenmeyi ve görev dağılımı yapmayı denemeliyim.",
    category: ThoughtCategory.CHALLENGE,
    mood: Mood.ANXIOUS,
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(), // 24 hours ago
  },
  {
    id: "sample-3",
    content: "Bugün her kararımı aceleyle değil, 3 derin nefes aldıktan sonra vereceğim. Zihnimi yavaşlatarak tepki oluşturmak yerine bilinçli ve şefkatli bir şekilde yanıt vermeyi niyet ediyorum.",
    category: ThoughtCategory.INTENTION,
    mood: Mood.REFLECTIVE,
    createdAt: new Date(Date.now() - 3 * 3600000).toISOString(), // 3 hours ago
    isBookmarked: false,
  },
];

export const WRITING_PROMPTS: PromptTemplate[] = [
  {
    id: "p-1",
    title: "Minnettarlık Arayışı",
    prompt: "Bugün gerçekleşen ve hayatına küçücük de olsa değer katan, genellikle hafife aldığın 3 basit durumu yaz.",
    category: ThoughtCategory.GRATITUDE,
    suggestedMood: Mood.CALM,
  },
  {
    id: "p-2",
    title: "Duygusal Şefkat",
    prompt: "Şu an içinde hissettiğin en belirgin yoğun duyguyu yargılamadan tanımla. Bu duygu bir misafir olsaydı, sana ne anlatmaya çalışıyordu?",
    category: ThoughtCategory.REFLECTION,
    suggestedMood: Mood.REFLECTIVE,
  },
  {
    id: "p-3",
    title: "Günlük Odak",
    prompt: "Zihnini en çok meşgul eden konuyu bir kenara bıraksaydın, bugün sadece 'kendin olmak' için neye ihtiyaç duyarsın?",
    category: ThoughtCategory.INTENTION,
    suggestedMood: Mood.CALM,
  },
  {
    id: "p-4",
    title: "Fikir Kıvılcımı",
    prompt: "Başarısız olma ihtimalin sıfır olsaydı, bugün adım atacağın o çılgın, heyecan verici yenilik ne olurdu?",
    category: ThoughtCategory.IDEA,
    suggestedMood: Mood.EXCITED,
  },
  {
    id: "p-5",
    title: "Sınırlayıcı İnançlar",
    prompt: "Kafanın içinde sürekli tekrarlayan 'Ben bunu beceremem' ya da 'Geciktim' dediğin inanç ne? Bu düşüncenin kökeninde ne yatıyor olabilir?",
    category: ThoughtCategory.CHALLENGE,
    suggestedMood: Mood.ANXIOUS,
  },
];
