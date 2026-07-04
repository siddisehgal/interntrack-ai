import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../services/auth.service";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await registerUser({ name, email, password });
      const token = res.data.access_token;
      if (token) localStorage.setItem("access_token", token);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.left}>
        <div style={styles.leftInner}>
          <div style={styles.logoWrap}>
            <span style={styles.logoIcon}>🎯</span>
            <span style={styles.logoText}>InternTrack AI</span>
          </div>
          <h2 style={styles.leftTitle}>Build your future in tech with InternTrack AI</h2>
          <p style={styles.leftSub}>Track every application, manage your pipeline, and land your dream internship.</p>
          <div style={styles.features}>
            {[
              { icon: "📋", text: "Track all your applications in one place" },
              { icon: "🤖", text: "AI-powered resume analysis and feedback" },
              { icon: "🎯", text: "Prepare for interviews with AI mock sessions" },
            ].map((f, i) => (
              <div key={i} style={styles.feature}>
                <span style={styles.featureIcon}>{f.icon}</span>
                <span style={styles.featureText}>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={styles.right}>
        <div style={styles.card}>
          <h1 style={styles.title}>Create your account</h1>
          <p style={styles.subtitle}>Start tracking your internship journey today — it's free</p>

          <form onSubmit={handleRegister} style={styles.form}>
            <div style={styles.fieldWrap}>
              <label style={styles.label}>Full name</label>
              <input
                style={styles.input}
                placeholder="Alex Chen"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div style={styles.fieldWrap}>
              <label style={styles.label}>Email address</label>
              <input
                style={styles.input}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div style={styles.fieldWrap}>
              <label style={styles.label}>Password</label>
              <input
                style={styles.input}
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button style={styles.button} type="submit" disabled={loading}>
              {loading ? "Creating account..." : "Create Account →"}
            </button>
          </form>

          <div style={styles.divider}>
            <span style={styles.dividerLine} />
            <span style={styles.dividerText}>or sign up with</span>
            <span style={styles.dividerLine} />
          </div>

          <div style={styles.socialRow}>
            <button style={styles.socialBtn}>🔍 Google</button>
            <button style={styles.socialBtn}>💼 LinkedIn</button>
          </div>

          <p style={styles.loginText}>
            Already have an account?{" "}
            <Link to="/" style={styles.loginLink}>Sign in</Link>
          </p>

          <p style={styles.terms}>
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
  },
  left: {
    flex: 1,
    background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px",
  },
  leftInner: {
    maxWidth: "400px",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "32px",
  },
  logoIcon: { fontSize: "24px" },
  logoText: {
    fontSize: "20px",
    fontWeight: 700,
    color: "#ffffff",
  },
  leftTitle: {
    fontSize: "2rem",
    fontWeight: 700,
    color: "#ffffff",
    lineHeight: 1.3,
    marginBottom: "16px",
  },
  leftSub: {
    fontSize: "15px",
    color: "rgba(255,255,255,0.8)",
    marginBottom: "32px",
    lineHeight: 1.6,
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  feature: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  featureIcon: {
    fontSize: "20px",
    width: "36px",
    height: "36px",
    background: "rgba(255,255,255,0.15)",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  featureText: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.9)",
    fontWeight: 500,
  },
  right: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "48px",
    background: "#f8f9ff",
  },
  card: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "40px 36px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 60px rgba(37,99,235,0.08)",
    border: "1px solid #e2e8f0",
  },
  title: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#0b1c30",
    margin: "0 0 8px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#737686",
    margin: "0 0 28px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  fieldWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#0b1c30",
  },
  input: {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    color: "#0b1c30",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },
  button: {
    width: "100%",
    padding: "13px 16px",
    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: "15px",
    marginTop: "4px",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "20px 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#e2e8f0",
  },
  dividerText: {
    fontSize: "12px",
    color: "#737686",
    whiteSpace: "nowrap",
  },
  socialRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginBottom: "20px",
  },
  socialBtn: {
    padding: "10px",
    background: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 500,
    color: "#434655",
  },
  loginText: {
    fontSize: "14px",
    color: "#737686",
    textAlign: "center",
    margin: "0 0 12px",
  },
  loginLink: {
    color: "#2563eb",
    fontWeight: 600,
    textDecoration: "none",
  },
  terms: {
    fontSize: "12px",
    color: "#737686",
    textAlign: "center",
    margin: 0,
    lineHeight: 1.6,
  },
  termsLink: {
    color: "#2563eb",
    textDecoration: "none",
  },
};
