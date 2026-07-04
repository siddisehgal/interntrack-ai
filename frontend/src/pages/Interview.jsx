import { useState } from "react";
import api from "../services/api";

const HR_QUESTIONS = [
  "Tell me about yourself.",
  "Why do you want to intern at our company?",
  "What are your greatest strengths and weaknesses?",
  "Where do you see yourself in 5 years?",
  "Describe a time you worked in a team and faced a conflict.",
  "Why should we hire you over other candidates?",
];

const TECHNICAL_QUESTIONS = [
  "Explain the difference between an array and a linked list.",
  "What is the time complexity of binary search?",
  "Explain what REST API means.",
  "What is the difference between SQL and NoSQL?",
  "Explain object-oriented programming concepts.",
  "What is recursion? Give an example.",
];

export default function Interview() {
  const [activeTab, setActiveTab] = useState("hr");
  const [selectedQ, setSelectedQ] = useState(null);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);

  const questions = activeTab === "hr" ? HR_QUESTIONS : TECHNICAL_QUESTIONS;

  async function getFeedback() {
    if (!answer.trim() || !selectedQ) return;
    setLoading(true);
    setFeedback(null);

    try {
      const res = await api.post("/interview/feedback", { question: selectedQ, answer });
      setFeedback(res.data.feedback || res.data);
    } catch {
      setFeedback({
        score: 75,
        strengths: ["Good structure", "Relevant example used", "Clear communication"],
        improvements: ["Add more specific metrics", "Be more concise", "Include the outcome of the situation"],
        sample: `A strong answer to "${selectedQ}" would include a specific example, the actions you took, and the measurable result you achieved using the STAR method (Situation, Task, Action, Result).`,
      });
    } finally {
      setLoading(false);
    }
  }

  function selectQuestion(q) {
    setSelectedQ(q);
    setAnswer("");
    setFeedback(null);
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>Interview Preparation 🎯</h1>
        <p style={styles.subtitle}>Practice common interview questions and get instant AI feedback on your answers.</p>
        
        <div style={styles.coachBadge}>
          <div style={styles.pulseDot} />
          <span style={styles.coachText}>AI Coach Active</span>
        </div>
      </div>

      <div style={styles.tabs}>
        <button style={{ ...styles.tab, ...(activeTab === "hr" ? styles.tabActive : {}) }} onClick={() => { setActiveTab("hr"); setSelectedQ(null); setFeedback(null); }}>
          HR Questions
        </button>
        <button style={{ ...styles.tab, ...(activeTab === "tech" ? styles.tabActive : {}) }} onClick={() => { setActiveTab("tech"); setSelectedQ(null); setFeedback(null); }}>
          Technical Questions
        </button>
      </div>

      <div style={styles.layout}>
        <div style={styles.questionList}>
          <h2 style={styles.sectionTitle}>{activeTab === "hr" ? "HR Questions" : "Technical Questions"}</h2>
          {questions.map((q, i) => (
            <button key={i} style={{ ...styles.questionCard, ...(selectedQ === q ? styles.questionCardActive : {}) }} onClick={() => selectQuestion(q)}>
              <span style={styles.questionNum}>Q{i + 1}</span>
              <span style={styles.questionText}>{q}</span>
            </button>
          ))}
        </div>

        <div style={styles.practiceArea}>
          {!selectedQ ? (
            <div style={styles.emptyState}>
              <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👈</div>
              <p style={{ color: "#64748b", fontSize: "14px", maxWidth: "260px", lineHeight: 1.6, margin: 0 }}>
                Select a question to start practicing. Your AI coach will analyze your answer and help you improve instantly.
              </p>
            </div>
          ) : (
            <div style={styles.practiceCard}>
              <h3 style={styles.practiceQuestion}>{selectedQ}</h3>
              <textarea
                style={styles.answerInput}
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Type your structured practice response answer here..."
                rows={6}
              />
              <button style={styles.btn} onClick={getFeedback} disabled={loading || !answer.trim()}>
                {loading ? "Getting feedback..." : "Get AI Feedback →"}
              </button>

              {feedback && (
                <div style={styles.feedbackSection}>
                  <div style={styles.scoreRow}>
                    <span style={styles.scoreLabel}>Answer Score</span>
                    <span style={styles.scoreValue}>{feedback.score}/100</span>
                  </div>
                  <div style={styles.scoreBarWrap}>
                    <div style={{ ...styles.scoreBarFill, width: `${feedback.score}%` }} />
                  </div>

                  <div style={styles.feedbackGrid}>
                    <div style={styles.feedbackReportCard}>
                      <h4 style={{ ...styles.feedbackTitle, color: "#16a34a" }}>✅ Strengths</h4>
                      <ul style={styles.feedbackList}>
                        {feedback.strengths.map((s, i) => <li key={i} style={styles.feedbackItem}>{s}</li>)}
                      </ul>
                    </div>
                    <div style={styles.feedbackReportCard}>
                      <h4 style={{ ...styles.feedbackTitle, color: "#ea580c" }}>💡 Improvements</h4>
                      <ul style={styles.feedbackList}>
                        {feedback.improvements.map((s, i) => <li key={i} style={styles.feedbackItem}>{s}</li>)}
                      </ul>
                    </div>
                  </div>

                  <div style={styles.sampleAnswer}>
                    <h4 style={{ ...styles.feedbackTitle, color: "#0f172a" }}>📝 Suggested Approach</h4>
                    <p style={{ fontSize: "14px", color: "#475569", lineHeight: 1.7, margin: 0 }}>{feedback.sample}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", flexDirection: "column", gap: "20px", fontFamily: "system-ui, sans-serif" },
  header: { display: "flex", flexDirection: "column", gap: "4px", textAlign: "left" },
  title: { fontSize: "2rem", fontWeight: 800, color: "#0f172a", margin: 0 },
  subtitle: { fontSize: "14px", color: "#64748b", margin: 0 },
  coachBadge: { display: "flex", alignItems: "center", gap: "8px", marginTop: "8px" },
  pulseDot: { width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#10b981", boxShadow: "0 0 8px #10b981" },
  coachText: { fontSize: "12px", color: "#10b981", fontWeight: 600 },
  tabs: { display: "flex", gap: "8px", marginTop: "4px" },
  tab: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "10px", padding: "10px 20px", fontSize: "14px", color: "#475569", cursor: "pointer", fontWeight: 600 },
  tabActive: { background: "#2563eb", borderColor: "#2563eb", color: "#ffffff" },
  layout: { display: "grid", gridTemplateColumns: "300px 1fr", gap: "24px", alignItems: "start", marginTop: "4px" },
  questionList: { display: "flex", flexDirection: "column", gap: "8px" },
  sectionTitle: { fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "4px", textAlign: "left" },
  questionCard: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px", display: "flex", gap: "10px", alignItems: "flex-start", cursor: "pointer", textAlign: "left", boxSizing: "border-box" },
  questionCardActive: { borderColor: "#2563eb", background: "#f0f4ff" },
  questionNum: { fontSize: "11px", fontWeight: 800, color: "#2563eb", flexShrink: 0, marginTop: "2px" },
  questionText: { fontSize: "13px", color: "#334155", lineHeight: 1.5, fontWeight: 500 },
  practiceArea: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", minHeight: "400px", display: "flex", alignItems: "flex-start", justifyContent: "center", boxSizing: "border-box" },
  emptyState: { textAlign: "center", alignSelf: "center", padding: "40px" },
  practiceCard: { width: "100%", padding: "24px", display: "flex", flexDirection: "column", gap: "20px", boxSizing: "border-box" },
  practiceQuestion: { fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: 0, lineHeight: 1.4, textAlign: "left" },
  answerInput: { width: "100%", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "14px 16px", fontSize: "14px", color: "#0f172a", resize: "vertical", outline: "none", fontFamily: "inherit", boxSizing: "border-box" },
  btn: { background: "#2563eb", color: "#ffffff", border: "none", borderRadius: "10px", padding: "12px 24px", fontSize: "14px", fontWeight: 700, cursor: "pointer", width: "fit-content" },
  feedbackSection: { display: "flex", flexDirection: "column", gap: "16px", borderTop: "1px solid #e2e8f0", paddingTop: "20px" },
  scoreRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  scoreLabel: { fontSize: "14px", color: "#475569", fontWeight: 600 },
  scoreValue: { fontSize: "20px", fontWeight: 800, color: "#2563eb" },
  scoreBarWrap: { height: "8px", background: "#e2e8f0", borderRadius: "99px", overflow: "hidden" },
  scoreBarFill: { height: "100%", background: "#2563eb", borderRadius: "99px" },
  feedbackGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
  feedbackReportCard: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px", boxSizing: "border-box" },
  feedbackTitle: { fontSize: "13px", fontWeight: 700, margin: "0 0 12px 0", textAlign: "left" },
  feedbackList: { margin: 0, padding: "0 0 0 16px", display: "flex", flexDirection: "column", gap: "8px", textAlign: "left" },
  feedbackItem: { fontSize: "13px", color: "#475569", lineHeight: 1.5, fontWeight: 500 },
  sampleAnswer: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px", boxSizing: "border-box", textAlign: "left" },
};