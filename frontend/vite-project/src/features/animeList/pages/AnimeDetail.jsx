import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AnimeDetail = () => {
  const { id } = useParams(); // Grabs the 'id' from the URL
  const [anime, setAnime] = useState(null);

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
      <h1 className="text-4xl font-bold">{anime.title.english}</h1>
      <img src={anime.bannerImage || anime.posterImage} className="w-full h-64 object-cover my-6 rounded-xl" />
      <p className="text-gray-300 text-lg">{anime.synopsis}</p>
      {/* Add more details like episodes, score, etc. here */}
    </div>
  );
};

export default AnimeDetail;