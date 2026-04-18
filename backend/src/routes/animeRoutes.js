const express = require("express");
const router = express.Router();
const {protect} = require("../middlewares/watchAuth")
const User = require("../models/user.model");
const { 
    getAllAnime, 
    getTrendingAnime, 
    getAnimeByGenre, 
    getAnimeById,
    searchAnime
} = require("../controllers/animeController");

// Get all anime (useful for the Home/Browse page)
router.get("/", getAllAnime);

// Get top-rated anime for the "Trending" section
router.get("/trending", getTrendingAnime);

// Get anime filtered by genre slug
router.get("/genre/:slug", getAnimeByGenre);
router.get("/search", searchAnime);

router.post("/watchlist/add", protect, async (req, res) => {
    const { animeId } = req.body;
    const user = await User.findById(req.user.id);
    
    if (!user.watchlist.includes(animeId)) {
        user.watchlist.push(animeId);
        await user.save();
    }
    res.status(200).json(user.watchlist);
});



// Get a single anime's details by its ID
router.get("/:id", getAnimeById);




module.exports = router;