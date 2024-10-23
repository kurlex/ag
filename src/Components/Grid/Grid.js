import React from "react";
import "./Grid.css";
import Cell from "../Cell/Cell";
import { hardCopy } from "../../lib/GridHelper";

const Grid = ({ grid, handleCellClick, population }) => {
  let newGrid = hardCopy(grid);
  if (population) {
    population.forEach((element) => {
      const oldCell = newGrid[element.row][element.col];
      newGrid[element.row][element.col] = {
        ...oldCell,
        individual: oldCell.individual + 1,
        r: Math.min(element.r, oldCell.r),
        g: Math.min(element.g, oldCell.g),
        b: Math.min(element.b, oldCell.b),
      };
    });
  }
  // console.log(newGrid);
  const onClick = (x, y) => {
    if (!!handleCellClick) handleCellClick(x, y);
  };

  return (
    <div className="grid-container">
      {newGrid.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="grid-row">
          {row.map((cell) => (
            <Cell cell={cell} onClick={onClick} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Grid;
