const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

/* ================= TEST ================= */
app.get("/", (req, res) => {
  res.send("Backend running successfully 🚀");
});

/* ================= REGISTER ================= */
app.post("/register", async (req, res) => {
  const { name, email, phone, address, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: "Required fields missing" });

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, result) => {
    if (result.length > 0)
      return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    db.query(
      "INSERT INTO users (name,email,phone,address,password) VALUES (?,?,?,?,?)",
      [name, email, phone, address, hashed],
      () => res.json({ success: true })
    );
  });
});

/* ================= LOGIN ================= */
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email=?", [email], async (err, results) => {
    if (!results.length) return res.status(401).json({ success: false });

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ success: false });

    delete user.password;
    res.json({ success: true, user });
  });
});

/* ================= PRODUCTS ================= */
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (_, results) => res.json(results));
});

/* ================= PLACE ORDER ================= */
app.post("/orders", (req, res) => {
  const { userId, items, pricing, paymentMethod } = req.body;

  if (!userId || !items?.length)
    return res.status(400).json({ success: false, message: "Invalid order data" });

  const total = pricing?.grandTotal || 0;

  db.query(
    "INSERT INTO orders (user_id,total,payment_method) VALUES (?,?,?)",
    [userId, total, paymentMethod],
    (err, result) => {
      const orderId = result.insertId;

      const sql =
        "INSERT INTO order_items (order_id,product_id,product_name,quantity,price) VALUES (?,?,?,?,?)";

      items.forEach((i) => {
        db.query(sql, [
          orderId,
          i.productId,
          i.productName,
          i.quantity,
          i.price,
        ]);
      });

      res.json({ success: true });
    }
  );
});

/* ================= GET USER ORDERS ================= */
app.get("/orders/:userId", (req, res) => {
  const sql = `
    SELECT o.id,o.total,o.payment_method,o.created_at,
           oi.product_name,oi.quantity,oi.price
    FROM orders o
    JOIN order_items oi ON o.id=oi.order_id
    WHERE o.user_id=?
    ORDER BY o.created_at DESC
  `;

  db.query(sql, [req.params.userId], (err, rows) => {
    const orders = {};

    rows.forEach((r) => {
      if (!orders[r.id]) {
        orders[r.id] = {
          id: r.id,
          total: r.total,
          payment_method: r.payment_method,
          created_at: r.created_at,
          items: [],
        };
      }

      orders[r.id].items.push({
        product_name: r.product_name,
        quantity: r.quantity,
        price: r.price,
      });
    });

    res.json(Object.values(orders));
  });
});

app.listen(5000, () =>
  console.log("🚀 Server running http://localhost:5000")
);