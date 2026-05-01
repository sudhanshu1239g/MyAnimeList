
import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
})


export const fetchAnimeList=async()=>{
    try {
        const response=await api.get("/api/animeList");
        return response.data;
    } catch (error) {
        console.error("Error fetching anime list:", error);
        throw error;
    }
};

export const fetchTrendingAnime=async()=>{
    try {
        const response=await api.get("/api/animeList/trending");
        return response.data;
    } catch (error) {
        console.error("Error fetching trending anime:", error);
        throw error;
    }
};

export const fetchAnimeByGenre=async(genreSlug)=>{
    try {
        const response=await api.get(`/api/animeList/genre/${genreSlug}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching anime by genre (${genreSlug}):`, error);
        throw error;
    }
};

export const fetchAnimeDetails=async(animeId)=>{
    try {
        const response=await api.get(`/api/animeList/${animeId}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching anime details for ID (${animeId}):`, error);
        throw error;
    }
};
// src/services/animeList.api.js
export const searchAnime = async (query) => {
    try {
        const response = await api.get(`/api/animeList/search?q=${query}`);
        return response.data;
    } catch (error) {
        console.error("Search API error:", error);
        return [];
    }
};