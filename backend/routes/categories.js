const express = require("express");
const {
  getCards,
  getCard,
  createCard,
  updateCard,
  deleteCard,
} = require("../controller/users");
const router = express.Router();
router.route("/").get(getCards).post(createCard);

router.route("/:id").get(getCard).delete(deleteCard).put(updateCard);

module.exports = router;
