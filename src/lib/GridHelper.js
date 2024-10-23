export const initGrid = (rows, cols) =>
  Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      row,
      col,
      isBlocked: false,
      isGoal: false,
      isStart: false,
      individual: 0,
      r: 255,
      g: 255,
      b: 255,
    }))
  );
export const hardCopy = (grid) => {
  return grid.map((r, i) => r.map((cell, j) => ({ ...cell })));
};
export const findStartCell = (grid) => {
  for (const row of grid) {
    const startCell = row.find((cell) => cell.isStart);
    if (startCell) return startCell;
  }
  return null;
};
export const findGoalCell = (grid) => {
  for (const row of grid) {
    const startCell = row.find((cell) => cell.isGoal);
    if (startCell) return startCell;
  }
  return null;
};
export const initPopulation = (populationSize, startCell) => {
  return Array.from({ length: populationSize }, () => ({
    row: startCell.row,
    col: startCell.col,
    path: initPath(populationSize),
    r: 255,
    g: 255,
    b: 255,
  }));
};

const initPath = (pathSize) => {
  const queue = [];
  for (let i = 0; i < pathSize; i++) {
    const randomNumber = Math.floor(Math.random() * 5);
    queue.push(randomNumber);
  }
  return queue;
};
