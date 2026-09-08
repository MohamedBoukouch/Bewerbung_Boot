import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ── API Base URL ── */
const API_BASE = "http://localhost:8000/api";

/* ── Icons ── */
const IconChevronDown = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const IconInfo = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
);
const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconX = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);
const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);
const IconEye = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const IconAlert = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);

/* ── Sources ── */
const SOURCES = [
  { id: "arbeitsagentur", label: "Arbeitsagentur", badge: null, logo: <img src="/assets/icons/arbeitsagentur.png" alt="Arbeitsagentur" className="w-8 h-8 object-contain rounded-full" />, type: "arbeitsagentur" },
  { id: "azubiyo", label: "Azubiyo", badge: null, logo: <img src="/assets/icons/azubiyo.png" alt="Azubiyo" className="w-8 h-8 object-contain rounded-lg" />, type: "maps" },
  { id: "aubiplus", label: "Aubi-plus", badge: null, logo: <img src="/assets/icons/aubi-plus.png" alt="Aubi-plus" className="w-8 h-8 object-contain rounded-full" />, type: "maps" },
  { id: "ausbildungde", label: "Ausbildung.de", badge: "New", logo: <img src="/assets/icons/ausbildung.png" alt="Ausbildung.de" className="w-8 h-8 object-contain rounded-lg" />, type: "maps" },
  { id: "azubica", label: "Azubica", badge: "New", logo: <img src="/assets/icons/azubica.png" alt="Azubica" className="w-8 h-8 object-contain rounded-lg" />, type: "maps" },
  { id: "indeed", label: "Indeed", badge: "New", logo: <img src="/assets/icons/indeed.png" alt="Indeed" className="w-8 h-8 object-contain rounded-full" />, type: "indeed" },
  { id: "linkedin", label: "LinkedIn", badge: "New", logo: <img src="/assets/icons/linkedin.png" alt="LinkedIn" className="w-8 h-8 object-contain rounded-lg" />, type: "linkedin" },
  { id: "xing", label: "Xing", badge: "New", logo: <img src="/assets/icons/xing.png" alt="Xing" className="w-8 h-8 object-contain rounded-lg" />, type: "xing" },
];

/* ── Arbeitsagentur Config ── */
function ArbeitsagenturConfig({ config, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm h-full">
      <div className="flex items-center gap-3 mb-4 sm:mb-5">
        <img src="/assets/icons/arbeitsagentur.png" alt="Arbeitsagentur" className="w-8 h-8 object-contain rounded-full" />
        <h2 className="text-base sm:text-lg font-bold text-gray-900">Arbeitsagentur Einstellungen</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="relative">
          <select
            value={config.jobType || "Ausbildung / Duales Studium"}
            onChange={(e) => onChange({ ...config, jobType: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none appearance-none bg-white focus:ring-2 focus:ring-indigo-300 cursor-pointer"
          >
            <option>Arbeit</option>
            <option>Ausbildung / Duales Studium</option>
            <option>Praktikum / Trainee / Werkstudent</option>
            <option>Selbständigkeit</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><IconChevronDown /></div>
        </div>
        <div className="relative">
          <select
            value={config.date || "Heute"}
            onChange={(e) => onChange({ ...config, date: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none appearance-none bg-white focus:ring-2 focus:ring-indigo-300 cursor-pointer"
          >
            <option>Alle anzeigen</option>
            <option>Heute</option>
            <option>Gestern</option>
            <option>1 Woche</option>
            <option>2 Wochen</option>
            <option>4 Wochen</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><IconChevronDown /></div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-900 mb-2">Ort</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={config.location || ""}
            onChange={(e) => onChange({ ...config, location: e.target.value })}
            placeholder="z. B. Berlin, Hamburg"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
          />
          <div className="relative">
            <select
              value={config.locationScope || "Ganzer Ort"}
              onChange={(e) => onChange({ ...config, locationScope: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none appearance-none bg-white focus:ring-2 focus:ring-indigo-300 cursor-pointer"
            >
              <option>Ganzer Ort</option>
              <option>10 km</option>
              <option>15 km</option>
              <option>25 km</option>
              <option>50 km</option>
              <option>100 km</option>
              <option>200 km</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><IconChevronDown /></div>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-900 mb-2">Beruf</label>
        <input
          type="text"
          value={config.profession || ""}
          onChange={(e) => onChange({ ...config, profession: e.target.value })}
          placeholder="z. B. Pflegefachmann"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
        />
      </div>
    </div>
  );
}

/* ── Indeed Config ── */
function IndeedConfig({ config, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm h-full">
      <div className="flex items-center gap-3 mb-4 sm:mb-5">
        <img src="/assets/icons/indeed.png" alt="Indeed" className="w-8 h-8 object-contain rounded-full" />
        <h2 className="text-base sm:text-lg font-bold text-gray-900">Indeed Einstellungen</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="relative">
          <select
            value={config.jobType || "Ausbildung"}
            onChange={(e) => onChange({ ...config, jobType: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none appearance-none bg-white focus:ring-2 focus:ring-indigo-300 cursor-pointer"
          >
            <option>Vollzeit</option>
            <option>Teilzeit</option>
            <option>Praktikum</option>
            <option>Werkstudent</option>
            <option>Ausbildung</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><IconChevronDown /></div>
        </div>
        <div className="relative">
          <select
            value={config.date || "Heute"}
            onChange={(e) => onChange({ ...config, date: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none appearance-none bg-white focus:ring-2 focus:ring-indigo-300 cursor-pointer"
          >
            <option>Alle anzeigen</option>
            <option>Heute</option>
            <option>Letzte 3 Tage</option>
            <option>Letzte 7 Tage</option>
            <option>Letzte 14 Tage</option>
            <option>Letzte 30 Tage</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><IconChevronDown /></div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-900 mb-2">Ort</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={config.location || ""}
            onChange={(e) => onChange({ ...config, location: e.target.value })}
            placeholder="z. B. Berlin, Hamburg"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
          />
          <div className="relative">
            <select
              value={config.locationScope || "Ganzer Ort"}
              onChange={(e) => onChange({ ...config, locationScope: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none appearance-none bg-white focus:ring-2 focus:ring-indigo-300 cursor-pointer"
            >
              <option>Ganzer Ort</option>
              <option>5 km</option>
              <option>10 km</option>
              <option>15 km</option>
              <option>25 km</option>
              <option>50 km</option>
              <option>100 km</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><IconChevronDown /></div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-900 mb-2">Beruf</label>
        <input
          type="text"
          value={config.profession || ""}
          onChange={(e) => onChange({ ...config, profession: e.target.value })}
          placeholder="z. B. Pflegefachmann"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-900 mb-1">Maximale Anzahl</label>
        <p className="text-xs text-gray-400 mb-2">(Nur mit E-Mail, Default 50)</p>
        <input
          type="number"
          min="1"
          max="200"
          value={config.maxJobs || ""}
          onChange={(e) => onChange({ ...config, maxJobs: e.target.value })}
          placeholder="z. B. 100"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
        />
      </div>
    </div>
  );
}

/* ── LinkedIn Config ── */
function LinkedInConfig({ config, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm h-full">
      <div className="flex items-center gap-3 mb-4 sm:mb-5">
        <img src="/assets/icons/linkedin.png" alt="LinkedIn" className="w-8 h-8 object-contain rounded-lg" />
        <h2 className="text-base sm:text-lg font-bold text-gray-900">LinkedIn Einstellungen</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="relative">
          <select
            value={config.jobType || "Praktikum"}
            onChange={(e) => onChange({ ...config, jobType: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none appearance-none bg-white focus:ring-2 focus:ring-indigo-300 cursor-pointer"
          >
            <option>Vollzeit</option>
            <option>Teilzeit</option>
            <option>Praktikum</option>
            <option>Werkstudent</option>
            <option>Ausbildung</option>
            <option>Vertrag</option>
            <option>Temporär</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><IconChevronDown /></div>
        </div>
        <div className="relative">
          <select
            value={config.date || "Heute"}
            onChange={(e) => onChange({ ...config, date: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none appearance-none bg-white focus:ring-2 focus:ring-indigo-300 cursor-pointer"
          >
            <option>Alle anzeigen</option>
            <option>Heute</option>
            <option>Letzte Woche</option>
            <option>Letzter Monat</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><IconChevronDown /></div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-900 mb-2">Ort</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={config.location || ""}
            onChange={(e) => onChange({ ...config, location: e.target.value })}
            placeholder="z. B. Berlin, Hamburg"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
          />
          <div className="relative">
            <select
              value={config.locationScope || "Ganzer Ort"}
              onChange={(e) => onChange({ ...config, locationScope: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none appearance-none bg-white focus:ring-2 focus:ring-indigo-300 cursor-pointer"
            >
              <option>Ganzer Ort</option>
              <option>5 km</option>
              <option>10 km</option>
              <option>25 km</option>
              <option>50 km</option>
              <option>100 km</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><IconChevronDown /></div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-900 mb-2">Beruf</label>
        <input
          type="text"
          value={config.profession || ""}
          onChange={(e) => onChange({ ...config, profession: e.target.value })}
          placeholder="z. B. Pflegefachmann"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-900 mb-1">Maximale Anzahl</label>
        <p className="text-xs text-gray-400 mb-2">(Nur mit E-Mail, Default 50)</p>
        <input
          type="number"
          min="1"
          max="200"
          value={config.maxJobs || ""}
          onChange={(e) => onChange({ ...config, maxJobs: e.target.value })}
          placeholder="z. B. 100"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
        />
      </div>
    </div>
  );
}

/* ── Xing Config ── */
function XingConfig({ config, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm h-full">
      <div className="flex items-center gap-3 mb-4 sm:mb-5">
        <img src="/assets/icons/xing.png" alt="Xing" className="w-8 h-8 object-contain rounded-lg" />
        <h2 className="text-base sm:text-lg font-bold text-gray-900">Xing Einstellungen</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div className="relative">
          <select
            value={config.jobType || "Ausbildung"}
            onChange={(e) => onChange({ ...config, jobType: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none appearance-none bg-white focus:ring-2 focus:ring-indigo-300 cursor-pointer"
          >
            <option>Vollzeit</option>
            <option>Teilzeit</option>
            <option>Praktikum</option>
            <option>Werkstudent</option>
            <option>Ausbildung</option>
            <option>Freelance</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><IconChevronDown /></div>
        </div>
        <div className="relative">
          <select
            value={config.date || "Heute"}
            onChange={(e) => onChange({ ...config, date: e.target.value })}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none appearance-none bg-white focus:ring-2 focus:ring-indigo-300 cursor-pointer"
          >
            <option>Alle anzeigen</option>
            <option>Heute</option>
            <option>Letzte 3 Tage</option>
            <option>Letzte Woche</option>
            <option>Letzte 2 Wochen</option>
            <option>Letzter Monat</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><IconChevronDown /></div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-900 mb-2">Ort</label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            type="text"
            value={config.location || ""}
            onChange={(e) => onChange({ ...config, location: e.target.value })}
            placeholder="z. B. Berlin, Hamburg"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
          />
          <div className="relative">
            <select
              value={config.locationScope || "Ganzer Ort"}
              onChange={(e) => onChange({ ...config, locationScope: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm text-gray-800 outline-none appearance-none bg-white focus:ring-2 focus:ring-indigo-300 cursor-pointer"
            >
              <option>Ganzer Ort</option>
              <option>5 km</option>
              <option>10 km</option>
              <option>25 km</option>
              <option>50 km</option>
              <option>100 km</option>
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"><IconChevronDown /></div>
          </div>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold text-gray-900 mb-2">Beruf</label>
        <input
          type="text"
          value={config.profession || ""}
          onChange={(e) => onChange({ ...config, profession: e.target.value })}
          placeholder="z. B. Pflegefachmann"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-900 mb-1">Maximale Anzahl</label>
        <p className="text-xs text-gray-400 mb-2">(Nur mit E-Mail, Default 50)</p>
        <input
          type="number"
          min="1"
          max="200"
          value={config.maxJobs || ""}
          onChange={(e) => onChange({ ...config, maxJobs: e.target.value })}
          placeholder="z. B. 100"
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
        />
      </div>
    </div>
  );
}

/* ── Maps-style Config (Azubiyo, Aubi-plus, Ausbildung.de, Azubica, etc.) ── */
function MapsConfig({ source, config, onChange }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-5 shadow-sm h-full">
      <div className="flex items-center gap-3 mb-4 sm:mb-5">
        <div className="w-8 h-8 flex items-center justify-center">{source.logo}</div>
        <h2 className="text-base sm:text-lg font-bold text-gray-900">{source.label} Einstellungen</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Beruf</label>
          <input
            type="text"
            value={config.profession || ""}
            onChange={(e) => onChange({ ...config, profession: e.target.value })}
            placeholder="z. B. Pflegefachmann"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1">Maximale Anzahl</label>
          <p className="text-xs text-gray-400 mb-2">(Nur mit E-Mail, Default 50)</p>
          <input
            type="number"
            min="1"
            max="200"
            value={config.maxJobs || ""}
            onChange={(e) => onChange({ ...config, maxJobs: e.target.value })}
            placeholder="z. B. 100"
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
          <IconMapPin /> Ort (optional)
        </label>
        <input
          type="text"
          value={config.location || ""}
          onChange={(e) => onChange({ ...config, location: e.target.value })}
          placeholder="z. B. Berlin, München, Hamburg..."
          className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
        />
        <p className="text-xs text-gray-400 mt-1">
          Leer lassen für Deutschland-weite Suche
        </p>
      </div>
    </div>
  );
}

/* ── Config Renderer ── */
function SourceConfig({ sourceId, configs, setConfigs }) {
  const source = SOURCES.find((s) => s.id === sourceId);
  const config = configs[sourceId] || {};

  const handleChange = (newConfig) => {
    setConfigs((prev) => ({ ...prev, [sourceId]: newConfig }));
  };

  if (sourceId === "arbeitsagentur") {
    return <ArbeitsagenturConfig config={config} onChange={handleChange} />;
  }
  if (sourceId === "indeed") {
    return <IndeedConfig config={config} onChange={handleChange} />;
  }
  if (sourceId === "linkedin") {
    return <LinkedInConfig config={config} onChange={handleChange} />;
  }
  if (sourceId === "xing") {
    return <XingConfig config={config} onChange={handleChange} />;
  }
  return <MapsConfig source={source} config={config} onChange={handleChange} />;
}

/* ── Extraction Loading Screen ── */
function ExtractionScreen({ onStop, sourceLabel, logs, error }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-indigo-600 animate-spin" />
        <img src="/assets/icons/arbeitsagentur.png" alt="" className="absolute inset-0 w-8 h-8 m-auto object-contain rounded-full" />
      </div>

      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Daten werden extrahiert...</h2>
      <p className="text-gray-500 mb-2">Verbinde mit <span className="font-semibold text-gray-700">{sourceLabel}</span></p>
      <p className="text-gray-400 text-sm mb-6">
        Nur Unternehmen mit gültiger E-Mail werden gespeichert.
      </p>

      <button onClick={onStop} className="bg-red-500 hover:bg-red-600 text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-colors mb-8">
        Stop
      </button>

      <div className="w-full max-w-2xl bg-gray-50 rounded-2xl border border-gray-200 p-4 sm:p-6">
        <div className="space-y-2 max-h-[300px] overflow-y-auto">
          {logs.map((log, i) => (
            <div key={i} className="flex items-center gap-2 text-sm">
              {log.type === "info" && <IconInfo />}
              {log.type === "success" && <IconCheck />}
              {log.type === "error" && <IconAlert />}
              <span className={
                log.type === "success" ? "text-green-600 font-medium" :
                log.type === "error" ? "text-red-600 font-medium" :
                "text-gray-600"
              }>{log.message}</span>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm max-w-2xl w-full">
          <strong>Fehler:</strong> {error}
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════ */
export default function Datenextraktion() {
  const navigate = useNavigate();
  const [field, setField] = useState("");
  const [fieldTags, setFieldTags] = useState([]);
  const [selected, setSelected] = useState({});
  const [configs, setConfigs] = useState({});
  const [extracting, setExtracting] = useState(false);
  const [logs, setLogs] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [extractedData, setExtractedData] = useState([]);
  const [activeSourceLabel, setActiveSourceLabel] = useState("");
  const [activeSourceId, setActiveSourceId] = useState("");
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const abortRef = useRef(false);

  const toggle = (id, disabled) => {
    if (disabled) return;
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const anySelected = Object.values(selected).some(Boolean);
  const selectedIds = Object.entries(selected).filter(([, v]) => v).map(([k]) => k);
  const hasFieldTags = fieldTags.length > 0;

  const addFieldTag = () => {
    if (!field.trim()) return;
    if (!fieldTags.includes(field.trim())) {
      setFieldTags([...fieldTags, field.trim()]);
    }
    setField("");
  };

  const removeFieldTag = (tag) => {
    setFieldTags(fieldTags.filter((t) => t !== tag));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addFieldTag();
    }
  };

  /* ── Build payload based on source type ── */
  const buildPayload = (sourceId, sourceConfig, fieldTags) => {
    const basePayload = {
      source: sourceId,
      fieldTags,
      maxResults: parseInt(sourceConfig.maxJobs || 50),
    };

    if (sourceId === "arbeitsagentur") {
      return {
        ...basePayload,
        config: {
          jobType: sourceConfig.jobType || "Ausbildung / Duales Studium",
          profession: sourceConfig.profession?.trim() || fieldTags[0],
          location: sourceConfig.location || "",
          locationScope: sourceConfig.locationScope || "Ganzer Ort",
          date: sourceConfig.date || "Heute",
        },
      };
    }

    if (sourceId === "indeed") {
      return {
        ...basePayload,
        config: {
          profession: sourceConfig.profession?.trim() || fieldTags[0],
          location: sourceConfig.location || "",
          locationScope: sourceConfig.locationScope || "Ganzer Ort",
          jobType: sourceConfig.jobType || "Ausbildung",
          date: sourceConfig.date || "Heute",
          maxJobs: parseInt(sourceConfig.maxJobs || 50),
        },
      };
    }

    if (sourceId === "linkedin") {
      return {
        ...basePayload,
        config: {
          profession: sourceConfig.profession?.trim() || fieldTags[0],
          location: sourceConfig.location || "",
          locationScope: sourceConfig.locationScope || "Ganzer Ort",
          jobType: sourceConfig.jobType || "Praktikum",
          date: sourceConfig.date || "Heute",
          maxJobs: parseInt(sourceConfig.maxJobs || 50),
        },
      };
    }

    if (sourceId === "xing") {
      return {
        ...basePayload,
        config: {
          profession: sourceConfig.profession?.trim() || fieldTags[0],
          location: sourceConfig.location || "",
          locationScope: sourceConfig.locationScope || "Ganzer Ort",
          jobType: sourceConfig.jobType || "Ausbildung",
          date: sourceConfig.date || "Heute",
          maxJobs: parseInt(sourceConfig.maxJobs || 50),
        },
      };
    }

    /* Maps-type sources: azubiyo, aubiplus, ausbildungde, azubica, etc. */
    return {
      ...basePayload,
      config: {
        profession: sourceConfig.profession?.trim() || fieldTags[0],
        location: sourceConfig.location || "",
        maxJobs: parseInt(sourceConfig.maxJobs || 50),
      },
    };
  };

  /* ── Real extraction via backend API ── */
  const handleExtract = async () => {
    if (!anySelected || !hasFieldTags) {
      alert("Bitte wählen Sie eine Quelle und geben Sie mindestens einen Fachbereich ein.");
      return;
    }

    setExtracting(true);
    setShowResults(false);
    setLogs([]);
    setError(null);
    abortRef.current = false;

    const sourceId = selectedIds[0];
    const source = SOURCES.find((s) => s.id === sourceId);
    setActiveSourceLabel(source.label);
    setActiveSourceId(sourceId);

    const newLogs = [];

    const addLog = (type, message) => {
      newLogs.push({ type, message });
      setLogs([...newLogs]);
    };

    try {
      const sourceConfig = configs[sourceId] || {};
      const payload = buildPayload(sourceId, sourceConfig, fieldTags);

      const url = `${API_BASE}/extract`;

      console.log("====================================");
      console.log("POST URL:", url);
      console.log("Source:", sourceId);
      console.log("Payload:", payload);
      console.log("====================================");

      addLog("info", `Connecting to ${source.label}...`);
      addLog("info", "Only companies with email will be kept...");

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 300000);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      console.log("Status:", response.status);

      if (abortRef.current) return;

      const contentType = response.headers.get("content-type");

      if (!response.ok) {
        const text = await response.text();
        console.error("Backend Error:", text);
        throw new Error(`HTTP ${response.status}\n${text}`);
      }

      if (!contentType?.includes("application/json")) {
        const text = await response.text();
        console.error(text);
        throw new Error("Backend did not return JSON.\n\n" + text);
      }

      const data = await response.json();
      console.log("Backend Response:", data);

      if (!data.success) {
        throw new Error(data.error || "Unknown backend error.");
      }

      if (data.logs) {
        newLogs.push(...data.logs);
        setLogs([...newLogs]);
      }

      const companies = data.companies || [];

      setExtractedData(companies);
      setTotalItems(data.totalItems || companies.length);

      addLog("success", `${companies.length} companies with email extracted successfully.`);

      setShowResults(true);

      const existing = JSON.parse(
        localStorage.getItem("bewerber_extractions") || "[]"
      );

      const extraction = {
        id: crypto.randomUUID(),
        createdAt: new Date().toLocaleString("de-DE"),
        source: source.label,
        sourceId,
        field: fieldTags.join(", "),
        status: "Data extracted",
        companies,
        totalItems: companies.length,
        config: sourceConfig,
      };

      localStorage.setItem(
        "bewerber_extractions",
        JSON.stringify([extraction, ...existing])
      );

    } catch (err) {
      console.error("Extraction Error:", err);
      if (err.name === 'AbortError') {
        setError("Request timed out after 5 minutes.");
        addLog("error", "Request timed out after 5 minutes.");
      } else {
        setError(err.message);
        addLog("error", err.message);
      }
    } finally {
      if (!abortRef.current) {
        setExtracting(false);
      }
    }
  };

  const handleStop = () => {
    abortRef.current = true;
    setExtracting(false);
  };

  /* ── CSV Download ── */
  const handleDownload = () => {
    if (!extractedData || extractedData.length === 0) {
      alert("Keine Daten zum Download vorhanden!");
      return;
    }

    const headers = ["Company Name", "Email", "City", "Field", "Website", "Phone", "Job Title"];

    const rows = extractedData.map((c) => [
      c.company_name || c.name || "",
      c.email || "",
      c.city || "",
      c.field || "",
      c.website || "",
      c.phone || "",
      c.job_title || c.jobTitle || "",
    ]);

    const escapeCSV = (val) => {
      const str = String(val || "").replace(/"/g, '""');
      if (str.includes(",") || str.includes("\n") || str.includes('"')) {
        return `"${str}"`;
      }
      return str;
    };

    const csv = [headers, ...rows]
      .map((row) => row.map(escapeCSV).join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `extraktion-${new Date().toISOString().split("T")[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  /* ── Results View ── */
  if (showResults && !extracting) {
    return (
      <div className="max-w-4xl mx-auto">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
          Extraktion abgeschlossen
        </h1>

        <div className="bg-green-50 border border-green-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center gap-2">
            <IconMail />
            <p className="text-green-700 font-semibold">
              {extractedData.length} Unternehmen mit E-Mail gefunden
            </p>
          </div>
          <p className="text-green-600 text-sm mt-1">
            Nur Unternehmen mit gültiger E-Mail-Adresse wurden gespeichert.
          </p>
        </div>

        {fieldTags.length > 0 && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 mb-6">
            <p className="text-sm font-semibold text-indigo-700 mb-2">Ihre Interessen:</p>
            <div className="flex flex-wrap gap-2">
              {fieldTags.map((tag) => (
                <span key={tag} className="bg-indigo-100 text-indigo-700 text-sm font-medium px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Results table */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">#</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Unternehmen</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">E-Mail</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Stadt</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-700">Website</th>
                </tr>
              </thead>
              <tbody>
                {extractedData.map((company, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{company.company_name || company.name || "—"}</td>
                    <td className="px-4 py-3 text-indigo-600">
                      {company.email ? (
                        <a href={`mailto:${company.email}`} className="hover:underline">
                          {company.email}
                        </a>
                      ) : (
                        <span className="text-gray-300 italic">keine E-Mail</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-500">{company.city || "—"}</td>
                    <td className="px-4 py-3 text-gray-500">
                      {company.website ? (
                        <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-indigo-500 hover:underline text-xs">
                          {String(company.website).replace(/^https?:\/\//, "").substring(0, 25)}...
                        </a>
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button onClick={handleDownload} className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
            <IconDownload /> Download CSV
          </button>
          <button onClick={() => navigate("/dashboard-client/my-applications")} className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
            <IconEye /> In My Applications ansehen
          </button>
          <button onClick={() => { setShowResults(false); setSelected({}); setFieldTags([]); setError(null); }} className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold px-5 py-2.5 rounded-xl transition-colors">
            Neue Extraktion
          </button>
        </div>
      </div>
    );
  }

  /* ── Extraction Loading ── */
  if (extracting) {
    return (
      <ExtractionScreen
        onStop={handleStop}
        sourceLabel={activeSourceLabel}
        logs={logs}
        error={error}
      />
    );
  }

  /* ── Main Form ── */
  return (
    <div className="max-w-5xl mx-auto">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
        Daten aus mehreren Quellen extrahieren
      </h1>

      {/* Info notice */}
      <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
        <IconMail />
        <div>
          <p className="text-sm text-blue-800 font-semibold">E-Mail Extraktion</p>
          <p className="text-xs text-blue-600">
            Alle Plattformen extrahieren E-Mails. Wenn keine E-Mail auf der Angebotsseite gefunden wird,
            wird die Firmenwebsite durchsucht (Impressum/Kontakt). Nur Unternehmen mit E-Mail werden gespeichert.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 mb-4 sm:mb-6 shadow-sm">
        <p className="text-indigo-600 font-semibold text-sm mb-1">Dein Fachbereich *</p>
        <p className="text-gray-500 text-xs sm:text-sm mb-4">
          Der Beruf erhöht die Genauigkeit der E-Mail-Erfassung. <span className="text-red-500 font-medium">(Pflichtfeld)</span>
        </p>

        {fieldTags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-3">
            {fieldTags.map((tag) => (
              <span key={tag} className="inline-flex items-center gap-1.5 bg-indigo-50 text-indigo-700 text-sm font-medium px-3 py-1.5 rounded-full">
                {tag}
                <button onClick={() => removeFieldTag(tag)} className="hover:text-indigo-900"><IconX /></button>
              </span>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          <input
            type="text"
            value={field}
            onChange={(e) => setField(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="z. B. Ausbildung zum Pflegefachmann"
            className="flex-1 border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400 transition"
          />
          <button
            onClick={addFieldTag}
            className="w-10 h-10 my-auto rounded-xl border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 transition text-xl leading-none flex-shrink-0"
            title="Add"
          >
            +
          </button>
        </div>
        {!hasFieldTags && (
          <p className="text-red-500 text-xs mt-2">Bitte geben Sie mindestens einen Fachbereich ein.</p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-4 sm:mb-6">
        {SOURCES.map(({ id, label, badge, logo }) => {
          const isBald = badge === "Bald";
          const isChecked = !!selected[id];

          return (
            <button
              key={id}
              onClick={() => toggle(id, isBald)}
              disabled={isBald}
              className={`
                flex items-center gap-3 px-3 sm:px-4 py-3 sm:py-3.5 rounded-2xl border text-left
                transition-all duration-150
                ${isBald
                  ? "border-gray-200 bg-white opacity-60 cursor-not-allowed"
                  : isChecked
                  ? "border-indigo-400 bg-indigo-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm cursor-pointer"
                }
              `}
            >
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">{logo}</div>
              <span className="flex-1 text-sm font-semibold text-gray-800 truncate">{label}</span>
              {badge === "New" && (
                <span className="text-[11px] font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full flex-shrink-0">New</span>
              )}
              {badge === "Bald" && (
                <span className="text-[11px] font-bold text-orange-500 bg-orange-100 px-2 py-0.5 rounded-full flex-shrink-0">Bald</span>
              )}
              <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 ${isChecked ? "bg-indigo-600 border-indigo-600" : "border-gray-300 bg-white"}`}>
                {isChecked && (
                  <svg viewBox="0 0 12 10" width="10" height="10" fill="none">
                    <path d="M1 5l3.5 3.5L11 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {selectedIds.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-6">
          {selectedIds.map((id) => (
            <SourceConfig key={id} sourceId={id} configs={configs} setConfigs={setConfigs} />
          ))}
        </div>
      )}

      <button
        onClick={handleExtract}
        disabled={!anySelected || !hasFieldTags}
        className={`
          w-full sm:w-auto py-3 sm:py-3.5 px-8 sm:px-10 rounded-2xl text-sm font-bold transition-all duration-200
          ${!anySelected || !hasFieldTags
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md hover:shadow-lg"
          }
        `}
      >
        Extraktion starten
      </button>
    </div>
  );
}
