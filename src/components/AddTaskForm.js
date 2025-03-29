import React, { useState } from 'react';
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Fab,
  Box,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
  Typography,
  InputAdornment,
  Checkbox
} from '@mui/material';
import {
  Add as AddIcon,
  Close as CloseIcon,
  Flag as FlagIcon,
  Label as LabelIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as UncheckedIcon
} from '@mui/icons-material';
import axios from 'axios';
import { PRIORITY_COLORS, PRIORITY_LABELS } from '../constants/colors';

const AddTaskForm = ({ onTaskAdded, darkMode }) => {
  const [open, setOpen] = useState(false);
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
  const [newTag, setNewTag] = useState('');
  const [newChecklistItem, setNewChecklistItem] = useState('');

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setTask({
      title: '',
      description: '',
      status: 'todo',
      priority: 'medium',
      tags: [],
      assignee: '',
      dueDate: '',
      checklist: []
    });
    setNewTag('');
    setNewChecklistItem('');
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:5001/api/tasks', task);
      onTaskAdded();
      handleClose();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !task.tags.includes(newTag.trim())) {
      setTask({
        ...task,
        tags: [...task.tags, newTag.trim()]
      });
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setTask({
      ...task,
      tags: task.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleAddChecklistItem = () => {
    if (newChecklistItem.trim()) {
      setTask({
        ...task,
        checklist: [...task.checklist, { text: newChecklistItem.trim(), completed: false }]
      });
      setNewChecklistItem('');
    }
  };

  const handleToggleChecklistItem = (index) => {
    const newChecklist = [...task.checklist];
    newChecklist[index].completed = !newChecklist[index].completed;
    setTask({
      ...task,
      checklist: newChecklist
    });
  };

  const handleRemoveChecklistItem = (index) => {
    setTask({
      ...task,
      checklist: task.checklist.filter((_, i) => i !== index)
    });
  };

  const getPriorityColor = (priority) => {
    return PRIORITY_COLORS[priority] || PRIORITY_COLORS.medium;
  };

  return (
    <>
      <Tooltip title="Додати нову задачу" arrow placement="left">
        <Fab
          color="primary"
          aria-label="add"
          onClick={handleOpen}
          sx={{
            position: 'fixed',
            bottom: 32,
            right: 32,
            bgcolor: darkMode ? '#2196f3' : '#1976d2',
            color: darkMode ? '#ffffff' : '#ffffff',
            '&:hover': {
              bgcolor: darkMode ? '#1976d2' : '#1565c0',
              transform: 'translateY(-1px)',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
            },
            transition: 'all 0.3s ease',
            boxShadow: darkMode 
              ? '0 4px 12px rgba(33, 150, 243, 0.5)' 
              : '0 4px 12px rgba(25, 118, 210, 0.5)'
          }}
        >
          <AddIcon />
        </Fab>
      </Tooltip>

      <Dialog 
        open={open} 
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: darkMode ? '#2d2d2d' : '#ffffff',
            borderRadius: 2,
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            p: 2.5,
            pb: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              fontSize: '1.25rem',
              fontWeight: 600,
              color: darkMode ? '#ffffff' : '#1a1a1a',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}
          >
            Додати нову задачу
          </Box>
          <IconButton
            onClick={handleClose}
            size="small"
            sx={{
              color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
              }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 2.5 }}>
          <Stack spacing={2}>
            <TextField
              autoFocus
              label="Назва задачі"
              placeholder="Введіть назву задачі..."
              fullWidth
              value={task.title}
              onChange={(e) => setTask({ ...task, title: e.target.value })}
              sx={{ 
                '& .MuiInputLabel-root': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : undefined
                },
                '& .MuiOutlinedInput-root': {
                  color: darkMode ? '#ffffff' : undefined,
                  '& fieldset': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : undefined
                  },
                  '&:hover fieldset': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.3)' : undefined
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: darkMode ? '#2196f3' : undefined
                  }
                }
              }}
            />
            
            <TextField
              label="Опис задачі"
              placeholder="Введіть детальний опис задачі..."
              fullWidth
              multiline
              rows={3}
              value={task.description}
              onChange={(e) => setTask({ ...task, description: e.target.value })}
              sx={{ 
                '& .MuiInputLabel-root': {
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : undefined
                },
                '& .MuiOutlinedInput-root': {
                  color: darkMode ? '#ffffff' : undefined,
                  '& fieldset': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : undefined
                  },
                  '&:hover fieldset': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.3)' : undefined
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: darkMode ? '#2196f3' : undefined
                  }
                }
              }}
            />

            <FormControl fullWidth>
              <InputLabel 
                sx={{ 
                  color: darkMode ? 'rgba(255, 255, 255, 0.7)' : undefined 
                }}
              >
                Пріоритет
              </InputLabel>
              <Select
                value={task.priority}
                label="Пріоритет"
                onChange={(e) => setTask({ ...task, priority: e.target.value })}
                sx={{
                  color: darkMode ? '#ffffff' : undefined,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.2)' : undefined
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? 'rgba(255, 255, 255, 0.3)' : undefined
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: darkMode ? '#2196f3' : undefined
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
              value={task.assignee}
              onChange={(e) => setTask({ ...task, assignee: e.target.value })}
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
              value={task.dueDate}
              onChange={(e) => setTask({ ...task, dueDate: e.target.value })}
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
                {task.tags.map((tag, index) => (
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
                fullWidth
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
              {task.checklist.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Checkbox
                    checked={item.completed}
                    onChange={() => handleToggleChecklistItem(index)}
                    size="small"
                    icon={<UncheckedIcon fontSize="small" />}
                    checkedIcon={<CheckCircleIcon fontSize="small" />}
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
                      const newChecklist = [...task.checklist];
                      newChecklist[index].text = e.target.value;
                      setTask({ ...task, checklist: newChecklist });
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
        <DialogActions sx={{ p: 2.5, pt: 1.5 }}>
          <Button 
            onClick={handleClose}
            sx={{ 
              color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.6)',
              '&:hover': { 
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)'
              },
              textTransform: 'none',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 500
            }}
          >
            Скасувати
          </Button>
          <Button 
            onClick={handleSubmit}
            variant="contained"
            disabled={!task.title}
            sx={{ 
              px: 3,
              py: 1,
              bgcolor: darkMode ? '#2196f3' : '#1976d2',
              '&:hover': {
                bgcolor: darkMode ? '#1976d2' : '#1565c0'
              },
              '&.Mui-disabled': {
                bgcolor: darkMode ? 'rgba(255, 255, 255, 0.12)' : undefined
              },
              borderRadius: 1,
              textTransform: 'none',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontWeight: 500,
              boxShadow: 'none',
              '&:hover': {
                boxShadow: 'none'
              }
            }}
          >
            Створити задачу
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddTaskForm; 