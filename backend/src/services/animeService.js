const mongoose = require("mongoose");
const axios = require("axios");
const Anime = require("../models/anime.model");
require("dotenv").config();

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const seedDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("🚀 Connected to DB.");

        await Anime.deleteMany({});
        console.log("🧹 Database cleared.");

        let allAnimeToSave = [];
        
        // We want 100 anime, Jikan gives 25 per page, so we need 4 pages
        for (let page = 1; page <= 4; page++) {
            console.log(`📡 Requesting Page ${page} from Jikan...`);
            
            const response = await axios.get(`https://api.jikan.moe/v4/top/anime?page=${page}`);
            const jikanData = response.data.data;

            console.log(`✅ Received ${jikanData.length} items from Page ${page}`);

            const mappedData = jikanData.map(item => ({
                title: {
                    english: item.title_english || item.title,
                    japanese: item.title_japanese,
                    romaji: item.title
                },
                synopsis: item.synopsis,
                posterImage: item.images?.jpg?.large_image_url,
                type: item.type,
                status: item.status,
                episodes: item.episodes,
                genres: item.genres.map(g => g.name),
                averageScore: item.score,
                popularity: item.popularity,
                rank: item.rank
            }));

            allAnimeToSave.push(...mappedData);
            console.log(`📦 Total collected so far: ${allAnimeToSave.length}`);

            // Crucial: Wait 1.5 seconds so Jikan doesn't block you
            if (page < 4) {
                console.log("⏳ Waiting for rate limit...");
                await sleep(1500); 
            }
        }

        console.log(`💾 Attempting to insert ${allAnimeToSave.length} items into MongoDB...`);
        await Anime.insertMany(allAnimeToSave);
        
        // Final verification
        const count = await Anime.countDocuments();
        console.log(`🎉 Success! Total documents now in DB: ${count}`);

        process.exit();
    } catch (error) {
        if (error.response && error.response.status === 429) {
            console.error("❌ Rate Limited! Jikan told us to slow down. Try increasing the sleep timer.");
        } else {
            console.error("❌ Seeding failed:", error.message);
        }
        process.exit(1);
    }
};

seedDatabase();