import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";
import axios from "axios";

function RegisterModal({ open, onClose }) {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:3000/register", formData);
      alert("Registration Successful!");
      onClose();
    } catch (err) {
      alert("Registration failed: " + err.response?.data?.message);
    }
  };

  return (
  
    <Modal open={open} onClose={onClose}>
    <Box sx={{
      position: "absolute", top: "50%", left: "50%",
      transform: "translate(-50%, -50%)", width: 300,
      bgcolor: "background.paper", boxShadow: 24, p: 4, borderRadius: 2
    }}>
      <Typography variant="h6" mb={2}>Register</Typography>
      <TextField label="Name" fullWidth value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} sx={{ mb: 2 }} />
      <TextField label="Email" fullWidth value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} sx={{ mb: 2 }} />
      <TextField label="Password" type="password" fullWidth value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} sx={{ mb: 2 }} />
      <Button variant="contained" fullWidth onClick={handleRegister}>Register</Button>
    </Box>
  </Modal>
  );
}

export default RegisterModal;
