import React from 'react';

const DashboardClient = () => {
  const stats = [
    {
      label: 'المعدل',
      value: '45%',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
          <polyline points="17 6 23 6 23 12"></polyline>
        </svg>
      ),
      iconBg: 'bg-green-50',
    },
    {
      label: 'المستوى',
      value: 'B2',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
          <path d="M4 22h16"></path>
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
        </svg>
      ),
      iconBg: 'bg-indigo-50',
    },
    {
      label: 'موعد الامتحان',
      value: 'باقي 69 يوم',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg>
      ),
      iconBg: 'bg-orange-50',
    },
    {
      label: 'مجموعة الواتساب (B2)',
      value: '',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
      ),
      iconBg: 'bg-green-50',
    },
  ];

  const sections = [
    {
      title: 'Lesen',
      subtitle: 'متوسط النقاط',
      progress: 90,
      color: 'bg-blue-500',
      iconBg: 'bg-blue-50',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      passed: 1,
      failed: 0,
    },
    {
      title: 'Hören',
      subtitle: 'متوسط النقاط',
      progress: 0,
      color: 'bg-purple-500',
      iconBg: 'bg-purple-50',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
          <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
        </svg>
      ),
      passed: 0,
      failed: 5,
    },
    {
      title: 'Schreiben',
      subtitle: 'متوسط النقاط',
      progress: 0,
      color: 'bg-orange-400',
      iconBg: 'bg-orange-50',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9"></path>
          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
        </svg>
      ),
      passed: 0,
      failed: 0,
    },
  ];

  return (
    <div className="font-['Cairo',sans-serif]">
      {/* Welcome + Stats Row */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-5 mb-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 w-full lg:w-auto lg:flex-1">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center justify-between"
            >
              <div className="text-right">
                <p className="text-gray-400 text-[11px] font-normal mb-0.5">{stat.label}</p>
                <p className="text-gray-900 text-base font-normal">{stat.value}</p>
              </div>
              <div className={`w-8 h-8 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Welcome Text */}
        <div className="text-right lg:text-right order-first lg:order-last shrink-0">
          <h1 className="text-xl md:text-2xl font-normal text-gray-900 mb-1">
            مرحباً بعودتك، !!
          </h1>
          <p className="text-gray-400 text-sm font-normal">
            إليك تقدمك في <span className="text-gray-600 font-normal">Telc B2</span>.
          </p>
        </div>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-100 p-5"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className={`w-9 h-9 rounded-xl ${section.iconBg} flex items-center justify-center`}>
                  {section.icon}
                </div>
                <div>
                  <h3 className="text-gray-900 text-sm font-normal">{section.title}</h3>
                  <p className="text-gray-400 text-[11px] font-normal">{section.subtitle}</p>
                </div>
              </div>
              <span className="text-gray-900 text-lg font-normal">{section.progress}%</span>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full mb-5 overflow-hidden">
              <div
                className={`h-full ${section.color} rounded-full transition-all duration-500`}
                style={{ width: `${section.progress}%` }}
              />
            </div>

            {/* Stats Row */}
            <div className="flex items-center justify-between bg-gray-50 rounded-xl px-3 py-2 mb-5">
              <div className="flex items-center gap-1">
                <span className="text-red-400 text-xs font-normal">راسب {section.failed}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="15" y1="9" x2="9" y2="15"></line>
                  <line x1="9" y1="9" x2="15" y2="15"></line>
                </svg>
              </div>
              <div className="w-px h-4 bg-gray-200" />
              <div className="flex items-center gap-1">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                <span className="text-green-500 text-xs font-normal">ناجح {section.passed}</span>
              </div>
            </div>

            {/* CTA Button */}
            <button className="w-full h-10 bg-white hover:bg-gray-50 text-gray-600 font-normal text-sm rounded-xl border border-gray-200 transition-colors">
              متابعة التدريب
            </button>
          </div>
        ))}
      </div>

      {/* WhatsApp FAB */}
      <a
        href="https://wa.me/212600000000"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 w-12 h-12 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-200/50 transition-colors z-50"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  );
};

export default DashboardClient;