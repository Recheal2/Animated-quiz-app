import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";
import quizData from "./quizData";

// =================== LOGIN / SIGNUP COMPONENT ===================
function LoginSignup({ onLogin }) {
  const [username, setUsername] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = () => {
    if (!username.trim()) return setError("Username cannot be empty");
    const users = JSON.parse(localStorage.getItem("quizUsers")) || {};
    if (users[username]) return setError("Username exists. Try login.");
    users[username] = { username, progress: {} };
    localStorage.setItem("quizUsers", JSON.stringify(users));
    localStorage.setItem("quizUser", username);
    onLogin(username);
  };

  const handleLogin = () => {
    if (!username.trim()) return setError("Username cannot be empty");
    const users = JSON.parse(localStorage.getItem("quizUsers")) || {};
    if (!users[username]) return setError("User does not exist. Sign up first.");
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
        onChange={(e) => { setUsername(e.target.value); setError(""); }}
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
          onClick={() => { setIsSignup(!isSignup); setError(""); }}
        >
          {isSignup ? "Login here" : "Sign up"}
        </span>
      </p>
    </div>
  );
}

// =================== TOPIC & DIFFICULTY SELECTION ===================
function TopicDifficultySelection({ startQuiz }) {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [difficulty, setDifficulty] = useState("Mixed");

  const toggleTopic = (topic) => {
    setSelectedTopics(prev =>
      prev.includes(topic) ? prev.filter(t => t !== topic) : [...prev, topic]
    );
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Select Topics</h2>
      <div style={{ marginBottom: "20px" }}>
        {Object.keys(quizData).map(t => (
          <button
            key={t}
            style={{
              margin: "5px",
              padding: "10px 20px",
              borderRadius: "8px",
              background: selectedTopics.includes(t) ? "#2196f3" : "#ccc",
              color: selectedTopics.includes(t) ? "#fff" : "#000",
              border: "none",
              cursor: "pointer"
            }}
            onClick={() => toggleTopic(t)}
          >
            {t}
          </button>
        ))}
      </div>
      <h2>Select Difficulty</h2>
      {["Easy", "Medium", "Hard", "Mixed"].map(d => (
        <button
          key={d}
          style={{
            margin: "5px",
            padding: "10px 20px",
            borderRadius: "8px",
            background: difficulty === d ? "#2196f3" : "#ccc",
            color: difficulty === d ? "#fff" : "#000",
            border: "none",
            cursor: "pointer"
          }}
          onClick={() => setDifficulty(d)}
        >
          {d}
        </button>
      ))}
      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => {
            if (selectedTopics.length === 0) return alert("Select at least 1 topic");
            startQuiz(selectedTopics, difficulty);
          }}
          style={styles.button}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

// =================== PROFILE ===================
function Profile({ username, progress = {}, startQuiz, logout }) {
  const chartData = Object.keys(progress).map(topic => {
    const scores = progress[topic].map(r => r.score);
    const avg = scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : 0;
    return { topic, score: avg };
  });

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>{username}'s Profile</h1>
      <button onClick={startQuiz} style={{ ...styles.button, marginBottom: "20px" }}>Start New Quiz</button>
      <button onClick={logout} style={{ ...styles.button, marginBottom: "20px", background: "#f44336" }}>Logout</button>
      {chartData.length === 0 ? <p>No quizzes taken yet.</p> : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="topic" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#2196f3" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

// =================== MAIN APP ===================
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login"); // login | selection | quiz | profile
  const [topic, setTopic] = useState([]);
  const [difficulty, setDifficulty] = useState("Mixed");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [shake, setShake] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [timerKey, setTimerKey] = useState(0);
  const [confetti, setConfetti] = useState(false);
  const [progress, setProgress] = useState({}); // live progress

  // TIMER
  useEffect(() => {
    if (showResult || selected || questions.length === 0) return;
    if (timeLeft <= 0) { setShake(true); setTimeout(() => setShake(false), 500); goNext(); return; }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showResult, selected, questions]);

  // LOAD EXISTING PROGRESS
  useEffect(() => {
    if (!user) return;
    const data = JSON.parse(localStorage.getItem("quizProgress")) || {};
    setProgress(data[user] || {});
  }, [user]);

  // START QUIZ
  const startQuizFunc = (selectedTopics, selectedDifficulty) => {
    setTopic(selectedTopics);
    setDifficulty(selectedDifficulty);

    let pool = [];
    selectedTopics.forEach(t => {
      let qSet = quizData[t];
      if (selectedDifficulty !== "Mixed") qSet = qSet.filter(q => q.difficulty === selectedDifficulty);
      pool.push(...qSet);
    });
    pool = pool.sort(() => 0.5 - Math.random()).slice(0, 25);

    setQuestions(pool);
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setTimeLeft(10);
    setPage("quiz");
  };

  const saveProgress = (score) => {
    const data = JSON.parse(localStorage.getItem("quizProgress")) || {};
    if (!data[user]) data[user] = {};
    topic.forEach(t => {
      if (!data[user][t]) data[user][t] = [];
      data[user][t].push({ score, date: new Date().toLocaleDateString(), difficulty });
    });
    localStorage.setItem("quizProgress", JSON.stringify(data));
    setProgress(data[user]); // update live
  };

  const handleAnswer = (option) => {
    if (selected) return;
    setSelected(option);
    const correctAnswer = questions[current].answer;
    if (option === correctAnswer) { setScore(score + 1); setConfetti(true); setTimeout(() => setConfetti(false), 800); }
    else { setShake(true); setTimeout(() => setShake(false), 500); }
    setTimeout(goNext, 900);
  };

  const goNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected(null);
      setTimeLeft(10);
      setTimerKey(prev => prev + 1);
    } else {
      saveProgress(score);
      setShowResult(true);
    }
  };

  const timerColor = timeLeft > 6 ? "#4caf50" : timeLeft > 3 ? "#FFC107" : "#f44336";

  // RENDER
  if (!user || page === "login") return <LoginSignup onLogin={(u) => { setUser(u); setPage("selection"); }} />;
  if (page === "profile") return <Profile username={user} progress={progress} startQuiz={() => setPage("selection")} logout={() => { localStorage.removeItem("quizUser"); setUser(null); setPage("login"); }} />;
  if (page === "selection") return <TopicDifficultySelection startQuiz={startQuizFunc} />;

  const question = questions[current];

  return (
    <div className="app">
      <div className="card">
        {!showResult && <div className="progress-bar-container">
          <motion.div
            key={timerKey}
            className="progress-bar-timer"
            initial={{ width: "100%", backgroundColor: timerColor }}
            animate={{ width: `${(timeLeft / 10) * 100}%`, backgroundColor: timerColor }}
            transition={{ duration: 1, ease: "linear" }}
          />
        </div>}
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.4 }}
              className={`question-container ${shake ? "shake" : ""}`}
            >
              <h2>{question.question}</h2>
              <div className="options">
                {question.options.map(option => {
                  const isCorrect = option === question.answer;
                  const isSelected = selected === option;
                  return (
                    <motion.button
                      key={option}
                      className={`option ${isSelected ? (isCorrect ? "correct" : "wrong") : ""}`}
                      onClick={() => handleAnswer(option)}
                      whileHover={{ scale: 1.05 }}
                      animate={isSelected && isCorrect ? { scale: [1, 1.2, 1] } : {}}
                    >{option}</motion.button>
                  )
                })}
              </div>
              {confetti && (
                <motion.div
                  className="confetti"
                  initial={{ opacity: 0, y: -50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                >🎉</motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="result"
            >
              <h1>🎉 Quiz Complete!</h1>
              <motion.p
                key={score}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >You scored <strong>{score}</strong> out of <strong>{questions.length}</strong></motion.p>
              <button onClick={() => setPage("selection")} style={styles.button}>Start New Quiz</button>
              <button onClick={() => setPage("profile")} style={{ ...styles.button, background: "#2196f3" }}>Go to Profile</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
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
  error: { color: "#f44336", marginBottom: "10px" },
  toggleLink: { color: "#2196f3", cursor: "pointer", textDecoration: "underline" }
};
