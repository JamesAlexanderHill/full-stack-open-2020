import React, { useState } from 'react'
import ReactDOM from 'react-dom'
const Button = ({text, func}) => {
  return(
    <button onClick={func}>{text}</button>
  )
}
const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(Array(6).fill(0));

  const handleSetSelected = () => {
    let rand = Math.floor(Math.random() * 6);
    while(rand === selected){
      rand = Math.floor(Math.random() * 6);
    }
    console.log(rand);
    setSelected(rand);
  }

  const handleSetPoints = (index) => {
    const copy = [ ...points ]
    copy[index] += 1;
    console.log(copy);
    setPoints(copy);
  }

  const max = points.indexOf(Math.max(...points));

  return (
    <div>
      {props.anecdotes[selected]}
      <br />
      <Button text="Vote" func={() => handleSetPoints(selected)} />
      <Button text="New Anecdote" func={handleSetSelected} />
      {props.anecdotes[max]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)