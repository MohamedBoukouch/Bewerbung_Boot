import React from 'react';
import { Link } from "react-router-dom";
import { Moon, Settings, FileText } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border border-gray-100/60 rounded-2xl mx-4 mt-3 md:mx-6 md:mt-4 lg:mx-8 lg:mt-5">
      <div className="px-3 md:px-4 lg:px-5 h-[52px] md:h-[56px] lg:h-[60px] flex items-center justify-between">

        {/* ========== LOGO ========== */}
        <Link
  to="/"
  className="flex items-center gap-2 shrink-0 cursor-pointer"
>
  <div className="w-8 h-8 md:w-9 md:h-9 rounded-lg bg-gray-900 flex items-center justify-center">
    <span className="text-white font-semibold text-sm md:text-base">
      Z
    </span>
  </div>

  <div className="hidden sm:block">
    <h1 className="font-semibold text-base md:text-lg text-gray-900 leading-none">
      Zertify
    </h1>

    <p className="text-[10px] text-gray-400 font-normal tracking-[0.12em] mt-0.5">
      TELC PREP B1/B2
    </p>
  </div>
</Link>

        {/* ========== CENTER NAV (pill) ========== */}
        {/* <div className="hidden lg:flex items-center bg-gray-50 rounded-full px-1 py-0.5">
          <NavItem href="/dashboard-client/lesen">Lesen</NavItem>
          <NavItem href="/dashboard-client/horen">Hören</NavItem>
          <NavItem href="/dashboard-client/schreiben">Schreiben</NavItem>
          <NavItem href="/dashboard-client/test">اختبر نفسك</NavItem>
        </div> */}

        {/* ========== RIGHT SECTION ========== */}
        <div className="flex items-center gap-1 md:gap-1.5 lg:gap-2 shrink-0">

          {/* Exercises pill */}
          {/* <button className="hidden sm:flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 transition-colors rounded-full px-2.5 py-1 md:px-3 md:py-1.5 text-gray-500 text-xs font-normal border border-gray-100">
            <FileText size={13} className="text-gray-400" />
            <span className="hidden md:inline">التسريبات</span>
          </button> */}

          {/* Moon icon */}
          <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-400 hover:text-gray-600">
            <Moon size={15} />
          </button>

          {/* Settings icon */}
          <button className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-400 hover:text-gray-600">
            <Settings size={15} />
          </button>

          {/* Login text */}
          <Link to="/login" className="hidden md:block text-gray-500 hover:text-gray-800 font-normal text-xs px-1.5 py-1 transition-colors">
            تسجيل الدخول
          </Link>

          {/* Sign Up button (purple) */}
          <Link
  to="/signup"
  className="bg-indigo-500 hover:bg-indigo-600 text-white font-normal text-xs rounded-lg px-2.5 py-1.5 md:px-3 md:py-2 transition-all duration-200 cursor-pointer hover:scale-105"
>
  إنشاء حساب
</Link>

          {/* Hamburger (mobile only) */}
          <button className="lg:hidden w-7 h-7 flex items-center justify-center rounded-full border border-gray-200 hover:bg-gray-50 transition-colors text-gray-400 ml-0.5">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* ========== MOBILE NAV BAR ========== */}
      <div className="lg:hidden border-t border-gray-100/50 overflow-x-auto">
        <div className="flex items-center gap-0.5 px-2 py-1.5 min-w-max">
          <MobileNavItem href="#lesen">Lesen</MobileNavItem>
          <MobileNavItem href="#horen">Hören</MobileNavItem>
          <MobileNavItem href="#schreiben">Schreiben</MobileNavItem>
          <MobileNavItem href="#test">اختبر نفسك</MobileNavItem>
          <MobileNavItem href="#exercises">
            <FileText size={12} className="inline mr-1 text-gray-400" />
            التسريبات
          </MobileNavItem>
        </div>
      </div>
    </nav>
  );
}

/* ========== CENTER NAV ITEM ========== */
function NavItem({ href, children, active }) {
  return (
    <a
      href={href}
      className={`px-3.5 py-1 rounded-full text-xs font-normal transition-colors whitespace-nowrap ${
        active
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-400 hover:text-gray-700 hover:bg-white/40'
      }`}
    >
      {children}
    </a>
  );
}

/* ========== MOBILE NAV ITEM ========== */
function MobileNavItem({ href, children, active }) {
  return (
    <a
      href={href}
      className={`px-3 py-1 rounded-full text-xs font-normal whitespace-nowrap transition-colors ${
        active
          ? 'bg-indigo-50 text-indigo-500'
          : 'text-gray-400 hover:text-gray-700 hover:bg-gray-50'
      }`}
    >
      {children}
    </a>
  );
}