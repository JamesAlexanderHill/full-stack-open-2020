import React, { useState } from 'react'
import ReactDOM from 'react-dom'

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

  const all = good + neutral + bad;

  return (
    <div>
      <h1>Give Feedback</h1>
      <button onClick={handleGoodIncrement}>Good</button>
      <button onClick={handleNeutralIncrement}>Neutral</button>
      <button onClick={handleBadIncrement}>Bad</button>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {all}</p>
      <p>Average {(good - bad)/9}</p>
      <p>Positive {((good)/(9)*100)}%</p>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)