const readline = require("readline");

const interface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const input = (question) => {
  return new Promise((resolve, reject) => {
    interface.question(question, (answer) => {
      resolve(answer);
    });
  });
};

const options = async () => {
  const answer = await input(``);
  return answer;
};

(async () => {
  console.log(`Inputkan nilai dan ketik "q" jika sudah selesai\n`);
  let tempArr = [];
  while (true) {
    const answer = await options();
    if (answer === "q") break;
    if (Object.is(parseInt(answer), NaN)) {
      console.log("invalid input");
      break;
    }
    tempArr.push(answer);
  }
  //output
  let output = `
Nilai tertinggi: ${Math.max(...tempArr)}
Nilai terendah: ${Math.min(...tempArr)}
Siswa lulus: ${
    tempArr.filter((item) => item >= 60).length
  } Siswa tidak lulus: ${tempArr.filter((item) => item < 70).length}
Urutan nilai dari terendah ke tertinggi: ${tempArr.sort((a, b) => a - b)}
Siswa nilai 90 dan nilai 100: ${tempArr.filter(
    (item) => item == 90 || item == 100
  )}`;
  console.clear();
  console.log(output);
})();
