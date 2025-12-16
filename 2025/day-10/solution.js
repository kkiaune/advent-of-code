const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8");
input = input.split(/\r?\n/);

const findMinimum = (expected, current, commands, depth = 1) => {
  let minimum = 0;

  for (let i = 0; i < commands.length; i++) {
    const newCurrent = current.slice();

    for (const button of commands[i]) {
      newCurrent[button] = !newCurrent[button];
    }

    if (expected.join("") === newCurrent.join("")) {
      return depth;
    }

    const newMinimum = findMinimum(
      expected,
      newCurrent,
      commands.slice(i + 1),
      depth + 1
    );

    if (newMinimum > 0 && (minimum === 0 || newMinimum < minimum)) {
      minimum = newMinimum;
    }
  }

  return minimum;
};

const firstSolution = () => {
  let result = 0;

  input.forEach((line) => {
    let diagram;
    let instructions = [];
    let joltage;

    for (let part of line.split(" ")) {
      if (part.includes("[")) {
        diagram = part
          .slice(1, -1)
          .split("")
          .map((c) => c === "#");
      }

      if (part.includes("(")) {
        instructions.push(part.slice(1, -1).split(",").map(Number));
      }

      if (part.includes("{")) {
        joltage = part
          .slice(1, part.length - 1)
          .split(",")
          .map(Number);
      }
    }

    result += findMinimum(
      diagram,
      Array(diagram.length).fill(false),
      instructions
    );
  });

  return result;
};

console.log("first part result:", firstSolution());

const secondSolution = () => {
  return "NOPE";
};

console.log("second part result:", secondSolution());
