const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8");
input = input.split(/\r?\n/).map((row) => Array.from(row));

const getPossibleNeighboursCount = (grid) => {
  const rolls = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] !== "@") continue;

      let neighbours = 0;

      for (let rowOffset = -1; rowOffset <= 1; rowOffset++) {
        for (let colOffset = -1; colOffset <= 1; colOffset++) {
          if (rowOffset === 0 && colOffset === 0) continue;

          if (grid?.[row + rowOffset]?.[col + colOffset] === "@") neighbours++;
        }
      }

      if (neighbours < 4) {
        rolls.push([row, col]);
      }
    }
  }

  rolls.forEach(([row, col]) => {
    grid[row][col] = "x";
  });

  return rolls.length;
};

const firstSolution = () => {
  const grid = JSON.parse(JSON.stringify(input));

  return getPossibleNeighboursCount(grid);
};

console.log("first part result:", firstSolution());

const secondSolution = () => {
  const grid = JSON.parse(JSON.stringify(input));
  let totalSum = 0;

  while (true) {
    const count = getPossibleNeighboursCount(grid);

    if (count === 0) {
      break;
    }

    totalSum += count;
  }

  return totalSum;
};

console.log("second part result:", secondSolution());
