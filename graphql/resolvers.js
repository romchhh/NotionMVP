const Task = require('../models/Task');

const resolvers = {
  Query: {
    tasks: async () => {
      try {
        return await Task.find();
      } catch (error) {
        throw new Error('Помилка при отриманні задач');
      }
    },
    task: async (_, { id }) => {
      try {
        return await Task.findById(id);
      } catch (error) {
        throw new Error('Задачу не знайдено');
      }
    },
    tasksByStatus: async (_, { status }) => {
      try {
        return await Task.find({ status });
      } catch (error) {
        throw new Error('Помилка при отриманні задач за статусом');
      }
    },
  },
  Mutation: {
    createTask: async (_, { input }) => {
      try {
        const task = new Task(input);
        return await task.save();
      } catch (error) {
        throw new Error('Помилка при створенні задачі');
      }
    },
    updateTask: async (_, { id, input }) => {
      try {
        return await Task.findByIdAndUpdate(
          id,
          { $set: input },
          { new: true }
        );
      } catch (error) {
        throw new Error('Помилка при оновленні задачі');
      }
    },
    deleteTask: async (_, { id }) => {
      try {
        return await Task.findByIdAndDelete(id);
      } catch (error) {
        throw new Error('Помилка при видаленні задачі');
      }
    },
    updateTaskStatus: async (_, { id, status }) => {
      try {
        return await Task.findByIdAndUpdate(
          id,
          { $set: { status } },
          { new: true }
        );
      } catch (error) {
        throw new Error('Помилка при оновленні статусу задачі');
      }
    },
  },
};

module.exports = resolvers; 