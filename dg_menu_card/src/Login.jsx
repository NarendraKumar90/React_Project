import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    alert("Login Sucessfully")
     navigate('/dash'); // Redirect to dashboard

     
    // try {
    //   const response = await axios.post('http://127.0.0.1:3000/login', { email, password });

    //   if (response.data.token) {
    //     // You can save the token if needed
    //     localStorage.setItem('token', response.data.token);

    //     navigate('/dash'); // Redirect to dashboard
    //   }
    // } catch (error) {
    //   console.error('Login failed:', error.response?.data?.message || error.message);
    //   alert(error.response?.data?.message || 'Login failed');
    // }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 10 }}>
      <Typography variant="h4">Login</Typography>
      <TextField 
        label="Email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mt: 2, width: '300px' }}
      />
      <TextField 
        label="Password" 
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mt: 2, width: '300px' }}
      />
      <Button variant="contained" onClick={handleLogin} sx={{ mt: 3 }}>
        Login
      </Button>
    </Box>
  );
}
