import React from 'react'

const Header = ({course}) => {
  return <h2>{course.name}</h2>
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
  return <b>total of {total} exercises</b>
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

export default Course
