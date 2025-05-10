import React, { useEffect, useState } from "react";
import axios from 'axios';

function User_detail() {
   
  const [data, setData] = useState([]);

  function cntapi() {
    axios.get("http://127.0.0.1:3000/udetails")
      .then(response => {
        console.log("API Response:", response.data); 
        const usersArray = response.data.users;
        setData(usersArray);
        console.log("Users Array:", usersArray);
      })
      .catch(error => {
        console.error("API Error:", error);
      });
  }

  useEffect(() => {
    cntapi();
  }, []);
  

  return (
    <>
      <center>
        <div className="mt-4 p-5 text-white rounded">
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Uid</th>
                <th>User Name</th>
                <th>Rd_amount</th>
                <th>EMI</th>
                <th>last_paid_date</th>
              </tr>
            </thead>
            <tbody>
              {data.map((res, uid) => (
                <tr key={uid}>
                  <td>{res.uid}</td>
                  <td>{res.uname}</td>
                  <td>{res.rd_amt}</td>
                  <td>{res.emi_count}</td>
                  <td>{res.last_paid_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </center>
    </>
  );
}

export default User_detail;
