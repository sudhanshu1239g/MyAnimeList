const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
    // This is the magic link to your Anime collection
    watchlist: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Anime"
    }]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);