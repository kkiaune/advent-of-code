const fs = require("fs");
let points = fs.readFileSync("input.txt", "utf-8");
points = points.split(/\r?\n/).map((point) => point.split(",").map(Number));

const firstSolution = () => {
  let biggestArea = 0;

  for (let [x1, y1] of points) {
    for (let [x2, y2] of points) {
      const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);

      if (area > biggestArea) {
        biggestArea = area;
      }
    }
  }

  return biggestArea;
};

console.log("first part result:", firstSolution());

const secondSolution = () => {
  let biggestArea = 0;
  const edges = [];

  const buildLine = (x1, y1, x2, y2) => ({
    x1: Math.min(x1, x2),
    y1: Math.min(y1, y2),
    x2: Math.max(x1, x2),
    y2: Math.max(y1, y2),
  });

  const isIntersecting = ({ x1, y1, x2, y2 }) =>
    edges.some(
      (line) => line.x1 < x2 && line.y1 < y2 && line.x2 > x1 && line.y2 > y1
    );

  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;

    edges.push(buildLine(...points[i], ...points[j]));
  }

  for (let i = 0; i < points.length; i++) {
    const [x1, y1] = points[i];
    for (let j = i + 1; j < points.length; j++) {
      const [x2, y2] = points[j];

      if (isIntersecting(buildLine(x1, y1, x2, y2))) {
        continue;
      }

      const area = (Math.abs(x2 - x1) + 1) * (Math.abs(y2 - y1) + 1);

      if (area > biggestArea) {
        biggestArea = area;
      }
    }
  }

  return biggestArea;
};

console.log("second part result:", secondSolution());
