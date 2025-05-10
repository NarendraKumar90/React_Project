import * as React from 'react';
import { Outlet, useLocation, NavLink, useNavigate } from 'react-router-dom';
import {
  AppBar, Box, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText,
  Toolbar, Typography, createTheme, ThemeProvider, Button
} from '@mui/material'; // ✅ Button imported properly here
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import GroupIcon from '@mui/icons-material/Group';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import User from './User';
import Crd from './Crd';
import User_detail from './User_detail';

const drawerWidth = 240;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#00bcd4',
    },
    secondary: {
      main: '#ff4081',
    },
    background: {
      default: 'rgba(255, 255, 255, 0.75)',
      paper: 'rgba(255, 255, 255, 0.85)',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          backgroundImage: 'none',
        },
      },
    },
  },
});

const NAVIGATION = [
  { title: 'Dashboard', path: '/dash', icon: <DashboardIcon /> },
  { title: 'User_detail', path: '/dash/u_detail', icon: <GroupIcon /> },
  { title: 'Transactions', path: '/dash/tran', icon: <AccountBalanceWalletIcon /> },
  { title: 'Users', path: '/dash/users', icon: <GroupIcon /> },
];

export default function Dash() {
  const location = useLocation();
  const navigate = useNavigate(); // ✅ Correctly added

  const currentTitle =
    NAVIGATION.find((item) => item.path === location.pathname)?.title || 'Dashboard';

  // LogOut Handle
  const handleLogout = () => {
    // Clear any tokens/session if needed
    localStorage.clear(); 
    sessionStorage.clear();
    
    // Redirect to login
    navigate('/'); 
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: 1201 }}>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h5" noWrap>
              My Dashboard
            </Typography>

            {/* <Button
              // color="error" 
              // sx={{ backgroundColor: '#1976D2', '&:hover': { backgroundColor: '#1565C0' }}}
              sx={{
                backgroundColor: '#42a5f5', // Light Blue
                '&:hover': {
                  backgroundColor: '#1e88e5', // Slightly darker blue when hovered
                },
                color: 'white', // Ensures text is visible
              }}
              variant="contained"
              onClick={handleLogout}
              // sx={{ ml: 2 }}
            >
              Logout
            </Button> */}
               <DropdownButton id="dropdown-basic-button" title="Logout">
                    <Dropdown.Item href="http://localhost:5173/">Logout</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Rd_Amount</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">U_id</Dropdown.Item>
                  </DropdownButton>

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
                button
                key={item.title}
                component={NavLink}
                to={item.path}
                sx={{
                  '&.active': {
                    backgroundColor: 'action.selected',
                  },
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Typography variant="h6" gutterBottom>
            {currentTitle}
          </Typography>

          {/* Example static content */}
          {location.pathname === '/dash' && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h7" gutterBottom>
                {<Crd />}
                {<User_detail />}
              </Typography>
              <Typography>
                This is your central hub where you can view analytics, monitor orders, manage users, and review transactions.
              </Typography>
            </Box>
          )}

          {/* Nested Route Content */}
          <Outlet />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
