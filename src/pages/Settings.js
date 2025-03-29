import React from 'react';
import { Box, Typography, Paper, Switch, FormControlLabel, Divider } from '@mui/material';

const Settings = ({ darkMode, onToggleDarkMode }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography 
        variant="h5" 
        sx={{ 
          mb: 3,
          color: darkMode ? '#ffffff' : '#1a1a1a',
          fontWeight: 600
        }}
      >
        Налаштування
      </Typography>
      <Paper 
        elevation={0}
        sx={{
          p: 3,
          bgcolor: darkMode ? '#1a1a1a' : '#ffffff',
          border: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          borderRadius: 2
        }}
      >
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2,
            color: darkMode ? '#ffffff' : '#1a1a1a'
          }}
        >
          Інтерфейс
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={onToggleDarkMode}
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#2196f3'
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#2196f3'
                }
              }}
            />
          }
          label={
            <Typography color={darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'}>
              Темна тема
            </Typography>
          }
        />
        <Divider sx={{ my: 2, borderColor: darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)' }} />
        <Typography 
          variant="h6" 
          sx={{ 
            mb: 2,
            color: darkMode ? '#ffffff' : '#1a1a1a'
          }}
        >
          Сповіщення
        </Typography>
        <FormControlLabel
          control={
            <Switch
              defaultChecked
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked': {
                  color: '#2196f3'
                },
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: '#2196f3'
                }
              }}
            />
          }
          label={
            <Typography color={darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'}>
              Сповіщення про дедлайни
            </Typography>
          }
        />
      </Paper>
    </Box>
  );
};

export default Settings; 