import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = props => {
  let [good, neutral, bad] = props.comments
  let total = good + neutral + bad
  let avg = total ? (good + bad*-1) / total : 0
  let positive = total ? good * 100 / total : 0

  return (
    <>
      <h1>Statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {total}</div>
      <div>avg {avg}</div>
      <div>positive {positive}%</div>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <Statistics comments={[good, neutral, bad]} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
