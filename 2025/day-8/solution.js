const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8");
input = input.split(/\r?\n/);

const solve = () => {
  const distances = [];

  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const [x1, y1, z1] = input[i].split(",");
      const [x2, y2, z2] = input[j].split(",");
      const distance = Math.sqrt(
        Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2) + Math.pow(z1 - z2, 2)
      );

      distances.push([input[i], input[j], distance]);
    }
  }

  distances.sort((a, b) => a[2] - b[2]);

  const circuits = input.map((coordinate) => [coordinate]);

  for (let i = 0; i < distances.length; i++) {
    const distance = distances[i];

    if (i === 1000) {
      console.log(
        "first part result:",
        circuits
          .sort((a, b) => b.length - a.length)
          .slice(0, 3)
          .reduce((acc, circuit) => acc * circuit.length, 1)
      );
    }

    if (
      circuits.find(
        (circuit) =>
          circuit.includes(distance[0]) && circuit.includes(distance[1])
      )
    ) {
      continue;
    }

    const circuit1 = circuits.find((circuit) => circuit.includes(distance[0]));
    const circuit2 = circuits.find((circuit) => circuit.includes(distance[1]));

    circuit1.push(...circuit2);
    circuits.splice(circuits.indexOf(circuit2), 1);

    if (circuits.length === 1) {
      console.log(
        "second part result:",
        distance[0].split(",")[0] * distance[1].split(",")[0]
      );
      break;
    }
  }
};

solve();
