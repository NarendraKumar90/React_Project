import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  Button, Modal, Box, TextField, Typography,
  MenuItem, Select, FormControl, InputLabel
} from "@mui/material";

function Menu() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ mid: "", mname: "", price: "", fid: "", qid: "" });
  const [data, setData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const quantityOptions = [
    { label: "Full", value: "1" },
    { label: "Half", value: "2" }
  ];

  const foodOptions = [
    { label: "Pizza", value: "1" },
    { label: "Burger", value: "2" },
    { label: "Pasta", value: "3" }
  ];

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ mid: "", mname: "", price: "", fid: "", qid: "" });
    setIsUpdating(false);
    setIsAdd(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cntapi = () => {
    axios.get("http://127.0.0.1:3000/menu")
      .then(response => {
        setData(response.data.menu || []);
      })
      .catch(error => console.error("API Error:", error));
  };

  useEffect(() => {
    cntapi();
  }, []);

  const del = (id) => {
    if (!window.confirm(`Are you sure you want to delete menu item ${id}?`)) return;

    axios.delete(`http://localhost:3000/delmenuById/${id}`)
      .then(response => {
        if (response.data && response.data.status === 200) {
          toast.success(" Delete Success!", { position: "top-center", theme: "colored" });
          cntapi();
        } else {
          toast.error("❌ Delete Failed!", { position: "top-center", theme: "colored" });
        }
      })
      .catch(error => {
        console.error("Delete Error:", error);
        toast.error("❌ Error deleting item", { position: "top-center", theme: "colored" });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dt = {
      mid: formData.mid,
      mname: formData.mname,
      price: formData.price,
      fid: formData.fid,
      qid: formData.qid
    };

    if (isUpdating) {
      axios.put("http://127.0.0.1:3000/updatemenu", dt)
        .then(response => {
          if (response.data.status === 200) {
            toast.success("✅ Update Success!", { position: "top-center", theme: "colored" });
            cntapi();
            handleClose();
          } else {
            toast.error("❌ Update Failed!", { position: "top-center", theme: "colored" });
          }
        })
        .catch(error => {
          console.error("Update Error:", error);
          toast.error("❌ Something went wrong!", { position: "top-center", theme: "colored" });
        });

    } else if (isAdd) {
      axios.post("http://127.0.0.1:3000/addmenu", dt)
        .then(response => {
          if (response.data.status === 200) {
            toast.success("✅ Add Success!", { position: "top-center", theme: "colored" });
            cntapi();
            handleClose();
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
    setFormData({ mid: "", mname: "", price: "", fid: "", qid: "" });
    setIsAdd(true);
    setOpen(true);
  };

  const handleUpdateClick = (item) => {
    setFormData({
      mid: item.mid,
      mname: item.mname,
      price: item.price,
      fid: item.fid,
      qid: item.qid
    });
    setIsUpdating(true);
    setOpen(true);
  };

  return (
    <>
      <ToastContainer />
      <center>
        <Button variant="contained" color="success" onClick={handleAddClick} sx={{ mt: 2, mb: 2 }}>
          Add Menu Item
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
              {isUpdating ? "Update Menu" : "Add Menu"}
            </Typography>

            <form onSubmit={handleSubmit}>
              {isUpdating && (
                <TextField
                  fullWidth
                  label="Menu ID"
                  name="mid"
                  variant="outlined"
                  value={formData.mid}
                  sx={{ mb: 2 }}
                  disabled
                />
              )}

              <TextField
                fullWidth
                label="Menu Name"
                name="mname"
                variant="outlined"
                value={formData.mname}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />

               <TextField
                fullWidth
                label="Menu Price"
                name="price"
                variant="outlined"
                value={formData.price}
                onChange={handleChange}
                sx={{ mb: 2 }}
                required
              />

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Food Item</InputLabel>
                <Select
                  name="fid"
                  value={formData.fid}
                  onChange={handleChange}
                  label="Food Item"
                  required
                >
                  {foodOptions.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Quantity</InputLabel>
                <Select
                  name="qid"
                  value={formData.qid}
                  onChange={handleChange}
                  label="Quantity"
                  required
                >
                  {quantityOptions.map(opt => (
                    <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                  ))}
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
              <th scope="col">Menu_Id</th>
              <th scope="col">Menu_Name</th>
              <th scope="col">Price</th>
              <th scope="col">Fid</th>
              <th scope="col">Qid</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map((item, index) => (
              <tr key={item.mid || index}>
                <td>{item.mid}</td>
                <td>{item.mname}</td>
                <td>{item.price}</td>
                <td>{item.fid}</td>
                <td>{item.qid}</td>
                <td>
                  <Button variant="contained" color="warning" size="small" sx={{ mr: 1 }}
                    onClick={() => handleUpdateClick(item)}>Update</Button>
                  <Button variant="contained" color="error" size="small"
                    onClick={() => del(item.mid)}>Delete</Button>
                </td>
              </tr>
            )) : (
              <tr><td colSpan="6">No data available</td></tr>
            )}
          </tbody>
        </table>
      </center>
    </>
  );
}

export default Menu;
