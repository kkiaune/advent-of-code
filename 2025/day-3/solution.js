const fs = require("fs");
let input = fs.readFileSync("input.txt", "utf-8");
input = input.split(/\r?\n/);

const firstSolution = () => {
  let joltageSum = 0;

  input.forEach((batteriesBank) => {
    let highestJoltage = 0;

    for (
      let firstBatteryIndex = 0;
      firstBatteryIndex < batteriesBank.length;
      firstBatteryIndex++
    ) {
      for (
        let secondBatteryIndex = firstBatteryIndex + 1;
        secondBatteryIndex <= batteriesBank.length;
        secondBatteryIndex++
      ) {
        const joltage = Number(
          `${batteriesBank[firstBatteryIndex]}${batteriesBank[secondBatteryIndex]}`
        );

        if (joltage > highestJoltage) {
          highestJoltage = joltage;
        }
      }
    }

    joltageSum += highestJoltage;
    highestJoltage = 0;
  });

  return joltageSum;
};

console.log("first part result:", firstSolution());

const secondSolution = () => {
  let joltageSum = 0;

  input.forEach((batteriesBank) => {
    let start = 0;
    let end = batteriesBank.length - 12;
    const result = [];

    while (result.length < 12) {
      const slice = batteriesBank.slice(start, end + 1);
      const max = Math.max(...slice);
      const maxIndex = slice.indexOf(max);

      result.push(max);
      start += maxIndex + 1;
      end++;
    }

    joltageSum += Number(result.join(""));
  });

  return joltageSum;
};

console.log("second part result:", secondSolution());
