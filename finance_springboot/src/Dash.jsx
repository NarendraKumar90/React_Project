import * as React from 'react';
import { Outlet, useLocation, NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText,
  Toolbar, Typography, createTheme, ThemeProvider, IconButton, useMediaQuery
} from '@mui/material';
import {
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Dashboard as DashboardIcon,
  AccountBalanceWallet as AccountBalanceWalletIcon,
  Group as GroupIcon
} from '@mui/icons-material';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import UserDetails from './UserDetails';

const drawerWidth = 240;

const NAVIGATION = [
  { title: 'Dashboard', path: '/dash', icon: <DashboardIcon /> },
  { title: 'Users', path: '/dash/users', icon: <GroupIcon /> },
  { title: 'Transactions', path: '/dash/tran', icon: <AccountBalanceWalletIcon /> },
];

export default function Dash() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mode, setMode] = React.useState('light');
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  React.useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light');
  }, [prefersDarkMode]);

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  const theme = React.useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#00bcd4' },
      secondary: { main: '#ff4081' },
    },
  }), [mode]);

  const currentTitle =
    NAVIGATION.find((item) => item.path === location.pathname)?.title || 'Dashboard';

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: 1201 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" noWrap>
              My Dashboard
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <IconButton color="inherit" onClick={toggleTheme} aria-label="Toggle theme">
                {mode === 'light' ? <DarkModeIcon /> : <LightModeIcon />}
              </IconButton>
              <DropdownButton id="dropdown-basic-button" title="Options">
                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/dash/users')}>Users</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/dash/tran')}>Transactions</Dropdown.Item>
              </DropdownButton>
            </Box>
          </Toolbar>
        </AppBar>

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
              <ListItem
                key={item.title}
                disablePadding
                sx={{
                  '& .nav-link': {
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 16px',
                    color: 'inherit',
                    textDecoration: 'none',
                  },
                  '& .active': {
                    backgroundColor: theme.palette.action.selected,
                  },
                }}
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                >
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </NavLink>
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Typography variant="h6" gutterBottom>
            {currentTitle}
          </Typography>

          {location.pathname === '/dash' && (
            <Box sx={{ mb: 4 }}>
              <Typography>
                <UserDetails/>
                This is your central hub where you can view analytics, monitor orders, manage users, and review transactions.
              </Typography>
            </Box>
          )}

          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
