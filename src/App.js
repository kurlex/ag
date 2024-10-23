import "./App.css";
import React, { useState } from "react";
import DimensionSetup from "./Components/DimensionSetup/DimensionSetup";
import { initGrid } from "./lib/GridHelper";
import BlockingBlocksSetup from "./Components/BlockingBlocksSetup";
import GoalSetup from "./Components/GoalSetup";
import StartSetup from "./Components/StartSetup";
import Simulate from "./Components/Simulate";

const App = () => {
  const [grid, setGrid] = useState(initGrid(5, 5));
  const [page, setPage] = useState(1);
  const handleNext = () => {
    setPage((prevPage) => prevPage + 1);
  };
  return (
    <div className="App">
      {page === 1 && <DimensionSetup grid={grid} setGrid={setGrid} />}
      {page === 2 && <StartSetup grid={grid} setGrid={setGrid} />}
      {page === 3 && <GoalSetup grid={grid} setGrid={setGrid} />}
      {page === 4 && <BlockingBlocksSetup grid={grid} setGrid={setGrid} />}
      {page === 5 && <Simulate grid={grid} />}
      {page <= 4 && (
        <div className="pagination-container">
          <button onClick={handleNext} className="next-button">
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
