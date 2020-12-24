import React, { useState } from 'react'
import ReactDOM, { render } from 'react-dom'
const Statistic = ({text, value}) => {
  return(
    <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad;
  const positive = ((good)/(9)*100) + "%";
  if(good > 0 || neutral > 0 || bad > 0){
    return(
      <div>
        <h1>Statistics</h1>
        <table>
          <tbody>
            <Statistic text="Good" value={good} />
            <Statistic text="Neutral" value={neutral} />
            <Statistic text="Bad" value={bad} />
            <Statistic text="All" value={all} />
            <Statistic text="Average" value={(good - bad)/9} />
            <Statistic text="Positive" value={positive} />
          </tbody>
        </table>
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

const Button = ({text, onClickHandler}) => {
  return(
    <button onClick={onClickHandler}>{text}</button>
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
      <Button text="Good" onClickHandler={handleGoodIncrement}/>
      <Button text="Neutral" onClickHandler={handleNeutralIncrement}/>
      <Button text="Bad" onClickHandler={handleBadIncrement}/>
      
      <Statistics good={good} neutral={neutral} bad={bad} />
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)