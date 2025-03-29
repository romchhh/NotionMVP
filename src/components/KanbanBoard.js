import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { 
  Container, 
  Grid, 
  Paper, 
  Typography, 
  Box, 
  CircularProgress,
  IconButton
} from '@mui/material';
import { 
  LightMode, 
  DarkMode
} from '@mui/icons-material';
import axios from 'axios';
import TaskCard from './TaskCard';
import AddTaskForm from './AddTaskForm';
import KanbanStats from './KanbanStats';
import '../styles/KanbanBoard.css';

const KanbanBoard = ({ darkMode }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5001/api/tasks');
      setTasks(response.data);
      setError(null);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setError('Помилка завантаження задач');
    } finally {
      setLoading(false);
    }
  };

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || 
        (source.droppableId === destination.droppableId && source.index === destination.index)) {
      return;
    }

    try {
      // Знаходимо задачу, яку переміщуємо
      const taskToMove = tasks.find(task => task._id === draggableId);
      if (!taskToMove) return;

      // Створюємо копію задачі з новим статусом
      const updatedTask = { ...taskToMove, status: destination.droppableId };

      // Оновлюємо стан локально
      const updatedTasks = tasks.map(task => 
        task._id === draggableId ? updatedTask : task
      );
      setTasks(updatedTasks);

      // Відправляємо зміни на сервер
      await axios.put(`http://localhost:5001/api/tasks/${draggableId}`, updatedTask);
    } catch (error) {
      console.error('Error updating task:', error);
      fetchTasks(); // Повертаємо попередній стан у разі помилки
    }
  };

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status);
  };

  const getColumnTitle = (status) => {
    switch(status) {
      case 'todo': return 'Потрібно зробити';
      case 'in-progress': return 'В процесі';
      case 'done': return 'Виконано';
      default: return '';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }} className={darkMode ? 'dark' : 'light'}>
        <CircularProgress color={darkMode ? 'inherit' : 'primary'} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }} className={darkMode ? 'dark' : 'light'}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box className={`kanban-container ${darkMode ? 'dark' : 'light'}`}>
      <Box className="kanban-main">
        <Box className="kanban-content">
          <Container maxWidth="xl" sx={{ py: 4 }}>
            <DragDropContext onDragEnd={onDragEnd}>
              <Grid container spacing={3} className="kanban-columns">
                {['todo', 'in-progress', 'done'].map((status) => (
                  <Grid item xs={12} md={4} key={status} className="kanban-column">
                    <Paper
                      elevation={0}
                      sx={{
                        width: '100%',
                        height: '100%',
                        minHeight: '500px',
                        display: 'flex',
                        flexDirection: 'column',
                        p: 2,
                        bgcolor: darkMode ? 'rgba(255, 255, 255, 0.03)' : '#ffffff',
                        borderRadius: '16px',
                        border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'}`,
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '0.95rem' }}>
                          {getColumnTitle(status)}
                        </Typography>
                        <Typography variant="body2" sx={{ px: 1, py: 0.5, borderRadius: '8px', bgcolor: darkMode ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.04)' }}>
                          {getTasksByStatus(status).length}
                        </Typography>
                      </Box>
                      <Droppable droppableId={status}>
                        {(provided, snapshot) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{
                              flex: 1,
                              minHeight: '100px',
                              padding: '4px',
                              transition: 'background-color 0.2s ease',
                              backgroundColor: snapshot.isDraggingOver ? (darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)') : 'transparent',
                              borderRadius: '12px',
                              border: snapshot.isDraggingOver ? `1px dashed ${darkMode ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)'}` : '1px dashed transparent'
                            }}
                          >
                            {getTasksByStatus(status).map((task, index) => (
                              <Draggable key={task._id} draggableId={task._id} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={{
                                      userSelect: 'none',
                                      margin: '0 0 8px 0',
                                      transition: snapshot.isDragging ? 'none' : 'all 0.2s ease',
                                      opacity: snapshot.isDragging ? 0.9 : 1,
                                      transform: snapshot.isDragging ? provided.draggableProps.style.transform : 'none',
                                      ...provided.draggableProps.style
                                    }}
                                  >
                                    <TaskCard
                                      task={task}
                                      onTaskUpdated={fetchTasks}
                                      darkMode={darkMode}
                                      isDragging={snapshot.isDragging}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </DragDropContext>
          </Container>
        </Box>

        {/* Statistics Panel */}
        <KanbanStats tasks={tasks} darkMode={darkMode} />
      </Box>

      <AddTaskForm onTaskAdded={fetchTasks} darkMode={darkMode} />
    </Box>
  );
};

export default KanbanBoard;