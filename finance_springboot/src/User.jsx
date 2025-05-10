import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal, Box, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

function User() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ uid: "", uname: "", address: "",mob: "", acno: "", pan: "", rd_amt: "", email: "" });
  const [data, setData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ uid: "", uname: "", address: "",mob: "", acno: "", pan: "", rd_amt: 0, email: "" });
    setIsUpdating(false);
    setIsAdd(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cntapi = () => {
    axios.get("http://localhost:8080/getAllUser")
      .then(response => {
        setData(response.data.user || []);
      })
      .catch(error => console.error("API Error:", error));
  };

  useEffect(() => {
    cntapi();
  }, []);

  const del = (id,uname) => {
    if (!window.confirm(`Are you sure you want to delete  ${uname}? user ID ${id}? `)) return;

    axios.delete(`http://localhost:8080/deleteUser/${id}`)  // ✅ Append ID in URL
      .then(response => {
        if (response.data.status === 200) {
          toast.success("❌ Delete Success!", { position: "top-center", theme: "colored" });
          cntapi();
        } else {
          alert("Delete failed");
        }
      })
      .catch(error => console.error("Delete Error:", error));
  };

  // Submit after clicking on sobmit button
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const dt = {
      uid: formData.uid,
      uname: formData.uname,
      address: formData.address,
      mob: formData.mob,
      acno: formData.acno,
      pan: formData.pan,
      rd_amt: formData.rd_amt,
      email: formData.email
    };
  
    if (isUpdating) {
      axios.put(`http://localhost:8080/updateUser/${dt.uid}`, dt) // 🔹 pass uid in URL
        .then(response => {
          if (response.data.status === 200) {
            toast.success(" Update Success!", { position: "top-center", theme: "colored" });
            cntapi();        // refresh the table
            handleClose();   // close modal only after success
          } else {
            toast.error("❌ Update Failed!", { position: "top-center", theme: "colored" });
          }
        })
        .catch(error => {
          console.error("Update Error:", error);
          toast.error("❌ Something went wrong!", { position: "top-center", theme: "colored" });
        });
    } else if (isAdd) {
      axios.post("http://localhost:8080/saveUser", dt)
        .then(response => {
          if (response.data.status === 201) {
            toast.success("✅ Add Success!", { position: "top-center", theme: "colored" });
            cntapi();        // refresh the table
            handleClose();   // close modal only after success
          } else {
            toast.error("❌ Add Failed!", { position: "top-center", theme: "colored" });
          }
        })
        .catch(error => {
          console.error("Add Error:", error);
          toast.error("❌ Something went wrong!", { position: "top-center", theme: "colored" });
        });
    }
  };
  

  const handleAddClick = () => {
    setFormData({  uid: "", uname: "", address: "",mob: "", acno: "", pan: "", rd_amt: "", email: "" }); // Empty form for add
    setIsAdd(true);
    setOpen(true);
  };

  const handleUpdateClick = (item) => {
    setFormData({ uid: item.uid,uname:item.uname,address:item.address,
      mob:item.mob,acno:item.acno,pan:item.pan, rd_amt: item.rd_amt,email:item.email });
    setIsUpdating(true);
    setOpen(true);
  };

  return (
    <>

<>
  {/* your current code */}
  
  <ToastContainer />
</>
      <center>
        <Button variant="contained" color="success" onClick={handleAddClick} sx={{ mt: 2, mb: 2 }}>
          Add User
        </Button>

        <Modal open={open} onClose={handleClose}>
          <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            height: 600, 
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            overflowY: "auto"       // allows scrolling if content overflows
          }}>
            <Typography variant="h6" component="h2" mb={2}>
              {isUpdating ? "Update User" : "Add User"}
            </Typography>

            <form onSubmit={handleSubmit}>
              {isUpdating && (   //tid is open when isUpdating is true
                <TextField
                  fullWidth
                  label="User ID (uid)"
                  name="uid"
                  variant="outlined"
                  value={formData.uid}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  required
                  disabled
                />
              )}

              <TextField
                fullWidth
                label="Email ID "
                name="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />

              <TextField
                fullWidth
                label="User_Name"
                name="uname"
                variant="outlined"
                value={formData.uname}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />

              <TextField
                fullWidth
                label="Address"
                name="address"
                variant="outlined"
                value={formData.address}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />

              <TextField
                fullWidth
                label="Mobile_No"
                name="mob"
                variant="outlined"
                value={formData.mob}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />

              <TextField
                fullWidth
                label="Account_No"
                name="acno"
                variant="outlined"
                value={formData.acno}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />

              <TextField
                fullWidth
                label="Pan_No"
                name="pan"
                variant="outlined"
                value={formData.pan}
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

              <Box textAlign="right">
                <Button onClick={handleClose} sx={{ mr: 1 }} color="error">Cancel</Button>
                <Button type="submit" variant="contained" color="primary">
                  {isUpdating ? "Update" : "Submit"}
                </Button>
              </Box>
            </form>
          </Box>
        </Modal>

        <table className="table table-dark mt-3">
          <thead>
            <tr>
              <th>User_id</th>
                <th>User_Name</th>
                <th>Account_No</th>
                <th>Pan_No</th>
                <th>RD_Amount</th>
                <th>Address</th>
                <th>Mobile</th>
                {/* <th>Email</th> */}
                <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map((item, index) => (
              <tr key={item.uid || index}>
                 <td>{item.uid}</td>
                  <td>{item.uname}</td>
                  <td>{item.acno}</td>
                  <td>{item.pan}</td>
                  <td>{item.rd_amt}</td>
                  <td>{item.address}</td>
                  <td>{item.mob}</td>
                  {/* <td>{res.email}</td> */}
                <td>
                  <Button variant="contained" color="warning" size="small" sx={{ mr: 1 }}
                    onClick={() => handleUpdateClick(item)}>Update</Button>
                  <Button variant="contained" color="error" size="small"
                    onClick={() => del(item.uid,item.uname)}>Delete</Button>
                </td>
              </tr>
            )): (
              <tr><td colSpan="6">No data available</td></tr>
            )}
          </tbody>
        </table>
      </center>
    </>
  );
}

export default User;
