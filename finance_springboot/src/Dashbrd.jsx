import * as React from 'react';
import PropTypes from 'prop-types';
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
  IconButton,
  CssBaseline,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const NAVIGATION = [
  { title: 'Dashboard', icon: <DashboardIcon />, path: '/dash' },
  { title: 'Orders', icon: <ShoppingCartIcon />, path: '/orders' },
];

// Content Component
function DemoPageContent({ pathname }) {
  return (
    <Box sx={{ py: 4, px: 2 }}>
      <Typography variant="h5" gutterBottom>
        You are viewing: {pathname.replace('/', '')}
      </Typography>
      <Typography variant="body1">
        This section will show dynamic content based on the page you're in.
      </Typography>
    </Box>
  );
}

DemoPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

function Dashbrd() {
  const location = useLocation();
  const navigate = useNavigate();

  const [mode, setMode] = React.useState('light');

  // Toggle theme
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Dynamic theme
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
    NAVIGATION.find((item) => item.path === location.pathname)?.title || 'Dashboard';

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
        {/* Top App Bar */}
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

        {/* Sidebar Drawer */}
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
                sx={(theme) => ({
                    '&.active': {
                      backgroundColor:
                        theme.palette.mode === 'dark' ? 'rgba(173, 216, 230, 0.2)' : theme.palette.action.selected,
                      color: theme.palette.mode === 'dark' ? 'lightblue' : 'inherit',
                    },
                  })}
                >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
        </Drawer>

        {/* Main Content */}
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <DemoPageContent pathname={location.pathname} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashbrd;
