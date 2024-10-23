import React from "react";
import Grid from "../Grid/Grid";
import { initGrid } from "../../lib/GridHelper";

const DimensionSetup = ({ grid, setGrid }) => {
  const Rows = grid.length;
  const Cols = Rows > 0 ? grid[0].length : 1;
  const handleChangeRow = (e) => {
    const { value } = e.target;

    setGrid((oldGrid) => {
      let oldRow = oldGrid.length;
      let oldCol = oldRow > 0 ? oldGrid[0].length : 1;
      return initGrid(Math.max(1, Number(value)), oldCol);
    });
  };

  const handleChangeCol = (e) => {
    const { value } = e.target;

    setGrid((oldGrid) => {
      let oldRow = oldGrid.length;
      return initGrid(oldRow, Math.max(1, Number(value)));
    });
  };

  return (
    <>
      <h2>Select Dimensions</h2>
      <div style={{ marginBottom: "16px" }}>
        <label>
          Rows:{" "}
          <input
            type="number"
            name="rows"
            value={Rows}
            onChange={handleChangeRow}
            min="1"
          />
        </label>
        <label style={{ marginLeft: "10px" }}>
          Cols:{" "}
          <input
            type="number"
            name="cols"
            value={Cols}
            onChange={handleChangeCol}
            min="1"
          />
        </label>
      </div>
      <Grid grid={grid} setGrid={setGrid} isInteractive={false} />
    </>
  );
};

export default DimensionSetup;
