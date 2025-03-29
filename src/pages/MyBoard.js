import React from 'react';
import KanbanBoard from '../components/KanbanBoard';
import { Box } from '@mui/material';

const MyBoard = ({ darkMode }) => {
  return (
    <Box sx={{ p: 3 }}>
      <KanbanBoard darkMode={darkMode} />
    </Box>
  );
};

export default MyBoard; 