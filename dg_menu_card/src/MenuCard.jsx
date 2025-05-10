import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const MenuTable = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/menucard') // replace with your actual API
      .then(response => {
        setData(response.data.menu);
      })
      .catch(error => {
        console.error('Error fetching menu data:', error);
      });
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="mb-3">Menu Items</h3>
      <div className="table-responsive">
        <table className="table table-dark table-bordered table-hover">
          <thead className="thead-light">
            <tr>
              <th scope="col">Mid</th>
              <th scope="col">Menu Name</th>
              <th scope="col">Price</th>
              <th scope="col">Category</th>
              <th scope="col">Size</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? data.map((res) => (
              <tr key={res.mid}>
                <td>{res.mid}</td>
                <td>{res.mname}</td>
                <td>{res.price}</td>
                <td>{res.category}</td>
                <td>{res.psize}</td>
              </tr>
            )) : (
              <tr>
                <td colSpan="5" className="text-center">Loading or no data available...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MenuTable;
