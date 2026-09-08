import React, { useState } from 'react';

const faqs = [
  {
    question: 'كيف يعمل التفعيل عبر واتساب؟',
    answer: 'الأمر بسيط. انقر على الزر، وسيفتح واتساب برسالة معبأة مسبقاً. أرسلها، وسيقوم فريق الدعم فوراً بإرشادك عبر الدفع وتفعيل حسابك في دقائق.',
  },
  {
    question: 'كم من الوقت يستغرق تفعيل حسابي؟',
    answer: 'التفعيل يكون عادةً خلال بضع دقائق بعد تأكيد الدفع. فريق الدعم متاح على مدار اليوم للرد السريع.',
  },
  {
    question: 'هل يتم إضافة مواضيع أو تحديثات جديدة للمنصة؟',
    answer: 'نعم، نضيف مواضيع جديدة باستمرار بما فيها أحدث مواضيع تركيا والمواضيع الجديدة التي تظهر في الامتحانات. ستصلك إشعارات فور نزول أي محتوى جديد.',
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      className="relative w-full bg-gray-50/50 py-16 md:py-20 lg:py-24 overflow-hidden font-['Cairo',sans-serif]"
      dir="rtl"
    >
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative max-w-3xl">

        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-2 mb-5">
            <span className="w-2 h-2 bg-indigo-500 rounded-full" />
            <span className="text-indigo-600 text-xs font-normal">أسئلة شائعة</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug">
            الأسئلة <span className="text-indigo-500">الشائعة</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen ? 'border-indigo-200 shadow-md shadow-indigo-100/40' : 'border-gray-200 shadow-sm'
                }`}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right"
                >
                  <span
                    className={`text-base md:text-lg font-semibold transition-colors duration-200 ${
                      isOpen ? 'text-indigo-600' : 'text-gray-800'
                    }`}
                  >
                    {faq.question}
                  </span>

                  {/* Icon */}
                  <span
                    className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 ${
                      isOpen ? 'bg-indigo-50 text-indigo-500 rotate-180' : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                {/* Answer — smooth expand */}
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? '300px' : '0px' }}
                >
                  <p className="text-gray-500 text-sm md:text-base leading-[1.9] px-6 pb-6 text-right">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;