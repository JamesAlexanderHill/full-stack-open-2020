import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  if(good > 0 || neutral > 0 || bad > 0){
    return(
      <div>
        <h1>Statistics</h1>
        <p>Good {good}</p>
        <p>Neutral {neutral}</p>
        <p>Bad {bad}</p>
        <p>All {all}</p>
        <p>Average {(good - bad)/9}</p>
        <p>Positive {((good)/(9)*100)}%</p>
      </div>
    )
  }
  return(
    <div>
      <h1>Statistics</h1>
      <p>No feedback given</p>
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
      
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)