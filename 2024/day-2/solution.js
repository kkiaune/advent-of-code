const fs = require("fs");
// let input = fs.readFileSync("test.txt", "utf-8");
let input = fs.readFileSync("input.txt", "utf-8");
input = input.split(/\r?\n/).map((row) => row.split(/\s+/).map(Number));

const isSafe = (row) => {
  let increasing = true;

  if (row.length >= 2) {
    increasing = row[1] > row[0];
  }

  for (let i = 0; i < row.length; i++) {
    const current = row[i];
    const next = row[i + 1];
    const diff = Math.abs(current - next);

    if (diff > 3 || diff === 0) {
      return false;
    }

    if (increasing && current > next) {
      return false;
    }

    if (!increasing && current < next) {
      return false;
    }
  }

  return true;
};

const firstSolution = () => {
  return input.reduce((acc, row) => acc + (isSafe(row) ? 1 : 0), 0);
};

console.log("first part result:", firstSolution());

const secondSolution = () => {
  return input.reduce((acc, row) => {
    if (isSafe(row)) {
      return acc + 1;
    }

    for (let i = 0; i < row.length; i++) {
      const rowCopy = JSON.parse(JSON.stringify(row));
      // remove item
      rowCopy.splice(i, 1);

      if (isSafe(rowCopy)) {
        return acc + 1;
      }
    }

    return acc;
  }, 0);
};

console.log("second part result:", secondSolution());
