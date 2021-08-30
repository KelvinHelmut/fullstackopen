import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Anecdote = props => {
  return (
    <>
      <div>{props.anecdote}</div>
      <div>has {props.votes} votes</div>
    </>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(props.anecdotes.length).fill(0))
  const popular = votes.reduce((max, e, index) => e > votes[max] ? index : max, 0)

  const vote = index => {
    let copy = [...votes]
    copy[index]++
    setVotes(copy)
  }

  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={props.anecdotes[selected]} votes={votes[selected]} />
      <button onClick={() => vote(selected)}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * props.anecdotes.length))}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={props.anecdotes[popular]} votes={votes[popular]} />
    </>
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
