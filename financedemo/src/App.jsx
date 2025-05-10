import React, { useEffect, useState } from "react";
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router';
import Layout from './layouts/dashboard';

function App() {
   
  const [data, setData] = useState([]);

  function cntapi() {
    axios.get("http://127.0.0.1:3000/users")
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
                <th>Address</th>
                <th>Mob</th>
                <th>Account</th>
                <th>Pan_No</th>
                <th>Rd_Amount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((res, uid) => (
                <tr key={uid}>
                  <td>{res.uid}</td>
                  <td>{res.uname}</td>
                  <td>{res.address}</td>
                  <td>{res.mob}</td>
                  <td>{res.acno}</td>
                  <td>{res.pan}</td>
                  <td>{res.rd_amt}</td>
                  <td>
                    <button type="button" className="btn btn-success button">Add</button>
                    <button type="button" className="btn btn-warning button">Update</button>
                    <button type="button" className="btn btn-danger button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </center>
    </>
  );
}

export default App;
