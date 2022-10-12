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

const sleep = (waitTimeInMs) =>
  new Promise((resolve) => setTimeout(resolve, waitTimeInMs));

const menu = `
    ============================
        KALKULATOR SEDERHANA
    ============================
    [1] Kalkulator Penjumlahan
    [2] Kalkulator Pengurangan
    [3] Kalkulator Perkalian
    [4] Kalkulator Pembagian
    [5] Kalkulator Perpangkatan
    [6] Luas Persegi
    [7] Volume Kubus
    [8] Volume Tabung

    [0] Exit
    `;

const options = async () => {
  await sleep(3000);
  await process.stdout.write("\033c");
  console.log(menu);
  const answer = await input("Pilih menu yang ingin anda pilih: ");
  return answer;
};

(async () => {
  while (true) {
    const answer = await options();
    switch (answer) {
      case "1":
        const a = await input("masukkan angka pertama: ");
        const b = await input("masukkan angka kedua: ");
        const c = parseInt(a) + parseInt(b);
        console.log(`\n${a} + ${b} = ${c}`);
        break;

      case "2":
        const d = await input("masukkan angka pertama: ");
        const e = await input("masukkan angka kedua: ");
        const f = parseInt(d) - parseInt(e);
        console.log(`\n${d} - ${e} = ${f}`);
        break;
      case "3":
        const g = await input("masukkan angka pertama: ");
        const h = await input("masukkan angka kedua: ");
        const i = parseInt(g) * parseInt(h);
        console.log(`\n${g} * ${h} = ${i}`);
        break;
      case "4":
        const j = await input("masukkan angka pertama: ");
        const k = await input("masukkan angka kedua: ");
        const l = parseInt(j) / parseInt(k);
        console.log(`\n${j} / ${k} = ${l}`);
        break;
      case "5":
        const m = await input("masukkan angka pertama: ");
        const n = await input("masukkan angka kedua: ");
        const o = parseInt(m) ** parseInt(n);
        console.log(`\n${m} ** ${n} = ${o}`);
        break;
      case "6":
        const p = await input("masukkan sisi: ");
        const q = parseInt(p) * parseInt(p);
        console.log(`\nluas persegi = ${q}`);
        break;
      case "7":
        const r = await input("masukkan sisi: ");
        const s = parseInt(r) * parseInt(r) * parseInt(r);
        console.log(`\nvolume kubus = ${s}`);
        break;
      case "8":
        const t = await input("masukkan jari-jari: ");
        const u = await input("masukkan tinggi: ");
        const v = 3.14 * parseInt(t) * parseInt(t) * parseInt(u);
        console.log(`\nvolume tabung = ${v}`);
        break;
      case "0":
        await process.stdout.write("\033c");
        process.exit();
        break;

      default:
        console.log("invalid option");
        break;
    }
  }
})();
