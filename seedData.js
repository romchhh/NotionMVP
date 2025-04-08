const mongoose = require('mongoose');
const Task = require('./models/Task');

const tasks = [
  {
    title: "Розробка головної сторінки",
    description: "Створити адаптивний дизайн головної сторінки з урахуванням мобільних пристроїв",
    status: "todo",
    priority: "high",
    tags: ["Frontend", "UI/UX"],
    assignee: "Олександр",
    dueDate: "2024-04-15",
    checklist: [
      { text: "Створити макет", completed: true },
      { text: "Реалізувати верстку", completed: false },
      { text: "Додати анімації", completed: false }
    ]
  },
  {
    title: "Налаштування бази даних",
    description: "Налаштувати MongoDB та створити необхідні колекції",
    status: "todo",
    priority: "high",
    tags: ["Backend", "Database"],
    assignee: "Марія",
    dueDate: "2024-04-10",
    checklist: [
      { text: "Встановити MongoDB", completed: true },
      { text: "Створити схеми", completed: true },
      { text: "Налаштувати індекси", completed: false }
    ]
  },
  {
    title: "Тестування API",
    description: "Провести повне тестування всіх API endpoints",
    status: "todo",
    priority: "medium",
    tags: ["QA", "Testing"],
    assignee: "Іван",
    dueDate: "2024-04-12",
    checklist: [
      { text: "Написати тест-кейси", completed: true },
      { text: "Виконати тестування", completed: false }
    ]
  },
  {
    title: "Оптимізація продуктивності",
    description: "Покращити швидкість завантаження сторінок",
    status: "todo",
    priority: "low",
    tags: ["Performance", "Frontend"],
    assignee: "Анна",
    dueDate: "2024-04-08",
    checklist: [
      { text: "Аналіз продуктивності", completed: true },
      { text: "Оптимізація зображень", completed: true },
      { text: "Мінімізація CSS/JS", completed: true }
    ]
  },
  {
    title: "Інтеграція платіжної системи",
    description: "Додати можливість оплати через LiqPay",
    status: "todo",
    priority: "high",
    tags: ["Backend", "Payment"],
    assignee: "Петро",
    dueDate: "2024-04-20",
    checklist: [
      { text: "Вивчити документацію", completed: true },
      { text: "Реалізувати API", completed: false },
      { text: "Протестувати оплату", completed: false }
    ]
  },
  {
    title: "Локалізація додатку",
    description: "Додати підтримку української та англійської мов",
    status: "todo",
    priority: "medium",
    tags: ["i18n", "Frontend"],
    assignee: "Софія",
    dueDate: "2024-04-18",
    checklist: [
      { text: "Підготувати тексти", completed: true },
      { text: "Налаштувати i18next", completed: false }
    ]
  }
];

mongoose.connect('mongodb://localhost:27017/kanban', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(async () => {
  console.log('Підключено до бази даних');
  
  try {
    // Видаляємо всі існуючі завдання
    await Task.deleteMany({});
    console.log('Старі дані видалено');

    // Додаємо нові завдання
    await Task.insertMany(tasks);
    console.log('Нові завдання додано успішно');
    
    mongoose.connection.close();
    console.log('З\'єднання з базою даних закрито');
  } catch (error) {
    console.error('Помилка при заповненні бази даних:', error);
    mongoose.connection.close();
  }
})
.catch(error => {
  console.error('Помилка підключення до бази даних:', error);
}); 