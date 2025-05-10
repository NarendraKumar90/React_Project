<Router>
<Routes>
  <Route path="/" element={<Login />} />
  <Route path="/dash" element={<Dash />}>
    <Route path="orders" element={<Orders />} />
    <Route path="tran" element={<Transactions />} />
    <Route path="users" element={<Users />} />
  </Route>
</Routes>
</Router>