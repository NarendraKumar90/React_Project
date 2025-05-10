import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal, Box, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

function FoodCat() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ category: "" });
  const [data, setData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ category: "", fid: ""});
    setIsUpdating(false);
    setIsAdd(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cntapi = () => {
    axios.get("http://127.0.0.1:3000/foodcat")
      .then(response => {
        setData(response.data.food_cat || []);
      })
      .catch(error => console.error("API Error:", error));
  };

  useEffect(() => {
    cntapi();
  }, []);

    // Handle delete
    const del = (id,mn) => {
    
      if (!window.confirm("Are you sure you want to delete this "+ id +"  Food Category?")) return;  // Confirmation
      const dt={
        id:id
      }
      axios.delete("http://localhost:3000/delfoodById",{
        data: dt
      })
  
      .then(response=>{
         if(response.data.status==200){
         toast.success("✅ Delete Success!", { position: "top-center", theme: "colored" });
          cntapi()
         }
      })     
   }
  

  // Submit after clicking on sobmit button
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const dt = {
      category: formData.category,
      fid: formData.fid,
   
    };
  
    if (isUpdating) {
      axios.put("http://127.0.0.1:3000/updatecat", dt)// 🔹 pass fid in body parserL
          .then(response => {
            if (response.data.status === 200) {
              toast.success("✅ Update Success!", { position: "top-center", theme: "colored" });
              cntapi();        // 🔁 refresh table/data
              handleClose();   // ❎ close modal after success
            } else {
              toast.error("❌ Update Failed!", { position: "top-center", theme: "colored" });
            }
          })
          .catch(error => {
            console.error("Update Error:", error);
            toast.error("❌ Something went wrong!", { position: "top-center", theme: "colored" });
          });
      
      
    } else if (isAdd) {
      axios.post("http://127.0.0.1:3000/addfood", dt)
        .then(response => {
          if (response.data.status === 200) { // ✅ match Spring Boot's returned status
            toast.success("✅ Add Success!", { position: "top-center", theme: "colored" });
            cntapi();        // ✅ refresh list or count
            handleClose();   // ✅ close the modal
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
    setFormData({ fid: "", category: ""}); // Empty form for add
    setIsAdd(true);
    setOpen(true);
  };

  const handleUpdateClick = (item) => {
    setFormData({ fid: item.fid, category: item.category });
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
          Add FoodCategory
        </Button>

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
              {isUpdating ? "Update FoodCategory" : "Add FoodCategory"}
            </Typography>

            <form onSubmit={handleSubmit}>
              {isUpdating && (   //tid is open when isUpdating is true
                <TextField
                  fullWidth
                  label="FoodCategory ID (fid)"
                  name="fid"
                  variant="outlined"
                  value={formData.fid}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  required
                  disabled
                />
              )}

              {/* <TextField
                fullWidth
                label="User ID (uid)"
                name="uid"
                variant="outlined"
                value={formData.category}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              /> */}

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Food_Category</InputLabel>
                <Select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  label="Food_Category"
                  required
                >
                       <MenuItem value="VEG">VEG</MenuItem>
                        <MenuItem value="NON VEG">NON VEG</MenuItem>
                        <MenuItem value="SOUTH INDIAN">SOUTH INDIAN</MenuItem>
                        <MenuItem value="CHINES">CHINESE</MenuItem>
                        <MenuItem value="FJ FOOD">FJ FOOD</MenuItem>
                        <MenuItem value="PUNB">PUNB</MenuItem>
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
      <th scope="col">Food_Id</th>
      <th scope="col">Food Category</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {data.length > 0 ? data.map((item, index) => (
      <tr key={item.fid || index}>
        <td>{item.fid}</td>
        <td>{item.category}</td>
    
        <td>
          <Button variant="contained" color="warning" size="small" sx={{ mr: 1 }}
            onClick={() => handleUpdateClick(item)}>Update</Button>
          <Button variant="contained" color="error" size="small"
            onClick={() => del(item.fid)}>Delete</Button>
        </td>
      </tr>
    )) : (
      <tr><td colSpan="4">No data available</td></tr>
    )}
  </tbody>
</table>
      </center>
    </>
  );
}

export default FoodCat;