import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// ═══════════════════════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════════════════════
const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
);
const AlertCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="8" x2="12" y2="12"/>
    <line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const RefreshIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10"/>
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
  </svg>
);
const HomeIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);
const EyeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);
const AwardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="7"/>
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/>
  </svg>
);
const TrendingUpIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/>
    <polyline points="17 6 23 6 23 12"/>
  </svg>
);

// ═══════════════════════════════════════════════════════════════════════════════
// RESULT PAGE
// ═══════════════════════════════════════════════════════════════════════════════
const ResultPage = () => {
  const navigate = useNavigate();
  // ✅ Read state passed by navigate() in LesenExercise
  const { state } = useLocation();

  const {
    score = 0,
    total = 25,
    passingScore = 15,
    examTitle = 'Lesen Teil 1',
    examSubtitle = '',
    level = 'B2',
    strengths = [],
    improvements = [{ topic: 'Lesen Teil 1', message: 'نوصي بإعادة: Lesen Teil 1.' }],
  } = state || {};

  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const passed = score >= passingScore;

  const statusText = passed ? 'ناجح' : 'لم ينجح';
  const statusColor = passed ? '#22c55e' : '#f59e0b';
  const badgeText = passed ? 'ناجح' : 'راسب';
  const badgeBg = passed ? '#dcfce7' : '#fef3c7';
  const badgeColor = passed ? '#16a34a' : '#d97706';

  const onRetake = () => navigate(-1);
  const onBackToUnits = () => navigate(-1);
  const onBackToHome = () => navigate('/dashboard-client');

  return (
    <div
      dir="rtl"
      style={{
        fontFamily: "'Segoe UI', 'SF Pro Display', system-ui, -apple-system, sans-serif",
        minHeight: '100vh',
        background: '#f8fafc',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(12px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
        * { box-sizing: border-box; }
      `}</style>

      {/* Top Bar */}
      <div style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={onBackToUnits}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 16px', borderRadius: 10,
            border: '1.5px solid #e2e8f0', background: '#fff',
            color: '#475569', fontSize: 14, fontWeight: 600,
            cursor: 'pointer', transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc'; }}
          onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
        >
          العودة إلى الوحدات
          <ArrowRightIcon />
        </button>
        <button style={{
          width: 40, height: 40, borderRadius: 12,
          border: '1.5px solid #fde68a', background: '#fffbeb',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#f59e0b',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px 60px' }}>

        {/* Status Banner */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 20, animation: 'fadeIn 0.4s ease' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 20px', borderRadius: 20,
            background: passed ? '#f0fdf4' : '#fffbeb',
            border: `1.5px solid ${passed ? '#86efac' : '#fde68a'}`,
            color: passed ? '#16a34a' : '#d97706',
            fontSize: 14, fontWeight: 700,
          }}>
            {passed ? <CheckCircleIcon /> : <AlertCircleIcon />}
            <span>{passed ? 'تهانينا! اجتزت الاختبار' : 'لم يتم اجتياز الاختبار'}</span>
          </div>
        </div>

        {/* Big Result Card */}
        <div style={{
          background: '#fff', borderRadius: 20,
          padding: '40px 32px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          border: '1.5px solid #f1f5f9',
          textAlign: 'center', marginBottom: 24,
          animation: 'fadeUp 0.5s ease',
        }}>
          <h1 style={{ margin: '0 0 8px', fontSize: 40, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            {passed ? '🎉 أحسنت! لقد نجحت.' : 'للأسف، لم تنجح هذه المرة.'}
          </h1>
          <p style={{ margin: '0 0 32px', fontSize: 16, color: '#64748b', lineHeight: 1.6 }}>
            {passed
              ? 'لقد تجاوزت الدرجة المطلوبة. استمر في التقدم!'
              : 'للأسف، لم تصل إلى الدرجة المطلوبة وهي 60%. استخدم التحليل أدناه للتدرب بشكل مكثف.'}
          </p>

          {/* Score Stats */}
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0,
            borderTop: '1.5px solid #f1f5f9', paddingTop: 32,
          }}>
            <div style={{ textAlign: 'center', borderLeft: '1.5px solid #f1f5f9', padding: '0 16px' }}>
              <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                التقييم
              </p>
              <p style={{ margin: 0, fontSize: 36, fontWeight: 800, color: statusColor }}>{statusText}</p>
            </div>
            <div style={{ textAlign: 'center', borderLeft: '1.5px solid #f1f5f9', padding: '0 16px' }}>
              <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                النسبة المئوية
              </p>
              <p style={{ margin: 0, fontSize: 48, fontWeight: 800, color: statusColor }}>{percentage}%</p>
            </div>
            <div style={{ textAlign: 'center', padding: '0 16px' }}>
              <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                النتيجة الإجمالية
              </p>
              <p style={{ margin: 0, fontSize: 36, fontWeight: 800, color: '#0f172a' }}>
                <span style={{ color: '#94a3b8' }}>{total} / </span>
                <span style={{ fontSize: 48 }}>{score}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20, alignItems: 'start' }}>

          {/* LEFT */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>

            {/* Exam Card */}
            <div style={{
              background: '#fff', borderRadius: 16, padding: '20px 24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1.5px solid #e2e8f0',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              animation: 'slideIn 0.4s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 4, height: 50, background: '#3b82f6', borderRadius: 4 }} />
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0f172a' }}>{examTitle}</h3>
                    <span style={{
                      padding: '3px 12px', borderRadius: 8,
                      background: badgeBg, color: badgeColor,
                      fontSize: 12, fontWeight: 700,
                    }}>{badgeText}</span>
                  </div>
                  <p style={{ margin: 0, fontSize: 14, color: '#64748b' }}>{examSubtitle}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 200, height: 6, background: '#f1f5f9', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{
                    width: `${percentage}%`, height: '100%',
                    background: statusColor, borderRadius: 99, transition: 'width 0.8s ease',
                  }} />
                </div>
                <p style={{ margin: 0, fontSize: 18, fontWeight: 800, color: '#0f172a' }}>
                  <span style={{ color: '#94a3b8' }}>{total} / </span>{score}
                </p>
                <button style={{
                  width: 36, height: 36, borderRadius: 10,
                  border: '1.5px solid #e2e8f0', background: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: '#64748b',
                }}>
                  <EyeIcon />
                </button>
              </div>
            </div>

            {/* Performance Analysis */}
            <div style={{
              background: '#fff', borderRadius: 16, padding: '24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1.5px solid #f1f5f9',
              animation: 'fadeUp 0.5s ease',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <AwardIcon />
                <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0f172a' }}>تحليل الأداء</h3>
              </div>

              {/* Strengths */}
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '16px', borderRadius: 12,
                background: '#f0fdf4', border: '1.5px solid #bbf7d0', marginBottom: 12,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', background: '#dcfce7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <CheckCircleIcon />
                </div>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: '#166534' }}>نقاط القوة</p>
                  {strengths.length > 0 ? (
                    strengths.map((s, i) => (
                      <p key={i} style={{ margin: '0 0 2px', fontSize: 13, color: '#15803d' }}>{s}</p>
                    ))
                  ) : (
                    <p style={{ margin: 0, fontSize: 13, color: '#15803d', fontStyle: 'italic' }}>
                      لا توجد نقاط قوة مميزة فوق 80%.
                    </p>
                  )}
                </div>
              </div>

              {/* Improvements */}
              <div style={{
                display: 'flex', alignItems: 'flex-start', gap: 12,
                padding: '16px', borderRadius: 12,
                background: '#fffbeb', border: '1.5px solid #fde68a',
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', background: '#fef3c7',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <AlertCircleIcon />
                </div>
                <div>
                  <p style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: '#92400e' }}>نقاط التحسين</p>
                  {improvements.map((imp, i) => (
                    <p key={i} style={{ margin: '0 0 2px', fontSize: 13, color: '#a16207' }}>{imp.message}</p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Actions */}
          <div style={{
            background: '#fff', borderRadius: 16, padding: '24px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1.5px solid #f1f5f9',
            animation: 'fadeUp 0.6s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <TrendingUpIcon />
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 700, color: '#0f172a' }}>نتائج مفصلة</h3>
            </div>

            <p style={{ margin: '0 0 20px', fontSize: 13, color: '#64748b', lineHeight: 1.6 }}>
              يمكنك إعادة الاختبار للتحسين، أو العودة للقائمة الرئيسية.
            </p>

            {/* Retake */}
            <button
              onClick={onRetake}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px', borderRadius: 12,
                background: '#fff', border: '1.5px solid #e2e8f0',
                color: '#374151', fontSize: 15, fontWeight: 700,
                cursor: 'pointer', marginBottom: 12, transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#f8fafc'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
            >
              <RefreshIcon /> إعادة الاختبار
            </button>

            {/* Home */}
            <button
              onClick={onBackToHome}
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '14px', borderRadius: 12,
                background: '#3b82f6', border: 'none',
                color: '#fff', fontSize: 15, fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(59,130,246,0.35)',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#2563eb'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#3b82f6'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              <HomeIcon /> العودة للقائمة الرئيسية
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;