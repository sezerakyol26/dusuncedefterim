export enum Mood {
  EXCITED = "EXCITED", // Canlı / Harika
  CALM = "CALM",       // Sakin / Huzurlu
  REFLECTIVE = "REFLECTIVE", // Düşünceli / Meraklı
  TIRED = "TIRED",     // Yorgun / Düşük Enerji
  ANXIOUS = "ANXIOUS", // Kaygılı / Stresli
  GRATEFUL = "GRATEFUL", // Minnettar / Şükür Dolu
  HOPEFUL = "HOPEFUL",   // Umutlu / İyimser
  PROUD = "PROUD",       // Özgüvenli / Gururlu
  LOVED = "LOVED",       // Sevgi Dolu / Şefkatli
  SAD = "SAD",           // Hüzünlü / Kırgın
  ANGRY = "ANGRY",       // Öfkeli / Gergin
  OVERWHELMED = "OVERWHELMED", // Bunalmış / Karışık
  LONELY = "LONELY",     // Yalnız / İçe Çekilmiş
}

export enum ThoughtCategory {
  GRATITUDE = "GRATITUDE",   // Sukran
  IDEA = "IDEA",             // Fikir / Bulus
  INTENTION = "INTENTION",   // Gunluk Niyet
  REFLECTION = "REFLECTION", // Oz-Yansitma
  CHALLENGE = "CHALLENGE",   // Zorluk / Engel
}

export interface CognitiveReframe {
  id: string;
  original: string;
  reframed: string;
  createdAt: string;
}

export interface ThoughtEntry {
  id: string;
  content: string;
  category: ThoughtCategory;
  mood: Mood;
  createdAt: string; // ISO String
  isBookmarked?: boolean;
}

export interface AISelfReflection {
  cognitivePatterns: string[]; // Bilisel oruntuler
  growthRecommendations: string[]; // Gelisim onerileri
  introspectiveQuestion: string; // Oz-sorgulama sorusu
  overallVibe: string; // Genel ruh hali analizi
  mentalBalanceScore?: number; // 0 - 100 arasi zihinsel denge puani
  balanceStatus?: string; // Denge durumu ozeti (orn: "Dengeli ve Farkinda")
  emotionalMetrics?: {
    clarity: number; // Zihinsel Berraklik (0-100)
    selfCompassion: number; // Oz-Sefkat Egilimi (0-100)
    resilience: number; // Duygusal Dayaniklilik (0-100)
    energyLevel: number; // Icsel Canlilik / Enerji (0-100)
  };
  strengths?: string[]; // Fark edilen gizli psikolojik gucler ve dayaniklik kaynaklari
  mindfulAffirmation?: string; // Gunun sifali oz-sefkat olumlamasi
  analyzedEntriesCount?: number; // Analize dahil edilen kayit sayisi
  timeframe?: string; // Analiz donemi (orn: "Son 7 Gun", "Tum Zamanlar")
  generatedAt: string;
}

export interface PromptTemplate {
  id: string;
  title: string;
  prompt: string;
  category: ThoughtCategory;
  suggestedMood?: Mood;
}
