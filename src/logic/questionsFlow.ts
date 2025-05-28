import { Question } from './types';

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
      { id: 'presbyopia', text: 'Presbiop', value: 'presbyopia', nextQuestion: 'astigmatism' },
      { id: 'none', text: 'Tidak ada masalah khusus', value: 'none', nextQuestion: 'astigmatism' }
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
