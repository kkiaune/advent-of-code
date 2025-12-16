const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8");
input = input.split(/\r?\n/).reduce((acc, line) => {
  const [start, ends] = line.split(": ");

  return { ...acc, [start]: [...(acc[start] ?? []), ...ends.split(" ")] };
}, {});

const firstSolution = () => {
  const solve = (paths) => {
    let sum = 0;

    for (let path of paths) {
      if (path === "out") return 1;

      if (input[path]) {
        sum += solve(input[path]);
      }
    }

    return sum;
  };

  return solve(input["you"]);
};

console.log("first part result:", firstSolution());

const secondSolution = () => {
  const cache = new Map();

  const solve = (current, paths, foundFirst, foundSecond) => {
    foundFirst |= current === "fft";
    foundSecond |= current === "dac";

    const key = `${current},${foundFirst},${foundSecond}`;

    if (cache.has(key)) return cache.get(key);

    let sum = 0;

    for (let path of paths) {
      if (path === "out") return foundFirst && foundSecond ? 1 : 0;

      if (input[path]) {
        sum += solve(path, input[path], foundFirst, foundSecond);
      }
    }

    cache.set(key, sum);

    return sum;
  };

  return solve("svr", input["svr"], false, false);
};

console.log("second part result:", secondSolution());
