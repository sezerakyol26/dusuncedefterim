import React, { useState } from "react";
import { ThoughtEntry, ThoughtCategory, Mood } from "../types";
import { CATEGORY_LABELS, MOOD_LABELS, WRITING_PROMPTS } from "../data";
import { 
  Heart, Lightbulb, Compass, Users, AlertCircle, 
  Trash2, Star, Search, Sparkles, BookOpen, Clock, 
  ChevronDown, Check, HelpCircle, RefreshCw, Edit3, X, CheckCircle2
} from "lucide-react";
import { aiService } from "../services/aiService";

interface DailyStreamProps {
  entries: ThoughtEntry[];
  onAddEntry: (content: string, category: ThoughtCategory, mood: Mood) => void;
  onEditEntry: (id: string, content: string, category: ThoughtCategory, mood: Mood) => void;
  onDeleteEntry: (id: string) => void;
  onToggleBookmark: (id: string) => void;
}

export function CategoryIcon({ category, className = "w-4 h-4" }: { category: ThoughtCategory; className?: string }) {
  switch (category) {
    case ThoughtCategory.GRATITUDE:
      return <Heart className={className} />;
    case ThoughtCategory.IDEA:
      return <Lightbulb className={className} />;
    case ThoughtCategory.INTENTION:
      return <Compass className={className} />;
    case ThoughtCategory.REFLECTION:
      return <Users className={className} />;
    case ThoughtCategory.CHALLENGE:
      return <AlertCircle className={className} />;
    default:
      return <Compass className={className} />;
  }
}

// Client helper to format datetime
function formatEntryDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    const now = new Date();
    
    if (date.toDateString() === now.toDateString()) {
      return `Bugün, ${date.toLocaleTimeString("tr", { hour: "2-digit", minute: "2-digit" })}`;
    }
    
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return `Dün, ${date.toLocaleTimeString("tr", { hour: "2-digit", minute: "2-digit" })}`;
    }
    
    return date.toLocaleDateString("tr", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" });
  } catch (e) {
    return "Biraz önce";
  }
}

export default function DailyStream({ 
  entries, 
  onAddEntry, 
  onEditEntry,
  onDeleteEntry, 
  onToggleBookmark 
}: DailyStreamProps) {
  // Add Entry Form States
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<ThoughtCategory>(ThoughtCategory.REFLECTION);
  const [mood, setMood] = useState<Mood>(Mood.CALM);
  const [activePromptId, setActivePromptId] = useState<string | null>(null);
  const [activePromptText, setActivePromptText] = useState<string | null>(null);

  // Filter and Search States
  const [filterCategory, setFilterCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  // Edit Note States
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [editCategory, setEditCategory] = useState<ThoughtCategory>(ThoughtCategory.REFLECTION);
  const [editMood, setEditMood] = useState<Mood>(Mood.CALM);

  // CBT Reframe loading states (per entry)
  const [reframeLoading, setReframeLoading] = useState<Record<string, boolean>>({});
  const [reframeResults, setReframeResults] = useState<Record<string, { reframed: string; distortionType: string }>>({});
  const [reframeErrors, setReframeErrors] = useState<Record<string, string>>({});

  // Prompt Selector toggle
  const [showPromptsSelector, setShowPromptsSelector] = useState(false);

  // CBT Reframer triggers using aiService
  const triggerReframe = async (id: string, text: string) => {
    setReframeLoading(prev => ({ ...prev, [id]: true }));
    setReframeErrors(prev => ({ ...prev, [id]: "" }));
    try {
      const data = await aiService.generateReframe(text);
      setReframeResults(prev => ({
        ...prev,
        [id]: {
          reframed: data.reframed,
          distortionType: data.distortionType
        }
      }));
    } catch (err: any) {
      setReframeErrors(prev => ({ ...prev, [id]: err.message || "Hata oluştu." }));
    } finally {
      setReframeLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  // Select writing prompt helper
  const handleSelectPrompt = (promptId: string, promptText: string, suggestedCat: ThoughtCategory, suggestedMood?: Mood) => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    let submissionContent = content;
    if (activePromptText) {
      submissionContent = `[Soru: ${activePromptText}]\n\n${content}`;
    }

    onAddEntry(submissionContent, category, mood);
    setContent("");
    handleClearPrompt();
  };

  // Edit Handlers
  const handleStartEdit = (entry: ThoughtEntry) => {
    setEditingId(entry.id);
    setEditContent(entry.content);
    setEditCategory(entry.category);
    setEditMood(entry.mood);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditContent("");
  };

  const handleSaveEdit = (id: string) => {
    if (!editContent.trim()) return;
    onEditEntry(id, editContent.trim(), editCategory, editMood);
    setEditingId(null);
  };

  // Filtered entries calculation
  const getFilteredEntries = () => {
    return entries.filter(entry => {
      const matchesCategory = filterCategory === "ALL" 
        || (filterCategory === "BOOKMARKED" && entry.isBookmarked)
        || entry.category === filterCategory;

      const matchesSearch = searchQuery.trim() === ""
        || entry.content.toLowerCase().includes(searchQuery.toLowerCase())
        || entry.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  };

  const filteredEntries = getFilteredEntries();

  return (
    <div className="space-y-6 pb-28" id="daily-stream-container">
      
      {/* 1. iOS Card Form: Write New Thought */}
      <div className="bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-800/80 p-5 sm:p-6 rounded-[32px] shadow-sm" id="write-thought-widget">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-stone-800/50">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A2845E] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#A2845E]"></span>
            </span>
            <span className="text-sm font-semibold text-slate-800 dark:text-white">Şimdi Zihnini Hafiflet</span>
          </div>

          <button 
            type="button"
            onClick={() => setShowPromptsSelector(!showPromptsSelector)}
            className="text-xs text-[#A2845E] dark:text-[#c4a682] font-semibold hover:underline flex items-center gap-1.5 p-1 rounded-lg hover:bg-[#F2F2F7] dark:hover:bg-stone-800 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Yazma Yönergesi Seç
          </button>
        </div>

        {/* Dynamic Prompts Box */}
        {showPromptsSelector && (
          <div className="bg-[#F2F2F7] dark:bg-[#1C1C1E] border border-[#E5E5EA] dark:border-stone-800 p-3 rounded-2xl mt-4 space-y-2.5 animate-fadeIn">
            <span className="text-[10px] uppercase tracking-wider font-extrabold text-[#A2845E] dark:text-[#c4a682]">İlham Veren Konular</span>
            <div className="grid grid-cols-1 gap-2 max-h-56 overflow-y-auto pr-1">
              {WRITING_PROMPTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => handleSelectPrompt(p.id, p.prompt, p.category, p.suggestedMood)}
                  className="text-left text-xs p-2.5 rounded-xl border border-white dark:border-stone-800 dark:bg-stone-950 bg-white hover:border-[#A2845E]/40 hover:bg-[#FFF9E5]/30 dark:hover:border-[#A2845E]/30 transition-all flex items-start justify-between group cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-slate-700 dark:text-slate-300 block">{p.title}</span>
                    <span className="text-slate-500 dark:text-slate-400 font-normal leading-relaxed">{p.prompt}</span>
                  </div>
                  <Check className="w-3.5 h-3.5 text-[#A2845E] opacity-0 group-hover:opacity-100 transition-opacity ml-1.5 flex-shrink-0 mt-0.5" />
                </button>
              ))}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 mt-3">
          {/* Chosen writing guide ribbon */}
          {activePromptText && (
            <div className="bg-[#FFF9E5] dark:bg-[#3E3326]/40 border border-[#FFD60A]/40 dark:border-[#A2845E]/30 px-3 py-2.5 rounded-xl flex items-start justify-between text-xs text-slate-700 dark:text-[#FFF9E5]">
              <span className="leading-relaxed font-semibold">✨ {activePromptText}</span>
              <button 
                type="button" 
                onClick={handleClearPrompt}
                className="text-[10px] font-bold text-slate-400 dark:text-slate-500 hover:text-rose-500 bg-white dark:bg-stone-855 p-1 rounded-full border border-slate-100 dark:border-stone-800 flex-shrink-0 ml-2 cursor-pointer"
                title="İlhamı temizle"
              >
                ✕
              </button>
            </div>
          )}

          {/* Text input area */}
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={activePromptText ? "Bu soru sence neleri canlandırıyor? Buraya dök zihnini..." : "Şu an aklından neler geçiyor? Özgürce yaz ve zihnini hafiflet..."}
            className="w-full text-sm p-4 rounded-2xl bg-[#FDFCFB] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A2845E]/20 focus:border-[#A2845E] min-h-24 resize-none transition-all leading-relaxed"
            maxLength={1000}
          />

          {/* Form metadata options (Category, Mood) */}
          <div className="space-y-3">
            
            {/* Category selection */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-extrabold text-[#8E8E93] uppercase tracking-widest block">KATEGORİ</span>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 shadow-sm border border-[#E5E5EA] dark:border-stone-800 p-1.5 rounded-xl bg-[#F2F2F7] dark:bg-stone-950">
                {Object.keys(CATEGORY_LABELS).map((catName) => {
                  const cat = catName as ThoughtCategory;
                  const value = CATEGORY_LABELS[cat];
                  const isSelected = category === cat;
                  
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setCategory(cat)}
                      title={value.label}
                      className={`py-2 rounded-lg flex flex-col items-center justify-center transition-all cursor-pointer ${
                        isSelected 
                          ? "bg-[#A2845E] text-white shadow-sm" 
                          : "text-slate-500 hover:text-slate-700 hover:bg-slate-100/50 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800/40"
                      }`}
                    >
                      <CategoryIcon category={cat} className="w-4 h-4" />
                      <span className="text-[9px] font-bold mt-1 tracking-tight truncate max-w-full px-0.5">
                        {value.label.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Rich Emotion / Mood picker (All 13 Emotions) */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-[#8E8E93] uppercase tracking-widest block">ŞU ANKİ HİS</span>
                <span className="text-xs font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1.5">
                  <span className="text-sm">{MOOD_LABELS[mood]?.emoji}</span>
                  <span className="text-[#A2845E] dark:text-amber-400 font-bold">{MOOD_LABELS[mood]?.label}</span>
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5 p-2 rounded-2xl border border-[#E5E5EA] dark:border-stone-800 bg-[#F2F2F7] dark:bg-stone-950 max-h-40 overflow-y-auto">
                {Object.keys(MOOD_LABELS).map((mName) => {
                  const m = mName as Mood;
                  const value = MOOD_LABELS[m];
                  const isSelected = mood === m;

                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMood(m)}
                      title={value.label}
                      className={`px-3 py-1.5 rounded-xl text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                        isSelected 
                          ? "bg-white dark:bg-stone-800 shadow-sm border border-amber-400 font-bold text-stone-900 dark:text-stone-100 scale-102" 
                          : "bg-white/60 dark:bg-stone-900/60 border border-transparent text-stone-600 dark:text-stone-400 hover:bg-white dark:hover:bg-stone-800 hover:text-stone-900 dark:hover:text-stone-100 opacity-80 hover:opacity-100"
                      }`}
                    >
                      <span className="text-base select-none leading-none">{value.emoji}</span>
                      <span className="text-[11px] leading-tight font-medium">{value.label.split('/')[0].trim()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between pt-2 border-t border-[#E5E5EA] dark:border-stone-800/40">
            <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
              {content.length}/1000 karakter
            </span>
            <button
              type="submit"
              disabled={!content.trim()}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all cursor-pointer ${
                content.trim() 
                  ? "bg-[#A2845E] text-white hover:bg-[#8D704E] hover:shadow transform hover:-translate-y-0.5 active:translate-y-0" 
                  : "bg-[#F2F2F7] text-slate-400 dark:bg-stone-800 dark:text-slate-600 cursor-not-allowed"
              }`}
            >
              <span>Deftere Kaydet</span>
              {!activePromptText ? <Clock className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
            </button>
          </div>
        </form>
      </div>

      {/* 2. List & Filtering Section */}
      <div className="space-y-4">
        {/* iOS style Search Bar */}
        <div className="bg-[#F2F2F7] dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-800/80 p-3 rounded-[24px] flex flex-col sm:flex-row items-center gap-3" id="filters-container-box">
          <div className="relative w-full sm:flex-1">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-[#8E8E93]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Düşüncelerini ara..."
              className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 text-slate-700 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A2845E]/10"
            />
          </div>

          {searchQuery && (
            <button 
              onClick={() => setSearchQuery("")}
              className="text-[10px] text-[#A2845E] hover:text-[#8D704E] bg-white dark:bg-stone-800 px-2.5 py-1 rounded-lg border border-[#E5E5EA] cursor-pointer"
            >
              Aramayı sıfırla
            </button>
          )}
        </div>

        {/* Categories Horizontal Scrolling Pill Selectors */}
        <div className="overflow-x-auto scrollbar-none flex gap-1.5 pb-1 px-0.5">
          <button
            onClick={() => setFilterCategory("ALL")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
              filterCategory === "ALL" 
                ? "bg-[#A2845E] border-[#A2845E] text-white" 
                : "bg-white border-[#E5E5EA] text-slate-600 hover:bg-slate-50 dark:bg-stone-900 dark:border-stone-800 dark:text-slate-400"
            }`}
          >
            Tümü ({entries.length})
          </button>

          <button
            onClick={() => setFilterCategory("BOOKMARKED")}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1 cursor-pointer ${
              filterCategory === "BOOKMARKED" 
                ? "bg-amber-500 border-amber-500 text-white shadow-sm" 
                : "bg-white border-[#E5E5EA] text-amber-500 dark:bg-stone-900 dark:border-stone-800 dark:hover:bg-slate-900/60"
            }`}
          >
            <Star className="w-3.5 h-3.5 fill-current" />
            Yıldızlılar ({entries.filter(e => e.isBookmarked).length})
          </button>

          {Object.keys(CATEGORY_LABELS).map((catName) => {
            const cat = catName as ThoughtCategory;
            const detail = CATEGORY_LABELS[cat];
            const isSelected = filterCategory === cat;
            const count = entries.filter(e => e.category === cat).length;

            return (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border flex items-center gap-1.5 cursor-pointer ${
                  isSelected 
                    ? "bg-[#A2845E] border-[#A2845E] text-white" 
                    : "bg-white border-[#E5E5EA] text-slate-600 hover:bg-slate-50 dark:bg-stone-900 dark:border-stone-800 dark:text-slate-400"
                }`}
              >
                <CategoryIcon category={cat} className="w-3.5 h-3.5" />
                <span>{detail.label.split(' ')[0]}</span>
                <span className="opacity-60 text-[10px]">({count})</span>
              </button>
            );
          })}
        </div>

        {/* 3. Thoughts Cards Stream List */}
        <div className="space-y-4" id="entries-flow-list">
          {filteredEntries.length === 0 ? (
            <div className="bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/80 p-10 rounded-3xl text-center space-y-3" id="empty-state">
              <span className="text-4xl block">🍃</span>
              <h3 className="font-semibold text-slate-700 dark:text-slate-300">Aradığın düşünce bulunamadı</h3>
              <p className="text-xs text-slate-400 dark:text-slate-500 max-w-xs mx-auto leading-relaxed">
                Bu kategori veya filtreyle eşleşen bir yazı bulunmuyor. Yeni bir şeyler karalayarak burayı canlandırabilirsin.
              </p>
            </div>
          ) : (
            filteredEntries.map((entry) => {
              const isEditingThis = editingId === entry.id;
              const catDetail = CATEGORY_LABELS[entry.category] || CATEGORY_LABELS[ThoughtCategory.REFLECTION];
              const moodDetail = MOOD_LABELS[entry.mood] || MOOD_LABELS[Mood.CALM];
              const isChallenge = entry.category === ThoughtCategory.CHALLENGE;
              const hasReframe = reframeResults[entry.id];
              const isReframeLoading = reframeLoading[entry.id];
              const reframeError = reframeErrors[entry.id];

              return (
                <div 
                  key={entry.id}
                  className="bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-800/80 rounded-[32px] p-5 sm:p-6 hover:shadow-md transition-all relative overflow-hidden"
                  id={`thought-card-${entry.id}`}
                >
                  {/* Category Glow Line at top boundary */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 ${catDetail.color.replace('text-', 'bg-')}`} />

                  {isEditingThis ? (
                    /* Inline Editing Mode */
                    <div className="space-y-4 pt-1 animate-fadeIn">
                      <div className="flex items-center justify-between pb-2 border-b border-[#E5E5EA] dark:border-stone-800/60">
                        <div className="flex items-center gap-2">
                          <Edit3 className="w-4 h-4 text-[#A2845E]" />
                          <h4 className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider">
                            Düşünceyi Düzenle
                          </h4>
                        </div>
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
                          title="Vazgeç"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Edit Content */}
                      <textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="w-full text-sm p-3.5 rounded-2xl bg-[#FDFCFB] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A2845E]/20 focus:border-[#A2845E] min-h-28 resize-none leading-relaxed"
                        maxLength={1000}
                      />

                      {/* Edit Category */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold text-[#8E8E93] uppercase tracking-wider block">Kategori</span>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 p-1 rounded-xl bg-[#F2F2F7] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800">
                          {Object.keys(CATEGORY_LABELS).map((catName) => {
                            const cat = catName as ThoughtCategory;
                            const value = CATEGORY_LABELS[cat];
                            const isSelected = editCategory === cat;
                            return (
                              <button
                                key={cat}
                                type="button"
                                onClick={() => setEditCategory(cat)}
                                className={`py-1.5 rounded-lg flex items-center justify-center gap-1 text-[11px] font-semibold transition-all cursor-pointer ${
                                  isSelected 
                                    ? "bg-[#A2845E] text-white shadow-xs" 
                                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-200/50"
                                }`}
                              >
                                <CategoryIcon category={cat} className="w-3.5 h-3.5" />
                                <span>{value.label.split(' ')[0]}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Edit Mood */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-extrabold text-[#8E8E93] uppercase tracking-wider block">Duygu</span>
                        <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-[#F2F2F7] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 max-h-32 overflow-y-auto">
                          {Object.keys(MOOD_LABELS).map((mName) => {
                            const m = mName as Mood;
                            const val = MOOD_LABELS[m];
                            const isSelected = editMood === m;
                            return (
                              <button
                                key={m}
                                type="button"
                                onClick={() => setEditMood(m)}
                                className={`px-2.5 py-1 rounded-lg text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                                  isSelected 
                                    ? "bg-white dark:bg-stone-800 border border-amber-400 font-bold text-stone-900 dark:text-stone-100 shadow-xs" 
                                    : "bg-white/50 dark:bg-stone-900/50 text-stone-600 dark:text-stone-400 opacity-75 hover:opacity-100"
                                }`}
                              >
                                <span>{val.emoji}</span>
                                <span className="text-[10px]">{val.label.split('/')[0].trim()}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Edit Save / Cancel buttons */}
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5E5EA] dark:border-stone-800/60">
                        <button
                          type="button"
                          onClick={handleCancelEdit}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 cursor-pointer"
                        >
                          Vazgeç
                        </button>
                        <button
                          type="button"
                          onClick={() => handleSaveEdit(entry.id)}
                          disabled={!editContent.trim()}
                          className="px-5 py-2 rounded-xl text-xs font-bold bg-[#A2845E] text-white hover:bg-[#8D704E] flex items-center gap-1.5 shadow-sm cursor-pointer disabled:opacity-50"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Değişiklikleri Kaydet</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Normal View Mode */
                    <>
                      {/* Header Row */}
                      <div className="flex items-center justify-between pb-3.5 border-b border-[#E5E5EA] dark:border-stone-800/40">
                        <div className="flex items-center gap-2">
                          <div className={`p-2 rounded-xl bg-[#F2F2F7] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 ${catDetail.color}`}>
                            <CategoryIcon category={entry.category} className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-[10px] font-extrabold text-[#8E8E93] uppercase tracking-wider block">Kategori</span>
                            <span className="text-xs font-bold text-slate-800 dark:text-white capitalize">
                              {catDetail.label}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 bg-[#F2F2F7] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 px-3 py-1 rounded-full text-xs">
                          <span className="text-base select-none leading-none">{moodDetail.emoji}</span>
                          <span className="font-bold text-[#8E8E93] dark:text-slate-400 text-[11px]">
                            {moodDetail.label.split('/')[0].trim()}
                          </span>
                        </div>
                      </div>

                      {/* Thought content container */}
                      <div className="py-4 text-sm text-slate-700 dark:text-slate-350 leading-relaxed font-normal whitespace-pre-wrap">
                        {entry.content}
                      </div>

                      {/* Under Card - Interactive Reframe Panel for CHALLENGE category */}
                      {isChallenge && (
                        <div className="mt-2.5 mb-2 px-1">
                          {!hasReframe && !isReframeLoading && (
                            <button
                              onClick={() => triggerReframe(entry.id, entry.content)}
                              className="w-full text-xs font-bold py-3 border border-[#E5E5EA] bg-[#F2F2F7] text-[#A2845E] dark:border-stone-800 dark:bg-stone-950 dark:text-amber-400 rounded-2xl hover:bg-[#FFF9E5]/20 flex items-center justify-center gap-1.5 group transition-all cursor-pointer"
                            >
                              <Sparkles className="w-3.5 h-3.5 text-[#A2845E] group-hover:scale-110 transition-transform" />
                              <span>Bu Düşünceyi Yapıcı Olarak Yeniden Çerçevele (AI CBT)</span>
                            </button>
                          )}

                          {/* Loading reflection indicator */}
                          {isReframeLoading && (
                            <div className="w-full text-xs font-semibold py-3 bg-[#F2F2F7] dark:bg-stone-950/55 border border-[#E5E5EA] dark:border-stone-800 text-slate-500 dark:text-slate-400 rounded-2xl flex items-center justify-center gap-2 animate-pulse">
                              <RefreshCw className="w-3.5 h-3.5 animate-spin text-slate-400" />
                              <span>Mevcut bilişsel örüntü inceleniyor, şefkatli bir alternatif aranıyor...</span>
                            </div>
                          )}

                          {/* CBT Reframe Result Box */}
                          {hasReframe && (
                            <div className="bg-[#FFF9E5] dark:bg-[#3E3326]/40 border-l-4 border-[#A2845E] p-4 rounded-2xl space-y-2 animate-fadeIn">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase font-bold text-[#A2845E] dark:text-[#c4a682] tracking-wider flex items-center gap-1">
                                  <Sparkles className="w-3 h-3 fill-current animate-pulse" />
                                  Zihinsel Ayna Yeniden Çerçevesi (CBT)
                                </span>
                                <span className="text-[9px] bg-[#FFF9E5]/80 border border-[#E5E5EA] dark:border-stone-800 px-2 py-0.5 rounded-full text-[#A2845E] font-semibold">
                                  {hasReframe.distortionType}
                                </span>
                              </div>
                              <p className="text-xs text-slate-700 dark:text-slate-305 leading-relaxed font-serif italic pl-1 border-l-2 border-[#A2845E]/40">
                                "{hasReframe.reframed}"
                              </p>
                            </div>
                          )}

                          {/* Handling Reframe errors */}
                          {reframeError && (
                            <p className="text-[10px] text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/20 px-3 py-1.5 rounded-xl">
                              Yeniden yapılandırma başarısız oldu: {reframeError}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Actions Row at bottom */}
                      <div className="flex items-center justify-between pt-3 border-t border-slate-50 dark:border-slate-800/40 mt-1">
                        <div className="flex items-center gap-1.5 font-mono text-[10px] text-slate-400 dark:text-slate-500">
                          <Clock className="w-3 h-3" />
                          <span>{formatEntryDate(entry.createdAt)}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          {/* Bookmark Button */}
                          <button
                            onClick={() => onToggleBookmark(entry.id)}
                            className={`p-2 rounded-xl border border-slate-100 dark:border-slate-800/50 hover:bg-slate-50 dark:hover:bg-slate-900 leading-none transition-all cursor-pointer ${
                              entry.isBookmarked 
                                ? "text-amber-500 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-950/10 border-amber-100" 
                                : "text-slate-400 dark:text-slate-500"
                            }`}
                            title={entry.isBookmarked ? "Yıldızı kaldır" : "Öne yıldızla"}
                          >
                            <Star className={`w-4 h-4 ${entry.isBookmarked ? "fill-current" : ""}`} />
                          </button>

                          {/* Edit Button */}
                          <button
                            onClick={() => handleStartEdit(entry)}
                            className="p-2 rounded-xl border border-slate-100 dark:border-slate-800/50 hover:bg-amber-50 dark:hover:bg-amber-950/20 text-slate-400 dark:text-slate-500 hover:text-[#A2845E] dark:hover:text-amber-400 leading-none transition-all cursor-pointer"
                            title="Düşünceyi düzenle"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          {/* Delete Button */}
                          <button
                            onClick={() => onDeleteEntry(entry.id)}
                            className="p-2 rounded-xl border border-slate-150 dark:border-slate-800/50 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-slate-400 dark:text-slate-500 hover:text-rose-500 dark:hover:text-rose-400 leading-none transition-all cursor-pointer"
                            title="Düşünceyi sil"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
