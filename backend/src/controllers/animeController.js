const Anime = require("../models/anime.model");

// 1. Get all anime with basic pagination
exports.getAllAnime = async (req, res) => {
    try {
        const anime = await Anime.find().limit(20); 
        res.status(200).json(anime);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 2. Get Trending (sorted by score and popularity)
exports.getTrendingAnime = async (req, res) => {
    try {
        const trending = await Anime.find()
            .sort({ averageScore: -1, popularity: -1 })
            .limit(10);
        res.status(200).json(trending);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Filter by Genre
exports.getAnimeByGenre = async (req, res) => {
    try {
        const { slug } = req.params;
        // Search for the slug inside the genres array
        const anime = await Anime.find({ genres: { $regex: slug, $options: "i" } });
        res.status(200).json(anime);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 4. Get Details by ID
exports.getAnimeById = async (req, res) => {
    try {
        const anime = await Anime.findById(req.params.id);
        if (!anime) return res.status(404).json({ message: "Anime not found" });
        res.status(200).json(anime);
    } catch (error) {
        res.status(500).json({ message: "Invalid ID format" });
    }
};