import React from 'react';

const Features = () => {
  const features = [
    {
      text: 'جميع الأجزاء: Lesen (1,2,3) و Sprachbausteine (1,2)',
    },
    {
      text: 'تصحيح فوري مع شرح مفصل "علاش" لكل إجابة',
    },
    {
      text: 'ملخصات ذكية للنصوص وتمييز الكلمات المفتاحية (Highlighting)',
    },
  ];

  return (
    <section className="relative w-full bg-gray-50/50 py-16 md:py-20 lg:py-24 overflow-hidden font-['Cairo',sans-serif]">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-16">

          {/* ========== LEFT: Text Content ========== */}
          <div className="w-full lg:w-[48%] xl:w-[45%] flex flex-col items-center lg:items-end text-center lg:text-right">

            {/* Section label */}
            <div className="flex items-center gap-2 text-indigo-500 text-sm md:text-base font-normal mb-4 md:mb-5">
              <span>Lesen</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
              </svg>
            </div>

            {/* Headline */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal text-gray-900 leading-[1.2] md:leading-[1.15] mb-5 md:mb-6">
              تغطية شاملة لكل أجزاء<br />
              الامتحان.
            </h2>

            {/* Description */}
            <p className="text-gray-500 text-sm md:text-base lg:text-lg font-normal leading-[1.8] md:leading-[1.9] max-w-[480px] lg:max-w-[520px] mb-8 md:mb-10">
              كنوفروا ليك التدريب على جميع أجزاء القراءة (Teil 1, 2, 3) و Sprachbausteine (Teil 1 & 2). النظام ديالنا كيعطيك التصحيح فالبلاصة مع شرح دقيق "علاش" هذيك هي الإجابة الصحيحة باش تفهم وتجاوز أخطاءك، مع ملخصات ذكية وتمييز للكلمات المفتاحية.
            </p>

            {/* Feature list */}
            <div className="flex flex-col gap-3 md:gap-4 w-full max-w-[480px] lg:max-w-[520px]">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 md:gap-4 justify-end"
                >
                  <span className="text-gray-600 text-sm md:text-base font-normal leading-relaxed">
                    {feature.text}
                  </span>
                  <div className="w-6 h-6 md:w-7 md:h-7 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ========== RIGHT: Mockup Cards ========== */}
          <div className="w-full lg:w-[50%] xl:w-[52%] flex justify-center lg:justify-start">
            <div className="relative w-full max-w-[520px] md:max-w-[560px]">

              {/* Main card - Reading exercise */}
              <div className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-lg shadow-gray-100/80 p-4 md:p-5 lg:p-6">

                {/* Card header */}
                <div className="flex items-center gap-2 mb-4 md:mb-5">
                  <span className="w-2 h-2 bg-gray-400 rounded-full" />
                  <span className="text-gray-700 text-xs md:text-sm font-normal">Sport ist gesund - Version 1</span>
                  <span className="bg-indigo-50 text-indigo-600 text-[10px] md:text-xs font-normal px-2 py-0.5 rounded-md border border-indigo-100">B2</span>
                  <div className="mr-auto flex items-center gap-1.5 bg-gray-50 rounded-lg px-2.5 py-1 border border-gray-100">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="text-gray-500 text-[10px] md:text-xs font-normal">89:47</span>
                  </div>
                </div>

                {/* Exercise content */}
                <div className="bg-gray-50/50 rounded-xl md:rounded-2xl p-3 md:p-4 lg:p-5 border border-gray-100/80">

                  {/* Title with highlights */}
                  <div className="flex items-start gap-2 md:gap-3 mb-4 md:mb-5">
                    <span className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-gray-100 text-gray-500 text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <p className="text-gray-700 text-xs md:text-sm font-normal leading-[1.7]">
                      Ein <span className="bg-orange-100 text-orange-700 px-1 py-0.5 rounded text-[11px] md:text-xs">Leistungssport</span> für jedes <span className="bg-orange-100 text-orange-700 px-1 py-0.5 rounded text-[11px] md:text-xs">Alter</span>.
                    </p>
                  </div>

                  {/* German text */}
                  <p className="text-gray-500 text-[11px] md:text-xs lg:text-sm font-normal leading-[1.8] md:leading-[1.9] mb-4 md:mb-5">
                    Der an der Ostküste Attikas in Griechenland lag in der Antike der Ort Marathon. Dort siegte der griechische König Miltiades im Jahr 490 vor Christus über das Heer der Perser. Der Sage nach soll ein Soldat die 42,2 km lange Strecke nach Athen gerannt sein, um die Nachricht dieses für Griechenland wichtigen Sieges zu überbringen. Bei seiner Ankunft in Athen brach er, noch während er die Nachricht verkündete, vor Erschöpfung tot zusammen. Auf diese Legende geht eine sportliche Disziplin zurück: der Marathonlauf. Bereits seit 1896 ist er olympische Disziplin, seit 1984 auch für Frauen. Die StreckenJänge von 42.195 m wurde 1924 festgelegt. Der Marathonlauf gilt als einziger <span className="text-orange-600 font-normal">Leistungssport</span>, der bis ins hohe <span className="text-orange-600 font-normal">Alter</span> ausgeübt werden kann. Wissenschaftler erklären das mit der menschlichen Evolution. Der Mensch jagte in der Frühzeit seine Beute so lange vor sich her, bis diese vor Erschöpfung nicht mehr weiter konnte. Die Fähigkeit, ausdauernd over lange Strecken zu rennen, ist also in den menschlichen Genen verankert.
                  </p>

                  {/* Summary box */}
                  <div className="bg-white rounded-xl border border-gray-100 p-3 md:p-4">
                    <div className="flex items-center gap-2 mb-2 md:mb-3">
                      <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-50 flex items-center justify-center">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <span className="text-gray-700 text-xs md:text-sm font-normal mr-auto">ملخص النص</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                        <line x1="8" y1="6" x2="21" y2="6"></line>
                        <line x1="8" y1="12" x2="21" y2="12"></line>
                        <line x1="8" y1="18" x2="21" y2="18"></line>
                        <line x1="3" y1="6" x2="3.01" y2="6"></line>
                        <line x1="3" y1="12" x2="3.01" y2="12"></line>
                        <line x1="3" y1="18" x2="3.01" y2="18"></line>
                      </svg>
                    </div>
                    <p className="text-gray-500 text-[11px] md:text-xs font-normal leading-[1.8] text-right">
                      النص كيعاود على مدينة ماراثون فاليونان، فاش ربحو اليونانيين على الجيش ديال الفرس عام 490 قبل الميلاد. كيقولو باللي واحد الجندي جرا مسافة 42 كيلومتر حتى لأثينا باش يوصل خبار النصر، ولكن مات بالعيا (بالإرهاق الشديد) ملي وصل. هاد القصة الشهيرة هي الأصل ديال سباق الماراثون اللي ولا رياضة أولمبية معروفة. العلماء كيشوفو بلي القدرة على الجري لمسافات طويلة مدفونة في الجينات ديالنا، حيث الإنسان القديم كان كيتسابق مع الفريسة ديالو حتى كاتطيح من العيا.
                    </p>
                  </div>
                </div>
              </div>

              {/* Side panel - Überschriften */}
              <div className="hidden lg:block absolute -right-4 xl:-right-8 top-0 w-[200px] xl:w-[220px]">
                <div className="bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/60 p-3 md:p-4">
                  {/* Panel header */}
                  <div className="flex items-center justify-between mb-3 md:mb-4">
                    <span className="text-gray-700 text-[10px] md:text-xs font-normal">ÜBERSCHRIFTEN</span>
                    <div className="flex items-center gap-1.5">
                      <button className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                          <line x1="8" y1="6" x2="21" y2="6"></line>
                          <line x1="8" y1="12" x2="21" y2="12"></line>
                          <line x1="8" y1="18" x2="21" y2="18"></line>
                          <line x1="3" y1="6" x2="3.01" y2="6"></line>
                          <line x1="3" y1="12" x2="3.01" y2="12"></line>
                          <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                      </button>
                      <button className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-400">
                          <path d="M12 20h9"></path>
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                        </svg>
                      </button>
                      <button className="w-6 h-6 md:w-7 md:h-7 flex items-center justify-center rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                          <polyline points="1 4 1 10 7 10"></polyline>
                          <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Headline items */}
                  <div className="flex flex-col gap-2">
                    {[
                      { letter: 'E', text: 'Placeholder Headline description...', active: false },
                      { letter: 'F', text: 'Placeholder Headline description...', active: false },
                      { letter: 'G', text: 'Placeholder Headline description...', active: false },
                      { letter: 'H', text: 'Ein Leistungssport für jedes Alter.', active: true },
                      { letter: 'I', text: 'Placeholder Headline text...', active: false },
                      { letter: 'J', text: 'Placeholder Headline text...', active: false },
                    ].map((item, index) => (
                      <div 
                        key={index}
                        className={`flex items-start gap-2 p-2 md:p-2.5 rounded-xl border transition-colors ${
                          item.active 
                            ? 'bg-emerald-50/50 border-emerald-100' 
                            : 'bg-white border-gray-100 hover:bg-gray-50/50'
                        }`}
                      >
                        <span className={`w-5 h-5 md:w-6 md:h-6 rounded-md flex items-center justify-center text-[10px] md:text-xs shrink-0 mt-0.5 ${
                          item.active 
                            ? 'bg-emerald-500 text-white' 
                            : 'bg-gray-100 text-gray-400'
                        }`}>
                          {item.letter}
                        </span>
                        <span className={`text-[10px] md:text-xs font-normal leading-relaxed ${
                          item.active ? 'text-gray-700' : 'text-gray-400'
                        }`}>
                          {item.text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Score card */}
                  <div className="mt-3 md:mt-4 p-3 md:p-4 rounded-xl border border-orange-100 bg-orange-50/30">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 text-lg md:text-xl font-normal">5/25</span>
                        <div className="flex flex-col items-start">
                          <span className="text-gray-600 text-[10px] md:text-xs font-normal">درجتك</span>
                          <span className="text-orange-500 text-[10px] md:text-xs font-normal">نقطة</span>
                        </div>
                      </div>
                      <div className="w-8 h-8 md:w-9 md:h-9 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-lg">🏆</span>
                      </div>
                    </div>
                    <div className="mt-2 text-center">
                      <span className="text-orange-500 text-[10px] md:text-xs font-normal">واصل التدريب</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;