const express = require("express");
const { register, login } = require("../controller/users");
const router = express.Router();

// router.route("/").post(register);
// router.post("/create", register);
router.get("/", (req, res) => {
  res.send("hello world");
});
// router.route("/").post(login);

module.exports = router;
