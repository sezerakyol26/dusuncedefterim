import React, { useState, useEffect } from "react";
import { ThoughtEntry, ThoughtCategory, Mood, AISelfReflection } from "../types";
import { Sparkles, Brain, Compass, HelpCircle, ArrowRight, CheckCircle2, Flame, Loader2, ListTodo, BookmarkCheck, Lightbulb, Eye, KeyRound, Check, X } from "lucide-react";
import { aiService, getStoredGeminiKey, setStoredGeminiKey } from "../services/aiService";

interface AIInsightsProps {
  entries: ThoughtEntry[];
  onAddEntry: (content: string, category: ThoughtCategory, mood: Mood) => void;
}

export default function AIInsights({ entries, onAddEntry }: AIInsightsProps) {
  // Loaded state or cached state from localStorage
  const [reflection, setReflection] = useState<AISelfReflection | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Introspective answer box
  const [answer, setAnswer] = useState("");
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  // Interactive advice checkboxes to let the user track completion of ideas
  const [completedAdvice, setCompletedAdvice] = useState<Record<string, boolean>>({});

  // Scan steps for the loading animation
  const scanSteps = [
    "Zihinsel akış ve duygusal ton taranıyor...",
    "Bilişsel eğilimler ve inanç kalıpları kümeleniyor...",
    "Öz-şefkat odaklı gelişim patikaları tasarlanıyor...",
    "Aynanız parlatılıyor, rapor hazırlanıyor..."
  ];

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
      const newReflection: AISelfReflection = {
        overallVibe: data.overallVibe,
        cognitivePatterns: data.cognitivePatterns || [],
        growthRecommendations: data.growthRecommendations || [],
        introspectiveQuestion: data.introspectiveQuestion,
        generatedAt: data.generatedAt || new Date().toISOString()
      };
      
      setReflection(newReflection);
      // Cache details
      localStorage.setItem("thought_defteri_reflection", JSON.stringify(newReflection));
      // Reset advice checklist
      setCompletedAdvice({});
    } catch (err: any) {
      setError(err.message || "Bilinmeyen bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleAdvice = (index: number) => {
    const key = `advice-${index}`;
    setCompletedAdvice(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const parsePattern = (raw: string, idx: number) => {
    // Clean quotes or leading index numbers if present
    const cleanRaw = raw.trim().replace(/^["']/, "").replace(/["']$/, "").replace(/^\d+[\.\)\-\:]\s*/, "");
    
    // Look for separator like ":" or " - "
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
      title: `Zihinsel Kalıp #${idx + 1}`,
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

  // Determine eligibility
  const isEligible = entries.length >= 2;

  return (
    <div className="space-y-6 pb-28 animate-fadeIn" id="ai-insights-container">
      {/* Title block */}
      <div className="bg-white dark:bg-stone-900 p-6 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-3 shadow-sm">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-[#A2845E]" />
          <h2 className="font-bold text-slate-850 dark:text-white text-base">Zihinsel Ayna</h2>
        </div>
        <p className="text-xs text-slate-550 dark:text-slate-400 leading-relaxed">
          Yazmış olduğunuz tüm düşünceleri, hisleri ve niyetleri bir bütün olarak tarar. Bilişsel davranışçı yaklaşımları gözeterek zihninizdeki kalıpları şefkatle görmenizi ve gelişim yolları bulmanızı hedefler.
        </p>

        {/* Action activation bar */}
        {isEligible ? (
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3.5">
            <button
              onClick={triggerAnalysis}
              disabled={loading}
              className={`w-full sm:w-auto px-6 py-3 rounded-2xl text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-all ${
                loading 
                  ? "bg-slate-100 text-slate-400 dark:bg-slate-800 dark:text-slate-600 cursor-not-allowed" 
                  : "bg-[#A2845E] text-white hover:bg-[#8D704E] hover:shadow transform hover:-translate-y-0.5 active:translate-y-0"
              }`}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin text-white" />
              ) : (
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
              )}
              <span>{reflection ? "Zihinsel Aynayı Yenile" : "Zihinsel Aynayı İlk Kez Başlat"}</span>
            </button>
            
            {reflection && !loading && (
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono font-bold">
                Son analiz: {new Date(reflection.generatedAt).toLocaleDateString("tr", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}
              </span>
            )}
          </div>
        ) : (
          <div className="bg-[#FFF9E5] dark:bg-[#3E3326]/40 border border-[#FFD60A]/35 p-4 rounded-2xl flex flex-col text-left space-y-1.5 mt-2">
            <span className="text-xs font-bold text-[#A2845E] dark:text-[#FFF9E5] flex items-center gap-1.5">
              ⚠️ Yetersiz Düşünce Kaydı (En az 2 kayıt gerekir)
            </span>
            <p className="text-[11px] text-stone-700 dark:text-stone-300 leading-relaxed font-serif italic">
              Zihinsel Aynanızın düşüncelerinizdeki bilişsel örüntüleri, duygusal eğilimleri sağlıklı bir şekilde analiz edebilmesi için defterinizde en az 2 adet kayıt bulunmalıdır. Şu an defterinizde <strong>{entries.length}/2</strong> kayıt bulunmaktadır.
            </p>
          </div>
        )}
      </div>

      {/* Loading state diagnostic screen */}
      {loading && (
        <div className="bg-white dark:bg-stone-900 text-stone-800 dark:text-white p-8 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 shadow-lg space-y-6 flex flex-col items-center justify-center min-h-60 text-center animate-pulse">
          <Brain className="w-12 h-12 text-[#A2845E] animate-bounce" />
          <div className="space-y-4">
            <h4 className="font-bold text-[#A2845E] text-base">Zihninizin Aynası Parlatılıyor...</h4>
            <div className="bg-[#FFF9E5] dark:bg-[#3E3326]/40 px-6 py-4 rounded-2xl border border-[#FFD60A]/35 text-xs text-stone-700 dark:text-[#FFF9E5] max-w-sm leading-relaxed min-h-[4rem] flex items-center justify-center font-serif italic">
              "{scanSteps[loadingStep]}"
            </div>
          </div>
          {/* visual stage indicators */}
          <div className="flex gap-2.5">
            {scanSteps.map((_, idx) => (
              <div 
                key={idx} 
                className={`w-3.5 h-1.5 rounded-full transition-all ${
                  idx <= loadingStep ? "bg-[#A2845E]" : "bg-[#E5E5EA]/50 dark:bg-stone-800"
                }`}
              />
            ))}
          </div>
        </div>
      )}

      {/* Displaying Service / Server errors */}
      {error && (
        <div className="bg-rose-50 dark:bg-rose-955/20 border border-rose-100 dark:border-rose-900/30 p-4 rounded-2xl text-xs text-rose-600 dark:text-rose-400">
          <strong>Hata Meydana Geldi:</strong> {error}. Lütfen internet bağlantınızı veya API anahtarınızı kontrol ederek tekrar deneyiniz.
        </div>
      )}

      {/* Main Insights display when ready and cached */}
      {reflection && !loading && (
        <div className="space-y-6">
          
          {/* 1. Overall mental climate (Vibe Widget) - Earthy Bronze Bento Focal Block */}
          <div className="bg-[#A2845E] text-white border border-[#A2845E] p-6 rounded-[32px] relative overflow-hidden shadow-md" id="insight-vibe-widget">
            <div className="relative space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-white/10 p-2 rounded-xl">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-extrabold tracking-wider text-stone-200">Zihinsel İklim Değerlendirmesi</span>
                  <h3 className="font-serif text-white font-bold text-lg">Genel Ruh Hali Aynası</h3>
                </div>
              </div>

              <p className="text-xs text-white/95 leading-relaxed font-serif italic pl-3 border-l-2 border-white/40 whitespace-pre-wrap">
                "{reflection.overallVibe}"
              </p>
            </div>
          </div>

          {/* 2. Gözlenen Zihinsel Örüntüler (Cognitive Patterns) - Readability & Contrast */}
          <div className="bg-white dark:bg-stone-900 p-6 sm:p-7 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-5 shadow-sm" id="insight-patterns-widget">
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
                              Zihinsel Eğilim
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
                        <span>Farkındalık İpucu: Bu düşünce bir gerçek değil, zihnin ürettiği geçici bir hava durumudur.</span>
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

          {/* 3. Actionable checklists (Recommendations) */}
          <div className="bg-white dark:bg-stone-900 p-6 sm:p-7 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 space-y-4 shadow-sm" id="insight-advice-widget">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-stone-800/40">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#A2845E] border border-amber-200/40 dark:border-amber-900/30">
                  <ListTodo className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-850 dark:text-white text-base leading-tight">Öz-Şefkat Pratik Görevleri</h3>
                  <p className="text-[11px] text-stone-500 dark:text-stone-400">Örüntüleri dönüştürmek için uygulanabilir somut adımlar</p>
                </div>
              </div>
              <span className="text-[11px] font-mono text-stone-400">İnteraktif Liste</span>
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
                      className={`text-left w-full p-3.5 rounded-2xl border transition-all flex items-start gap-3.5 text-xs sm:text-sm cursor-pointer ${
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

          {/* 4. Custom Introspection Challenge (Answer right here!) */}
          <div className="bg-[#FFF9E5] dark:bg-[#3E3326]/20 p-6 rounded-[32px] border border-[#FFD60A]/35 space-y-4 shadow-sm" id="insight-challenge-widget">
            <div className="flex items-center gap-2 pb-1">
              <HelpCircle className="w-5 h-5 text-[#A2845E]" />
              <h3 className="font-bold text-slate-850 dark:text-white text-base">Haftalık Öz-Sorgulama Sorusu</h3>
            </div>

            <div className="bg-white dark:bg-stone-950 p-4 rounded-2xl border border-[#E5E5EA] dark:border-stone-850 shadow-sm">
              <p className="text-xs text-slate-705 dark:text-slate-205 italic font-serif leading-relaxed font-bold">
                "{reflection.introspectiveQuestion}"
              </p>
            </div>

            {/* Form to submit answer back to daily thought timeline */}
            {answerSubmitted ? (
              <div className="bg-[#FFF9E5] dark:bg-[#3E3326]/40 border border-[#FFD60A]/35 p-3.5 rounded-2xl flex items-center gap-3">
                <BookmarkCheck className="w-5 h-5 text-[#A2845E] flex-shrink-0" />
                <div className="text-xs">
                  <div className="font-bold text-[#A2845E] dark:text-white">Yanıtlama Başarılı!</div>
                  <div className="text-[#8E8E93] mt-0.5">Bu sorgulamaya verdiğiniz yanıt, değerlendirilmek üzere Günlük Defterinize eklendi.</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmitAnswer} className="space-y-3.5">
                <textarea
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="Zihnini dinle, kalbinden geçen samimi cevabı buraya karala ve defterine yansıt..."
                  className="w-full text-xs p-3.5 rounded-2xl bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-850 text-slate-750 dark:text-white placeholder-slate-450 focus:outline-none focus:ring-2 focus:ring-[#A2845E]/10 min-h-20 resize-none transition-all leading-relaxed"
                  maxLength={1000}
                />
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={!answer.trim()}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                      answer.trim() 
                        ? "bg-[#A2845E] text-white hover:bg-[#8D704E] hover:shadow transform hover:-translate-y-0.5 active:translate-y-0" 
                        : "bg-[#F2F2F7] text-slate-400 dark:bg-stone-800 dark:text-stone-600 cursor-not-allowed"
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
