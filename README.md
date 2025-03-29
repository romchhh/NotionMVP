# Kanban Board Application

## Опис проекту
Це веб-додаток для управління задачами в стилі канбан-дошки, розроблений з використанням React для фронтенду та Node.js/Express/MongoDB для бекенду. Додаток дозволяє користувачам ефективно організовувати та відстежувати свої задачі через візуальний інтерфейс з можливістю перетягування.

## Технології
### Frontend
- React.js
- Material-UI (MUI) для компонентів інтерфейсу
- @hello-pangea/dnd для функціоналу drag-and-drop
- Axios для HTTP запитів
- date-fns для форматування дат

### Backend
- Node.js
- Express.js
- MongoDB з Mongoose
- CORS для крос-доменних запитів

## Архітектура проекту

### Структура файлів
```
my-crud-app/
├── src/
│   ├── components/
│   │   ├── KanbanBoard.js
│   │   ├── TaskCard.js
│   │   ├── AddTaskForm.js
│   │   └── KanbanStats.js
│   ├── styles/
│   │   ├── KanbanBoard.css
│   │   └── TaskCard.css
│   └── constants/
│       └── colors.js
├── server/
│   ├── models/
│   │   └── Task.js
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── controllers/
│   │   └── taskController.js
│   └── server.js
```

## Основні компоненти

### 1. KanbanBoard
Головний компонент, який відповідає за відображення всієї канбан-дошки.

```javascript
const KanbanBoard = ({ darkMode }) => {
  // Стан для зберігання задач
  const [tasks, setTasks] = useState([]);
  
  // Функція для отримання задач з сервера
  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/tasks');
      setTasks(response.data);
    } catch (error) {
      setError('Помилка завантаження задач');
    }
  };

  // Обробка перетягування задач
  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;
    // Оновлення статусу задачі при перетягуванні
  };
}
```

Особливості:
- Використання DragDropContext для організації перетягування
- Розділення задач за статусами (todo, in-progress, done)
- Адаптивний дизайн з використанням Grid
- Підтримка темної/світлої теми

### 2. TaskCard
Компонент для відображення окремої задачі.

```javascript
const TaskCard = ({ task, onTaskUpdated, darkMode, isDragging }) => {
  // Стан для редагування задачі
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority || 'medium',
    tags: task.tags || [],
    assignee: task.assignee || '',
    dueDate: task.dueDate || '',
    checklist: task.checklist || []
  });
}
```

Функціонал:
- Відображення всіх полів задачі
- Можливість редагування через діалогове вікно
- Підтримка тегів та чекліста
- Візуальна індикація пріоритету та статусу

### 3. AddTaskForm
Компонент для створення нових задач.

```javascript
const AddTaskForm = ({ onTaskAdded, darkMode }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'todo',
    priority: 'medium',
    tags: [],
    assignee: '',
    dueDate: '',
    checklist: []
  });
}
```

Можливості:
- Створення задачі з усіма необхідними полями
- Динамічне додавання тегів
- Управління чеклістом
- Вибір пріоритету та дедлайну

## Серверна частина

### Модель задачі
```javascript
const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  tags: [String],
  assignee: String,
  dueDate: Date,
  checklist: [{
    text: String,
    completed: Boolean
  }]
});
```

### API Endpoints
- GET /api/tasks - отримання всіх задач
- POST /api/tasks - створення нової задачі
- PUT /api/tasks/:id - оновлення задачі
- DELETE /api/tasks/:id - видалення задачі
- GET /api/tasks/stats - отримання статистики

## Особливості реалізації

### 1. Drag and Drop
Використання бібліотеки @hello-pangea/dnd для реалізації перетягування задач між колонками:
```javascript
<DragDropContext onDragEnd={onDragEnd}>
  <Droppable droppableId={status}>
    <Draggable key={task._id} draggableId={task._id} index={index}>
      <TaskCard />
    </Draggable>
  </Droppable>
</DragDropContext>
```

### 2. Стилізація
Використання комбінації Material-UI та власних CSS стилів:
```css
.task-card {
  position: relative;
  width: 100%;
  transition: all 0.2s ease;
  border-radius: 12px !important;
}

.task-card.dark {
  background-color: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 3. Темна тема
Підтримка темної теми через пропси та CSS класи:
```javascript
<Box className={`kanban-container ${darkMode ? 'dark' : 'light'}`}>
```

## Висновки

Проект демонструє реалізацію сучасного веб-додатку з використанням:
1. Компонентного підходу React
2. Сучасних практик UI/UX дизайну
3. REST API архітектури
4. MongoDB для гнучкого зберігання даних
5. Drag and Drop функціоналу
6. Адаптивного дизайну
7. Підтримки темної/світлої теми

### Переваги реалізації:
- Модульна архітектура
- Чистий та підтримуваний код
- Сучасний UI з анімаціями
- Повна функціональність управління задачами
- Гнучка система зберігання даних

### Можливі покращення:
- Додавання автентифікації
- Підтримка командної роботи
- Додавання фільтрів та пошуку
- Інтеграція з календарем
- Додавання сповіщень

## Встановлення та запуск

### Передумови
- Node.js (версія 14 або вище)
- MongoDB (версія 4.4 або вище)
- npm або yarn

### Кроки встановлення

1. Клонування репозиторію:
```bash
git clone <repository-url>
cd my-crud-app
```

2. Встановлення залежностей:
```bash
# Встановлення залежностей для фронтенду
cd client
npm install

# Встановлення залежностей для бекенду
cd ../server
npm install
```

3. Налаштування бази даних:
- Запустіть MongoDB сервер
- База даних буде створена автоматично при першому запуску

4. Запуск проекту:
```bash
# Запуск бекенду (з папки server)
npm start

# Запуск фронтенду (з папки client)
npm start
```

5. Відкрийте браузер і перейдіть за адресою:
```
http://localhost:3000
```

### Структура бази даних

MongoDB колекція `tasks` має наступну структуру:
```javascript
{
  _id: ObjectId,
  title: String,
  description: String,
  status: String,
  priority: String,
  tags: Array,
  assignee: String,
  dueDate: Date,
  checklist: Array,
  createdAt: Date,
  updatedAt: Date
}
```

### Змінні середовища

Створіть файл `.env` в папці `server`:
```env
PORT=5001
MONGODB_URI=mongodb://localhost:27017/kanban
```

## Тестування

Для запуску тестів:
```bash
# Тести фронтенду
cd client
npm test

# Тести бекенду
cd ../server
npm test
```

## Розгортання

Проект можна розгорнути на будь-якій платформі, що підтримує Node.js та MongoDB:
- Heroku
- DigitalOcean
- AWS
- Google Cloud Platform

### Приклад розгортання на Heroku:
1. Створіть новий проект на Heroku
2. Налаштуйте MongoDB Atlas
3. Додайте змінні середовища в налаштуваннях Heroku
4. Підключіть репозиторій до Heroku
5. Запустіть розгортання

## MongoDB в проекті

### Чому MongoDB?

MongoDB було обрано для цього проекту з кількох причин:

1. **Гнучка схема даних**
   - Можливість зберігати різні типи задач з різним набором полів
   - Легке додавання нових полів без зміни структури бази даних
   - Підтримка вкладених документів (наприклад, для чеклістів)

2. **Масштабованість**
   - Горизонтальне масштабування через шардинг
   - Висока продуктивність при великій кількості задач
   - Ефективна робота з індексами

3. **Зручність роботи з JSON-подібними даними**
   - Природня інтеграція з JavaScript/Node.js
   - Відсутність необхідності в ORM
   - Прямий маппінг даних між клієнтом і сервером

### Структура даних

#### Колекція Tasks
```javascript
{
  _id: ObjectId,            // Унікальний ідентифікатор
  title: String,           // Назва задачі
  description: String,     // Опис задачі
  status: {
    type: String,         // Статус (todo, in-progress, done)
    enum: ['todo', 'in-progress', 'done'],
    default: 'todo'
  },
  priority: {
    type: String,         // Пріоритет (low, medium, high)
    enum: ['low', 'medium', 'high'],
    default: 'medium'
  },
  tags: [String],         // Масив тегів
  assignee: String,       // Відповідальна особа
  dueDate: Date,         // Дедлайн
  checklist: [{           // Вкладений масив пунктів чекліста
    text: String,        // Текст пункту
    completed: Boolean   // Статус виконання
  }],
  createdAt: Date,       // Дата створення
  updatedAt: Date        // Дата останнього оновлення
}
```

### Індекси

```javascript
// Індекси для оптимізації запитів
db.tasks.createIndex({ status: 1 });           // Для фільтрації за статусом
db.tasks.createIndex({ createdAt: -1 });       // Для сортування за датою створення
db.tasks.createIndex({ tags: 1 });             // Для пошуку за тегами
db.tasks.createIndex({ "checklist.completed": 1 }); // Для фільтрації за виконаними пунктами
```

### Приклади запитів

#### Отримання задач за статусом
```javascript
const todoTasks = await Task.find({ status: 'todo' }).sort({ createdAt: -1 });
```

#### Агрегація для статистики
```javascript
const stats = await Task.aggregate([
  {
    $group: {
      _id: '$status',
      count: { $sum: 1 }
    }
  }
]);
```

#### Оновлення статусу задачі
```javascript
await Task.findByIdAndUpdate(
  taskId,
  { 
    $set: { 
      status: newStatus,
      updatedAt: new Date()
    }
  },
  { new: true }
);
```

### Взаємодія з MongoDB через Mongoose

#### Підключення до бази даних
```javascript
mongoose.connect('mongodb://localhost:27017/kanban', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
```

#### Middleware для автоматичного оновлення дати
```javascript
taskSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});
```

### Переваги використання MongoDB в проекті

1. **Продуктивність**
   - Швидкий доступ до даних через індекси
   - Ефективна робота з великими наборами даних
   - Кешування в пам'яті через WiredTiger

2. **Гнучкість**
   - Легке додавання нових полів
   - Підтримка різних типів даних
   - Можливість зберігання складних структур

3. **Надійність**
   - Автоматична реплікація даних
   - Вбудоване резервне копіювання
   - Журналювання операцій

4. **Масштабованість**
   - Горизонтальне масштабування
   - Балансування навантаження
   - Підтримка великих об'ємів даних

### Рекомендації щодо роботи з MongoDB

1. **Індексація**
   - Створюйте індекси для часто використовуваних полів
   - Уникайте надмірної індексації
   - Моніторте використання індексів

2. **Валідація даних**
   - Використовуйте схеми Mongoose
   - Встановлюйте обмеження на рівні схеми
   - Перевіряйте дані перед збереженням

3. **Оптимізація запитів**
   - Використовуйте проекції для вибору потрібних полів
   - Обмежуйте кількість результатів
   - Використовуйте агрегацію для складних запитів
