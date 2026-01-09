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
    },
    {
      title: 'in progress',
      cards: []
    }
  ]);
  const dragCardFromColumn = useRef(null);
  const dragCardFromIndex = useRef(null);

  const dragColumnFromIndex = useRef(null);


  const handleDragStart = (columnIndex, cardIndex) => {
    dragCardFromColumn.current = columnIndex;
    dragCardFromIndex.current = cardIndex;
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (toColumnIndex, toCardIndex) => {
    const fromColumnIndex = dragCardFromColumn.current;
    const fromCardIndex = dragCardFromIndex.current;

    if (
      fromColumnIndex === null ||
      fromCardIndex === null
    ) return;

    if (
      fromColumnIndex === toColumnIndex &&
      fromCardIndex === toCardIndex
    ) return;

    setColumn(prev => {
      const copy = structuredClone(prev);

      const movedCard =
        copy[fromColumnIndex].cards.splice(fromCardIndex, 1)[0];
      const toCards = copy[toColumnIndex].cards;

      if (toCards.length === 0) {
        toCards.push(movedCard);
      } else {
        toCards.splice(toCardIndex, 0, movedCard);
      }

      return copy;
    });

    dragCardFromColumn.current = null;
    dragCardFromIndex.current = null;
  };

  const handleColDragStart = (index) => {
    dragColumnFromIndex.current = index;
  };

  const handleColDragOver = (e) => {
    e.preventDefault();
  };

  const handleColumnDrop = (dropIndex) => {
    const fromIndex = dragColumnFromIndex.current;

    if (fromIndex === null || fromIndex === dropIndex) return;

    setColumn(prev => {
      const copy = [...prev];
      const moved = copy.splice(fromIndex, 1)[0];
      copy.splice(dropIndex, 0, moved);
      return copy;
    });

    dragColumnFromIndex.current = null;
  };


  return (
    <div className="column-wrapper">
      {column.map((col, colIndex) => (
        <div
          key={col.title}
          className="column"
          onDragOver={handleDragOver}
          onDrop={() => {
            if (col.cards.length === 0) {
              handleDrop(colIndex, 0);
            }
          }}
        >
          <h3
            draggable
            onDragStart={() => handleColDragStart(colIndex)}
            onDragOver={handleColDragOver}
            onDrop={() => handleColumnDrop(colIndex)}
          >
            {col.title}
          </h3>

          {col.cards.map((card, cardIndex) => (
            <div
              key={card}
              draggable
              onDragStart={() => handleDragStart(colIndex, cardIndex)}
              onDragOver={handleDragOver}
              onDrop={() => handleDrop(colIndex, cardIndex)}
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
