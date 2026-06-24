
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    level: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle signup logic here
  };

  return (
    <div className="min-h-screen bg-gray-50/50 flex flex-col items-center justify-center px-4 py-12 font-['Cairo',sans-serif] relative overflow-hidden">
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Card */}
      <div className="relative w-full max-w-[480px] md:max-w-[520px] bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-xl shadow-gray-200/50 border border-gray-100 p-6 md:p-10 lg:p-12">
        {/* User icon */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
          إنشاء حساب
        </h1>
        <p className="text-gray-500 text-sm md:text-base font-normal text-center mb-8 md:mb-10">
          ابدأ رحلتك نحو إتقان اللغة الألمانية اليوم.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-6">
          {/* Name fields */}
          <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
            <div className="flex-1">
              <label className="block text-gray-600 text-sm font-normal mb-2 text-right">
                الاسم الأول
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full h-12 md:h-14 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm font-normal text-right focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-600 text-sm font-normal mb-2 text-right">
                اسم العائلة
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full h-12 md:h-14 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm font-normal text-right focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
                required
              />
            </div>
          </div>

          {/* Level select */}
          <div>
            <label className="block text-gray-600 text-sm font-normal mb-2 text-right">
              المستوى المستهدف
            </label>
            <div className="relative">
              <select
                name="level"
                value={formData.level}
                onChange={handleChange}
                className="w-full h-12 md:h-14 px-4 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm font-normal text-right appearance-none focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer"
                required
              >
                <option value="">اختر مستوى الامتحان الخاص بك</option>
                <option value="b1">TELC B1</option>
                <option value="b2">TELC B2</option>
              </select>
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-600 text-sm font-normal mb-2 text-right">
              عنوان البريد الإلكتروني
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full h-12 md:h-14 px-4 pl-12 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm font-normal text-right placeholder:text-gray-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
                required
              />
              <svg
                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="4" width="20" height="16" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </svg>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-600 text-sm font-normal mb-2 text-right">
              كلمة المرور
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="أدخل كلمة مرور قوية"
                className="w-full h-12 md:h-14 px-4 pl-12 rounded-xl border border-gray-200 bg-white text-gray-900 text-sm font-normal text-right placeholder:text-gray-400 focus:outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path>
                    <path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path>
                    <path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path>
                    <line x1="2" y1="2" x2="22" y2="22"></line>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-12 md:h-14 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-base md:text-lg rounded-xl transition-colors shadow-lg shadow-indigo-200/50 mt-2"
          >
            إنشاء حساب
          </button>
        </form>

        {/* Login link */}
        <p className="text-center text-gray-500 text-sm font-normal mt-6 md:mt-8">
          لديك حساب بالفعل؟{' '}
          <Link to="/login" className="text-indigo-500 hover:text-indigo-600 font-bold transition-colors">
            تسجيل الدخول
          </Link>
        </p>
      </div>

      {/* Back to home */}
      <Link
        to="/"
        className="flex items-center gap-2 text-gray-500 hover:text-gray-700 text-sm font-normal mt-6 md:mt-8 transition-colors"
      >
        <span>العودة إلى الصفحة الرئيسية</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </Link>
    </div>
  );
};

export default Signup;