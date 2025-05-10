import React, { useState } from 'react';
import { TextField, Button, Box, InputLabel, MenuItem, Select, FormControl } from '@mui/material';
import axios from 'axios';

export default function UpdateTranForm() {
  const [formData, setFormData] = useState({
    tid: '',    // Important: you need TID (Transaction ID) to update
    uid: '',
    rd_amt: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put('http://127.0.0.1:3000/updatetran', formData);
      alert(response.data.message);
    } catch (error) {
      console.error('Update failed:', error.response?.data?.message || error.message);
      alert('Update failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 3 }}>
      <TextField
        fullWidth
        label="Transaction ID (tid)"
        name="tid"
        variant="outlined"
        value={formData.tid}
        onChange={handleChange}
        sx={{ mb: 2 }}
        required
      />
      <TextField
        fullWidth
        label="User ID (uid)"
        name="uid"
        variant="outlined"
        value={formData.uid}
        onChange={handleChange}
        sx={{ mb: 2 }}
        required
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Rd Amount</InputLabel>
        <Select
          name="rd_amt"
          value={formData.rd_amt}
          onChange={handleChange}
          label="Rd Amount"
          required
        >
          <MenuItem value="1000">1000</MenuItem>
          <MenuItem value="2000">2000</MenuItem>
          <MenuItem value="3000">3000</MenuItem>
          <MenuItem value="5000">5000</MenuItem>
          <MenuItem value="10000">10000</MenuItem>
          <MenuItem value="15000">15000</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        Update Transaction
      </Button>
    </Box>
  );
}
