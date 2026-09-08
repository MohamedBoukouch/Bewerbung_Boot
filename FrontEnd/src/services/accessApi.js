const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

async function post(path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body),
  });
  let data = null;
  try { data = await res.json(); } catch {}
  if (!res.ok) {
    const err = new Error(data?.detail || "Erreur serveur");
    err.status = res.status;
    throw err;
  }
  return data;
}

export const accessApi = {
  validateCode: (code) => post("/access/validate-code", { code }),
  activateCode: (code, email) => post("/access/activate-code", { code, email }),

  getSession: async () => {
    const res = await fetch(`${API_BASE}/access/session`, { credentials: "include" });
    if (!res.ok) return null;
    return res.json();
  },

  getGoogleStatus: async () => {
    const res = await fetch(`${API_BASE}/access/google-status`, { credentials: "include" });
    if (!res.ok) return { connected: false };
    return res.json();
  },

  logout: () => post("/access/logout", {}),

  startGoogleLogin: async (code) => {
    const res = await fetch(`${API_BASE}/access/google-login?code=${encodeURIComponent(code)}`, {
      credentials: "include",
    });
    const data = await res.json();
    if (data.auth_url) {
      window.location.href = data.auth_url;
    } else {
      throw new Error("Impossible de demarrer la connexion Google.");
    }
  },
};