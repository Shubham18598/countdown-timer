import { useEffect, useRef, useState } from "react"
import "./App.css"

function App() {
  const [milSec, setMilSec] = useState(0)
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [capturedTimes, setCapturedTimes] = useState([])
  const id = useRef(0)

  const handleStart = () => {
    clearInterval(id.current)
    id.current = setInterval(() => {
      setMilSec((s) => s + 1)
    }, 10)
  }

  const handlePause = () => {
    clearInterval(id.current)
  }
  const handleReset = () => {
    clearInterval(id.current)
    setMilSec(0)
    setSeconds(0)
    setMinutes(0)
    setHours(0)
    setCapturedTimes([])
  }

  const handleCaptureTime = () => {
    const capTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(
      seconds
    )}:${formatTime(milSec)}`
    setCapturedTimes((prevTime) => [...prevTime, capTime])
  }

  const formatTime = (value) => {
    return value < 10 ? "0" + value : value
  }

  useEffect(() => {
    if (milSec === 100) {
      setMilSec(0)
      setSeconds((ms) => ms + 1)
    }
    if (seconds === 60) {
      setSeconds(0)
      setMinutes((m) => m + 1)
    }
    if (minutes === 60) {
      setMinutes(0)
      setHours((h) => h + 1)
    }
  }, [milSec, seconds, minutes])

  return (
    <div className="App">
      <h1 style={{ color: "red" }}>COUNTDOWN TIMER</h1>
      <h1>
        Time: {formatTime(hours)}:{formatTime(minutes)}:{formatTime(seconds)}:
        {formatTime(milSec)}
      </h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={handleReset}>Reset</button>
      <button
        onClick={handleCaptureTime}
        disabled={milSec === 0 && seconds === 0 && minutes === 0 && hours === 0}
      >
        Capture Time
      </button>
      {capturedTimes.length !== 0 ? (
        <div className="CapTime">
          <div className="inCap">
            <h2>Captured Time</h2>
            <h5>Hr:Min:Sec:Mis</h5>
            {capturedTimes.map((time, i) => (
              <h3 key={i}>
                {i + 1}. {time}
              </h3>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  )
}

export default App
