const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const usersRoutes = require("./routes/users");
const app = express();
const path = require("path");
const db = require("./controller/dbconnect");
const PORT = process.env.PORT || 4000;
const http = require("http");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config({ path: "../config.env" });

// const corsOptions = {
//   origin: "http://localhost:4000", // Replace with your React app's URL
//   optionsSuccessStatus: 200,
// };

app.use(cors());
app.use(express.json());
app.post("/register", async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    // Нууц үгсийг харьцуулах
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Нууц үг таарахгүй байна",
      });
    }

    // Нууц үгийг хашлах
    const hashedPassword = await bcrypt.hash(password, 10);

    // Хашлагдсан нууц үгтэй хамт бүртгэх
    await db.query(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );

    return res.status(201).json({
      success: true,
      message: "Хэрэглэгч амжилттай бүртгэгдлээ",
    });
  } catch (error) {
    console.error("Бүртгэл хийхэд алдаа гарлаа:", error);
    return res.status(500).json({
      success: false,
      message: "Дотоод серверийн алдаа",
    });
  }
});

// Нэвтрэх
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Имэйлээр хэрэглэгчийн мэдээллийг авах
    const userData = await db.query("SELECT * FROM users WHERE `email` = ?", [
      email,
    ]);
    if (!userData || userData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Хэрэглэгч олдсонгүй",
      });
    }
    //системд байгаа тухайн хэрэглэгчийн нууц үгийг агуулсан . үндсэн логикд нууц үгийг шалгах зорилготой байдаг.
    const storedHashedPassword = userData[0].password;

    // Таны оруулсан нууц үгийг хадгалсан хашлагтай харьцуулах
    const passwordMatch = await bcrypt.compare(password, storedHashedPassword);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Буруу нууц үг",
      });
    }

    // Нууц үг зөв байна, хэрэглэгчийн мэдээллийг нууц үггүй бүртгэлээр буцаана
    const userWithoutPassword = { ...userData[0] };
    delete userWithoutPassword.password;

    return res.status(200).json({
      success: true,
      data: userWithoutPassword,
    });
  } catch (error) {
    console.error("Нэвтрэх үйлчилгээнд алдаа гарлаа:", error);
    return res.status(500).json({
      success: false,
      message: "Дотоод серверийн алдаа",
    });
  }
});
// POST хүсэлтийг хүлээн авах
app.post("/users/create", (req, res) => {
  const { number, name, address, enjury, date } = req.body;
  try {
    db.query(
      "INSERT INTO userscard (number, username, address, enjury) VALUES (?,?,?, ?)",
      [number, name, address, enjury]
    );
    return res.status(200).json({
      success: true,
      message: "Амжилттай хадгаллаа",
      send: req.body,
    });
  } catch (error) {
    console.error("aldaa garlaa:", error);
    return res.status(500).json({
      success: false,
      message: "Дотоод серверийн алдаа",
    });
  }
});
app.get("/", async (req, res) => {
  try {
    // Дотоод сервер дээр байгаа мэдээллийг авах
    const userData = await db.query("SELECT * FROM userscard");
    return res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      succes: false,
    });
  }
});
app.get("/update", async (req, res) => {
  try {
    const { id } = req.query;
    // const id = req.params.id;
    const userData = await db.query(
      `SELECT * FROM userscard WHERE ID = '${id}'`
    );
    return res.status(200).json({
      success: true,
      data: userData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      succes: false,
    });
  }
});
app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const { number, name, address, enjury, date } = req.body;
  try {
    db.query(
      "UPDATE userscard SET number=?, username=?, address=?, enjury=?, date=NOW() WHERE ID = ?",
      [number, name, address, enjury, id]
    );

    return res
      .status(200)
      .json({ updated: true, message: "Амжилттай шинэчиллээ" });
  } catch (error) {
    console.error("aldaa garlaa:", error);
    return res.status(500).json({
      success: false,
      message: "Дотоод серверийн алдаа",
    });
  }
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;

  try {
    db.query("DELETE FROM userscard WHERE ID = ?", [id], (error, results) => {
      if (error) {
        console.log("Aldaa garlaa", error);
        return res.status(500).json({
          success: false,
          message: "Устгаж чадсангүй",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Амжилттай устгалаа",
      });
    });
  } catch (error) {
    console.log("Aldaa garlaa", error);
    return res.status(500).json({
      success: false,
      message: "Устгаж чадсангүй",
    });
  }
});

// Бүртгэл

app.get("/userInfo", async (req, res) => {
  try {
    const userData = await db.query(
      "SELECT * FROM users WHERE name = ? AND email = ?",
      [req.query.name, req.query.email]
    );
    return res.status(200).json({
      succes: true,
      data: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      succes: false,
    });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
