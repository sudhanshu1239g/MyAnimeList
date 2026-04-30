const express = require("express")
const cors = require("cors")
const app=express();

app.use(cors({
    origin: ["https://my-anime-list-seven.vercel.app",
        "http://localhost:5173"
    ], // Your Vite frontend URL
    credentials: true                // Allow cookies/headers
}));

const animeRoutes = require("./routes/animeRoutes");
const authRoutes=require("./routes/authRoutes");




app.use(express.json());
app.use("/api/animeList", animeRoutes);
app.use("/api/auth", authRoutes);


app.get('/',(req,res)=>{
    res.send('Hello World');
});

module.exports = app;