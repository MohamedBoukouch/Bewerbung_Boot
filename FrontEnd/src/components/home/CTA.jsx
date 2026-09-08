
import React from 'react';

const CTA = () => {
  return (
    <section className="relative w-full bg-gray-50/50 py-20 md:py-28 lg:py-32 overflow-hidden font-['Cairo',sans-serif]">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative text-center">
        {/* Headline */}
        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal text-gray-900 leading-[1.2] md:leading-[1.15] mb-5 md:mb-6 max-w-4xl mx-auto">
          واجد باش تنجح فامتحان اللغة الألمانية؟
        </h2>

        {/* Description */}
        <p className="text-gray-500 text-sm md:text-base lg:text-lg font-normal leading-[1.8] md:leading-[1.9] max-w-2xl mx-auto mb-10 md:mb-12">
          انضم لكثر من 800 طالب لي خداو شهادة اللغة و راهم دبا ف ألمانيا كيحققوا أحلامهم بفضل المنصة ديالنا.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4">
          {/* Pricing button */}
          <a
            href="/billing"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-gray-700 font-normal text-sm md:text-base rounded-xl md:rounded-2xl px-8 py-3.5 md:px-10 md:py-4 transition-colors border border-gray-200 shadow-sm"
          >
            عرض الأسعار
          </a>

          {/* Discover button */}
          <a
            href="#features"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-normal text-sm md:text-base rounded-xl md:rounded-2xl px-8 py-3.5 md:px-10 md:py-4 transition-colors shadow-lg shadow-indigo-200/50"
          >
            استكشف التمارين
          </a>
        </div>
      </div>
    </section>
  );
};

export default CTA;