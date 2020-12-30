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
    <h2>{props.course}</h2>
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
  const sum = parts.reduce((total, part) => total + part.exercises, 0);
  return (
    <p><b>Total of {sum} exercises</b></p>
  )
}
const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  const data = courses.map(course =>
    <Course key={course.id} course={course} />
  )
  return (
    <div>
      <h1>Web development curricilum</h1>
      {data}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))