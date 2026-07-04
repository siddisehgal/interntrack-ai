import { useState } from "react";

const INITIAL_SKILLS = [
  { name: "React", type: "frontend", color: "#eff6ff", text: "#1e40af" },
  { name: "JavaScript", type: "frontend", color: "#eff6ff", text: "#1e40af" },
  { name: "Node.js", type: "backend", color: "#f0fdf4", text: "#166534" },
  { name: "REST APIs", type: "backend", color: "#f0fdf4", text: "#166534" },
  { name: "Git & GitHub", type: "tools", color: "#f8fafc", text: "#475569" },
];

const MATCHING_ROLES = [
  { company: "Stripe", role: "Frontend Intern", match: 92, location: "Remote" },
  { company: "Notion", role: "Product Engineer", match: 84, location: "San Francisco, CA" },
  { company: "Vercel", role: "Solutions Intern", match: 78, location: "New York, NY" }
];

export default function Resume() {
  const [hasAppliedFixes, setHasAppliedFixes] = useState(false);
  const [skills, setSkills] = useState(INITIAL_SKILLS);
  const [score, setScore] = useState(75);

  // Simulates real-time AI optimization when the user clicks "Apply All"
  const handleApplyAllFixes = () => {
    if (hasAppliedFixes) return;
    
    setHasAppliedFixes(true);
    setScore(94); // Boost the donut chart metric
    
    // Inject the missing target keywords into the skills array dynamically
    setSkills([
      ...skills,
      { name: "Docker", type: "backend", color: "#f0fdf4", text: "#166534" },
      { name: "AWS", type: "cloud", color: "#fff7ed", text: "#c2410c" },
      { name: "Tailwind CSS", type: "frontend", color: "#eff6ff", text: "#1e40af" }
    ]);
  };

  return (
    <div style={styles.workspaceContainer}>
      {/* Page Header */}
      <div style={styles.dashboardHeader}>
        <div>
          <h1 style={styles.pageTitle}>AI Resume Analyzer</h1>
          <p style={styles.pageSubtitle}>Optimize your resume metrics against production applicant tracking systems.</p>
        </div>
      </div>

      {/* --- TWO-COLUMN MASTER CONTENT LAYOUT --- */}
      <div style={styles.mainContentGrid}>
        
        {/* LEFT COLUMN: FILE VIEWER FRAMEWORK */}
        <div style={styles.leftViewerPanel}>
          <div style={styles.documentCard}>
            <div style={styles.docHeader}>
              <span style={{ fontSize: "18px" }}>📄</span>
              <strong style={{ fontSize: "14px", color: "#0f172a" }}>resume_v2_2026_software.pdf</strong>
              <span style={styles.savedStatusBadge}>Last analyzed today</span>
            </div>
            
            {/* Simulated Resume Body Context */}
            <div style={styles.mockResumePreview}>
              <h2 style={{ fontSize: "18px", margin: "0 0 4px 0", textAlign: "center" }}>Alex Rivera</h2>
              <p style={{ fontSize: "11px", color: "#64748b", textAlign: "center", margin: "0 0 16px 0" }}>alex@interntrack.ai | github.com/alexrivera | linkedin.com/in/alex</p>
              
              <div style={styles.resumeDivider}>EDUCATION</div>
              <p style={styles.resumeBodyText}><strong>B.S. Computer Science</strong> — University of Tech <span style={{ float: "right" }}>Expected May 2027</span></p>
              
              <div style={styles.resumeDivider}>EXPERIENCE</div>
              <p style={styles.resumeBodyText}><strong>Software Engineer Intern</strong> — Web Solutions <span style={{ float: "right" }}>Summer 2025</span></p>
              <ul style={styles.resumeBulletList}>
                <li>Built responsive user interface panels using <strong>React</strong> and <strong>JavaScript</strong>.</li>
                <li>Designed high-throughput communication pipelines with <strong>Node.js</strong> and managed asset parsing configurations using <strong>Git & GitHub</strong> protocols.</li>
                {hasAppliedFixes && (
                  <li style={{ color: "#2563eb", fontWeight: 600 }}>✨ Containerized deployment workflows using Docker environments and configured remote cloud pipelines via AWS cloud hosting infrastructure hooks.</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME ANALYTICS RADAR PANEL */}
        <div style={styles.rightAnalyticsPanel}>
          
          {/* 1. GAP ANALYSIS WITH DONUT CHART GAUGE */}
          <div style={styles.analyticsSectionCard}>
            <h3 style={styles.sectionCardTitle}>Gap Analysis Score</h3>
            <div style={styles.donutContainer}>
              {/* Dynamic SVG Circle Donut Meter */}
              <svg width="120" height="120" viewBox="0 0 36 36" style={styles.donutSvg}>
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#e2e8f0" strokeWidth="3" />
                <circle 
                  cx="18" cy="18" r="15.915" fill="none" 
                  stroke={score > 80 ? "#16a34a" : "#ea580c"} 
                  strokeWidth="3" 
                  strokeDasharray={`${score} ${100 - score}`} 
                  strokeDashoffset="25"
                  style={{ transition: "stroke-dasharray 0.5s ease" }}
                />
              </svg>
              <div style={styles.donutTextCenter}>
                <span style={styles.donutScoreNum}>{score}</span>
                <span style={styles.donutScoreLabel}>OPTIMIZED</span>
              </div>
            </div>
          </div>

          {/* 2. SKILLS IDENTIFIED BADGE PANEL */}
          <div style={styles.analyticsSectionCard}>
            <h3 style={styles.sectionCardTitle}>Skills Parsed & Identified</h3>
            <p style={{ fontSize: "12px", color: "#64748b", margin: "-6px 0 12px 0" }}>Core terminology successfully targeted on your document.</p>
            <div style={styles.badgeWrapGrid}>
              {skills.map((skill, idx) => (
                <span key={idx} style={{ ...styles.colorBadge, background: skill.color, color: skill.text }}>
                  ● {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* 3. AI OPTIMIZER SUGGESTIONS GRID WITH ACTION BUTTON */}
          <div style={styles.analyticsSectionCard}>
            <h3 style={styles.sectionCardTitle}>AI Optimization Vectors</h3>
            {hasAppliedFixes ? (
              <div style={styles.successNoticeBox}>
                <span>✅ <strong>All Optimization Applied!</strong> Your updated asset structure shows zero critical engineering talent vacancies.</span>
              </div>
            ) : (
              <div>
                <ul style={styles.suggestionsList}>
                  <li>Missing backend keyword cluster: <strong>Docker</strong> containers.</li>
                  <li>Target vacancy found in cloud tracking: Add <strong>AWS</strong> architecture infrastructure.</li>
                  <li>Style rendering gap: Missing <strong>Tailwind CSS</strong> layout framework pointers.</li>
                </ul>
                <button style={styles.applyAllBtn} onClick={handleApplyAllFixes}>
                  Apply All AI Fixes to Text ⚡
                </button>
              </div>
            )}
          </div>

          {/* 4. MATCHING TARGET ROLES MATRIX */}
          <div style={styles.analyticsSectionCard}>
            <h3 style={styles.sectionCardTitle}>High Probability Match Metrics</h3>
            <div style={styles.companyCardStack}>
              {MATCHING_ROLES.map((role, idx) => {
                // Boost match score displays if user applied updates to mock real pipeline logic
                const displayMatch = hasAppliedFixes ? Math.min(role.match + 6, 99) : role.match;
                return (
                  <div key={idx} style={styles.companyMatchCard}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <strong style={{ fontSize: "14px", color: "#0f172a" }}>{role.company}</strong>
                        <p style={{ fontSize: "12px", color: "#64748b", margin: "2px 0 0 0" }}>{role.role} · {role.location}</p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <span style={{
                          ...styles.percentageTag,
                          ...(displayMatch > 90 ? styles.tagHighMatch : styles.tagMidMatch)
                        }}>
                          {displayMatch}% Match
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Inline Styled Config Architecture Object
const styles = {
  workspaceContainer: { padding: "24px", maxWidth: "1280px", margin: "0 auto", boxSizing: "border-box", fontFamily: "system-ui, sans-serif" },
  dashboardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" },
  pageTitle: { fontSize: "24px", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.02em" },
  pageSubtitle: { fontSize: "14px", color: "#64748b", margin: "4px 0 0 0" },
  
  mainContentGrid: { display: "flex", gap: "24px", flexWrap: "wrap" },
  leftViewerPanel: { flex: 4, minWidth: "340px" },
  rightAnalyticsPanel: { flex: 3, minWidth: "300px", display: "flex", flexDirection: "column", gap: "20px" },

  // Document Sheet Component 
  documentCard: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.02)", overflow: "hidden" },
  docHeader: { background: "#f8fafc", padding: "14px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", gap: "10px" },
  savedStatusBadge: { background: "#e2e8f0", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 600, color: "#475569", marginLeft: "auto" },
  mockResumePreview: { padding: "40px", background: "#ffffff", minHeight: "600px", boxSizing: "border-box" },
  resumeDivider: { borderBottom: "1px solid #0f172a", fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", color: "#0f172a", margin: "24px 0 8px 0", paddingBottom: "2px" },
  resumeBodyText: { fontSize: "13px", margin: "0 0 6px 0", color: "#1e293b" },
  resumeBulletList: { margin: "0 0 0 20px", padding: 0, fontSize: "12px", color: "#334155", display: "flex", flexDirection: "column", gap: "6px", lineHeight: 1.5 },

  // Base Panel Box Styles
  analyticsSectionCard: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "20px", boxSizing: "border-box" },
  sectionCardTitle: { fontSize: "15px", fontWeight: 700, color: "#0f172a", margin: "0 0 14px 0", letterSpacing: "-0.01em" },

  // Donut Graph Configuration
  donutContainer: { position: "relative", width: "120px", height: "120px", margin: "10px auto" },
  donutSvg: { transform: "rotate(-90deg)" },
  donutTextCenter: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", flexDirection: "column", alignItems: "center" },
  donutScoreNum: { fontSize: "24px", fontWeight: 800, color: "#0f172a", lineHeight: 1 },
  donutScoreLabel: { fontSize: "9px", fontWeight: 700, color: "#64748b", marginTop: "2px", letterSpacing: "0.05em" },

  // Badges Arrays
  badgeWrapGrid: { display: "flex", flexWrap: "wrap", gap: "6px" },
  colorBadge: { padding: "6px 12px", borderRadius: "6px", fontSize: "12px", fontWeight: 700 },

  // Suggestions List
  suggestionsList: { margin: "0 0 16px 0", padding: "0 0 0 18px", fontSize: "13px", color: "#475569", display: "flex", flexDirection: "column", gap: "8px", textAlign: "left", lineHeight: 1.4 },
  applyAllBtn: { width: "100%", background: "#2563eb", color: "#ffffff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: 700, fontSize: "13px", cursor: "pointer", boxShadow: "0 4px 12px rgba(37,99,235,0.1)" },
  successNoticeBox: { background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "8px", padding: "12px", fontSize: "13px", color: "#166534", lineHeight: 1.4 },

  // High Matching Role Cards Stack
  companyCardStack: { display: "flex", flexDirection: "column", gap: "10px" },
  companyMatchCard: { border: "1px solid #e2e8f0", padding: "12px 16px", borderRadius: "10px", background: "#f8fafc" },
  percentageTag: { padding: "4px 8px", borderRadius: "6px", fontSize: "12px", fontWeight: 700 },
  tagHighMatch: { background: "#dcfce7", color: "#16a34a" },
  tagMidMatch: { background: "#eff6ff", color: "#2563eb" }
};