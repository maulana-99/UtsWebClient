PORTFOLIO — Muhamad Ilham Maulana
==================================

Struktur:
  index.html        -> Home (hero "Selamat Datang")
  about.html        -> About (foto + nama + about me)
  projects.html     -> Project (TABLE editorial + hover preview)
  css/style.css     -> semua style (token, navbar, 3 halaman)
  js/main.js        -> navbar scroll, active link, reveal, preview tabel
  js/cursor.js      -> efek cursor trail (canvas)
  assets/           -> foto profil + 6 project (SVG dummy, senada palet)
  assets/fonts/     -> taruh file Brother Signature di sini

Cara jalanin:
  Buka index.html di browser. (Butuh internet buat font Google.)

PROJECT (table):
  - Tiap baris = 1 project. Pas di-hover: baris lain meredup, nomor &
    panah jadi merah, dan preview foto muncul ngikutin cursor.
  - Edit/ tambah project: ubah <li> di dalam <ul id="ptable"> pada
    projects.html. Atribut data-img = path foto preview-nya.

EFEK CURSOR TRAIL (js/cursor.js):
  - Diadaptasi dari tutorial Ksenia Kondrashova ("satisfying cursor").
  - Otomatis MATI di layar sentuh & saat "reduce motion" aktif.
  - Warna trail = --aw-red. Mau ganti? ubah var --aw-red di style.css,
    atau ganti baris trailColor di cursor.js.
  - Atur "rasa"-nya di objek params (spring, friction, widthFactor,
    pointsNumber) dalam cursor.js.

FONT BROTHER SIGNATURE (berbayar, belum disertakan):
  - Sementara fallback ke "Allura" (Google Fonts).
  - Convert font ke .woff2/.woff, taruh di assets/fonts/ dgn nama
    BrotherSignature.woff2 & BrotherSignature.woff -> otomatis kepakai.

GANTI ASET DUMMY:
  - Foto About : ganti assets/profile.svg (grayscale, warna saat hover).
  - Foto Project: ganti assets/project-1.svg ... project-6.svg.
