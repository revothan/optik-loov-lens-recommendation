import { LensRecommendation } from './types';

// 👓 Presbyopia/Progressive Lenses (Age > 40)
export const progressiveLenses: Record<'premium' | 'standard', LensRecommendation[]> = {
  premium: [
    {
      type: 'Lensa Progresif Premium',
      brand: 'Varilux X Series',
      features: [
        'Fokus tajam untuk jarak dekat, menengah, dan jauh tanpa perlu banyak gerakan kepala',
        'Ideal untuk multitasking dan pengguna aktif'
      ],
      price: 'Rp 3.500.000 - 5.500.000',
      description: 'Varilux X Series ➤ Fokus tajam untuk jarak dekat, menengah, dan jauh tanpa perlu banyak gerakan kepala. ➤ Ideal untuk multitasking dan pengguna aktif.',
      reasons: ['Teknologi terdepan untuk presbyopia', 'Performa optimal untuk pengguna aktif'],
      category: 'premium',
      emoji: '👓'
    },
    {
      type: 'Lensa Progresif Premium',
      brand: 'Varilux Physio',
      features: [
        'Teknologi wavefront untuk penglihatan lebih natural dan nyaman',
        'Transisi mulus antarjarak, cocok untuk aktivitas harian intensif'
      ],
      price: 'Rp 3.200.000 - 4.800.000',
      description: 'Varilux Physio ➤ Teknologi wavefront untuk penglihatan lebih natural dan nyaman. ➤ Transisi mulus antarjarak, cocok untuk aktivitas harian intensif.',
      reasons: ['Teknologi wavefront untuk kenyamanan maksimal', 'Cocok untuk aktivitas intensif'],
      category: 'premium',
      emoji: '👓'
    },
    {
      type: 'Lensa Progresif Premium',
      brand: 'Zeiss SmartLife Progressive',
      features: [
        'Desain menyesuaikan gaya hidup modern dan penggunaan layar',
        'Transisi nyaman antarjarak, ideal untuk mobilitas tinggi'
      ],
      price: 'Rp 3.000.000 - 4.500.000',
      description: 'Zeiss SmartLife Progressive ➤ Desain menyesuaikan gaya hidup modern dan penggunaan layar. ➤ Transisi nyaman antarjarak, ideal untuk mobilitas tinggi.',
      reasons: ['Disesuaikan untuk gaya hidup modern', 'Optimal untuk pengguna mobile dan digital'],
      category: 'premium',
      emoji: '👓'
    }
  ],
  standard: [
    {
      type: 'Lensa Progresif Standard',
      brand: 'Varilux Comfort Max',
      features: [
        'Mudah beradaptasi, pandangan stabil di semua jarak',
        'Cocok untuk pengguna progresif pemula'
      ],
      price: 'Rp 1.800.000 - 2.800.000',
      description: 'Varilux Comfort Max ➤ Mudah beradaptasi, pandangan stabil di semua jarak. ➤ Cocok untuk pengguna progresif pemula.',
      reasons: ['Mudah beradaptasi untuk pemula', 'Pandangan stabil dan nyaman'],
      category: 'standard',
      emoji: '👓'
    },
    {
      type: 'Lensa Progresif Standard',
      brand: 'Kodak Unique II HD',
      features: [
        'Desain individual sesuai resep mata',
        'Pandangan jernih dan tajam, tampilan lensa lebih tipis'
      ],
      price: 'Rp 1.600.000 - 2.500.000',
      description: 'Kodak Unique II HD ➤ Desain individual sesuai resep mata. ➤ Pandangan jernih dan tajam, tampilan lensa lebih tipis.',
      reasons: ['Desain individual sesuai kebutuhan', 'Tampilan lensa lebih estetis'],
      category: 'standard',
      emoji: '👓'
    },
    {
      type: 'Lensa Progresif Standard',
      brand: 'Zeiss Light 2',
      features: [
        'Lensa progresif simpel, nyaman dan ekonomis',
        'Transisi antarjarak tetap halus'
      ],
      price: 'Rp 1.400.000 - 2.200.000',
      description: 'Zeiss Light 2 ➤ Lensa progresif simpel, nyaman dan ekonomis. ➤ Transisi antarjarak tetap halus.',
      reasons: ['Solusi ekonomis dengan kualitas baik', 'Transisi yang halus dan nyaman'],
      category: 'standard',
      emoji: '👓'
    }
  ]
};

// 💻 Digital/Blue Light Lenses
export const digitalLenses: Record<'premium' | 'standard', LensRecommendation[]> = {
  premium: [
    {
      type: 'Lensa Digital Premium',
      brand: 'Eyezen Boost',
      features: [
        'Mengurangi ketegangan mata akibat layar digital',
        'Ada bantuan di area baca untuk kenyamanan ekstra'
      ],
      price: 'Rp 1.800.000 - 2.800.000',
      description: 'Eyezen Boost ➤ Mengurangi ketegangan mata akibat layar digital. ➤ Ada bantuan di area baca untuk kenyamanan ekstra.',
      reasons: ['Khusus untuk pengguna digital intensif', 'Bantuan baca tambahan untuk kenyamanan'],
      category: 'premium',
      emoji: '💻'
    },
    {
      type: 'Lensa Digital Premium',
      brand: 'Zeiss Digital Light 2',
      features: [
        'Cocok untuk usia 20–45 tahun yang aktif menggunakan gadget',
        'Transisi dari dekat ke jauh lebih ringan dibanding progresif biasa'
      ],
      price: 'Rp 1.600.000 - 2.400.000',
      description: 'Zeiss Digital Light 2 ➤ Cocok untuk usia 20–45 tahun yang aktif menggunakan gadget. ➤ Transisi dari dekat ke jauh lebih ringan dibanding progresif biasa.',
      reasons: ['Ideal untuk pengguna gadget aktif', 'Transisi lebih nyaman daripada progresif konvensional'],
      category: 'premium',
      emoji: '💻'
    }
  ],
  standard: [
    {
      type: 'Lensa Digital Standard',
      brand: 'Kodak PowerUp',
      features: [
        'Tambahan daya baca untuk kegiatan depan layar',
        'Ringan, nyaman untuk remaja dan dewasa muda'
      ],
      price: 'Rp 1.000.000 - 1.800.000',
      description: 'Kodak PowerUp ➤ Tambahan daya baca untuk kegiatan depan layar. ➤ Ringan, nyaman untuk remaja dan dewasa muda.',
      reasons: ['Bantuan khusus untuk aktivitas layar', 'Nyaman untuk pengguna muda'],
      category: 'standard',
      emoji: '💻'
    }
  ]
};

// ☀️ Photochromic Lenses
export const photochromicLenses: Record<'premium' | 'standard', LensRecommendation[]> = {
  premium: [
    {
      type: 'Lensa Photochromic Premium',
      brand: 'Transitions GEN S',
      features: [
        'Gelap dalam hitungan detik saat di luar ruangan',
        'Teknologi Chromea7 untuk warna lebih stabil dan perlindungan maksimal'
      ],
      price: 'Rp 2.200.000 - 3.500.000',
      description: 'Transitions GEN S ➤ Gelap dalam hitungan detik saat di luar ruangan. ➤ Teknologi Chromea7 untuk warna lebih stabil dan perlindungan maksimal.',
      reasons: ['Perubahan warna tercepat di kelasnya', 'Perlindungan maksimal dengan teknologi terbaru'],
      category: 'premium',
      emoji: '☀️'
    },
    {
      type: 'Lensa Photochromic Premium',
      brand: 'Zeiss PhotoFusion X',
      features: [
        'Cepat terang dan gelap, bahkan di cuaca ekstrem',
        'Proteksi terhadap UV dan blue light sekaligus'
      ],
      price: 'Rp 2.000.000 - 3.200.000',
      description: 'Zeiss PhotoFusion X ➤ Cepat terang dan gelap, bahkan di cuaca ekstrem. ➤ Proteksi terhadap UV dan blue light sekaligus.',
      reasons: ['Performa optimal di segala cuaca', 'Perlindungan komprehensif UV dan blue light'],
      category: 'premium',
      emoji: '☀️'
    }
  ],
  standard: [
    {
      type: 'Lensa Photochromic Standard',
      brand: 'Kodak EvoBlue',
      features: [
        'Lensa bening di dalam, berubah gelap di luar',
        'Tersedia juga versi dengan filter blue light'
      ],
      price: 'Rp 1.200.000 - 2.000.000',
      description: 'Kodak EvoBlue ➤ Lensa bening di dalam, berubah gelap di luar. ➤ Tersedia juga versi dengan filter blue light.',
      reasons: ['Solusi ekonomis untuk photochromic', 'Bonus perlindungan blue light'],
      category: 'standard',
      emoji: '☀️'
    }
  ]
};

// 🧾 Custom Single Vision Lenses
export const customSingleVisionLenses: Record<'premium' | 'standard', LensRecommendation[]> = {
  premium: [
    {
      type: 'Lensa Single Vision Premium',
      brand: 'Crizal (Essilor)',
      features: [
        'Lapisan anti-refleksi premium, anti gores, tahan air, mudah dibersihkan',
        'Cocok untuk pemakaian harian dengan performa tinggi'
      ],
      price: 'Rp 1.500.000 - 2.500.000',
      description: 'Crizal (Essilor) ➤ Lapisan anti-refleksi premium, anti gores, tahan air, mudah dibersihkan. ➤ Cocok untuk pemakaian harian dengan performa tinggi.',
      reasons: ['Lapisan premium dengan durabilitas tinggi', 'Performa optimal untuk penggunaan harian'],
      category: 'premium',
      emoji: '🧾'
    },
    {
      type: 'Lensa Single Vision Premium',
      brand: 'Zeiss SV Superb',
      features: [
        'Desain lensa lebih presisi sesuai bentuk mata dan bingkai',
        'Pandangan lebih tajam dan nyaman di semua area'
      ],
      price: 'Rp 1.400.000 - 2.200.000',
      description: 'Zeiss SV Superb ➤ Desain lensa lebih presisi sesuai bentuk mata dan bingkai. ➤ Pandangan lebih tajam dan nyaman di semua area.',
      reasons: ['Desain presisi individual', 'Kenyamanan optimal di seluruh area lensa'],
      category: 'premium',
      emoji: '🧾'
    }
  ],
  standard: [
    {
      type: 'Lensa Single Vision Standard',
      brand: 'Kodak UVBlue',
      features: [
        'Perlindungan UV + blue light dasar',
        'Cocok untuk pengguna yang butuh lensa ekonomis tapi tetap aman'
      ],
      price: 'Rp 600.000 - 1.200.000',
      description: 'Kodak UVBlue ➤ Perlindungan UV + blue light dasar. ➤ Cocok untuk pengguna yang butuh lensa ekonomis tapi tetap aman.',
      reasons: ['Solusi ekonomis dengan perlindungan dasar', 'Keamanan mata dengan harga terjangkau'],
      category: 'standard',
      emoji: '🧾'
    }
  ]
};

// 📦 Stock/Ready Single Vision Lenses
export const stockSingleVisionLenses: Record<'premium' | 'standard', LensRecommendation[]> = {
  premium: [
    {
      type: 'Lensa Stok Premium',
      brand: 'Crizal FSV',
      features: [
        'Lensa siap pakai dengan lapisan Crizal (anti silau, tahan kotoran)',
        'Ideal untuk pengguna baru yang ingin langsung pakai'
      ],
      price: 'Rp 1.200.000 - 1.800.000',
      description: 'Crizal FSV ➤ Lensa siap pakai dengan lapisan Crizal (anti silau, tahan kotoran). ➤ Ideal untuk pengguna baru yang ingin langsung pakai.',
      reasons: ['Tersedia cepat dengan kualitas premium', 'Cocok untuk kebutuhan mendesak'],
      category: 'premium',
      emoji: '📦'
    },
    {
      type: 'Lensa Stok Premium',
      brand: 'Zeiss ClearView FSV',
      features: [
        'Lensa lebih tipis dan ringan, tajam hingga ke tepi',
        'Kualitas optik di atas rata-rata lensa stok biasa'
      ],
      price: 'Rp 1.000.000 - 1.600.000',
      description: 'Zeiss ClearView FSV ➤ Lensa lebih tipis dan ringan, tajam hingga ke tepi. ➤ Kualitas optik di atas rata-rata lensa stok biasa.',
      reasons: ['Kualitas optik superior untuk lensa stok', 'Desain tipis dan ringan'],
      category: 'premium',
      emoji: '📦'
    }
  ],
  standard: [
    {
      type: 'Lensa Stok Standard',
      brand: 'Kodak UVBlue FSV',
      features: [
        'Filter blue light + UV untuk pemakaian harian',
        'Harga ekonomis, tersedia cepat'
      ],
      price: 'Rp 500.000 - 900.000',
      description: 'Kodak UVBlue FSV ➤ Filter blue light + UV untuk pemakaian harian. ➤ Harga ekonomis, tersedia cepat.',
      reasons: ['Solusi cepat dan ekonomis', 'Perlindungan dasar yang memadai'],
      category: 'standard',
      emoji: '📦'
    },
    {
      type: 'Lensa Stok Standard',
      brand: 'Polycore UBlue FSV',
      features: [
        'Perlindungan dasar dari cahaya biru',
        'Solusi hemat untuk pengguna digital ringan'
      ],
      price: 'Rp 400.000 - 700.000',
      description: 'Polycore UBlue FSV ➤ Perlindungan dasar dari cahaya biru. ➤ Solusi hemat untuk pengguna digital ringan.',
      reasons: ['Harga paling terjangkau', 'Cocok untuk pengguna digital ringan'],
      category: 'standard',
      emoji: '📦'
    }
  ]
};
