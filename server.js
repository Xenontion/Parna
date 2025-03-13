const express = require("express");
const { Pool } = require("pg");
const path = require("path");
const bodyParser = require("body-parser");
const session = require("express-session");

const app = express();

// Налаштування підключення до PostgreSQL
const pool = new Pool({
  user: "postgres", // заміни на свого користувача
  host: "localhost",
  database: "National cashback", // ім'я БД
  password: "20062005O", // заміни на свій пароль
  port: 5432
});

app.set("views", path.join(__dirname, "/public/html"));
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "ssshhhhh",
    resave: false,
    saveUninitialized: true
  })
);

// Головна сторінка, отримання списку товарів
app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.render("index", { products: result.rows });
  } catch (err) {
    res.status(500).send("Помилка отримання товарів");
  }
});

// Сторінка для відображення конкретного продукту
app.get("/show/:id", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).send("Продукт не знайдено");
    }
    res.render("show", { product: result.rows[0] });
  } catch (err) {
    res.status(500).send("Помилка при отриманні продукту");
  }
});

// API для отримання всіх продуктів у форматі JSON
app.get("/api/products", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Помилка отримання товарів" });
  }
});

app.listen(3000, () => {
  console.log("Сервер працює на порту 3000");
});
