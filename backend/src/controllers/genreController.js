const Genre = require("../models/genre.model");

// Get all genres for the sidebar/navbar
exports.getAllGenres = async (req, res) => {
    try {
        const genres = await Genre.find().sort({ name: 1 }); // Sort alphabetically
        res.status(200).json(genres);
    } catch (error) {
        res.status(500).json({ message: "Error fetching genres", error: error.message });
    }
};

// Get specific genre details by slug (e.g., /api/genres/action)
exports.getGenreBySlug = async (req, res) => {
    try {
        const genre = await Genre.findOne({ slug: req.params.slug });
        if (!genre) return res.status(404).json({ message: "Genre not found" });
        res.status(200).json(genre);
    } catch (error) {
        res.status(500).json({ message: "Error fetching genre", error: error.message });
    }
};