import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import "./LogIn.css";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pw);
      navigate("/"); // redirect to home page
    } catch (e) {
      setErr(e?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="content">
      <div className="logContainer">
        <h2 className="loginTitle">Sign In</h2>

        <form className="loginForm" onSubmit={onSubmit}>
          <div className="formGroup">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />
          </div>

          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={pw}
              onChange={(e)=>setPw(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="loginButton" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>

          {err && <p style={{color:"crimson", marginTop:12}}>{err}</p>}

          <p className="altText">
            Don’t have an account? <Link to="/signup">Register</Link>
          </p>
        </form>
      </div>
    </section>
  );
}
