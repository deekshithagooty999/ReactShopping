import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';
import bcrypt from 'bcrypt';
import cartRoutes from './routes/cartRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

const app = express();
app.use(express.json());
app.use(cors());

// ✅ MySQL Database Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "T#9758@qlph",
  database: "db",
});



//orderRoutes

app.use("/api/orders", orderRoutes);


// ✅ REGISTER Route
app.post("/register", (req, res) => {
  const sql = "INSERT INTO user(`username`, `email`, `password`) VALUES (?)";
  const saltRounds = 10;

  bcrypt.hash(req.body.password.toString(), saltRounds, (err, hash) => {
    if (err) return res.json({ success: false, message: "Error hashing password" });

    const values = [req.body.username, req.body.email, hash];
    db.query(sql, [values], (err, result) => {
      if (err) return res.json({ success: false, message: "Database error", error: err });
      return res.json({ success: true, message: "User registered successfully" });
    });
  });
});

// ✅ LOGIN Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM user WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) return res.json({ success: false, message: "Database error" });
    if (results.length === 0) {
      return res.json({ success: false, message: "Invalid email or password" });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.json({ success: false, message: "Error comparing passwords" });

      if (match) {
        return res.json({ success: true, message: "Login successful", user_id: user.id }); // ✅ Send user_id
      } else {
        return res.json({ success: false, message: "Invalid email or password" });
      }
    });
  });
});

// ✅ PRODUCTS Route
app.get('/products', (req, res) => {
  const query = 'SELECT * FROM men_products';
  db.query(query, (err, data) => {
    if (err) return res.json({ error: err.message });
    return res.json(data);
  });
});

// ✅ Cart Routes
app.use("/api/cart", cartRoutes);

// ✅ Start Server
app.listen(8081, () => {
  console.log("Server running on port 8081");
});
