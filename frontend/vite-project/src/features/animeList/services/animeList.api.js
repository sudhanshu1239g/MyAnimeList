
import axios from "axios";

const api=axios.create({
    baseURL:"http://localhost:8000/api",
    withCredentials:true
});

export const fetchAnimeList=async()=>{
    try {
        const response=await api.get("/animeList");
        return response.data;
    } catch (error) {
        console.error("Error fetching anime list:", error);
        throw error;
    }
};

export const fetchTrendingAnime=async()=>{
    try {
        const response=await api.get("/animeList/trending");
        return response.data;
    } catch (error) {
        console.error("Error fetching trending anime:", error);
        throw error;
    }
};

export const fetchAnimeByGenre=async(genreSlug)=>{
    try {
        const response=await api.get(`/animeList/genre/${genreSlug}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching anime by genre (${genreSlug}):`, error);
        throw error;
    }
};

export const fetchAnimeDetails=async(animeId)=>{
    try {
        const response=await api.get(`/animeList/${animeId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching anime details for ID (${animeId}):`, error);
        throw error;
    }
};
