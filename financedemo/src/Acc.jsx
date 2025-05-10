import React, { useEffect, useState } from "react";
import axios from "axios";

function Acc() {
  const [data, setData] = useState([]);
  const [cnt, setcnt] = useState(0);

  function cntapi() {
    axios.get("http://127.0.0.1:3000/tinst")
      .then(response => {
        console.log("API Response:", response.data); // Debugging
        const usersArr = response.data.tran;
        setData(usersArr);
        console.log("Users Array:", usersArr);
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
        <h1> <th>Total_Transaction </th></h1><br></br>
    <h1>{cnt}</h1>
        <div className="mt-4 p-5 text-white rounded">
          <table className="table table-dark">
            <thead>
              <tr>
                <th>Rd_Amount</th>
               
                <th>Interest</th>
                <th>Total_With_Interest</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((res, uid,cnt) => (
                <tr key={uid}>
                  <td>{res.rd_amt}</td>
                  <td>{res.interest}</td>
                  <td>{res.total_with_interest}</td>
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

export default Acc;
