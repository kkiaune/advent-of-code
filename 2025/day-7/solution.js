const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8");
input = input.split(/\r?\n/).map((line) => Array.from(line));

const solve = () => {
  let splits = 0;
  let paths = input[0].map(() => 0);

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i][j] === ".") {
        continue;
      }

      if (["S", "|"].includes(input[i][j]) && input?.[i + 1]?.[j] === ".") {
        input[i + 1][j] = "|";
        continue;
      }

      if (input[i][j] === "|" && input?.[i + 1]?.[j] === "^") {
        input[i + 1][j - 1] = "|";
        input[i + 1][j + 1] = "|";
        paths[j - 1] += paths[j] || 1;
        paths[j + 1] += paths[j] || 1;
        paths[j] = 0;

        splits++;
      }
    }
  }

  console.log("first part result:", splits);
  console.log(
    "second part result:",
    paths.reduce((acc, current) => acc + current)
  );
};

solve();
