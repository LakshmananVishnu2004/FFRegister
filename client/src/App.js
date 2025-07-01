import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';


// Helper to format time as HH:MM:SS
function formatTime(seconds) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function App() {
  const [user, setUser] = useState({ name: '', email: '', mobile: ''});
  const [timer, setTimer] = useState(12 * 60 * 60); // 12 hours in seconds

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/register`, user);


    alert(`✅ ${res.data.message}`);
  } catch (error) {
    if (error.response && error.response.data) {
      alert(`❌ ${error.response.data.message || "Server error"}`);
    } else {
      alert('❌ Network or unknown error');
    }
  }
};

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "url('bgff1.jpg') center/cover no-repeat fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative"
      }}
    >
      {/* Timer Icon and Countdown */}
      <div
        style={{
          position: "absolute",
          top: "2.2em",
          right: "2.2em",
          display: "flex",
          alignItems: "center",
          gap: "0.6em",
          marginBottom: "1.5em",
          zIndex: 2
        }}
      >
        {/* Timer SVG Icon */}
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="#ff7b00" strokeWidth="2" fill="#fff8e1"/>
          <rect x="11" y="6" width="2" height="7" rx="1" fill="#ff7b00"/>
          <circle cx="12" cy="17" r="1.2" fill="#ff7b00"/>
        </svg>
        <span style={{
          fontFamily: "'Bebas Neue', 'Montserrat', 'Inter', sans-serif",
          fontSize: "2em",
          color: "#ff7b00",
          fontWeight: 700,
          letterSpacing: "0.08em",
          textShadow: "0 2px 8px #fff8e1"
        }}>
          {formatTime(timer)}
        </span>
      </div>
      <h1
        style={{
          fontFamily: "'Bebas Neue', 'Montserrat', 'Inter', 'Segoe UI', sans-serif",
          fontWeight: 900,
          fontSize: "3.2em",
          letterSpacing: "0.12em",
          color: "#fff",
          background: "linear-gradient(90deg, #ffde00 30%, #ff7b00 70%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textShadow: "2px 2px 0 #222, 0 6px 24px rgba(255,123,0,0.18)",
          marginBottom: "1.2em",
          textTransform: "uppercase"
        }}
      >
        Register <br />Now!
      </h1>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Email or Mobile Number" onChange={handleChange} />
        <input name="email" placeholder="Password" onChange={handleChange} />
        <input name="mobile" placeholder="Player UID" onChange={handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
