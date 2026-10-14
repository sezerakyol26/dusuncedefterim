import React, { useState } from "react";
import { ThoughtEntry, ThoughtCategory, Mood } from "../types";
import { CATEGORY_LABELS, MOOD_LABELS } from "../data";
import { 
  Flame, Activity, Sparkles, TrendingUp, Calendar, Heart, 
  ChevronLeft, ChevronRight, CalendarDays, Clock, Tag, X,
  CheckCircle2, BookOpen
} from "lucide-react";

interface StatsDashboardProps {
  entries: ThoughtEntry[];
}

export default function StatsDashboard({ entries }: StatsDashboardProps) {
  // Calendar states
  const [currentCalendarDate, setCurrentCalendarDate] = useState(() => new Date());
  const [selectedDayDate, setSelectedDayDate] = useState<Date | null>(() => new Date());
  const [calendarViewMode, setCalendarViewMode] = useState<"month" | "year">("month");

  // Helper date formatter: YYYY-MM-DD
  const formatDateKey = (d: Date): string => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Pre-index entries by date key for instant lookup
  const entriesByDate = entries.reduce((acc, entry) => {
    const d = new Date(entry.createdAt);
    const key = formatDateKey(d);
    if (!acc[key]) acc[key] = [];
    acc[key].push(entry);
    return acc;
  }, {} as Record<string, ThoughtEntry[]>);

  // 1. Calculate Streaks
  const calculateStreak = (): { current: number; longest: number } => {
    if (entries.length === 0) return { current: 0, longest: 0 };

    // Get unique dates sorted in descending order
    const dates = entries
      .map((e) => new Date(e.createdAt).toDateString())
      .filter((value, index, self) => self.indexOf(value) === index)
      .map((d) => new Date(d))
      .sort((a, b) => b.getTime() - a.getTime());

    if (dates.length === 0) return { current: 0, longest: 0 };

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 1;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    // Check if user has written today or yesterday to continue current streak
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
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) {
          currentStreak++;
          checkDate = nextDate;
        } else if (diffDays > 1) {
          break; // Streak broken
        }
      }
    } else {
      currentStreak = 0;
    }

    // Now calculate longest streak
    let maxStreak = 1;
    let checkDateLongest = dates[dates.length - 1]; // Start from oldest
    checkDateLongest.setHours(0, 0, 0, 0);

    for (let i = dates.length - 2; i >= 0; i--) {
      const currentDate = dates[i];
      currentDate.setHours(0, 0, 0, 0);

      const diffTime = Math.abs(currentDate.getTime() - checkDateLongest.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        tempStreak++;
        if (tempStreak > maxStreak) maxStreak = tempStreak;
      } else if (diffDays > 1) {
        tempStreak = 1; // broken
      }
      checkDateLongest = currentDate;
    }

    // Edge case if 1 element
    longestStreak = Math.max(maxStreak, currentStreak, dates.length > 0 ? 1 : 0);

    return { current: currentStreak, longest: longestStreak };
  };

  const streak = calculateStreak();

  // 2. Count Categories
  const categoryCounts = entries.reduce((acc, entry) => {
    acc[entry.category] = (acc[entry.category] || 0) + 1;
    return acc;
  }, {} as Record<ThoughtCategory, number>);

  const totalEntries = entries.length || 1;

  // 3. Count Moods
  const moodCounts = entries.reduce((acc, entry) => {
    acc[entry.mood] = (acc[entry.mood] || 0) + 1;
    return acc;
  }, {} as Record<Mood, number>);

  // Find dominant mood
  let dominantMood: Mood | null = null;
  let maxMoodCount = -1;
  Object.keys(MOOD_LABELS).forEach((m) => {
    const key = m as Mood;
    const count = moodCounts[key] || 0;
    if (count > maxMoodCount && count > 0) {
      maxMoodCount = count;
      dominantMood = key;
    }
  });

  // Insights generation based on logs
  const getDailyMessage = () => {
    if (entries.length === 0) {
      return "Zihnindeki yükü hafifletip farkındalığını artırmak için ilk düşünceni yazmaya ne dersin?";
    }
    if (categoryCounts[ThoughtCategory.GRATITUDE] && categoryCounts[ThoughtCategory.GRATITUDE] > (entries.length / 3)) {
      return "Harika bir denge! Günlüklerinde şükran ve takdir teması öne çıkıyor. Minnet kasını çalıştırmak zihinsel direncini çok ciddi oranda destekler.";
    }
    if (categoryCounts[ThoughtCategory.CHALLENGE] && categoryCounts[ThoughtCategory.CHALLENGE] > (entries.length / 3)) {
      return "Zorlukları yazarak serbest bırakmak son derece sağlıklı bir baş etme yöntemidir. Bilişsel çerçeveleyiciyi deneyerek bu tıkanmış düşüncelere yeni alanlar açabilirsin.";
    }
    return "Defterini düzenli kullanarak kendine alan açıyorsun. Yazmak, zihni organize etmenin ve öz-şefkati öğrenmenin en somut, zarif yoludur.";
  };

  // Calendar calculations
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
    const today = new Date();
    setCurrentCalendarDate(today);
    setSelectedDayDate(today);
  };

  // Weekday start offset (Monday = 0 ... Sunday = 6)
  const firstDayOfMonthRaw = new Date(calYear, calMonth, 1).getDay();
  const firstWeekday = (firstDayOfMonthRaw + 6) % 7;
  const daysInCurrentMonth = new Date(calYear, calMonth + 1, 0).getDate();

  // Active days this month stats
  let activeDaysInMonth = 0;
  let totalEntriesInMonth = 0;
  for (let day = 1; day <= daysInCurrentMonth; day++) {
    const key = formatDateKey(new Date(calYear, calMonth, day));
    const dayList = entriesByDate[key] || [];
    if (dayList.length > 0) activeDaysInMonth++;
    totalEntriesInMonth += dayList.length;
  }
  const monthFillRate = Math.round((activeDaysInMonth / daysInCurrentMonth) * 100);

  // Selected day items
  const selectedDayKey = selectedDayDate ? formatDateKey(selectedDayDate) : "";
  const selectedDayEntries = selectedDayKey ? entriesByDate[selectedDayKey] || [] : [];
  const selectedDayTitle = selectedDayDate
    ? selectedDayDate.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric", weekday: "long" })
    : "";

  const weekdays = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];

  return (
    <div className="space-y-6 pb-24" id="stats-dashboard-container">
      {/* iOS App Widget / Hero Header */}
      <div className="bg-[#A2845E] text-white p-6 rounded-[32px] shadow-md border border-[#A2845E]" id="stats-hero-widget">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-stone-200">Gelişim Sevinci</span>
            <h2 className="text-2xl font-bold font-serif text-white mt-1">Zihinsel Gelişim Aynası</h2>
          </div>
          <div className="bg-white/10 p-2.5 rounded-2xl">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
        </div>
        
        <p className="text-xs text-stone-100 mt-4 leading-relaxed italic border-l-2 border-white/40 pl-3 font-serif">
          "{getDailyMessage()}"
        </p>

        {/* Streak Bento Widget */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-white dark:bg-stone-900 border border-transparent dark:border-stone-800 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="bg-[#FFF9E5] dark:bg-[#3E3326]/50 p-2.5 rounded-xl">
              <Flame className="w-5 h-5 text-[#A2845E] animate-pulse" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-800 dark:text-white leading-tight">{streak.current} Gün</div>
              <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#8E8E93]">Aktif Seri</div>
            </div>
          </div>

          <div className="bg-white dark:bg-stone-900 border border-transparent dark:border-stone-800 p-4 rounded-2xl flex items-center gap-3 shadow-sm">
            <div className="bg-[#FFF9E5] dark:bg-[#3E3326]/50 p-2.5 rounded-xl">
              <TrendingUp className="w-5 h-5 text-[#A2845E]" />
            </div>
            <div>
              <div className="text-xl font-bold text-slate-800 dark:text-white leading-tight">{streak.longest} Gün</div>
              <div className="text-[10px] uppercase tracking-wider font-extrabold text-[#8E8E93]">En Uzun Seri</div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. TÜM TAKVİM & YAZMA RUTİNİ SICAKLIĞI (FULL CALENDAR & HEATMAP)          */}
      {/* ========================================================================= */}
      <div className="bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-800 p-6 rounded-[32px] shadow-sm space-y-5" id="stats-calendar-card">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-200/60 dark:border-stone-800/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-[#A2845E] border border-amber-200/40 dark:border-amber-900/30">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-base leading-tight">Yazma Rutini Sıcaklığı</h3>
              <p className="text-[11px] text-stone-500 dark:text-stone-400">Takvim üzerinden tüm yazma sıklığınızı ve günlerinizi keşfedin</p>
            </div>
          </div>

          {/* View switcher buttons */}
          <div className="flex items-center gap-2">
            <div className="bg-stone-100 dark:bg-stone-950 p-1 rounded-xl flex items-center border border-stone-200/60 dark:border-stone-800">
              <button
                onClick={() => setCalendarViewMode("month")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  calendarViewMode === "month"
                    ? "bg-white dark:bg-stone-800 text-[#A2845E] dark:text-amber-300 shadow-xs"
                    : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                }`}
              >
                Aylık Takvim
              </button>
              <button
                onClick={() => setCalendarViewMode("year")}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  calendarViewMode === "year"
                    ? "bg-white dark:bg-stone-800 text-[#A2845E] dark:text-amber-300 shadow-xs"
                    : "text-stone-500 hover:text-stone-800 dark:hover:text-stone-200"
                }`}
              >
                Yıllık Isı Haritası
              </button>
            </div>
          </div>
        </div>

        {/* View Mode 1: Full Monthly Interactive Calendar */}
        {calendarViewMode === "month" && (
          <div className="space-y-4 animate-fadeIn">
            {/* Month Navigation & Summary bar */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <button
                  onClick={prevMonth}
                  className="p-1.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors cursor-pointer"
                  title="Önceki Ay"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="font-serif font-bold text-base text-stone-900 dark:text-stone-100 capitalize min-w-[130px] text-center">
                  {currentMonthTitle}
                </span>
                <button
                  onClick={nextMonth}
                  className="p-1.5 rounded-xl border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors cursor-pointer"
                  title="Sonraki Ay"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={goToToday}
                  className="text-xs px-2.5 py-1 rounded-lg border border-stone-200 dark:border-stone-800 hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 font-medium transition-colors cursor-pointer"
                >
                  Bugün
                </button>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-[#A2845E] dark:text-amber-300 font-bold border border-amber-200/40 dark:border-amber-900/40 hidden sm:inline">
                  {activeDaysInMonth} / {daysInCurrentMonth} Gün Aktif (%{monthFillRate})
                </span>
              </div>
            </div>

            {/* Calendar Grid Header: Weekdays */}
            <div className="grid grid-cols-7 gap-1.5 text-center">
              {weekdays.map((w, i) => (
                <div key={i} className="text-[10px] font-bold text-stone-400 dark:text-stone-500 uppercase tracking-wider py-1 font-mono">
                  {w}
                </div>
              ))}
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
              {/* Empty leading offset days */}
              {Array.from({ length: firstWeekday }).map((_, i) => (
                <div key={`offset-${i}`} className="h-10 sm:h-12 rounded-xl border border-transparent bg-stone-50/30 dark:bg-stone-950/20 opacity-30" />
              ))}

              {/* Days of the month */}
              {Array.from({ length: daysInCurrentMonth }).map((_, i) => {
                const dayNum = i + 1;
                const thisDate = new Date(calYear, calMonth, dayNum);
                const key = formatDateKey(thisDate);
                const dayEntries = entriesByDate[key] || [];
                const count = dayEntries.length;

                const isToday = formatDateKey(new Date()) === key;
                const isSelected = selectedDayKey === key;

                // Color intensities
                let bgClasses = "bg-stone-50 hover:bg-stone-100 dark:bg-stone-950/60 dark:hover:bg-stone-800/60 border-stone-200/60 dark:border-stone-850 text-stone-700 dark:text-stone-300";
                if (count === 1) {
                  bgClasses = "bg-amber-100/90 hover:bg-amber-200/90 dark:bg-amber-950/40 dark:hover:bg-amber-900/50 border-amber-300/80 dark:border-amber-800/60 text-amber-900 dark:text-amber-200 font-semibold shadow-xs";
                } else if (count === 2) {
                  bgClasses = "bg-[#C5A059] hover:bg-[#B58F49] text-white border-[#B58F49] font-bold shadow-xs";
                } else if (count >= 3) {
                  bgClasses = "bg-[#8C6D44] hover:bg-[#785C38] text-white border-[#705634] font-extrabold shadow-sm";
                }

                return (
                  <button
                    key={`day-${dayNum}`}
                    onClick={() => setSelectedDayDate(thisDate)}
                    className={`h-11 sm:h-13 rounded-xl sm:rounded-2xl border p-1 sm:p-1.5 flex flex-col justify-between items-center transition-all cursor-pointer relative ${bgClasses} ${
                      isToday ? "ring-2 ring-indigo-500/80 dark:ring-indigo-400" : ""
                    } ${
                      isSelected ? "scale-103 ring-2 ring-amber-500 shadow-md z-10" : ""
                    }`}
                  >
                    <div className="w-full flex items-center justify-between text-[11px] sm:text-xs">
                      <span className="font-mono leading-none">{dayNum}</span>
                      {isToday && (
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 dark:bg-indigo-400 inline-block" title="Bugün" />
                      )}
                    </div>

                    {/* Entry indicators */}
                    <div className="w-full flex items-center justify-center gap-0.5">
                      {count > 0 ? (
                        <span className="text-[10px] font-mono leading-none font-bold">
                          {count > 1 ? `${count}★` : "•"}
                        </span>
                      ) : (
                        <span className="text-[10px] opacity-20">•</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Legend & Stats row */}
            <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs text-stone-500 dark:text-stone-400 border-t border-stone-200/60 dark:border-stone-800/60">
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-medium">Yoğunluk:</span>
                <div className="flex items-center gap-1.5 text-[10px] font-mono">
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-md bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 inline-block" />
                    <span>0</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-md bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-800 inline-block" />
                    <span>1</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-md bg-[#C5A059] border border-[#B58F49] inline-block" />
                    <span>2</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="w-3 h-3 rounded-md bg-[#8C6D44] border border-[#705634] inline-block" />
                    <span>3+</span>
                  </div>
                </div>
              </div>

              <div className="text-[11px] text-stone-500 dark:text-stone-400 font-serif">
                Bu ay toplam <strong className="text-stone-800 dark:text-stone-200 font-bold">{totalEntriesInMonth} düşünce</strong> kaydedildi.
              </div>
            </div>

            {/* Selected Day Inspector Card */}
            {selectedDayDate && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] dark:bg-stone-950/80 border border-amber-200/50 dark:border-stone-800 space-y-3 animate-fadeIn shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-stone-200/60 dark:border-stone-800/60">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#A2845E]" />
                    <h4 className="font-bold text-stone-800 dark:text-stone-100 text-xs sm:text-sm font-serif">
                      {selectedDayTitle}
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-[#A2845E] dark:text-amber-300 font-mono font-bold">
                      {selectedDayEntries.length} Giriş
                    </span>
                    <button
                      onClick={() => setSelectedDayDate(null)}
                      className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 transition-colors"
                      title="Kapat"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {selectedDayEntries.length > 0 ? (
                  <div className="space-y-2.5 max-h-60 overflow-y-auto pr-1">
                    {selectedDayEntries.map((e) => (
                      <div key={e.id} className="p-3 bg-white dark:bg-stone-900 rounded-xl border border-stone-200/60 dark:border-stone-800/80 space-y-1.5 shadow-2xs">
                        <div className="flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <span className="text-base">{MOOD_LABELS[e.mood]?.emoji}</span>
                            <span className="font-semibold text-stone-700 dark:text-stone-300">
                              {CATEGORY_LABELS[e.category]?.label}
                            </span>
                          </div>
                          <span className="text-stone-400 dark:text-stone-500 font-mono text-[10px]">
                            {new Date(e.createdAt).toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <p className="text-xs text-stone-800 dark:text-stone-200 font-serif leading-relaxed line-clamp-3">
                          "{e.content}"
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-stone-500 dark:text-stone-400 font-serif italic py-1">
                    Bu tarihte henüz bir düşünce kaydı bulunmuyor. Her gün bir cümleyle de olsa kendinize vakit ayırabilirsiniz.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* View Mode 2: Annual Heatmap (All 12 Months Matrix) */}
        {calendarViewMode === "year" && (
          <div className="space-y-4 animate-fadeIn">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-sm text-stone-900 dark:text-stone-100">
                {calYear} Yılı Genel Yazma Yoğunluğu
              </span>
              <span className="text-[11px] text-stone-500 dark:text-stone-400 font-mono font-medium">
                12 Aylık Rutin Özeti
              </span>
            </div>

            {/* 12 Months Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Array.from({ length: 12 }).map((_, mIdx) => {
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

                return (
                  <div
                    key={mIdx}
                    onClick={() => {
                      setCurrentCalendarDate(new Date(calYear, mIdx, 1));
                      setCalendarViewMode("month");
                    }}
                    className="p-3 bg-stone-50 dark:bg-stone-950/60 rounded-2xl border border-stone-200/60 dark:border-stone-850 hover:border-amber-300 dark:hover:border-amber-800 transition-all cursor-pointer space-y-2 group"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold font-serif text-stone-800 dark:text-stone-200 capitalize group-hover:text-[#A2845E]">
                        {monthName}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400 font-bold">
                        {monthEntriesCount} giriş
                      </span>
                    </div>

                    {/* Mini Day Heat Dots */}
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: daysInM }).map((_, dIdx) => {
                        const k = formatDateKey(new Date(calYear, mIdx, dIdx + 1));
                        const cnt = entriesByDate[k]?.length || 0;
                        let dotColor = "bg-stone-200/60 dark:bg-stone-800/60";
                        if (cnt === 1) dotColor = "bg-amber-300 dark:bg-amber-700";
                        else if (cnt === 2) dotColor = "bg-[#C5A059]";
                        else if (cnt >= 3) dotColor = "bg-[#8C6D44]";

                        return (
                          <div 
                            key={dIdx} 
                            className={`w-full aspect-square rounded-xs ${dotColor}`}
                            title={`${dIdx + 1} ${monthName}: ${cnt} giriş`}
                          />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <p className="text-[11px] text-stone-400 text-center italic">
              Herhangi bir aya tıklayarak o ayın detaylı takvim görünümüne geçebilirsiniz.
            </p>
          </div>
        )}
      </div>

      {/* Main stats layout (Category Frequencies & Mood Climate) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Category Frequencies */}
        <div className="bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-800 p-6 rounded-[32px] space-y-4 shadow-sm" id="stats-categories-card">
          <div className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#A2845E]" />
            <h3 className="font-semibold text-slate-800 dark:text-white text-base">Yazılan Konu Dağılımı</h3>
          </div>

          <div className="space-y-3.5 pt-2">
            {Object.keys(CATEGORY_LABELS).map((catName) => {
              const cat = catName as ThoughtCategory;
              const count = categoryCounts[cat] || 0;
              const percentage = Math.round((count / totalEntries) * 100);
              const { label, color } = CATEGORY_LABELS[cat];

              return (
                <div key={cat} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-700 dark:text-slate-300 font-serif">{label}</span>
                    <span className="text-slate-500 dark:text-slate-400 font-mono font-bold text-[11px]">{count} Adet ({percentage}%)</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 dark:bg-stone-950 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${color.replace('text-', 'bg-')}`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mood Distribution */}
        <div className="bg-white dark:bg-stone-900 border border-[#E5E5EA] dark:border-stone-800 p-6 rounded-[32px] space-y-4 shadow-sm" id="stats-moods-card">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#A2845E]" />
            <h3 className="font-semibold text-slate-800 dark:text-white text-base">Duyguların İklimi</h3>
          </div>

          {dominantMood && MOOD_LABELS[dominantMood] ? (
            <div className="bg-[#FFF9E5] dark:bg-[#3E3326]/40 border border-[#FFD60A]/35 p-3.5 rounded-2xl flex items-center gap-3">
              <span className="text-3xl">{MOOD_LABELS[dominantMood].emoji}</span>
              <div>
                <div className="text-[10px] uppercase font-extrabold tracking-wider text-[#A2845E] dark:text-[#FFF9E5]">Baskın Ruh Hali</div>
                <div className={`text-sm font-bold ${MOOD_LABELS[dominantMood].color}`}>
                  {MOOD_LABELS[dominantMood].label}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-xs text-slate-400 dark:text-slate-500 leading-snug italic py-1 font-serif">
              Ruh hali eğilimlerinizi görmek için düşüncelerinizi eklemeye devam ediniz.
            </div>
          )}

          <div className="grid grid-cols-1 gap-1.5 pt-1 font-serif max-h-72 overflow-y-auto pr-1">
            {Object.keys(MOOD_LABELS).map((mKey) => {
              const mood = mKey as Mood;
              const count = moodCounts[mood] || 0;
              const moodInfo = MOOD_LABELS[mood];
              if (!moodInfo) return null;
              const { label, emoji, color } = moodInfo;
              const ratio = entries.length > 0 ? (count / entries.length) : 0;

              return (
                <div key={mood} className="flex items-center justify-between text-xs p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-stone-950 transition-colors">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{emoji}</span>
                    <span className="font-medium text-slate-700 dark:text-slate-300">{label}</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-16 h-1.5 bg-slate-100 dark:bg-stone-950 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${color.replace('text-', 'bg-')}`}
                        style={{ width: `${ratio * 100}%` }}
                      />
                    </div>
                    <span className="text-[#A2845E] font-mono font-bold w-5 text-right">{count}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
