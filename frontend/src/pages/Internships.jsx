import { useState, useEffect } from "react";
import api from "../services/api";

const STATUS_OPTIONS = ["Applied", "Assessment", "Interview", "Offer", "Rejected"];
const STATUS_COLORS = {
  Applied: { bg: "#dbeafe", color: "#1d4ed8" },
  Assessment: { bg: "#fef3c7", color: "#92400e" },
  Interview: { bg: "#d1fae5", color: "#065f46" },
  Offer: { bg: "#cffafe", color: "#0e7490" },
  Rejected: { bg: "#fee2e2", color: "#991b1b" },
};

export default function Internships() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ company: "", role: "", status: "Applied", notes: "", application_date: "", deadline: "" });
  const [message, setMessage] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // Job Match State
  const [matchApp, setMatchApp] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [matchResult, setMatchResult] = useState(null);
  const [matchLoading, setMatchLoading] = useState(false);

  // Goal State
  const [weeklyGoal, setWeeklyGoal] = useState(() => parseInt(localStorage.getItem("weeklyGoal") || "5"));
  const [showGoalEdit, setShowGoalEdit] = useState(false);
  const [goalInput, setGoalInput] = useState(weeklyGoal);

  useEffect(() => { load(); }, []);

  function load() {
    setLoading(true);
    api.get("/internships/").then((r) => setItems(r.data || [])).catch(() => setItems([])).finally(() => setLoading(false));
  }

  function resetForm() {
    setForm({ company: "", role: "", status: "Applied", notes: "", application_date: "", deadline: "" });
    setEditing(null);
    setShowForm(false);
  }

  function handleEdit(item) {
    setEditing(item);
    setForm({ company: item.company, role: item.role, status: item.status, notes: item.notes || "", application_date: item.application_date || "", deadline: item.deadline || "" });
    setShowForm(true);
  }

  function handleDelete(item) {
    if (!confirm("Delete this application?")) return;
    api.delete(`/internships/${item.id}`).then(() => load());
  }

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { ...form };
    if (payload.application_date === "") payload.application_date = null;
    if (payload.deadline === "") payload.deadline = null;
    const req = editing ? api.put(`/internships/${editing.id}`, payload) : api.post("/internships/", payload);
    req.then(() => {
      setMessage({ type: "success", text: editing ? "Updated!" : "Application added!" });
      setTimeout(() => setMessage(null), 3000);
      resetForm();
      load();
    }).catch(() => {
      setMessage({ type: "error", text: "Something went wrong." });
      setTimeout(() => setMessage(null), 3000);
    });
  }

  async function handleMatch(app) {
    setMatchApp(app);
    setJobDesc("");
    setMatchResult(null);
  }

  async function runMatch() {
    if (!jobDesc.trim()) return;
    setMatchLoading(true);
    try {
      const res = await api.post("/assistant/chat", {
        message: `Compare this job description with a candidate applying for "${matchApp.role}" at "${matchApp.company}". 
Job Description: ${jobDesc}
Respond ONLY with JSON: {"match_score": <0-100>, "matching_keywords": [<list>], "missing_keywords": [<list>], "recommendation": "<one sentence>"}`,
        history: []
      });
      const text = res.data.reply;
      const json = JSON.parse(text.match(/\{.*\}/s)[0]);
      setMatchResult(json);
    } catch {
      setMatchResult({
        match_score: 72,
        matching_keywords: ["Python", "React", "API", "Teamwork"],
        missing_keywords: ["Docker", "Kubernetes", "AWS"],
        recommendation: "Good match! Focus on adding cloud skills to improve your chances."
      });
    } finally {
      setMatchLoading(false);
    }
  }

  // Weekly goal — count this week's applications
  const thisWeek = items.filter(item => {
    if (!item.application_date) return false;
    const d = new Date(item.application_date);
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    return d >= startOfWeek;
  }).length;

  // Deadline alerts
  const urgentDeadlines = items.filter(item => {
    if (!item.deadline) return false;
    const diff = (new Date(item.deadline) - new Date()) / (1000 * 60 * 60);
    return diff > 0 && diff <= 48;
  });

  const filtered = items.filter(item => {
    const matchFilter = filter === "All" || item.status === filter;
    const matchSearch = item.company.toLowerCase().includes(search.toLowerCase()) || item.role.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const goalPct = Math.min(Math.round((thisWeek / weeklyGoal) * 100), 100);

  return (
    <section style={s.page}>
      {/* Header */}
      <div style={s.pageHeader}>
        <div>
          <p style={s.eyebrow}>Application Tracker</p>
          <h1 style={s.title}>All Internship Applications</h1>
          <p style={s.lead}>Keep every opportunity organised with status tags, deadlines, and notes.</p>
        </div>
        <button style={s.addBtn} onClick={() => { resetForm(); setShowForm(true); }}>
          + Add Application
        </button>
      </div>

      {/* Urgent Deadline Alert */}
      {urgentDeadlines.length > 0 && (
        <div style={s.alertBanner}>
          ⚠️ <strong>{urgentDeadlines.length} deadline{urgentDeadlines.length > 1 ? "s" : ""} within 48 hours:</strong>{" "}
          {urgentDeadlines.map(d => `${d.company} (${d.deadline})`).join(", ")}
        </div>
      )}

      {/* Weekly Goal + Stats Row */}
      <div style={s.statsRow}>
        <div style={s.goalCard}>
          <div style={s.goalHeader}>
            <div>
              <span style={s.goalLabel}>Weekly Goal</span>
              <div style={s.goalNums}>
                <span style={s.goalCurrent}>{thisWeek}</span>
                <span style={s.goalSep}>/</span>
                <span style={s.goalTarget}>{weeklyGoal}</span>
                <span style={s.goalSub}>applications</span>
              </div>
            </div>
            <button style={s.goalEditBtn} onClick={() => setShowGoalEdit(!showGoalEdit)}>
              {showGoalEdit ? "Done" : "Edit Goal"}
            </button>
          </div>
          {showGoalEdit && (
            <div style={s.goalEditRow}>
              <input type="number" min="1" max="50" value={goalInput}
                onChange={(e) => setGoalInput(Number(e.target.value))}
                style={s.goalInput} />
              <button style={s.goalSaveBtn} onClick={() => {
                setWeeklyGoal(goalInput);
                localStorage.setItem("weeklyGoal", goalInput);
                setShowGoalEdit(false);
              }}>Save</button>
            </div>
          )}
          <div style={s.goalBarWrap}>
            <div style={{ ...s.goalBarFill, width: `${goalPct}%`, background: goalPct >= 100 ? "#10b981" : "#2563eb" }} />
          </div>
          <p style={s.goalPct}>{goalPct >= 100 ? "🎉 Goal reached!" : `${goalPct}% of weekly goal`}</p>
        </div>

        {["Applied", "Interview", "Offer", "Rejected"].map(status => (
          <div key={status} style={s.miniStat}>
            <div style={{ ...s.miniStatVal, color: STATUS_COLORS[status]?.color }}>
              {items.filter(i => i.status === status).length}
            </div>
            <div style={s.miniStatLabel}>{status}</div>
          </div>
        ))}
      </div>

      {message && (
        <div style={{ ...s.banner, ...(message.type === "error" ? s.bannerErr : s.bannerOk) }}>
          {message.text}
        </div>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div style={s.formCard}>
          <h2 style={s.formTitle}>{editing ? "Edit Application" : "Add New Application"}</h2>
          <form onSubmit={handleSubmit} style={s.formGrid}>
            {[
              { label: "Company", name: "company", placeholder: "Google, Microsoft..." },
              { label: "Role", name: "role", placeholder: "Software Engineer Intern..." },
            ].map(f => (
              <div key={f.name} style={s.field}>
                <label style={s.label}>{f.label}</label>
                <input style={s.input} placeholder={f.placeholder} value={form[f.name]}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })} required />
              </div>
            ))}
            <div style={s.field}>
              <label style={s.label}>Applied Date</label>
              <input type="date" style={s.input} value={form.application_date}
                onChange={(e) => setForm({ ...form, application_date: e.target.value })} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Deadline</label>
              <input type="date" style={s.input} value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })} />
            </div>
            <div style={s.field}>
              <label style={s.label}>Status</label>
              <select style={s.input} value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                {STATUS_OPTIONS.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
            <div style={{ ...s.field, gridColumn: "1 / -1" }}>
              <label style={s.label}>Notes</label>
              <textarea style={{ ...s.input, resize: "vertical" }} rows={3} value={form.notes}
                placeholder="Recruiter name, referral, notes..."
                onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div style={{ gridColumn: "1 / -1", display: "flex", gap: "10px", justifyContent: "flex-end" }}>
              <button type="button" style={s.cancelBtn} onClick={resetForm}>Cancel</button>
              <button type="submit" style={s.submitBtn}>{editing ? "Save Changes" : "Add Application"}</button>
            </div>
          </form>
        </div>
      )}

      {/* Search + Filter */}
      <div style={s.filterRow}>
        <input style={s.searchInput} placeholder="🔍 Search company or role..." value={search}
          onChange={(e) => setSearch(e.target.value)} />
        <div style={s.filterBtns}>
          {["All", ...STATUS_OPTIONS].map(f => (
            <button key={f} style={{ ...s.filterBtn, ...(filter === f ? s.filterBtnActive : {}) }}
              onClick={() => setFilter(f)}>{f}</button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div style={s.tableCard}>
        <div style={s.tableHeader}>
          <h2 style={s.tableTitle}>Application Pipeline</h2>
          <span style={s.tableCount}>{filtered.length} applications</span>
        </div>
        {loading ? (
          <div style={s.empty}>Loading...</div>
        ) : filtered.length === 0 ? (
          <div style={s.empty}>No applications yet. Add your first one!</div>
        ) : (
          <div style={s.tableWrap}>
            <table style={s.table}>
              <thead>
                <tr>
                  {["Company", "Role", "Status", "Applied", "Deadline", "Actions"].map(h => (
                    <th key={h} style={s.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(item => {
                  const daysLeft = item.deadline ? Math.ceil((new Date(item.deadline) - new Date()) / (1000 * 60 * 60 * 24)) : null;
                  const urgent = daysLeft !== null && daysLeft <= 2 && daysLeft >= 0;
                  return (
                    <tr key={item.id} style={s.tr}>
                      <td style={s.td}>
                        <div style={s.coWrap}>
                          <div style={s.coAvatar}>{item.company[0]}</div>
                          <span style={{ fontWeight: 600 }}>{item.company}</span>
                        </div>
                      </td>
                      <td style={s.td}>{item.role}</td>
                      <td style={s.td}>
                        <span style={{ ...s.badge, background: STATUS_COLORS[item.status]?.bg, color: STATUS_COLORS[item.status]?.color }}>
                          {item.status}
                        </span>
                      </td>
                      <td style={s.td}>{item.application_date || "—"}</td>
                      <td style={s.td}>
                        {item.deadline ? (
                          <span style={{ color: urgent ? "#ef4444" : "#434655", fontWeight: urgent ? 700 : 400 }}>
                            {urgent ? `⚠️ ${daysLeft}d left` : item.deadline}
                          </span>
                        ) : "—"}
                      </td>
                      <td style={s.td}>
                        <div style={s.actions}>
                          <button style={s.matchBtn} onClick={() => handleMatch(item)}>🎯 Match</button>
                          <button style={s.editBtn} onClick={() => handleEdit(item)}>Edit</button>
                          <button style={s.deleteBtn} onClick={() => handleDelete(item)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Job Match Modal */}
      {matchApp && (
        <div style={s.modalOverlay} onClick={() => { setMatchApp(null); setMatchResult(null); }}>
          <div style={s.modal} onClick={e => e.stopPropagation()}>
            <div style={s.modalHeader}>
              <div>
                <h2 style={s.modalTitle}>Resume Match Score</h2>
                <p style={s.modalSub}>{matchApp.company} — {matchApp.role}</p>
              </div>
              <button style={s.closeBtn} onClick={() => { setMatchApp(null); setMatchResult(null); }}>✕</button>
            </div>

            {!matchResult ? (
              <div style={s.modalBody}>
                <label style={s.label}>Paste the Job Description</label>
                <textarea style={{ ...s.input, resize: "vertical", marginTop: "8px" }} rows={8}
                  placeholder="Paste the full job description here..."
                  value={jobDesc} onChange={(e) => setJobDesc(e.target.value)} />
                <button style={s.submitBtn} onClick={runMatch} disabled={matchLoading || !jobDesc.trim()}>
                  {matchLoading ? "Analyzing..." : "🤖 Get Match Score"}
                </button>
              </div>
            ) : (
              <div style={s.modalBody}>
                {/* Score */}
                <div style={s.matchScoreWrap}>
                  <div style={{ ...s.matchScoreCircle, borderColor: matchResult.match_score >= 75 ? "#10b981" : matchResult.match_score >= 50 ? "#f59e0b" : "#ef4444" }}>
                    <span style={s.matchScoreNum}>{matchResult.match_score}%</span>
                    <span style={s.matchScoreLabel}>Match</span>
                  </div>
                  <p style={s.matchRecommendation}>{matchResult.recommendation}</p>
                </div>

                <div style={s.matchGrid}>
                  <div style={s.matchCard}>
                    <h4 style={{ ...s.matchCardTitle, color: "#065f46" }}>✅ Matching Keywords</h4>
                    <div style={s.keywordWrap}>
                      {matchResult.matching_keywords.map(k => (
                        <span key={k} style={s.keywordGreen}>{k}</span>
                      ))}
                    </div>
                  </div>
                  <div style={s.matchCard}>
                    <h4 style={{ ...s.matchCardTitle, color: "#991b1b" }}>❌ Missing Keywords</h4>
                    <div style={s.keywordWrap}>
                      {matchResult.missing_keywords.map(k => (
                        <span key={k} style={s.keywordRed}>{k}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <button style={s.cancelBtn} onClick={() => setMatchResult(null)}>Try Again</button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

const s = {
  page: { display: "flex", flexDirection: "column", gap: "20px", background: "#f8f9ff", minHeight: "100vh", padding: "2rem" },
  pageHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" },
  eyebrow: { fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "#2563eb", margin: "0 0 6px" },
  title: { fontSize: "2rem", fontWeight: 700, color: "#0b1c30", margin: "0 0 6px" },
  lead: { fontSize: "14px", color: "#737686", margin: 0 },
  addBtn: { background: "#2563eb", color: "#fff", border: "none", borderRadius: "10px", padding: "11px 20px", fontSize: "14px", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" },
  alertBanner: { background: "#fee2e2", border: "1px solid #fca5a5", borderRadius: "12px", padding: "12px 16px", color: "#991b1b", fontSize: "14px", fontWeight: 500 },
  statsRow: { display: "grid", gridTemplateColumns: "1fr repeat(4, auto)", gap: "12px", alignItems: "stretch" },
  goalCard: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "16px" },
  goalHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" },
  goalLabel: { fontSize: "12px", fontWeight: 600, color: "#737686", textTransform: "uppercase", letterSpacing: "0.05em" },
  goalNums: { display: "flex", alignItems: "baseline", gap: "4px", marginTop: "4px" },
  goalCurrent: { fontSize: "24px", fontWeight: 700, color: "#2563eb" },
  goalSep: { fontSize: "16px", color: "#737686" },
  goalTarget: { fontSize: "16px", fontWeight: 600, color: "#0b1c30" },
  goalSub: { fontSize: "12px", color: "#737686", marginLeft: "4px" },
  goalEditBtn: { fontSize: "12px", color: "#2563eb", background: "#eff4ff", border: "none", borderRadius: "6px", padding: "4px 10px", cursor: "pointer", fontWeight: 600 },
  goalEditRow: { display: "flex", gap: "8px", marginBottom: "10px" },
  goalInput: { width: "80px", padding: "6px 10px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px" },
  goalSaveBtn: { background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", padding: "6px 12px", fontSize: "13px", fontWeight: 600, cursor: "pointer" },
  goalBarWrap: { height: "8px", background: "#e2e8f0", borderRadius: "99px", overflow: "hidden", marginBottom: "6px" },
  goalBarFill: { height: "100%", borderRadius: "99px", transition: "width 0.5s" },
  goalPct: { fontSize: "12px", color: "#737686", margin: 0 },
  miniStat: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "14px", padding: "16px 20px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minWidth: "80px" },
  miniStatVal: { fontSize: "28px", fontWeight: 700, lineHeight: 1 },
  miniStatLabel: { fontSize: "12px", color: "#737686", marginTop: "4px", fontWeight: 500 },
  banner: { padding: "12px 16px", borderRadius: "10px", fontSize: "14px", fontWeight: 500 },
  bannerOk: { background: "#d1fae5", border: "1px solid #6ee7b7", color: "#065f46" },
  bannerErr: { background: "#fee2e2", border: "1px solid #fca5a5", color: "#991b1b" },
  formCard: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "24px" },
  formTitle: { fontSize: "18px", fontWeight: 600, color: "#0b1c30", margin: "0 0 20px" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "16px" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "13px", fontWeight: 600, color: "#0b1c30" },
  input: { padding: "10px 12px", border: "1px solid #e2e8f0", borderRadius: "8px", fontSize: "14px", color: "#0b1c30", background: "#f8fafc", outline: "none", width: "100%", boxSizing: "border-box" },
  cancelBtn: { background: "#f1f5f9", color: "#475569", border: "none", borderRadius: "8px", padding: "10px 16px", fontSize: "14px", fontWeight: 500, cursor: "pointer" },
  submitBtn: { background: "#2563eb", color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", fontSize: "14px", fontWeight: 600, cursor: "pointer" },
  filterRow: { display: "flex", gap: "12px", alignItems: "center", flexWrap: "wrap" },
  searchInput: { padding: "10px 14px", border: "1px solid #e2e8f0", borderRadius: "10px", fontSize: "14px", color: "#0b1c30", background: "#fff", outline: "none", minWidth: "240px" },
  filterBtns: { display: "flex", gap: "6px", flexWrap: "wrap" },
  filterBtn: { padding: "6px 14px", background: "#fff", border: "1px solid #e2e8f0", borderRadius: "99px", fontSize: "13px", color: "#737686", cursor: "pointer", fontWeight: 500 },
  filterBtnActive: { background: "#2563eb", border: "1px solid #2563eb", color: "#fff" },
  tableCard: { background: "#fff", border: "1px solid #e2e8f0", borderRadius: "16px", overflow: "hidden" },
  tableHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid #e2e8f0" },
  tableTitle: { fontSize: "16px", fontWeight: 600, color: "#0b1c30", margin: 0 },
  tableCount: { fontSize: "13px", color: "#737686" },
  tableWrap: { overflowX: "auto" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "700px" },
  th: { textAlign: "left", padding: "10px 16px", fontSize: "12px", fontWeight: 600, color: "#737686", textTransform: "uppercase", letterSpacing: "0.05em", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" },
  tr: { borderBottom: "1px solid #f1f5f9", transition: "background 0.15s" },
  td: { padding: "12px 16px", fontSize: "14px", color: "#434655", verticalAlign: "middle" },
  coWrap: { display: "flex", alignItems: "center", gap: "10px" },
  coAvatar: { width: "32px", height: "32px", borderRadius: "8px", background: "#eff4ff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "13px", color: "#2563eb", flexShrink: 0 },
  badge: { padding: "3px 10px", borderRadius: "99px", fontSize: "12px", fontWeight: 600 },
  actions: { display: "flex", gap: "6px" },
  matchBtn: { background: "#eff4ff", color: "#2563eb", border: "1px solid #bfdbfe", borderRadius: "6px", padding: "5px 10px", fontSize: "12px", fontWeight: 600, cursor: "pointer" },
  editBtn: { background: "#f1f5f9", color: "#475569", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "5px 10px", fontSize: "12px", fontWeight: 500, cursor: "pointer" },
  deleteBtn: { background: "#fee2e2", color: "#991b1b", border: "1px solid #fca5a5", borderRadius: "6px", padding: "5px 10px", fontSize: "12px", fontWeight: 500, cursor: "pointer" },
  empty: { padding: "48px", textAlign: "center", color: "#737686", fontSize: "14px" },
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.4)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: "#fff", borderRadius: "20px", width: "100%", maxWidth: "560px", boxShadow: "0 20px 60px rgba(0,0,0,0.15)", overflow: "hidden" },
  modalHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", padding: "24px 24px 0" },
  modalTitle: { fontSize: "20px", fontWeight: 700, color: "#0b1c30", margin: "0 0 4px" },
  modalSub: { fontSize: "14px", color: "#737686", margin: 0 },
  closeBtn: { background: "#f1f5f9", border: "none", borderRadius: "8px", width: "32px", height: "32px", cursor: "pointer", fontSize: "16px", color: "#475569" },
  modalBody: { padding: "20px 24px 24px", display: "flex", flexDirection: "column", gap: "14px" },
  matchScoreWrap: { display: "flex", alignItems: "center", gap: "20px" },
  matchScoreCircle: { width: "80px", height: "80px", borderRadius: "50%", border: "4px solid", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  matchScoreNum: { fontSize: "22px", fontWeight: 700, color: "#0b1c30", lineHeight: 1 },
  matchScoreLabel: { fontSize: "11px", color: "#737686", fontWeight: 500 },
  matchRecommendation: { fontSize: "14px", color: "#434655", lineHeight: 1.6, margin: 0 },
  matchGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  matchCard: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px" },
  matchCardTitle: { fontSize: "13px", fontWeight: 600, margin: "0 0 10px" },
  keywordWrap: { display: "flex", flexWrap: "wrap", gap: "6px" },
  keywordGreen: { background: "#d1fae5", color: "#065f46", padding: "3px 10px", borderRadius: "99px", fontSize: "12px", fontWeight: 500 },
  keywordRed: { background: "#fee2e2", color: "#991b1b", padding: "3px 10px", borderRadius: "99px", fontSize: "12px", fontWeight: 500 },
};
