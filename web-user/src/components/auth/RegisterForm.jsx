import { useState } from "react";
import axios from "axios";
import { FcGoogle } from "react-icons/fc";
import { useSearchParams, Link } from "react-router-dom";
import styles from "../../styles/components/auth/RegisterForm.module.css";

export default function RegisterForm() {
  const [searchParams] = useSearchParams();
  const registrationToken = searchParams.get("registration_token");
  const email = searchParams.get("email");

  const [accountCode, setAccountCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ========== STEP 1: Google SSO ==========
  if (!registrationToken) {
    const handleGoogle = async () => {
      setLoading(true);
      try {
        const apiBase = import.meta.env.VITE_API_URL || "http://localhost:3001";
        const { data } = await axios.get(`${apiBase}/api/auth/google`);
        if (data.url) {
          window.location.href = data.url;
        } else {
          setError("Could not initiate Google login.");
        }
      } catch (err) {
        setError("Failed to connect to server.");
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className={styles.form}>
        <h2 className={styles.title}>Create Your Account</h2>
        <p className={styles.info} style={{ textAlign: "center", color: "#555" }}>
          Start by signing in with your official Google account.
        </p>

        <button
          type="button"
          className={styles.googleButton}
          onClick={handleGoogle}
          disabled={loading}
        >
          <FcGoogle className={styles.googleIcon} />
          {loading ? "Redirecting..." : "Continue With Google"}
        </button>

        {error && <p className={styles.errorText} style={{ color: "red", textAlign: "center" }}>{error}</p>}

        <div className={styles.loginAction}>
          <span className={styles.loginText}>Already have an account?</span>
          <Link to="/login" className={styles.secondaryButton}>
            Login
          </Link>
        </div>
      </div>
    );
  }

  // ========== STEP 2: Account Code ==========
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!accountCode.trim()) {
      setError("Please enter your account code.");
      return;
    }
    setLoading(true);
    try {
      const apiBase = import.meta.env.VITE_API_URL || "http://localhost:3001";
      const { data } = await axios.post(`${apiBase}/api/auth/complete-google-registration`, {
        registration_token: registrationToken,
        account_code: accountCode.trim(),
      });
      if (data.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "/";
      } else {
        setError(data.message || "Registration failed.");
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.title}>Complete Your Registration</h2>
      <p className={styles.info} style={{ textAlign: "center", color: "#555" }}>
        Signed in as <strong>{email}</strong>.
        <br />
        Enter the account code provided by your administrator to continue.
      </p>

      <label className={styles.field}>
        <span className={styles.label}>ACCOUNT CODE</span>
        <input
          className={styles.input}
          type="text"
          placeholder="e.g. CET-ICT-FACULTY-ABCDEF"
          value={accountCode}
          onChange={(e) => setAccountCode(e.target.value)}
          required
        />
      </label>

      <button className={styles.primaryButton} type="submit" disabled={loading}>
        {loading ? "Registering..." : "Complete Registration"}
      </button>

      {error && <p className={styles.errorText} style={{ color: "red", textAlign: "center" }}>{error}</p>}

      <p className={styles.helpText}>
        Need an account code? <a href="/request-account-code">Request one here</a>
      </p>
    </form>
  );
}