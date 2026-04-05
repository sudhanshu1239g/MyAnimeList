const express = require("express")
const cors = require("cors")

const animeRoutes = require("./routes/animeRoutes");

const app=express();

app.use(cors({
    origin: "http://localhost:5173", // Your Vite frontend URL
    credentials: true                // Allow cookies/headers
}));
app.use(express.json());
app.use("/api/animeList", animeRoutes);


app.get('/',(req,res)=>{
    res.send('Hello World');
});

module.exports = app;