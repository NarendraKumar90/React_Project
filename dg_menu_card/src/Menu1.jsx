import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Menu1() {
  const [open, setOpen] = useState(false); // Modal visibility state
  const [formData, setFormData] = useState({ id: "", name: "", price: "", fid: "", qid: "" });
  const [data, setData] = useState([]); // Store fetched menu data
  const [isUpdating, setIsUpdating] = useState(false); // Track update mode

  // Handle open/close modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ id: "", name: "", price: "", fid: "", qid: "" }); // Reset form
    setIsUpdating(false);
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Fetch menu data from API
  const cntapi = () => {
    axios.get("http://127.0.0.1:3000/menu")
      .then(response => {
        setData(response.data.menu || []);
      })
      .catch(error => console.error("API Error:", error));
  };

  useEffect(() => {
    cntapi(); // Fetch data on component mount
  }, []);


  const del = (id,mn) => {
    
    if (!window.confirm("Are you sure you want to delete this "+ mn +"  Food Category?")) return; // Confirmation

      axios.delete(`http://localhost:3000/delmenuById/${id}`)

    .then(response=>{
       if(response.data.status==200){
        toast.success(mn+" Delete Success!", { position: "top-center", theme: "colored" });
        cntapi()
       }
    })     
 }


  // Handle form submission for Add & Update
  const handleSubmit = (e) => {
    e.preventDefault();

    const dt = {
      mid: formData.id,
      mname: formData.name,
      price: formData.price,
      fid: formData.fid,
      qid: formData.qid
    };

    if (isUpdating) {
      // Update existing record
      axios.put("http://127.0.0.1:3000/updatemenu", dt)
        .then(response => {
          if (response.data.status ==200) {
            toast.success("✅ Update Success!", { position: "top-center", theme: "colored" });
            cntapi();
          } else {
            toast.error("❌ Update Failed!", { position: "top-center", theme: "colored" });
          }
        })
        .catch(error => console.error("Update Error:", error));
    } else {
      // Add new record
      axios.post("http://localhost:3000/addmenu", dt)
        .then(response => {
          if (response.data.status == 200) {
           toast.success("✅ Add Success!", { position: "top-center", theme: "colored" });
            cntapi();
          } else {
             toast.error("❌ Add Failed!", { position: "top-center", theme: "colored" });
          }
        })
        .catch(error => console.error("Add Error:", error));
    }

    handleClose(); // Close modal after submit
  };

  // Handle Update button click (Pre-fill data in modal)
  const handleUpdateClick = (item) => {
    setFormData({ id: item.mid, name: item.mname, price: item.price, fid: item.fid, qid: item.qid });
    setIsUpdating(true); // Set update mode
    handleOpen();
  };

  return (
    <>
      <ToastContainer />
      <center>
          <button type="button" variant="contained"  onClick={handleOpen}  sx={{ mt: 2, mb: 2 }} className="btn btn-success me-2">
            Add Menu Item
            </button>

        <Modal open={open} onClose={handleClose}>
          <Box sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}>
            <Typography variant="h6" component="h2" mb={2}>
              {isUpdating ? "Update Menu" : "Add Menu"}
            </Typography>

            <form onSubmit={handleSubmit}>
              <TextField fullWidth label="Menu Name" name="name" variant="outlined" value={formData.name} onChange={handleChange} sx={{ mb: 2 }} />
              <TextField fullWidth label="Price" name="price" variant="outlined" value={formData.price} onChange={handleChange} sx={{ mb: 2 }} />

     {/* SELECTED FORM FOR FID */}


               <FormControl fullWidth sx={{ mb: 2 }}>

  <InputLabel>Category</InputLabel>
  <Select
    name="fid"
    value={formData.fid}  // Bind value correctly
    onChange={(e) => setFormData({ ...formData, fid: e.target.value })} // Update state
    variant="outlined"
  >
    <MenuItem value="1">VEG</MenuItem>
    <MenuItem value="2">NON_VEG</MenuItem>
  </Select>
               </FormControl>


{/* SELECTED FORM FOR QID */}


              <FormControl fullWidth sx={{ mb: 2 }}>

  <InputLabel>Size</InputLabel>
  <Select
    name="qid"
    value={formData.qid}  // Bind value correctly
    onChange={(e) => setFormData({ ...formData, qid: e.target.value })} // Update state
    variant="outlined"
  >
    <MenuItem value="1">Full</MenuItem>
    <MenuItem value="2">Half</MenuItem>
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
              <th scope="col">Menu Id</th>
              <th scope="col">Menu Name</th>
              <th scope="col">Price</th>
              <th scope="col">Fid</th>
              <th scope="col">Qid</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.mid || index}>
                <td>{item.mid}</td>
                <td>{item.mname}</td>
                <td>{item.price}</td>
                <td>{item.fid}</td>
                <td>{item.qid}</td>
                <td>
                  <button type="button" onClick={() => handleUpdateClick(item)} className="btn btn-warning me-2">Update</button>
                  <button type="button" className="btn btn-danger" onClick={() => del(item.mid,item.mname)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </>
  );
}

export default Menu1;
