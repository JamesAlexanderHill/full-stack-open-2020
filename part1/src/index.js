import React from 'react'
import ReactDOM from 'react-dom'

const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}
const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}
const Content = (props) => {
  const partList = props.parts.map(part => {
    return <Part key={part.name.toString()} part={part.name} exercises={part.exercises} />
  })
  //console.log(partList);
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
  const parts = props.parts;
  let sum = 0;
  parts.forEach(part => {
    sum += part.exercises;
  })              
  return (
    <p>Number of exercises {sum}</p>
  )
}
const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }
  return <Course course={course} />
}

ReactDOM.render(<App />, document.getElementById('root'))