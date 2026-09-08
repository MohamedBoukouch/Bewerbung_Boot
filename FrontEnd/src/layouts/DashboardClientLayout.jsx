import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

/* ── Icons ─────────────────────────────────────────────── */
const IconTarget = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
  </svg>
);
const IconFileEdit = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);
const IconSend = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);
const IconApps = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
    <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
  </svg>
);
const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
    <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
  </svg>
);
const IconChevronUp = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="18 15 12 9 6 15"/>
  </svg>
);
const IconPlay = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#EF4444" stroke="none">
    <polygon points="5 3 19 12 5 21 5 3"/>
  </svg>
);
const IconWhatsapp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.103 1.523 5.824L.054 23.25a.75.75 0 0 0 .922.913l5.476-1.457A11.956 11.956 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
  </svg>
);
const IconLogout = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);
const IconGoogle = () => (
  <svg width="14" height="14" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);
const Logo = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
    <circle cx="14" cy="6"  r="4.5" fill="#3B82F6"/>
    <circle cx="5"  cy="21" r="4.5" fill="#06B6D4"/>
    <circle cx="23" cy="21" r="4.5" fill="#8B5CF6"/>
    <line x1="14" y1="10" x2="5"  y2="17" stroke="#06B6D4" strokeWidth="1.4"/>
    <line x1="14" y1="10" x2="23" y2="17" stroke="#8B5CF6" strokeWidth="1.4"/>
    <line x1="5"  y1="21" x2="23" y2="21" stroke="#94A3B8" strokeWidth="1.2"/>
  </svg>
);

/* ── Nav items ──────────────────────────────────────────── */
const NAV = [
  { to: "/dashboard-client/datenextraktion", label: "Datenextraktion", Icon: IconTarget },
  { to: "/dashboard-client", label: "Erstellung von Anschreib...", Icon: IconFileEdit, end: true },
  { to: "/dashboard-client/emails-senden", label: "E-Mails senden", Icon: IconSend },
];

/* ── Main component ─────────────────────────────────────── */
export default function DashboardClientLayout() {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { user, googleUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const displayUser = googleUser || user;

  useEffect(() => {
    if (location.pathname === "/dashboard-client") {
      navigate("/dashboard-client/datenextraktion", { replace: true });
    }
  }, [location.pathname, navigate]);

  const handleLogout = async () => {
    await logout();
    navigate("/login", { replace: true });
  };

  const goHome = () => {
    navigate("/dashboard-client/datenextraktion");
    setMobileOpen(false);
  };

  const getInitials = (name) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`
          flex flex-col bg-white border-r border-gray-200
          transition-all duration-300 ease-in-out flex-shrink-0 z-50
          fixed md:static inset-y-0 left-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          w-[260px] md:${open ? "w-[260px]" : "w-16"}
        `}
      >
        <div 
          onClick={goHome}
          className="flex items-center gap-3 px-4 py-5 border-b border-gray-100 min-h-[64px] cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div className="flex-shrink-0"><Logo /></div>
          <span className={`text-[17px] font-bold text-gray-900 tracking-tight whitespace-nowrap transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 md:hidden"}`}>
            Bewerber
          </span>
        </div>

        <nav className="flex flex-col gap-0.5 px-2 pt-4">
          {NAV.map(({ to, label, Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={() => setMobileOpen(false)}
              title={!open ? label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium
                 transition-colors duration-150 cursor-pointer
                 ${isActive
                   ? "bg-gray-100 text-gray-900"
                   : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                 }`
              }
            >
              <span className="flex-shrink-0"><Icon /></span>
              <span className={`truncate transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 md:hidden"}`}>{label}</span>
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => { navigate("/dashboard-client/my-applications"); setMobileOpen(false); }}
          title={!open ? "My applications" : undefined}
          className="flex items-center gap-2.5 mx-2 mt-1.5 px-3 py-2.5 rounded-lg text-[13.5px] font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
        >
          <span className="flex-shrink-0"><IconApps /></span>
          <span className={`transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 md:hidden"}`}>My applications</span>
        </button>

        <div className="flex-1" />

        <div className={`hidden md:flex px-2 pb-2 ${open ? "" : "justify-center"}`}>
          <button
            onClick={() => setOpen(p => !p)}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            <IconMenu />
            <span className={`text-[13.5px] font-medium transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 hidden"}`}>
              Schliessen
            </span>
          </button>
        </div>

        <div className="px-2 pb-2">
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl hover:bg-gray-50 transition-colors ${open ? "" : "justify-center"}`}
            >
              {displayUser?.picture ? (
                <img 
                  src={displayUser.picture} 
                  alt="" 
                  className="w-8 h-8 rounded-full flex-shrink-0 object-cover border border-gray-200"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-[11px] font-bold flex-shrink-0">
                  {getInitials(displayUser?.name || displayUser?.email)}
                </div>
              )}

              <div className={`flex-1 overflow-hidden text-left transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 md:hidden"}`}>
                <p className="text-[13px] font-semibold text-gray-900 truncate leading-tight">
                  {displayUser?.name || displayUser?.email?.split("@")[0] || "Benutzer"}
                </p>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${googleUser?.connected ? "bg-green-500" : "bg-gray-400"}`} />
                  <p className="text-[11px] text-gray-400 truncate">{displayUser?.email}</p>
                </div>
              </div>

              <span className={`transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 md:hidden"}`}>
                <IconChevronUp className={`transform transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
              </span>
            </button>

            {userMenuOpen && open && (
              <div className="absolute bottom-full left-2 right-2 mb-1 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-50">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-xs text-gray-500">Angemeldet mit</p>
                  <div className="flex items-center gap-2 mt-1">
                    <IconGoogle />
                    <span className="text-xs font-medium text-gray-700">
                      {googleUser?.connected ? "Google" : "Code d'acces"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <IconLogout />
                  <span>Abmelden</span>
                </button>
              </div>
            )}
          </div>
        </div>

        <div className={`flex flex-col gap-2 px-2 pb-4 pt-2 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0 md:hidden"}`}>
          <button className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg border border-gray-200 bg-white text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors">
            <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
              <IconPlay />
            </div>
            Tutorial Video
          </button>
          <button className="flex items-center justify-center gap-2 w-full px-3 py-2.5 rounded-lg bg-green-500 hover:bg-green-600 transition-colors text-white text-[13px] font-bold">
            <IconWhatsapp />
            Kontakt mit dem Entwickler
          </button>
        </div>
      </aside>

      <div className="flex flex-col flex-1 overflow-hidden min-w-0">
        <div className="flex items-center h-14 px-4 md:px-6 bg-white border-b border-gray-200 flex-shrink-0">
          <button
            onClick={() => setMobileOpen(p => !p)}
            className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors md:hidden"
          >
            <IconMenu />
          </button>

          <div className="md:hidden ml-auto">
            {displayUser?.picture ? (
              <img src={displayUser.picture} alt="" className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-xs font-bold">
                {getInitials(displayUser?.name || displayUser?.email)}
              </div>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-gray-50">
          <Outlet context={{ user, googleConnected: googleUser?.connected, googleUser }} />
        </div>
      </div>
    </div>
  );
}
