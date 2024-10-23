import React from "react";
import "./Cell.css";

const Cell = ({ cell, onClick }) => {
  const backgroundColor = `rgb(${cell.r}, ${cell.g}, ${cell.b})`;
  //console.log(cell, backgroundColor);
  return (
    <div
      key={`${cell.row}-${cell.col}`}
      className={`grid-cell ${cell.isBlocked ? "blocked" : ""} ${
        cell.isGoal ? "goal" : ""
      }${cell.isStart ? "start" : ""} `}
      onClick={() => onClick(cell.row, cell.col)}
    >
      {cell.individual > 0 && (
        <div className="circle" style={{ backgroundColor }}>
          {cell.individual}
        </div>
      )}
    </div>
  );
};

export default Cell;
