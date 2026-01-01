import React, { useRef, useState } from "react";

const initialBoard = {
  todo: ["Task A", "Task B"],
  doing: ["Task C"],
  done: ["Task D"]
};

export default function App() {
  const [board, setBoard] = useState(initialBoard);
  const [order, setOrder] = useState(Object.keys(initialBoard));

  const dragItem = useRef(null);
  const dragItemFrom = useRef(null);
  const dragContainer = useRef(null);

  return (
    <div style={{ display: "flex", gap: 20, padding: 20 }}>
      {order.map(container => (
        <div
          key={container}
          draggable
          onDragStart={() => onContainerDragStart(container)}
          onDragOver={e => e.preventDefault()}
          onDrop={() => onContainerDrop(container)}
          style={{
            width: 220,
            padding: 10,
            background: "#f4f4f4",
            borderRadius: 6
          }}
        >
          <h3>{container.toUpperCase()}</h3>

          <div
            onDragOver={e => e.preventDefault()}
            onDrop={() => onItemDrop(container)}
          >
            {board[container].map(item => (
              <div
                key={item}
                draggable
                onDragStart={() => onItemDragStart(item, container)}
                style={{
                  padding: 10,
                  marginBottom: 8,
                  background: "#fff",
                  cursor: "move"
                }}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  function onItemDragStart(item, container) {
    dragItem.current = item;
    dragItemFrom.current = container;
  }

  function onItemDrop(to) {
    const item = dragItem.current;
    const from = dragItemFrom.current;
    if (!item || from === to) return;

    setBoard(prev => {
      const copy = { ...prev };
      copy[from] = copy[from].filter(t => t !== item);
      copy[to] = [...copy[to], item];
      return copy;
    });
  }

  function onContainerDragStart(container) {
    dragContainer.current = container;
  }

  function onContainerDrop(target) {
    const from = dragContainer.current;
    if (from === target) return;

    setOrder(prev => {
      const arr = [...prev];
      const fromIndex = arr.indexOf(from);
      const toIndex = arr.indexOf(target);
      arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, from);
      return arr;
    });
  }
}
