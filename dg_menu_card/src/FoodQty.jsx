
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import {Button, Modal, Box, TextField, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { MenuItem, Select, FormControl, InputLabel } from "@mui/material";


function FoodQty(){

    const [open, setOpen] = useState(false); // State to control popup visibility
    // const [formData, setFormData] = useState();
    const [formData, setFormData] = useState({ psize: "" });
      const [isUpdating, setIsUpdating] = useState(false); // Track update mode
  
  
    
    // Handle open/close modal
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
      setOpen(false);
      setFormData({  psize: "",qid:"" }); // Reset form
      setIsUpdating(false);
    };
  
    // Handle input change
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    // Handle form submission
    const handleSubmit = (e) => {
      e.preventDefault();

      //const [formData, setFormData] = useState("");
    
    console.log("Form Data:", formData.psize);
    // alert(formData.name)
    
     
    const dt={
      psize:formData.psize,
      qid:formData.qid
    }

        if (isUpdating) {
          // Update existing record
          axios.put("http://127.0.0.1:3000/updateqty", dt)
            .then(response => {
              if (response.data.status ==200) {
                alert("Update success");
                cntapi();
              } else {
                alert("Update failed");
              }
            })
            .catch(error => console.error("Update Error:", error));
        } else {
          // Add new record
          axios.post("http://localhost:3000/addqty", dt)
            .then(response => {
              if (response.data.status == 200) {
                alert("Add success");
                cntapi();
              } else {
                alert("Add failed");
              }
            })
            .catch(error => console.error("Add Error:", error));
        }
    
        handleClose(); // Close modal after submit
      };
    

       // Close modal after submit  
  const [data, setData] = useState([]);

  function cntapi() {
    axios.get("http://127.0.0.1:3000/qty")
      .then(response => {
        let ar = response.data.qty || [];
        setData(ar);
        console.log("Array:", ar);
      })
      .catch(error => {
        console.error("API Error:", error);
      });
  }

  useEffect(() => {  // randor the content
    cntapi();
  }, []);

    // Handle delete
    const del = (id,mn) => {
    
      if (!window.confirm("Are you sure you want to delete this "+ mn +"  Food Size?")) return;  // Confirmation
      const dt={
        id:id
      }
      axios.delete("http://localhost:3000/delqtyById",{
        data: dt
      })
  
      .then(response=>{
         if(response.data.status==200){
          alert(mn+" Delete success")
          cntapi()
         }
      })     
   }

     // Handle Update button click (Pre-fill data in modal)
  const handleUpdateClick = (item) => {
    setFormData({  psize: item.psize,  qid: item.qid });
    setIsUpdating(true); // Set update mode
    handleOpen();
  };
    
  return (
    <>
      <center>
          <Modal open={open} onClose={handleClose}>
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 400,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="h6" component="h2" mb={2}>
                    Select Food Size
                  </Typography>
        
                  <form onSubmit={handleSubmit}>

                

                    {/* Name Input */}

                    {/* <TextField fullWidth label="Size"   name="name" variant="outlined"  value={formData.name}  onChange={handleChange} sx={{ mb: 2 }}
                    /> */}

                                <FormControl fullWidth sx={{ mb: 2 }}>
                    
                      <InputLabel>Size</InputLabel>
                      <Select
                        name="psize"
                        value={formData.psize}  // Bind value correctly
                        onChange={(e) => setFormData({ ...formData, psize: e.target.value })} // Update state
                        variant="outlined"
                      >
                        <MenuItem value="Full">Full</MenuItem>
                        <MenuItem value="Half">Half</MenuItem>
                        <MenuItem value="1/4">1/4</MenuItem>
                        <MenuItem value="1/8">1/8</MenuItem>
                      </Select>
                                   </FormControl>
        
        
                    {/* Submit & Close Buttons */}
                    <Box textAlign="right">
              <Button onClick={handleClose} sx={{ mr: 1 }} color="error">
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
                  </form>
                </Box>
              </Modal>
              <table className="table table-dark mt-3">
          <thead>
            <tr>
              <th scope="col">Q Id</th>
              <th scope="col">Food Quantity</th>
              <th scope="col"> Action</th>
              
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item.qid || index}>
                <td>{item.qid}</td>
                <td>{item.psize}</td>
              
                <td>
                  <button type="button"  onClick={handleOpen} className="btn btn-success me-2">Add</button>
                  <button type="button" onClick={() => handleUpdateClick(item)} className="btn btn-warning me-2">Update</button>
                  <button type="button" className="btn btn-danger" onClick={() => del(item.qid,item.psize)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </center>
    </>
  );
}

export default FoodQty;
