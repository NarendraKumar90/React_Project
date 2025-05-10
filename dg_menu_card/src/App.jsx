import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashbrd from "./Dashbrd";
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodCat from "./FoodCat";
import FoodQty from "./FoodQty";
import Menu1 from "./Menu1";
import Login from "./Login";

function App() {
  return (
    <Router>
      <Routes>
        {/* Login is default at "/" */}
        <Route path="/" element={<Login />} />

        {/* Dashboard and its nested routes */}
        <Route path="/dash" element={<Dashbrd />}>
          <Route path="cat" element={<FoodCat />} />
          <Route path="qty" element={<FoodQty />} />
          <Route path="menu" element={<Menu1 />} />
        </Route>

        {/* Optional: Redirect unknown routes to login */}
        {/* <Route path="*" element={<Navigate to="/" />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
