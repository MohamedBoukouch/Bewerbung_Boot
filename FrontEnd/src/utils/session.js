// src/utils/session.js
/**
 * Gestion de la session "abonnement" (code d'accès + pack + expiration).
 * Suit exactement le même pattern que le reste de l'app (localStorage,
 * comme "google_user" et "bewerber_extractions"), pas de cookie/context.
 */

const SESSION_KEY = "bb_session";       // session active (code déjà activé)
const PENDING_CODE_KEY = "bb_pending_code"; // code validé, en attente du login Google

/* ── Session active ── */
export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveSession({ code, email, pack, expiresAt }) {
  localStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ code, email, pack, expiresAt })
  );
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

/** true si une session existe et n'est pas expirée */
export function isSessionValid(session = getSession()) {
  if (!session || !session.expiresAt) return false;
  return new Date(session.expiresAt).getTime() > Date.now();
}

/* ── Code en attente de connexion Google (1ère activation) ── */
export function getPendingCode() {
  try {
    const raw = localStorage.getItem(PENDING_CODE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function savePendingCode({ code, pack, durationDays }) {
  localStorage.setItem(
    PENDING_CODE_KEY,
    JSON.stringify({ code, pack, durationDays })
  );
}

export function clearPendingCode() {
  localStorage.removeItem(PENDING_CODE_KEY);
}

/* ── Google user existant (posé ailleurs par ton flow Google déjà en place) ── */
export function getGoogleUser() {
  try {
    const raw = localStorage.getItem("google_user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}