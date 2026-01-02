import React, { useRef, useState } from "react";
import "./styles.scss";

const initialBoard = {
  todo: {
    title: "Todo",
    cards: ["Task A", "Task B"]
  },
  doing: {
    title: "Doing",
    cards: ["Task C"]
  },
  done: {
    title: "Done",
    cards: ["Task D"]
  }
};

export default function App() {
  const [board, setBoard] = useState(initialBoard);

  const dragCard = useRef(null);
  const dragFromColumn = useRef(null);

  const allowDrop = e => e.preventDefault();

  const handleCardDragStart = (card, columnKey) => {
    dragCard.current = card;
    dragFromColumn.current = columnKey;
  };

  const handleCardDrop = (toColumn) => {
    const card = dragCard.current;
    const from = dragFromColumn.current;

    if (!card || from === toColumn) return;

    setBoard(prev => {
      const copy = { ...prev };

      copy[from].cards = copy[from].cards.filter(c => c !== card);
      copy[toColumn].cards = [...copy[toColumn].cards, card];

      return copy;
    });
  };

  return (
    <div className="board">
      {Object.entries(board).map(([key, column]) => (
        <div
          key={key}
          className="column"
          onDragOver={allowDrop}
          onDrop={() => handleCardDrop(key)}
        >
          <h3>{column.title}</h3>

          {column.cards.map(card => (
            <div
              key={card}
              className="card"
              draggable
              onDragStart={() =>
                handleCardDragStart(card, key)
              }
            >
              {card}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
