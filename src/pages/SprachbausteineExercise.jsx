import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// ═══════════════════════════════════════════════════════════════════════════════
// IMPORT DATA
// ═══════════════════════════════════════════════════════════════════════════════
const allJsonModules = import.meta.glob('../data/**/*.json', { eager: true });

// ═══════════════════════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════════════════════
const ArrowLeftIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const CheckIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const XIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const VerifyIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const ResultIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
    <polyline points="10 9 9 9 8 9"/>
  </svg>
);
const InfoIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);
const FlagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
  </svg>
);
const MoonIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════════
// FETCH DATA FUNCTION
// ═══════════════════════════════════════════════════════════════════════════════
const fetchCourseData = (level, subTab, courseId) => {
  for (const [path, module] of Object.entries(allJsonModules)) {
    const normalized = path.replace(/\\/g, '/').toLowerCase();
    const parts = normalized.split('/');
    const levelIdx = parts.findIndex(p => p === level.toLowerCase());
    if (levelIdx === -1) continue;
    if (parts.length < levelIdx + 3) continue;
    const pathSubTab = parts[levelIdx + 1];
    const pathCourseId = parts[levelIdx + 2];
    if (pathSubTab === subTab.toLowerCase() && pathCourseId === courseId.toLowerCase()) {
      return module.default || module;
    }
  }
  return null;
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const SprachbausteineExercise = () => {
  const navigate = useNavigate();
  const { level, subTab, topicId } = useParams();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [checked, setChecked] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [activeGap, setActiveGap] = useState(null);

  useEffect(() => {
    setLoading(true);
    const courseData = fetchCourseData(level, subTab, topicId);
    if (courseData) setData(courseData);
    setLoading(false);
  }, [level, subTab, topicId]);

  const gaps = useMemo(() => {
    if (!data) return [];
    return data.paragraphs.filter(p => p.gapIndex !== null && p.gapIndex !== undefined);
  }, [data]);

  const paragraphs = useMemo(() => {
    if (!data) return [];
    return data.paragraphs;
  }, [data]);

  const answeredCount = useMemo(() => {
    return Object.values(selectedOptions).filter(v => v !== null && v !== undefined).length;
  }, [selectedOptions]);

  const totalGaps = data?.totalGaps || 0;
  const score = useMemo(() => {
    if (!checked) return 0;
    let correct = 0;
    gaps.forEach(gap => {
      if (selectedOptions[gap.gapIndex] === gap.correctOptionId) correct++;
    });
    return correct;
  }, [checked, selectedOptions, gaps]);

  const handleSelectOption = (gapIndex, optionId) => {
    if (checked) return;
    setSelectedOptions(prev => ({ ...prev, [gapIndex]: optionId }));
    setActiveGap(gapIndex);
  };

  const handleCheckAnswers = () => setChecked(true);

  const handleReset = () => {
    setSelectedOptions({});
    setChecked(false);
    setActiveGap(null);
  };

  const handleShowResult = () => {
    const passingScore = data?.passingScore || Math.ceil(totalGaps * 0.6);
    navigate(
      `/dashboard-client/sprachbausteine/${level}/${subTab}/${topicId}/result`,
      {
        state: {
          score: score,
          total: totalGaps,
          passingScore: passingScore,
          examTitle: data?.examType || 'Sprachbausteine Teil 1',
          examSubtitle: data?.titleDe || '',
          level: level?.toUpperCase() || 'B2',
          strengths: score / totalGaps >= 0.8 ? [{ topic: 'Sprachbausteine', message: 'أداء ممتاز في قواعد اللغة!' }] : [],
          improvements: score / totalGaps < 0.8 
            ? [{ topic: 'Sprachbausteine Teil 1', message: 'نوصي بإعادة: Sprachbausteine Teil 1.' }]
            : [],
        },
      }
    );
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontFamily: "'Segoe UI', 'SF Pro Display', system-ui, -apple-system, sans-serif" }}>
        <p style={{ color: '#94a3b8', fontSize: 14 }}>جاري التحميل...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontFamily: "'Segoe UI', 'SF Pro Display', system-ui, -apple-system, sans-serif", flexDirection: 'column', gap: 16 }}>
        <p style={{ color: '#ef4444', fontSize: 16, fontWeight: 700 }}>⚠️ لم يتم العثور على البيانات</p>
        <p style={{ color: '#94a3b8', fontSize: 13 }}>المسار المتوقع: data/{level?.toUpperCase()}/{subTab}/{topicId}/content.json</p>
        <button onClick={() => navigate(-1)} style={{ padding: '10px 20px', borderRadius: 10, background: '#4f46e5', color: '#fff', border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 700 }}>العودة</button>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Segoe UI', 'SF Pro Display', system-ui, -apple-system, sans-serif", minHeight: '100vh', background: '#f8fafc' }}>
      <style>{`
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(12px); } to { opacity:1; transform:translateX(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      `}</style>

      {/* TOP NAVIGATION BAR */}
      <div style={{ background: '#fff', borderBottom: '1px solid #e2e8f0', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 100, boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button onClick={() => navigate(-1)} style={{ width: 38, height: 38, borderRadius: 12, border: '1.5px solid #e2e8f0', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b' }}>
            <ArrowLeftIcon />
          </button>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
              <span style={{ background: '#4f46e5', color: '#fff', fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 5, letterSpacing: '0.05em' }}>{data.level}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>SESSION</span>
            </div>
            <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#0f172a' }}>{data.examType}</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setShowTranslation(s => !s)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 16px', borderRadius: 20, border: `1.5px solid ${showTranslation ? '#10b981' : '#e2e8f0'}`, background: showTranslation ? '#ecfdf5' : '#fff', color: showTranslation ? '#059669' : '#64748b', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>
            <FlagIcon /> {showTranslation ? 'إخفاء الترجمة' : 'الترجمة'}
          </button>
          <button style={{ width: 38, height: 38, borderRadius: '50%', border: '1.5px solid #fde68a', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#f59e0b' }}>
            <MoonIcon />
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px', display: 'grid', gridTemplateColumns: '1fr 420px', gap: 24, alignItems: 'start', paddingBottom: 100 }}>

        {/* LEFT: Text with Gaps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Title Card */}
          <div style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #e2e8f0', padding: '28px 32px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', textAlign: 'center', animation: 'fadeIn 0.4s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginBottom: 20 }}>
              <button onClick={() => setShowTranslation(false)} style={{ padding: '8px 24px', borderRadius: 12, border: 'none', background: !showTranslation ? '#4f46e5' : 'transparent', color: !showTranslation ? '#fff' : '#94a3b8', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>الأساسي</button>
              <button onClick={() => setShowTranslation(true)} style={{ padding: '8px 24px', borderRadius: 12, border: 'none', background: showTranslation ? '#4f46e5' : 'transparent', color: showTranslation ? '#fff' : '#94a3b8', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>المعادل</button>
            </div>
            <h1 style={{ margin: '0 0 8px', fontSize: 32, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>{data.titleDe}</h1>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 12 }}>
              <div style={{ width: 40, height: 1, background: '#e2e8f0' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>{data.examType}</span>
              <div style={{ width: 40, height: 1, background: '#e2e8f0' }} />
            </div>
          </div>

          {/* Text Content */}
          <div style={{ background: '#fff', borderRadius: 20, border: '1.5px solid #e2e8f0', padding: '32px', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', animation: 'fadeUp 0.5s ease' }}>
            <div style={{ fontSize: 15, lineHeight: 2.2, color: '#334155', textAlign: showTranslation ? 'right' : 'left', direction: showTranslation ? 'rtl' : 'ltr' }}>
              {paragraphs.map((para) => {
                const isGap = para.gapIndex !== null && para.gapIndex !== undefined;
                if (!isGap) {
                  return (
                    <span key={para.id}>
                      {showTranslation ? <span style={{ color: '#059669', fontWeight: 500 }}>{para.contentAr}</span> : <span>{para.contentDe}</span>}
                    </span>
                  );
                }
                return (
                  <span key={para.id}>
                    {showTranslation ? <span style={{ color: '#059669', fontWeight: 500 }}>{para.contentAr}{' '}</span> : <span>{para.contentDe}{' '}</span>}
                    <GapInline gapIndex={para.gapIndex} selectedOption={selectedOptions[para.gapIndex]} correctOptionId={para.correctOptionId} checked={checked} onClick={() => setActiveGap(para.gapIndex)} isActive={activeGap === para.gapIndex} options={para.options} />
                    {' '}
                  </span>
                );
              })}
            </div>
            <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px dashed #e2e8f0', fontSize: 14, color: '#64748b', fontStyle: 'italic' }}>
              {showTranslation ? <span style={{ color: '#059669', direction: 'rtl', display: 'block' }}>مع أطيب التحيات،<br/>نادين</span> : <span>Viele Grüße,<br/>Nadine</span>}
            </div>
          </div>

          {/* Score Summary */}
          {checked && (
            <div style={{ background: score / totalGaps >= 0.6 ? '#f0fdf4' : '#fffbeb', border: `1.5px solid ${score / totalGaps >= 0.6 ? '#86efac' : '#fde68a'}`, borderRadius: 16, padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', animation: 'fadeUp 0.3s ease' }}>
              <div>
                <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>{score} / {totalGaps} richtig</p>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: '#64748b' }}>{Math.round((score / totalGaps) * 100)}% — {score / totalGaps >= 0.6 ? '🎉 Sehr gut!' : '💪 Weiter üben!'}</p>
              </div>
              <button onClick={handleReset} style={{ padding: '10px 20px', borderRadius: 10, background: '#fff', border: '1.5px solid #e2e8f0', fontSize: 13, fontWeight: 700, color: '#374151', cursor: 'pointer' }}>Nochmal versuchen</button>
            </div>
          )}
        </div>

        {/* RIGHT: Aufgaben Panel - EXACTLY LIKE THE SCREENSHOT */}
        <div style={{ position: 'sticky', top: 80, background: '#fff', borderRadius: 20, border: '1.5px solid #e2e8f0', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', overflow: 'hidden', animation: 'slideIn 0.4s ease' }}>

          {/* Header */}
          <div style={{ padding: '16px 20px', borderBottom: '1.5px solid #e2e8f0', background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: '#eef2ff', border: '1.5px solid #c7d2fe', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <InfoIcon />
              </div>
              <div>
                <p style={{ margin: 0, fontSize: 13, fontWeight: 800, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.06em' }}>AUFGABEN</p>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 80, height: 4, background: '#e2e8f0', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{ width: `${(answeredCount / totalGaps) * 100}%`, height: '100%', background: '#4f46e5', borderRadius: 99, transition: 'width 0.4s ease' }} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 800, color: '#6366f1' }}>{answeredCount}/{totalGaps}</span>
            </div>
          </div>

          {/* Gaps List - HORIZONTAL OPTIONS LIKE SCREENSHOT */}
          <div style={{ padding: '12px 16px', overflowY: 'auto' }}>
            {gaps.map((gap, idx) => {
              const isSelected = selectedOptions[gap.gapIndex] !== undefined && selectedOptions[gap.gapIndex] !== null;
              const isCorrect = checked && selectedOptions[gap.gapIndex] === gap.correctOptionId;
              const isWrong = checked && selectedOptions[gap.gapIndex] && selectedOptions[gap.gapIndex] !== gap.correctOptionId;

              return (
                <div key={gap.gapIndex} style={{ margin: '10px 0', animation: `fadeUp ${0.05 + idx * 0.03}s ease both` }}>

                  {/* Gap Number + Label */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{
                      width: 28, height: 28, borderRadius: '50%',
                      background: isCorrect ? '#22c55e' : isWrong ? '#ef4444' : '#e2e8f0',
                      color: (isCorrect || isWrong) ? '#fff' : '#64748b',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 11, fontWeight: 800, flexShrink: 0,
                    }}>
                      {checked ? (isCorrect ? <CheckIcon size={12} /> : <XIcon size={12} />) : gap.gapIndex}
                    </span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Lücke {gap.gapIndex}</span>
                    {checked && (
                      <span style={{ marginLeft: 'auto', fontSize: 10, fontWeight: 700, color: isCorrect ? '#16a34a' : '#dc2626' }}>
                        {isCorrect ? '✓ Richtig' : '✗ Falsch'}
                      </span>
                    )}
                  </div>

                  {/* Options - 3 IN A ROW (HORIZONTAL) */}
                  <div style={{ display: 'flex', gap: 8 }}>
                    {gap.options.map((opt) => {
                      const isThisSelected = selectedOptions[gap.gapIndex] === opt.id;
                      const isCorrectOption = opt.id === gap.correctOptionId;

                      let optBg = '#fff';
                      let optBorder = '#e2e8f0';
                      let optColor = '#334155';

                      if (checked) {
                        if (isCorrectOption) {
                          optBg = '#f0fdf4';
                          optBorder = '#86efac';
                          optColor = '#16a34a';
                        } else if (isThisSelected && !isCorrectOption) {
                          optBg = '#fef2f2';
                          optBorder = '#fca5a5';
                          optColor = '#dc2626';
                        }
                      } else if (isThisSelected) {
                        optBg = '#eef2ff';
                        optBorder = '#6366f1';
                        optColor = '#4338ca';
                      }

                      return (
                        <button
                          key={opt.id}
                          onClick={() => handleSelectOption(gap.gapIndex, opt.id)}
                          disabled={checked}
                          style={{
                            flex: 1,
                            padding: '10px 8px',
                            borderRadius: 10,
                            background: optBg,
                            border: `1.5px solid ${optBorder}`,
                            color: optColor,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: checked ? 'default' : 'pointer',
                            textAlign: 'center',
                            transition: 'all 0.15s ease',
                          }}
                        >
                          {opt.textDe}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* BOTTOM NAVIGATION BAR */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, background: 'rgba(255,255,255,0.98)', backdropFilter: 'blur(12px)', borderTop: '1px solid #e2e8f0', padding: '14px 24px', zIndex: 90, boxShadow: '0 -4px 20px rgba(0,0,0,0.04)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={handleCheckAnswers} disabled={checked || answeredCount < totalGaps} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 12, background: checked ? '#e2e8f0' : answeredCount < totalGaps ? '#e2e8f0' : '#4f46e5', color: checked ? '#94a3b8' : answeredCount < totalGaps ? '#94a3b8' : '#fff', border: 'none', cursor: checked || answeredCount < totalGaps ? 'not-allowed' : 'pointer', fontSize: 14, fontWeight: 700, boxShadow: checked || answeredCount < totalGaps ? 'none' : '0 4px 16px rgba(79,70,229,0.35)' }}>
            <VerifyIcon /> تحقق من الإجابات
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#64748b' }}>{answeredCount} / {totalGaps} Lücken</span>
            <div style={{ width: 120, height: 4, background: '#e2e8f0', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{ width: `${(answeredCount / totalGaps) * 100}%`, height: '100%', background: '#4f46e5', borderRadius: 99, transition: 'width 0.4s' }} />
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* <button onClick={() => navigate(-1)} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 20px', borderRadius: 12, background: '#fff', color: '#64748b', border: '1.5px solid #e2e8f0', cursor: 'pointer', fontSize: 14, fontWeight: 700 }}><ArrowLeftIcon /> السابق</button> */}
            <button onClick={handleShowResult} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 20px', borderRadius: 12, background: '#fff', color: '#4f46e5', border: '1.5px solid #c7d2fe', cursor: 'pointer', fontSize: 14, fontWeight: 700 }}><ResultIcon /> النتيجة</button>
            {/* <button disabled={true} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '12px 20px', borderRadius: 12, background: '#f1f5f9', color: '#cbd5e1', border: 'none', cursor: 'not-allowed', fontSize: 14, fontWeight: 700 }}>التالي <ArrowRightIcon /></button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// INLINE GAP COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const GapInline = ({ gapIndex, selectedOption, correctOptionId, checked, onClick, isActive, options }) => {
  const isCorrect = checked && selectedOption === correctOptionId;
  const isWrong = checked && selectedOption && selectedOption !== correctOptionId;

  let borderColor = '#e2e8f0';
  let bgColor = '#fff';
  let textColor = '#64748b';

  if (checked) {
    if (isCorrect) { borderColor = '#86efac'; bgColor = '#f0fdf4'; textColor = '#16a34a'; }
    else if (isWrong) { borderColor = '#fca5a5'; bgColor = '#fef2f2'; textColor = '#dc2626'; }
    else { borderColor = '#fde68a'; bgColor = '#fffbeb'; textColor = '#d97706'; }
  } else if (isActive) {
    borderColor = '#6366f1'; bgColor = '#eef2ff'; textColor = '#4338ca';
  } else if (selectedOption) {
    borderColor = '#c7d2fe'; bgColor = '#fff'; textColor = '#4338ca';
  }

  const selectedText = selectedOption ? options?.find(o => o.id === selectedOption)?.textDe : null;

  return (
    <span onClick={onClick} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', minWidth: 60, padding: '4px 10px', borderRadius: 8, border: `2px solid ${borderColor}`, background: bgColor, color: textColor, fontSize: 14, fontWeight: 700, cursor: checked ? 'default' : 'pointer', transition: 'all 0.2s ease', verticalAlign: 'middle', margin: '0 2px', position: 'relative' }}>
      {selectedText || `(${gapIndex})`}
      {checked && isCorrect && <span style={{ position: 'absolute', top: -6, right: -6, width: 14, height: 14, borderRadius: '50%', background: '#22c55e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CheckIcon size={8} /></span>}
      {checked && isWrong && <span style={{ position: 'absolute', top: -6, right: -6, width: 14, height: 14, borderRadius: '50%', background: '#ef4444', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><XIcon size={8} /></span>}
    </span>
  );
};

export default SprachbausteineExercise;
