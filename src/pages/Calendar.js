import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const Calendar = ({ darkMode }) => {
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
        Календар
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
        <Typography color={darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'}>
          Тут буде календар з завданнями
        </Typography>
      </Paper>
    </Box>
  );
};

export default Calendar; 