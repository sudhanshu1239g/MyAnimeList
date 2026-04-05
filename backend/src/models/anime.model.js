const mongoose = require("mongoose");

const animeSchema = new mongoose.Schema({
    title: {
        english: { type: String, required: true, trim: true },
        japanese: { type: String, trim: true },
        romaji: { type: String, trim: true }
    },
    synopsis: { type: String, required: true },
    posterImage: { type: String, required: true }, // URL to the image
    bannerImage: { type: String }, // For the Detail Page header
    trailerUrl: { type: String }, 
    type: { 
        type: String, 
        // Added "TV Special" and "Music" to match Jikan's responses
        enum: ["TV", "Movie", "OVA", "ONA", "Special", "TV Special", "Music"], 
        default: "TV" 
    },
    status: { 
        type: String, 
        // Jikan sometimes returns these variations
        enum: ["Finished Airing", "Currently Airing", "Not yet aired", "Upcoming"], 
        default: "Finished Airing" 
    },
    episodes: { type: Number, default: 0 },
    duration: { type: String }, // e.g., "24 min per ep"
    aired: {
        from: { type: Date },
        to: { type: Date }
    },
    genres: [{ type: String }], // We'll use strings for simplicity, or refs for scaling
    averageScore: { type: Number, default: 0, min: 0, max: 10 },
    popularity: { type: Number, default: 0 }, // Based on list adds
    rank: { type: Number }
}, { timestamps: true });

// Adding a text index allows for the "Search" functionality in your UI
animeSchema.index({ "title.english": "text", "title.romaji": "text" });

module.exports = mongoose.model("Anime", animeSchema);