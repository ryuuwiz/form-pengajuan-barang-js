// State
const state = new Array();

// Element
const formGroup = {
	nama: document.getElementById("nama_barang"),
	harga: document.getElementById("harga"),
	jumlah: document.getElementById("jumlah"),
	jenisbarang: document.getElementById("jenis_barang"),
	pajak: document.getElementById("pajak"),
};
const buttonGroup = {
	proses: document.getElementById("proses"),
	reset: document.getElementById("reset"),
};
const table = document.getElementById("tabel_penjualan");
const tableBody = table.querySelector("tbody");

// Functions
function renderTable() {
	tableBody.innerHTML = "";
	let total = 0;
	state.map((barang, index) => {
		const row = document.createElement("tr");
		row.innerHTML = `
    <td>${index + 1}</td>
    <td>${barang.nama}</td>
    <td>${barang.harga}</td>
    <td>${barang.jumlah}</td>
    <td>${barang.jenisbarang}</td>
    <td>${barang.pajak} %</td>
    <td>${barang.bayar}</td>
    `;
		total += Number(barang.bayar);
		tableBody.appendChild(row);
	});
	document.querySelector("#total").innerHTML = Number(total);
}
function hitungBayar(harga, jumlah, pajak) {
	const sub = Number(harga) * Number(jumlah);
	const totalPajak = sub * (pajak / 100);
	return sub + totalPajak;
}

// Event Listener
buttonGroup.proses.addEventListener("click", () => {
	const dataBarang = {
		id: state.length + 1,
		nama: formGroup.nama.value,
		harga: formGroup.harga.value,
		jumlah: formGroup.jumlah.value,
		jenisbarang: formGroup.jenisbarang.value,
		pajak: formGroup.pajak.value,
		bayar: hitungBayar(
			formGroup.harga.value,
			formGroup.jumlah.value,
			formGroup.pajak.value,
		),
	};
	state.push(dataBarang);
	renderTable();
});
buttonGroup.reset.addEventListener("click", () => {
	Object.keys(formGroup).forEach((key, _) => {
		formGroup[key].value = "";
	});
});
