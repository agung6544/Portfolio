# 🚀 Portofolio Agung Deriko Nainggolan - Web & Mobile Developer

Website portofolio profesional dan interaktif untuk **Agung Deriko Nainggolan**, Lulusan D4 Teknik Informatika dari **Universitas Logistik dan Bisnis Internasional (ULBI)** dengan IPK **3.67 / 4.00**, spesialisasi **Frontend Development** (React, Tailwind) dan **Mobile Development** (Flutter, FlutterFlow).

---

## 🎨 Referensi Desain Open Source & Inspirasi Arsitektur

Website ini dirancang dengan menggabungkan konsep desain portofolio developer modern kelas dunia yang sedang populer di komunitas open-source:

1. **Aceternity UI & Magic UI**:
   - *Interactive Mouse Spotlight Glow*: Efek gradien radial yang mengikuti pergerakan kursor pengguna secara halus (`--mouse-x`, `--mouse-y`).
   - *Bento Grid Layout*: Penataan kartu asimetris yang modern untuk proyek unggulan dan keahlian teknis.
   - *Animated Floating Badges*: Badge teknologi melayang dengan efek float keyframe.
2. **Shadcn UI & Vercel Design System**:
   - Palet warna dark luxury obsidian (`#09090b`), kartu *frosted glass* (`backdrop-blur-xl`), dan border halus (`border-white/10`).
   - Tipografi modern: perpaduan **Syne** (display), **Space Grotesk** (headings), **Plus Jakarta Sans** (body text), dan **JetBrains Mono** (kode & stats).
3. **Brittany Chiang (v4/v5) & Lee Robinson Portfolio**:
   - *Interactive Experience Timeline*: Alur pengalaman magang di CV Digisolf dan kepemimpinan di PMK ULBI dengan glowing node.
   - *Interactive Dev CLI Terminal Easter Egg*: Terminal interaktif di bagian bawah yang menerima perintah bash (`help`, `about`, `skills`, `projects`, `stats`, `contact`, `clear`).
   - *Bilingual Switcher*: Tombol toggle bahasa instan (Bahasa Indonesia 🇮🇩 / English 🇬🇧) dengan penyimpanan preferensi di `localStorage`.

---

## ✨ Fitur-Fitur Utama

- ⚡ **Zero-Build Setup**: Berjalan langsung tanpa instalasi rumit — cukup klik dua kali file `index.html` atau jalankan web server lokal.
- 📱 **100% Responsif**: Tampilan sempurna di semua perangkat (smartphone, tablet, laptop, dan layar monitor ultra-wide).
- 🖼️ **Asset Foto & Gambar Asli**: Telah diekstrak dari dokumen presentasi dan CV asli, mencakup:
  - Foto Hero & Profil Almamater Agung Deriko Nainggolan
  - Dokumentasi Magang di CV Digisolf Technology Consulting & Organisasi PMK ULBI
  - Mockup Proyek: **SyncroApp**, **Chicken Holic**, **Legend Badminton**, dan **Sampahku**
  - Preview Dashboard Riset XGBoost Streamlit
  - 9 Sertifikat resmi beresolusi tinggi dengan Lightbox interaktif
- 📄 **Direct CV Download**: Tombol "Unduh Resume" langsung terhubung ke berkas CV PDF resmi (`assets/cv_agung_deriko_nainggolan.pdf`).
- 💬 **Direct WhatsApp & Copy Email**:
  - Tombol WhatsApp langsung menuju nomor `+6282360711385` dengan pesan pembuka otomatis.
  - Tombol salin email dengan animasi toast notification interaktif.
- 📊 **Spotlight Riset Skripsi**:
  - Bagian mendalam mengenai riset: *"Representasi Fitur Kategorikal untuk Peramalan Penjualan Menu Mingguan dengan XGBoost"* (Data POS 2.646 transaksi, WAPE 16.36%, Lag-1 34%, dashboard Streamlit).

---

## 📂 Struktur Direktori

```
PortfolioWeb/
├── index.html                           # Halaman utama aplikasi (SEO, Meta, Semantics)
├── package.json                         # Konfigurasi skrip dev & static server
├── README.md                            # Dokumentasi lengkap proyek
├── css/
│   └── style.css                        # Gaya kustom, keyframe animasi, scrollbar, terminal
├── js/
│   ├── data.js                          # Database sentral portofolio (Bilingual ID & EN)
│   └── main.js                          # Logika interaktif, spotlight, filter, modal, terminal
└── assets/
    ├── agung-hero.png                   # Foto jas Agung untuk Hero section
    ├── agung-about.png                  # Foto almamater hijau untuk About section
    ├── edu-sma.png & edu-ulbi.png       # Foto riwayat pendidikan
    ├── intern-digisolf.png              # Foto dokumentasi kantor magang CV Digisolf
    ├── pmk-organization.png             # Foto dokumentasi kepengurusan PMK ULBI
    ├── project-syncroapp.png            # Mockup aplikasi SyncroApp
    ├── project-chickenholic.png         # Mockup aplikasi mobile Chicken Holic
    ├── project-badminton.png            # Screenshot website Legend Badminton
    ├── project-sampahku.png             # Mockup website Bank Sampah Sampahku
    ├── research-dashboard.png           # Screenshot dashboard prediksi Streamlit
    ├── cert_*.png                       # 9 file sertifikat terpotong beresolusi tinggi
    └── cv_agung_deriko_nainggolan.pdf   # File CV asli untuk diunduh pengunjung
```

---

## 🚀 Cara Menjalankan Portofolio

### Opsi 1: Langsung Buka di Browser (Paling Mudah)
Cukup buka file `index.html` dengan klik dua kali di File Explorer atau klik kanan -> *Open with Google Chrome / Microsoft Edge*.

### Opsi 2: Menggunakan Python Web Server
```bash
python -m http.server 8000
```
Buka browser di: `http://localhost:8000`

### Opsi 3: Menggunakan Node / npx serve
```bash
npm start
```
Buka browser di: `http://localhost:3000`

---

## 🌐 Panduan Deploy ke Hosting Gratis

### 1. Vercel
1. Install Vercel CLI: `npm i -g vercel` (atau buka [vercel.com](https://vercel.com))
2. Jalankan perintah `vercel` di folder ini, lalu pilih default pengaturan.
3. Website akan langsung aktif dalam hitungan detik!

### 2. GitHub Pages
1. Buat repository baru di GitHub (misal: `portofolio-agung`).
2. Push seluruh folder ini ke repository:
   ```bash
   git init
   git add .
   git commit -m "feat: initial commit modern portfolio website"
   git branch -M main
   git remote add origin https://github.com/agung6544/portofolio-agung.git
   git push -u origin main
   ```
3. Di tab **Settings** -> **Pages**, pilih Branch `main` dan folder `/ (root)`, lalu klik Save.

### 3. Netlify
1. Buka [app.netlify.com](https://app.netlify.com).
2. Tarik dan lepas (Drag & Drop) seluruh folder `PortfolioWeb` ke dashboard Netlify.

---

## 👤 Informasi Pengembang

- **Nama**: Agung Deriko Nainggolan
- **Email**: [agung.nainggolan8008@gmail.com](mailto:agung.nainggolan8008@gmail.com)
- **WhatsApp**: [+62 823-6071-1385](https://wa.me/6282360711385)
- **GitHub**: [github.com/agung6544](https://github.com/agung6544)
- **LinkedIn**: [Agung Deriko Nainggolan](https://www.linkedin.com/in/agung-deriko-nainggolan)
