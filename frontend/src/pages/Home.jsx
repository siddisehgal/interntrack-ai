import { useState } from "react";
import { Link } from "react-router-dom";

const FAQS = [
  { q: "Is InternTrack AI really free for students?", a: "Yes! Our core features—including the application Kanban tracker, basic resume parsing, and community metrics—are completely free for students forever." },
  { q: "How does the AI Interview Prep work?", a: "It uses generative models to look at the exact question you selected, evaluates your input text based on the STAR method, and delivers an objective performance score alongside custom improvement tips." },
  { q: "Can I track applications for non-software roles?", a: "Absolutely. While our defaults highlight tech tracks, the Kanban framework, workspace tools, and AI copilot adapt seamlessly to product management, design, finance, and data workflows." }
];

const INTERVIEW_QUESTIONS = [
  { id: "q1", text: "Tell me about a time you solved a difficult technical problem.", baselineScore: 85, tips: "Great use of the STAR method! To make this perfect, quantify the results (e.g., 'improved loading speed by 40%')." },
  { id: "q2", text: "Why do you want to work at this company?", baselineScore: 90, tips: "Excellent alignment with corporate culture. Try mentioning a specific product launch or open-source contribution they recently made." },
  { id: "q3", text: "What is the difference between an array and a linked list?", baselineScore: 78, tips: "Good theoretical understanding. Ensure you clearly contrast O(1) vs O(n) lookup times and contiguous memory allocations." }
];

export default function Home() {
  const [activePreview, setActivePreview] = useState("tracker");
  const [openFaq, setOpenFaq] = useState(null);

  // AI Interview Simulator State
  const [selectedQuestion, setSelectedQuestion] = useState(INTERVIEW_QUESTIONS[0]);
  const [userAnswer, setUserAnswer] = useState("");
  const [aiFeedback, setAiFeedback] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Handle local AI scoring simulation
  const handleSimulateAnalysis = (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return alert("Please type an answer to test the AI review simulator!");
    
    setIsAnalyzing(true);
    setAiFeedback(null);

    setTimeout(() => {
      // Calculate a dynamic score based on answer length to make it feel real
      const wordCount = userAnswer.trim().split(/\s+/).length;
      let scoreModifier = Math.min(Math.floor(wordCount / 3), 10);
      if (wordCount < 10) scoreModifier = -15; 
      
      const finalScore = Math.min(Math.max(selectedQuestion.baselineScore + scoreModifier, 50), 100);

      setAiFeedback({
        score: finalScore,
        tips: finalScore < 65 ? "Your response is a bit brief. Try structuring it with Situation, Task, Action, and Result (STAR)." : selectedQuestion.tips
      });
      setIsAnalyzing(false);
    }, 1500); // 1.5s simulated network delay
  };

  // Smooth scroll handler for nav items
  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={styles.container}>
      {/* 1. Header Navigation Bar */}
      <header style={styles.navbar}>
        <div style={styles.logoGroup}>
          <span style={styles.logoIcon}>⚡</span>
          <span style={styles.logoText}>InternTrack AI</span>
        </div>
        <nav style={styles.navLinks}>
          <a href="#features" onClick={(e) => handleScroll(e, "features")} style={styles.navLink}>Features</a>
          <a href="#preview" onClick={(e) => handleScroll(e, "preview")} style={styles.navLink}>Live Demo</a>
          <a href="#pricing" onClick={(e) => handleScroll(e, "pricing")} style={styles.navLink}>Pricing</a>
          <a href="#faq" onClick={(e) => handleScroll(e, "faq")} style={styles.navLink}>FAQ</a>
        </nav>
        <div style={styles.navAuth}>
          <Link to="/login" style={styles.signInBtn}>Sign in</Link>
          <Link to="/dashboard" style={styles.getStartedBtn}>Get started</Link>
        </div>
      </header>

      {/* 2. Hero Action Core Section */}
      <section style={styles.heroSection}>
        <div style={styles.badge}>
          <span style={styles.badgePulse} />
          Powered by AI — built for students
        </div>
        <h1 style={styles.heroTitle}>
          Land the internship.<br />
          <span style={styles.gradientText}>Skip the chaos.</span>
        </h1>
        <p style={styles.heroSubtitle}>
          Track every application, analyze job descriptions, rehearse interviews, and get 
          personalized career coaching — all in one elegant workspace.
        </p>
        <div style={styles.ctaGroup}>
          <Link to="/dashboard" style={styles.primaryCta}>Start tracking free →</Link>
          <a href="#preview" onClick={(e) => handleScroll(e, "preview")} style={styles.secondaryCta}>Test the AI Live Simulator</a>
        </div>
        <p style={styles.subHint}>No credit card required · Free for students</p>
      </section>

      {/* 3. Company Trust Row Banner */}
      <section style={styles.trustBanner}>
        <p style={styles.trustTitle}>STUDENTS PLACED AT</p>
        <div style={styles.companyGrid}>
          <span>Google</span>
          <span>Stripe</span>
          <span>Vercel</span>
          <span>Notion</span>
          <span>Linear</span>
          <span>Figma</span>
          <span>Shopify</span>
        </div>
      </section>

      {/* 4. Core Features Block Grid Matrix */}
      <section id="features" style={styles.section}>
        <span style={styles.sectionBadge}>Features</span>
        <h2 style={styles.sectionHeader}>Everything you need to win the offer.</h2>
        <p style={styles.sectionDesc}>Click a feature box below to instantly test and load its live interactive module window.</p>
        
        <div style={styles.grid3Col}>
          <div 
            style={{...styles.featureCard, ...(activePreview === "tracker" ? styles.activeFeatureCard : {})}} 
            onClick={() => { setActivePreview("tracker"); document.getElementById("preview").scrollIntoView({ behavior: "smooth" }); }}
          >
            <div style={styles.featureIconWrap}>📊</div>
            <h3 style={styles.cardTitle}>Kanban Tracker</h3>
            <p style={styles.cardText}>Drag applications across pipelines smoothly. Click to see preview view.</p>
          </div>
          <div 
            style={{...styles.featureCard, ...(activePreview === "resume" ? styles.activeFeatureCard : {})}} 
            onClick={() => { setActivePreview("resume"); document.getElementById("preview").scrollIntoView({ behavior: "smooth" }); }}
          >
            <div style={styles.featureIconWrap}>📄</div>
            <h3 style={styles.cardTitle}>Resume Manager</h3>
            <p style={styles.cardText}>Review formatting and check real-time ATS keyword matching capabilities.</p>
          </div>
          <div 
            style={{...styles.featureCard, ...(activePreview === "coach" ? styles.activeFeatureCard : {})}} 
            onClick={() => { setActivePreview("coach"); document.getElementById("preview").scrollIntoView({ behavior: "smooth" }); }}
          >
            <div style={styles.featureIconWrap}>🤖</div>
            <h3 style={styles.cardTitle}>AI Interview Coach</h3>
            <p style={styles.cardText}>Practice coding/behavioral questions and receive deep analytical breakdowns instantly.</p>
          </div>
        </div>
      </section>

      {/* 5. Clickable Interactive Workspace Preview Playground */}
      <section id="preview" style={{ ...styles.section, background: "#f8fafc", borderRadius: "24px", maxWidth: "1120px", marginTop: "20px" }}>
        <span style={styles.sectionBadge}>Interactive Playground</span>
        <h2 style={styles.sectionHeader}>See the system in action</h2>
        <p style={styles.sectionDesc}>Interact with the live simulator below to test out the app functionality right now.</p>

        {/* Dynamic Selector Tabs */}
        <div style={styles.previewTabs}>
          <button style={{ ...styles.previewTabBtn, ...(activePreview === "tracker" ? styles.previewTabActive : {}) }} onClick={() => setActivePreview("tracker")}>
            📊 Application Pipeline
          </button>
          <button style={{ ...styles.previewTabBtn, ...(activePreview === "resume" ? styles.previewTabActive : {}) }} onClick={() => setActivePreview("resume")}>
            📄 Resume Analytics
          </button>
          <button style={{ ...styles.previewTabBtn, ...(activePreview === "coach" ? styles.previewTabActive : {}) }} onClick={() => setActivePreview("coach")}>
            🤖 Live AI Interview Drill
          </button>
        </div>

        {/* Dynamic Interactive Render Window */}
        <div style={styles.mockBrowserWindow}>
          <div style={styles.browserHeader}>
            <div style={styles.browserDots}><span /><span /><span /></div>
            <div style={styles.browserUrl}>interntrack.ai/dashboard/{activePreview}</div>
          </div>
          <div style={styles.browserBody}>
            {activePreview === "tracker" && (
              <div>
                <div style={styles.mockFlexRow}>
                  <div style={styles.mockColumn}>
                    <div style={styles.mockColHeader}>Applied (4)</div>
                    <div style={styles.mockJobCard}><strong>Stripe</strong> <p>Frontend Intern</p> <span style={styles.mockTagBlue}>Reviewing</span></div>
                    <div style={styles.mockJobCard}><strong>Vercel</strong> <p>Software Intern</p> <span style={styles.mockTagBlue}>Reviewing</span></div>
                  </div>
                  <div style={styles.mockColumn}>
                    <div style={styles.mockColHeader}>Interviewing (1)</div>
                    <div style={styles.mockJobCard}><strong>Notion</strong> <p>Product Intern</p> <span style={styles.mockTagPurple}>Technical Round</span></div>
                  </div>
                  <div style={styles.mockColumn}>
                    <div style={styles.mockColHeader}>Offers (1)</div>
                    <div style={{ borderLeft: "4px solid #16a34a", background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "10px", textAlign: "left" }}><strong>Linear</strong> <p>Fullstack Intern</p> <span style={styles.mockTagGreen}>🎉 Accepted ($45/hr)</span></div>
                  </div>
                </div>
                {/* Direct Action Link */}
                <div style={{ marginTop: "24px", textAlign: "right" }}>
                  <Link to="/internships" style={styles.inlineGoBtn}>Open Your Custom Tracking Board →</Link>
                </div>
              </div>
            )}

            {activePreview === "resume" && (
              <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>resume_v2_2026_software.pdf</strong>
                  <span style={{ color: "#16a34a", fontWeight: 700 }}>88% ATS Score</span>
                </div>
                <div style={{ height: "6px", background: "#e2e8f0", borderRadius: "99px" }}><div style={{ width: "88%", height: "100%", background: "#16a34a", borderRadius: "99px" }} /></div>
                <p style={{ fontSize: "14px", color: "#475569", margin: "4px 0" }}>✅ <strong>Identified Keywords Match:</strong> React, Node.js, Express, JavaScript, REST APIs, Git</p>
                <p style={{ fontSize: "14px", color: "#ea580c", margin: "4px 0" }}>⚠️ <strong>Missing Core Keywords:</strong> Docker, AWS Cloud Hosting, Tailwind CSS</p>
                
                {/* Direct Action Link */}
                <div style={{ marginTop: "16px", textAlign: "right" }}>
                  <Link to="/resume" style={styles.inlineGoBtn}>Scan Your Own Resume Instantly →</Link>
                </div>
              </div>
            )}

            {activePreview === "coach" && (
              <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: "14px" }}>
                {/* Question Selector */}
                <div>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>1. Choose a Practice Question</label>
                  <select 
                    style={styles.formSelect}
                    value={selectedQuestion.id}
                    onChange={(e) => {
                      const selected = INTERVIEW_QUESTIONS.find(q => q.id === e.target.value);
                      setSelectedQuestion(selected);
                      setAiFeedback(null);
                    }}
                  >
                    {INTERVIEW_QUESTIONS.map(q => <option key={q.id} value={q.id}>{q.text}</option>)}
                  </select>
                </div>

                {/* Answer Prompt Box */}
                <form onSubmit={handleSimulateAnalysis}>
                  <label style={{ fontSize: "12px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>2. Type Your Response Draft</label>
                  <textarea 
                    style={styles.formTextarea}
                    placeholder="Type or paste your mock answer statement right here to evaluate the live analysis system..."
                    value={userAnswer}
                    onChange={(e) => setUserAnswer(e.target.value)}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "10px" }}>
                    <span style={{ fontSize: "12px", color: "#94a3b8" }}>💡 Tip: Longer, specific answers score higher!</span>
                    <button type="submit" disabled={isAnalyzing} style={styles.simulateSubmitBtn}>
                      {isAnalyzing ? "AI Evaluating..." : "Analyze Answer Live ⚡"}
                    </button>
                  </div>
                </form>

                {/* Live Feedback Result Block */}
                {aiFeedback && (
                  <div style={styles.aiFeedbackContainer}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, fontSize: "15px", marginBottom: "6px" }}>
                      <span style={{ color: "#1e3a8a" }}>🤖 Evaluation Metrics Complete</span>
                      <span style={{ color: aiFeedback.score > 80 ? "#16a34a" : "#ea580c" }}>Score: {aiFeedback.score}/100</span>
                    </div>
                    <p style={{ fontSize: "14px", color: "#334155", margin: 0, lineHeight: 1.5 }}>{aiFeedback.tips}</p>
                    <div style={{ marginTop: "12px", borderTop: "1px solid #bfdbfe", paddingTop: "10px", textAlign: "right" }}>
                      <Link to="/interview" style={{ textDecoration: "none", color: "#2563eb", fontSize: "13px", fontWeight: 700 }}>Open Full Voice Assistant Coach →</Link>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Pricing Structure Cards Layout */}
      <section id="pricing" style={styles.section}>
        <span style={styles.sectionBadge}>Pricing</span>
        <h2 style={styles.sectionHeader}>Free for students. Always.</h2>
        
        <div style={styles.pricingGrid}>
          <div style={styles.priceCard}>
            <h3 style={styles.priceTierTitle}>Student</h3>
            <div style={styles.priceRow}>
              <span style={styles.currency}>$</span>
              <span style={styles.amount}>0</span>
              <span style={styles.period}>Forever</span>
            </div>
            <ul style={styles.featureList}>
              <li>✓ Unlimited tracking pipelines</li>
              <li>✓ Interactive resume manager</li>
              <li>✓ Basic JD profile score analysis</li>
              <li>✓ Community channel support</li>
            </ul>
            <Link to="/dashboard" style={styles.priceCardBtnEmpty}>Get started</Link>
          </div>

          <div style={{ ...styles.priceCard, borderColor: "#2563eb", boxShadow: "0 10px 30px rgba(37,99,235,0.06)" }}>
            <div style={styles.popularBadge}>Most popular</div>
            <h3 style={styles.priceTierTitle}>Pro</h3>
            <div style={styles.priceRow}>
              <span style={styles.currency}>$</span>
              <span style={styles.amount}>9</span>
              <span style={styles.period}>per month</span>
            </div>
            <ul style={styles.featureList}>
              <li>✓ Everything in Student tier</li>
              <li>✓ Unlimited AI custom interviews</li>
              <li>✓ Advanced real-time career coach</li>
              <li>✓ Priority parsing analytics metrics</li>
            </ul>
            <Link to="/dashboard" style={styles.priceCardBtnFull}>Get started</Link>
          </div>
        </div>
      </section>

      {/* 7. Clickable Accordion FAQ Section */}
      <section id="faq" style={{ ...styles.section, borderBottom: "none" }}>
        <span style={styles.sectionBadge}>FAQ</span>
        <h2 style={styles.sectionHeader}>Frequently Asked Questions</h2>
        <div style={styles.faqContainer}>
          {FAQS.map((item, idx) => (
            <div key={idx} style={styles.faqItem} onClick={() => setOpenFaq(openFaq === idx ? null : idx)}>
              <div style={styles.faqQuestionRow}>
                <span style={styles.faqQuestion}>{item.q}</span>
                <span style={styles.faqArrow}>{openFaq === idx ? "▲" : "▼"}</span>
              </div>
              {openFaq === idx && (
                <div style={styles.faqAnswer}>{item.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 8. Footer Content Banner */}
      <footer style={styles.footer}>
        <div style={styles.footerContent}>
          <h2 style={styles.footerTitle}>Your next offer starts here.</h2>
          <p style={styles.footerSubtitle}>Join thousands of students using InternTrack AI to organize their job searches.</p>
          <Link to="/dashboard" style={styles.footerCta}>Get started — it's free</Link>
        </div>
        <div style={styles.footerBottom}>
          <span style={styles.copyText}>© 2026 InternTrack AI</span>
          <div style={styles.footerLinks}>
            <a href="#privacy" style={{color: "#64748b"}}>Privacy</a>
            <a href="#terms" style={{color: "#64748b"}}>Terms</a>
            <a href="https://github.com" style={{color: "#64748b"}}>GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: { background: "#fafbfe", color: "#0f172a", fontFamily: "system-ui, sans-serif", minHeight: "100vh", overflowX: "hidden" },
  navbar: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 40px", borderBottom: "1px solid #e2e8f0", background: "rgba(250, 251, 254, 0.8)", backdropFilter: "blur(8px)", position: "sticky", top: 0, zIndex: 1000, maxWidth: "1200px", margin: "0 auto", boxSizing: "border-box" },
  logoGroup: { display: "flex", alignItems: "center", gap: "8px" },
  logoIcon: { fontSize: "20px" },
  logoText: { fontWeight: 800, fontSize: "18px", color: "#0f172a", letterSpacing: "-0.02em" },
  navLinks: { display: "flex", gap: "32px" },
  navLink: { textDecoration: "none", color: "#475569", fontSize: "14px", fontWeight: 500 },
  navAuth: { display: "flex", alignItems: "center", gap: "16px" },
  signInBtn: { textDecoration: "none", color: "#475569", fontSize: "14px", fontWeight: 600 },
  getStartedBtn: { textDecoration: "none", background: "#2563eb", color: "#ffffff", padding: "8px 16px", borderRadius: "8px", fontSize: "14px", fontWeight: 600, boxShadow: "0 4px 12px rgba(37,99,235,0.15)" },
  
  heroSection: { display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: "100px 20px 60px 20px", maxWidth: "800px", margin: "0 auto", boxSizing: "border-box" },
  badge: { display: "inline-flex", alignItems: "center", gap: "8px", background: "#eff6ff", border: "1px solid #bfdbfe", padding: "6px 14px", borderRadius: "99px", fontSize: "13px", fontWeight: 600, color: "#1d4ed8", marginBottom: "24px" },
  badgePulse: { width: "6px", height: "6px", background: "#2563eb", borderRadius: "50%" },
  heroTitle: { fontSize: "3.5rem", fontWeight: 800, color: "#0f172a", margin: 0, letterSpacing: "-0.03em", lineHeight: 1.15 },
  gradientText: { background: "linear-gradient(to right, #2563eb, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" },
  heroSubtitle: { fontSize: "18px", color: "#475569", lineHeight: 1.6, margin: "24px 0 32px 0", maxWidth: "640px" },
  ctaGroup: { display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" },
  primaryCta: { textDecoration: "none", background: "#2563eb", color: "#ffffff", padding: "14px 28px", borderRadius: "10px", fontSize: "15px", fontWeight: 700, boxShadow: "0 4px 14px rgba(37,99,235,0.2)" },
  secondaryCta: { textDecoration: "none", background: "#ffffff", color: "#475569", padding: "14px 28px", borderRadius: "10px", fontSize: "15px", fontWeight: 600, border: "1px solid #e2e8f0", cursor: "pointer" },
  subHint: { fontSize: "12px", color: "#94a3b8", marginTop: "16px", marginBottom: 0 },
  
  trustBanner: { borderTop: "1px solid #e2e8f0", borderBottom: "1px solid #e2e8f0", padding: "40px 20px", background: "#f8fafc" },
  trustTitle: { fontSize: "11px", fontWeight: 700, color: "#94a3b8", letterSpacing: "0.15em", margin: "0 0 24px 0", textAlign: "center" },
  companyGrid: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "48px", fontSize: "16px", fontWeight: 700, color: "#64748b" },
  
  section: { padding: "80px 40px", maxWidth: "1200px", margin: "0 auto", textAlign: "center", borderBottom: "1px solid #e2e8f0", boxSizing: "border-box" },
  sectionBadge: { background: "#f1f5f9", padding: "4px 10px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" },
  sectionHeader: { fontSize: "2.25rem", fontWeight: 800, color: "#0f172a", margin: "16px 0 8px 0", letterSpacing: "-0.02em" },
  sectionDesc: { fontSize: "15px", color: "#64748b", margin: "0 0 48px 0" },
  grid3Col: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", boxSizing: "border-box" },
  featureCard: { background: "#ffffff", border: "1px solid #e2e8f0", padding: "32px", borderRadius: "16px", textAlign: "left", boxSizing: "border-box", cursor: "pointer", transition: "all 0.2s ease" },
  activeFeatureCard: { borderColor: "#2563eb", boxShadow: "0 4px 20px rgba(37,99,235,0.08)", background: "#f8fafc" },
  featureIconWrap: { width: "44px", height: "44px", background: "#eff6ff", border: "1px solid #dbeafe", borderRadius: "10px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", marginBottom: "20px" },
  cardTitle: { fontSize: "16px", fontWeight: 700, color: "#0f172a", margin: "0 0 8px 0" },
  cardText: { fontSize: "14px", color: "#64748b", lineHeight: 1.5, margin: 0 },
  
  previewTabs: { display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "12px", marginBottom: "32px" },
  previewTabBtn: { background: "#ffffff", border: "1px solid #e2e8f0", padding: "10px 20px", borderRadius: "10px", fontSize: "14px", color: "#475569", fontWeight: 600, cursor: "pointer" },
  previewTabActive: { background: "#2563eb", borderColor: "#2563eb", color: "#ffffff" },
  mockBrowserWindow: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "16px", boxShadow: "0 20px 40px rgba(0,0,0,0.03)", overflow: "hidden", maxWidth: "800px", margin: "0 auto", boxSizing: "border-box" },
  browserHeader: { background: "#f8fafc", borderBottom: "1px solid #e2e8f0", padding: "12px 20px", display: "flex", alignItems: "center", gap: "24px" },
  browserDots: { display: "flex", gap: "6px", "& span": { width: "10px", height: "10px", borderRadius: "50%", background: "#cbd5e1" } },
  browserUrl: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "6px", padding: "4px 16px", fontSize: "12px", color: "#64748b", flex: 1, textAlign: "left" },
  browserBody: { padding: "24px", minHeight: "220px", display: "flex", flexDirection: "column", justifyContent: "center", boxSizing: "border-box" },
  
  mockFlexRow: { display: "flex", gap: "16px", flexWrap: "wrap" },
  mockColumn: { flex: 1, minWidth: "180px", background: "#f8fafc", borderRadius: "10px", padding: "12px", display: "flex", flexDirection: "column", gap: "12px" },
  mockColHeader: { fontSize: "12px", fontWeight: 700, color: "#64748b", textAlign: "left" },
  mockJobCard: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "8px", padding: "10px", textAlign: "left", fontSize: "13px" },
  mockTagBlue: { padding: "2px 6px", background: "#eff6ff", color: "#2563eb", borderRadius: "4px", fontSize: "10px", fontWeight: 700 },
  mockTagPurple: { padding: "2px 6px", background: "#f5f3ff", color: "#7c3aed", borderRadius: "4px", fontSize: "10px", fontWeight: 700 },
  mockTagGreen: { padding: "2px 6px", background: "#dcfce7", color: "#16a34a", borderRadius: "4px", fontSize: "10px", fontWeight: 700 },
  
  inlineGoBtn: { textDecoration: "none", display: "inline-block", background: "#eff6ff", color: "#2563eb", padding: "10px 18px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, border: "1px solid #bfdbfe" },

  // Form Controls for the Live AI Widget
  formSelect: { width: "100%", padding: "10px", border: "1px solid #cbd5e1", borderRadius: "8px", background: "#ffffff", fontSize: "14px", outline: "none", marginTop: "4px", marginBottom: "4px", fontFamily: "inherit" },
  formTextarea: { width: "100%", height: "80px", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "8px", background: "#ffffff", fontSize: "14px", outline: "none", resize: "none", boxSizing: "border-box", marginTop: "4px", fontFamily: "inherit" },
  simulateSubmitBtn: { background: "#2563eb", color: "#ffffff", border: "none", padding: "8px 16px", borderRadius: "6px", fontSize: "13px", fontWeight: 700, cursor: "pointer" },
  aiFeedbackContainer: { background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "10px", padding: "14px", marginTop: "10px" },

  pricingGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 360px))", gap: "32px", justifyContent: "center", boxSizing: "border-box" },
  priceCard: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "20px", padding: "32px", textAlign: "left", position: "relative", display: "flex", flexDirection: "column", boxSizing: "border-box" },
  popularBadge: { position: "absolute", top: "16px", right: "16px", background: "#eff6ff", color: "#2563eb", fontSize: "11px", fontWeight: 700, padding: "4px 10px", borderRadius: "99px", border: "1px solid #bfdbfe" },
  priceTierTitle: { fontSize: "18px", fontWeight: 700, color: "#0f172a", margin: "0 0 16px 0" },
  priceRow: { display: "flex", alignItems: "baseline", gap: "4px", marginBottom: "24px" },
  currency: { fontSize: "20px", fontWeight: 600, color: "#64748b" },
  amount: { fontSize: "3rem", fontWeight: 800, color: "#0f172a", letterSpacing: "-0.02em" },
  period: { fontSize: "13px", color: "#64748b" },
  featureList: { listStyle: "none", padding: 0, margin: "0 0 32px 0", display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", color: "#475569" },
  priceCardBtnEmpty: { textDecoration: "none", display: "block", textAlign: "center", padding: "12px", border: "1px solid #cbd5e1", borderRadius: "10px", fontWeight: 700, fontSize: "14px", color: "#475569", marginTop: "auto" },
  priceCardBtnFull: { textDecoration: "none", display: "block", textAlign: "center", padding: "12px", background: "#2563eb", borderRadius: "10px", fontWeight: 700, fontSize: "14px", color: "#ffffff", marginTop: "auto" },
  
  faqContainer: { maxWidth: "740px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "12px" },
  faqItem: { background: "#ffffff", border: "1px solid #e2e8f0", borderRadius: "12px", padding: "16px 20px", textAlign: "left", cursor: "pointer" },
  faqQuestionRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  faqQuestion: { fontSize: "15px", fontWeight: 700, color: "#0f172a" },
  faqArrow: { fontSize: "12px", color: "#94a3b8" },
  faqAnswer: { marginTop: "12px", fontSize: "14px", color: "#475569", lineHeight: 1.6, borderTop: "1px solid #f1f5f9", paddingTop: "12px" },

  footer: { background: "#0f172a", color: "#ffffff", padding: "80px 40px 30px 40px", boxSizing: "border-box" },
  footerContent: { maxWidth: "800px", margin: "0 auto 60px auto", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" },
  footerTitle: { fontSize: "2rem", fontWeight: 800, margin: 0 },
  footerSubtitle: { fontSize: "15px", color: "#94a3b8", margin: "12px 0 24px 0", maxWidth: "480px" },
  footerCta: { textDecoration: "none", background: "#2563eb", color: "#ffffff", padding: "12px 24px", borderRadius: "10px", fontSize: "14px", fontWeight: 700 },
  footerBottom: { maxWidth: "1200px", margin: "0 auto", borderTop: "1px solid #334155", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13px", color: "#64748b" },
  copyText: { color: "#64748b" },
  footerLinks: { display: "flex", gap: "24px" }
};