import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dash from './Dash';
import User from './User';
import Tran from './Tran';
import Login from './Login';
import Dashbrd from './Dashbrd'; // Optional, depending on what this is

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        <Route path="/" element={<Login />} />

        {/* Protected/dashboard routes under layout */}
        <Route path="/dash" element={<Dash />}>
          {/* <Route index element={<Dashbrd />} /> */}
          <Route path="users" element={<User />} />
          <Route path="tran" element={<Tran />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
