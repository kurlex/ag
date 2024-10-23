import React from "react";
import Grid from "./Grid/Grid";

const BlockingBlocksSetup = ({ grid, setGrid }) => {
  const handleCellClick = (x, y) => {
    setGrid((oldGrid) =>
      oldGrid.map((r, i) =>
        r.map((cell, j) =>
          i === x && j === y && !cell.isStart && !cell.isGoal
            ? { ...cell, isBlocked: !cell.isBlocked }
            : cell
        )
      )
    );
  };
  return (
    <>
      <h2>Click on a cell to mark it as blocking bloc</h2>
      <Grid grid={grid} handleCellClick={handleCellClick} />
    </>
  );
};

export default BlockingBlocksSetup;
