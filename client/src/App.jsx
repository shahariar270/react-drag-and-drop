import React, { useRef, useState } from "react";
import './styles.scss'

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

  const handleDragStart = (columnIndex, cardIndex) => {
    dragColumnIndex.current = columnIndex;
    dragCardIndex.current = cardIndex;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (toColumnIndex, toCardIndex) => {
    const fromColumnIndex = dragColumnIndex.current;
    const fromCardIndex = dragCardIndex.current;

    if (fromColumnIndex === null || fromCardIndex === null) return;

    setColumn(prev => {
      const copy = [...prev];

      const fromCards = [...copy[fromColumnIndex].cards];
      const movedCard = fromCards.splice(fromCardIndex, 1)[0];

      const toCards = [...copy[toColumnIndex].cards];
      toCards.splice(toCardIndex, 0, movedCard);

      copy[fromColumnIndex] = { ...copy[fromColumnIndex], cards: fromCards };
      copy[toColumnIndex] = { ...copy[toColumnIndex], cards: toCards };

      return copy;
    });

    dragColumnIndex.current = null;
    dragCardIndex.current = null;
  };

  const handleColDragStart = (dropIndex) => {
    dragColumnIndex.current = dropIndex;
  };

  const handleColDragOver = (e) => {
    e.preventDefault();
  };

  const handleColumnDrop = (dropIndex) => {
    const fromIndex = dragColumnIndex.current;
    if (fromIndex === dropIndex) return;

    setColumn(prev => {
      const shallowCopy = [...prev];
      const move = shallowCopy.splice(fromIndex, 1)[0];
      shallowCopy.splice(dropIndex, 0, move)
      return shallowCopy;
    })



  };

  return (
    <div className="column-wrapper">
      {column.map((col, colIndex) => (
        <div
          key={col.title}
          className="column"

        >
          <h3
            draggable
            onDragStart={() =>
              handleColDragStart(colIndex)
            }
            onDragOver={handleColDragOver}
            onDrop={() =>
              handleColumnDrop(colIndex)
            }

          >{col.title}</h3>

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
