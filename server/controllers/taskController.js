const Task = require('../models/Task');

// Отримати всі задачі
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Створити нову задачу
exports.createTask = async (req, res) => {
  try {
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status || 'todo',
      priority: req.body.priority,
      tags: req.body.tags,
      assignee: req.body.assignee,
      dueDate: req.body.dueDate,
      checklist: req.body.checklist
    });

    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Оновити задачу
exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority,
        tags: req.body.tags,
        assignee: req.body.assignee,
        dueDate: req.body.dueDate,
        checklist: req.body.checklist,
        updatedAt: new Date()
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: 'Задачу не знайдено' });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Видалити задачу
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Задачу не знайдено' });
    }

    res.json({ message: 'Задачу видалено' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Отримати статистику по задачам
exports.getTaskStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments();
    const todoTasks = await Task.countDocuments({ status: 'todo' });
    const inProgressTasks = await Task.countDocuments({ status: 'in-progress' });
    const doneTasks = await Task.countDocuments({ status: 'done' });
    
    const priorityStats = await Task.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    const tagsStats = await Task.aggregate([
      { $unwind: '$tags' },
      {
        $group: {
          _id: '$tags',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    const completionRate = totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0;

    // Статистика по виконаним задачам за останній тиждень
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    
    const weeklyCompletion = await Task.aggregate([
      {
        $match: {
          updatedAt: { $gte: lastWeek },
          status: 'done'
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$updatedAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id': 1 } }
    ]);

    res.json({
      total: totalTasks,
      byStatus: {
        todo: todoTasks,
        inProgress: inProgressTasks,
        done: doneTasks
      },
      byPriority: priorityStats,
      topTags: tagsStats,
      completionRate: Math.round(completionRate),
      weeklyCompletion
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}; 