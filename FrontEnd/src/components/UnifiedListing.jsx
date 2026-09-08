

// import React, { useState, useMemo, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';

// // ─── GLOB: Fetch ALL JSON files ──────────────────────────────────────────────
// const allJsonModules = import.meta.glob('../data/**/*.json', { eager: true });

// // ─── Sub-tab configuration for ALL possible tabs ─────────────────────────────
// const SUB_TAB_CONFIG = {
//   pruefungen: { labelDe: 'Prüfungen', labelAr: 'الاختبارات', icon: 'book', type: 'lesen' },
//   teil1:      { labelDe: 'Teil 1',    labelAr: 'الجزء 1',     icon: 'file', type: 'lesen' },
//   teil2:      { labelDe: 'Teil 2',    labelAr: 'الجزء 2',     icon: 'file', type: 'lesen' },
//   teil3:      { labelDe: 'Teil 3',    labelAr: 'الجزء 3',     icon: 'file', type: 'lesen' },
//   sprach1:    { labelDe: 'Sprach 1',  labelAr: 'اللغة 1',     icon: 'wrench', type: 'sprach' },
//   sprach2:    { labelDe: 'Sprach 2',  labelAr: 'اللغة 2',     icon: 'wrench', type: 'sprach' },
// };

// // Order for sub-tabs
// const SUB_TAB_ORDER = ['pruefungen', 'teil1', 'teil2', 'teil3', 'sprach1', 'sprach2'];

// // ─── Icons ────────────────────────────────────────────────────────────────────
// const Icon = ({ name, size = 16, className = '' }) => {
//   const s = { width: size, height: size, flexShrink: 0 };
//   if (name === 'book') return <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>;
//   if (name === 'file') return <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
//   if (name === 'wrench') return <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>;
//   if (name === 'clock') return <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;
//   if (name === 'layers') return <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>;
//   if (name === 'search') return <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
//   if (name === 'chevron-right') return <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>;
//   if (name === 'gap') return <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="8" y1="12" x2="16" y2="12"/></svg>;
//   return null;
// };

// // ─── Build course list from ALL data files ───────────────────────────────────
// // Handles BOTH:
// //   - Lesen:  data/B2/teil1/course/q1.json, q2.json... (multiple q files)
// //   - Sprach: data/B2/sprach1/course/content.json (single content file with gaps)
// // ──────────────────────────────────────────────────────────────────────────────
// const buildCourseList = (levelFilter) => {
//   const courseMap = new Map();
//   const subTabsFound = new Set();

//   for (const [path, module] of Object.entries(allJsonModules)) {
//     const normalized = path.replace(/\\/g, '/').toLowerCase();
//     const parts = normalized.split('/');

//     // Find level index
//     const levelIdx = parts.findIndex(p => p === levelFilter.toLowerCase());
//     if (levelIdx === -1) continue;

//     // Need at least: data/level/subTab/course/file.json
//     if (parts.length < levelIdx + 4) continue;

//     const subTab = parts[levelIdx + 1];
//     const courseId = parts[levelIdx + 2];
//     const fileName = parts[levelIdx + 3];

//     // Determine type based on subTab
//     const isSprach = subTab.startsWith('sprach');
//     const isLesen = !isSprach;

//     // Validate file pattern
//     if (isLesen && !fileName.match(/^q\d+\.json$/)) continue;
//     if (isSprach && fileName !== 'content.json') continue;

//     subTabsFound.add(subTab);

//     const data = module.default || module;
//     const mapKey = `${subTab}__${courseId}`;

//     if (!courseMap.has(mapKey)) {
//       const titleDe = (data.titleDe || courseId)
//         .replace(/\s*[-–:]\s*(Frage|Teil|Thema|Lücke)\s*\d+.*/i, '').trim();
//       const titleAr = (data.titleAr || '')
//         .replace(/\s*[-–:]\s*(سؤال|جزء|موضوع|فجوة)\s*\d+.*/i, '').trim();

//       courseMap.set(mapKey, {
//         id: courseId,
//         titleDe,
//         titleAr,
//         level: data.level || levelFilter.toUpperCase(),
//         subTab,
//         type: isSprach ? 'sprach' : 'lesen',
//         duration: data.duration || 10,
//         questionsCount: 0,      // For Lesen (q files)
//         gapsCount: 0,           // For Sprach (totalGaps)
//       });
//     }

//     const course = courseMap.get(mapKey);

//     if (isLesen) {
//       course.questionsCount += 1;
//     } else if (isSprach && data.totalGaps) {
//       course.gapsCount = data.totalGaps;
//     }
//   }

//   return {
//     courses: Array.from(courseMap.values()),
//     subTabs: Array.from(subTabsFound).sort(
//       (a, b) => SUB_TAB_ORDER.indexOf(a) - SUB_TAB_ORDER.indexOf(b)
//     ),
//   };
// };

// // ─── TopicCard ────────────────────────────────────────────────────────────────
// const TopicCard = ({ topic, onClick }) => {
//   const isSprach = topic.type === 'sprach';
//   const count = isSprach ? topic.gapsCount : topic.questionsCount;
//   const countLabel = isSprach ? 'Lücken' : 'Fragen';
//   const countIcon = isSprach ? 'gap' : 'layers';

//   return (
//     <button
//       onClick={() => onClick(topic)}
//       className="w-full text-left bg-white rounded-2xl border border-gray-200 p-5 hover:border-blue-200 hover:shadow-md hover:shadow-blue-100/30 transition-all duration-200 group"
//     >
//       <div className="flex items-start justify-between gap-3 mb-4">
//         <div className="flex-1 min-w-0">
//           <span className="text-gray-900 font-normal text-sm leading-snug block truncate">{topic.titleDe}</span>
//           {topic.titleAr && (
//             <span className="text-gray-400 text-xs block mt-1 truncate" dir="rtl">{topic.titleAr}</span>
//           )}
//         </div>
//         <span className="flex-shrink-0 bg-blue-50 text-blue-500 text-[10px] px-2 py-0.5 rounded-md border border-blue-100">
//           {topic.level}
//         </span>
//       </div>
//       <div className="flex items-center justify-between">
//         <div className="flex items-center gap-4 text-gray-400 text-xs">
//           <span className="flex items-center gap-1"><Icon name="clock" size={13} />{topic.duration} min</span>
//           {count > 0 && (
//             <span className="flex items-center gap-1 text-blue-400">
//               <Icon name={countIcon} size={13} />{count} {countLabel}
//             </span>
//           )}
//         </div>
//         <span className="text-gray-300 group-hover:text-blue-400 transition-colors">
//           <Icon name="chevron-right" size={16} />
//         </span>
//       </div>
//     </button>
//   );
// };

// // ─── Main Page ────────────────────────────────────────────────────────────────
// const UnifiedListing = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Determine section from URL: /dashboard-client/lesen or /dashboard-client/sprachbausteine
//   const pathParts = location.pathname.split('/');
//   const section = pathParts.includes('sprachbausteine') ? 'sprachbausteine' : 'lesen';

//   const pageTitle = section === 'sprachbausteine' ? 'Sprachbausteine' : 'Leseverstehen';
//   const pageTitleAr = section === 'sprachbausteine' ? 'قواعد اللغة' : 'فهم القراءة';

//   const [levelTab, setLevelTab] = useState('B1');
//   const [subTab, setSubTab] = useState('teil1');
//   const [search, setSearch] = useState('');
//   const [courses, setCourses] = useState([]);
//   const [availableSubTabs, setAvailableSubTabs] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     setLoading(true);
//     const { courses: loaded, subTabs } = buildCourseList(levelTab);
//     setCourses(loaded);
//     setAvailableSubTabs(subTabs);

//     // Auto-select first available sub-tab if current not available
//     if (subTabs.length > 0 && !subTabs.includes(subTab)) {
//       setSubTab(subTabs[0]);
//     }
//     setLoading(false);
//   }, [levelTab]);

//   const filteredCourses = useMemo(() => {
//     const q = search.trim().toLowerCase();
//     // Filter by subTab AND by section type
//     const tab = courses.filter(c => {
//       const matchesSubTab = c.subTab === subTab;
//       const matchesSection = section === 'sprachbausteine'
//         ? c.type === 'sprach'
//         : c.type === 'lesen';
//       return matchesSubTab && matchesSection;
//     });
//     if (!q) return tab;
//     return tab.filter(c =>
//       c.titleDe.toLowerCase().includes(q) || c.titleAr.includes(q)
//     );
//   }, [courses, subTab, search, section]);

//   const handleCardClick = (course) => {
//     const routeBase = section === 'sprachbausteine' ? 'sprachbausteine' : 'lesen';
//     navigate(`/dashboard-client/${routeBase}/${levelTab.toLowerCase()}/${course.subTab}/${course.id}`);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-['Cairo',sans-serif] relative">
//       <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
//         backgroundImage: `linear-gradient(#6366f1 1px,transparent 1px),linear-gradient(90deg,#6366f1 1px,transparent 1px)`,
//         backgroundSize: '60px 60px',
//       }} />
//       <div className="relative">
//         <div className="pt-6 pb-6 px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">

//           {/* Badge */}
//           <div className="flex items-center mb-5">
//             <div className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-3 py-1.5 text-xs text-gray-500 shadow-sm">
//               <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />محاكاة الامتحان
//             </div>
//           </div>

//           {/* Title row */}
//           <div className="flex items-start justify-between gap-6">
//             <div>
//               <h1 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 tracking-tight">
//                 {pageTitle}
//               </h1>
//               <p className="text-gray-400 text-sm mt-1" dir="rtl">{pageTitleAr}</p>
//             </div>
//             <div className="flex-shrink-0 bg-white rounded-2xl border border-gray-200 shadow-sm px-5 py-3 flex items-center gap-5 divide-x divide-gray-100">
//               <div className="text-center pr-5">
//                 <div className="text-xl font-normal text-gray-900">{levelTab}</div>
//                 <div className="text-[11px] text-gray-400 mt-0.5">المستوى</div>
//               </div>
//               <div className="text-center pl-5">
//                 <div className="text-xl font-normal text-gray-900">{filteredCourses.length}</div>
//                 <div className="text-[11px] text-gray-400 mt-0.5">نماذج</div>
//               </div>
//             </div>
//           </div>

//           {/* Level tabs */}
//           <div className="flex justify-center mt-6">
//             <div className="bg-white rounded-2xl border border-gray-200 p-1 flex gap-1 shadow-sm">
//               {['B1', 'B2'].map((lv) => (
//                 <button key={lv} onClick={() => { setLevelTab(lv); setSearch(''); }}
//                   className={`px-6 py-2 rounded-xl text-xs font-normal transition-all duration-200 ${levelTab === lv ? 'bg-white shadow-sm text-gray-900 border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}>
//                   Telc {lv}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Sub-tabs — Shows ALL available tabs for this level */}
//           <div className="mt-4 bg-white rounded-2xl border border-gray-200 p-1 flex items-center gap-1 overflow-x-auto shadow-sm">
//             {availableSubTabs.map((tabKey) => {
//               const tab = SUB_TAB_CONFIG[tabKey] || { labelDe: tabKey, icon: 'file', type: 'lesen' };
//               const isActive = subTab === tabKey;
//               return (
//                 <button key={tabKey} onClick={() => setSubTab(tabKey)}
//                   className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-normal whitespace-nowrap transition-all duration-200 flex-shrink-0 ${isActive ? 'bg-gray-50 text-gray-900 shadow-sm border border-gray-100' : 'text-gray-400 hover:text-gray-600'}`}>
//                   <Icon name={tab.icon} size={14} className={isActive ? 'text-blue-500' : ''} />
//                   {tab.labelDe}
//                 </button>
//               );
//             })}
//           </div>

//           {/* Search */}
//           <div className="mt-4 relative">
//             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
//               <Icon name="search" size={14} />
//             </span>
//             <input type="text" placeholder="ابحث عن المواضيع..." value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="w-full bg-white border border-gray-200 rounded-2xl pl-10 pr-4 py-3 text-sm text-gray-700 placeholder-gray-400 outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-100 transition-all" />
//           </div>
//         </div>

//         {/* Grid */}
//         <div className="px-4 md:px-8 lg:px-12 pb-16 max-w-7xl mx-auto">
//           {loading ? (
//             <div className="text-center py-20 text-gray-400 text-sm">جاري التحميل...</div>
//           ) : filteredCourses.length === 0 ? (
//             <div className="text-center py-20 text-gray-400">
//               <p className="text-sm">لا توجد مواضيع</p>
//               {availableSubTabs.length === 0 && (
//                 <p className="text-xs mt-2 text-red-400">
//                   لا توجد بيانات للمستوى {levelTab} — تأكد من وجود مجلدات data/{levelTab}/
//                 </p>
//               )}
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//               {filteredCourses.map((course) => (
//                 <TopicCard key={`${course.subTab}_${course.id}`} topic={course} onClick={handleCardClick} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UnifiedListing;