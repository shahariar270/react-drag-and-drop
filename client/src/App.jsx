import React from "react"
import { formatTitle, renderList } from "./helper"
import './styles.scss'

function App() {

  const handleDragStart = (e, item, container) => {
    // dragItem.current = item;
    // dragContainer.current = container;
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };


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
                  onDragStart={(e) => handleDragStart(e, item, container)}
                  onDragEnd={handleDragEnd}
                  draggable
                  style={{
                    userSelect: "none",
                    padding: 16,
                    margin: "0 0 8px 0",
                    backgroundColor: "white",
                    cursor: "move",
                  }}
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
