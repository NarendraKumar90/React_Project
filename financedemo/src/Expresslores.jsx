// //  npm init -y
// npm install express pg bcrypt jsonwebtoken cors body-parser
// Create a file: server.js

const express = require('express');
const app = express();
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Pool } = require('pg');

app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: 'postgres', // your db username
  host: 'localhost',
  database: 'authdb', // your db name
  password: 'yourpassword', // your db password
  port: 5432,
});

const SECRET_KEY = 'supersecretkey'; // make strong in real apps!

// Register Route
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  // Validate
  if (!email.includes('@') || password.length < 6) {
    return res.status(400).json({ message: 'Invalid data' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id',
      [name, email, hashedPassword]
    );

    const token = jwt.sign({ id: result.rows[0].id }, SECRET_KEY);
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await pool.query('SELECT * FROM users WHERE email=$1', [email]);

  if (user.rows.length === 0) {
    return res.status(400).json({ message: 'User not found' });
  }

  const valid = await bcrypt.compare(password, user.rows[0].password);

  if (!valid) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  const token = jwt.sign({ id: user.rows[0].id }, SECRET_KEY);
  res.json({ token });
});

// Protected Route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is protected data!' });
});

// Middleware to check token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);

    req.user = user;
    next();
  });
}

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
//////////////////////////////////////////////////////////////////


// Backend: Express + PostgreSQL + JWT + Bcrypt

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = 3000;
const pool = new Pool(); // use .env for connection

app.use(cors());
app.use(express.json());

// Middleware to verify token and extract role
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Forbidden' });
    req.user = user;
    next();
  });
}

// REGISTER
app.post('/register', async (req, res) => {
  const { name, email, password, role = 'user' } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)',
      [name, email, hashedPassword, role]
    );
    res.status(200).json({ message: 'Registered' });
  } catch (err) {
    res.status(500).json({ message: 'Error Registering' });
  }
});

// LOGIN
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const userResult = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

  if (userResult.rows.length === 0) return res.status(400).json({ message: 'Invalid email' });

  const user = userResult.rows[0];
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, role: user.role });
});

// PROTECTED ROUTE (Admin Only)
app.get('/admin', authenticateToken, (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admins only' });
  res.json({ message: 'Welcome Admin!' });
});

// PROTECTED ROUTE (All logged-in users)
app.get('/dashboard', authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.role}` });
});

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
