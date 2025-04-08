const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// Отримати всі задачі
router.get('/tasks', taskController.getAllTasks);

// Отримати статистику
router.get('/tasks/stats', taskController.getTaskStats);

// Створити нову задачу
router.post('/tasks', taskController.createTask);

// Оновити задачу
router.put('/tasks/:id', taskController.updateTask);

// Видалити задачу
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router; 