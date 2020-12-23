import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Stats = () => {
  return (
    <div>
      <h1>Statistics</h1>
    </div>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodIncrement = () => {
    setGood(good + 1)
  }
  const handleNeutralIncrement = () => {
    setNeutral(neutral + 1)
  }
  const handleBadIncrement = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodIncrement}>Good</button>
      <button onClick={handleNeutralIncrement}>Neutral</button>
      <button onClick={handleBadIncrement}>Bad</button>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)