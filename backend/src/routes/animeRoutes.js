const express = require("express");
const router = express.Router();
const { 
    getAllAnime, 
    getTrendingAnime, 
    getAnimeByGenre, 
    getAnimeById 
} = require("../controllers/animeController");

// Get all anime (useful for the Home/Browse page)
router.get("/", getAllAnime);

// Get top-rated anime for the "Trending" section
router.get("/trending", getTrendingAnime);

// Get anime filtered by genre slug
router.get("/genre/:slug", getAnimeByGenre);

// Get a single anime's details by its ID
router.get("/:id", getAnimeById);

module.exports = router;