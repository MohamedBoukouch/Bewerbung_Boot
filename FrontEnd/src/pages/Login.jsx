import { useState, useEffect } from "react";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { accessApi } from "../services/accessApi";

export default function Login() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const { user, googleUser, isFullyAuthenticated, login } = useAuth();

  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Steps: "code" | "google" | "redirecting"
  const [step, setStep] = useState("code");

  // If already fully authenticated, redirect to dashboard
  useEffect(() => {
    if (isFullyAuthenticated) {
      const from = location.state?.from?.pathname || "/dashboard-client";
      navigate(from, { replace: true });
    }
  }, [isFullyAuthenticated, navigate, location]);

  // Handle URL errors from Google callback
  useEffect(() => {
    const urlError = searchParams.get("error");
    if (urlError) {
      setError(decodeURIComponent(urlError));
      setStep("google");
    }
  }, [searchParams]);

  // If user has code but needs Google (came from protected route redirect)
  useEffect(() => {
    if (user && !googleUser?.connected && !isFullyAuthenticated) {
      setStep("google");
    }
  }, [user, googleUser, isFullyAuthenticated]);

  const handleCodeSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await accessApi.validateCode(code.trim());

      if (result.status === "logged_in") {
        if (result.google_connected) {
          login(result.session, true, {
            email: result.session.email,
            name: result.session.name,
            picture: result.session.picture,
          });
          const from = location.state?.from?.pathname || "/dashboard-client";
          navigate(from, { replace: true });
        } else {
          login(result.session, false, null);
          setStep("google");
        }
        return;
      }

      if (result.status === "google_required") {
        setStep("google");
        return;
      }

      if (result.status === "pending") {
        setError(result.message);
        return;
      }

      setError("Statut inconnu.");
    } catch (err) {
      setError(err.message || "Erreur serveur.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLoginClick = async () => {
    setError("");
    setStep("redirecting");
    try {
      await accessApi.startGoogleLogin(code.trim());
    } catch (err) {
      setError(err.message);
      setStep("google");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 font-['Cairo',sans-serif]" dir="rtl">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
          {step === "code" && "تسجيل الدخول"}
          {step === "google" && "خطوة أخيرة"}
          {step === "redirecting" && "الاتصال بـ Google..."}
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          {step === "code" && "أدخل كود الوصول الذي تلقيته بعد الدفع"}
          {step === "google" && "اضغط على الزر أدناه لربط حسابك في Google"}
          {step === "redirecting" && "جارٍ إعادة التوجيه إلى Google..."}
        </p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600 text-right">
            {error}
          </div>
        )}

        {step === "code" && (
          <form onSubmit={handleCodeSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              placeholder="مثال: ABC123"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none focus:border-indigo-400 text-center tracking-widest font-mono"
              dir="ltr"
            />
            <button
              type="submit"
              disabled={loading || !code.trim()}
              className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "جارٍ التحقق..." : "تحقق من الكود"}
            </button>
          </form>
        )}

        {step === "google" && (
          <div className="flex flex-col items-center gap-4 py-2">
            <button
              type="button"
              onClick={handleGoogleLoginClick}
              className="w-full flex items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm"
            >
              <svg className="w-5 h-5" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
                <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"/>
                <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
                <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
              </svg>
              تسجيل الدخول عبر Google
            </button>

            <button
              type="button"
              onClick={() => {
                setStep("code");
                setError("");
                setCode("");
              }}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              رجوع
            </button>
          </div>
        )}

        {step === "redirecting" && (
          <div className="flex flex-col items-center gap-3 py-4">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
            <p className="text-sm text-gray-500">جارٍ الاتصال بـ Google...</p>
          </div>
        )}
      </div>
    </div>
  );
}
