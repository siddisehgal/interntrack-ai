import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const STATUS_COLORS = {
  Applied: "#2563eb",
  Assessment: "#f59e0b",
  Interviewing: "#7c3aed",
  Offer: "#16a34a",
  Rejected: "#ef4444",
};

export default function Dashboard() {
  const [internships, setInternships] = useState([]);
  const [user, setUser] = useState(null);
  const weeklyGoal = 5;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) { navigate("/login"); return; }

    api.get("/auth/me").then(r => setUser(r.data)).catch(() => {});

    api.get("/internships/").then(r => {
      setInternships(Array.isArray(r.data) ? r.data : []);
    }).catch(() => {});
  }, [navigate]);

  const total = internships.length;
  const interviews = internships.filter(i => i.status === "Interviewing").length;
  const offers = internships.filter(i => i.status === "Offer").length;
  const rejections = internships.filter(i => i.status === "Rejected").length;

  const statusCounts = Object.entries(
    internships.reduce((acc, i) => { acc[i.status] = (acc[i.status] || 0) + 1; return acc; }, {})
  ).map(([name, value]) => ({ name, value }));

  const now = Date.now();
  const upcoming = internships
    .filter(i => i.deadline && new Date(i.deadline).getTime() > now)
    .sort((a, b) => new Date(a.deadline) - new Date(b.deadline))
    .slice(0, 4);

  const weekStart = new Date();
  weekStart.setDate(weekStart.getDate() - weekStart.getDay());
  const appliedThisWeek = internships.filter(
    i => i.created_at && new Date(i.created_at) >= weekStart
  ).length;
  const goalPct = Math.min((appliedThisWeek / weeklyGoal) * 100, 100);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  return (
    <div className="page-shell">

      {/* Hero */}
      <div className="dashboard-hero">
        <div>
          <p className="eyebrow">Dashboard</p>
          <h1 style={{ fontSize: "1.8rem" }}>
            {greeting}, {user?.name?.split(" ")[0] ?? "there"}! 👋
          </h1>
          <p className="lead">Track your applications, interviews and offers all in one place.</p>
        </div>
        <button className="btn btn-primary" onClick={() => navigate("/internships/new")}>
          + Add Application
        </button>
      </div>

      {/* Stat cards */}
      <div className="stats-grid">
        {[
          { icon: "📋", label: "Total Apps", value: total, color: "#2563eb" },
          { icon: "🎯", label: "Interviews", value: interviews, color: "#7c3aed" },
          { icon: "🎉", label: "Offers", value: offers, color: "#16a34a" },
          { icon: "❌", label: "Rejections", value: rejections, color: "#ef4444" },
        ].map(s => (
          <div className="stat-card" key={s.label}>
            <span className="stat-card__icon">{s.icon}</span>
            <div className="stat-card__value" style={{ color: s.color }}>{s.value}</div>
            <span className="stat-card__label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>

        {/* Pipeline donut */}
        <div className="card">
          <h2 style={{ fontSize: "15px", marginBottom: "16px" }}>Pipeline Status</h2>
          {statusCounts.length === 0 ? (
            <p className="empty-state">No applications yet</p>
          ) : (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={statusCounts} cx="50%" cy="50%" innerRadius={55} outerRadius={80} dataKey="value">
                  {statusCounts.map(entry => (
                    <Cell key={entry.name} fill={STATUS_COLORS[entry.name] ?? "#94a3b8"} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginTop: "12px" }}>
            {statusCounts.map(s => (
              <span key={s.name} style={{ display: "flex", alignItems: "center", gap: "5px", fontSize: "12px", color: "#737686" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: STATUS_COLORS[s.name] ?? "#94a3b8", display: "inline-block" }} />
                {s.name} ({s.value})
              </span>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Upcoming deadlines */}
          <div className="card">
            <h2 style={{ fontSize: "15px", marginBottom: "12px" }}>Upcoming Deadlines</h2>
            {upcoming.length === 0 ? (
              <p style={{ fontSize: "13px", color: "#9ca3af" }}>No upcoming deadlines 🎉</p>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {upcoming.map(i => {
                  const daysLeft = Math.ceil((new Date(i.deadline) - now) / (1000 * 60 * 60 * 24));
                  const urgent = daysLeft <= 2;
                  return (
                    <div key={i.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", background: urgent ? "#fef2f2" : "#f8faff", borderRadius: "10px", border: `1px solid ${urgent ? "#fecaca" : "#dbeafe"}` }}>
                      <div>
                        <p style={{ margin: 0, fontWeight: 600, fontSize: "13px", color: "#0b1c30" }}>{i.company}</p>
                        <p style={{ margin: 0, fontSize: "11px", color: "#737686" }}>{i.role}</p>
                      </div>
                      <span style={{ fontSize: "11px", fontWeight: 700, color: urgent ? "#ef4444" : "#2563eb" }}>
                        {daysLeft}d left
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
            <button className="btn btn-secondary" style={{ width: "100%", marginTop: "12px", fontSize: "13px" }} onClick={() => navigate("/internships/new")}>
              + Add Application
            </button>
          </div>

          {/* Weekly goal */}
          <div className="card">
            <h2 style={{ fontSize: "15px", marginBottom: "6px" }}>🎯 Weekly Goal</h2>
            <p style={{ fontSize: "12px", color: "#737686", marginBottom: "12px" }}>
              {appliedThisWeek} of {weeklyGoal} applications this week
            </p>
            <div style={{ background: "#f1f5f9", borderRadius: "999px", height: "8px", overflow: "hidden" }}>
              <div style={{ width: `${goalPct}%`, height: "100%", background: goalPct >= 100 ? "#16a34a" : "#2563eb", borderRadius: "999px", transition: "width 0.5s ease" }} />
            </div>
            <p style={{ marginTop: "8px", fontSize: "12px", color: goalPct >= 100 ? "#16a34a" : "#2563eb", fontWeight: 600 }}>
              {goalPct >= 100 ? "Goal reached! 🎉" : `${Math.round(goalPct)}% there`}
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}