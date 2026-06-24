import React from 'react';

const Pricing = () => {
  const plans = [
    {
      name: 'الباقة المميزة',
      badge: 'أفضل قيمة',
      badgeColor: 'bg-purple-500',
      duration: 'وصول لمدة 60 يوماً',
      price: '149',
      unit: 'درهم / شهرين',
      oldPrice: '200 درهم',
      discount: 'وفر 20%',
      discountColor: 'bg-emerald-500/20 text-emerald-400',
      checkColor: 'bg-purple-500',
      bgGradient: 'from-purple-900 via-purple-950 to-gray-950',
      features: [
        'وصول كامل لمواضيع Lesen',
        'إمكانية العمل على كل Teil وحده',
        'وصول كامل لجميع أجزاء Hören',
        'الاستماع للمقاطع الصوتية المسربة في Hören',
        'وصول كامل لنماذج Schreiben',
        'تصحيح Schreiben بالذكاء الاصطناعي (لامحدود)',
        'فترة ممتدة 60 يوماً',
      ],
      cta: 'احصل على وصول 60 يوماً',
      ctaStyle: 'bg-purple-500 hover:bg-purple-600 text-white',
    },
    {
      name: 'برو الشهري',
      badge: 'الأكثر شعبية',
      badgeColor: 'bg-indigo-500',
      duration: 'افتح كامل إمكانياتك.',
      price: '99',
      unit: 'درهم / شهر',
      oldPrice: null,
      discount: null,
      checkColor: 'bg-indigo-500',
      bgGradient: 'from-indigo-950 via-slate-900 to-gray-950',
      features: [
        'وصول كامل لمواضيع Lesen',
        'إمكانية العمل على كل Teil وحده',
        'وصول كامل لجميع أجزاء Hören',
        'الاستماع للمقاطع الصوتية المسربة في Hören',
        'وصول كامل لنماذج Schreiben',
        'تصحيح Schreiben بالذكاء الاصطناعي (لامحدود)',
        'لمدة 30 يوماً',
      ],
      cta: 'ترقية الآن',
      ctaStyle: 'bg-white hover:bg-gray-100 text-gray-900',
      ctaIcon: true,
    },
    {
      name: 'باقة 15 يوم',
      badge: null,
      duration: 'بداية سريعة ومميزة.',
      price: '49',
      unit: 'درهم / 15 يوم',
      oldPrice: null,
      discount: null,
      checkColor: 'bg-emerald-500',
      bgGradient: 'from-emerald-900 via-emerald-950 to-gray-950',
      features: [
        'وصول كامل لمواضيع Lesen',
        'إمكانية العمل على كل Teil وحده',
        'وصول كامل لجميع أجزاء Hören',
        'الاستماع للمقاطع الصوتية المسربة في Hören',
        'وصول كامل لنماذج Schreiben',
        'تصحيح Schreiben بالذكاء الاصطناعي (لامحدود)',
        'لمدة 15 يوماً',
      ],
      cta: 'ترقية الآن',
      ctaStyle: 'border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10',
    },
    {
      name: 'البداية المجانية',
      badge: null,
      duration: 'مثالي لتجربة المنصة.',
      price: '0',
      unit: 'درهم / يوم واحد',
      oldPrice: null,
      discount: null,
      checkColor: 'bg-indigo-400',
      bgGradient: 'from-white to-gray-50',
      textColor: 'text-gray-900',
      subTextColor: 'text-gray-500',
      featureTextColor: 'text-gray-600',
      borderColor: 'border-gray-200',
      features: [
        'وصول كامل لمواضيع Lesen',
        'إمكانية العمل على كل Teil وحده',
        'وصول كامل لجميع أجزاء Hören',
        'الاستماع للمقاطع الصوتية المسربة في Hören',
        'وصول كامل لنماذج Schreiben',
        'تصحيح Schreiben بالذكاء الاصطناعي',
        'فقط لمدة يوم واحد',
      ],
      cta: 'تجربة 24h مجاناً',
      ctaStyle: 'border border-indigo-200 text-indigo-600 hover:bg-indigo-50',
    },
  ];

  return (
    <section className="relative w-full bg-gray-50/50 py-16 md:py-20 lg:py-24 overflow-hidden font-['Cairo',sans-serif]">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16 px-4">
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-4 py-2 mb-5">
            <span className="w-2 h-2 bg-indigo-500 rounded-full" />
            <span className="text-indigo-600 text-xs font-normal">افتح إمكانياتك</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-snug mb-3">
            اجتاز الامتحان.
          </h2>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-snug mb-5">
            <span className="bg-gradient-to-r from-indigo-600 via-purple-500 to-indigo-600 bg-clip-text text-transparent">
              من المرة الأولى، مضمون.
            </span>
          </h2>
          <p className="text-gray-500 text-sm md:text-base font-normal max-w-lg mx-auto leading-relaxed">
            انضم لآلاف الطلاب الذين يتقنون القراءة والاستماع والكتابة.
            <br />
            أسعار بسيطة. تفعيل فوري عبر واتساب.
          </p>
        </div>

        {/* Pricing Cards - Full width with small side margins */}
        <div className="mx-3 md:mx-5 lg:mx-8 xl:mx-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl md:rounded-3xl p-4 md:p-5 lg:p-4 xl:p-5 flex flex-col ${
                  plan.bgGradient.startsWith('from-white')
                    ? `bg-gradient-to-b ${plan.bgGradient} border ${plan.borderColor}`
                    : `bg-gradient-to-b ${plan.bgGradient} text-white`
                }`}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className={`${plan.badgeColor} text-white text-[11px] md:text-xs font-normal px-3 py-1 rounded-full`}>
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan name */}
                <h3 className={`text-base md:text-lg lg:text-base xl:text-lg font-bold mb-1 mt-2 ${
                  plan.textColor || 'text-white'
                }`}>
                  {plan.name}
                </h3>
                <p className={`text-[11px] md:text-xs lg:text-[11px] xl:text-xs font-normal mb-4 md:mb-5 ${
                  plan.subTextColor || 'text-gray-400'
                }`}>
                  {plan.duration}
                </p>

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className={`text-3xl md:text-4xl lg:text-3xl xl:text-4xl font-bold ${
                    plan.textColor || 'text-white'
                  }`}>
                    {plan.price}
                  </span>
                </div>
                <p className={`text-[11px] md:text-xs lg:text-[10px] xl:text-xs font-normal mb-3 md:mb-4 ${
                  plan.subTextColor || 'text-gray-400'
                }`}>
                  {plan.unit}
                </p>

                {/* Old price & discount */}
                {plan.oldPrice && (
                  <div className="flex items-center gap-2 mb-4 md:mb-5">
                    <span className="text-gray-500 text-xs md:text-sm line-through font-normal">
                      {plan.oldPrice}
                    </span>
                    <span className={`text-[10px] md:text-xs font-normal px-2 py-0.5 rounded ${plan.discountColor}`}>
                      {plan.discount}
                    </span>
                  </div>
                )}

                {/* Divider */}
                <div className={`w-full h-px mb-4 md:mb-5 ${
                  plan.bgGradient.startsWith('from-white') ? 'bg-gray-200' : 'bg-white/10'
                }`} />

                {/* Features */}
                <div className="flex flex-col gap-2.5 md:gap-3 flex-grow">
                  {plan.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 md:gap-2.5 justify-end">
                      <span className={`text-[11px] md:text-xs lg:text-[10px] xl:text-xs font-normal leading-relaxed text-right ${
                        plan.featureTextColor || 'text-gray-300'
                      }`}>
                        {feature}
                      </span>
                      <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full ${plan.checkColor} flex items-center justify-center shrink-0 mt-0.5`}>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <div className="mt-5 md:mt-6">
                  <button className={`w-full py-2.5 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-normal transition-colors ${plan.ctaStyle}`}>
                    <div className="flex items-center justify-center gap-2">
                      {plan.ctaIcon && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                      )}
                      <span>{plan.cta}</span>
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;