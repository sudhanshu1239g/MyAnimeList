import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AnimeDetail = () => {
  const { id } = useParams(); // Grabs the 'id' from the URL
  const [anime, setAnime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/animeList/${id}`);
        setAnime(response.data);
      } catch (err) {
        console.error("Error fetching anime details:", err);
      }
    };
    fetchDetails();
  }, [id]);

  if (!anime) return <div className="bg-gray-900 h-screen text-white p-10">Loading details...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-10">
      <button 
        className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
        onClick={() => navigate("/")}
      >
        Back to List
      </button>
      <div className="flex flex-col items-center mb-10">
        <h1 className="text-4xl font-bold">{anime.title.english}</h1>
        <img src={anime.bannerImage || anime.posterImage} className="w-64 h-64 object-cover my-6 rounded-xl" />

      </div>
      <div className="max-w-3xl mx-auto space-y-6">

        <h1 className="text-2xl font-bold text-violet-500">Synopsis</h1>
        <p className="text-gray-300 text-lg ">{anime.synopsis}</p>

        <p className="text-2xl font-bold text-violet-500">Episodes: {anime.episodes} </p>
        <p className="text-2xl font-bold text-violet-500">Score: {anime.averageScore} ⭐️</p>
        <p className="text-2xl font-bold text-violet-500">Status: {anime.status}</p>


      </div>
      <footer className="mt-28 text-gray-400 text-sm text-center  ">
        &copy; {new Date().getFullYear()} MyAnimeList Project
      </footer>
      
      
      

    </div>
  );
};

export default AnimeDetail;