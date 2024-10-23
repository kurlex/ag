import React from "react";
import Grid from "./Grid/Grid";

const GoalSetup = ({ grid, setGrid }) => {
  const handleCellClick = (x, y) => {
    setGrid((oldGrid) =>
      oldGrid.map((r, i) =>
        r.map((cell, j) =>
          i === x && j === y && !cell.isStart
            ? { ...cell, isGoal: true }
            : { ...cell, isGoal: false }
        )
      )
    );
  };
  return (
    <>
      <h2>Click on a cell to mark it as goal</h2>
      <Grid grid={grid} handleCellClick={handleCellClick} />
    </>
  );
};

export default GoalSetup;
