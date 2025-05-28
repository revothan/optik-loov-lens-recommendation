export interface Question {
  id: string;
  question: string;
  options: Option[];
  type: 'single' | 'multiple';
}

export interface Option {
  id: string;
  text: string;
  value: string;
  nextQuestion?: string;
}

export interface QuizAnswer {
  questionId: string;
  answer: string | string[];
}

export interface LensRecommendation {
  type: string;
  brand: string;
  features: string[];
  price: string;
  description: string;
  reasons: string[];
}

export const questions: Question[] = [
  {
    id: 'age',
    question: 'Berapa usia Anda?',
    type: 'single',
    options: [
      { id: 'under-25', text: 'Di bawah 25 tahun', value: 'under-25', nextQuestion: 'activity' },
      { id: '25-40', text: '25-40 tahun', value: '25-40', nextQuestion: 'activity' },
      { id: 'over-40', text: 'Di atas 40 tahun', value: 'over-40', nextQuestion: 'vision-type' }
    ]
  },
  {
    id: 'activity',
    question: 'Aktivitas utama Anda sehari-hari?',
    type: 'single',
    options: [
      { id: 'indoor', text: 'Lebih banyak di dalam ruangan', value: 'indoor', nextQuestion: 'screen-time' },
      { id: 'outdoor', text: 'Lebih banyak di luar ruangan', value: 'outdoor', nextQuestion: 'photochromic' },
      { id: 'mixed', text: 'Campuran indoor dan outdoor', value: 'mixed', nextQuestion: 'screen-time' }
    ]
  },
  {
    id: 'screen-time',
    question: 'Berapa lama Anda menggunakan layar digital per hari?',
    type: 'single',
    options: [
      { id: 'low', text: 'Kurang dari 4 jam', value: 'low', nextQuestion: 'vision-correction' },
      { id: 'medium', text: '4-8 jam', value: 'medium', nextQuestion: 'vision-correction' },
      { id: 'high', text: 'Lebih dari 8 jam', value: 'high', nextQuestion: 'vision-correction' }
    ]
  },
  {
    id: 'photochromic',
    question: 'Apakah Anda tertarik dengan lensa yang dapat berubah warna (Transitions)?',
    type: 'single',
    options: [
      { id: 'yes', text: 'Ya, tertarik', value: 'yes', nextQuestion: 'vision-correction' },
      { id: 'no', text: 'Tidak, lebih suka kacamata hitam terpisah', value: 'no', nextQuestion: 'vision-correction' }
    ]
  },
  {
    id: 'vision-type',
    question: 'Jenis gangguan penglihatan Anda?',
    type: 'single',
    options: [
      { id: 'reading-only', text: 'Hanya sulit membaca jarak dekat', value: 'reading-only', nextQuestion: 'progressive-comfort' },
      { id: 'distance-only', text: 'Hanya sulit melihat jarak jauh', value: 'distance-only', nextQuestion: 'activity' },
      { id: 'both', text: 'Sulit melihat jauh dan dekat', value: 'both', nextQuestion: 'progressive-comfort' }
    ]
  },
  {
    id: 'progressive-comfort',
    question: 'Apakah Anda nyaman dengan lensa progresif (tanpa garis)?',
    type: 'single',
    options: [
      { id: 'yes', text: 'Ya, saya sudah terbiasa', value: 'yes', nextQuestion: 'activity' },
      { id: 'no', text: 'Tidak, saya lebih suka bifocal', value: 'no', nextQuestion: 'activity' },
      { id: 'never-tried', text: 'Belum pernah coba', value: 'never-tried', nextQuestion: 'activity' }
    ]
  },
  {
    id: 'vision-correction',
    question: 'Jenis koreksi penglihatan yang Anda butuhkan?',
    type: 'single',
    options: [
      { id: 'myopia', text: 'Rabun jauh (minus)', value: 'myopia', nextQuestion: 'astigmatism' },
      { id: 'hyperopia', text: 'Rabun dekat (plus)', value: 'hyperopia', nextQuestion: 'astigmatism' },
      { id: 'presbyopia', text: 'Mata tua (baca dekat sulit)', value: 'presbyopia', nextQuestion: 'astigmatism' }
    ]
  },
  {
    id: 'astigmatism',
    question: 'Apakah Anda memiliki astigmatism (silinder)?',
    type: 'single',
    options: [
      { id: 'yes', text: 'Ya', value: 'yes', nextQuestion: 'lens-preference' },
      { id: 'no', text: 'Tidak', value: 'no', nextQuestion: 'lens-preference' },
      { id: 'not-sure', text: 'Tidak yakin', value: 'not-sure', nextQuestion: 'lens-preference' }
    ]
  },
  {
    id: 'lens-preference',
    question: 'Preferensi lensa Anda?',
    type: 'multiple',
    options: [
      { id: 'thin', text: 'Tipis dan ringan', value: 'thin' },
      { id: 'anti-glare', text: 'Anti silau', value: 'anti-glare' },
      { id: 'blue-light', text: 'Perlindungan blue light', value: 'blue-light' },
      { id: 'scratch-resistant', text: 'Tahan gores', value: 'scratch-resistant' }
    ]
  },
  {
    id: 'budget',
    question: 'Range budget yang Anda inginkan?',
    type: 'single',
    options: [
      { id: 'economy', text: 'Ekonomis (Rp 500.000 - 1.500.000)', value: 'economy' },
      { id: 'premium', text: 'Premium (Rp 1.500.000 - 3.000.000)', value: 'premium' },
      { id: 'luxury', text: 'Luxury (Di atas Rp 3.000.000)', value: 'luxury' }
    ]
  }
];

export function getNextQuestion(currentQuestionId: string, answer: string): string | null {
  const question = questions.find(q => q.id === currentQuestionId);
  if (!question) return null;

  const option = question.options.find(opt => opt.value === answer);
  if (option && option.nextQuestion) {
    return option.nextQuestion;
  }

  // Default next question logic
  const currentIndex = questions.findIndex(q => q.id === currentQuestionId);
  if (currentIndex < questions.length - 1) {
    return questions[currentIndex + 1].id;
  }

  return null; // End of quiz
}

export function generateRecommendation(answers: QuizAnswer[]): LensRecommendation[] {
  const recommendations: LensRecommendation[] = [];
  
  const age = answers.find(a => a.questionId === 'age')?.answer as string;
  const activity = answers.find(a => a.questionId === 'activity')?.answer as string;
  const screenTime = answers.find(a => a.questionId === 'screen-time')?.answer as string;
  const photochromic = answers.find(a => a.questionId === 'photochromic')?.answer as string;
  const visionType = answers.find(a => a.questionId === 'vision-type')?.answer as string;
  const visionCorrection = answers.find(a => a.questionId === 'vision-correction')?.answer as string;
  const astigmatism = answers.find(a => a.questionId === 'astigmatism')?.answer as string;
  const preferences = answers.find(a => a.questionId === 'lens-preference')?.answer as string[];
  const budget = answers.find(a => a.questionId === 'budget')?.answer as string;

  // Progressive lens recommendation for 40+
  if (age === 'over-40' || visionType === 'both' || visionCorrection === 'presbyopia') {
    if (budget === 'luxury') {
      recommendations.push({
        type: 'Lensa Progresif Premium',
        brand: 'Varilux X Series atau Zeiss SmartLife',
        features: ['Transisi mulus', 'Field of vision luas', 'Anti-glare premium'],
        price: 'Rp 3.000.000 - 5.000.000',
        description: 'Lensa progresif terbaik dengan teknologi terdepan untuk kenyamanan maksimal.',
        reasons: ['Usia di atas 40 tahun membutuhkan koreksi presbyopia', 'Budget memungkinkan untuk premium quality']
      });
    } else {
      recommendations.push({
        type: 'Lensa Progresif Standard',
        brand: 'Essilor Liberty atau Zeiss Officelens',
        features: ['Progresif dasar', 'Anti-glare standard', 'Cocok untuk pemula'],
        price: 'Rp 1.500.000 - 2.500.000',
        description: 'Lensa progresif dengan kualitas baik dan harga terjangkau.',
        reasons: ['Solusi praktis untuk presbyopia', 'Nilai terbaik sesuai budget']
      });
    }
  }

  // Blue light protection for high screen time
  if (screenTime === 'high' || (preferences && preferences.includes('blue-light'))) {
    recommendations.push({
      type: 'Lensa Blue Light Protection',
      brand: 'Essilor Eyezen atau Zeiss DuraVision BlueProtect',
      features: ['Perlindungan blue light', 'Mengurangi mata lelah', 'Anti-glare'],
      price: 'Rp 800.000 - 1.800.000',
      description: 'Lensa khusus untuk perlindungan dari radiasi blue light layar digital.',
      reasons: ['Penggunaan layar digital intensif', 'Mencegah mata lelah dan gangguan tidur']
    });
  }

  // Photochromic for outdoor activities
  if (activity === 'outdoor' || photochromic === 'yes') {
    if (budget === 'luxury') {
      recommendations.push({
        type: 'Lensa Photochromic Premium',
        brand: 'Transitions Signature GEN 8 atau Zeiss PhotoFusion',
        features: ['Perubahan warna cepat', 'UV protection 100%', 'Fade back time optimal'],
        price: 'Rp 2.000.000 - 3.500.000',
        description: 'Lensa photochromic dengan teknologi terbaru, berubah warna dengan cepat.',
        reasons: ['Aktivitas outdoor yang tinggi', 'Kenyamanan dan perlindungan maksimal']
      });
    } else {
      recommendations.push({
        type: 'Lensa Photochromic Standard',
        brand: 'Transitions atau Photogray Basic',
        features: ['Berubah warna otomatis', 'UV protection', 'Ekonomis'],
        price: 'Rp 1.200.000 - 2.000.000',
        description: 'Lensa photochromic dengan kualitas standar yang reliable.',
        reasons: ['Solusi praktis untuk aktivitas indoor-outdoor', 'Harga terjangkau']
      });
    }
  }

  // Thin lens for high prescription or preference
  if (preferences && preferences.includes('thin')) {
    recommendations.push({
      type: 'Lensa High Index (Tipis)',
      brand: 'Zeiss 1.67 atau Essilor Thin & Lite',
      features: ['Ultra tipis', 'Ringan', 'Estetika lebih baik'],
      price: 'Rp 1.800.000 - 3.200.000',
      description: 'Lensa dengan indeks tinggi untuk hasil yang lebih tipis dan ringan.',
      reasons: ['Preferensi untuk lensa tipis', 'Kenyamanan dan penampilan optimal']
    });
  }

  // Default single vision for younger users
  if (age === 'under-25' || age === '25-40') {
    if (budget === 'economy') {
      recommendations.push({
        type: 'Lensa Single Vision Standard',
        brand: 'Essilor Orma atau Zeiss Single Vision',
        features: ['Koreksi satu jarak', 'Anti-glare basic', 'Tahan gores'],
        price: 'Rp 500.000 - 1.200.000',
        description: 'Lensa single vision dengan kualitas standar untuk koreksi dasar.',
        reasons: ['Usia muda dengan kebutuhan koreksi sederhana', 'Budget ekonomis']
      });
    }
  }

  // If no specific recommendations, add default
  if (recommendations.length === 0) {
    recommendations.push({
      type: 'Lensa Standard Multifocal',
      brand: 'Essilor atau Zeiss Standard',
      features: ['Koreksi penglihatan lengkap', 'Anti-glare', 'Kualitas baik'],
      price: 'Rp 1.000.000 - 2.000.000',
      description: 'Rekomendasi lensa standar yang cocok untuk kebutuhan umum.',
      reasons: ['Solusi serbaguna untuk berbagai kebutuhan']
    });
  }

  return recommendations.slice(0, 3); // Return max 3 recommendations
}
