import React from 'react';
import certificateImage from "../../assets/certificate.jpg";


const Hero = () => {
  return (
    <section className="relative w-full bg-gray-50/50 pt-24 md:pt-28 lg:pt-32 pb-12 md:pb-16 lg:pb-20 overflow-hidden font-['Cairo',sans-serif]">
      {/* Subtle grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 md:px-6 lg:px-8 relative">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12">

          {/* ========== LEFT: Certificate Image with float animation ========== */}
          <div className="w-full lg:w-[45%] xl:w-[42%] flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="relative w-full max-w-[320px] md:max-w-[380px] lg:max-w-[420px]">
              {/* Phone frame with float animation */}
              <div 
                className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-2 md:p-3 shadow-xl shadow-gray-200/50 border border-gray-100"
                style={{
                  animation: 'float 6s ease-in-out infinite'
                }}
              >
                <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] overflow-hidden border border-gray-100">
                  <img 
                  src={certificateImage} 
                    alt="TELC Zertifikat B2"
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
              {/* Decorative blur behind */}
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[90%] bg-indigo-100/40 rounded-full blur-3xl" />
            </div>
          </div>

          {/* ========== RIGHT: Content ========== */}
          <div className="w-full lg:w-[52%] xl:w-[54%] flex flex-col items-center lg:items-end text-center lg:text-right order-1 lg:order-2">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 rounded-full px-3 py-1.5 md:px-4 md:py-2 mb-5 md:mb-6">
              <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-indigo-500 rounded-full" />
              <span className="text-indigo-600 text-[11px] md:text-xs font-normal">
                جديد: وجد لـ TELC B1 & B2 و تتا هاني
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-normal text-gray-900 leading-[1.2] md:leading-[1.15] mb-4 md:mb-5">
              <span className="text-indigo-500">TELC B1 & B2</span>{' '}
              <span className="text-gray-900">أول منصة</span>
              <br className="hidden md:block" />
              <span className="text-gray-900">خاليه من اخطاء PDFs!</span>
            </h1>

            {/* Description */}
            <p className="text-gray-500 text-sm md:text-base lg:text-lg font-normal leading-[1.8] md:leading-[1.9] max-w-[500px] lg:max-w-[540px] mb-7 md:mb-8 lg:mb-10">
              هنا غادي تلقى كل المواضيع الجديدة، و مواضيع تركيا اللي ولات كتظهر مؤخراً. كل ما يخص{' '}
              <span className="text-gray-700 font-normal">Lesen</span>{' '}
              غادي تلقاه مجموع ومنظم فبلاصة وحدة، باش ما تضيعش الوقت فالتقلاب على الـ PDF والأخطاء اللي فيهم. إضافة لواحشي: قسم{' '}
              <span className="text-gray-700 font-normal">Hören</span>{' '}
              متوفر بالأوديوهات بحال الامتحان، و{' '}
              <span className="text-gray-700 font-normal">Schreiben</span>{' '}
              كيتصحح بالذكاء الاصطناعي. وأي جديد كينزل فالموقع كتوصلك بيه إشعار{' '}
              <span className="text-gray-700 font-normal">(notification)</span>{' '}
              مباشرة.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
              {/* WhatsApp */}
              <a
                href="https://wa.me/212600000000"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-normal text-sm md:text-base rounded-xl md:rounded-2xl px-6 py-3 md:px-8 md:py-4 transition-colors"
              >
                <span>جروب الواتساب</span>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                </svg>
              </a>

              {/* Discover */}
              <a
                href="#features"
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-normal text-sm md:text-base rounded-xl md:rounded-2xl px-6 py-3 md:px-8 md:py-4 transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                <span>استكشف التمارين</span>
              </a>
            </div>

            {/* Bottom trust text */}
            <p className="mt-6 md:mt-8 text-gray-400 text-xs md:text-sm font-normal">
              <span className="text-gray-600 font-normal">TELC</span>{' '}
              موثوق به من قبل الطلاب الذين يستعدون لـ
            </p>
          </div>
        </div>
      </div>

      {/* Float animation keyframes */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;