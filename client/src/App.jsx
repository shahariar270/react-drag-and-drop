import React, { useRef, useState } from "react";
import { formatTitle, renderList } from "./helper";
import "./styles.scss";

function App() {
  const [board, setBoard] = useState(renderList);

  const dragItem = useRef(null);
  const dragFrom = useRef(null);

  const handleDragStart = (e, task, status) => {
    dragItem.current = task;
    dragFrom.current = status;
    e.target.style.opacity = "0.5";
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = "1";
  };

  const handleDrop = (status) => {
    const item = dragItem.current;
    const from = dragFrom.current;

    if (!item || !from || from === status) return;

    setBoard(prev => {
      const newBoard = { ...prev };

      newBoard[from] = newBoard[from].filter(t => t !== item);
      newBoard[status] = [...newBoard[status], item];

      return newBoard;
    });
  };

  return (
    <div className="task-board">
      {Object.entries(board).map(([status, items]) => (
        <div
          key={status}
          className="task-board__column"
          onDragOver={(e) => e.preventDefault()}
          onDrop={() => handleDrop(status)}
        >
          <h3>{formatTitle(status)}</h3>

          {items.map((task, index) => (
            <div
              key={index}
              draggable
              onDragStart={(e) => handleDragStart(e, task, status)}
              onDragEnd={handleDragEnd}
              style={{
                padding: 16,
                marginBottom: 8,
                background: "#fff",
                cursor: "move",
              }}
            >
              {task}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
