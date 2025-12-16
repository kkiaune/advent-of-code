const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8");
input = input
  .split(/\r?\n/)
  .map((line) => line.split(","))
  .flat()
  .filter(Boolean);

const firstSolution = () => {
  let sum = 0;

  input.forEach((range) => {
    let [start, end] = range.split("-").map(Number);

    for (let i = start; i <= end; i++) {
      const id = String(i);

      for (let size = 1; size <= id.length / 2; size++) {
        const firstPart = id.substring(0, size);
        const secondPart = id.substring(size);

        if (firstPart === secondPart) {
          sum += i;
        }
      }
    }
  });

  return sum;
};

console.log("first part result:", firstSolution());

const secondSolution = () => {
  let sum = 0;

  const splitStringIntoParts = (str, partLength) => {
    const result = [];

    for (let i = 0; i < str.length; i += partLength) {
      result.push(str.slice(i, i + partLength));
    }

    return result;
  };

  input.forEach((range) => {
    let [start, end] = range.split("-").map(Number);

    for (let i = start; i <= end; i++) {
      const id = String(i);

      for (let size = 1; size <= id.length / 2; size++) {
        const left = id.substring(0, size);
        const rightParts = splitStringIntoParts(id.substring(size), size);

        if (rightParts.every((part) => part === left)) {
          sum += i;
          break;
        }
      }
    }
  });

  return sum;
};

console.log("second part result:", secondSolution());
