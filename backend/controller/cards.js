exports.getCards = (req, res, next) => {
  res.status(200).json({
    succes: true,
    data: `${req.params.id} ID-тэй картыг үүсгэнэ`,
  });
};
exports.createCard = (req, res, next) => {
  res.status(200).json({
    succes: true,
    data: `${req.params.id} ID-тэй картыг үүсгэнэ`,
  });
};
exports.updateCard = (req, res, next) => {
  res.status(200).json({
    succes: true,
    data: `${req.params.id} ID-тэй картыг өөрчлөнө`,
  });
};
exports.deleteCard = (req, res, next) => {
  res.status(200).json({
    succes: true,
    data: `${req.params.id} ID-тэй картыг устгана`,
  });
};
// app.post("/api/v1/users", (req, res) => {
//   const userData = req.body;
//   console.log(userData);
//   // Validate the request body here if needed
//   // database ruu nemj bgaa
//   const sql =
//     "INSERT INTO userscard (Username, Address, Enjury) VALUES (?, ?, ?)";
//   const values = [userData.userName, userData.address, userData.enjury];
//   //database aas avch bgaa
//   db.query(sql, values, (err, result) => {
//     if (err) {
//       console.error("Error inserting user into database:", err);
//       res.status(500).json({ message: "Error savasyncing user." });
//     } else {
//       res.status(200).json({ message: "User saved successfully." });
//     }
//   });
// });
// app.post("/login-user", (req, res) => {
//   const { name, password } = req.body;
//   console.log(name);

//   // Use parameterized query to prevent SQL injection
//   db.query(
//     `SELECT * FROM users where name='${{ name }}'`,

//     (err, results) => {
//       console.log(results);
//       // if (error) {
//       //   console.error(error);dsffgdfg
//       //   return res.status(500).json("Internal Server Error");
//       // }
//       // if (results.length > 0) {
//       //   return res.status(200).json(results);
//       // } else {
//       //   return res.status(401).json("Email or password is incorrect");
//       // }
//     }
//   );
// });
