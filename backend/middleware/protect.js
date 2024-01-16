const jwt = require("jwt");
const asyncHandler = require("./asyncHandler");
const MyError = require("./error");
const User = require("../models/users");

exports.protect = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    throw new MyError("Та эхлээд логин хийнэ үү!!!", 401);
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    throw new MyError("Токен байхгүй байна!!!", 401);
  }
  //   const user = await UserActivation.create(req.body);
  //   const token = user.getJsonWebToken();
  //   res.status(200).json({
  //     success: true,
  //     token,
  //     user: user,
  //     // jwt: jwt,
  //   });
});
