import React from "react"
import { formatTitle, renderList } from "./helper"
import './styles.scss'

function App() {

  return (
    <React.Fragment>
      <div className="task-board">
        {Object.entries(renderList).map(([status, items]) => (
          <div className="task-board__column" key={status}>
            <h3 className="task-board__column-title">
              {formatTitle(status)}
            </h3>

            <div className="task-board__column-list">
              {items.map((task, index) => (
                <div
                  key={index}
                  className="task-board__column-item"
                >
                  {task}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </React.Fragment>
  )
}

export default App
