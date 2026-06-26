import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ─── Sub-tabs config ──────────────────────────────────────────────────────────
const SUB_TAB_CONFIG = {
  pruefungen: { labelDe: 'Prüfungen', labelAr: 'الاختبارات', icon: 'book' },
  teil1:      { labelDe: 'Teil 1',    labelAr: 'الجزء 1',      icon: 'file' },
  teil2:      { labelDe: 'Teil 2',    labelAr: 'الجزء 2',      icon: 'file' },
  teil3:      { labelDe: 'Teil 3',    labelAr: 'الجزء 3',      icon: 'file' },
  sprach1:    { labelDe: 'Sprach 1',  labelAr: 'اللغة 1',      icon: 'wrench' },
  sprach2:    { labelDe: 'Sprach 2',  labelAr: 'اللغة 2',      icon: 'wrench' },
};

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
  if (name === 'chevron-left') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="15 18 9 12 15 6"/>
    </svg>
  );
  return null;
};

// ─── TopicCard ───────────────────────────────────────────────────────────────
const TopicCard = ({ topic, onClick }) => (
  <button
    onClick={() => onClick(topic)}
    className="w-full text-left bg-white rounded-2xl border border-gray-200 p-5 hover:border-indigo-200 hover:shadow-md hover:shadow-indigo-100/30 transition-all duration-200 group"
  >
    <div className="flex items-start justify-between gap-3 mb-4">
      <div className="flex-1 text-left">
        <span className="text-gray-900 font-normal text-sm leading-snug block">{topic.titleDe}</span>
        <span className="text-gray-400 font-normal text-xs block mt-1">{topic.titleAr}</span>
      </div>
      <span className="flex-shrink-0 bg-indigo-50 text-indigo-500 text-[10px] font-normal px-2 py-0.5 rounded-md border border-indigo-100">{topic.level}</span>
    </div>
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4 text-gray-400 text-xs">
        <span className="flex items-center gap-1"><Icon name="clock" size={13} /><span>{topic.duration} min</span></span>
        {topic.parts > 0 && <span className="flex items-center gap-1 text-indigo-400"><Icon name="layers" size={13} /><span>+{topic.parts}</span></span>}
      </div>
      <span className="text-gray-300 group-hover:text-indigo-400 transition-colors"><Icon name="chevron-left" size={16} /></span>
    </div>
  </button>
);

// ─── Main Page ────────────────────────────────────────────────────────────────
const Lesen = () => {
  const navigate = useNavigate();
  const [levelTab, setLevelTab] = useState('B2');
  const [subTab, setSubTab] = useState('teil1');
  const [search, setSearch] = useState('');
  const [levelData, setLevelData] = useState({});
  const [availableSubTabs, setAvailableSubTabs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const modules = import.meta.glob('../data/**/*.json', { eager: true });
        const data = {};
        const subTabs = new Set();

        Object.entries(modules).forEach(([path, module]) => {
          if (path.includes(`/data/${levelTab}/`)) {
            const parts = path.split('/');
            const folderIdx = parts.indexOf(levelTab);
            if (folderIdx !== -1 && parts[folderIdx + 1]) {
              const subFolder = parts[folderIdx + 1];
              subTabs.add(subFolder);
              if (!data[subFolder]) data[subFolder] = [];
              data[subFolder].push(module.default || module);
            }
          }
        });

        setLevelData(data);
        const sortedSubTabs = Array.from(subTabs).sort((a, b) => {
          const order = ['pruefungen', 'teil1', 'teil2', 'teil3', 'sprach1', 'sprach2'];
          return order.indexOf(a) - order.indexOf(b);
        });
        setAvailableSubTabs(sortedSubTabs);

        if (!subTabs.has(subTab) && sortedSubTabs.length > 0) {
          setSubTab(sortedSubTabs[0]);
        }
      } catch (err) {
        console.error('Error loading data:', err);
      }
      setLoading(false);
    };

    loadData();
  }, [levelTab]);

  const allTopics = levelData[subTab] ?? [];
  const totalCount = allTopics.length;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return allTopics;
    return allTopics.filter((t) => t.titleDe.toLowerCase().includes(q) || t.titleAr.includes(q));
  }, [allTopics, search]);

  const handleCardClick = (topic) => {
    navigate(`/dashboard-client/lesen/${levelTab.toLowerCase()}/${subTab}/${topic.id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Cairo',sans-serif] relative">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      <div className="relative">
        <div className="pt-6 pb-6 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-500 shadow-sm">
              <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full" />محاكاة الامتحان
            </div>
          </div>
          <div className="flex items-start justify-between gap-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 tracking-tight">Leseverstehen</h1>
            <div className="flex-shrink-0 bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-3 flex items-center gap-5 divide-x divide-gray-100">
              <div className="text-center pr-5"><div className="text-xl font-normal text-gray-900">{levelTab}</div><div className="text-[11px] text-gray-400 mt-0.5">المستوى</div></div>
              <div className="text-center pl-5"><div className="text-xl font-normal text-gray-900">{totalCount}</div><div className="text-[11px] text-gray-400 mt-0.5">نماذج</div></div>
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <div className="bg-white rounded-2xl border border-gray-200 p-1 flex gap-1 shadow-sm">
              {['B1', 'B2'].map((lv) => (
                <button key={lv} onClick={() => { setLevelTab(lv); setSearch(''); }}
                  className={`px-6 py-2 rounded-xl text-xs font-normal transition-all duration-200 ${levelTab === lv ? 'bg-white shadow-sm text-gray-900 border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}>
                  Telc {lv}
                </button>
              ))}
            </div>
          </div>
          <div className="mt-4 bg-white rounded-2xl border border-gray-200 p-1 flex items-center gap-1 overflow-x-auto shadow-sm">
            {availableSubTabs.map((tabKey) => {
              const tab = SUB_TAB_CONFIG[tabKey] || { labelDe: tabKey, icon: 'file' };
              return (
                <button key={tabKey} onClick={() => setSubTab(tabKey)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-normal whitespace-nowrap transition-all duration-200 flex-shrink-0 ${subTab === tabKey ? 'bg-gray-50 text-gray-900 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}>
                  <Icon name={tab.icon} size={14} className={subTab === tabKey ? 'text-indigo-500' : ''} />{tab.labelDe}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex items-center gap-2">
            <div className="flex-1 relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"><Icon name="search" size={14} /></span>
              <input type="text" placeholder="ابحث عن المواضيع..." value={search} onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all" />
            </div>
            <button className="w-10 h-10 bg-white border border-gray-200 rounded-2xl flex items-center justify-center text-gray-400 hover:text-indigo-500 hover:border-indigo-200 transition-all flex-shrink-0">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
            </button>
            <button className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-2xl px-3 py-2.5 text-xs text-gray-600 font-normal hover:border-indigo-200 hover:text-indigo-600 transition-all flex-shrink-0">
              <Icon name="sort" size={14} />قائمتي المخصصة
            </button>
          </div>
        </div>
        <div className="px-4 md:px-8 lg:px-12 pb-16 max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20 text-gray-400"><p className="text-sm">جاري التحميل...</p></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400"><p className="text-sm">لا توجد مواضيع تطابق البحث</p></div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {filtered.map((topic) => <TopicCard key={topic.id} topic={topic} onClick={handleCardClick} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Lesen;