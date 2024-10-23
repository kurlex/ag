const sortPopulation = (population, goalCell) => {
  const calculateDistance = (point, goal) =>
    Math.abs(point.row - goal.row) + Math.abs(point.col - goal.col);

  const sortedPopulation = [...population].sort((a, b) => {
    const distanceA = calculateDistance(a, goalCell);
    const distanceB = calculateDistance(b, goalCell);
    return distanceA - distanceB;
  });

  return sortedPopulation;
};

const selectSurvivals = (population, goalCell) => {
  const numberOfParentToPick = Math.max(Math.floor(population.length / 2), 1);
  return sortPopulation(population, goalCell).slice(0, numberOfParentToPick);
};

const merge = (parent1, parent2) => {
  let child1 = {
    ...parent1,
    r: Math.max(parent1.r - 20, 0),
    b: Math.max(parent1.b - 20, 0),
    g: Math.max(parent1.g - 20, 0),
    path: [],
  };
  let child2 = {
    ...parent2,
    r: Math.max(parent2.r - 20, 0),
    b: Math.max(parent2.b - 20, 0),
    g: Math.max(parent2.g - 20, 0),
    path: [],
  };
  let i = 0;
  let toPick = 1;
  const pathSize = parent1.path.length;
  while (i < pathSize) {
    const increment = Math.floor(Math.random() * pathSize) + 1;
    const parent1Slice = parent1.path.slice(i, increment);
    const parent2Slice = parent2.path.slice(i, increment);
    if (toPick === 1) {
      child1.path = [...child1.path, ...parent1Slice];
      child2.path = [...child2.path, ...parent2Slice];
      toPick = 2;
    } else {
      child1.path = [...child1.path, ...parent2Slice];
      child2.path = [...child2.path, ...parent1Slice];
      toPick = 1;
    }
    i += increment;
  }

  return [child1, child2];
};

const mutate = (cell) => {
  const pathSize = cell.path.length;
  const numberOfMutations = Math.max(1, Math.floor(0.1 * pathSize));
  for (let i = 0; i < numberOfMutations; i++) {
    const indexToMutate = Math.floor(Math.random() * pathSize);
    cell.path[indexToMutate] = Math.floor(Math.random() * 5);
  }
  return cell;
};

export const generateNextPopulation = (
  previousPopulation,
  startCell,
  goalCell
) => {
  const survivals = selectSurvivals(previousPopulation, goalCell);
  let newPopulation = [];
  for (let i = 0; i + 1 < survivals.length; i += 2) {
    newPopulation.push(survivals[i]);
    newPopulation.push(survivals[i + 1]);
    const [child1, child2] = merge(survivals[i], survivals[i + 1]);
    newPopulation.push(mutate(child1));
    newPopulation.push(mutate(child2));
  }

  if (survivals.length % 2 === 1)
    newPopulation.push(survivals[survivals.length - 1]);
  const toReturn = newPopulation.map((cell) => ({
    ...cell,
    row: startCell.row,
    col: startCell.col,
  }));
  console.log(toReturn);
  return toReturn;
};

export const generateNextPopulationMove = (grid, previousPopulation, step) => {
  const dx = [0, -1, 0, 1];
  const dy = [-1, 0, 1, 0];
  const Rows = grid.length;
  const Cols = Rows > 0 ? grid[0].length : 1;

  return previousPopulation.map((cell, j) => {
    const nextMove = cell.path[step - 1];
    const newRow = cell.row + dx[nextMove];
    const newCol = cell.col + dy[nextMove];
    const isValid =
      newRow >= 0 &&
      newRow < Rows &&
      newCol >= 0 &&
      newCol < Cols &&
      !grid[newRow][newCol].isBlocked;
    return {
      ...cell,
      row: isValid ? newRow : cell.row,
      col: isValid ? newCol : cell.col,
    };
  });
};
