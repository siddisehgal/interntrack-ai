import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../services/auth.service";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await loginUser({ email, password });
      
      const token = res.data.access_token;

      if (token) {
        localStorage.setItem("access_token", token);
        navigate("/dashboard");
      } else {
        alert("Authentication failed: No token received.");
      }
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>

        {/* Brand Header */}
        <div style={styles.logoWrap}>
          <div style={styles.logoIcon}>🎯</div>
          <span style={styles.logoText}>InternTrack AI</span>
        </div>

        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.subtitle}>Sign in to continue tracking your internships</p>

        {/* Input Fields Form */}
        <form onSubmit={handleLogin} style={styles.form}>
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
            <div style={styles.labelRow}>
              <label style={styles.label}>Password</label>
              <a href="#" style={styles.forgot}>Forgot password?</a>
            </div>
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
            {loading ? "Signing in..." : "Log in →"}
          </button>
        </form>

        {/* Layout Separator */}
        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>or continue with</span>
          <span style={styles.dividerLine} />
        </div>

        {/* Social Authentication Row */}
        <div style={styles.socialRow}>
          <button style={styles.socialBtn} type="button" onClick={() => alert("OAuth flow integration coming soon!")}>
            Google
          </button>
          <button style={styles.socialBtn} type="button" onClick={() => alert("OAuth flow integration coming soon!")}>
            LinkedIn
          </button>
        </div>

        {/* Account Swap Link */}
        <p style={styles.registerText}>
          No account?{" "}
          <Link to="/register" style={styles.registerLink}>Create one free</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    background: "linear-gradient(135deg, #f0f4ff 0%, #faf9ff 100%)",
    boxSizing: "border-box",
  },
  card: {
    padding: "40px 36px",
    background: "#ffffff",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "420px",
    textAlign: "center",
    boxShadow: "0 20px 60px rgba(37,99,235,0.08)",
    border: "1px solid #e2e8f0",
    boxSizing: "border-box",
  },
  logoWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginBottom: "20px",
  },
  logoIcon: {
    fontSize: "24px",
  },
  logoText: {
    fontSize: "20px",
    fontWeight: 700,
    background: "linear-gradient(135deg, #2563eb, #7c3aed)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
  },
  title: {
    fontSize: "24px",
    fontWeight: 700,
    color: "#0f172a",
    margin: "0 0 6px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#64748b",
    margin: "0 0 28px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    textAlign: "left",
  },
  fieldWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    fontSize: "13px",
    fontWeight: 600,
    color: "#334155",
  },
  forgot: {
    fontSize: "12px",
    color: "#2563eb",
    textDecoration: "none",
    fontWeight: 500,
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
    background: "#f8fafc",
    color: "#0f172a",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
    transition: "border-color 0.15s ease",
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
    marginTop: "8px",
    transition: "opacity 0.15s ease",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    margin: "24px 0",
  },
  dividerLine: {
    flex: 1,
    height: "1px",
    background: "#e2e8f0",
  },
  dividerText: {
    fontSize: "12px",
    color: "#94a3b8",
    whiteSpace: "nowrap",
  },
  socialRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "24px",
  },
  socialBtn: {
    padding: "11px",
    background: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: 600,
    color: "#475569",
    transition: "background 0.15s ease",
  },
  registerText: {
    fontSize: "14px",
    color: "#64748b",
    margin: 0,
  },
  registerLink: {
    color: "#2563eb",
    fontWeight: 600,
    textDecoration: "none",
  },
};