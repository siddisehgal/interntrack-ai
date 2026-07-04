import { useState, useRef, useEffect } from "react";
import api from "../services/api";

const SUGGESTED_PROMPTS = [
  "What skills do I need for a software engineering internship?",
  "How do I prepare for a technical interview?",
  "Review my elevator pitch for internship applications.",
  "What should I include in my internship application email?",
  "How do I negotiate an internship offer?",
];

export default function Assistant() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm your AI career assistant. Ask me anything about internships, resumes, interviews, or career advice! 🚀" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage(text) {
    const userMsg = text || input.trim();
    if (!userMsg) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await api.post("/assistant/chat", { message: userMsg, history: messages });
      setMessages((prev) => [...prev, { role: "assistant", content: res.data.reply }]);
    } catch {
      const fallbacks = [
        "Great question! For software engineering internships, focus on data structures, algorithms, and one strong project on your resume.",
        "Technical interviews usually cover arrays, strings, trees, and graphs. Practice on LeetCode starting with Easy problems!",
        "Make sure your resume is one page, has measurable achievements, and is tailored to each company you apply to.",
        "Networking is key — reach out to students who interned at your target companies on LinkedIn for referrals.",
      ];
      const reply = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1 style={styles.title}>AI Copilot Assistant 🤖</h1>
        <p style={styles.subtitle}>Get personalized career advice, interview tips, and internship guidance.</p>
      </div>

      <div style={styles.promptsWrap}>
        {SUGGESTED_PROMPTS.map((p) => (
          <button key={p} style={styles.promptBtn} onClick={() => sendMessage(p)}>
            {p}
          </button>
        ))}
      </div>

      <div style={styles.chatWindow}>
        {messages.map((msg, i) => (
          <div key={i} style={{ ...styles.msgRow, justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
            {msg.role === "assistant" && <div style={styles.avatar}>🤖</div>}
            <div style={msg.role === "user" ? styles.userBubble : styles.aiBubble}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ ...styles.msgRow, justifyContent: "flex-start" }}>
            <div style={styles.avatar}>🤖</div>
            <div style={styles.aiBubble}>Thinking...</div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div style={styles.inputRow}>
        <textarea
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Ask me anything about your career..."
          rows={2}
        />
        <button style={styles.sendBtn} onClick={() => sendMessage()} disabled={loading || !input.trim()}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { display: "flex", flexDirection: "column", gap: "20px", fontFamily: "system-ui, sans-serif" },
  header: { display: "flex", flexDirection: "column", gap: "4px", textAlign: "left" },
  title: { fontSize: "2rem", fontWeight: 800, color: "#0f172a", margin: 0 },
  subtitle: { fontSize: "14px", color: "#64748b", margin: 0 },
  promptsWrap: { display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "4px" },
  promptBtn: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "99px", padding: "8px 16px", fontSize: "13px", color: "#475569", fontWeight: 500, cursor: "pointer" },
  chatWindow: { flex: 1, background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", padding: "20px", display: "flex", flexDirection: "column", gap: "16px", minHeight: "380px", maxHeight: "460px", overflowY: "auto", boxSizing: "border-box" },
  msgRow: { display: "flex", gap: "12px", alignItems: "flex-end", boxSizing: "border-box" },
  avatar: { fontSize: "20px", flexShrink: 0, paddingBottom: "4px" },
  aiBubble: { background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: "16px 16px 16px 4px", padding: "12px 16px", fontSize: "14px", color: "#1e293b", maxWidth: "75%", lineHeight: 1.6, textAlign: "left" },
  userBubble: { background: "#2563eb", borderRadius: "16px 16px 4px 16px", padding: "12px 16px", fontSize: "14px", color: "#ffffff", maxWidth: "75%", lineHeight: 1.6, textAlign: "left" },
  inputRow: { display: "flex", gap: "12px", alignItems: "center" },
  input: { flex: 1, background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "12px 16px", fontSize: "14px", color: "#0f172a", resize: "none", outline: "none", boxSizing: "border-box" },
  sendBtn: { background: "#2563eb", color: "#ffffff", border: "none", borderRadius: "12px", padding: "12px 24px", fontSize: "14px", fontWeight: 700, cursor: "pointer" }
};