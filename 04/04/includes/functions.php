<?php
/**
 * Praktikum 4: Implementasi Aplikasi Web Dinamis Menggunakan PHP
 * File: includes/functions.php
 */

// Memulai sesi PHP
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

/**
 * Inisialisasi data mahasiswa pada session jika belum ada
 */
function init_mahasiswa_session() {
    if (!isset($_SESSION['daftar_mahasiswa'])) {
        $_SESSION['daftar_mahasiswa'] = [
            [
                'npm' => '230101001',
                'nama' => 'Ahmad Fauzi',
                'program_studi' => 'Teknik Informatika',
                'angkatan' => 2023,
                'email' => 'ahmad.fauzi@example.com'
            ],
            [
                'npm' => '230101002',
                'nama' => 'Siti Nurhaliza',
                'program_studi' => 'Sistem Informasi',
                'angkatan' => 2023,
                'email' => 'siti.nurhaliza@example.com'
            ],
            [
                'npm' => '240101015',
                'nama' => 'Budi Santoso',
                'program_studi' => 'Teknik Informatika',
                'angkatan' => 2024,
                'email' => 'budi.santoso@example.com'
            ]
        ];
    }
}

/**
 * Sanitasi string input untuk keamanan XSS
 */
function sanitize($data) {
    return htmlspecialchars(trim($data), ENT_QUOTES, 'UTF-8');
}

/**
 * Mengambil seluruh data mahasiswa atau berdasarkan pencarian keyword
 */
function get_all_mahasiswa($keyword = '') {
    init_mahasiswa_session();
    $data = $_SESSION['daftar_mahasiswa'];

    if (empty($keyword)) {
        return $data;
    }

    $filtered = [];
    $keyword = strtolower(trim($keyword));

    foreach ($data as $mhs) {
        if (
            strpos(strtolower($mhs['npm']), $keyword) !== false ||
            strpos(strtolower($mhs['nama']), $keyword) !== false ||
            strpos(strtolower($mhs['program_studi']), $keyword) !== false
        ) {
            $filtered[] = $mhs;
        }
    }

    return $filtered;
}

/**
 * Menghitung total data mahasiswa yang tersimpan
 */
function count_total_mahasiswa() {
    init_mahasiswa_session();
    return count($_SESSION['daftar_mahasiswa']);
}

/**
 * Menambahkan data mahasiswa baru ke dalam session dengan validasi server-side
 */
function tambah_mahasiswa($npm, $nama, $program_studi, $angkatan, $email) {
    init_mahasiswa_session();

    $npm = sanitize($npm);
    $nama = sanitize($nama);
    $program_studi = sanitize($program_studi);
    $angkatan = (int) $angkatan;
    $email = sanitize($email);

    if (empty($npm) || empty($nama) || empty($program_studi) || empty($angkatan) || empty($email)) {
        return ['status' => false, 'message' => 'Semua field formulir wajib diisi!'];
    }

    // Cek duplikasi NPM
    foreach ($_SESSION['daftar_mahasiswa'] as $mhs) {
        if ($mhs['npm'] === $npm) {
            return ['status' => false, 'message' => "NPM {$npm} sudah terdaftar!"];
        }
    }

    $_SESSION['daftar_mahasiswa'][] = [
        'npm' => $npm,
        'nama' => $nama,
        'program_studi' => $program_studi,
        'angkatan' => $angkatan,
        'email' => $email
    ];

    return ['status' => true, 'message' => 'Data mahasiswa berhasil ditambahkan!'];
}

/**
 * Menghapus data mahasiswa berdasarkan NPM
 */
function hapus_mahasiswa($npm) {
    init_mahasiswa_session();
    $npm = sanitize($npm);

    foreach ($_SESSION['daftar_mahasiswa'] as $index => $mhs) {
        if ($mhs['npm'] === $npm) {
            unset($_SESSION['daftar_mahasiswa'][$index]);
            $_SESSION['daftar_mahasiswa'] = array_values($_SESSION['daftar_mahasiswa']);
            return ['status' => true, 'message' => 'Data mahasiswa berhasil dihapus!'];
        }
    }

    return ['status' => false, 'message' => 'Data mahasiswa tidak ditemukan!'];
}

/**
 * Set flash message untuk feedback notifikasi pengguna
 */
function set_flash_message($type, $message) {
    init_mahasiswa_session();
    $_SESSION['flash_message'] = [
        'type' => $type,
        'message' => $message
    ];
}

/**
 * Ambil dan hapus flash message
 */
function get_flash_message() {
    init_mahasiswa_session();
    if (isset($_SESSION['flash_message'])) {
        $flash = $_SESSION['flash_message'];
        unset($_SESSION['flash_message']);
        return $flash;
    }
    return null;
}