import React, { useState, useEffect, useMemo } from "react";
import { ThoughtEntry, ThoughtCategory, Mood, AISelfReflection } from "../types";
import { 
  Sparkles, 
  Brain, 
  ShieldCheck, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  Loader2, 
  ListTodo, 
  BookmarkCheck, 
  Lightbulb, 
  Copy, 
  Check, 
  Wind, 
  HeartHandshake, 
  Activity, 
  Calendar, 
  RotateCcw,
  Zap,
  Smile,
  Compass
} from "lucide-react";
import { aiService } from "../services/aiService";

interface AIInsightsProps {
  entries: ThoughtEntry[];
  onAddEntry: (content: string, category: ThoughtCategory, mood: Mood) => void;
}

type TimeframeFilter = "ALL" | "7D" | "30D";

export default function AIInsights({ entries, onAddEntry }: AIInsightsProps) {
  // Loaded state or cached state from localStorage
  const [reflection, setReflection] = useState<AISelfReflection | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Timeframe filter
  const [timeframe, setTimeframe] = useState<TimeframeFilter>("ALL");

  // Introspective answer box
  const [answer, setAnswer] = useState("");
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  // Interactive advice checkboxes to let the user track completion of ideas
  const [completedAdvice, setCompletedAdvice] = useState<Record<string, boolean>>({});

  // Copy to clipboard state
  const [copiedReport, setCopiedReport] = useState(false);
  const [copiedAffirmation, setCopiedAffirmation] = useState(false);

  // Breathing guide interactive widget
  const [isBreathingActive, setIsBreathingActive] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathCountdown, setBreathCountdown] = useState(4);

  // Scan steps for the loading animation
  const scanSteps = [
    "Zihinsel akış ve duygusal ton taranıyor...",
    "Bilişsel eğilimler ve düşünce kalıpları haritalanıyor...",
    "Gizli psikolojik güçleriniz ve dayanıklılık kaynaklarınız ayrıştırılıyor...",
    "Öz-şefkat metrikleri hesaplanıyor ve aynanız parlatılıyor..."
  ];

  // Filter entries according to timeframe
  const filteredEntries = useMemo(() => {
    if (timeframe === "ALL") return entries;
    const now = Date.now();
    const cutoffDays = timeframe === "7D" ? 7 : 30;
    const cutoffMs = now - cutoffDays * 24 * 60 * 60 * 1000;
    const filtered = entries.filter(e => new Date(e.createdAt).getTime() >= cutoffMs);
    // If filtered count is too low (< 2) but total entries has >= 2, fall back gracefully to all
    return filtered.length >= 2 ? filtered : entries;
  }, [entries, timeframe]);

  const timeframeLabel = timeframe === "7D" ? "Son 7 Gün" : timeframe === "30D" ? "Son 30 Gün" : "Tüm Zamanlar";

  // Load cached reflection on mount
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

  // Set up sequential updates to the loading text to mimic deep thinking scanner
  useEffect(() => {
    let interval: any;
    if (loading) {
      setLoadingStep(0);
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < scanSteps.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 2400);
    }
    return () => clearInterval(interval);
  }, [loading]);

  // Breathing exercise timer
  useEffect(() => {
    let timer: any;
    if (isBreathingActive) {
      timer = setInterval(() => {
        setBreathCountdown((prev) => {
          if (prev > 1) {
            return prev - 1;
          }
          // Switch phase when countdown reaches 1
          setBreathPhase((currentPhase) => {
            if (currentPhase === "inhale") return "hold";
            if (currentPhase === "hold") return "exhale";
            return "inhale";
          });
          return 4; // reset 4 second cycle
        });
      }, 1000);
    } else {
      setBreathCountdown(4);
      setBreathPhase("inhale");
    }
    return () => clearInterval(timer);
  }, [isBreathingActive]);

  const triggerAnalysis = async (targetEntries = filteredEntries, targetLabel = timeframeLabel) => {
    if (targetEntries.length < 2) return;
    
    setLoading(true);
    setError(null);
    setAnswerSubmitted(false);
    setAnswer("");
    try {
      const data = await aiService.analyzeThoughts(targetEntries, targetLabel);
      setReflection(data);
      // Cache details
      localStorage.setItem("thought_defteri_reflection", JSON.stringify(data));
      // Reset advice checklist
      setCompletedAdvice({});
    } catch (err: any) {
      setError(err.message || "Bilinmeyen bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleTimeframeChange = (newTf: TimeframeFilter) => {
    setTimeframe(newTf);
    const now = Date.now();
    const cutoffDays = newTf === "7D" ? 7 : newTf === "30D" ? 30 : 9999;
    const cutoffMs = now - cutoffDays * 24 * 60 * 60 * 1000;
    const target = newTf === "ALL" ? entries : entries.filter(e => new Date(e.createdAt).getTime() >= cutoffMs);
    const effective = target.length >= 2 ? target : entries;
    const label = newTf === "7D" ? "Son 7 Gün" : newTf === "30D" ? "Son 30 Gün" : "Tüm Zamanlar";
    triggerAnalysis(effective, label);
  };

  const handleToggleAdvice = (index: number) => {
    const key = `advice-${index}`;
    setCompletedAdvice(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const parsePattern = (raw: string, idx: number) => {
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
      title: `Bilişsel Örüntü #${idx + 1}`,
      description: cleanRaw
    };
  };

  const handleSubmitAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answer.trim() || !reflection) return;

    // Save as a reflection entry in general journal flow
    const combinedContent = `[Aynanın Sorusu: ${reflection.introspectiveQuestion}]\n\nCevabım: ${answer}`;
    onAddEntry(combinedContent, ThoughtCategory.REFLECTION, Mood.REFLECTIVE);
    
    setAnswerSubmitted(true);
    setAnswer("");
  };

  const copyFullReport = () => {
    if (!reflection) return;
    const reportText = `🪞 Düşünce Defteri - Zihinsel Ayna Raporu (${reflection.timeframe || "Tüm Zamanlar"})
Tarih: ${new Date(reflection.generatedAt).toLocaleDateString("tr-TR")}
Denge Skoru: ${reflection.mentalBalanceScore || 80}/100 (${reflection.balanceStatus || "Dengeli"})

✨ Genel Ruh Hali & Zihinsel İklim:
"${reflection.overallVibe}"

🌿 Günün Olumlaması:
"${reflection.mindfulAffirmation || ""}"

🛡️ Belirgin Güçleriniz:
${reflection.strengths?.map(s => `• ${s}`).join("\n") || ""}

🔍 Gözlenen Bilişsel Örüntüler:
${reflection.cognitivePatterns?.map(p => `• ${p}`).join("\n") || ""}

🌱 Öz-Şefkat Görevleri:
${reflection.growthRecommendations?.map(r => `• ${r}`).join("\n") || ""}

❓ Öz-Sorgulama Sorusu:
"${reflection.introspectiveQuestion}"`;

    navigator.clipboard.writeText(reportText).then(() => {
      setCopiedReport(true);
      setTimeout(() => setCopiedReport(false), 2500);
    });
  };

  const copyAffirmation = () => {
    if (!reflection?.mindfulAffirmation) return;
    navigator.clipboard.writeText(reflection.mindfulAffirmation).then(() => {
      setCopiedAffirmation(true);
      setTimeout(() => setCopiedAffirmation(false), 2000);
    });
  };

  // Determine eligibility
  const isEligible = entries.length >= 2;
  const totalTasks = reflection?.growthRecommendations?.length || 0;
  const completedTasksCount = Object.values(completedAdvice).filter(Boolean).length;

  return (
    <div className="space-y-6 pb-28 animate-fadeIn" id="ai-insights-container">
      {/* Title & Control Bento */}
      <div className="bg-white dark:bg-stone-900 p-6 sm:p-7 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-[#A2845E] dark:text-amber-300 border border-amber-200/50 dark:border-amber-900/40 flex items-center justify-center shrink-0">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-stone-900 dark:text-white text-base sm:text-lg">Zihinsel Ayna</h2>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">
                Bilişsel davranışçı yaklaşımla iç dünyanızın derinlikli psikolojik analizi
              </p>
            </div>
          </div>

          {/* Timeframe selector pill buttons */}
          {isEligible && (
            <div className="flex items-center gap-1 bg-[#FAF8F5] dark:bg-stone-950 p-1 rounded-2xl border border-stone-200/80 dark:border-stone-800 self-start sm:self-auto">
              <button
                onClick={() => handleTimeframeChange("ALL")}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                  timeframe === "ALL" 
                    ? "bg-[#A2845E] text-white shadow-2xs" 
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                }`}
              >
                Tüm Defter
              </button>
              <button
                onClick={() => handleTimeframeChange("30D")}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                  timeframe === "30D" 
                    ? "bg-[#A2845E] text-white shadow-2xs" 
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                }`}
              >
                Son 30 Gün
              </button>
              <button
                onClick={() => handleTimeframeChange("7D")}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold transition-all ${
                  timeframe === "7D" 
                    ? "bg-[#A2845E] text-white shadow-2xs" 
                    : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200"
                }`}
              >
                Son 7 Gün
              </button>
            </div>
          )}
        </div>

        <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans">
          Yazdığınız tüm düşünceleri, duygu yoğunluklarını ve niyetleri bir bütün olarak tarar. Zihninizdeki kalıpları şefkatle fark etmenizi, güçlü yönlerinizi görmenizi ve somut gelişim adımları atmanızı sağlar.
        </p>

        {/* Action activation bar */}
        {isEligible ? (
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-stone-200/60 dark:border-stone-800/60">
            <div className="flex items-center gap-2 text-[11px] text-stone-500 dark:text-stone-400 font-mono">
              <Calendar className="w-3.5 h-3.5 text-[#A2845E]" />
              <span>Kapsam: <strong>{timeframeLabel}</strong> ({filteredEntries.length} kayıt)</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => triggerAnalysis(filteredEntries, timeframeLabel)}
                disabled={loading}
                className={`flex-1 sm:flex-none px-5 py-2.5 rounded-2xl text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all ${
                  loading 
                    ? "bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-600 cursor-not-allowed" 
                    : "bg-[#A2845E] text-white hover:bg-[#8D704E] hover:shadow transform hover:-translate-y-0.5 active:translate-y-0"
                }`}
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                ) : (
                  <Sparkles className="w-4 h-4 text-white animate-pulse" />
                )}
                <span>{reflection ? "Zihinsel Aynayı Yenile" : "Zihinsel Aynayı Başlat"}</span>
              </button>

              {reflection && !loading && (
                <button
                  onClick={copyFullReport}
                  title="Raporu Kopyala"
                  className="px-3.5 py-2.5 rounded-2xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-700 dark:text-stone-300 text-xs font-medium flex items-center gap-1.5 transition-all"
                >
                  {copiedReport ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-stone-500" />}
                  <span className="hidden sm:inline">{copiedReport ? "Kopyalandı" : "Raporu Kopyala"}</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-[#FFF9E5] dark:bg-[#3E3326]/40 border border-[#FFD60A]/35 p-4 rounded-2xl flex flex-col text-left space-y-1.5 mt-2">
            <span className="text-xs font-bold text-[#A2845E] dark:text-[#FFF9E5] flex items-center gap-1.5">
              ⚠️ Yetersiz Düşünce Kaydı (En az 2 kayıt gerekir)
            </span>
            <p className="text-[11px] text-stone-700 dark:text-stone-300 leading-relaxed font-serif italic">
              Zihinsel Aynanızın düşüncelerinizdeki bilişsel örüntüleri, duygusal dengeleri sağlıklı bir şekilde analiz edebilmesi için defterinizde en az 2 adet kayıt bulunmalıdır. Şu an defterinizde <strong>{entries.length}/2</strong> kayıt bulunmaktadır.
            </p>
          </div>
        )}
      </div>

      {/* Loading state diagnostic screen */}
      {loading && (
        <div className="bg-white dark:bg-stone-900 text-stone-800 dark:text-white p-8 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 shadow-md space-y-6 flex flex-col items-center justify-center min-h-64 text-center animate-pulse">
          <div className="relative">
            <Brain className="w-14 h-14 text-[#A2845E] animate-bounce" />
            <Sparkles className="w-5 h-5 text-amber-400 absolute -top-1 -right-1 animate-spin" />
          </div>
          <div className="space-y-3">
            <h4 className="font-bold text-[#A2845E] text-base sm:text-lg">Zihninizin Aynası Parlatılıyor...</h4>
            <div className="bg-[#FFF9E5] dark:bg-[#3E3326]/40 px-6 py-4 rounded-2xl border border-[#FFD60A]/35 text-xs text-stone-800 dark:text-[#FFF9E5] max-w-md leading-relaxed min-h-[4.5rem] flex items-center justify-center font-serif italic shadow-2xs">
              "{scanSteps[loadingStep]}"
            </div>
          </div>
          {/* visual stage indicators */}
          <div className="flex gap-2">
            {scanSteps.map((_, idx) => (
              <div 
                key={idx} 
                className={`h-1.5 rounded-full transition-all ${
                  idx <= loadingStep ? "w-7 bg-[#A2845E]" : "w-3 bg-stone-200 dark:bg-stone-800"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Displaying Service / Server errors */}
      {error && (
        <div className="bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/30 p-4 rounded-2xl text-xs text-rose-700 dark:text-rose-400">
          <strong>Hata Meydana Geldi:</strong> {error}. Lütfen internet bağlantınızı veya API anahtarınızı kontrol ederek tekrar deneyiniz.
        </div>
      )}

      {/* Main Insights display when ready and cached */}
      {reflection && !loading && (
        <div className="space-y-6">
          
          {/* 1. HERO BENTO: Mental Balance & Overall Climate */}
          <div className="bg-white dark:bg-stone-900 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 overflow-hidden shadow-xs">
            {/* Top earthy banner */}
            <div className="bg-[#A2845E] text-white p-6 sm:p-7 space-y-4 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="bg-white/15 p-2.5 rounded-2xl backdrop-blur-xs">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-100/80">Zihinsel İklim & Nabız</span>
                    <h3 className="font-serif text-white font-bold text-lg sm:text-xl">Ruh Hali Aynası</h3>
                  </div>
                </div>

                {/* Score Pill */}
                <div className="bg-white/15 backdrop-blur-xs border border-white/20 px-4 py-2 rounded-2xl flex items-center gap-3 self-start sm:self-auto">
                  <div className="text-right">
                    <span className="text-[10px] uppercase font-bold text-amber-100/90 block">Zihinsel Denge</span>
                    <span className="text-xs font-medium text-white/90">{reflection.balanceStatus || "Dengeli Akış"}</span>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-white text-[#A2845E] font-bold text-base flex items-center justify-center font-mono shadow-xs">
                    %{reflection.mentalBalanceScore || 80}
                  </div>
                </div>
              </div>

              {/* Climate text */}
              <p className="text-xs sm:text-sm text-white/95 leading-relaxed font-serif italic pl-3 border-l-2 border-white/40 whitespace-pre-wrap pt-1">
                "{reflection.overallVibe}"
              </p>

              {/* Generation date & timeframe tag */}
              <div className="flex items-center justify-between pt-2 border-t border-white/15 text-[10px] text-amber-100/70 font-mono">
                <span>Dönem: {reflection.timeframe || "Tüm Zamanlar"} ({reflection.analyzedEntriesCount || entries.length} Düşünce)</span>
                <span>Analiz: {new Date(reflection.generatedAt).toLocaleDateString("tr-TR", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            </div>

            {/* 4 Emotional Metrics Cards (Bento 2x2 grid) */}
            {reflection.emotionalMetrics && (
              <div className="p-6 sm:p-7 grid grid-cols-2 sm:grid-cols-4 gap-3.5 bg-[#FAF8F5] dark:bg-stone-950/60 border-t border-stone-200/60 dark:border-stone-800">
                {/* Clarity */}
                <div className="bg-white dark:bg-stone-900 p-3.5 sm:p-4 rounded-2xl border border-stone-200/70 dark:border-stone-800 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-700 dark:text-stone-300">Zihinsel Berraklık</span>
                    <span className="text-xs font-mono font-bold text-[#A2845E]">%{reflection.emotionalMetrics.clarity}</span>
                  </div>
                  <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-indigo-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${reflection.emotionalMetrics.clarity}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-stone-400">Düşünceleri ayrıştırma</p>
                </div>

                {/* Self-Compassion */}
                <div className="bg-white dark:bg-stone-900 p-3.5 sm:p-4 rounded-2xl border border-stone-200/70 dark:border-stone-800 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-700 dark:text-stone-300">Öz-Şefkat</span>
                    <span className="text-xs font-mono font-bold text-[#A2845E]">%{reflection.emotionalMetrics.selfCompassion}</span>
                  </div>
                  <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-rose-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${reflection.emotionalMetrics.selfCompassion}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-stone-400">Kendine anlayışla yaklaşım</p>
                </div>

                {/* Resilience */}
                <div className="bg-white dark:bg-stone-900 p-3.5 sm:p-4 rounded-2xl border border-stone-200/70 dark:border-stone-800 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-700 dark:text-stone-300">Dayanıklılık</span>
                    <span className="text-xs font-mono font-bold text-[#A2845E]">%{reflection.emotionalMetrics.resilience}</span>
                  </div>
                  <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-emerald-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${reflection.emotionalMetrics.resilience}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-stone-400">Zorlukları aşabilme gücü</p>
                </div>

                {/* Inner Energy */}
                <div className="bg-white dark:bg-stone-900 p-3.5 sm:p-4 rounded-2xl border border-stone-200/70 dark:border-stone-800 space-y-2 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-stone-700 dark:text-stone-300">İçsel Canlılık</span>
                    <span className="text-xs font-mono font-bold text-[#A2845E]">%{reflection.emotionalMetrics.energyLevel}</span>
                  </div>
                  <div className="w-full bg-stone-100 dark:bg-stone-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-amber-500 h-full rounded-full transition-all duration-700"
                      style={{ width: `${reflection.emotionalMetrics.energyLevel}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-stone-400">Ruhsal enerji & motivasyon</p>
                </div>
              </div>
            )}

            {/* Mindful Daily Affirmation / Mantra Callout */}
            {reflection.mindfulAffirmation && (
              <div className="p-5 sm:p-6 bg-[#FFF9E5] dark:bg-[#3E3326]/30 border-t border-[#FFD60A]/35 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-amber-100/80 dark:bg-amber-950/60 text-[#A2845E] dark:text-amber-300 shrink-0 mt-0.5">
                    <HeartHandshake className="w-4 h-4" />
                  </div>
                  <div className="space-y-0.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#A2845E] dark:text-amber-300">
                      Günün Şifalı Öz-Şefkat Olumlaması
                    </span>
                    <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-100 font-serif italic leading-relaxed">
                      "{reflection.mindfulAffirmation}"
                    </p>
                  </div>
                </div>

                <button
                  onClick={copyAffirmation}
                  className="self-end sm:self-center px-3 py-1.5 rounded-xl bg-white/80 dark:bg-stone-900 border border-amber-200/60 dark:border-amber-900/50 text-[11px] font-semibold text-[#A2845E] dark:text-amber-300 hover:bg-white flex items-center gap-1.5 transition-all shrink-0"
                >
                  {copiedAffirmation ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedAffirmation ? "Kopyalandı" : "Olumlamayı Kopyala"}</span>
                </button>
              </div>
            )}
          </div>

          {/* 2. PSYCHOLOGICAL STRENGTHS & RESILIENCE (New Feature) */}
          {reflection.strengths && reflection.strengths.length > 0 && (
            <div className="bg-white dark:bg-stone-900 p-6 sm:p-7 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-4 shadow-xs">
              <div className="flex items-center gap-2.5 pb-2 border-b border-stone-200/60 dark:border-stone-800/60">
                <div className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/40 dark:border-emerald-900/30">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base leading-tight">Gizli Süper Güçleriniz & Dayanıklılık</h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">Yazılarınızda kendini gösteren içsel kaynaklarınız ve erdemleriniz</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {reflection.strengths.map((str, idx) => {
                  const colonIndex = str.indexOf(":");
                  const title = colonIndex > 0 ? str.substring(0, colonIndex).trim() : `İçsel Güç #${idx + 1}`;
                  const desc = colonIndex > 0 ? str.substring(colonIndex + 1).trim() : str;

                  return (
                    <div 
                      key={idx}
                      className="p-4 rounded-2xl bg-[#FAF8F5] dark:bg-stone-950/80 border border-stone-200/80 dark:border-stone-850 space-y-1.5 shadow-2xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                        <h4 className="text-xs sm:text-sm font-bold text-stone-900 dark:text-stone-100">{title}</h4>
                      </div>
                      <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-sans pl-4">
                        {desc}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. COGNITIVE PATTERNS (CBT Analysis) */}
          <div className="bg-white dark:bg-stone-900 p-6 sm:p-7 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-5 shadow-xs" id="insight-patterns-widget">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-stone-200/60 dark:border-stone-800/60">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#A2845E] border border-amber-200/40 dark:border-amber-900/30">
                  <Brain className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base leading-tight">Gözlenen Zihinsel Örüntüler</h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">Yazılarınızda tekrarlanan bilişsel patikalar ve zihinsel eğilimler</p>
                </div>
              </div>
              {reflection.cognitivePatterns && reflection.cognitivePatterns.length > 0 && (
                <span className="self-start sm:self-auto text-[11px] font-mono px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-[#A2845E] dark:text-amber-300 font-bold border border-amber-200/50 dark:border-amber-900/40">
                  {reflection.cognitivePatterns.length} Belirgin Eğilim
                </span>
              )}
            </div>

            <p className="text-xs text-stone-600 dark:text-stone-300 leading-relaxed font-serif italic">
              Bu örüntüler sizi etiketlemek veya eleştirmek için değil; zihninizin otomatik olarak hangi düşünce kalıplarına girdiğini şefkatle fark etmeniz için tespit edilmiştir.
            </p>
            
            {reflection.cognitivePatterns && reflection.cognitivePatterns.length > 0 ? (
              <div className="space-y-3.5 pt-1">
                {reflection.cognitivePatterns.map((pattern, idx) => {
                  const parsed = parsePattern(pattern, idx);
                  return (
                    <div 
                      key={idx} 
                      className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] dark:bg-stone-950/80 border border-stone-200/80 dark:border-stone-850 hover:border-amber-300 dark:hover:border-amber-800/80 transition-all space-y-2.5 shadow-2xs"
                    >
                      <div className="flex items-start gap-3.5">
                        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-amber-100 dark:bg-amber-950/70 text-[#A2845E] dark:text-amber-300 font-mono font-bold flex items-center justify-center shrink-0 text-xs shadow-2xs border border-amber-200/50 dark:border-amber-900/40 mt-0.5">
                          {idx + 1}
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-sm sm:text-base text-stone-900 dark:text-stone-100 font-sans tracking-tight">
                              {parsed.title}
                            </h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-semibold">
                              Bilişsel Kalıp
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-200 leading-relaxed font-sans font-normal pt-1">
                            {parsed.description}
                          </p>
                        </div>
                      </div>

                      {/* Mindful constructive reminder tag */}
                      <div className="pt-2 mt-1 border-t border-stone-200/60 dark:border-stone-850/70 flex items-center gap-1.5 text-[11px] text-[#A2845E] dark:text-amber-300 font-medium">
                        <Lightbulb className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                        <span>Farkındalık İpucu: Bu düşünce kesin bir kural değil; zihnin ürettiği geçici bir hava durumudur.</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-stone-50 dark:bg-stone-950/40 border border-stone-200/60 dark:border-stone-850 text-center py-6 space-y-2">
                <p className="text-xs text-stone-500 dark:text-stone-400 font-serif italic">
                  Henüz kayda değer belirgin bir zihinsel örüntü kümelenemedi.
                </p>
                <p className="text-[11px] text-stone-400">
                  Defterinize birkaç düşünce daha ekledikten sonra zihinsel aynayı yenileyebilirsiniz.
                </p>
              </div>
            )}
          </div>

          {/* 4. ACTIONABLE CHECKLIST (Recommendations) */}
          <div className="bg-white dark:bg-stone-900 p-6 sm:p-7 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-4 shadow-xs" id="insight-advice-widget">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-stone-800/40">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#A2845E] border border-amber-200/40 dark:border-amber-900/30">
                  <ListTodo className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-white text-base leading-tight">Öz-Şefkat Pratik Görevleri</h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">Örüntüleri dönüştürmek için uygulanabilir somut adımlar</p>
                </div>
              </div>

              {totalTasks > 0 && (
                <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                  {completedTasksCount}/{totalTasks} Tamamlandı
                </span>
              )}
            </div>

            {reflection.growthRecommendations && reflection.growthRecommendations.length > 0 ? (
              <div className="space-y-3 pt-1">
                <span className="text-[10px] text-[#8E8E93] font-extrabold uppercase tracking-wider block">
                  Uyguladığınız pratikleri listeden işaretleyebilirsiniz:
                </span>
                {reflection.growthRecommendations.map((recommendation, idx) => {
                  const isDone = completedAdvice[`advice-${idx}`] || false;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleToggleAdvice(idx)}
                      className={`text-left w-full p-3.5 sm:p-4 rounded-2xl border transition-all flex items-start gap-3.5 text-xs sm:text-sm cursor-pointer ${
                        isDone 
                          ? "bg-stone-100/60 border-stone-200 dark:bg-stone-950/40 dark:border-stone-850 text-stone-400 dark:text-stone-500 line-through"
                          : "bg-[#FAF8F5] border-stone-200/80 text-stone-800 hover:bg-stone-100/80 dark:bg-stone-950/80 dark:border-stone-850 dark:text-stone-200 shadow-2xs"
                      }`}
                    >
                      <CheckCircle2 className={`w-4 h-4 mt-0.5 shrink-0 ${
                        isDone ? "text-emerald-500 fill-emerald-100 dark:fill-emerald-950/60" : "text-stone-300 dark:text-stone-700"
                      }`} />
                      <p className="leading-relaxed">{recommendation}</p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-xs text-[#8E8E93] italic">Henüz özel bir gelişim önerisi tasarlanmadı.</p>
            )}
          </div>

          {/* 5. 1-MINUTE MINDFUL BREATHING SPACE (Interactive Grounding Widget) */}
          <div className="bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-600 dark:text-sky-400 border border-sky-200/40 dark:border-sky-900/30">
                  <Wind className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-white text-base leading-tight">1 Dakikalık Zihinsel Dinginlik Molası</h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">4-4-4 Kutu Nefesi ile zihni berraklaştırıp bedene dönün</p>
                </div>
              </div>

              <button
                onClick={() => setIsBreathingActive(!isBreathingActive)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-2xs ${
                  isBreathingActive 
                    ? "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                    : "bg-sky-600 text-white hover:bg-sky-700"
                }`}
              >
                {isBreathingActive ? "Nefesi Durdur" : "Nefesi Başlat"}
              </button>
            </div>

            {isBreathingActive ? (
              <div className="bg-[#FAF8F5] dark:bg-stone-950 p-6 rounded-2xl border border-stone-200/80 dark:border-stone-850 flex flex-col items-center justify-center space-y-4 text-center py-8">
                <div 
                  className={`w-28 h-28 rounded-full flex flex-col items-center justify-center transition-all duration-1000 shadow-md ${
                    breathPhase === "inhale"
                      ? "scale-125 bg-sky-100 dark:bg-sky-950/70 border-4 border-sky-400 text-sky-700 dark:text-sky-300"
                      : breathPhase === "hold"
                      ? "scale-125 bg-amber-100 dark:bg-amber-950/70 border-4 border-amber-400 text-amber-700 dark:text-amber-300"
                      : "scale-90 bg-emerald-100 dark:bg-emerald-950/70 border-4 border-emerald-400 text-emerald-700 dark:text-emerald-300"
                  }`}
                >
                  <span className="text-2xl font-bold font-mono">{breathCountdown}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    {breathPhase === "inhale" ? "Nefes Al" : breathPhase === "hold" ? "Tut" : "Yavaşça Ver"}
                  </span>
                </div>

                <p className="text-xs text-stone-500 dark:text-stone-400 max-w-xs font-serif italic">
                  {breathPhase === "inhale" && "Burnunuzdan sakince ciğerlerinizi doldurun..."}
                  {breathPhase === "hold" && "Dinginliği ve içsel sessizliği hissedin..."}
                  {breathPhase === "exhale" && "Tüm gerginliği ağzınızdan yavaşça serbest bırakın..."}
                </p>
              </div>
            ) : (
              <p className="text-xs text-stone-500 dark:text-stone-400 font-serif italic pl-1">
                Zihinsel aynadaki içgörüleri sindirmek için 1 dakikalık nefes molasını başlatabilirsiniz.
              </p>
            )}
          </div>

          {/* 6. CUSTOM INTROSPECTION CHALLENGE (Answer right here!) */}
          <div className="bg-[#FFF9E5] dark:bg-[#3E3326]/20 p-6 sm:p-7 rounded-[32px] border border-[#FFD60A]/35 space-y-4 shadow-xs" id="insight-challenge-widget">
            <div className="flex items-center gap-2 pb-1">
              <HelpCircle className="w-5 h-5 text-[#A2845E]" />
              <h3 className="font-bold text-stone-900 dark:text-white text-base">Haftalık Öz-Sorgulama Sorusu</h3>
            </div>

            <div className="bg-white dark:bg-stone-950 p-4 rounded-2xl border border-[#E5E5EA] dark:border-stone-850 shadow-2xs">
              <p className="text-xs sm:text-sm text-stone-800 dark:text-stone-200 italic font-serif leading-relaxed font-bold">
                "{reflection.introspectiveQuestion}"
              </p>
            </div>

            {/* Form to submit answer back to daily thought timeline */}
            {answerSubmitted ? (
              <div className="bg-[#FFF9E5] dark:bg-[#3E3326]/40 border border-[#FFD60A]/35 p-4 rounded-2xl flex items-center gap-3">
                <BookmarkCheck className="w-5 h-5 text-[#A2845E] flex-shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-[#A2845E] dark:text-white">Yanıtlama Başarılı!</div>
                  <div className="text-stone-600 dark:text-stone-400 mt-0.5">Bu sorgulamaya verdiğiniz yanıt, değerlendirilmek üzere Günlük Defterinize eklendi.</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitAnswer} className="space-y-3.5">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Zihnini dinle, kalbinden geçen samimi cevabı buraya karala ve defterine yansıt..."
                  className="w-full text-xs sm:text-sm p-4 rounded-2xl bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-850 text-stone-900 dark:text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#A2845E]/20 min-h-24 resize-none transition-all leading-relaxed shadow-2xs"
                  maxLength={1000}
                />
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!answer.trim()}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs ${
                      answer.trim() 
                        ? "bg-[#A2845E] text-white hover:bg-[#8D704E] hover:shadow transform hover:-translate-y-0.5 active:translate-y-0" 
                        : "bg-stone-100 text-stone-400 dark:bg-stone-800 dark:text-stone-600 cursor-not-allowed"
                    }`}
                  >
                    <span>Cevabı Deftere Yansıt</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
          
        </div>
      )}
    </div>
  );
}
