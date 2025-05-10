import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dash from './Dash';
import Login from './Login';
import Tran from './Tran';
import User from './User';
import User_detail from './User_detail';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dash" element={<Dash/>}>
          <Route path="u_detail" element={<User_detail />} />
          <Route path="tran" element={<Tran />} />
          <Route path="users" element={<User />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
