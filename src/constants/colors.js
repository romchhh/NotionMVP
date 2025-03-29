// Кольори для статусів
export const STATUS_COLORS = {
  todo: {
    light: '#ff5555',
    dark: '#ff5555',
    bg: 'rgba(255, 85, 85, 0.1)',
    border: 'rgba(255, 85, 85, 0.2)'
  },
  'in-progress': {
    light: '#40a0ff',
    dark: '#40a0ff',
    bg: 'rgba(64, 160, 255, 0.1)',
    border: 'rgba(64, 160, 255, 0.2)'
  },
  done: {
    light: '#52c41a',
    dark: '#52c41a',
    bg: 'rgba(82, 196, 26, 0.1)',
    border: 'rgba(82, 196, 26, 0.2)'
  }
};

// Кольори для пріоритетів
export const PRIORITY_COLORS = {
  high: {
    light: '#ff4d4f',
    dark: '#ff4d4f',
    bg: 'rgba(255, 77, 79, 0.1)',
    border: 'rgba(255, 77, 79, 0.2)'
  },
  medium: {
    light: '#faad14',
    dark: '#faad14',
    bg: 'rgba(250, 173, 20, 0.1)',
    border: 'rgba(250, 173, 20, 0.2)'
  },
  low: {
    light: '#52c41a',
    dark: '#52c41a',
    bg: 'rgba(82, 196, 26, 0.1)',
    border: 'rgba(82, 196, 26, 0.2)'
  }
};

// Текстові мітки
export const STATUS_LABELS = {
  todo: 'Нове',
  'in-progress': 'В процесі',
  done: 'Виконано'
};

export const PRIORITY_LABELS = {
  high: 'Високий',
  medium: 'Середній',
  low: 'Низький'
}; 