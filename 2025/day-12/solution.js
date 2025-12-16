const fs = require("fs");
const input = fs
  .readFileSync("input.txt", "utf-8")
  .split(/\r?\n/)
  .map((line) => {
    if (!line.includes("x")) return undefined;

    const [dimensions, counts] = line.split(": ");

    return [
      ...dimensions.split("x"),
      counts.split(" ").reduce((acc, count) => acc + Number(count), 0),
    ];
  })
  .filter(Boolean);

const firstSolution = () =>
  input.reduce(
    (acc, [x, y, total]) =>
      acc + (total <= Math.floor(x / 3) * Math.floor(y / 3)),
    0
  );

console.log("first part result:", firstSolution());
