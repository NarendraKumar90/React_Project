import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

function LoginModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/login", { email, password });
      alert("Login Successful!");
      localStorage.setItem("token", res.data.token); // Save JWT/token if provided
      onClose();
    } catch (err) {
      alert("Login failed: " + err.response?.data?.message);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)", width: 300,
        bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2
      }}>
        <Typography variant="h6" mb={2}>Login</Typography>
        <TextField label="Email" fullWidth value={email} onChange={e => setEmail(e.target.value)} sx={{ mb: 2 }} />
        <TextField label="Password" type="password" fullWidth value={password} onChange={e => setPassword(e.target.value)} sx={{ mb: 2 }} />
        <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>
      </Box>
    </Modal>
  );
}

export default LoginModal;
