const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8");
input = input.replaceAll(/\r?\n/g, "");

const firstSolution = () => {
  return [...input.matchAll(/mul\(\d{1,3},\d{1,3}\)/g)]
    .map((match) => match[0])
    .map((command) => {
      const [firstNumber, secondNumber] = command
        .replaceAll("mul", "")
        .replaceAll("(", "")
        .replaceAll(")", "")
        .split(",");

      return Number(firstNumber) * Number(secondNumber);
    })
    .reduce((acc, commandResult) => acc + commandResult, 0);
};

console.log("first part result:", firstSolution());

const secondSolution = () => {
  let shouldAdd = true;

  return [...input.matchAll(/mul\(\d{1,3},\d{1,3}\)|do\(\)|don't\(\)/g)]
    .map((match) => match[0])
    .map((command) => {
      if (command === "do()") {
        shouldAdd = true;
        return;
      } else if (command === "don't()") {
        shouldAdd = false;
        return;
      }

      if (shouldAdd) {
        const [firstNumber, secondNumber] = command
          .replaceAll("mul", "")
          .replaceAll("(", "")
          .replaceAll(")", "")
          .split(",");

        return Number(firstNumber) * Number(secondNumber);
      }

      return;
    })
    .filter(Boolean)
    .reduce((acc, commandResult) => acc + commandResult, 0);
};

console.log("second part result:", secondSolution());
