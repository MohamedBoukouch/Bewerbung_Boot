import React, { useState, useMemo } from 'react';
import lesenData from '../data/lesenData.json';

// ─── Sub-tabs config ────────────────────────────────────────────────────────
const SUB_TABS = [
  { key: 'pruefungen', labelDe: 'Prüfungen',  icon: 'book'    },
  { key: 'teil1',      labelDe: 'Teil 1',      icon: 'file'    },
  { key: 'teil2',      labelDe: 'Teil 2',      icon: 'file'    },
  { key: 'teil3',      labelDe: 'Teil 3',      icon: 'file'    },
  { key: 'sprach1',    labelDe: 'Sprach 1',    icon: 'wrench'  },
  { key: 'sprach2',    labelDe: 'Sprach 2',    icon: 'wrench'  },
];

// ─── Icons ───────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, className = '' }) => {
  const s = { width: size, height: size, flexShrink: 0 };
  if (name === 'book') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
    </svg>
  );
  if (name === 'file') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  );
  if (name === 'wrench') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  );
  if (name === 'clock') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
    </svg>
  );
  if (name === 'layers') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  );
  if (name === 'search') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
    </svg>
  );
  if (name === 'sort') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"/><polyline points="5 12 12 5 19 12"/><line x1="12" y1="19" x2="12" y2="5" transform="translate(0,14) scale(1,-1) translate(0,-14)"/>
      <line x1="7" y1="15" x2="17" y2="15"/>
    </svg>
  );
  if (name === 'arrow-left') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  );
  if (name === 'chevron-right') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="9 18 15 12 9 6"/>
    </svg>
  );
  return null;
};

// ─── TopicCard component ──────────────────────────────────────────────────────
const TopicCard = ({ topic, onClick }) => (
  <button
    onClick={() => onClick(topic)}
    className="w-full text-left bg-white rounded-2xl border border-gray-200 p-5 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/30 transition-all duration-200 group"
  >
    {/* Top row */}
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="flex-1 text-right" dir="rtl">
        <span className="text-gray-900 font-semibold text-base leading-snug">
          {topic.titleDe}{' '}
          <span className="text-gray-400 font-normal text-sm">({topic.titleAr})</span>
        </span>
      </div>
      <span className="flex-shrink-0 bg-indigo-50 text-indigo-500 text-xs font-bold px-2.5 py-1 rounded-lg border border-indigo-100">
        {topic.level}
      </span>
    </div>

    {/* Bottom row */}
    <div className="flex items-center justify-between" dir="rtl">
      <div className="flex items-center gap-4 text-gray-400 text-sm">
        <span className="flex items-center gap-1.5">
          <Icon name="clock" size={14} />
          <span>{topic.duration} min</span>
        </span>
        {topic.parts > 0 && (
          <span className="flex items-center gap-1.5 text-indigo-400">
            <Icon name="layers" size={14} />
            <span>+{topic.parts}</span>
          </span>
        )}
      </div>
      <span className="text-gray-300 group-hover:text-indigo-400 transition-colors">
        <Icon name="chevron-right" size={18} />
      </span>
    </div>
  </button>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const Lesen = () => {
  const [levelTab, setLevelTab]   = useState('b2');   // 'b1' | 'b2'
  const [subTab, setSubTab]       = useState('pruefungen');
  const [search, setSearch]       = useState('');

  const allTopics = lesenData[levelTab] ?? [];
  const totalCount = lesenData[levelTab]?.length ?? 0;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allTopics;
    return allTopics.filter(
      (t) =>
        t.titleDe.toLowerCase().includes(q) ||
        t.titleAr.includes(q)
    );
  }, [allTopics, search]);

  const handleCardClick = (topic) => {
    // Navigate to topic detail — replace with your router logic
    console.log('Navigate to topic:', topic.id);
  };

  return (
    <div
      className="min-h-screen bg-gray-50 font-['Cairo',sans-serif]"
      style={{
        backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        backgroundBlendMode: 'normal',
      }}
    >
      {/* Grid overlay */}
      <div className="min-h-screen bg-gray-50/95">

        {/* ── Page header ── */}
        <div className="pt-8 pb-6 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">

          {/* Back + badge row */}
          <div className="flex items-center justify-between mb-6" dir="rtl">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-500 shadow-sm">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse" />
              محاكاة الامتحان
            </div>
          </div>

          {/* Title + stats */}
          <div className="flex items-start justify-between gap-6" dir="rtl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 tracking-tight">
              Leseverstehen
            </h1>

            {/* Stats card */}
            <div className="flex-shrink-0 bg-white rounded-2xl border border-gray-200 shadow-sm px-6 py-4 flex items-center gap-6 divide-x divide-gray-100">
              <div className="text-center pl-6">
                <div className="text-2xl font-black text-gray-900">
                  {levelTab === 'b2' ? 'B2' : 'B1'}
                </div>
                <div className="text-xs text-gray-400 mt-0.5">المستوى</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-gray-900">{totalCount}</div>
                <div className="text-xs text-gray-400 mt-0.5">نماذج</div>
              </div>
            </div>
          </div>

          {/* ── Level tabs B1 / B2 ── */}
          <div className="flex justify-center mt-8">
            <div className="bg-white rounded-2xl border border-gray-200 p-1.5 flex gap-1 shadow-sm">
              {['b1', 'b2'].map((lv) => (
                <button
                  key={lv}
                  onClick={() => { setLevelTab(lv); setSearch(''); }}
                  className={`px-8 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                    levelTab === lv
                      ? 'bg-white shadow-md text-gray-900 border border-gray-100'
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  Telc {lv.toUpperCase()}
                  {levelTab === lv && (
                    <div className="h-0.5 w-6 bg-indigo-500 rounded-full mx-auto mt-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── Sub-tabs ── */}
          <div className="mt-6 bg-white rounded-2xl border border-gray-200 p-1.5 flex items-center gap-1 overflow-x-auto shadow-sm">
            {SUB_TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSubTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                  subTab === tab.key
                    ? 'bg-gray-50 text-gray-900 shadow-sm border border-gray-100'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Icon
                  name={tab.icon}
                  size={15}
                  className={subTab === tab.key ? 'text-indigo-500' : ''}
                />
                {tab.labelDe}
                {subTab === tab.key && (
                  <div className="h-0.5 w-4 bg-indigo-500 rounded-full absolute bottom-1 left-1/2 -translate-x-1/2 hidden" />
                )}
              </button>
            ))}
          </div>

          {/* ── Search + actions ── */}
          <div className="mt-5 flex items-center gap-3" dir="rtl">
            {/* Search bar */}
            <div className="flex-1 relative">
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <Icon name="search" size={16} />
              </span>
              <input
                type="text"
                placeholder="...ابحث عن المواضيع"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-2xl pr-11 pl-4 py-3.5 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
                dir="rtl"
              />
            </div>

            {/* Edit icon */}
            <button className="w-12 h-12 bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 hover:text-indigo-500 hover:border-indigo-200 transition-all flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>

            {/* My list button */}
            <button className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-600 font-medium hover:border-indigo-200 hover:text-indigo-600 transition-all flex-shrink-0" dir="rtl">
              <Icon name="sort" size={15} />
              قائمتي المخصصة
            </button>
          </div>
        </div>

        {/* ── Topics grid ── */}
        <div className="px-4 md:px-8 lg:px-12 pb-16 max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400" dir="rtl">
              <p className="text-lg">لا توجد مواضيع تطابق البحث</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((topic) => (
                <TopicCard key={topic.id} topic={topic} onClick={handleCardClick} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Lesen;
