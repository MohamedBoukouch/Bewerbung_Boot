import { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

const API_BASE = "http://localhost:8000";

/* ── Icons ── */
const IconUpload = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16"/>
    <line x1="12" y1="12" x2="12" y2="21"/>
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/>
  </svg>
);

const IconGoogle = () => (
  <svg width="18" height="18" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
);

const IconCheck = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

const IconAlert = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
);

const IconSpinner = () => (
  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70"/>
  </svg>
);

const IconLogout = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

/* ── Toggle ── */
function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative inline-flex w-10 h-5 rounded-full transition-colors duration-200 flex-shrink-0 ${checked ? "bg-indigo-600" : "bg-gray-300"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${checked ? "translate-x-5" : "translate-x-0"}`} />
    </button>
  );
}

/* ── Drop zone ── */
function DropZone({ label, sublabel, file, onFile, accept = "*" }) {
  const ref = useRef();
  const [drag, setDrag] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) onFile(f);
  };

  return (
    <div className="flex flex-col gap-2">
      <div
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={handleDrop}
        onClick={() => ref.current.click()}
        className={`border-2 border-dashed rounded-2xl flex flex-col items-center justify-center py-8 sm:py-10 cursor-pointer transition-colors ${drag ? "border-indigo-400 bg-indigo-50" : "border-gray-300 bg-gray-50 hover:bg-gray-100"}`}
      >
        <input ref={ref} type="file" className="hidden" accept={accept} onChange={(e) => onFile(e.target.files[0])} />
        <IconUpload />
        <p className="mt-3 text-sm font-semibold text-gray-800">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{sublabel}</p>
      </div>
      <div className="border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-400 bg-white">
        {file ? (
          <span className="text-gray-700 font-medium truncate block">{file.name}</span>
        ) : (
          "Keine Datei ausgewählt"
        )}
      </div>
    </div>
  );
}

/* ── Rich text editor ── */
function RichEditor({ value, onChange }) {
  const exec = (cmd) => document.execCommand(cmd, false, null);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <div className="flex gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50 overflow-x-auto">
        {["bold", "italic", "underline"].map((cmd, i) => (
          <button key={cmd} onMouseDown={(e) => { e.preventDefault(); exec(cmd); }} className="w-8 h-8 rounded flex items-center justify-center text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors flex-shrink-0">
            {["B", "I", "U"][i]}
          </button>
        ))}
        <div className="w-px h-8 bg-gray-300 mx-1" />
        <button onMouseDown={(e) => { e.preventDefault(); exec("insertUnorderedList"); }} className="w-8 h-8 rounded flex items-center justify-center text-sm font-semibold text-gray-700 hover:bg-gray-200">•</button>
      </div>
      <div contentEditable suppressContentEditableWarning onInput={(e) => onChange(e.currentTarget.innerHTML)} className="min-h-[180px] sm:min-h-[220px] px-3 sm:px-4 py-3 text-sm text-gray-800 outline-none leading-relaxed" dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
}

/* ══════════════════════════════════════════════ */
export default function EmailsSenden() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const passedCompanies = location.state?.companies || [];
  const extractionId = location.state?.extractionId || "";

  /* ═══ Auth State ═══ */
  const [user, setUser] = useState(null);  // { id, email, name, picture, connected }
  const [authLoading, setAuthLoading] = useState(true);

  /* ═══ Email State ═══ */
  const [companies, setCompanies] = useState(passedCompanies);
  const [cvFile, setCvFile] = useState(null);
  const [motivationLetter, setMotivationLetter] = useState(null);
  const [additionalFiles, setAdditionalFiles] = useState([]);
  const [useEditor, setUseEditor] = useState(false);
  const [subject, setSubject] = useState("Bewerbung um eine Ausbildung");
  const [content, setContent] = useState(
    `Sehr geehrte Damen und Herren,<br><br>
hiermit bewerbe ich mich um einen Ausbildungsplatz bei <b>{{COMPANY_NAME}}</b> in <b>{{CITY}}</b>.<br><br>
Im Anhang finden Sie meine Bewerbungsunterlagen (Lebenslauf und Zeugnisse).<br>
Über eine Einladung zu einem persönlichen Gespräch würde ich mich sehr freuen.<br><br>
Mit freundlichen Grüßen,<br>
[Ihr Name]`
  );
  const [waitTime, setWaitTime] = useState("30");
  const [skipCompany, setSkipCompany] = useState(false);
  const [statusFile, setStatusFile] = useState(null);
  const [sentEmails, setSentEmails] = useState([]);
  const [sending, setSending] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState("");

  /* ═══ Load user + templates ═══ */
  useEffect(() => {
    // Check URL params from Google callback
    const googleConnected = searchParams.get("google_connected");
    const googleEmail = searchParams.get("email");
    const googleError = searchParams.get("error");

    if (googleError) {
      setError(`Google Login Fehler: ${googleError}`);
    }

    // Load user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("google_user") || "null");
    if (storedUser) {
      setUser(storedUser);
      checkAuthStatus(storedUser.id);
    } else if (googleConnected && googleEmail) {
      // New login — create temp user, will be verified by checkAuthStatus
      const tempUser = { id: "temp", email: googleEmail, connected: true };
      localStorage.setItem("google_user", JSON.stringify(tempUser));
      setUser(tempUser);
      checkAuthStatus("temp");
    }

    // Load saved template
    const savedTemplate = localStorage.getItem("email_template");
    if (savedTemplate) {
      const t = JSON.parse(savedTemplate);
      setSubject(t.subject || subject);
      setContent(t.content || content);
    }

    // Load sent emails
    const sent = JSON.parse(localStorage.getItem(`sent_${extractionId}`) || "[]");
    setSentEmails(sent);

    setAuthLoading(false);
  }, [searchParams, extractionId]);

  /* ═══ Check auth status with backend ═══ */
  const checkAuthStatus = async (userId) => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/check?user_id=${userId}`);
      const data = await res.json();
      if (data.connected) {
        setUser(prev => ({ ...prev, connected: true, email: data.email }));
      }
    } catch (e) {
      console.error("Auth check failed", e);
    }
  };

  /* ═══ Google Login ═══ */
  const handleGoogleLogin = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/auth/google/login`);
      const data = await res.json();
      if (data.auth_url) {
        window.location.href = data.auth_url;  // Full redirect to Google
      }
    } catch (e) {
      setError("Google Login konnte nicht gestartet werden.");
    }
  };

  /* ═══ Logout ═══ */
  const handleLogout = async () => {
    if (user?.id) {
      await fetch(`${API_BASE}/api/auth/logout?user_id=${user.id}`, { method: "POST" });
    }
    localStorage.removeItem("google_user");
    setUser(null);
  };

  /* ═══ Parse status file ═══ */
  const parseStatusFile = async (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const lines = text.split("\n");
      const emails = [];
      lines.forEach(line => {
        const cols = line.split(",");
        if (cols[1] && cols[1].includes("@")) emails.push(cols[1].trim());
      });
      setSentEmails(emails);
    };
    reader.readAsText(file);
  };

  /* ═══ Save template ═══ */
  const handleSaveTemplate = () => {
    const template = { subject, content, savedAt: new Date().toISOString() };
    localStorage.setItem("email_template", JSON.stringify(template));
    alert("Template gespeichert!");
  };

  /* ═══ Send emails (via Gmail API) ═══ */
  const handleSend = async () => {
    if (!user?.connected) {
      setError("Bitte melden Sie sich zuerst mit Google an.");
      return;
    }
    if (companies.length === 0) {
      setError("Keine Unternehmen gefunden.");
      return;
    }

    setSending(true);
    setError("");
    setResults(null);

    try {
      const formData = new FormData();

      const payload = {
        subject,
        content: useEditor ? content : content.replace(/\n/g, "<br>"),
        companies: companies.map(c => ({
          company_name: c.company_name || c.name || "",
          email: c.email || "",
          city: c.city || "",
          field: c.field || "",
          website: c.website || "",
          phone: c.phone || "",
          job_title: c.job_title || ""
        })),
        wait_time: parseInt(waitTime),
        skip_sent: skipCompany,
        sent_companies: sentEmails
      };

      formData.append("user_id", user.id);
      formData.append("payload", JSON.stringify(payload));

      if (cvFile) formData.append("cv_file", cvFile);
      if (motivationLetter) formData.append("motivation_letter", motivationLetter);
      additionalFiles.forEach((f) => formData.append("additional_files", f));

      const res = await fetch(`${API_BASE}/api/email/send-batch`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Send failed");

      setResults(data);

      // Save sent emails
      const newlySent = data.results.filter(r => r.status === "sent").map(r => r.email);
      const allSent = [...new Set([...sentEmails, ...newlySent])];
      localStorage.setItem(`sent_${extractionId}`, JSON.stringify(allSent));
      setSentEmails(allSent);

    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  /* ═══ Download status ═══ */
  const downloadStatus = () => {
    if (!results) return;
    const csv = [
      ["Email", "Company Name", "Status", "Message", "Timestamp"],
      ...results.results.map(r => [r.email, r.company_name, r.status, r.message, r.timestamp])
    ].map(row => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `status_${extractionId}_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  const handleAdditionalFile = (file) => {
    if (file) setAdditionalFiles(prev => [...prev, file]);
  };

  const removeAdditionalFile = (index) => {
    setAdditionalFiles(prev => prev.filter((_, i) => i !== index));
  };

  if (authLoading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center">
        <IconSpinner />
        <p className="text-gray-500 mt-2">Lade...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5 sm:space-y-6 pb-10">

      {/* ── Back button ── */}
      <button 
        onClick={() => navigate("/dashboard-client/my-applications")}
        className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"/></svg>
        Zurück zu Anwendungen
      </button>

      {/* ── Header ── */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">E-Mails senden</h2>
        <span className="text-sm text-gray-500">{companies.length} Unternehmen</span>
      </div>

      {/* ════════════════════════════════════════
          GOOGLE AUTH SECTION
          ════════════════════════════════════════ */}
      <div className={`rounded-2xl p-4 sm:p-5 border ${user?.connected ? "bg-green-50 border-green-200" : "bg-white border-gray-200"}`}>
        {!user?.connected ? (
          <div className="text-center space-y-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
              <IconGoogle />
            </div>
            <div>
              <p className="font-bold text-gray-900 text-sm">Mit Google anmelden</p>
              <p className="text-xs text-gray-500 mt-1">
                Verbinden Sie Ihr Gmail-Konto, um E-Mails direkt zu senden.
                <br/>Ihr Passwort wird <b>niemals</b> gespeichert.
              </p>
            </div>
            <button
              onClick={handleGoogleLogin}
              className="inline-flex items-center gap-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm"
            >
              <IconGoogle />
              Mit Google anmelden
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {user.picture ? (
                <img src={user.picture} alt="" className="w-10 h-10 rounded-full" />
              ) : (
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <IconCheck />
                </div>
              )}
              <div>
                <p className="text-sm font-bold text-gray-900">{user.name || user.email}</p>
                <p className="text-xs text-green-600 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Gmail verbunden
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-600 transition-colors px-3 py-1.5 rounded-lg hover:bg-red-50"
            >
              <IconLogout />
              Abmelden
            </button>
          </div>
        )}
      </div>

      {/* ── File upload row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DropZone label="Lebenslauf (CV)" sublabel="PDF empfohlen" file={cvFile} onFile={setCvFile} accept=".pdf,.doc,.docx" />
        <DropZone label="Anschreiben / Motivation" sublabel="PDF empfohlen" file={motivationLetter} onFile={setMotivationLetter} accept=".pdf,.doc,.docx" />
      </div>

      {/* ── Additional files ── */}
      <div>
        <DropZone label="Weitere Anhänge" sublabel="Zeugnisse, Zertifikate, etc." file={additionalFiles.length > 0 ? { name: `${additionalFiles.length} Datei(en)` } : null} onFile={handleAdditionalFile} />
        {additionalFiles.length > 0 && (
          <div className="mt-2 space-y-1">
            {additionalFiles.map((f, i) => (
              <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-1.5 text-xs">
                <span className="text-gray-700 truncate">{f.name}</span>
                <button onClick={() => removeAdditionalFile(i)} className="text-red-500 hover:text-red-700 ml-2">✕</button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Text editor toggle ── */}
      <div className="flex items-center gap-3">
        <Toggle checked={useEditor} onChange={setUseEditor} />
        <span className="text-sm text-gray-700 font-medium">HTML-Editor verwenden</span>
      </div>

      {/* ── Email subject ── */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-2">Betreff</label>
        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 text-sm text-gray-800 outline-none focus:ring-2 focus:ring-indigo-300 transition" />
      </div>

      {/* ── Email content ── */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-bold text-gray-900">E-Mail-Inhalt</label>
          <div className="flex gap-1">
            {["{{COMPANY_NAME}}", "{{CITY}}", "{{JOB_TITLE}}", "{{FIELD}}"].map(tag => (
              <button key={tag} onClick={() => { const el = document.getElementById("email-content"); if (el) { if (useEditor) { el.focus(); document.execCommand("insertText", false, tag); } else { const start = el.selectionStart; const end = el.selectionEnd; setContent(content.substring(0, start) + tag + content.substring(end)); } } }} className="text-xs bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded hover:bg-indigo-100 transition">{tag}</button>
            ))}
          </div>
        </div>
        {useEditor ? (
          <RichEditor value={content} onChange={setContent} />
        ) : (
          <div className="border border-gray-200 rounded-xl overflow-hidden">
            <div className="flex gap-1 px-3 py-2 border-b border-gray-200 bg-gray-50 overflow-x-auto">
              {["B", "I", "U"].map((t) => (
                <button key={t} className="w-8 h-8 rounded flex items-center justify-center text-sm font-semibold text-gray-700 hover:bg-gray-200 transition-colors flex-shrink-0">{t}</button>
              ))}
            </div>
            <textarea id="email-content" value={content} onChange={(e) => setContent(e.target.value)} rows={8} className="w-full px-3 sm:px-4 py-3 text-sm text-gray-800 outline-none leading-relaxed resize-none" />
          </div>
        )}
        <p className="text-xs text-gray-400 mt-1">Platzhalter werden automatisch ersetzt.</p>
      </div>

      {/* ── Save Template ── */}
      <div className="flex gap-2">
        <button onClick={handleSaveTemplate} className="border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors">Template speichern</button>
      </div>

      {/* ── Status upload ── */}
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Toggle checked={skipCompany} onChange={setSkipCompany} />
          <span className="text-sm font-bold text-gray-900">Bereits gesendete überspringen</span>
        </div>
        <p className="text-xs text-gray-500 mb-3">Laden Sie eine Status-Datei hoch, um Unternehmen zu überspringen, die bereits eine E-Mail erhalten haben.</p>
        <DropZone label="Status-Datei" sublabel="CSV/Excel mit gesendeten E-Mails" file={statusFile} onFile={(f) => { setStatusFile(f); parseStatusFile(f); }} accept=".csv,.xlsx,.xls" />
        {sentEmails.length > 0 && (
          <p className="text-xs text-green-600 mt-2 flex items-center gap-1"><IconCheck /> {sentEmails.length} E-Mail(s) werden übersprungen</p>
        )}
      </div>

      {/* ── Bottom fields row ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-1">Wartezeit zwischen E-Mails</label>
          <p className="text-xs text-gray-400 mb-2">Vermeidet Spam-Filter. Standard: 30-120 Sekunden.</p>
          <div className="relative">
            <select value={waitTime} onChange={(e) => setWaitTime(e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-gray-700 outline-none appearance-none bg-white focus:ring-2 focus:ring-indigo-300 cursor-pointer">
              {["10", "30", "60", "90", "120"].map((v) => <option key={v} value={v}>{v} Sek.</option>)}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 flex flex-col gap-0.5">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 5l4-4 4 4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none"><path d="M1 1l4 4 4-4" stroke="#9CA3AF" strokeWidth="1.5" strokeLinecap="round"/></svg>
            </div>
          </div>
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-900 mb-2">Vorschau</label>
          <div className="border border-gray-200 rounded-xl p-3 bg-gray-50 text-xs text-gray-600 space-y-1">
            <p><b>Von:</b> {user?.email || "Nicht verbunden"}</p>
            <p><b>An:</b> {companies[0]?.company_name || "Firma"} &lt;{companies[0]?.email || "email@beispiel.de"}&gt;</p>
            <p><b>Betreff:</b> {subject}</p>
          </div>
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <IconAlert />
          <div><p className="text-sm font-bold text-red-700">Fehler</p><p className="text-xs text-red-600">{error}</p></div>
        </div>
      )}

      {/* ── Results ── */}
      {results && (
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Ergebnisse</h3>
            <div className="flex gap-2">
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{results.sent} gesendet</span>
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">{results.skipped} übersprungen</span>
              <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">{results.failed} fehlgeschlagen</span>
            </div>
          </div>
          <div className="max-h-64 overflow-y-auto space-y-1">
            {results.results.map((r, i) => (
              <div key={i} className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs ${r.status === "sent" ? "bg-green-50" : r.status === "skipped" ? "bg-yellow-50" : "bg-red-50"}`}>
                <div className="flex items-center gap-2 min-w-0">
                  <span className={`w-2 h-2 rounded-full flex-shrink-0 ${r.status === "sent" ? "bg-green-500" : r.status === "skipped" ? "bg-yellow-500" : "bg-red-500"}`} />
                  <span className="truncate text-gray-700">{r.company_name}</span>
                </div>
                <span className={`flex-shrink-0 font-medium ${r.status === "sent" ? "text-green-700" : r.status === "skipped" ? "text-yellow-700" : "text-red-700"}`}>
                  {r.status === "sent" ? "Gesendet" : r.status === "skipped" ? "Übersprungen" : "Fehler"}
                </span>
              </div>
            ))}
          </div>
          <button onClick={downloadStatus} className="mt-3 w-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 text-sm font-semibold px-4 py-2 rounded-xl transition-colors">Status-Datei herunterladen</button>
        </div>
      )}

      {/* ── Send button ── */}
      <div className="pb-4">
        <button
          onClick={handleSend}
          disabled={sending || companies.length === 0 || !user?.connected}
          className="w-full sm:w-auto bg-indigo-700 hover:bg-indigo-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl transition-colors"
        >
          {sending ? (
            <span className="flex items-center justify-center gap-2"><IconSpinner /> Sende E-Mails... ({results?.results?.length || 0}/{companies.length})</span>
          ) : !user?.connected ? (
            "Mit Google anmelden zum Senden"
          ) : (
            `E-Mails senden (${companies.length})`
          )}
        </button>
      </div>
    </div>
  );
}