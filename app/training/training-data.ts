export interface TrainingItem {
  id: string;
  time: string;
  listTitle: string;
  coach: string;
  booked: number;
  capacity: number;
  accent: string;
  category: string;
  level: string;
  title: string;
  highlight: string;
  duration: string;
  trainerName: string;
  trainerBadge: string;
  trainerImage: string;
}

const trainerImage =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuD4EFulVX07EysCx3bp-xSTWevzL1E4C425l4WyTrN57TAkm6XHEbpEsuFtd9nJIa0QLPRL3y8s_nFF8Cb-pPIvLTEHMDSZFh6ioAQhm-6yg8JWjL6asg2fVU9rvYsJiTfD9Cps38-Q3hvplia9LDSLArVkL0ERr8WkiUEmdOdDDO0Ehvgn2tTH8fVpLBtD944fmAvJ6ppsBDQXdx_X5WhZt9mf8AHbgiMEM3kN4YyRZwAMg9jUWh5hoRrP4LTE4lLtd4hpp9zRvWbi';

export const trainingData: TrainingItem[] = [
  {
    id: 'technique-morning',
    time: '07:00 — 08:30',
    listTitle: 'Muay Thai Technik',
    coach: 'Kru Somchai',
    booked: 24,
    capacity: 40,
    accent: '#1ad1d1',
    category: 'Muay Thai',
    level: 'Fortgeschritten',
    title: 'Muay Thai',
    highlight: 'Technik',
    duration: '90 Min',
    trainerName: 'Kru Somchai',
    trainerBadge: 'Coach',
    trainerImage,
  },
  {
    id: 'sparring-midday',
    time: '12:00 — 13:30',
    listTitle: 'Muay Thai Sparring',
    coach: 'Kru Anan',
    booked: 38,
    capacity: 40,
    accent: '#e35b5b',
    category: 'Muay Thai',
    level: 'Fortgeschritten',
    title: 'Muay Thai',
    highlight: 'Sparring',
    duration: '90 Min',
    trainerName: 'Kru Anan',
    trainerBadge: 'Coach',
    trainerImage,
  },
  {
    id: 'technique-evening',
    time: '17:30 — 19:00',
    listTitle: 'Muay Thai Technik',
    coach: 'Kru Malee',
    booked: 12,
    capacity: 40,
    accent: '#1ad1d1',
    category: 'Muay Thai',
    level: 'Fortgeschritten',
    title: 'Muay Thai',
    highlight: 'Technik',
    duration: '90 Min',
    trainerName: 'Kru Malee',
    trainerBadge: 'Coach',
    trainerImage,
  },
];

export const trainingById = trainingData.reduce<Record<string, TrainingItem>>((acc, item) => {
  acc[item.id] = item;
  return acc;
}, {});
