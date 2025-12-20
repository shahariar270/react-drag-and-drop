import React from "react"
import { formatTitle, renderList } from "./helper"

function App() {

  return (
    <React.Fragment>
      <div className="board">
        {Object.entries(renderList).map(([status, items]) => (
          <div className="column" key={status}>
            <h3>{formatTitle(status)}</h3>

            <ul>
              {items.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

export default App
