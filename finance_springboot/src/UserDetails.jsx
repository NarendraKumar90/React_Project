import React, { useState, useEffect } from "react";
import axios from "axios";
import 'react-toastify/dist/ReactToastify.css';

function UserDetails() {

  const [data, setData] = useState([]);

  const cntapi = () => {
    axios.get("http://localhost:8080/udetails")
      .then(response => {
        setData(response.data.users || []);
      })
      .catch(error => console.error("API Error:", error));
  };

  useEffect(() => {
    cntapi();
  }, []);

  return (
  
<>
      <center>
      
        <table className="table table-dark mt-3">
          <thead>
            <tr>
              <th>User_id</th>
                <th>User_Name</th>
                <th>Account_No</th>
                <th>RD_Amount</th>
                <th>EMI Count</th>
                <th>LastPaidDate</th> 
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map((item, index) => (
              <tr key={item.uid || index}>
                 <td>{item.uid}</td>
                  <td>{item.uname}</td>
                  <td>{item.acno}</td>
                  <td>{item.rd_amt}</td>
                  <td>{item.emiCount}</td>
                  <td>{item.lastPaidDate}</td>
             
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

export default UserDetails;
