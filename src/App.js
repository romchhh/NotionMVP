import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, useTheme, Typography } from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Assignment as TasksIcon,
  CalendarToday as CalendarIcon,
  Group as TeamIcon,
  Folder as ProjectsIcon,
  Star as ImportantIcon,
  Archive as ArchiveIcon,
  Settings as SettingsIcon,
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon
} from '@mui/icons-material';

import MyBoard from './pages/MyBoard';
import Tasks from './pages/Tasks';
import Calendar from './pages/Calendar';
import Team from './pages/Team';
import Projects from './pages/Projects';
import Important from './pages/Important';
import Archive from './pages/Archive';
import Settings from './pages/Settings';

const drawerWidth = 240;

const menuItems = [
  { text: 'Моя дошка', icon: <DashboardIcon />, path: '/' },
  { text: 'Завдання', icon: <TasksIcon />, path: '/tasks' },
  { text: 'Календар', icon: <CalendarIcon />, path: '/calendar' },
  { text: 'Команда', icon: <TeamIcon />, path: '/team' },
  { text: 'Проекти', icon: <ProjectsIcon />, path: '/projects' },
  { text: 'Важливе', icon: <ImportantIcon />, path: '/important' },
  { text: 'Архів', icon: <ArchiveIcon />, path: '/archive' },
  { text: 'Налаштування', icon: <SettingsIcon />, path: '/settings' }
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(true);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        
        {/* App Bar */}
        <Box
          component="header"
          sx={{
            position: 'fixed',
            width: `calc(100% - ${drawerOpen ? drawerWidth : 0}px)`,
            ml: `${drawerOpen ? drawerWidth : 0}px`,
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            bgcolor: darkMode ? '#1a1a1a' : '#ffffff',
            borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
            py: 1,
            px: 2,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{
              color: darkMode ? '#ffffff' : '#1a1a1a'
            }}
          >
            {drawerOpen ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Box>

        {/* Drawer */}
        <Drawer
          variant="permanent"
          open={drawerOpen}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
              bgcolor: darkMode ? '#1a1a1a' : '#ffffff',
              borderRight: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
              transition: theme.transitions.create('transform', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              transform: `translateX(${drawerOpen ? 0 : -drawerWidth}px)`
            },
          }}
        >
          <Box sx={{ pt: 8 }}>
            <List>
              {menuItems.map((item) => (
                <ListItem
                  button
                  component={Link}
                  to={item.path}
                  key={item.text}
                  sx={{
                    py: 1.5,
                    px: 2,
                    '&:hover': {
                      bgcolor: darkMode ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  <ListItemIcon sx={{ 
                    color: darkMode ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
                    minWidth: 40
                  }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography sx={{ 
                        color: darkMode ? '#ffffff' : '#1a1a1a',
                        fontSize: '0.9rem'
                      }}>
                        {item.text}
                      </Typography>
                    } 
                  />
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            pt: 8,
            bgcolor: darkMode ? '#141414' : '#f5f5f5',
            minHeight: '100vh',
            ml: `${drawerOpen ? 0 : -drawerWidth}px`,
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            })
          }}
        >
          <Routes>
            <Route path="/" element={<MyBoard darkMode={darkMode} />} />
            <Route path="/tasks" element={<Tasks darkMode={darkMode} />} />
            <Route path="/calendar" element={<Calendar darkMode={darkMode} />} />
            <Route path="/team" element={<Team darkMode={darkMode} />} />
            <Route path="/projects" element={<Projects darkMode={darkMode} />} />
            <Route path="/important" element={<Important darkMode={darkMode} />} />
            <Route path="/archive" element={<Archive darkMode={darkMode} />} />
            <Route path="/settings" element={<Settings darkMode={darkMode} onToggleDarkMode={() => setDarkMode(!darkMode)} />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
