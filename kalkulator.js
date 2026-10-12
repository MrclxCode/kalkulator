let layarNode = document.getElementById("display");
let tombolNodes = document.querySelectorAll("button");

let isi = "";
let sudahHasil = false;

const daftarOperator = ["+", "-", "*", "/"];

const tampilkan = () => {
  if (isi === "") {
    layarNode.innerHTML = "0";
  } else {
    layarNode.innerHTML = isi;
  }
};

const tampilkanError = () => {
  layarNode.innerHTML = "Error";
  isi = "";
  sudahHasil = true;
};

const klikAngka = (angka) => {
  if (sudahHasil === true) {
    isi = "";
    sudahHasil = false;
  }

  let posisiOperator = Math.max(
    isi.lastIndexOf("+"),
    isi.lastIndexOf("-"),
    isi.lastIndexOf("*"),
    isi.lastIndexOf("/")
  );
  let angkaSekarang = isi.slice(posisiOperator + 1);

  if (angka === ".") {
    if (angkaSekarang.includes(".")) {
      return;
    }
    if (angkaSekarang === "") {
      angka = "0.";
    }
  } else if (angkaSekarang === "0") {
    isi = isi.slice(0, -1);
  }

  isi = isi + angka;
  tampilkan();
};

const klikOperator = (operator) => {
  if (isi === "") {
    return;
  }

  sudahHasil = false;

  let terakhir = isi[isi.length - 1];

  if (daftarOperator.includes(terakhir)) {
    isi = isi.slice(0, -1) + operator;
  } else {
    isi = isi + operator;
  }

  tampilkan();
};

const klikClear = () => {
  isi = "";
  sudahHasil = false;
  tampilkan();
};

const klikSamaDengan = () => {
  if (isi === "") {
    return;
  }

  let hitungan = isi;
  if (daftarOperator.includes(hitungan[hitungan.length - 1])) {
    hitungan = hitungan.slice(0, -1);
  }

  let hasil = eval(hitungan);
  console.log("Hitungan: ", hitungan);
  console.log("Hasil: ", hasil);

  if (isFinite(hasil) === false) {
    tampilkanError();
    return;
  }

  isi = String(Math.round(hasil * 1000000000) / 1000000000);
  sudahHasil = true;
  tampilkan();
};

tombolNodes.forEach((tombol) => {
  tombol.addEventListener("click", () => {
    if (tombol.dataset.num !== undefined) {
      klikAngka(tombol.dataset.num);
    } else if (tombol.dataset.op !== undefined) {
      klikOperator(tombol.dataset.op);
    } else if (tombol.dataset.action === "clear") {
      klikClear();
    } else if (tombol.dataset.action === "equals") {
      klikSamaDengan();
    }
  });
});