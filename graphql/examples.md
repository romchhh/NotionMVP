1. Отримання всіх задач
{
  tasks {
    _id
    title
    description
    status
    priority
    tags
    assignee
    dueDate
    checklist {
      text
      completed
    }
  }
}




2. Отримання конкретної задачі за ID
{
  task(id: "67f5646e4f6944b11ddc2dd8") {
    _id
    title
    description
    status
    priority
    tags
    assignee
    dueDate
    checklist {
      text
      completed
    }
  }
}



3. Отримання задач за статусом
{
  tasksByStatus(status: "in-progress") {
    _id
    title
    description
    status
    priority
    assignee
  }
}



4. Створення нової задачі
mutation {
  createTask(input: {
    title: "Розробити новий функціонал"
    description: "Додати можливість фільтрації задач"
    status: "todo"
    priority: "high"
    tags: ["розробка", "важливе"]
    assignee: "Олександр"
    dueDate: "2024-03-25"
    checklist: [
      {
        text: "Створити компонент фільтрів"
        completed: false
      },
      {
        text: "Додати API endpoint"
        completed: false
      }
    ]
  }) {
    _id
    title
    status
  }
}


5. Оновлення задачі
mutation {
  updateTask(
    id: "67f5646e4f6944b11ddc2dd8"
    input: {
      title: "Оновлений функціонал"
      description: "Оновлений опис задачі"
      status: "in-progress"
      priority: "medium"
      tags: ["розробка", "оновлено"]
      assignee: "Петро"
      checklist: [
        {
          text: "Нова підзадача"
          completed: true
        }
      ]
    }
  ) {
    _id
    title
    status
  }
}


6. Видалення задачі
mutation {
  deleteTask(id: "67f5646e4f6944b11ddc2dd8") {
    _id
    title
  }
}


7. Оновлення статусу задачі
mutation {
  updateTaskStatus(
    id: "67f5646e4f6944b11ddc2dd8", 
    status: "done"
  ) {
    _id
    title
    status
    updatedAt
  }
}


8. Отримання задач з фільтрами
{
  tasks {
    _id
    title
    status
    priority
    assignee
    dueDate
    checklist {
      text
      completed
    }
  }
}


9. Отримання статистики
{
  tasks {
    status
    priority
  }
}