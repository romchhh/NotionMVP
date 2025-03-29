import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Chip,
  Menu,
  MenuItem,
  Tooltip,
  Fade,
  Select,
  FormControl,
  InputLabel,
  Checkbox,
  Avatar,
  Stack,
  InputAdornment
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  DragIndicator as DragIndicatorIcon,
  MoreVert as MoreVertIcon,
  AccessTime as AccessTimeIcon,
  Label as LabelIcon,
  Flag as FlagIcon,
  Person as PersonIcon,
  CalendarToday as CalendarIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon,
  Add as AddIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import axios from 'axios';
import { format } from 'date-fns';
import { uk } from 'date-fns/locale';
import '../styles/TaskCard.css';
import { STATUS_COLORS, PRIORITY_COLORS, STATUS_LABELS, PRIORITY_LABELS } from '../constants/colors';

const TaskCard = ({ task, onTaskUpdated, darkMode, isDragging }) => {
  const [open, setOpen] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [editedTask, setEditedTask] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority || 'medium',
    tags: task.tags || [],
    assignee: task.assignee || '',
    dueDate: task.dueDate || '',
    checklist: task.checklist || [],
    status: task.status
  });
  const [newTag, setNewTag] = useState('');
  const [newChecklistItem, setNewChecklistItem] = useState('');

  const handleOpenMenu = (event) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleEdit = () => {
    handleCloseMenu();
    setOpen(true);
  };

  const handleDelete = async () => {
    handleCloseMenu();
    try {
      await axios.delete(`http://localhost:5001/api/tasks/${task._id}`);
      onTaskUpdated();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setEditedTask({
      title: task.title,
      description: task.description,
      priority: task.priority || 'medium',
      tags: task.tags || [],
      assignee: task.assignee || '',
      dueDate: task.dueDate || '',
      checklist: task.checklist || [],
      status: task.status
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5001/api/tasks/${task._id}`, editedTask);
      onTaskUpdated();
      setOpen(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !editedTask.tags.includes(newTag.trim())) {
      setEditedTask({
        ...editedTask,
        tags: [...editedTask.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setEditedTask({
      ...editedTask,
      tags: editedTask.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setEditedTask({
        ...editedTask,
        checklist: [...editedTask.checklist, { text: newChecklistItem.trim(), completed: false }]
      });
      setNewChecklistItem('');
    }
  };

  const handleToggleChecklistItem = (index) => {
    const newChecklist = [...editedTask.checklist];
    newChecklist[index].completed = !newChecklist[index].completed;
    setEditedTask({
      ...editedTask,
      checklist: newChecklist
    });
  };

  const handleRemoveChecklistItem = (index) => {
    setEditedTask({
      ...editedTask,
      checklist: editedTask.checklist.filter((_, i) => i !== index)
    });
  };

  const getStatusColor = (status) => {
    return STATUS_COLORS[status] || STATUS_COLORS.todo;
  };

  const getPriorityColor = (priority) => {
    return PRIORITY_COLORS[priority] || PRIORITY_COLORS.medium;
  };

  return (
    <>
      <Card
        elevation={0}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`task-card ${darkMode ? 'dark' : 'light'} ${isDragging ? 'dragging' : ''}`}
        onClick={handleEdit}
        sx={{ cursor: 'pointer' }}
      >
        <Box
          sx={{
            position: 'absolute',
            left: -8,
            top: '50%',
            transform: 'translateY(-50%)',
            opacity: isHovered || isDragging ? 1 : 0,
            transition: 'opacity 0.2s ease',
            color: darkMode ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none'
          }}
        >
          <DragIndicatorIcon fontSize="small" />
        </Box>
        
        <CardContent className="task-card-content">
          <Box className="task-header">
            <Box sx={{ flex: 1 }}>
              <Typography className="task-title" color={darkMode ? '#ffffff' : '#1a1a1a'}>
                {task.title}
              </Typography>
              {task.description && (
                <Typography className="task-description" color={darkMode ? 'rgba(255, 255, 255, 0.6)' : 'rgba(0, 0, 0, 0.6)'}>
                  {task.description}
                </Typography>
              )}
            </Box>
            <IconButton
              size="small"
              onClick={handleOpenMenu}
              sx={{
                color: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.4)',
                '&:hover': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.8)' : 'rgba(0, 0, 0, 0.6)',
                  bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
                }
              }}
            >
              <MoreVertIcon fontSize="small" />
            </IconButton>
          </Box>

          {/* Meta information */}
          <Box className="task-meta">
            <Chip
              icon={<LabelIcon sx={{ fontSize: '0.9rem !important' }} />}
              label={STATUS_LABELS[task.status]}
              size="small"
              className={`task-status status-${task.status}`}
            />
            {task.priority && (
              <Chip
                icon={<FlagIcon sx={{ fontSize: '0.9rem !important' }} />}
                label={PRIORITY_LABELS[task.priority]}
                size="small"
                className={`task-priority priority-${task.priority}`}
              />
            )}
          </Box>

          {/* Tags */}
          {task.tags && task.tags.length > 0 && (
            <Box className="task-tags">
              {task.tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  className="task-tag"
                />
              ))}
            </Box>
          )}

          {/* Checklist */}
          {task.checklist && task.checklist.length > 0 && (
            <Box className="task-checklist">
              {task.checklist.map((item, index) => (
                <Box key={index} className="checklist-item">
                  <Checkbox
                    checked={item.completed}
                    size="small"
                    icon={<UncheckedIcon fontSize="small" />}
                    checkedIcon={<CheckCircleIcon fontSize="small" />}
                    onClick={() => handleToggleChecklistItem(index)}
                  />
                  <Typography className={`checklist-text ${item.completed ? 'completed' : ''}`}>
                    {item.text}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          {/* Footer */}
          <Box className="task-footer">
            <Box className="task-assignee">
              {task.assignee ? (
                <Tooltip title={task.assignee} placement="top">
                  <Avatar sx={{ width: 24, height: 24 }}>{task.assignee[0]}</Avatar>
                </Tooltip>
              ) : (
                <PersonIcon sx={{ opacity: 0.5, fontSize: '1.2rem' }} />
              )}
            </Box>
            <Box className="task-due-date">
              {task.dueDate ? (
                <>
                  <CalendarIcon fontSize="small" />
                  {format(new Date(task.dueDate), 'd MMM', { locale: uk })}
                </>
              ) : (
                <AccessTimeIcon fontSize="small" />
              )}
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: darkMode ? '#1a1a1a' : '#ffffff',
            backgroundImage: 'none',
            borderRadius: '16px'
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant="h6" sx={{ color: darkMode ? '#ffffff' : '#1a1a1a' }}>
            Інформація про задачу
          </Typography>
          <IconButton
            size="small"
            onClick={handleClose}
            sx={{
              color: darkMode ? 'rgba(255, 255, 255, 0.5)' : 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
              }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
              <Chip
                icon={<LabelIcon sx={{ fontSize: '0.9rem !important' }} />}
                label={STATUS_LABELS[editedTask.status]}
                size="small"
                className={`task-status status-${editedTask.status}`}
              />
              <Chip
                icon={<FlagIcon sx={{ fontSize: '0.9rem !important' }} />}
                label={PRIORITY_LABELS[editedTask.priority]}
                size="small"
                className={`task-priority priority-${editedTask.priority}`}
              />
            </Box>
            <TextField
              label="Назва"
              fullWidth
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              sx={{
                '& .MuiInputLabel-root': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : undefined
                },
                '& .MuiOutlinedInput-root': {
                  color: darkMode ? '#ffffff' : undefined,
                  '& fieldset': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : undefined
                  }
                }
              }}
            />
            
            <TextField
              label="Опис"
              fullWidth
              multiline
              rows={3}
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              sx={{
                '& .MuiInputLabel-root': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : undefined
                },
                '& .MuiOutlinedInput-root': {
                  color: darkMode ? '#ffffff' : undefined,
                  '& fieldset': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : undefined
                  }
                }
              }}
            />

            <FormControl fullWidth>
              <InputLabel sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.7)' : undefined }}>
                Пріоритет
              </InputLabel>
              <Select
                value={editedTask.priority}
                label="Пріоритет"
                onChange={(e) => setEditedTask({ ...editedTask, priority: e.target.value })}
                sx={{
                  color: darkMode ? '#ffffff' : undefined,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : undefined
                  }
                }}
              >
                {Object.entries(PRIORITY_LABELS).map(([value, label]) => (
                  <MenuItem 
                    key={value} 
                    value={value}
                    sx={{
                      color: getPriorityColor(value).light,
                      '&.Mui-selected': {
                        bgcolor: getPriorityColor(value).bg,
                        '&:hover': {
                          bgcolor: getPriorityColor(value).bg
                        }
                      },
                      '&:hover': {
                        bgcolor: getPriorityColor(value).bg
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <FlagIcon fontSize="small" />
                      {label}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Виконавець"
              fullWidth
              value={editedTask.assignee}
              onChange={(e) => setEditedTask({ ...editedTask, assignee: e.target.value })}
              sx={{
                '& .MuiInputLabel-root': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : undefined
                },
                '& .MuiOutlinedInput-root': {
                  color: darkMode ? '#ffffff' : undefined,
                  '& fieldset': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : undefined
                  }
                }
              }}
            />

            <TextField
              label="Дедлайн"
              type="datetime-local"
              fullWidth
              value={editedTask.dueDate}
              onChange={(e) => setEditedTask({ ...editedTask, dueDate: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{
                '& .MuiInputLabel-root': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : undefined
                },
                '& .MuiOutlinedInput-root': {
                  color: darkMode ? '#ffffff' : undefined,
                  '& fieldset': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : undefined
                  }
                }
              }}
            />

            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ color: darkMode ? '#ffffff' : undefined }}>
                Теги
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                {editedTask.tags.map((tag, index) => (
                  <Chip
                    key={index}
                    label={tag}
                    onDelete={() => handleRemoveTag(tag)}
                    size="small"
                    sx={{
                      bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                      color: darkMode ? '#ffffff' : undefined
                    }}
                  />
                ))}
              </Box>
              <TextField
                size="small"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                placeholder="Додати тег"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleAddTag} size="small">
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: darkMode ? '#ffffff' : undefined,
                    '& fieldset': {
                      borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : undefined
                    }
                  }
                }}
              />
            </Box>

            <Box>
              <Typography variant="subtitle2" gutterBottom sx={{ color: darkMode ? '#ffffff' : undefined }}>
                Чекліст
              </Typography>
              {editedTask.checklist.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Checkbox
                    checked={item.completed}
                    onChange={() => handleToggleChecklistItem(index)}
                    size="small"
                    sx={{
                      color: darkMode ? 'rgba(255, 255, 255, 0.5)' : undefined,
                      '&.Mui-checked': {
                        color: darkMode ? '#2196f3' : undefined
                      }
                    }}
                  />
                  <TextField
                    size="small"
                    value={item.text}
                    onChange={(e) => {
                      const newChecklist = [...editedTask.checklist];
                      newChecklist[index].text = e.target.value;
                      setEditedTask({ ...editedTask, checklist: newChecklist });
                    }}
                    fullWidth
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        color: darkMode ? '#ffffff' : undefined,
                        '& fieldset': {
                          borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : undefined
                        }
                      }
                    }}
                  />
                  <IconButton 
                    size="small" 
                    onClick={() => handleRemoveChecklistItem(index)}
                    sx={{ color: darkMode ? 'rgba(255, 255, 255, 0.5)' : undefined }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
              <TextField
                size="small"
                value={newChecklistItem}
                onChange={(e) => setNewChecklistItem(e.target.value)}
                placeholder="Додати пункт"
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleAddChecklistItem} size="small">
                        <AddIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: darkMode ? '#ffffff' : undefined,
                    '& fieldset': {
                      borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : undefined
                    }
                  }
                }}
              />
            </Box>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ p: 2, pt: 0 }}>
          <Button onClick={handleClose}>Скасувати</Button>
          <Button onClick={handleSave} variant="contained" disabled={!editedTask.title.trim()}>
            Зберегти
          </Button>
        </DialogActions>
      </Dialog>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: {
            bgcolor: darkMode ? '#2d2d2d' : '#ffffff',
            border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.06)'}`,
            borderRadius: '8px',
            boxShadow: darkMode 
              ? '0 4px 20px rgba(0, 0, 0, 0.4)'
              : '0 4px 20px rgba(0, 0, 0, 0.05)'
          }
        }}
      >
        <MenuItem onClick={handleEdit}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Редагувати
        </MenuItem>
        <MenuItem onClick={handleDelete} sx={{ color: '#ff5555' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Видалити
        </MenuItem>
      </Menu>
    </>
  );
};

export default TaskCard; 