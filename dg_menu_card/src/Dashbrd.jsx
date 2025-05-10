import * as React from 'react';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Drawer,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  IconButton,
  CssBaseline,
} from '@mui/material';


import DashboardIcon from '@mui/icons-material/Dashboard';
import CategoryIcon from '@mui/icons-material/Category';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useLocation, useNavigate, Outlet } from 'react-router-dom';
import MenuCard from './MenuCard';

const drawerWidth = 240;

const NAVIGATION = [
  { title: 'Dashboard', icon: <DashboardIcon />, path: '/dash' },
  { title: 'Food_Cat', icon: <CategoryIcon />, path: '/dash/cat' },
  { title: 'Food_qty', icon: <FormatListNumberedIcon />, path: '/dash/qty' },
  { title: 'Menu', icon: <RestaurantMenuIcon />, path: '/dash/menu' },
];

function Dashbrd() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = React.useState('light');

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          background: {
            default: mode === 'light' ? '#fafafa' : '#121212',
            paper: mode === 'light' ? '#fff' : '#1e1e1e',
          },
        },
      }),
    [mode]
  );

  const currentTitle =
  NAVIGATION.find((item) => location.pathname === item.path)?.title ||
  NAVIGATION.find((item) => location.pathname.startsWith(item.path))?.title ||
  'Dashboard';

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    alert('Logout success');
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        {/* AppBar */}
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" noWrap>
              {currentTitle}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <IconButton onClick={toggleColorMode} color="inherit">
                {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
              </IconButton>
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <List>
            {NAVIGATION.map((item) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton
                  component={NavLink}
                  to={item.path}
                  sx={({ palette }) => ({
                    '&.active': {
                      backgroundColor:
                        palette.mode === 'dark'
                          ? 'rgba(173, 216, 230, 0.2)'
                          : palette.action.selected,
                      color: palette.mode === 'dark' ? 'lightblue' : 'inherit',
                    },
                  })}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Typography variant="h6" gutterBottom>
            {currentTitle}
          </Typography>

          {/* Dashboard-specific content */}
          {location.pathname === '/dash' && (
            <Box sx={{ mb: 4 }}>
              <MenuCard/>
              {/* You can replace below with <Crd /> or <User_detail /> components */}
              <Typography variant="body1">
                This is your central hub where you can view analytics, monitor orders, manage users,
                and review transactions.
              </Typography>
            </Box>
          )}

          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashbrd;
