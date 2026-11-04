/**
 * Agung Deriko Nainggolan - Portfolio Data Store
 * Supports seamless bilingual switching (id / en) and modular updates.
 */

const portfolioData = {
  profile: {
    name: "Agung Deriko Nainggolan",
    preferredName: "Agung",
    roleId: "Web & Mobile Developer",
    roleEn: "Frontend & Mobile Developer",
    subtitlesId: [
      "Frontend Web Developer",
      "Flutter & Mobile Developer",
      "Software Engineer",
      "D4 Teknik Informatika ULBI"
    ],
    subtitlesEn: [
      "Frontend Web Developer",
      "Flutter & Mobile Engineer",
      "Software Engineer",
      "Informatics Engineering Graduate"
    ],
    locationId: "Kota Bandung, Jawa Barat / Pematangsiantar",
    locationEn: "Bandung, West Java / Pematangsiantar, Indonesia",
    statusId: "Terbuka untuk Pekerjaan & Peluang Kolaborasi",
    statusEn: "Open to Work & Engineering Opportunities",
    email: "agung.nainggolan8008@gmail.com",
    phone: "+62 823-6071-1385",
    whatsapp: "https://wa.me/6282360711385?text=Halo%20Agung,%20saya%20tertarik%20dengan%20portofolio%20Anda",
    github: "https://github.com/agung6544",
    githubDisplay: "github.com/agung6544",
    linkedin: "https://www.linkedin.com/in/agung-deriko-nainggolan",
    linkedinDisplay: "Agung Deriko Nainggolan",
    resumeUrl: "assets/cv_agung_deriko_nainggolan.pdf",
    avatarHero: "assets/agung-hero.png",
    avatarAbout: "assets/agung-about.png"
  },

  stats: [
    {
      value: "3.67",
      suffix: "/4.00",
      labelId: "IPK D4 Teknik Informatika",
      labelEn: "Bachelor GPA (Informatics Eng.)"
    },
    {
      value: "4+",
      suffix: "Bulan",
      labelId: "Pengalaman Magang Industri",
      labelEn: "Industry Internship Experience"
    },
    {
      value: "5+",
      suffix: "Proyek",
      labelId: "Aplikasi Web & Mobile Selesai",
      labelEn: "Web & Mobile Production Apps"
    },
    {
      value: "16.36%",
      suffix: "WAPE",
      labelId: "Akurasi Terbaik Riset XGBoost",
      labelEn: "Best Error Rate (XGBoost Thesis)"
    }
  ],

  about: {
    paragraphsId: [
      "Halo! Saya Agung Deriko Nainggolan, lulusan D4 Teknik Informatika dari Universitas Logistik dan Bisnis Internasional (ULBI) dengan fokus utama pada Frontend & Mobile Development.",
      "Saya memiliki pengalaman langsung dalam membangun antarmuka web responsif dan aplikasi mobile berbasis React, Flutter, dan FlutterFlow — mengintegrasikan REST API, manajemen state yang kokoh, autentikasi berbasis session/token, serta arsitektur antarmuka yang ramah pengguna.",
      "Selain pengembangan frontend, saya memiliki latar belakang kuat dalam backend (Go, PHP, MySQL, MongoDB) serta penerapan riset Machine Learning (XGBoost & Streamlit). Saya terbiasa bekerja secara mandiri maupun berkolaborasi intensif dalam tim pengembangan perangkat lunak."
    ],
    paragraphsEn: [
      "Hello! I am Agung Deriko Nainggolan, an Informatics Engineering graduate (Bachelor of Applied Science) from Universitas Logistik dan Bisnis Internasional (ULBI), Bandung, specializing in Frontend and Mobile Development.",
      "I have hands-on experience building production-ready responsive web and cross-platform mobile applications with React, Flutter, and FlutterFlow — encompassing RESTful API integration, robust client state management, session-based auth, and intuitive user experiences.",
      "Beyond UI engineering, I possess a solid understanding of backend architecture (Go, PHP, MySQL, MongoDB) and applied Machine Learning research (XGBoost, Streamlit). I thrive both in independent problem-solving and agile teamwork environments."
    ],
    pillarsId: [
      {
        title: "Frontend Excellence",
        desc: "Membangun antarmuka modern, cepat, dan responsif menggunakan React.js, Tailwind CSS, dan Vanilla JavaScript.",
        icon: "layout"
      },
      {
        title: "Cross-Platform Mobile",
        desc: "Mengembangkan aplikasi iOS & Android intuitif dengan Flutter dan FlutterFlow dilengkapi push notification real-time.",
        icon: "smartphone"
      },
      {
        title: "Robust API & State",
        desc: "Konsumsi REST API yang aman, pengelolaan cache, token cookies/storage, serta integrasi Firebase Cloud Messaging.",
        icon: "cpu"
      },
      {
        title: "Analytical & Research-Driven",
        desc: "Pendekatan berbasis data, pemodelan machine learning (XGBoost), dan dashboard visualisasi interaktif.",
        icon: "trending-up"
      }
    ],
    pillarsEn: [
      {
        title: "Frontend Excellence",
        desc: "Crafting modern, lightning-fast, and responsive UIs with React.js, Tailwind CSS, and modern JavaScript.",
        icon: "layout"
      },
      {
        title: "Cross-Platform Mobile",
        desc: "Developing cross-platform mobile apps using Flutter and FlutterFlow with real-time push notifications.",
        icon: "smartphone"
      },
      {
        title: "Robust API & State",
        desc: "Secure REST API consumption, caching, client token storage, and Firebase Cloud Messaging integration.",
        icon: "cpu"
      },
      {
        title: "Analytical & Research-Driven",
        desc: "Data-driven problem solving, machine learning predictive models (XGBoost), and interactive analytics dashboards.",
        icon: "trending-up"
      }
    ]
  },

  education: [
    {
      institution: "Universitas Logistik dan Bisnis Internasional (ULBI)",
      degreeId: "D4 Teknik Informatika (Bachelor of Applied Science in Informatics Engineering)",
      degreeEn: "Bachelor of Applied Science in Informatics Engineering",
      period: "2022 - 2026",
      location: "Kota Bandung, Jawa Barat",
      gpa: "IPK: 3.67 / 4.00",
      descriptionId: "Fokus studi pada Rekayasa Perangkat Lunak, Frontend Development, Pengelolaan Basis Data, Arsitektur Sistem, dan Riset Machine Learning. Aktif dalam kepengurusan organisasi mahasiswa PMK ULBI.",
      descriptionEn: "Focused on Software Engineering, Frontend Development, Database Systems, Architecture, and Applied Machine Learning research. Actively served in the Christian Student Fellowship (PMK ULBI) leadership.",
      image: "assets/edu-ulbi.png"
    },
    {
      institution: "SMA Negeri 1 Pematangsiantar",
      degreeId: "Jurusan Matematika & Ilmu Pengetahuan Alam (MIPA)",
      degreeEn: "Natural Sciences (IPA)",
      period: "2018 - 2021",
      location: "Pematangsiantar, Sumatera Utara",
      gpa: "Nilai Akhir: 85.58",
      descriptionId: "Membangun fondasi logika matematika, sains analitis, dan kemampuan pemecahan masalah algoritmis.",
      descriptionEn: "Built strong foundations in mathematics, analytical thinking, and scientific problem-solving.",
      image: "assets/edu-sma.png"
    }
  ],

  experience: [
    {
      roleId: "Frontend Developer Intern",
      roleEn: "Frontend Developer Intern",
      company: "CV Digisolf Technology Consulting",
      period: "Okt 2025 - Jan 2026 (4 Bulan)",
      location: "Kota Medan, Sumatera Utara",
      type: "Internship",
      image: "assets/intern-digisolf.png",
      descriptionId: "Terlibat langsung dalam siklus pengembangan dan pemeliharaan antarmuka aplikasi web dan mobile klien komersial.",
      descriptionEn: "Directly engaged in developing and maintaining production-grade web and mobile interfaces for commercial clients.",
      bulletsId: [
        "Mengimplementasikan desain antarmuka (UI/UX) menjadi aplikasi web menggunakan React JS dan aplikasi mobile menggunakan Flutter serta FlutterFlow.",
        "Mengembangkan aplikasi pemesanan Chicken Holic: alur pickup & delivery, integrasi notifikasi pesanan/promo, serta sistem tier loyalitas pelanggan.",
        "Memegang pemeliharaan dan perbaikan bug (bug fixing) pada website Legend Badminton (https://legendbadminton.com) berbasis React untuk booking lapangan secara real-time.",
        "Mengintegrasikan REST API, mengelola state aplikasi agar responsif dan data tersinkronisasi akurat tanpa delay.",
        "Berkolaborasi dengan tim lintas disiplin dalam standup rutin, code review, dan pengujian stabilitas aplikasi."
      ],
      bulletsEn: [
        "Implemented UI/UX designs into web applications via React JS and mobile applications using Flutter & FlutterFlow.",
        "Developed 'Chicken Holic' F&B app: pickup/delivery checkout flow, order/promo notifications, and customer loyalty tiering.",
        "Maintained and resolved critical bugs on 'Legend Badminton' court booking web platform (https://legendbadminton.com) built with React.",
        "Integrated RESTful APIs and optimized client-side state management for peak performance and zero data desynchronization.",
        "Collaborated with cross-functional teams in agile sprints, code reviews, and cross-device testing."
      ],
      techStack: ["React JS", "Flutter", "FlutterFlow", "JavaScript", "REST API", "Git"]
    },
    {
      roleId: "Koordinator Divisi Pemerhati",
      roleEn: "Care Division Coordinator",
      company: "Persekutuan Mahasiswa Kristen (PMK) ULBI",
      period: "Jan 2025 - Jan 2026",
      location: "Kota Bandung, Jawa Barat",
      type: "Organization Leadership",
      image: "assets/pmk-organization.png",
      descriptionId: "Memimpin koordinasi divisi pelayanan kasih, pastoral, dan pembinaan komunitas mahasiswa di lingkungan kampus.",
      descriptionEn: "Led pastoral care coordination, diaconal outreach, and fellowship activities within the campus community.",
      bulletsId: [
        "Mengoordinasikan kegiatan pemerhati dan diakonia, termasuk kunjungan kasih kepada pengurus dan jemaat serta perayaan fellowship.",
        "Memberikan supervisi dan evaluasi kinerja anggota divisi untuk memastikan seluruh program kerja berjalan tepat sasaran.",
        "Berkoordinasi dengan pengurus harian dan divisi lain dalam manajemen kepanitiaan acara berskala universitas."
      ],
      bulletsEn: [
        "Coordinated student fellowship initiatives, compassionate visitations, and community bonding celebrations.",
        "Supervised and evaluated division team members, ensuring smooth execution of annual work programs.",
        "Collaborated across organizational bodies to plan and deliver major campus-wide spiritual & social events."
      ],
      techStack: ["Team Leadership", "Event Coordination", "Public Speaking", "Supervision"]
    }
  ],

  techStack: [
    {
      category: "frontend",
      categoryNameId: "Frontend Development",
      categoryNameEn: "Frontend Development",
      skills: [
        { name: "React JS", level: "Advanced", icon: "atom", desc: "Hooks, SPA routing, state management, component architecture" },
        { name: "JavaScript (ES6+)", level: "Advanced", icon: "code-2", desc: "Async/await, DOM, Event loop, closures, modern syntax" },
        { name: "Tailwind CSS", level: "Advanced", icon: "palette", desc: "Utility-first responsive design, modern dark themes, custom configs" },
        { name: "HTML5 & CSS3", level: "Expert", icon: "file-code", desc: "Semantic markup, Flexbox, Grid, keyframe animations, accessibility" },
        { name: "Bootstrap", level: "Proficient", icon: "layout-grid", desc: "Rapid prototyping, responsive utility classes" }
      ]
    },
    {
      category: "mobile",
      categoryNameId: "Mobile Development",
      categoryNameEn: "Mobile Development",
      skills: [
        { name: "Flutter", level: "Proficient", icon: "smartphone", desc: "Cross-platform iOS/Android development, custom widgets, state" },
        { name: "Dart", level: "Proficient", icon: "terminal", desc: "Object-oriented programming, async operations, type safety" },
        { name: "FlutterFlow", level: "Advanced", icon: "layers", desc: "Rapid visual app builder, custom actions, API bindings, FCM" },
        { name: "Android Studio", level: "Intermediate", icon: "box", desc: "Emulators, build gradle configuration, APK/bundle releases" }
      ]
    },
    {
      category: "backend",
      categoryNameId: "Backend & Database",
      categoryNameEn: "Backend & Database",
      skills: [
        { name: "Go (Golang)", level: "Intermediate", icon: "server", desc: "REST APIs, concurrency (goroutines), clean handlers, microservices" },
        { name: "PHP", level: "Proficient", icon: "file-code-2", desc: "Server scripting, CRUD, MVC architecture" },
        { name: "MySQL", level: "Proficient", icon: "database", desc: "Relational modeling, indexing, joins, stored procedures" },
        { name: "PostgreSQL", level: "Intermediate", icon: "database", desc: "Relational queries, ACID transactions, data schemas" },
        { name: "MongoDB", level: "Intermediate", icon: "hard-drive", desc: "NoSQL document storage, aggregation pipelines, collections" }
      ]
    },
    {
      category: "tools",
      categoryNameId: "Tools, AI & Workflow",
      categoryNameEn: "Tools, AI & Workflow",
      skills: [
        { name: "Git & GitHub", level: "Advanced", icon: "git-branch", desc: "Version control, branching, PR workflows, collaboration" },
        { name: "Postman", level: "Advanced", icon: "send", desc: "API testing, automated collections, environment variables" },
        { name: "Firebase (FCM)", level: "Proficient", icon: "flame", desc: "Cloud messaging, push notifications, web & mobile client hooks" },
        { name: "XGBoost & ML", level: "Proficient", icon: "cpu", desc: "Feature engineering, time-series forecasting, hyperparameter tuning" },
        { name: "Streamlit", level: "Proficient", icon: "bar-chart-2", desc: "Interactive data dashboards & model deployment in Python" }
      ]
    }
  ],

  projects: [
    {
      id: "syncroapp",
      title: "SyncroApp - Project Management & Collaboration Platform",
      category: "web",
      featured: true,
      badgeId: "Proyek Mandiri Unggulan",
      badgeEn: "Featured Independent Project",
      image: "assets/project-syncroapp.png",
      taglineId: "Platform manajemen proyek terpadu untuk tim modern dengan notifikasi real-time & kontrol akses peran.",
      taglineEn: "Unified project management & team collaboration platform with real-time updates and RBAC security.",
      overviewId: "Mengembangkan aplikasi berbasis web komprehensif yang memungkinkan organisasi dan tim mengelola proyek secara terstruktur. Dilengkapi pembuatan tugas, pembagian tugas proyek, pelacakan progres berbasis status, serta notifikasi instan menggunakan Firebase Cloud Messaging (FCM).",
      overviewEn: "Architected and developed a full-fledged collaborative web application enabling organizations to orchestrate projects seamlessly. Features task creation and delegation, project milestones tracking, and real-time push updates via Firebase Cloud Messaging (FCM).",
      featuresId: [
        "Kolaborasi Tim & Pembagian Tugas: Pembuatan proyek terpusat dengan penugasan tugas spesifik ke anggota tim.",
        "Real-Time Push Notifications (FCM): Pembaruan status dan notifikasi proyek seketika ke seluruh user aktif.",
        "Autentikasi & Keamanan Klien: Implementasi token session menggunakan cookies dan local storage yang aman.",
        "Role-Based Access Control (RBAC): Pembatasan hak akses halaman dan kontrol fungsionalitas antar admin/anggota.",
        "Integrasi RESTful API: Komunikasi cepat antara antarmuka React dengan backend Golang & database MongoDB."
      ],
      featuresEn: [
        "Team Collaboration & Task Assignment: Centralized project workspace with member invitations and task delegation.",
        "Real-Time FCM Push Notifications: Instant updates when tasks are updated or milestones achieved.",
        "Client-Side Storage & Token Security: Token session storage utilizing secure cookies and localStorage.",
        "Role-Based Access Control (RBAC): Granular page and action permission enforcement per user role.",
        "REST API Integration: High-throughput communication between React frontend, Golang services, and MongoDB."
      ],
      techStack: ["React JS", "Tailwind CSS", "Go Language", "MongoDB", "Firebase (FCM)", "REST API"],
      links: {
        github: "https://github.com/agung6544",
        demo: "https://syncroapp.github.io/login/",
        demoLabelId: "Buka SyncroApp",
        demoLabelEn: "Open SyncroApp",
        demoType: "web"
      }
    },
    {
      id: "chickenholic",
      title: "Chicken Holic - Food Ordering & Loyalty Mobile App",
      category: "mobile",
      featured: true,
      badgeId: "Proyek Magang di CV Digisolf",
      badgeEn: "CV Digisolf Internship Project",
      image: "assets/project-chickenholic.png",
      taglineId: "Aplikasi mobile pemesanan makanan cepat saji dengan sistem delivery/pickup, notifikasi promo, dan tier pelanggan.",
      taglineEn: "Mobile food ordering app featuring dual delivery/pickup fulfillment, promo alerts, and customer tier rewards.",
      overviewId: "Sebagai Frontend Developer di CV Digisolf Technology Consulting, saya membangun antarmuka aplikasi Chicken Holic menggunakan FlutterFlow. Mengimplementasikan layout responsif lintas resolusi smartphone, alur pemesanan lengkap, dan integrasi API real-time.",
      overviewEn: "As Frontend Developer Intern at CV Digisolf, I engineered the cross-platform mobile user interface for Chicken Holic using FlutterFlow, establishing responsive UI components, an interactive menu catalog, checkout flows, and API integration.",
      featuresId: [
        "Alur Pemesanan Lengkap: Pilihan metode Delivery atau Pickup, keranjang belanja interaktif, dan checkout order.",
        "Kustomisasi Menu Dinamis: Pilihan level pedas, varian bumbu, dan ekstra add-on dengan kalkulasi harga langsung.",
        "Sistem Notifikasi Pesanan & Promo: Status order pesanan secara langsung dan pengingat voucher diskon.",
        "Tier Loyalitas Pelanggan: Tampilan level member, poin rewards, dan katalog voucher diskon eksklusif.",
        "Koneksi REST API: Manajemen state aplikasi yang responsif dan sinkronisasi data katalog menu secara live."
      ],
      featuresEn: [
        "End-to-End Order Workflow: Seamless delivery vs store pickup selection, cart management, and checkout.",
        "Dynamic Menu Customization: Spice level selector, seasoning variants, and instant subtotal recalculations.",
        "Order & Promo Notifications: Real-time order progress tracking and targeted promotional push notifications.",
        "Customer Loyalty Tiering: Tier level display, points accumulation, and redeemable vouchers.",
        "REST API Integration: Reactive client-side state handling and real-time menu catalog synchronization."
      ],
      techStack: ["FlutterFlow", "Flutter", "Dart", "REST API", "FCM", "Mobile UI"],
      links: {
        github: "https://github.com/agung6544",
        demo: "https://play.google.com/store/apps/details?id=com.chickenholic.app",
        demoLabelId: "Google Play Store",
        demoLabelEn: "Google Play Store",
        demoType: "playstore"
      }
    },
    {
      id: "legend-badminton",
      title: "Legend Badminton - Court Booking Arena Platform",
      category: "web",
      featured: false,
      badgeId: "Proyek Magang di CV Digisolf",
      badgeEn: "CV Digisolf Internship Project",
      image: "assets/project-badminton.png",
      taglineId: "Sistem reservasi dan booking lapangan badminton digital interaktif berbasis React.",
      taglineEn: "Interactive digital badminton court reservation and booking arena web platform built with React.",
      overviewId: "Memegang pemeliharaan dan optimalisasi website booking arena Legend Badminton di CV Digisolf. Berfokus pada penelusuran bug (debugging) alur reservasi lapangan serta pembenahan antarmuka komponen React agar rapi, konsisten, dan nyaman digunakan pengunjung.",
      overviewEn: "Maintained and optimized the production web platform for Legend Badminton booking arena during internship. Specialized in deep debugging of the slot booking lifecycle and refactoring UI components for maximum user delight and stability.",
      featuresId: [
        "Penyempurnaan Jadwal Interaktif: Memperbaiki logika pemilihan slot jam dan lapangan agar tidak terjadi tumpang tindih (double booking).",
        "Refactoring Komponen React: Merapikan struktur UI formulir pemesanan, verifikasi OTP WhatsApp, dan modal checkout.",
        "Bug Fixing & Code Audit: Membaca dan menelusuri source code production yang sudah berjalan tanpa mengganggu modul aktif lainnya.",
        "Peningkatan Responsivitas: Tampilan tabel jadwal yang adaptif dan nyaman digunakan pada layar ponsel maupun desktop."
      ],
      featuresEn: [
        "Slot Selection Optimization: Resolved booking concurrency bugs to prevent double bookings across court schedules.",
        "React Component Refactoring: Streamlined reservation checkout forms, WhatsApp OTP flows, and confirmation dialogs.",
        "Bug Fixing & Codebase Auditing: Diagnosed complex production bugs while ensuring non-breaking stability for active users.",
        "Mobile-First Responsiveness: Enhanced court timetable readability across mobile viewports and large desktop monitors."
      ],
      techStack: ["React JS", "JavaScript", "Tailwind CSS", "REST API", "OTP WhatsApp"],
      links: {
        github: "https://github.com/agung6544",
        demo: "https://legendbadminton.com/",
        demoLabelId: "Kunjungi Website",
        demoLabelEn: "Visit Website",
        demoType: "web"
      }
    },
    {
      id: "sampahku",
      title: "Sampahku - Digital Waste Bank Platform",
      category: "web",
      featured: false,
      badgeId: "Proyek Mandiri",
      badgeEn: "Independent Project",
      image: "assets/project-sampahku.png",
      taglineId: "Website Bank Sampah digital untuk mengonversi sampah menjadi saldo, poin, pulsa, dan donasi sosial.",
      taglineEn: "Digital waste bank web platform converting recyclable waste into wallet cash, airtime, and charitable donations.",
      overviewId: "Mengembangkan aplikasi web ramah lingkungan yang memungkinkan masyarakat menyetorkan sampah daur ulang (kertas, plastik, organik) untuk ditukarkan menjadi saldo uang tunai atau poin belanja pulsa, serta fitur donasi saldo untuk amal.",
      overviewEn: "Developed an eco-conscious web platform empowering citizens to deposit recyclable waste (paper, plastic, organic) in exchange for cash balance or points redeemable for mobile credit and charitable donations.",
      featuresId: [
        "Katalog Kategori Sampah: Informasi jenis sampah yang dapat disetor beserta estimasi nilai konversi per kilogram.",
        "Pencairan Saldo & Tukar Poin: Penarikan saldo ke rekening/e-wallet serta penukaran poin menjadi token listrik & pulsa.",
        "Fitur Donasi Terintegrasi: Kemudahan berdonasi langsung bagi pengguna menggunakan saldo yang terkumpul di aplikasi.",
        "Riwayat Setoran & Transaksi: Pencatatan mutasi saldo dan riwayat setoran sampah yang transparan.",
        "Autentikasi & Session Storage: Manajemen otorisasi pengguna dengan penyimpanan session aman di sisi klien."
      ],
      featuresEn: [
        "Recyclable Category Catalog: Breakdown of accepted waste types with real-time price estimation per kg.",
        "Balance Cashout & Point Redemption: Direct cash withdrawals to e-wallets or point exchanges for utility tokens.",
        "Integrated Social Donations: Built-in donation gateway enabling users to contribute proceeds directly to charity causes.",
        "Transaction & Deposit Ledger: Transparent audit trail of deposits, earnings, and withdrawal history.",
        "Client Authentication: Token authorization and role management backed by secure client storage."
      ],
      techStack: ["React JS", "Vanilla JS", "Tailwind CSS", "Go Language", "MongoDB"],
      links: {
        github: "https://github.com/agung6544",
        demo: "https://sampahkudev.github.io/landing-page/",
        demoLabelId: "Buka Sampahku",
        demoLabelEn: "Open Sampahku",
        demoType: "web"
      }
    },
    {
      id: "research-xgboost",
      title: "Riset Skripsi: Peramalan Penjualan Menu Mingguan dengan XGBoost",
      category: "research",
      featured: true,
      badgeId: "Penelitian Ilmiah & Machine Learning",
      badgeEn: "Scientific Research & Applied ML",
      image: "assets/research-dashboard.png",
      taglineId: "Analisis Representasi Fitur Kategorikal (Item ID vs One-Hot) untuk Peramalan POS Restoran berbasis XGBoost.",
      taglineEn: "Categorical Feature Representation Study for Weekly Menu Forecasting using XGBoost and Streamlit Dashboard.",
      overviewId: "Riset ilmiah tingkat akhir yang meneliti representasi fitur terbaik untuk memprediksi kuantitas penjualan menu restoran per minggu berdasarkan 2.646 data transaksi POS riil. Model dievaluasi menggunakan pembagian waktu (time-based split) dan metrik industri.",
      overviewEn: "Undergraduate scientific thesis analyzing the impact of categorical encoding methods on predicting weekly restaurant menu sales volume using 2,646 real POS transactions. Evaluated under strict time-based splits against standard forecasting metrics.",
      featuresId: [
        "Dataset Nyata: Mengolah 2.646 data transaksi POS restoran bulan Mei 2026 dengan agregasi mingguan per item menu.",
        "Rekayasa Fitur Komprehensif: Lag-1, Lag-2, Rolling Mean (rata-rata bergerak), variabel biner Promo, Order Count, dan Harga.",
        "Temuan Signifikan: Representasi Category Item ID mengungguli One-Hot Encoding di seluruh metrik pengujian.",
        "Tingkat Error Rendah (WAPE 16.36%): Item ID mencapai WAPE 16.36% (vs One-Hot 17.76%), MAE 4.9603 (vs 5.3841), dan R² 0.8589.",
        "Feature Importance: Fitur penjualan minggu sebelumnya (Lag-1) menjadi prediktor paling dominan dengan kontribusi ±34%.",
        "Dashboard Streamlit Interaktif: Membangun dashboard analitik prediktif berbasis Streamlit untuk visualisasi tren dan peramalan."
      ],
      featuresEn: [
        "Real-World POS Dataset: Processed 2,646 transactions aggregated into weekly sales demand per menu item.",
        "Comprehensive Feature Engineering: Lag-1, Lag-2, Rolling Mean, Promotional flags, Order Count, and Unit Price.",
        "Major Empirical Finding: Native Categorical Item ID decisively outperformed traditional One-Hot Encoding across every benchmark.",
        "Lowest Error Rate (16.36% WAPE): Categorical Item ID achieved WAPE of 16.36% (vs 17.76%), MAE 4.9603 (vs 5.3841), and R² 0.8589.",
        "Feature Importance Breakdown: Prior week sales volume (Lag-1) emerged as the single most impactful factor (~34% contribution).",
        "Interactive Streamlit Dashboard: Deployed a production-ready predictive visualization dashboard in Streamlit."
      ],
      techStack: ["XGBoost", "Python", "Streamlit", "Pandas", "Scikit-Learn", "Matplotlib"],
      researchMetrics: {
        dataset: "2.646 Transaksi POS",
        bestMetric: "WAPE 16.36%",
        topFeature: "Lag-1 (±34%)",
        table: [
          { metric: "MAE", oneHot: "5.3841", itemId: "4.9603 (Unggul)", win: "itemId" },
          { metric: "RMSE", oneHot: "6.9127", itemId: "6.5556 (Unggul)", win: "itemId" },
          { metric: "R² Score", oneHot: "0.8432", itemId: "0.8589 (Unggul)", win: "itemId" },
          { metric: "WAPE", oneHot: "17.76%", itemId: "16.36% (Unggul)", win: "itemId" }
        ]
      },
      links: {
        github: "https://github.com/agung6544",
        demo: "https://qtskxoh94pb2sybdhca9sr.streamlit.app/",
        demoLabelId: "Dashboard Streamlit",
        demoLabelEn: "Streamlit Dashboard",
        demoType: "streamlit"
      }
    }
  ],

  certificates: [
    {
      id: "cert_magang",
      title: "Sertifikat Kelulusan Magang Kerja",
      issuer: "CV Digisolf Technology Consulting",
      date: "Januari 2026",
      type: "Industry Internship",
      image: "assets/cert_magang_digisolf.png",
      descriptionId: "Penyelesaian program magang kerja 4 bulan sebagai Frontend Developer di bidang pengembangan web & mobile.",
      descriptionEn: "Completion of 4-month industry internship as Frontend Developer in web and mobile engineering."
    },
    {
      id: "cert_golang",
      title: "GO Programming Language",
      issuer: "Great Learning Academy",
      date: "Verifiable Credential",
      type: "Backend Programming",
      image: "assets/cert_greatlearning_golang.png",
      descriptionId: "Penguasaan dasar bahasa Go, sintaks, tipe data, fungsi, struct, dan konsep konkurensi.",
      descriptionEn: "Proficiency in Go fundamentals, syntax, typing, struct architecture, and concurrency principles."
    },
    {
      id: "cert_oracle_java",
      title: "Java Fundamentals",
      issuer: "Oracle Academy",
      date: "5 Januari 2023",
      type: "Object-Oriented Programming",
      image: "assets/cert_oracle_java.png",
      descriptionId: "Sertifikasi kompetensi fundamental pemrograman berorientasi objek (OOP) Java dari Oracle Academy.",
      descriptionEn: "Competency certification in Java object-oriented programming (OOP) principles from Oracle Academy."
    },
    {
      id: "cert_manajemen_proyek",
      title: "Belajar Dasar Manajemen Proyek",
      issuer: "Dicoding Indonesia",
      date: "23 Desember 2024",
      type: "Software Engineering & Agile",
      image: "assets/cert_dicoding_manajemen_proyek.png",
      descriptionId: "Pemahaman metodologi manajemen proyek perangkat lunak, siklus hidup proyek, dan kerangka Agile/Scrum.",
      descriptionEn: "Comprehensive grasp of software project lifecycles, resource management, and Agile/Scrum practices."
    },
    {
      id: "cert_intro_js",
      title: "Introduction to JavaScript",
      issuer: "Great Learning Academy",
      date: "Verifiable Credential",
      type: "Web Development",
      image: "assets/cert_greatlearning_javascript.png",
      descriptionId: "Fondasi pemrograman JavaScript, manipulasi DOM, operator, dan logika pemrograman web.",
      descriptionEn: "Foundational mastery in JavaScript syntax, DOM manipulation, arrays, and algorithmic logic."
    },
    {
      id: "cert_fe_pemula",
      title: "Belajar Membuat Front-End Web untuk Pemula",
      issuer: "Dicoding Indonesia",
      date: "24 Oktober 2024",
      type: "Frontend Engineering",
      image: "assets/cert_dicoding_frontend_pemula.png",
      descriptionId: "Implementasi antarmuka web semantik, CSS Flexbox & Grid, interaktivitas event DOM, dan web storage.",
      descriptionEn: "Semantic HTML5, responsive CSS layout systems, custom DOM events, and browser Web Storage APIs."
    },
    {
      id: "cert_toefl",
      title: "TOEFL Prediction Test (Score: 480)",
      issuer: "Pusat Bahasa ULBI",
      date: "11 Maret 2026",
      type: "English Proficiency",
      image: "assets/cert_toefl_ulbi.png",
      descriptionId: "Sertifikat prediksi skor kecakapan bahasa Inggris resmi: Listening, Structure & Written, Reading Comprehension.",
      descriptionEn: "Official university English proficiency test certification with a standardized overall score of 480."
    },
    {
      id: "cert_toeic",
      title: "TOEIC Prediction Test (Score: 655)",
      issuer: "Pusat Bahasa ULBI",
      date: "4 Agustus 2026",
      type: "Business English Proficiency",
      image: "assets/cert_toeic_ulbi.png",
      descriptionId: "Sertifikat prediksi TOEIC standar internasional untuk komunikasi bisnis dan profesional: Skor 655.",
      descriptionEn: "International professional workplace English certification with an overall score of 655 (Listening: 345, Reading: 310)."
    },
    {
      id: "cert_dasar_js",
      title: "Belajar Dasar Pemrograman JavaScript",
      issuer: "Dicoding Indonesia",
      date: "14 September 2024",
      type: "Programming Fundamentals",
      image: "assets/cert_dicoding_dasar_javascript.png",
      descriptionId: "Standar industri ECMAScript 6+, Functional Programming, OOP di JavaScript, Error Handling, dan Asynchronous JS.",
      descriptionEn: "Industry standard ES6+, functional paradigms, JavaScript OOP, error handling, and asynchronous programming."
    }
  ]
};

