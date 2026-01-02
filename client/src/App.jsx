import React, { useRef, useState } from "react";

export default function App() {
  const [column, setColumn] = useState([
    {
      title: "Todo",
      cards: ["Task A", "Task B", "Task C"]
    },
    {
      title: "Done",
      cards: ["Task e", "Task d", "Task f"]
    }
  ]);

  const dragColumnIndex = useRef(null);
  const dragCardIndex = useRef(null);


  const dragIndex = useRef(null);

  const handleDragStart = (columnIndex, cardIndex) => {
    dragColumnIndex.current = columnIndex;
    dragCardIndex.current = cardIndex;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (columnIndex, dropIndex) => {
    if (dragColumnIndex.current !== columnIndex) return;

    const fromIndex = dragCardIndex.current;
    if (fromIndex === dropIndex) return;

    setColumn(prev => {
      const copy = [...prev];
      const cards = [...copy[columnIndex].cards];

      const moved = cards.splice(fromIndex, 1)[0];
      cards.splice(dropIndex, 0, moved);

      copy[columnIndex] = {
        ...copy[columnIndex],
        cards
      };

      return copy;
    });
  };

  return (
    <div style={{ padding: 40 }}>
      {column.map((col, colIndex) => (
        <div key={col.title}>
          <h3>{col.title}</h3>

          {col.cards.map((card, cardIndex) => (
            <div
              key={card}
              draggable
              onDragStart={() =>
                handleDragStart(colIndex, cardIndex)
              }
              onDragOver={handleDragOver}
              onDrop={() =>
                handleDrop(colIndex, cardIndex)
              }
              style={{
                background: "#fff",
                padding: 10,
                marginBottom: 8,
                border: "1px solid #ccc",
                cursor: "grab"
              }}
            >
              {card}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
