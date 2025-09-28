import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import "./LogIn.css";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [err, setErr] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pw);
      if (name) await updateProfile(cred.user, { displayName: name });
      navigate("/");
    } catch (e) {
      setErr(e?.message || "Sign up failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="content">
      <div className="logContainer">
        <h2 className="loginTitle">Create account</h2>
        <form className="loginForm" onSubmit={onSubmit}>
          <div className="formGroup">
            <label htmlFor="name">Name (optional)</label>
            <input id="name" value={name} onChange={(e)=>setName(e.target.value)} />
          </div>
          <div className="formGroup">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div className="formGroup">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required minLength={6} value={pw} onChange={(e)=>setPw(e.target.value)} />
          </div>
          <button className="loginButton" disabled={loading}>{loading ? "Creating..." : "Sign Up"}</button>
          {err && <p style={{color:"crimson", marginTop:12}}>{err}</p>}
          <p className="altText">Already have an account? <Link to="/">Sign in</Link></p>
        </form>
      </div>
    </section>
  );
}
