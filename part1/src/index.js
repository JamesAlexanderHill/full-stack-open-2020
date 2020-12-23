import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}
const Content = (props) => {
  const partList = props.parts.map(part => {
    return <Part key={part.name.toString()} part={part.name} exercises={part.exercises} />
  })
  console.log(partList);
  return (
    <div>
      {partList}
    </div>
  )
}
const Part = (props) => {
  
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}
const Total = (props) => {
  return (
    <p>Number of exercises {props.sum}</p>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts}/>
      <Total sum={parts[0].exercises + parts[1].exercises + parts[2].exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))