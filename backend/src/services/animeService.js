const mongoose = require("mongoose");
const axios = require("axios");
const Anime = require("../models/anime.model");
require("dotenv").config();

const seedDatabase = async () => {
    try {
        // 1. Connect to your DB
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB. Starting the seed process...");

        // 2. Clear existing data so you don't get duplicates
        await Anime.deleteMany({});
        console.log("Old data cleared.");

        // 3. Fetch Top Anime from Jikan API (Page 1 gives top 25)
        const response = await axios.get("https://api.jikan.moe/v4/top/anime");
        const jikanData = response.data.data;

        // 4. Map the API data to match YOUR specific Mongoose Schema
        const animeToSave = jikanData.map(item => ({
            title: {
                english: item.title_english || item.title,
                japanese: item.title_japanese,
                romaji: item.title
            },
            synopsis: item.synopsis,
            posterImage: item.images.jpg.large_image_url,
            type: item.type,
            status: item.status,
            episodes: item.episodes,
            genres: item.genres.map(g => g.name),
            averageScore: item.score,
            popularity: item.popularity,
            rank: item.rank
        }));

        // 5. Insert the list into your backend
        await Anime.insertMany(animeToSave);
        console.log(`Success! Inserted ${animeToSave.length} anime into the database.`);

        // 6. Close connection
        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exit(1);
    }
};

seedDatabase();