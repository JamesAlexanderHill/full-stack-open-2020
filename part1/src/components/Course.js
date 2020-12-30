import React from 'react'

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
    <p>
        <b>Total of {sum} exercises</b>
    </p>
    )
}

export default Course