import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: true,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
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
        {/* Lock icon */}
        <div className="flex justify-center mb-5">
          <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="5" y="11" width="14" height="10" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-2">
          مرحباً بعودتك
        </h1>
        <p className="text-gray-500 text-sm md:text-base font-normal text-center mb-8 md:mb-10">
          أدخل بياناتك للوصول إلى لوحة التحكم الخاصة بك.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 md:gap-6">
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
                placeholder="••••••••••"
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

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <Link
              to="/forgot-password"
              className="text-indigo-500 hover:text-indigo-600 text-sm font-normal transition-colors"
            >
              نسيت كلمة المرور؟
            </Link>
            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-gray-600 text-sm font-normal">تذكرني</span>
              <div className="relative">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                    formData.remember
                      ? 'bg-indigo-500'
                      : 'bg-gray-200'
                  }`}
                >
                  {formData.remember && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  )}
                </div>
              </div>
            </label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full h-12 md:h-14 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-base md:text-lg rounded-xl transition-colors shadow-lg shadow-indigo-200/50"
          >
            تسجيل الدخول
          </button>
        </form>

        {/* Signup link */}
        <p className="text-center text-gray-500 text-sm font-normal mt-6 md:mt-8">
          ليس لديك حساب؟{' '}
          <Link to="/signup" className="text-indigo-500 hover:text-indigo-600 font-bold transition-colors">
            سجل مجاناً
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

export default Login;