import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({course}) => {
  return <h1>{course.name}</h1>
}

const Part = ({part}) => {
  return <p>{part.name} {part.exercises}</p>
}

const Content = ({course}) => {
  return (
    <div>
      {course.parts.map(e => <Part key={e.id} part={e} />)}
    </div>
  )
}

const Total = ({course}) => {
  const total = course.parts.reduce((total, e) => e.exercises + total, 0)
  return <p>Number of exercises {total}</p>
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
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
