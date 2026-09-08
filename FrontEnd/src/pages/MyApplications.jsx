import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IconFolder = () => (
  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const IconTrash = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"/>
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
    <path d="M10 11v6M14 11v6"/>
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
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

const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const IconCopy = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
  </svg>
);

const IconDatabase = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
  </svg>
);

const FIELDS = ["All Fields", "Pflege", "IT", "Verwaltung", "Handwerk", "Gastronomie"];

export default function MyApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [field, setField] = useState("All Fields");
  const [viewModal, setViewModal] = useState(null);

  const today = new Date().toLocaleDateString("de-DE", {
    day: "2-digit", month: "2-digit", year: "numeric",
  }).replace(/\./g, "/");

  /* Load from localStorage */
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bewerber_extractions") || "[]");
    setApplications(stored);
  }, []);

  const filtered = field === "All Fields"
    ? applications
    : applications.filter((a) => a.field?.includes(field) || a.field === field);

  const handleDelete = (id) => {
    const next = applications.filter((a) => a.id !== id);
    setApplications(next);
    localStorage.setItem("bewerber_extractions", JSON.stringify(next));
  };

  const handleDeleteAll = () => {
    setApplications([]);
    localStorage.setItem("bewerber_extractions", "[]");
  };

  const handleDownload = (app) => {
    const csv = [
      ["Company Name", "Email", "City", "Field", "Website", "Phone", "Job Title"],
      ...app.companies.map((c) => [c.company_name, c.email, c.city, c.field, c.website || "", c.phone || "", c.job_title || ""]),
    ].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `extraktion-${app.id}.csv`;
    a.click();
  };

  /* ═══════════════════════════════════════════
     KEY: Navigate to Email Send with companies data
     Pass the Excel data (companies array) via router state
     ═══════════════════════════════════════════ */
  const handleSendEmails = (app) => {
    navigate("/dashboard-client/emails-senden", { 
      state: { 
        companies: app.companies,
        extractionId: app.id,
        field: app.field
      } 
    });
  };

  const handleDuplicate = (app) => {
    const newApp = {
      ...app,
      id: `${app.id}_copy_${Date.now()}`,
      createdAt: new Date().toLocaleDateString("de-DE"),
      status: "Pending"
    };
    const next = [...applications, newApp];
    setApplications(next);
    localStorage.setItem("bewerber_extractions", JSON.stringify(next));
  };

  return (
    <div className="max-w-5xl mx-auto">

      {/* ── Warning banner ── */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 rounded-lg px-4 sm:px-5 py-3 sm:py-4 mb-6 sm:mb-8">
        <p className="text-yellow-700 text-xs sm:text-sm font-semibold">
          Hinweis: Alle abgeschlossenen Anwendungen (Done) werden automatisch alle 7 Tage gelöscht.
        </p>
      </div>

      {/* ── Header row ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-3 sm:gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
          Your Applications ({filtered.length})
        </h1>

        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          {/* Field filter */}
          <div className="relative">
            <select
              value={field}
              onChange={(e) => setField(e.target.value)}
              className="appearance-none border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 pr-8 text-xs sm:text-sm text-gray-700 bg-white outline-none focus:ring-2 focus:ring-indigo-300 cursor-pointer"
            >
              {FIELDS.map((f) => <option key={f}>{f}</option>)}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round"><polyline points="6 9 12 15 18 9"/></svg>
            </div>
          </div>

          {/* Date display */}
          <div className="border border-gray-200 rounded-xl px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm text-gray-700 bg-white select-none">
            {today}
          </div>

          {/* Delete all */}
          <button
            onClick={handleDeleteAll}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs sm:text-sm font-semibold px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl transition-colors"
          >
            <IconTrash />
            <span className="hidden sm:inline">Delete All</span>
          </button>
        </div>
      </div>

      {/* ── Empty state ── */}
      {filtered.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 sm:py-32 gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
            <IconFolder />
          </div>
          <p className="text-gray-500 text-sm font-medium">No applications found.</p>
        </div>
      )}

      {/* ── Applications cards grid ── */}
      {filtered.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {filtered.map((app) => (
            <div key={app.id} className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
              {/* Title */}
              <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-1 truncate">
                {app.id}
              </h3>

              {/* Created at */}
              <p className="text-xs sm:text-sm text-gray-400 mb-3">
                Created at: {app.createdAt}
              </p>

              {/* Company count */}
              <p className="text-xs text-gray-500 mb-2">
                {app.companies?.length || 0} companies found
              </p>

              {/* Status badge */}
              <div className="mb-4">
                <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
                  app.status === "Done" 
                    ? "bg-green-100 text-green-700" 
                    : app.status === "Sending" 
                    ? "bg-blue-100 text-blue-700"
                    : "bg-purple-100 text-purple-700"
                }`}>
                  <IconDatabase />
                  {app.status || "Pending"}
                </span>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDownload(app)}
                  className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
                  title="Download Excel"
                >
                  <IconDownload />
                </button>
                <button
                  onClick={() => setViewModal(app)}
                  className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
                  title="View Companies"
                >
                  <IconEye />
                </button>
                <div className="flex-1" />
                <button
                  onClick={() => handleSendEmails(app)}
                  className="flex items-center gap-1.5 bg-green-100 hover:bg-green-200 text-green-700 text-xs font-semibold px-3 py-2 rounded-xl transition-colors"
                  title="Send Emails"
                >
                  <IconSend />
                  <span className="hidden sm:inline">Send</span>
                </button>
                <button
                  onClick={() => handleDuplicate(app)}
                  className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors"
                  title="Duplicate"
                >
                  <IconCopy />
                </button>
                <button
                  onClick={() => handleDelete(app.id)}
                  className="w-9 h-9 rounded-xl bg-orange-100 hover:bg-orange-200 flex items-center justify-center text-orange-700 transition-colors"
                  title="Delete"
                >
                  <IconTrash />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── View Modal ── */}
      {viewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">{viewModal.id}</h3>
              <button onClick={() => setViewModal(null)} className="text-gray-400 hover:text-gray-600">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700">Company</th>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700">Email</th>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700">City</th>
                    <th className="text-left px-3 py-2 font-semibold text-gray-700">Job Title</th>
                  </tr>
                </thead>
                <tbody>
                  {viewModal.companies?.map((c, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="px-3 py-2 text-gray-800">{c.company_name}</td>
                      <td className="px-3 py-2 text-gray-600">{c.email}</td>
                      <td className="px-3 py-2 text-gray-600">{c.city}</td>
                      <td className="px-3 py-2 text-gray-600">{c.job_title || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}