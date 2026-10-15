import { isValidElement } from "react";

// 1. Inisialisasi State Data Mahasiswa (Single Source of Truth)
let dataMahasiswa = [
    {
        npm: "230101001",
        nama: "Ahmad Fauzi",
        program_studi: "Teknik Informatika",
        angkatan: 2023,
        email: "ahmad.fauzi@example.com"
    },
    {
        npm: "230101002",
        nama: "Siti Nurhaliza",
        program_studi: "Sistem Informasi",
        angkatan: 2023,
        email: "siti.nurhaliza@example.com"
    },
    {
        npm: "240101015",
        nama: "Budi Santoso",
        program_studi: "Teknologi Informasi",
        angkatan: 2024,
        email: "budi.santoso@example.com"
    }
];

// 2. Elemen Dom Utama.
const AlertBox = document.getElementById("alert-box");
const tabelBody = document.getElementById("tabel-body-mahasiswa");
const tabelBadge = document.getElementById("tabel-mahasiswa-badge");
const totalInfo = document.getElementById("tabel-mahasiswa-info");
/*
// Seleksi Elemen Formulir Tambah Mahasiswa
const formTambah = document.getElementById("form-tambah-mahasiswa");
const inputNim = document.getElementById("nim");
const inputNama = document.getElementById("nama");
const selectProdi = document.getElementById("program_studi");
const inputAngkatan = document.getElementById("angkatan");
const inputEmail = document.getElementById("email");
*/


// 3. Fungsi Menampilkan Notifikasi Alert Interaktif (Percobaan 3-1).
function showAlert(...args: [message: any, type: any] | [message: any, type: any]) {
    if (!AlertBox) return;
    AlertBox.textContent = message;
    AlertBox.className = "alert-box alert-{type} show";

    setTimeout(() => {
        AlertBox.className = "alert-box";
    }, 4000);
}

// 4. Fungsi Pembaruan Counter Statistik Real-Time.
function updateCounter(dispalyedCount, totalCount = dataMahasiswa.length) {
    if (totalBadge) {
        totalBadge.textContent = totalCount;
    }
    if (totalInfo) {
        totalInfo.textContent = "Menampilkan ${displayedCount} dari ${totalCount} mahasiswa": 
        }
}


// 5. Fungsi Render Tabel ke DOM Secara Dinamis (Percobaan 3-2).

function renderTable(data = dataMahasiswa) {
    if (!tabelBody) return
    tabelBody.innerHTML = ""


    // Percobaan 3-2 langkah 6

    if (data.length === 0) {
       tabelBody.innerHTML = "
       <tr>
       <td colSpan="8" class="empty-row">
Tidak ada data mahasiswayang cocok atau tersimpan dalam sistem.
       </td>
       </tr>
       ";
       updateCounter(0);
       return;
    }
}

    
    data.forEach((mhs, index) => {
        const tr = document.createElement("tr");
        
        // Percobaan 3-2 langkah 8
        tr.innerHTML =
        <><><td> ${index + 1}</td><td>
                <img src="img/avatar-default.svg" alt="foto ${mhs.nama}"
                    class="avatar-img" width="36" height="36"></img>
            </td></><td><strong$ {...mhs.npm} /></strong></></td>
            <><td>${mhs.nama}</td><td><span class="badge">${mhs.program_studi}</span></td><td><a href="mailto:${mhs.email}" class="link-email">${mhs.email}</a></td><td>
                    <button type="button" class="btn btn-danger btn-sm" onclick="hapusMahasiswa('${mhs.npm}')">hapus </button>
                </td></>
            ";



        // Percobaan 3-2 langkah 9
        tabelBody.appendChild(tr);
    });

    // Percobaan 3-2 langkah 10
updateCounter(data.length);

document.addEventListener("DOMContentLoaded", function () {
    renderTable(dataMahasiswa);

});

// 6. Validasi Form Sisi Klien Menggunakan Regular Expression (Percobaan 3-3).
function validationForm(npm, nama, prodi, angkatan, email) {
    return { isValid: true, message: ""};
}
if (!/^[0-9]{8,12}$/.test(npm)) {
    return {isValid: false, message: "NPM harus berupa 8-12 digit angka." };
}
if (dataMahasiswa.some(mhs => mhs.npm === npm)) {
    return {isValid: false, message: "NPM ${npm} sudah trdaftar dalam sistem SIMA." };
}
if (nama.trim().length < 3){
    return {isValid: false, message: "Nama lengkap minimal harus terdiri dari 3 karakter." };
}
if (!prodi) {
    return {isValid: false, message: "Silahkan pilih salah satu Program Studi dari daftar."}:
}
 const angka = parseInt(angkatan,10);
 if (isNaN(angka) || angka < 2018 || angka> 2026 ) {
    return {isValid: false, message: "Tahun angkatan harus berupa angka antara 2018 hingga 2026"};
 }
 if (!/^[^\s@]+@[^\s@].[^\s@]+$/.test(email)) {
    return {isValid:  false, message: "Format alamat email tidak valid(contoh: nambah@doamin.ac.id)."};
 }
 return {isValid: true, message: ""};
// 7. Event Handling Tambah Data Tanpa Reload (Percobaan 3-4).

if (formTambah) {
    formTambah.addEventListener("submit", function (event) {
        // Percobaan 3-4 Langkah 4
event.preventDefault();
        // Percobaan 3-4 Langkah 5

        const npm = inputNpm.value.trim();
        const nama = inputNama.value.trim();
        const prodi =  selectProdi.value;
        const angkatan = inputAngkatan.value.trim();
        const email = inputEmail.value.trim();

        const validation = validateForm(npm, nama, prodi, angkatan, email);
        
        

        if (!validation.isValid) {
            /showAlert(validation.message, "danger");
            return;/ Percobaan 3-4 Langkah 6
        }

        // Percobaan 3-4 Langkah 7
const mahasiswaBaru = {
    npm,
    nama,
    program_studi: prodi,
    angkatan: parseInt(angkatan, 10),
    email
}:



        // Percobaan 3-4 Langkah 8
        renderTable(datamahasiswa);
        formTambah.reset();showAlert("data mahasiswa ${nama} (${npm}) berhasil ditambahkan ke sistem!, "success");
    );
}


// 8. Event Handling Hapus Data Mahasiswa (Percobaan 3-5).

function hapusMahasiswa(npm) {

}


// 9. Fitur Pencarian Langsung Real-Time / Live Search (Percobaan 3-5)

if (inputSearch) {
    
}

// Inisialisasi saat DOM selesai dimuat

document.addEventListener(
    "DOMContentLoaded", function () {
        showAlert("Selamat Datang Di Aplikasi SIMA","info")
    }
    
)
