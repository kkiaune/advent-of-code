const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8");
input = input.split(/\r?\n/).map((row) => row.split("   "));
const firstCol = input.map((row) => row[0]);
const secondCol = input.map((row) => row[1]);

const firstSolution = () => {
  const firstColSorted = firstCol.sort();
  const secondColSorted = secondCol.sort();
  const distances = firstColSorted.map((firstColValue, index) =>
    Math.abs(firstColValue - secondColSorted[index])
  );

  return distances.reduce((acc, value) => acc + value, 0);
};

console.log("first part result:", firstSolution());

const secondSolution = () => {
  const similarity = firstCol.map(
    (firstColValue) =>
      firstColValue *
      secondCol.filter((secondColValue) => secondColValue === firstColValue)
        .length
  );

  return similarity.reduce((acc, value) => acc + value, 0);
};

console.log("second part result:", secondSolution());
