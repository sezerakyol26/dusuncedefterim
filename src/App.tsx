import React, { useState, useEffect } from "react";
import { ThoughtEntry, ThoughtCategory, Mood } from "./types";
import { INITIAL_THOUGHTS } from "./data";
import DailyStream from "./components/DailyStream";
import AIInsights from "./components/AIInsights";
import Inspiration from "./components/Inspiration";
import StatsDashboard from "./components/StatsDashboard";
import AppBrandIcon from "./components/AppBrandIcon";
import { 
  BookOpen, Sparkles, Brain, BarChart2, 
  RefreshCw, Sun, Moon, Calendar, Quote, HelpCircle,
  Cloud, CloudOff, Share, Download, Upload, FileText, ArrowRightLeft, Plus, KeyRound, Check, X, CheckCircle2, AlertCircle
} from "lucide-react";
import { collection, query, where, onSnapshot, doc, setDoc, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { aiService, getStoredGeminiKey, setStoredGeminiKey } from "./services/aiService";

enum OperationType {
  CREATE = "create",
  UPDATE = "update",
  DELETE = "delete",
  LIST = "list",
  GET = "get",
  WRITE = "write",
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: null,
      email: null,
      emailVerified: null,
      isAnonymous: null,
      tenantId: null,
      providerInfo: [],
    },
    operationType,
    path,
  };
  console.warn("Firestore Error:", JSON.stringify(errInfo));
}

export default function App() {
  // 1. Core Diary Entries State
  const [entries, setEntries] = useState<ThoughtEntry[]>([]);

  // 2. Active Tab Routing State: timeline | inspiration | insights | stats
  const [activeTab, setActiveTab] = useState<"timeline" | "inspiration" | "insights" | "stats">("timeline");

  // 3. System Theme State (Light / Dark)
  const [darkMode, setDarkMode] = useState(false);

  // 4. Daily Inspiring Quote State
  const [quoteData, setQuoteData] = useState<{ quote: string; author: string; journalPrompt: string } | null>(null);
  const [loadingQuote, setLoadingQuote] = useState(false);

  // 5. Cloud Backup & Sync States
  const [syncActive, setSyncActive] = useState(() => localStorage.getItem("thought_defteri_sync_active") === "true");
  const [syncCode, setSyncCode] = useState(() => localStorage.getItem("thought_defteri_sync_code") || "");
  const [isSyncDialogOpen, setIsSyncDialogOpen] = useState(false);
  const [inputSyncCode, setInputSyncCode] = useState("");
  const [syncLoading, setSyncLoading] = useState(false);
  const [syncMessage, setSyncMessage] = useState<string | null>(null);
  const [syncError, setSyncError] = useState<string | null>(null);
  const [isBatchTextOpen, setIsBatchTextOpen] = useState(false);
  const [batchTextInput, setBatchTextInput] = useState("");
  const [importSuccessMsg, setImportSuccessMsg] = useState<string | null>(null);

  // 6. iOS and PWA Installation States
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);
  const [isInstallDialogOpen, setIsInstallDialogOpen] = useState(false);

  // 7. AI & Gemini API Settings State
  const [isAiDialogOpen, setIsAiDialogOpen] = useState(false);
  const [geminiApiKeyInput, setGeminiApiKeyInput] = useState(() => getStoredGeminiKey());
  const [aiTestResult, setAiTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [aiTesting, setAiTesting] = useState(false);
  const [aiSavedNotice, setAiSavedNotice] = useState(false);

  // iOS and PWA standalone detection
  useEffect(() => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    const ios = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(ios);

    // Check if app is running in standalone PWA mode
    const standalone = (window.navigator as any).standalone || window.matchMedia('(display-mode: standalone)').matches;
    setIsStandalone(standalone);

    // If on iOS and not standalone, and session has not dismissed the prompt yet, show it
    const dismissed = sessionStorage.getItem("thought_defteri_ios_prompt_dismissed") === "true";
    if (ios && !standalone && !dismissed) {
      setShowIOSPrompt(true);
    }
  }, []);

  // Load initial settings and check localStorage on mount
  useEffect(() => {
    // A. Theme setting
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

    // B. Logs database seed checking
    const cachedEntries = localStorage.getItem("thought_defteri_entries");
    // B. Logs database seed checking & subscription
    let unsubscribe: (() => void) | null = null;
    
    if (syncActive && syncCode && db) {
      setSyncLoading(true);
      try {
        const q = query(
          collection(db, "entries"),
          where("syncCode", "==", syncCode)
        );
        
        unsubscribe = onSnapshot(q, (snapshot) => {
          const firestoreEntries: ThoughtEntry[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            firestoreEntries.push({
              id: doc.id,
              content: data.content,
              category: data.category as ThoughtCategory,
              mood: data.mood as Mood,
              createdAt: data.createdAt,
              isBookmarked: data.isBookmarked || false
            });
          });
          
          // Sort by date descending
          firestoreEntries.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          
          setEntries(firestoreEntries);
          localStorage.setItem("thought_defteri_entries", JSON.stringify(firestoreEntries));
          setSyncLoading(false);
        }, (error) => {
          console.error("Firestore real-time sync subscription error:", error);
          setSyncError("Bulut sunucusu senkronizasyon hatası.");
          setSyncLoading(false);
          handleFirestoreError(error, OperationType.LIST, "entries");
        });
      } catch (err: any) {
        console.error("Firestore onSnapshot error:", err);
        setSyncError(err.message);
        setSyncLoading(false);
        handleFirestoreError(err, OperationType.LIST, "entries");
      }
    } else {
      // Standalone mode or cached offline state
      const cachedEntries = localStorage.getItem("thought_defteri_entries");
      if (cachedEntries) {
        try {
          setEntries(JSON.parse(cachedEntries));
        } catch (e) {
          setEntries(INITIAL_THOUGHTS);
        }
      } else {
        setEntries(INITIAL_THOUGHTS);
        localStorage.setItem("thought_defteri_entries", JSON.stringify(INITIAL_THOUGHTS));
      }
    }

    // C. Daily Quote fetching
    const cachedQuote = localStorage.getItem("thought_defteri_quote");
    const cachedQuoteTime = localStorage.getItem("thought_defteri_quote_timestamp");
    const isStale = !cachedQuoteTime || (Date.now() - parseInt(cachedQuoteTime)) > 12 * 3600000; // 12 hours check

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
      // Offline fallback quote Turkish
      setQuoteData({
        quote: "Kendinizi dinlemek, hayatın gürültüsü içinde duyabileceğiniz en güzel fısıltıdır.",
        author: "Farkındalık Bilgeliği",
        journalPrompt: "Bugün zihninizin arka planında en çok hangi düşünce veya kaygının yankılandığını fark ediyorsunuz?"
      });
    } finally {
      setLoadingQuote(false);
    }
  };

  const updateThemeColor = (isDark: boolean) => {
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute("content", isDark ? "#0c0a09" : "#FDFBF7");
    }
  };

  // Toggle Theme helper
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

  // Cloud Sync Handler Functions
  const enableSyncWithNewCode = async () => {
    setSyncLoading(true);
    setSyncError(null);
    setSyncMessage(null);
    try {
      const newCode = "DF-" + Math.floor(100000 + Math.random() * 900000);
      
      // Upload existing entries as a migration
      for (const entry of entries) {
        try {
          await setDoc(doc(db, "entries", entry.id), {
            ...entry,
            syncCode: newCode
          });
        } catch (dbErr: any) {
          handleFirestoreError(dbErr, OperationType.WRITE, `entries/${entry.id}`);
        }
      }

      localStorage.setItem("thought_defteri_sync_code", newCode);
      localStorage.setItem("thought_defteri_sync_active", "true");
      
      setSyncCode(newCode);
      setSyncActive(true);
      setSyncMessage(`Yeni bulut eşitleme kodunuz oluşturuldu: ${newCode}. Bu kodu diğer cihazlarınıza girerek senkronize kalabilirsiniz!`);
    } catch (err: any) {
      console.error("Create Cloud Code Error:", err);
      setSyncError("Yeni eşitleme kodu oluşturulurken bir hata oluştu: " + err.message);
    } finally {
      setSyncLoading(false);
    }
  };

  const enableSyncWithExistingCode = async (enteredCode: string) => {
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
      } catch (dbErr: any) {
        handleFirestoreError(dbErr, OperationType.LIST, "entries");
        return;
      }

      const fetchedEntries: ThoughtEntry[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        fetchedEntries.push({
          id: doc.id,
          content: data.content,
          category: data.category as ThoughtCategory,
          mood: data.mood as Mood,
          createdAt: data.createdAt,
          isBookmarked: data.isBookmarked || false
        });
      });

      // Sort
      fetchedEntries.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

      // Merge current entries into the cloud snapshot if there are any that aren't on the cloud yet
      const existingIds = new Set(fetchedEntries.map(e => e.id));
      const localOnly = entries.filter((e) => !existingIds.has(e.id));

      if (localOnly.length > 0) {
        for (const entry of localOnly) {
          try {
            await setDoc(doc(db, "entries", entry.id), {
              ...entry,
              syncCode: trimmed
            });
          } catch (dbErr: any) {
            handleFirestoreError(dbErr, OperationType.WRITE, `entries/${entry.id}`);
          }
          fetchedEntries.unshift(entry);
        }
        fetchedEntries.sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      }

      setEntries(fetchedEntries);
      localStorage.setItem("thought_defteri_entries", JSON.stringify(fetchedEntries));
      localStorage.setItem("thought_defteri_sync_code", trimmed);
      localStorage.setItem("thought_defteri_sync_active", "true");
      
      setSyncCode(trimmed);
      setSyncActive(true);
      setSyncMessage("Bulut senkronizasyonu başarıyla etkinleştirildi! Tüm verileriniz birleştirildi ve eşitlendi.");
      setIsSyncDialogOpen(false);
    } catch (err: any) {
      console.error("Connect Cloud Sync Error:", err);
      setSyncError("Bulut sunucusuna bağlanırken hata oluştu: " + err.message);
    } finally {
      setSyncLoading(false);
    }
  };

  const disableSync = () => {
    localStorage.removeItem("thought_defteri_sync_active");
    setSyncActive(false);
    setSyncMessage("Senkronizasyon devre dışı bırakıldı. Yazılarınız yerel olarak kalmaya devam edecek.");
  };

  const handleExportJSON = () => {
    const backup = {
      appName: "Düşünce Defteri",
      version: "2.0",
      exportDate: new Date().toISOString(),
      entriesCount: entries.length,
      entries
    };
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `dusunce-defteri-yedek-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(link);
    setImportSuccessMsg(`Tüm düşünceleriniz (${entries.length} not) JSON dosyası olarak indirildi!`);
    setTimeout(() => setImportSuccessMsg(null), 4000);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        let importedList: any[] = [];
        if (Array.isArray(parsed)) {
          importedList = parsed;
        } else if (parsed && Array.isArray(parsed.entries)) {
          importedList = parsed.entries;
        } else {
          throw new Error("Geçerli bir Düşünce Defteri yedek formatı bulunamadı.");
        }

        const validEntries: ThoughtEntry[] = importedList.map((item, idx) => ({
          id: item.id || `thought-import-${Date.now()}-${idx}`,
          content: String(item.content || ""),
          category: (item.category as ThoughtCategory) || "felsefe",
          mood: (item.mood as Mood) || "düşünceli",
          createdAt: item.createdAt || new Date().toISOString(),
          isBookmarked: Boolean(item.isBookmarked)
        })).filter(item => item.content.trim().length > 0);

        if (validEntries.length === 0) {
          throw new Error("Dosyada geçerli not bulunamadı.");
        }

        // Merge with existing entries (prevent duplicate IDs)
        const existingMap = new Map(entries.map(ent => [ent.id, ent]));
        validEntries.forEach(entry => {
          existingMap.set(entry.id, entry);
        });

        const merged = Array.from(existingMap.values()).sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setEntries(merged);
        localStorage.setItem("thought_defteri_entries", JSON.stringify(merged));

        // Upload to firestore if sync active
        if (syncActive && syncCode && db) {
          for (const entry of validEntries) {
            try {
              await setDoc(doc(db, "entries", entry.id), { ...entry, syncCode });
            } catch (err) {
              console.warn("Firestore sync during import:", err);
            }
          }
        }

        setImportSuccessMsg(`Tebrikler! ${validEntries.length} adet düşünce notu başarıyla yüklendi ve birleştirildi.`);
        setTimeout(() => setImportSuccessMsg(null), 5000);
      } catch (err: any) {
        setSyncError("Yedek dosyası okunurken hata: " + (err.message || "Bilinmeyen hata"));
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleBatchTextImport = async () => {
    if (!batchTextInput.trim()) return;
    const items = batchTextInput
      .split(/\n\s*---\s*\n|\n{2,}/)
      .map(t => t.trim())
      .filter(t => t.length > 0);

    if (items.length === 0) return;

    const newEntries: ThoughtEntry[] = items.map((text, idx) => ({
      id: `thought-paste-${Date.now()}-${idx}`,
      content: text,
      category: "günlük",
      mood: "düşünceli",
      createdAt: new Date().toISOString(),
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
    setImportSuccessMsg(`${newEntries.length} adet yeni not başarıyla defterinize eklendi!`);
    setTimeout(() => setImportSuccessMsg(null), 4000);
  };

  // State manipulation helpers
  const handleAddEntry = async (content: string, category: ThoughtCategory, mood: Mood) => {
    const rawId = `thought-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newEntry: ThoughtEntry = {
      id: rawId,
      content,
      category,
      mood,
      createdAt: new Date().toISOString(),
      isBookmarked: false
    };
    
    // Optimistic UI update locally first
    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem("thought_defteri_entries", JSON.stringify(updated));

    if (syncActive && syncCode && db) {
      try {
        await setDoc(doc(db, "entries", rawId), {
          ...newEntry,
          syncCode: syncCode
        });
      } catch (err) {
        console.error("Error setting doc in Firestore:", err);
        setSyncError("Yazı buluta kaydedilemedi. İnternet bağlantınızı kontrol ediniz.");
        handleFirestoreError(err, OperationType.WRITE, `entries/${rawId}`);
      }
    }
  };

  const handleEditEntry = async (id: string, content: string, category: ThoughtCategory, mood: Mood) => {
    let updatedEntry: ThoughtEntry | undefined;
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
          syncCode: syncCode
        });
      } catch (err) {
        console.error("Error updating entry on Firestore:", err);
        setSyncError("Yazı güncellemesi buluta iletilemedi.");
        handleFirestoreError(err, OperationType.WRITE, `entries/${id}`);
      }
    }
  };

  const handleDeleteEntry = async (id: string) => {
    const updated = entries.filter((e) => e.id !== id);
    setEntries(updated);
    localStorage.setItem("thought_defteri_entries", JSON.stringify(updated));

    if (syncActive && syncCode && db) {
      try {
        await deleteDoc(doc(db, "entries", id));
      } catch (err) {
        console.error("Error deleting doc from Firestore:", err);
        setSyncError("Yazı buluttan silinemedi.");
        handleFirestoreError(err, OperationType.DELETE, `entries/${id}`);
      }
    }
  };

  const handleToggleBookmark = async (id: string) => {
    let targetEntry: ThoughtEntry | undefined;
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
          syncCode: syncCode
        });
      } catch (err) {
        console.error("Error updating bookmark status on Firestore:", err);
        setSyncError("Favori güncellemesi buluta iletilemedi.");
        handleFirestoreError(err, OperationType.WRITE, `entries/${id}`);
      }
    }
  };

  // Localized title dates iOS
  const getTurkishDate = () => {
    return new Date().toLocaleDateString("tr", { 
      weekday: "long", 
      day: "numeric", 
      month: "long" 
    });
  };

  return (
    <div className={`min-h-screen bg-[#FDFBF7] dark:bg-stone-950 font-sans transition-colors duration-200 pb-20`}>
      {/* 1. iOS Top Navigation / Safe Area Header bar */}
      <header className="sticky top-0 z-30 w-full ios-glass border-b border-stone-200/60 dark:border-stone-850/70 shadow-xs transition-colors safe-top-padding pb-3.5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 flex items-center justify-between w-full">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <AppBrandIcon size="md" />
            <div>
              <h1 className="font-display font-bold text-base sm:text-lg text-stone-800 dark:text-stone-100 leading-tight">Düşünce Defteri</h1>
              <div className="flex items-center gap-1 text-[11px] text-stone-400 dark:text-stone-500 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>{getTurkishDate()}</span>
              </div>
            </div>
          </div>

          {/* Action controllers (Theme, manually refresh AI quote, Cloud Sync) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {!isStandalone && (
              <button
                onClick={() => setIsInstallDialogOpen(true)}
                className="p-2 sm:p-2.5 rounded-xl border border-[#A2845E]/20 bg-[#FDFBF7] dark:border-stone-800 dark:bg-stone-900/60 text-[#A2845E] dark:text-stone-300 hover:bg-[#EADEC9]/30 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
                title="iOS / Mobil Uygulama Olarak Yükle"
              >
                <Download className="w-4 h-4" />
                <span className="text-xs font-semibold hidden md:inline">Uygulamayı Yükle</span>
              </button>
            )}

            <button
              onClick={() => setIsSyncDialogOpen(true)}
              className={`p-2 sm:p-2.5 rounded-xl border transition-all cursor-pointer flex items-center gap-1.5 ${
                syncActive 
                  ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:border-emerald-700/50 dark:bg-emerald-950/30 dark:text-emerald-400" 
                  : "border-stone-200/70 dark:border-stone-800/80 bg-white/60 dark:bg-stone-900/60 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
              }`}
              title="Bulut Senkronizasyonu (Cloud Sync)"
            >
              {syncActive ? <Cloud className="w-4 h-4 text-emerald-500 animate-pulse" /> : <CloudOff className="w-4 h-4" />}
              {syncActive && <span className="text-[10px] font-bold font-mono tracking-wider hidden sm:inline">{syncCode}</span>}
            </button>

            <button
              onClick={() => {
                setAiTestResult(null);
                setAiSavedNotice(false);
                setIsAiDialogOpen(true);
              }}
              className="p-2 sm:p-2.5 rounded-xl border border-amber-300/60 bg-amber-50/60 dark:border-amber-900/60 dark:bg-amber-950/30 text-[#A2845E] dark:text-amber-300 hover:bg-amber-100/60 transition-all cursor-pointer flex items-center gap-1.5 shadow-xs"
              title="Yapay Zeka (AI) Ayarları"
            >
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-xs font-semibold hidden md:inline">AI Ayarları</span>
            </button>

            <button
              onClick={fetchNewQuote}
              disabled={loadingQuote}
              className="p-2 sm:p-2.5 rounded-xl border border-stone-200/70 dark:border-stone-800/80 bg-white/60 dark:bg-stone-900/60 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer"
              title="Sözü ve yazma ilhamını yenile"
            >
              <RefreshCw className={`w-4 h-4 ${loadingQuote ? "animate-spin text-amber-600" : ""}`} />
            </button>

            <button
              onClick={handleToggleTheme}
              className="p-2 sm:p-2.5 rounded-xl border border-stone-200/70 dark:border-stone-800/80 bg-white/60 dark:bg-stone-900/60 text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-all cursor-pointer"
              title={darkMode ? "Açık Tema" : "Koyu Tema"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-stone-500" />}
            </button>
          </div>
        </div>
      </header>

      {/* Main viewport Container */}
      <main className="max-w-2xl mx-auto px-4 md:px-6 pt-5">
        
        {/* Universal Dynamic Motivational Widget */}
        {quoteData && activeTab === "timeline" && (
          <div className="bg-[#A2845E] dark:bg-[#3E3326] text-white p-8 rounded-[32px] mb-6 shadow-xl shadow-[#A2845E]/10 relative overflow-hidden transition-all" id="daily-quote-card">
            {/* Ambient bubble decorations */}
            <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="relative z-10 space-y-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest inline-block select-none">
                Günün İlhamı
              </span>

              <div className="space-y-2">
                <blockquote className="text-2xl md:text-3xl leading-snug font-serif italic font-medium">
                  "{quoteData.quote}"
                </blockquote>
                <div className="text-xs font-semibold text-white/80 tracking-wide font-mono">
                  — {quoteData.author}
                </div>

                <div className="mt-6 pt-5 border-t border-white/20 text-xs text-white flex flex-col sm:flex-row sm:items-center gap-1.5 leading-relaxed bg-white/5 px-4 py-3 rounded-2xl">
                  <span className="font-extrabold select-none text-[#FFF9E5] flex items-center gap-1"><Sparkles className="w-3.5 h-3.5" /> Yazma Yönergesi:</span>
                  <span className="font-medium opacity-90">{quoteData.journalPrompt}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab pages components switcher conditional rendering */}
        <div className="min-h-120 animate-fadeIn" key={activeTab}>
          {activeTab === "timeline" && (
            <DailyStream 
              entries={entries}
              onAddEntry={handleAddEntry}
              onEditEntry={handleEditEntry}
              onDeleteEntry={handleDeleteEntry}
              onToggleBookmark={handleToggleBookmark}
            />
          )}

          {activeTab === "inspiration" && (
            <Inspiration onAddEntry={handleAddEntry} />
          )}

          {activeTab === "insights" && (
            <AIInsights 
              entries={entries}
              onAddEntry={handleAddEntry}
            />
          )}

          {activeTab === "stats" && (
            <StatsDashboard entries={entries} />
          )}
        </div>
      </main>

      {/* 2. iOS Standard Bottom Tab Navigation Bar with safe area backdrop filter */}
      <footer className="fixed bottom-0 left-0 right-0 z-40 ios-glass border-t border-stone-200/60 dark:border-stone-850/70 px-2 pt-2 safe-bottom-padding shadow-2xl flex justify-around max-w-2xl mx-auto rounded-t-2xl sm:rounded-none">
        
        {/* Tab 1: Timeline */}
        <button
          onClick={() => setActiveTab("timeline")}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl flex-1 transition-all ${
            activeTab === "timeline" 
              ? "text-[#A2845E] dark:text-[#EADEC9] scale-102 font-bold" 
              : "text-stone-400 dark:text-stone-500 font-medium hover:text-stone-600"
          }`}
        >
          <BookOpen className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-wide select-none">Defterim</span>
        </button>

        {/* Tab 2: CBT Exercises / Sandbox / Breathing tool */}
        <button
          onClick={() => setActiveTab("inspiration")}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl flex-1 transition-all ${
            activeTab === "inspiration" 
              ? "text-[#A2845E] dark:text-[#EADEC9] scale-102 font-bold" 
              : "text-stone-400 dark:text-stone-500 font-medium hover:text-stone-600"
          }`}
        >
          <Sparkles className="w-5 h-5 mb-1 animate-pulse" />
          <span className="text-[10px] tracking-wide select-none">İlham & Pratik</span>
        </button>

        {/* Tab 3: Deep AI analysis */}
        <button
          onClick={() => setActiveTab("insights")}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl flex-1 transition-all ${
            activeTab === "insights" 
              ? "text-[#A2845E] dark:text-[#EADEC9] scale-102 font-bold" 
              : "text-stone-400 dark:text-stone-500 font-medium hover:text-stone-600"
          }`}
        >
          <Brain className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-wide select-none">Zihinsel Ayna</span>
        </button>

        {/* Tab 4: Habit analytics and achievements */}
        <button
          onClick={() => setActiveTab("stats")}
          className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-2xl flex-1 transition-all ${
            activeTab === "stats" 
              ? "text-[#A2845E] dark:text-[#EADEC9] scale-102 font-bold" 
              : "text-stone-400 dark:text-stone-500 font-medium hover:text-stone-600"
          }`}
        >
          <BarChart2 className="w-5 h-5 mb-1" />
          <span className="text-[10px] tracking-wide select-none">Gelişim</span>
        </button>

      </footer>

      {/* Cloud Sync Premium iOS Modal Dialog */}
      {isSyncDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white dark:bg-stone-900 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 p-6 max-w-md w-full space-y-5 shadow-2xl relative">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-stone-800/40">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-[#A2845E]" />
                <h3 className="font-bold text-slate-850 dark:text-white text-base font-serif">Bulut Senkronizasyonu</h3>
              </div>
              <button 
                onClick={() => {
                  setIsSyncDialogOpen(false);
                  setSyncError(null);
                  setSyncMessage(null);
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-white text-sm font-bold bg-[#F2F2F7] dark:bg-stone-850 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Alert Messages */}
            {syncError && (
              <div className="p-3.5 bg-rose-50 dark:bg-rose-950/20 border border-rose-100 dark:border-rose-950 rounded-2xl text-xs text-rose-600 dark:text-rose-400 leading-relaxed font-semibold">
                Hata: {syncError}
              </div>
            )}

            {syncMessage && (
              <div className="p-3.5 bg-[#FFF9E5] dark:bg-[#3E3326]/40 border border-[#FFD60A]/35 rounded-2xl text-xs text-[#A2845E] dark:text-[#FFF9E5] leading-relaxed font-bold animate-fadeIn">
                {syncMessage}
              </div>
            )}

            {importSuccessMsg && (
              <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl text-xs text-emerald-700 dark:text-emerald-300 leading-relaxed font-bold animate-fadeIn flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{importSuccessMsg}</span>
              </div>
            )}

            {/* Content */}
            <div className="space-y-4 font-sans text-slate-600 dark:text-stone-300">
              
              {/* SECTION 1: Dosya / JSON ile Hızlı Aktarım */}
              <div className="p-4 bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-800 dark:text-stone-200 font-serif flex items-center gap-1.5">
                    <ArrowRightLeft className="w-4 h-4 text-[#A2845E]" />
                    <span>Hızlı Veri Aktarımı & Yedekleme</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-white dark:bg-stone-900 font-mono text-stone-500 border border-stone-200/50">
                    {entries.length} Not Kayıtlı
                  </span>
                </div>
                <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed font-serif">
                  Düşüncelerinizi başka bir cihaza, telefona veya tarayıcıya taşımak için tek tıkla yedeğinizi indirin ya da yükleyin:
                </p>

                <div className="grid grid-cols-2 gap-2 pt-1">
                  {/* Export Button */}
                  <button
                    onClick={handleExportJSON}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 hover:border-[#A2845E] dark:hover:border-amber-500 rounded-xl text-xs font-bold text-stone-700 dark:text-stone-200 transition-all shadow-xs cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#A2845E]" />
                    <span>Yedek İndir (.json)</span>
                  </button>

                  {/* Import Button */}
                  <label className="flex items-center justify-center gap-1.5 py-2.5 px-3 bg-[#A2845E] hover:bg-[#8D704E] text-white rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer text-center">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Yedek Yükle</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJSON}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* SECTION 2: Başka Uygulamadan Metin Yapıştırma */}
              <div className="p-4 bg-slate-50 dark:bg-stone-950 border border-slate-200/60 dark:border-stone-850 rounded-2xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 dark:text-stone-200 font-serif flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-indigo-500" />
                    <span>Başka Uygulamadan Not Aktar</span>
                  </span>
                  <button
                    onClick={() => setIsBatchTextOpen(!isBatchTextOpen)}
                    className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                  >
                    {isBatchTextOpen ? "Kapat ▲" : "Aç ▼"}
                  </button>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-stone-400 leading-relaxed font-serif">
                  Apple Notlar, Google Keep, Notion veya WhatsApp'taki eski notlarınızı kopyalayıp buraya yapıştırabilirsiniz.
                </p>

                {isBatchTextOpen && (
                  <div className="space-y-2 pt-1 animate-fadeIn">
                    <textarea
                      rows={4}
                      value={batchTextInput}
                      onChange={(e) => setBatchTextInput(e.target.value)}
                      placeholder="Eski notlarınızı buraya yapıştırın. Her bir notu birbirinden ayırmak için aralarına boş bir satır veya '---' koyabilirsiniz..."
                      className="w-full text-xs p-3 rounded-xl bg-white dark:bg-stone-900 border border-slate-200 dark:border-stone-800 text-slate-800 dark:text-stone-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    />
                    <button
                      disabled={!batchTextInput.trim()}
                      onClick={handleBatchTextImport}
                      className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all disabled:opacity-50 cursor-pointer shadow-xs"
                    >
                      Notları İçe Aktar ve Kaydet
                    </button>
                  </div>
                )}
              </div>

              {/* SECTION 3: Bulut Senkronizasyonu */}
              <div className="border-t border-[#E5E5EA] dark:border-stone-800 pt-3 space-y-3">
                <span className="text-xs font-bold text-slate-800 dark:text-stone-200 font-serif flex items-center gap-1.5">
                  <Cloud className="w-4 h-4 text-emerald-500" />
                  <span>Bulut Eşitleme Kodu</span>
                </span>

                {syncActive ? (
                  /* Active Sync UI Config */
                  <div className="space-y-4 bg-[#FFF9E5] dark:bg-[#3E3326]/20 border border-[#FFD60A]/25 p-4 rounded-2xl">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-[#A2845E] dark:text-[#FFF9E5] font-extrabold uppercase tracking-wider font-sans">
                        Eşitleme Durumu: Aktif 🟢
                      </span>
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 font-mono">
                        Real-time Sync
                      </span>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] block text-[#8E8E93] font-bold uppercase tracking-wider font-sans">
                        Sizin Özel Eşitleme Kodunuz:
                      </span>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 p-3 bg-white dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 rounded-xl text-center font-mono font-bold text-lg text-slate-800 dark:text-white tracking-widest select-all">
                          {syncCode}
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(syncCode || "");
                            setSyncMessage("Eşitleme kodu kopyalandı! Diğer cihazınızda bu kodu girin.");
                            setTimeout(() => setSyncMessage(null), 3500);
                          }}
                          className="px-4 py-3 bg-[#A2845E] hover:bg-[#8D704E] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer font-sans"
                        >
                          Kopyala
                        </button>
                      </div>
                      <p className="text-[10px] text-[#8E8E93] leading-relaxed pt-1 italic font-serif">
                        * Bu kodu diğer telefonunuzdaki veya bilgisayarınızdaki Düşünce Defteri menüsüne girerek iki cihazı birbirine bağlayabilirsiniz.
                      </p>
                    </div>

                    <div className="pt-2">
                      <button
                        onClick={disableSync}
                        className="w-full py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition-all cursor-pointer font-sans"
                      >
                        Senkronizasyonu Durdur (Yerel Moda Geç)
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Inactive Sync Options UI */
                  <div className="space-y-3 font-sans">
                    {/* Generate brand-new code */}
                    <div className="p-3.5 bg-[#F2F2F7] dark:bg-stone-950 border border-transparent dark:border-stone-850 rounded-2xl space-y-2">
                      <div className="text-xs font-bold text-slate-800 dark:text-white font-serif">Yeni Bulut Alanı Aç</div>
                      <p className="text-[11px] text-slate-500 dark:text-stone-400 leading-normal font-serif">
                        İlk defa eşitliyorsanız, yeni bir eşitleme kodu oluşturarak tüm yazılarınızı buluta yedekleyin.
                      </p>
                      <button
                        disabled={syncLoading}
                        onClick={enableSyncWithNewCode}
                        className="w-full py-2 bg-[#A2845E] hover:bg-[#8D704E] text-white rounded-xl text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-50"
                      >
                        {syncLoading ? "Oluşturuluyor..." : "Bulut Eşitlemeyi Başlat"}
                      </button>
                    </div>

                    {/* Input existing code */}
                    <div className="p-3.5 border border-[#E5E5EA] dark:border-stone-800 rounded-2xl space-y-2">
                      <div className="text-xs font-bold text-slate-800 dark:text-white font-serif">Mevcut Kodla Bağlan</div>
                      <div className="flex gap-2">
                        <input
                          maxLength={12}
                          value={inputSyncCode}
                          onChange={(e) => setInputSyncCode(e.target.value.toUpperCase())}
                          placeholder="Örn: DF-928134"
                          className="flex-1 text-center p-2 font-mono font-bold tracking-wider text-slate-800 dark:text-white bg-[#FDFCFB] dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-850 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#A2845E]/20 text-xs"
                        />
                        <button
                          disabled={syncLoading || !inputSyncCode.trim()}
                          onClick={() => enableSyncWithExistingCode(inputSyncCode)}
                          className="py-2 px-3 bg-slate-800 dark:bg-stone-800 text-white rounded-xl text-xs font-bold hover:bg-slate-900 transition-all cursor-pointer disabled:opacity-50 shrink-0"
                        >
                          {syncLoading ? "..." : "Bağla"}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating iOS Install Prompt Banner */}
      {showIOSPrompt && (
        <div className="fixed bottom-20 left-4 right-4 z-40 max-w-md mx-auto bg-[#FDFBF7] dark:bg-stone-900 border border-[#A2845E]/30 dark:border-stone-800 rounded-3xl p-4 shadow-2xl animate-fadeIn">
          <div className="flex items-start justify-between gap-3">
            <div className="flex gap-3">
              <AppBrandIcon size="md" className="shrink-0" />
              <div className="space-y-1">
                <h4 className="font-bold text-xs text-slate-850 dark:text-white font-sans">Düşünce Defteri'ni Ana Ekrana Ekle</h4>
                <p className="text-[11px] text-slate-500 dark:text-stone-300 leading-normal font-serif">
                  Özel simgesiyle iPhone veya iPad'inizde tam ekran bir yerel uygulama gibi kullanın:
                </p>
                <div className="pt-2 space-y-1.5 text-[11px] font-sans font-semibold text-slate-700 dark:text-stone-200">
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#EADEC9] dark:bg-stone-800 text-[#A2845E] dark:text-stone-300 flex items-center justify-center font-bold text-[10px]">1</span>
                    <span className="leading-snug">Safari'nin altındaki <strong className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-sans"><Share className="w-3.5 h-3.5 mx-0.5 inline" /> "Paylaş" (Share)</strong> butonuna dokunun.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#EADEC9] dark:bg-stone-800 text-[#A2845E] dark:text-stone-300 flex items-center justify-center font-bold text-[10px]">2</span>
                    <span className="leading-snug">Açılan menüden <strong className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-sans"><Plus className="w-3.5 h-3.5 mx-0.5 inline" /> "Ana Ekrana Ekle"</strong> seçeneğini bulun.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#EADEC9] dark:bg-stone-800 text-[#A2845E] dark:text-stone-300 flex items-center justify-center font-bold text-[10px]">3</span>
                    <span className="leading-snug">Sağ üstteki <strong className="text-indigo-600 dark:text-indigo-400">"Ekle" (Add)</strong> butonuna dokunun.</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setShowIOSPrompt(false);
                sessionStorage.setItem("thought_defteri_ios_prompt_dismissed", "true");
              }}
              className="text-slate-400 hover:text-slate-650 text-xs font-bold bg-[#F2F2F7] dark:bg-stone-850 h-6 w-6 rounded-full flex items-center justify-center transition-all cursor-pointer shrink-0"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Install App Guided Dialog */}
      {isInstallDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FDFBF7] dark:bg-stone-900 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 p-6 max-w-md w-full space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-stone-800/40">
              <div className="flex items-center gap-2.5">
                <AppBrandIcon size="sm" />
                <h3 className="font-bold text-slate-850 dark:text-white text-base font-serif">Uygulama İkonu & Yükleme</h3>
              </div>
              <button 
                onClick={() => setIsInstallDialogOpen(false)}
                className="text-slate-400 hover:text-slate-650 dark:hover:text-white text-sm font-bold bg-[#F2F2F7] dark:bg-stone-850 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Icon Preview Showcase Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-b from-[#241E1A] to-[#120F0D] text-stone-100 border border-stone-800 shadow-inner space-y-3">
              <div className="flex items-center justify-between text-[11px] text-amber-200/80 font-medium">
                <span>Yeni Özel Simge Tasarımı</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">Retina & Vector SVG / PNG</span>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                {/* Mobile Preview */}
                <div className="bg-stone-900/80 rounded-xl p-3 border border-stone-800/80 flex flex-col items-center text-center space-y-2">
                  <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">Mobil Ana Ekran</span>
                  <div className="p-2.5 bg-stone-950/60 rounded-2xl border border-white/5 flex flex-col items-center">
                    <AppBrandIcon size="lg" className="shadow-lg shadow-black/60" />
                    <span className="text-[11px] font-medium text-stone-300 mt-1.5 tracking-tight">Defter</span>
                  </div>
                  <span className="text-[10px] text-stone-400">iOS & Android</span>
                </div>
                {/* Desktop Preview */}
                <div className="bg-stone-900/80 rounded-xl p-3 border border-stone-800/80 flex flex-col items-center text-center space-y-2">
                  <span className="text-[10px] text-stone-400 font-semibold uppercase tracking-wider">Masaüstü & Dock</span>
                  <div className="p-2.5 bg-stone-950/60 rounded-2xl border border-white/5 flex flex-col items-center">
                    <AppBrandIcon size="lg" className="shadow-lg shadow-black/60" />
                    <span className="text-[11px] font-medium text-stone-300 mt-1.5 tracking-tight">Düşünce Defteri</span>
                  </div>
                  <span className="text-[10px] text-stone-400">Mac & Windows</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-300/90 leading-relaxed font-serif pt-1 text-center">
                Derin espresso zemin üzerinde altın varaklı açık defter ve zihinsel berraklık kıvılcımı (✦).
              </p>
            </div>

            {/* Content */}
            <div className="space-y-4 font-sans text-slate-600 dark:text-stone-300 text-xs">
              <p className="leading-relaxed font-serif">
                Düşünce Defteri, modern PWA (Progressive Web App) teknolojisini destekler. Tarayıcı çubuğu olmadan, masaüstü veya mobilde yerel bir uygulama gibi tam ekran çalışır.
              </p>

              {/* iOS Safari Instructions */}
              <div className="p-4 bg-amber-50/20 dark:bg-amber-950/10 border border-amber-200/30 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-bold">
                  <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/40 rounded-lg text-[10px]">iOS / Safari</span>
                  <span>iPhone ve iPad için:</span>
                </div>
                <div className="space-y-2 leading-relaxed">
                  <div className="flex gap-2">
                    <span className="font-extrabold text-[#A2845E]">1.</span>
                    <span>Safari alt çubuğundaki <strong>Paylaş <Share className="w-3.5 h-3.5 inline mx-0.5" /> (Share)</strong> butonuna dokunun.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-extrabold text-[#A2845E]">2.</span>
                    <span>Aşağı kaydırıp <strong>Ana Ekrana Ekle (Add to Home Screen)</strong> seçeneğini seçin.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-extrabold text-[#A2845E]">3.</span>
                    <span>Sağ üstteki <strong>Ekle (Add)</strong> butonuna basın. Uygulama ana ekranınıza bu şık simgesiyle yerleşecektir!</span>
                  </div>
                </div>
              </div>

              {/* Android / Chrome Instructions */}
              <div className="p-4 bg-indigo-50/20 dark:bg-indigo-950/10 border border-indigo-200/30 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-400 font-bold">
                  <span className="px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 rounded-lg text-[10px]">Android / Chrome</span>
                  <span>Android Telefonlar için:</span>
                </div>
                <div className="space-y-2 leading-relaxed">
                  <div className="flex gap-2">
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400">1.</span>
                    <span>Tarayıcı sağ üstündeki <strong>üç noktaya (⋮)</strong> dokunun.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-extrabold text-indigo-600 dark:text-indigo-400">2.</span>
                    <span><strong>Uygulamayı Yükle (Install App)</strong> ya da <strong>Ana Ekrana Ekle</strong> seçeneğine tıklayın.</span>
                  </div>
                </div>
              </div>

              {/* Desktop Instructions */}
              <div className="p-4 bg-slate-50 dark:bg-stone-950 border border-slate-200/50 dark:border-stone-850 rounded-2xl space-y-2">
                <div className="font-bold text-slate-800 dark:text-stone-200">Bilgisayarlar (Chrome/Edge/Safari/macOS) için:</div>
                <p className="leading-relaxed text-[11px] text-slate-500 dark:text-stone-400">
                  Tarayıcınızın adres çubuğunun sağ tarafındaki <strong>Yükle (Install)</strong> ikonuna basarak uygulamayı bilgisayarınıza bağımsız bir masaüstü pencere uygulaması olarak kurabilirsiniz. Masaüstünüzde ve görev çubuğunda simgesiyle yer alır.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsInstallDialogOpen(false)}
              className="w-full py-3 bg-[#A2845E] hover:bg-[#8D704E] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer text-center font-sans"
            >
              Anladım
            </button>
          </div>
        </div>
      )}

      {/* AI & Gemini Settings Dialog */}
      {isAiDialogOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#FDFBF7] dark:bg-stone-900 rounded-[32px] border border-[#E5E5EA] dark:border-stone-800 p-6 max-w-md w-full space-y-5 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E5EA] dark:border-stone-800/40">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-[#A2845E] dark:text-amber-300">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-850 dark:text-white text-base font-serif">Yapay Zeka (AI) Ayarları</h3>
                  <span className="text-[10px] text-stone-400 font-mono">Google Gemini 2.5 Flash & Bilişsel CBT</span>
                </div>
              </div>
              <button 
                onClick={() => setIsAiDialogOpen(false)}
                className="text-slate-400 hover:text-slate-650 dark:hover:text-white text-sm font-bold bg-[#F2F2F7] dark:bg-stone-850 w-7 h-7 rounded-full flex items-center justify-center transition-all cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Current Engine Status */}
            <div className="p-3.5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-800 dark:text-stone-200">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block" />
                  <span>AI Durumu: Kesintisiz Aktif</span>
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white dark:bg-stone-900 border border-amber-200/50 text-[#A2845E] font-bold">
                  {geminiApiKeyInput.trim() ? "Gemini 2.5 Flash" : "Akıllı Yerel CBT"}
                </span>
              </div>
              <p className="text-[11px] text-stone-600 dark:text-stone-400 leading-relaxed font-serif">
                {geminiApiKeyInput.trim() 
                  ? "Kişisel Google Gemini API anahtarınız tanımlandı. Bilişsel analizler ve günün ilhamları doğrudan Google GenAI 2.5 Flash modeliyle üretilir."
                  : "Uygulama, API anahtarı olmasa bile çalışan dahili akıllı Türkçe CBT ve öz-şefkat analiz motoruna sahiptir. Dilerseniz kendi Google Gemini anahtarınızı ekleyerek bulut yapay zekasını da bağlayabilirsiniz."
                }
              </p>
            </div>

            {/* API Key Form */}
            <div className="space-y-3">
              <label className="text-[11px] font-extrabold text-[#8E8E93] uppercase tracking-wider block">
                Google Gemini API Anahtarı (Opsiyonel)
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={geminiApiKeyInput}
                  onChange={(e) => {
                    setGeminiApiKeyInput(e.target.value);
                    setAiTestResult(null);
                    setAiSavedNotice(false);
                  }}
                  placeholder="AIzaSy..."
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl bg-white dark:bg-stone-950 border border-[#E5E5EA] dark:border-stone-800 text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#A2845E]/20 focus:border-[#A2845E] font-mono"
                />
              </div>

              {/* Free key helper link */}
              <div className="flex items-center justify-between text-[11px] text-stone-500">
                <span>Anahtarınız yok mu?</span>
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#A2845E] dark:text-amber-400 font-bold hover:underline inline-flex items-center gap-1"
                >
                  Ücretsiz Google AI Studio'dan Al ↗
                </a>
              </div>

              {/* Test Status Alert */}
              {aiTestResult && (
                <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
                  aiTestResult.success 
                    ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900" 
                    : "bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-900"
                }`}>
                  {aiTestResult.success ? <Check className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
                  <span>{aiTestResult.message}</span>
                </div>
              )}

              {aiSavedNotice && (
                <div className="p-3 rounded-xl text-xs bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Yapay zeka ayarlarınız başarıyla kaydedildi!</span>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-2 border-t border-[#E5E5EA] dark:border-stone-800/40">
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={aiTesting || !geminiApiKeyInput.trim()}
                  onClick={async () => {
                    setAiTesting(true);
                    setAiTestResult(null);
                    const res = await aiService.testApiKey(geminiApiKeyInput);
                    setAiTestResult(res);
                    setAiTesting(false);
                  }}
                  className="px-3 py-2.5 rounded-xl border border-stone-300 dark:border-stone-700 text-stone-700 dark:text-stone-300 text-xs font-semibold hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 cursor-pointer transition-all"
                >
                  {aiTesting ? "Test Ediliyor..." : "Bağlantıyı Test Et"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setStoredGeminiKey(geminiApiKeyInput);
                    setAiSavedNotice(true);
                    setTimeout(() => {
                      setIsAiDialogOpen(false);
                    }, 1200);
                  }}
                  className="px-4 py-2.5 bg-[#A2845E] hover:bg-[#8D704E] text-white rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer text-center"
                >
                  Ayarları Kaydet
                </button>
              </div>

              {getStoredGeminiKey() && (
                <button
                  type="button"
                  onClick={() => {
                    setStoredGeminiKey("");
                    setGeminiApiKeyInput("");
                    setAiTestResult(null);
                    setAiSavedNotice(false);
                  }}
                  className="w-full py-1.5 text-[11px] text-rose-500 hover:text-rose-600 hover:underline cursor-pointer text-center"
                >
                  Kayıtlı Anahtarı Kaldır (Yerel Motora Dön)
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
