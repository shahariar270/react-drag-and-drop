import React, { useRef, useState } from "react";

export default function App() {
  const [column, setColumn] = useState({
    title: "Todo",
    cards: ["Task A", "Task B", "Task C"]
  });

  const dragIndex = useRef(null);

  const handleDragStart = (index) => {
    dragIndex.current = index;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (dropIndex) => {
    const fromIndex = dragIndex.current;
    if (fromIndex === dropIndex) return;

    setColumn(prev => {
      const newCards = [...prev.cards];
      const moved = newCards.splice(fromIndex, 1)[0];
      newCards.splice(dropIndex, 0, moved);

      return {
        ...prev,
        cards: newCards
      };
    });
  };

  return (
    <div style={{ padding: 40 }}>
      <h3>{column.title}</h3>

      {column.cards.map((card, index) => (
        <div
          key={card}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragOver={handleDragOver}
          onDrop={() => handleDrop(index)}
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
  );
}
