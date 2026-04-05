const express = require("express");
const router = express.Router();
const { getAllGenres, getGenreBySlug } = require("../controllers/genreController");

router.get("/", getAllGenres);
router.get("/:slug", getGenreBySlug);

module.exports = router;