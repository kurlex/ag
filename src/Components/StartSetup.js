import React from "react";
import Grid from "./Grid/Grid";

const StartSetup = ({ grid, setGrid }) => {
  const handleCellClick = (x, y) => {
    setGrid((oldGrid) =>
      oldGrid.map((r, i) =>
        r.map((cell, j) =>
          i === x && j === y
            ? { ...cell, isStart: true }
            : { ...cell, isStart: false }
        )
      )
    );
  };
  return (
    <>
      <h2>Click on a cell to mark it as start</h2>
      <Grid grid={grid} handleCellClick={handleCellClick} />
    </>
  );
};

export default StartSetup;
