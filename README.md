# Optik LOOV Lens Recommendation Website

Progressive web app untuk membantu pelanggan Optik LOOV memilih lensa yang tepat melalui kuesioner terpandu dalam bahasa Indonesia.

## 🌟 Fitur Utama

- **Mobile-first Design**: Dioptimalkan untuk penggunaan di smartphone dan tablet
- **Progressive Web App (PWA)**: Dapat diinstall dan digunakan offline
- **Kuesioner Adaptif**: Pertanyaan yang menyesuaikan berdasarkan jawaban sebelumnya
- **Rekomendasi Personal**: Algoritma cerdas untuk memberikan rekomendasi lensa terbaik
- **Interface Indonesian**: Seluruh aplikasi dalam bahasa Indonesia
- **Hasil Dapat Dibagikan**: Fitur share dan download hasil rekomendasi

## 🛠️ Tech Stack

- **Frontend**: Vite + React + TypeScript
- **UI Library**: ShadCn UI
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **PWA**: vite-plugin-pwa
- **Deployment**: Netlify

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Installation

1. Clone repository
```bash
git clone https://github.com/revothan/optik-loov-lens-recommendation.git
cd optik-loov-lens-recommendation
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build untuk production
```bash
npm run build
```

## 📁 Struktur Project

```
src/
├── components/
│   ├── ui/                 # ShadCn UI components
│   │   ├── button.tsx
│   │   └── card.tsx
│   └── QuestionCard.tsx    # Komponen kartu pertanyaan
├── pages/
│   ├── Home.tsx           # Halaman beranda
│   ├── Quiz.tsx           # Halaman kuesioner
│   └── Result.tsx         # Halaman hasil rekomendasi
├── logic/
│   └── lensLogic.ts       # Logika decision tree dan rekomendasi
├── lib/
│   └── utils.ts           # Utility functions
├── App.tsx                # Main app component
├── main.tsx              # Entry point
└── index.css             # Global styles
```

## 🧠 Logika Rekomendasi

Aplikasi menggunakan decision tree berdasarkan:

- **Usia**: Menentukan kebutuhan lensa progresif
- **Aktivitas**: Indoor vs outdoor preferences
- **Screen Time**: Rekomendasi blue light protection  
- **Jenis Koreksi**: Minus, plus, atau presbyopia
- **Preferensi**: Lensa tipis, anti-glare, dll
- **Budget**: Ekonomis, premium, atau luxury

## 🌐 Deployment

### Netlify (Recommended)

1. Push code ke GitHub
2. Connect repository di Netlify
3. Deploy settings sudah dikonfigurasi di `netlify.toml`

### Manual Build

```bash
npm run build
# Upload folder 'dist' ke hosting provider
```

## 📱 PWA Features

- **Offline Support**: Aplikasi dapat digunakan tanpa internet
- **Installable**: Dapat diinstall sebagai app di smartphone
- **Service Worker**: Caching otomatis untuk performa optimal
- **App-like Experience**: Fullscreen dan native-like interface

## 🔧 Development Guidelines

- Setiap komponen maksimal 100 baris kode
- Menggunakan functional components dengan React Hooks
- State management lokal (tidak perlu Redux)
- Responsive design dengan Tailwind CSS
- TypeScript untuk type safety

## 🎨 Design Principles

- **Mobile-first**: Didesain untuk layar kecil terlebih dahulu
- **Touch-friendly**: Tombol dan elemen UI mudah disentuh
- **Accessibility**: Kontras warna yang baik dan semantic markup
- **Performance**: Bundle size kecil dan loading cepat

## 📝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/nama-fitur`)
3. Commit changes (`git commit -m 'Add: fitur baru'`)
4. Push ke branch (`git push origin feature/nama-fitur`)
5. Buat Pull Request

## 📞 Support

Untuk pertanyaan atau dukungan teknis:
- Email: support@optikloov.com
- Website: https://optikloov.com

## 📄 License

MIT License - lihat file [LICENSE](LICENSE) untuk detail lengkap.

## 🔄 Changelog

### v1.0.0 (2025-05-28)
- ✨ Initial release
- 🎯 Kuesioner adaptif dengan 10 pertanyaan
- 🔍 Algoritma rekomendasi berbasis decision tree
- 📱 PWA support dengan offline capability
- 🎨 UI responsif dengan ShadCn UI
- 🌐 Deployment ready untuk Netlify

---

**Dikembangkan dengan ❤️ untuk Optik LOOV**
