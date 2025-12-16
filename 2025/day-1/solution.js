const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8");
input = input.split(/\r?\n/);

const firstSolution = () => {
  let current = 50;
  let result = 0;

  input.forEach((rotation) => {
    let [direction, value] = rotation.split(/(?<=\D)(?=\d)/);
    let newCurrent = current;

    value = +value;

    if (value > 99) {
      value = value % 100;
    }

    if (direction === "L") {
      newCurrent -= value;
    } else {
      newCurrent += value;
    }

    if (newCurrent > 99) {
      newCurrent -= 100;
    } else if (newCurrent < 0) {
      newCurrent += 100;
    }

    if (newCurrent === 0) {
      result += 1;
    }

    current = newCurrent;
  });

  return result;
};

console.log("first part result:", firstSolution());

const secondSolution = () => {
  let current = 50;
  let result = 0;

  input.forEach((rotation) => {
    let [direction, value] = rotation.split(/(?<=\D)(?=\d)/);
    let newCurrent = current;
    let wrapped = false;
    value = +value;

    if (value > 99) {
      result += Math.floor(value / 100);
      value = value % 100;
    }

    if (direction === "L") {
      newCurrent -= value;
    } else {
      newCurrent += value;
    }

    if (newCurrent > 99) {
      newCurrent -= 100;
      wrapped = true;
    } else if (newCurrent < 0) {
      newCurrent += 100;
      wrapped = true;
    }

    if (newCurrent === 0 || (wrapped && current !== 0 && newCurrent !== 0)) {
      result += 1;
    }

    current = newCurrent;
  });

  return result;
};

console.log("second part result:", secondSolution());
