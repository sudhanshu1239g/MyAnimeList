const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const {protect} = require("../middlewares/watchAuth")

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/watchlist", protect, authController.getWatchlist);
router.delete("/watchlist/:animeId", protect, authController.removeFromWatchlist);

module.exports = router;