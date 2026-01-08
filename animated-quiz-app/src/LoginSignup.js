import { useState, useEffect } from "react";

export default function LoginSignup({ onLogin }) {
  const [username, setUsername] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  // Check if user is already logged in
  useEffect(() => {
    const savedUser = localStorage.getItem("quizUser");
    if (savedUser) {
      onLogin(savedUser);
    }
  }, [onLogin]);

  const handleSignup = () => {
    if (!username.trim()) {
      setError("Username cannot be empty");
      return;
    }

    const users = JSON.parse(localStorage.getItem("quizUsers")) || {};
    if (users[username]) {
      setError("Username already exists. Try logging in.");
      return;
    }

    users[username] = { username, progress: {} };
    localStorage.setItem("quizUsers", JSON.stringify(users));
    localStorage.setItem("quizUser", username);
    onLogin(username);
  };

  const handleLogin = () => {
    if (!username.trim()) {
      setError("Username cannot be empty");
      return;
    }

    const users = JSON.parse(localStorage.getItem("quizUsers")) || {};
    if (!users[username]) {
      setError("User does not exist. Please sign up.");
      return;
    }

    localStorage.setItem("quizUser", username);
    onLogin(username);
  };

  return (
    <div style={styles.loginPage}>
      <h1>{isSignup ? "Sign Up" : "Login"}</h1>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
          setError("");
        }}
        style={styles.input}
      />
      {error && <p style={styles.error}>{error}</p>}

      <button
        onClick={isSignup ? handleSignup : handleLogin}
        style={styles.button}
      >
        {isSignup ? "Sign Up" : "Login"}
      </button>

      <p>
        {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
        <span
          style={styles.toggleLink}
          onClick={() => {
            setIsSignup(!isSignup);
            setError("");
          }}
        >
          {isSignup ? "Login here" : "Sign up"}
        </span>
      </p>
    </div>
  );
}

// Inline styles
const styles = {
  loginPage: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#f0f4f8",
    fontFamily: "sans-serif",
    padding: "20px",
    textAlign: "center",
  },
  input: {
    padding: "12px",
    width: "250px",
    marginBottom: "10px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  button: {
    padding: "12px 20px",
    background: "#2196f3",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    marginBottom: "10px",
  },
  error: {
    color: "#f44336",
    marginBottom: "10px",
  },
  toggleLink: {
    color: "#2196f3",
    cursor: "pointer",
    textDecoration: "underline",
  },
};
