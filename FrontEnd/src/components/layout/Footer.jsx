Footer.jsx

import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 md:py-10 lg:py-12">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12">

          {/* ========== LEFT: Contact ========== */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <h3 className="text-gray-900 font-normal text-sm md:text-base">تواصل معنا</h3>
            <a
              href="https://wa.me/212600000000"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 md:w-11 md:h-11 flex items-center justify-center rounded-xl border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all text-gray-400 hover:text-green-500"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
            </a>
          </div>

          {/* ========== CENTER: Links ========== */}
          <div className="flex flex-col items-center md:items-start gap-2.5">
            <h3 className="text-gray-900 font-normal text-sm md:text-base">المنتج</h3>
            <a href="/billing" className="text-gray-400 hover:text-gray-600 text-xs md:text-sm font-normal transition-colors">
              الأسعار
            </a>
          </div>

          {/* ========== RIGHT: Brand ========== */}
          <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
            <div className="flex items-center gap-2">
              <span className="text-gray-900 font-normal text-sm md:text-base">Zertify</span>
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
                <span className="text-white font-normal text-xs md:text-sm">Z</span>
              </div>
            </div>
            <p className="text-gray-400 text-xs md:text-sm font-normal max-w-[280px] md:max-w-[320px] leading-relaxed">
              المعيار المهني المتكامل للتحضير لشهادات اللغة الألمانية.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}