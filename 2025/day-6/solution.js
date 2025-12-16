const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8");
input = input.split(/\r?\n/);

const firstSolution = () => {
  const numberLines = [];
  const actionLines = [];

  input.forEach((line) => {
    const parts = line.split(/ +/).filter(Boolean);
    if (parts[0] === "+" || parts[0] === "*") {
      actionLines.push(parts);
    } else {
      numberLines.push(parts);
    }
  });

  let total = 0;

  actionLines.forEach((actions) => {
    for (let i = 0; i < actions.length; i++) {
      total += numberLines.reduce((acc, numbers) => {
        const value = +numbers[i];

        if (acc === 0) {
          return value;
        }

        return actions[i] === "*" ? acc * value : acc + value;
      }, 0);
    }
  });

  return total;
};

console.log("first part result:", firstSolution());

const secondSolution = () => {
  const height = input.length;
  const width = input[0].length;
  let numbers = [];
  let total = 0;

  for (let x = width - 1; x >= 0; x--) {
    let column = "";

    for (let y = 0; y < height; y++) {
      column += input[y][x];
    }

    if (Number(column)) {
      numbers.push(+column);
      continue;
    }

    if (column[height - 1] !== " ") {
      const [lastNumber, ...actions] = column.split(/([+*])/).filter(Boolean);

      for (action of actions) {
        total += numbers.reduce(
          (acc, number) => (action === "*" ? acc * number : acc + number),
          +lastNumber
        );
      }

      numbers = [];
    }
  }

  return total;
};

console.log("second part result:", secondSolution());
