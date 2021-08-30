import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = props => {
  let [good, neutral, bad] = props.comments
  let total = good + neutral + bad
  let avg = total ? (good + bad*-1) / total : 0
  let positive = total ? good * 100 / total : 0
  let statistics = <div>No feedback given</div>

    if (total > 0) {
      statistics = (
        <table>
          <tbody>
            <Statistic text="good" value={good} />
            <Statistic text="neutral" value={neutral} />
            <Statistic text="bad" value={bad} />
            <Statistic text="all" value={total} />
            <Statistic text="avg" value={avg} />
            <Statistic text="positive" value={positive} />
          </tbody>
        </table>
      )
    }

  return (
    <>
      <h1>Statistics</h1>
      {statistics}
    </>
  )
}

const Button = ({text, handleClick}) => {
  return <button onClick={handleClick}>{text}</button>
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback</h1>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <Statistics comments={[good, neutral, bad]} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)
