const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    slug: { type: String, required: true, lowercase: true }, // e.g., "sci-fi"
    description: { type: String },
    count: { type: Number, default: 0 } // Useful for showing "Action (1,200)"
});

module.exports = mongoose.model("Genre", genreSchema);