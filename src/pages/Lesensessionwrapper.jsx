import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// ─── Icons ───────────────────────────────────────────────────────────────────
const Icon = ({ name, size = 16, className = '' }) => {
  const s = { width: size, height: size, flexShrink: 0 };
  if (name === 'check') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
  if (name === 'arrow-left') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
    </svg>
  );
  if (name === 'arrow-right') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
    </svg>
  );
  if (name === 'flag') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/>
    </svg>
  );
  if (name === 'shuffle') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/>
    </svg>
  );
  if (name === 'type') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 7 4 4 20 4 20 7"/><line x1="9" y1="20" x2="15" y2="20"/><line x1="12" y1="4" x2="12" y2="20"/>
    </svg>
  );
  if (name === 'moon') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
  if (name === 'translate') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 8l6 6"/><path d="M4 14l6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="M22 22l-5-10-5 10"/><path d="M14 18h6"/>
    </svg>
  );
  if (name === 'volume') return (
    <svg style={s} className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
    </svg>
  );
  return null;
};

// ─── Dynamic Topic Loader ────────────────────────────────────────────────────
const loadTopic = async (level, subTab, topicId) => {
  try {
    const modules = import.meta.glob('../data/**/*.json', { eager: true });
    for (const [path, module] of Object.entries(modules)) {
      if (path.includes(`/data/${level}/${subTab}/`)) {
        const data = module.default || module;
        if (data.id === topicId) return data;
      }
    }
    return null;
  } catch (err) {
    console.error('Error loading topic:', err);
    return null;
  }
};

// ─── Teil 1: Überschriften (Matching Screenshot Design) ───────────────────────
const Teil1Exercise = ({ topic, showTranslation, onComplete }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [selectedHeading, setSelectedHeading] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completedTexts, setCompletedTexts] = useState([]);

  const texts = topic.texts || [];
  const currentText = texts[currentTextIndex];
  const totalTexts = texts.length;

  if (!currentText) return <div className="text-center py-20 text-gray-400">Keine Texte verfügbar</div>;

  const handleHeadingSelect = (headingId) => {
    if (showResult) return;
    setSelectedHeading(headingId);
  };

  const handleVerify = () => {
    if (!selectedHeading) return;
    setShowResult(true);
    if (selectedHeading === currentText.correctHeadingId) setScore(s => s + 1);
  };

  const handleNext = () => {
    const isCorrect = selectedHeading === currentText.correctHeadingId;
    setCompletedTexts(prev => [...prev, { textId: currentText.id, selected: selectedHeading, correct: isCorrect }]);
    if (currentTextIndex < totalTexts - 1) {
      setCurrentTextIndex(prev => prev + 1);
      setSelectedHeading(null);
      setShowResult(false);
    } else {
      onComplete(score + (isCorrect ? 1 : 0), totalTexts);
    }
  };

  const handlePrevious = () => {
    if (currentTextIndex > 0) {
      setCurrentTextIndex(prev => prev - 1);
      const prevResult = completedTexts[currentTextIndex - 1];
      if (prevResult) { setSelectedHeading(prevResult.selected); setShowResult(true); }
      else { setSelectedHeading(null); setShowResult(false); }
    }
  };

  const handleVersionSwitch = (versionIndex) => {
    setCurrentTextIndex(versionIndex);
    setSelectedHeading(null);
    setShowResult(false);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* LEFT: Text */}
      <div className="flex-1">
        {/* Version nav buttons - matches screenshot */}
        <div className="flex items-center justify-center gap-2 mb-4">
          {texts.map((_, idx) => (
            <button key={idx} onClick={() => handleVersionSwitch(idx)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                idx === currentTextIndex ? 'bg-indigo-600 text-white shadow-md' : 
                completedTexts.find(c => c.textId === texts[idx].id) ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}>
              {idx === currentTextIndex ? 'الأساسي' : `المعدل ${texts.length - idx}`}
            </button>
          ))}
        </div>

        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{currentText.titleDe}</h2>
          <div className="flex items-center justify-center gap-2 text-gray-400 text-xs uppercase tracking-widest">
            <span className="w-8 h-px bg-gray-300" />Leseverstehen Teil 1<span className="w-8 h-px bg-gray-300" />
          </div>
        </div>

        {/* Text card with number */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <div className="flex items-start gap-4">
            <span className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 text-sm font-medium">{currentText.id}</span>
            <div className="flex-1">
              <p className="text-gray-800 leading-relaxed text-sm md:text-base">{currentText.contentDe}</p>
              {/* Arabic translation below paragraph */}
              {showTranslation && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-emerald-600 leading-relaxed text-sm md:text-base font-medium" dir="rtl">{currentText.contentAr}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT: Headings */}
      <div className="lg:w-[480px] flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center">
              <Icon name="check" size={16} className="text-indigo-500" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-gray-900">ÜBERSCHRIFTEN</h3>
              <p className="text-[10px] text-indigo-500 font-medium">FÜR TEXT {currentText.id}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400 font-medium">{completedTexts.length}/{totalTexts}</span>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-500 transition-all"><Icon name="shuffle" size={14} /></button>
            <button className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-500 transition-all"><Icon name="type" size={14} /></button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-100 rounded-full mb-6 overflow-hidden">
          <div className="h-full bg-indigo-500 rounded-full transition-all duration-300" style={{ width: `${((completedTexts.length + (showResult ? 1 : 0)) / totalTexts) * 100}%` }} />
        </div>

        {/* Headings cards - matching screenshot */}
        <div className="space-y-3">
          {topic.headings.map((heading) => {
            const isSelected = selectedHeading === heading.id;
            const isCorrect = heading.id === currentText.correctHeadingId;
            let cardClass = 'bg-white border-gray-200 hover:border-indigo-200';
            if (showResult) { 
              if (isCorrect) cardClass = 'bg-white border-green-300'; 
              else if (isSelected) cardClass = 'bg-white border-red-300'; 
            }
            else if (isSelected) cardClass = 'bg-white border-indigo-300';

            return (
              <button key={heading.id} onClick={() => handleHeadingSelect(heading.id)} disabled={showResult}
                className={`w-full text-left rounded-xl border p-4 transition-all duration-200 ${cardClass}`}>
                <div className="flex items-start gap-3">
                  <span className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${
                    showResult ? (isCorrect ? 'bg-green-500 text-white' : isSelected ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400')
                    : isSelected ? 'bg-indigo-500 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>{heading.id.toUpperCase()}</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800 font-medium leading-snug">{heading.textDe}</p>
                    {/* Arabic below heading - green when translation on */}
                    {showTranslation && <p className="text-sm text-emerald-600 mt-1 font-medium" dir="rtl">{heading.textAr}</p>}
                  </div>
                  {showResult && isCorrect && <Icon name="check" size={16} className="text-green-500 flex-shrink-0 mt-0.5" />}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* BOTTOM BAR - matches screenshot */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <button onClick={handlePrevious} disabled={currentTextIndex === 0}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 text-gray-500 text-sm font-medium disabled:opacity-40 hover:bg-gray-200 transition-all">
            <Icon name="arrow-left" size={14} />السابق
          </button>
          <div className="flex items-center gap-2">
            {!showResult ? (
              <button onClick={handleVerify} disabled={!selectedHeading}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium disabled:opacity-40 hover:bg-indigo-700 transition-all">
                <Icon name="check" size={14} />تحقق من الإجابات
              </button>
            ) : (
              <button onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all">
                {currentTextIndex < totalTexts - 1 ? 'التالي' : 'النتيجة'}<Icon name="arrow-right" size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Teil 2: Multiple Choice ─────────────────────────────────────────────────
const Teil2Exercise = ({ topic, showTranslation, onComplete }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const texts = topic.texts || [];
  const currentText = texts[currentTextIndex];

  const handleAnswerSelect = (questionId, optionId) => {
    if (showResult) return;
    setAnswers(prev => ({ ...prev, [questionId]: optionId }));
  };

  const handleVerify = () => {
    const allAnswered = currentText.questions.every(q => answers[q.id]);
    if (!allAnswered) return;
    setShowResult(true);
    let textScore = 0;
    currentText.questions.forEach(q => { const opt = q.options.find(o => o.id === answers[q.id]); if (opt?.correct) textScore++; });
    setScore(prev => prev + textScore);
  };

  const handleNext = () => {
    if (currentTextIndex < texts.length - 1) {
      setCurrentTextIndex(prev => prev + 1);
      setAnswers({});
      setShowResult(false);
    } else {
      const totalCorrect = score + currentText.questions.reduce((acc, q) => { const opt = q.options.find(o => o.id === answers[q.id]); return acc + (opt?.correct ? 1 : 0); }, 0);
      const totalAll = texts.reduce((acc, t) => acc + t.questions.length, 0);
      onComplete(totalCorrect, totalAll);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <div className="flex items-center justify-center gap-2 mb-6">
          {texts.map((_, idx) => (
            <button key={idx} onClick={() => { setCurrentTextIndex(idx); setAnswers({}); setShowResult(false); }}
              className={`px-4 py-1.5 rounded-full text-xs font-normal transition-all ${idx === currentTextIndex ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-400 hover:bg-gray-200'}`}>
              {idx === currentTextIndex ? 'الأساسي' : `المعدل ${texts.length - idx}`}
            </button>
          ))}
        </div>
        <div className="text-center mb-6"><h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{currentText.titleDe}</h2></div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <p className="text-gray-800 leading-relaxed text-sm md:text-base">{currentText.contentDe}</p>
          {showTranslation && <div className="mt-4 pt-4 border-t border-gray-100"><p className="text-emerald-600 leading-relaxed text-sm md:text-base font-medium" dir="rtl">{currentText.contentAr}</p></div>}
        </div>
      </div>
      <div className="lg:w-[480px] flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center"><Icon name="check" size={16} className="text-indigo-500" /></div>
            <div><h3 className="text-sm font-bold text-gray-900">FRAGEN</h3><p className="text-[10px] text-indigo-500">FÜR TEXT {currentText.id}</p></div>
          </div>
        </div>
        <div className="space-y-6">
          {currentText.questions.map((question, qIdx) => (
            <div key={question.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm font-medium text-gray-800 mb-3">{qIdx + 1}. {question.questionDe}</p>
              {showTranslation && <p className="text-xs text-emerald-600 mb-3 font-medium" dir="rtl">{question.questionAr}</p>}
              <div className="space-y-2">
                {question.options.map((option) => {
                  const isSelected = answers[question.id] === option.id;
                  let cardClass = 'border-gray-200 hover:border-indigo-200';
                  if (showResult) { if (option.correct) cardClass = 'bg-green-50 border-green-300'; else if (isSelected) cardClass = 'bg-red-50 border-red-300'; }
                  else if (isSelected) cardClass = 'bg-indigo-50 border-indigo-300';
                  return (
                    <button key={option.id} onClick={() => handleAnswerSelect(question.id, option.id)} disabled={showResult}
                      className={`w-full text-left rounded-lg border p-3 transition-all duration-200 ${cardClass}`}>
                      <div className="flex items-center gap-2">
                        <span className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                          showResult ? (option.correct ? 'bg-green-500 border-green-500 text-white' : isSelected ? 'bg-red-500 border-red-500 text-white' : 'border-gray-300')
                          : isSelected ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-gray-300'
                        }`}>{option.id.toUpperCase()}</span>
                        <div className="flex-1">
                          <span className="text-sm text-gray-700">{option.textDe}</span>
                          {showTranslation && <p className="text-xs text-emerald-600 mt-0.5 font-medium" dir="rtl">{option.textAr}</p>}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div />
          <div className="flex items-center gap-2">
            {!showResult ? (
              <button onClick={handleVerify} disabled={!currentText.questions.every(q => answers[q.id])}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium disabled:opacity-40 hover:bg-indigo-700 transition-all">
                <Icon name="check" size={14} />تحقق من الإجابات
              </button>
            ) : (
              <button onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all">
                {currentTextIndex < texts.length - 1 ? 'التالي' : 'النتيجة'}<Icon name="arrow-right" size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Teil 3: Richtig/Falsch ──────────────────────────────────────────────────
const Teil3Exercise = ({ topic, showTranslation, onComplete }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const texts = topic.texts || [];
  const currentText = texts[currentTextIndex];

  const handleAnswer = (statementId, value) => {
    if (showResult) return;
    setAnswers(prev => ({ ...prev, [statementId]: value }));
  };

  const handleVerify = () => {
    const allAnswered = currentText.statements.every(s => answers[s.id] !== undefined);
    if (!allAnswered) return;
    setShowResult(true);
    let textScore = 0;
    currentText.statements.forEach(s => { if (answers[s.id] === s.correct) textScore++; });
    setScore(prev => prev + textScore);
  };

  const handleNext = () => {
    if (currentTextIndex < texts.length - 1) {
      setCurrentTextIndex(prev => prev + 1);
      setAnswers({});
      setShowResult(false);
    } else {
      const totalCorrect = score + currentText.statements.reduce((acc, s) => acc + (answers[s.id] === s.correct ? 1 : 0), 0);
      const totalAll = texts.reduce((acc, t) => acc + t.statements.length, 0);
      onComplete(totalCorrect, totalAll);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      <div className="flex-1">
        <div className="text-center mb-6"><h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{currentText.titleDe}</h2></div>
        <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8 shadow-sm">
          <p className="text-gray-800 leading-relaxed text-sm md:text-base">{currentText.contentDe}</p>
          {showTranslation && <div className="mt-4 pt-4 border-t border-gray-100"><p className="text-emerald-600 leading-relaxed text-sm md:text-base font-medium" dir="rtl">{currentText.contentAr}</p></div>}
        </div>
      </div>
      <div className="lg:w-[480px] flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-50 rounded-lg flex items-center justify-center"><Icon name="check" size={16} className="text-indigo-500" /></div>
            <div><h3 className="text-sm font-bold text-gray-900">RICHTIG / FALSCH</h3><p className="text-[10px] text-indigo-500">FÜR TEXT {currentText.id}</p></div>
          </div>
        </div>
        <div className="space-y-4">
          {currentText.statements.map((statement, sIdx) => (
            <div key={statement.id} className="bg-white rounded-xl border border-gray-200 p-4">
              <p className="text-sm text-gray-800 mb-2">{sIdx + 1}. {statement.textDe}</p>
              {showTranslation && <p className="text-xs text-emerald-600 mb-3 font-medium" dir="rtl">{statement.textAr}</p>}
              <div className="flex gap-2">
                <button onClick={() => handleAnswer(statement.id, true)} disabled={showResult}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    showResult ? (statement.correct ? 'bg-green-500 text-white' : answers[statement.id] === true && !statement.correct ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400')
                    : answers[statement.id] === true ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>Richtig</button>
                <button onClick={() => handleAnswer(statement.id, false)} disabled={showResult}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                    showResult ? (!statement.correct ? 'bg-green-500 text-white' : answers[statement.id] === false && statement.correct ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400')
                    : answers[statement.id] === false ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}>Falsch</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div />
          <div className="flex items-center gap-2">
            {!showResult ? (
              <button onClick={handleVerify} disabled={!currentText.statements.every(s => answers[s.id] !== undefined)}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium disabled:opacity-40 hover:bg-indigo-700 transition-all">
                <Icon name="check" size={14} />تحقق من الإجابات
              </button>
            ) : (
              <button onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all">
                {currentTextIndex < texts.length - 1 ? 'التالي' : 'النتيجة'}<Icon name="arrow-right" size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Sprach 1 & 2: Input exercises ────────────────────────────────────────────
const SprachExercise = ({ topic, showTranslation, onComplete }) => {
  const [currentExIndex, setCurrentExIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);

  const exercises = topic.exercises || [];
  const currentEx = exercises[currentExIndex];

  const handleAnswer = (itemId, value) => {
    if (showResult) return;
    setAnswers(prev => ({ ...prev, [itemId]: value }));
  };

  const handleVerify = () => {
    const allAnswered = currentEx.items.every(i => answers[i.id]?.trim());
    if (!allAnswered) return;
    setShowResult(true);
  };

  const handleNext = () => {
    if (currentExIndex < exercises.length - 1) {
      setCurrentExIndex(prev => prev + 1);
      setAnswers({});
      setShowResult(false);
    } else {
      let correct = 0, total = 0;
      exercises.forEach(ex => { ex.items.forEach(item => {
        total++;
        if (answers[item.id]?.toLowerCase().trim() === item.answer.toLowerCase().trim()) correct++;
      });});
      onComplete(correct, total);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="text-center mb-6">
        <p className="text-xs text-indigo-500 uppercase tracking-widest mb-2">{currentEx.instructionDe}</p>
        {showTranslation && <p className="text-xs text-emerald-600 font-medium" dir="rtl">{currentEx.instructionAr}</p>}
      </div>
      <div className="space-y-4">
        {currentEx.items.map((item, idx) => {
          const userAnswer = answers[item.id] || '';
          const isCorrect = showResult && userAnswer.toLowerCase().trim() === item.answer.toLowerCase().trim();
          const isWrong = showResult && !isCorrect && userAnswer;
          return (
            <div key={item.id} className={`bg-white rounded-xl border p-4 transition-all ${isCorrect ? 'border-green-300 bg-green-50' : isWrong ? 'border-red-300 bg-red-50' : 'border-gray-200'}`}>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center text-xs font-medium text-gray-500">{idx + 1}</span>
                <div className="flex-1">
                  <p className="text-sm text-gray-800 mb-2">{item.textDe}</p>
                  {showTranslation && <p className="text-xs text-emerald-600 mb-2 font-medium" dir="rtl">{item.textAr}</p>}
                  <input type="text" value={userAnswer} onChange={(e) => handleAnswer(item.id, e.target.value)} disabled={showResult}
                    placeholder={showTranslation ? "أكتب الإجابة..." : "Antwort..."}
                    className={`w-full border rounded-lg px-3 py-2 text-sm outline-none transition-all ${
                      isCorrect ? 'border-green-300 bg-green-100 text-green-800' : isWrong ? 'border-red-300 bg-red-100 text-red-800' : 'border-gray-200 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100'
                    }`} />
                  {showResult && <p className={`text-xs mt-1 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>{isCorrect ? '✓ Richtig!' : `✗ Falsch! Richtig: ${item.answer}`}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div />
          <div className="flex items-center gap-2">
            {!showResult ? (
              <button onClick={handleVerify} disabled={!currentEx.items.every(i => answers[i.id]?.trim())}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium disabled:opacity-40 hover:bg-indigo-700 transition-all">
                <Icon name="check" size={14} />تحقق من الإجابات
              </button>
            ) : (
              <button onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all">
                {currentExIndex < exercises.length - 1 ? 'التالي' : 'النتيجة'}<Icon name="arrow-right" size={14} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Result Screen ─────────────────────────────────────────────────────────────
const ResultScreen = ({ score, total, onRetry, onBack }) => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="bg-white rounded-3xl border border-gray-200 shadow-lg p-8 md:p-12 max-w-md w-full mx-4 text-center">
      <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <Icon name="check" size={32} className="text-indigo-500" />
      </div>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">النتيجة</h2>
      <p className="text-gray-500 mb-6">لقد أكملت التمرين بنجاح!</p>
      <div className="bg-gray-50 rounded-2xl p-6 mb-8">
        <div className="text-4xl font-bold text-indigo-600 mb-1">{score} <span className="text-gray-400 text-2xl">/ {total}</span></div>
        <p className="text-sm text-gray-400">{Math.round((score / total) * 100)}% نسبة النجاح</p>
      </div>
      <div className="flex gap-3">
        <button onClick={onRetry} className="flex-1 py-3 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-all">إعادة المحاولة</button>
        <button onClick={onBack} className="flex-1 py-3 rounded-xl bg-gray-100 text-gray-600 text-sm font-medium hover:bg-gray-200 transition-all">العودة للقائمة</button>
      </div>
    </div>
  </div>
);

// ─── Main Exercise Page ───────────────────────────────────────────────────────
const LesenExercise = () => {
  const { level, subTab, topicId } = useParams();
  const navigate = useNavigate();
  const [showTranslation, setShowTranslation] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [finalTotal, setFinalTotal] = useState(0);
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await loadTopic(level.toUpperCase(), subTab, topicId);
      setTopic(data);
      setLoading(false);
    };
    load();
  }, [level, subTab, topicId]);

  const handleComplete = (score, total) => {
    setFinalScore(score);
    setFinalTotal(total);
    setIsCompleted(true);
  };

  const handleRetry = () => { setIsCompleted(false); setFinalScore(0); setFinalTotal(0); };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><p className="text-gray-400">جاري التحميل...</p></div>;
  if (!topic) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <p className="text-gray-500 mb-4">الموضوع غير موجود</p>
        <button onClick={() => navigate('/dashboard-client/lesen')} className="px-6 py-2 bg-indigo-600 text-white rounded-xl text-sm hover:bg-indigo-700 transition-all">العودة</button>
      </div>
    </div>
  );

  if (isCompleted) return <ResultScreen score={finalScore} total={finalTotal} onRetry={handleRetry} onBack={() => navigate('/dashboard-client/lesen')} />;

  const getPageTitle = () => {
    switch (subTab) {
      case 'teil1': return 'Lesen Teil 1';
      case 'teil2': return 'Lesen Teil 2';
      case 'teil3': return 'Lesen Teil 3';
      case 'sprach1': return 'Sprachbausteine 1';
      case 'sprach2': return 'Sprachbausteine 2';
      default: return 'Leseverstehen';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Cairo',sans-serif] relative pb-20">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />
      <div className="relative">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-3">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={() => navigate('/dashboard-client/lesen')} className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-all">
                <Icon name="arrow-left" size={16} />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-0.5 rounded-md">{level.toUpperCase()}</span>
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">SESSION</span>
                </div>
                <h1 className="text-lg font-bold text-gray-900">{getPageTitle()}</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {/* Translation toggle button - matches screenshot */}
              <button onClick={() => setShowTranslation(!showTranslation)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${showTranslation ? 'bg-red-50 border-red-200 text-red-600' : 'bg-white border-gray-200 text-gray-500 hover:border-indigo-200 hover:text-indigo-600'}`}>
                <Icon name="flag" size={12} />{showTranslation ? 'إخفاء الترجمة' : 'الإبلاغ عن خطأ'}
              </button>
              <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-indigo-500 hover:border-indigo-200 transition-all">
                <Icon name="moon" size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 md:px-8 lg:px-12 py-6 max-w-7xl mx-auto">
          {subTab === 'teil1' && topic.texts && <Teil1Exercise topic={topic} showTranslation={showTranslation} onComplete={handleComplete} />}
          {subTab === 'teil2' && topic.texts && <Teil2Exercise topic={topic} showTranslation={showTranslation} onComplete={handleComplete} />}
          {subTab === 'teil3' && topic.texts && <Teil3Exercise topic={topic} showTranslation={showTranslation} onComplete={handleComplete} />}
          {(subTab === 'sprach1' || subTab === 'sprach2') && topic.exercises && <SprachExercise topic={topic} showTranslation={showTranslation} onComplete={handleComplete} />}
        </div>
      </div>
    </div>
  );
};

export default LesenExercise;