import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

// ═══════════════════════════════════════════════════════════════════════════════
// IMPORT YOUR DATA FILES HERE
// ═══════════════════════════════════════════════════════════════════════════════
import q1 from '../data/b2/teil1/jugend-forscht-kellner/q1.json'
import q2 from '../data/b2/teil1/jugend-forscht-kellner/q1.json'
import q3 from '../data/b2/teil1/jugend-forscht-kellner/q1.json'
import q4 from '../data/b2/teil1/jugend-forscht-kellner/q1.json'
import q5 from '../data/b2/teil1/jugend-forscht-kellner/q1.json'

const allQuestions = [q1, q2, q3, q4, q5];

// ═══════════════════════════════════════════════════════════════════════════════
// ICONS
// ═══════════════════════════════════════════════════════════════════════════════
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
const FlagIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
  </svg>
);
const LockIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);
const UnlockIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path d="M7 11V7a5 5 0 0 1 9.9-1"/>
  </svg>
);
const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const ArrowLeftIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7"/>
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

// ═══════════════════════════════════════════════════════════════════════════════
// SINGLE QUESTION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const SingleQuestion = ({
  data,
  questionIndex,
  totalQuestions,
  showTranslation,
  onShowTranslation,
  checked,
  onScoreChange,
}) => {
  const { texts, headings, titleDe, titleAr, level } = data;

  const [assignments, setAssignments] = useState({});
  const [locked, setLocked] = useState(new Set());
  const [activeParagraph, setActiveParagraph] = useState(null);

  const confirmedCount = locked.size;
  const totalCount = texts.length;

  // ✅ Report score upward when checked becomes true
  useEffect(() => {
    if (checked && onScoreChange) {
      const correct = texts.filter(t => assignments[t.id] === t.correctHeadingId).length;
      onScoreChange(correct);
    }
  }, [checked]);

  const isHeadingUsed = (headingId) => {
    return Object.entries(assignments).some(
      ([pid, hid]) => hid === headingId && locked.has(Number(pid))
    );
  };

  const getAssignedParagraph = (headingId) => {
    const entry = Object.entries(assignments).find(
      ([pid, hid]) => hid === headingId && locked.has(Number(pid))
    );
    return entry ? Number(entry[0]) : null;
  };

  const handleParagraphClick = (textId) => {
    if (checked) return;
    if (locked.has(textId)) return;
    setActiveParagraph(textId);
  };

  const handleHeadingClick = (headingId) => {
    if (!activeParagraph || checked) return;
    if (locked.has(activeParagraph)) return;
    if (isHeadingUsed(headingId) && assignments[activeParagraph] !== headingId) return;
    setAssignments(prev => ({ ...prev, [activeParagraph]: headingId }));
  };

  const handleConfirmParagraph = (textId) => {
    if (!assignments[textId] || checked) return;
    setLocked(prev => new Set([...prev, textId]));
    const next = texts.find(t => !locked.has(t.id) && t.id !== textId);
    setActiveParagraph(next ? next.id : null);
  };

  const handleUnconfirmParagraph = (textId) => {
    if (checked) return;
    setLocked(prev => {
      const next = new Set(prev);
      next.delete(textId);
      return next;
    });
    setActiveParagraph(textId);
  };

  const handleReset = () => {
    setAssignments({});
    setLocked(new Set());
    setActiveParagraph(null);
  };

  const getStatus = (text) => {
    if (!checked && !locked.has(text.id)) return 'idle';
    const correct = assignments[text.id] === text.correctHeadingId;
    if (checked) return correct ? 'correct' : 'wrong';
    return 'locked';
  };

  const score = checked ? texts.filter(t => assignments[t.id] === t.correctHeadingId).length : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: 'calc(100vh - 180px)' }}>

      {/* Header Info */}
      <div style={{
        maxWidth: 1100, margin: '0 auto', width: '100%',
        padding: '20px 24px 12px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <span style={{
              background: '#4f46e5', color: '#fff',
              fontSize: 10, fontWeight: 800, padding: '2px 8px', borderRadius: 5,
              letterSpacing: '0.05em',
            }}>{level}</span>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              FRAGE {questionIndex + 1} / {totalQuestions}
            </span>
          </div>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, color: '#0f172a', letterSpacing: '-0.02em' }}>
            {titleDe}
          </h1>
          <p style={{ margin: '4px 0 0', fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
            LESEVERSTEHEN TEIL 1
          </p>
        </div>
        <button
          onClick={onShowTranslation}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 20,
            border: `1.5px solid ${showTranslation ? '#10b981' : '#e2e8f0'}`,
            background: showTranslation ? '#ecfdf5' : '#fff',
            color: showTranslation ? '#059669' : '#64748b',
            fontSize: 12, fontWeight: 600, cursor: 'pointer',
            transition: 'all 0.15s',
          }}
        >
          <FlagIcon />
          {showTranslation ? 'إخفاء' : 'ترجمة'}
        </button>
      </div>

      {/* Main Content */}
      <div style={{
        maxWidth: 1100, margin: '0 auto', width: '100%',
        padding: '0 24px 40px',
        display: 'grid', gridTemplateColumns: '1fr 400px',
        gap: 24, alignItems: 'start', flex: 1,
      }}>

        {/* LEFT: Paragraphs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>

          {!checked && (
            <div style={{
              background: '#fff', border: '1.5px solid #c7d2fe', borderRadius: 14,
              padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 10,
              animation: 'fadeIn 0.3s ease',
            }}>
              <span style={{ fontSize: 20 }}>👆</span>
              <div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 700, color: '#3730a3' }}>
                  Klicke auf einen Abschnitt, dann wähle die passende Überschrift rechts.
                </p>
                <p style={{ margin: '2px 0 0', fontSize: 11, color: '#6366f1', direction: 'rtl' }}>
                  انقر على فقرة، ثم اختر العنوان المناسب من اليمين.
                </p>
              </div>
            </div>
          )}

          {texts.map((text, idx) => {
            const status = getStatus(text);
            const isActive = activeParagraph === text.id && !checked;
            const isLocked = locked.has(text.id);
            const assignedHeading = headings.find(h => h.id === assignments[text.id]);
            const correctHeading = headings.find(h => h.id === text.correctHeadingId);

            let borderColor = '#e2e8f0';
            let bgColor = '#fff';
            let leftBar = 'transparent';
            let shadow = '0 1px 3px rgba(0,0,0,0.04)';

            if (checked) {
              if (status === 'correct') { borderColor = '#86efac'; bgColor = '#f0fdf4'; leftBar = '#22c55e'; }
              else { borderColor = '#fca5a5'; bgColor = '#fef2f2'; leftBar = '#ef4444'; }
            } else if (isLocked) {
              borderColor = '#a5b4fc'; bgColor = '#f5f3ff'; leftBar = '#6366f1';
            } else if (isActive) {
              borderColor = '#6366f1'; bgColor = '#fafafe'; leftBar = '#6366f1';
              shadow = '0 4px 20px rgba(99,102,241,0.15)';
            } else if (assignments[text.id]) {
              borderColor = '#c7d2fe'; bgColor = '#fff'; leftBar = '#a5b4fc';
            }

            return (
              <div
                key={text.id}
                onClick={() => handleParagraphClick(text.id)}
                style={{
                  background: bgColor, border: `1.5px solid ${borderColor}`,
                  borderRadius: 16, overflow: 'hidden',
                  cursor: checked || isLocked ? 'default' : 'pointer',
                  boxShadow: shadow,
                  animation: `fadeUp ${0.08 + idx * 0.04}s ease both`,
                  position: 'relative', transition: 'all 0.2s ease',
                }}
              >
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
                  background: leftBar, borderRadius: '16px 0 0 16px',
                }} />
                <div style={{ padding: '14px 16px 14px 20px' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    marginBottom: 8, gap: 10,
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{
                        width: 26, height: 26, borderRadius: 7,
                        background: checked
                          ? (status === 'correct' ? '#22c55e' : '#ef4444')
                          : isLocked ? '#6366f1'
                          : isActive ? '#6366f1' : '#e2e8f0',
                        color: (checked || isLocked || isActive) ? '#fff' : '#94a3b8',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: 800, flexShrink: 0,
                      }}>
                        {checked
                          ? (status === 'correct' ? <CheckIcon size={14} /> : <XIcon size={14} />)
                          : isLocked ? <CheckIcon size={14} />
                          : idx + 1}
                      </span>
                      <span style={{
                        fontSize: 10, fontWeight: 700, color: '#94a3b8',
                        textTransform: 'uppercase', letterSpacing: '0.08em',
                      }}>
                        Abschnitt {idx + 1}
                      </span>
                    </div>

                    {isLocked && assignedHeading && !checked && (
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 5,
                        padding: '4px 8px', borderRadius: 7,
                        background: '#eef2ff', border: '1.5px solid #a5b4fc',
                        fontSize: 10, fontWeight: 600, color: '#4338ca',
                      }}>
                        <span style={{
                          width: 16, height: 16, borderRadius: 4,
                          background: '#6366f1', color: '#fff',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 8, fontWeight: 800,
                        }}>{String(assignments[text.id]).toUpperCase()}</span>
                        <span style={{ maxWidth: 180, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {assignedHeading.textDe}
                        </span>
                      </div>
                    )}

                    {checked && assignedHeading && (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 2 }}>
                        <div style={{
                          display: 'flex', alignItems: 'center', gap: 4,
                          padding: '4px 8px', borderRadius: 7,
                          background: status === 'correct' ? '#dcfce7' : '#fee2e2',
                          border: `1.5px solid ${status === 'correct' ? '#86efac' : '#fca5a5'}`,
                          fontSize: 10, fontWeight: 600,
                          color: status === 'correct' ? '#15803d' : '#b91c1c',
                        }}>
                          <span style={{
                            width: 14, height: 14, borderRadius: 3,
                            background: status === 'correct' ? '#16a34a' : '#ef4444',
                            color: '#fff', fontSize: 7, fontWeight: 800,
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>{String(assignments[text.id] || '?').toUpperCase()}</span>
                          <span style={{ maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                            {assignedHeading.textDe}
                          </span>
                        </div>
                        {status === 'wrong' && correctHeading && (
                          <div style={{
                            display: 'flex', alignItems: 'center', gap: 3,
                            fontSize: 9, color: '#16a34a', fontWeight: 600,
                          }}>
                            <span>✓</span>
                            <span style={{
                              width: 12, height: 12, borderRadius: 2,
                              background: '#16a34a', color: '#fff',
                              fontSize: 7, fontWeight: 800,
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>{String(text.correctHeadingId).toUpperCase()}</span>
                            <span style={{ maxWidth: 150, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {correctHeading.textDe}
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: '#334155' }}>
                    {text.contentDe}
                  </p>

                  {showTranslation && text.contentAr && (
                    <p style={{
                      margin: '8px 0 0', fontSize: 12, lineHeight: 1.6, color: '#059669',
                      direction: 'rtl', fontWeight: 500,
                      borderTop: '1px dashed #d1fae5', paddingTop: 8,
                    }}>
                      {text.contentAr}
                    </p>
                  )}

                  {isActive && !isLocked && assignments[text.id] && !checked && (
                    <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleConfirmParagraph(text.id); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 5,
                          padding: '7px 14px', borderRadius: 9,
                          background: '#4f46e5', color: '#fff',
                          border: 'none', cursor: 'pointer',
                          fontSize: 12, fontWeight: 700,
                          boxShadow: '0 2px 10px rgba(79,70,229,0.35)',
                          transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#4338ca'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#4f46e5'; }}
                      >
                        <LockIcon size={13} /> Bestätigen
                      </button>
                    </div>
                  )}

                  {isLocked && !checked && (
                    <div style={{ marginTop: 8, display: 'flex', justifyContent: 'flex-end' }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleUnconfirmParagraph(text.id); }}
                        style={{
                          display: 'flex', alignItems: 'center', gap: 4,
                          padding: '4px 10px', borderRadius: 7,
                          background: 'transparent', border: '1.5px solid #c7d2fe',
                          color: '#6366f1', fontSize: 10, fontWeight: 600,
                          cursor: 'pointer', transition: 'all 0.15s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#eef2ff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                      >
                        <UnlockIcon size={12} /> Bearbeiten
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {checked && (
            <div style={{
              marginTop: 4,
              background: score / totalCount >= 0.7 ? '#f0fdf4' : '#fffbeb',
              border: `1.5px solid ${score / totalCount >= 0.7 ? '#86efac' : '#fde68a'}`,
              borderRadius: 14, padding: '16px 20px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              animation: 'fadeUp 0.3s ease',
            }}>
              <div>
                <p style={{ margin: 0, fontSize: 20, fontWeight: 800, color: '#0f172a' }}>
                  {score} / {totalCount} richtig
                </p>
                <p style={{ margin: '4px 0 0', fontSize: 12, color: '#64748b' }}>
                  {Math.round((score / totalCount) * 100)}% — {score / totalCount >= 0.7 ? '🎉 Sehr gut!' : '💪 Weiter üben!'}
                </p>
              </div>
              <button
                onClick={handleReset}
                style={{
                  padding: '8px 18px', borderRadius: 10,
                  background: '#fff', border: '1.5px solid #e2e8f0',
                  fontSize: 12, fontWeight: 700, color: '#374151',
                  cursor: 'pointer', transition: 'all 0.15s',
                }}
              >
                Nochmal versuchen
              </button>
            </div>
          )}
        </div>

        {/* RIGHT: Headings Panel */}
        <div style={{
          position: 'sticky', top: 20,
          background: '#fff', border: '1.5px solid #e2e8f0',
          borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
          animation: 'slideIn 0.3s ease',
        }}>
          <div style={{
            padding: '14px 18px', borderBottom: '1.5px solid #e2e8f0',
            background: '#fafafa',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <p style={{
                margin: 0, fontSize: 12, fontWeight: 800, color: '#0f172a',
                textTransform: 'uppercase', letterSpacing: '0.06em',
              }}>ÜBERSCHRIFTEN</p>
              <p style={{
                margin: '2px 0 0', fontSize: 9, fontWeight: 700, color: '#6366f1',
                textTransform: 'uppercase', letterSpacing: '0.08em',
              }}>FÜR TEXT {questionIndex + 1}</p>
            </div>
            <div style={{
              width: 32, height: 32, borderRadius: '50%',
              background: '#eef2ff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                <polyline points="22 4 12 14.01 9 11.01"/>
              </svg>
            </div>
          </div>

          <div style={{
            padding: '10px 16px', borderBottom: '1px solid #f1f5f9',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b' }}>
              {Object.keys(assignments).filter(k => assignments[k]).length} / {headings.length} zugeordnet
            </span>
            <span style={{ fontSize: 11, fontWeight: 800, color: '#6366f1' }}>
              {confirmedCount} / {totalCount} bestätigt
            </span>
          </div>

          <div style={{ padding: '6px' }}>
            {!activeParagraph && !checked && (
              <div style={{ padding: '24px 12px', textAlign: 'center', color: '#94a3b8' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12, background: '#f1f5f9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 10px', fontSize: 20,
                }}>👆</div>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600 }}>Wähle zuerst einen Abschnitt</p>
                <p style={{ margin: '2px 0 0', fontSize: 10, direction: 'rtl' }}>اختر أولاً فقرة</p>
              </div>
            )}

            {headings.map((h, i) => {
              const isAssignedHere = assignments[activeParagraph] === h.id;
              const usedByOther = isHeadingUsed(h.id);
              const assignedToPara = getAssignedParagraph(h.id);
              const assignedParaIndex = assignedToPara ? texts.findIndex(t => t.id === assignedToPara) : -1;

              let cardBg = '#fff';
              let cardBorder = '#e2e8f0';
              let cardOpacity = 1;
              let cardCursor = 'pointer';

              if (checked) {
                const correctForActive = texts.find(t => t.id === activeParagraph)?.correctHeadingId === h.id;
                if (activeParagraph && correctForActive) { cardBg = '#f0fdf4'; cardBorder = '#86efac'; }
              } else {
                if (!activeParagraph) { cardCursor = 'default'; }
                if (isAssignedHere) { cardBg = '#eef2ff'; cardBorder = '#6366f1'; }
                else if (usedByOther) { cardBg = '#f8fafc'; cardBorder = '#e2e8f0'; cardOpacity = 0.5; }
              }

              return (
                <div
                  key={h.id}
                  onClick={() => handleHeadingClick(h.id)}
                  style={{
                    padding: '10px 12px', margin: '3px 0', borderRadius: 10,
                    background: cardBg, border: `1.5px solid ${cardBorder}`,
                    cursor: cardCursor, opacity: cardOpacity,
                    transition: 'all 0.15s ease',
                    display: 'flex', alignItems: 'flex-start', gap: 8,
                    animation: `fadeUp ${0.05 + i * 0.03}s ease both`,
                  }}
                >
                  <span style={{
                    flexShrink: 0, width: 22, height: 22, borderRadius: 6,
                    background: isAssignedHere ? '#6366f1' : usedByOther ? '#e2e8f0' : '#f1f5f9',
                    color: isAssignedHere ? '#fff' : usedByOther ? '#94a3b8' : '#64748b',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 10, fontWeight: 800, marginTop: 1,
                  }}>
                    {String(h.id).toUpperCase()}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      margin: 0, fontSize: 11.5, fontWeight: 600,
                      color: usedByOther ? '#94a3b8' : '#1e293b', lineHeight: 1.4,
                    }}>
                      {h.textDe}
                    </p>
                    {showTranslation && (
                      <p style={{
                        margin: '2px 0 0', fontSize: 10, color: '#059669',
                        direction: 'rtl', fontWeight: 500, lineHeight: 1.35,
                      }}>
                        {h.textAr}
                      </p>
                    )}
                    {usedByOther && assignedParaIndex >= 0 && !checked && (
                      <p style={{ margin: '3px 0 0', fontSize: 9, color: '#f59e0b', fontWeight: 600 }}>
                        Abschnitt {assignedParaIndex + 1}
                      </p>
                    )}
                  </div>
                  {isAssignedHere && !checked && (
                    <span style={{ color: '#6366f1', flexShrink: 0, marginTop: 3 }}>
                      <CheckIcon size={14} />
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {activeParagraph && !checked && (
            <div style={{ padding: '10px 16px', borderTop: '1.5px solid #e2e8f0', background: '#fafafa' }}>
              <p style={{ margin: 0, fontSize: 10, fontWeight: 700, color: '#6366f1', textAlign: 'center' }}>
                Abschnitt {texts.findIndex(t => t.id === activeParagraph) + 1} ausgewählt
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════
const LesenExercise = () => {
  // ✅ Hooks inside component
  const navigate = useNavigate();
  const { level, subTab, topicId } = useParams();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [checkedQuestions, setCheckedQuestions] = useState(new Set());
  const [showTranslation, setShowTranslation] = useState(false);
  // ✅ Track score per question index
  const [questionScores, setQuestionScores] = useState({});

  const totalQuestions = allQuestions.length;
  const currentData = allQuestions[currentQuestion];
  const isChecked = checkedQuestions.has(currentQuestion);
  const isFirst = currentQuestion === 0;
  const isLast = currentQuestion === totalQuestions - 1;

  const handleCheckAnswers = () => {
    setCheckedQuestions(prev => new Set([...prev, currentQuestion]));
  };

  const handleNext = () => {
    if (currentQuestion < totalQuestions - 1) setCurrentQuestion(prev => prev + 1);
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) setCurrentQuestion(prev => prev - 1);
  };

  // ✅ Callback received from SingleQuestion when checked
  const handleScoreChange = (score) => {
    setQuestionScores(prev => ({ ...prev, [currentQuestion]: score }));
  };

  // ✅ Navigate to result page with computed totals
  const handleShowResult = () => {
    let totalCorrect = 0;
    let totalPossible = 0;

    allQuestions.forEach((q, i) => {
      totalPossible += q.texts.length;
      if (questionScores[i] !== undefined) {
        totalCorrect += questionScores[i];
      }
    });

    const passingScore = Math.ceil(totalPossible * 0.6);

    navigate(
      `/dashboard-client/lesen/${level}/${subTab}/${topicId}/result`,
      {
        state: {
          score: totalCorrect,
          total: totalPossible,
          passingScore,
          examTitle: 'Lesen Teil 1',
          examSubtitle: currentData.titleDe || '',
          level: level || 'B2',
          strengths: [],
          improvements: [{ topic: 'Lesen Teil 1', message: 'نوصي بإعادة: Lesen Teil 1.' }],
        },
      }
    );
  };

  const handleResetAll = () => {
    setCurrentQuestion(0);
    setCheckedQuestions(new Set());
    setQuestionScores({});
  };

  return (
    <div style={{
      fontFamily: "'Segoe UI', 'SF Pro Display', system-ui, -apple-system, sans-serif",
      minHeight: '100vh',
      background: '#f1f5f9',
    }}>
      <style>{`
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        @keyframes slideIn { from { opacity:0; transform:translateX(12px); } to { opacity:1; transform:translateX(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      `}</style>

      {/* Top Navigation Bar */}
      <div style={{
        background: '#fff', borderBottom: '1px solid #e2e8f0',
        padding: '10px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button
            onClick={() => navigate(-1)}
            style={{
              width: 34, height: 34, borderRadius: 10,
              border: '1.5px solid #e2e8f0', background: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#64748b',
            }}
          >
            <ArrowLeftIcon />
          </button>
          <div>
            <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Lesen Teil 1</p>
            <p style={{ margin: 0, fontSize: 10, color: '#94a3b8' }}>{level} · {currentData.titleDe}</p>
          </div>
        </div>

        {/* Question dots */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {allQuestions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentQuestion(i)}
              style={{
                width: 28, height: 28, borderRadius: 8,
                background: i === currentQuestion ? '#4f46e5' : checkedQuestions.has(i) ? '#10b981' : '#e2e8f0',
                color: i === currentQuestion || checkedQuestions.has(i) ? '#fff' : '#94a3b8',
                border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 11, fontWeight: 700, cursor: 'pointer',
                transition: 'all 0.2s',
                boxShadow: i === currentQuestion ? '0 0 0 3px #e0e7ff' : 'none',
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>

        <button style={{
          width: 34, height: 34, borderRadius: '50%',
          border: '1.5px solid #e2e8f0', background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', color: '#f59e0b',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        </button>
      </div>

      {/* Question Content */}
      <SingleQuestion
        key={currentQuestion}
        data={currentData}
        questionIndex={currentQuestion}
        totalQuestions={totalQuestions}
        showTranslation={showTranslation}
        onShowTranslation={() => setShowTranslation(s => !s)}
        checked={isChecked}
        onScoreChange={handleScoreChange}
      />

      {/* Bottom Navigation Bar */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'rgba(255,255,255,0.98)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid #e2e8f0',
        padding: '14px 24px', zIndex: 90,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.04)',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Check Answers */}
          <button
            onClick={handleCheckAnswers}
            disabled={isChecked}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '10px 20px', borderRadius: 12,
              background: isChecked ? '#e2e8f0' : '#4f46e5',
              color: isChecked ? '#94a3b8' : '#fff',
              border: 'none', cursor: isChecked ? 'not-allowed' : 'pointer',
              fontSize: 13, fontWeight: 700,
              boxShadow: isChecked ? 'none' : '0 4px 16px rgba(79,70,229,0.35)',
              transition: 'all 0.2s',
            }}
          >
            <VerifyIcon />
            تحقق من الإجابات
          </button>

          {/* Progress */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#64748b' }}>
              Frage {currentQuestion + 1} / {totalQuestions}
            </span>
            <div style={{ width: 120, height: 4, background: '#e2e8f0', borderRadius: 99, overflow: 'hidden' }}>
              <div style={{
                width: `${((currentQuestion + 1) / totalQuestions) * 100}%`,
                height: '100%', background: '#4f46e5', borderRadius: 99, transition: 'width 0.4s',
              }} />
            </div>
          </div>

          {/* Prev / Result / Next */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button
              onClick={handlePrevious}
              disabled={isFirst}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 18px', borderRadius: 12,
                background: isFirst ? '#f1f5f9' : '#fff',
                color: isFirst ? '#cbd5e1' : '#64748b',
                border: '1.5px solid #e2e8f0',
                cursor: isFirst ? 'not-allowed' : 'pointer',
                fontSize: 13, fontWeight: 700, transition: 'all 0.15s',
              }}
            >
              <ArrowLeftIcon /> السابق
            </button>

            {/* ✅ Result button navigates to result page */}
            <button
              onClick={handleShowResult}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 18px', borderRadius: 12,
                background: '#fff', color: '#4f46e5',
                border: '1.5px solid #c7d2fe',
                cursor: 'pointer', fontSize: 13, fontWeight: 700, transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#eef2ff'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; }}
            >
              <ResultIcon /> النتيجة
            </button>

            <button
              onClick={handleNext}
              disabled={isLast}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '10px 20px', borderRadius: 12,
                background: isLast ? '#f1f5f9' : '#4f46e5',
                color: isLast ? '#cbd5e1' : '#fff',
                border: 'none', cursor: isLast ? 'not-allowed' : 'pointer',
                fontSize: 13, fontWeight: 700, transition: 'all 0.2s',
                boxShadow: isLast ? 'none' : '0 4px 16px rgba(79,70,229,0.35)',
              }}
              onMouseEnter={e => { if (!isLast) { e.currentTarget.style.background = '#4338ca'; e.currentTarget.style.transform = 'translateY(-1px)'; }}}
              onMouseLeave={e => { if (!isLast) { e.currentTarget.style.background = '#4f46e5'; e.currentTarget.style.transform = 'translateY(0)'; }}}
            >
              التالي <ArrowRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LesenExercise;