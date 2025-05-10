import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Modal, Box, TextField, Typography, MenuItem, Select, FormControl, InputLabel } from "@mui/material";

function Tran() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ tid: "", uid: "", rd_amt: "" });
  const [data, setData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isAdd, setIsAdd] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFormData({ tid: "", uid: "", rd_amt: "" });
    setIsUpdating(false);
    setIsAdd(false);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const cntapi = () => {
    axios.get("http://127.0.0.1:3000/tran")
      .then(response => {
        setData(response.data.tran || []);
      })
      .catch(error => console.error("API Error:", error));
  };

  useEffect(() => {
    cntapi();
  }, []);

  const del = (id) => {
    if (!window.confirm(`Are you sure you want to delete transaction ID ${id}?`)) return;

    axios.delete("http://localhost:3000/deltranById", { data: { id } })
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
      tid: formData.tid,
      uid: formData.uid,
      rd_amt: formData.rd_amt
    };
  
    if (isUpdating) {
      axios.put("http://127.0.0.1:3000/updatetran", dt)
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
      axios.post("http://127.0.0.1:3000/addtran", dt)
        .then(response => {
          if (response.data.status === 200) {
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
    setFormData({ uid: "", rd_amt: "", tid: "" }); // Empty form for add
    setIsAdd(true);
    setOpen(true);
  };

  const handleUpdateClick = (item) => {
    setFormData({ tid: item.tid, uid: item.uid, rd_amt: item.rd_amt });
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
          Add Transaction
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
              {isUpdating ? "Update Transaction" : "Add Transaction"}
            </Typography>

            <form onSubmit={handleSubmit}>
              {isUpdating && (   //tid is open when isUpdating is true
                <TextField
                  fullWidth
                  label="Transaction ID (tid)"
                  name="tid"
                  variant="outlined"
                  value={formData.tid}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                  required
                  disabled
                />
              )}

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
              <th scope="col">Transaction_Id</th>
              <th scope="col">User_Id</th>
              <th scope="col">Rd_amount</th>
              <th scope="col">Date</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.tid || index}>
                <td>{item.tid}</td>
                <td>{item.uid}</td>
                <td>{item.rd_amt}</td>
                <td>{item.created_at}</td>
                <td>
                  <Button variant="contained" color="warning" size="small" sx={{ mr: 1 }}
                    onClick={() => handleUpdateClick(item)}>Update</Button>
                  <Button variant="contained" color="error" size="small"
                    onClick={() => del(item.tid)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </>
  );
}

export default Tran;
