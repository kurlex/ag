import React, { useState, useEffect } from "react";
import Grid from "./Grid/Grid";
import { initPopulation, findStartCell, findGoalCell } from "../lib/GridHelper";
import { generateNextPopulationMove, generateNextPopulation } from "../lib/AG";
const Simulate = ({ grid }) => {
  const Rows = grid.length;
  const Cols = Rows > 0 ? grid[0].length : 1;
  const startCell = findStartCell(grid);
  const goalCell = findGoalCell(grid);
  const populationSize = 3 * Math.max(Rows, Cols);
  const [state, setState] = useState({
    generation: 1,
    step: 1,
    population: initPopulation(populationSize, startCell),
    winningElement: null,
  });
  const direction = ["←", "↑", "→", "↓"];
  const getWinningElement = (population) => {
    let we = null;
    population.forEach((element) => {
      if (element.row === goalCell.row && element.col === goalCell.col)
        we = element;
    });
    return we;
  };
  useEffect(() => {
    if (!!state.winningElement) return;
    if (state.step > populationSize) {
      setState((oldState) => ({
        generation: oldState.generation + 1,
        step: 1,
        winningElement: getWinningElement(oldState.population),
        population: generateNextPopulation(
          oldState.population,
          startCell,
          goalCell
        ),
      }));
      return;
    }
    const interval = setInterval(() => {
      setState((oldState) => ({
        step: oldState.step + 1,
        generation: oldState.generation,
        population: generateNextPopulationMove(
          grid,
          oldState.population,
          oldState.step
        ),
        winningElement: null,
      }));
    }, 200);

    return () => clearInterval(interval);
  }, [grid, Rows, Cols, state, populationSize]);
  return (
    <>
      <h2>Finding Best Path</h2>
      <h2>Generation: {state.generation}</h2>
      {!!state.winningElement && (
        <>
          <span>Path: </span>
          {state.winningElement.path.map((e) => direction[e])}
        </>
      )}
      <Grid grid={grid} population={state.population} />
      <p>
        Step {state.step} / {populationSize + 1}
      </p>
    </>
  );
};

export default Simulate;
