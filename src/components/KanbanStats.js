import React from 'react';
import { Box, Typography, LinearProgress, Tooltip, IconButton } from '@mui/material';
import {
  Assessment as AssessmentIcon,
  TrendingUp as TrendingUpIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  LocalFireDepartment as FireIcon,
  Flag as FlagIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';

const KanbanStats = ({ tasks, darkMode }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'done').length;
  const inProgressTasks = tasks.filter(task => task.status === 'in-progress').length;
  const todoTasks = tasks.filter(task => task.status === 'todo').length;
  
  const completionRate = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;
  
  // Знаходимо найновішу та найстарішу задачі
  const sortedTasks = [...tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  const latestTask = sortedTasks[0];
  const oldestTask = sortedTasks[sortedTasks.length - 1];

  // Розраховуємо продуктивність (задачі виконані за останній тиждень)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const tasksCompletedThisWeek = tasks.filter(
    task => task.status === 'done' && new Date(task.createdAt) > oneWeekAgo
  ).length;

  return (
    <Box className="kanban-stats">
      <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>
        Статистика дошки
      </Typography>

      {/* Загальна статистика */}
      <Box className="stats-card">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <AssessmentIcon sx={{ mr: 1 }} />
          <Typography className="stats-title">
            Загальна інформація
          </Typography>
        </Box>
        <Typography className="stats-value">{totalTasks}</Typography>
        <Typography className="stats-subtitle">Всього задач</Typography>
        
        <Box sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2">Прогрес виконання</Typography>
            <Typography variant="body2">{completionRate}%</Typography>
          </Box>
          <LinearProgress 
            variant="determinate" 
            value={completionRate}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              '& .MuiLinearProgress-bar': {
                bgcolor: '#2196f3'
              }
            }}
          />
        </Box>
      </Box>

      {/* Розподіл задач */}
      <Box className="stats-card">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <TrendingUpIcon sx={{ mr: 1 }} />
          <Typography className="stats-title">
            Розподіл задач
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box>
            <Typography variant="h4" sx={{ color: '#ff5555', mb: 0.5 }}>{todoTasks}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>Нові</Typography>
          </Box>
          <Box>
            <Typography variant="h4" sx={{ color: '#40a0ff', mb: 0.5 }}>{inProgressTasks}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>В процесі</Typography>
          </Box>
          <Box>
            <Typography variant="h4" sx={{ color: '#52c41a', mb: 0.5 }}>{completedTasks}</Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>Виконані</Typography>
          </Box>
        </Box>
      </Box>

      {/* Продуктивність */}
      <Box className="stats-card">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FireIcon sx={{ mr: 1, color: '#ff9800' }} />
          <Typography className="stats-title">
            Продуктивність
          </Typography>
        </Box>
        <Typography variant="h4" sx={{ mb: 1 }}>{tasksCompletedThisWeek}</Typography>
        <Typography variant="body2" sx={{ opacity: 0.7 }}>
          Задач виконано за тиждень
        </Typography>
      </Box>

      {/* Часова статистика */}
      <Box className="stats-card">
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <ScheduleIcon sx={{ mr: 1 }} />
          <Typography className="stats-title">
            Часова статистика
          </Typography>
        </Box>
        {latestTask && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
              Остання задача:
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              {format(new Date(latestTask.createdAt), "d MMMM yyyy 'о' HH:mm", { locale: uk })}
            </Typography>
          </Box>
        )}
        {oldestTask && (
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>
              Перша задача:
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.7 }}>
              {format(new Date(oldestTask.createdAt), "d MMMM yyyy 'о' HH:mm", { locale: uk })}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default KanbanStats; 