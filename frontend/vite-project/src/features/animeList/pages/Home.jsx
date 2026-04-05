import React, { useState, useEffect } from "react";
import AnimeRow from "../components/AnimeRow";
import { fetchTrendingAnime, fetchAnimeByGenre } from "../services/animeList.api";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [actionAnime, setActionAnime] = useState([]);
  const [adventureAnime, setAdventureAnime] = useState([]);
  const [romanceAnime, setRomanceAnime] = useState([]);
  const [fantasyAnime, setFantasyAnime] = useState([]);
  const [comedyAnime, setComedyAnime] = useState([]);
  const [sciFiAnime, setSciFiAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Fire all requests in parallel
        const [
          trendingData, 
          actionData, 
          adventureData, 
          romanceData, 
          fantasyData, 
          comedyData, 
          sciFiData
        ] = await Promise.all([
          fetchTrendingAnime(),
          fetchAnimeByGenre("Action"),
          fetchAnimeByGenre("Adventure"),
          fetchAnimeByGenre("Romance"),
          fetchAnimeByGenre("Fantasy"),
          fetchAnimeByGenre("Comedy"),
          fetchAnimeByGenre("Sci-Fi")
        ]);

        setTrending(trendingData);
        setActionAnime(actionData);
        setAdventureAnime(adventureData);
        setRomanceAnime(romanceData);
        setFantasyAnime(fantasyData);
        setComedyAnime(comedyData);
        setSciFiAnime(sciFiData);
      } catch (err) {
        console.error("Error loading home data:", err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Early return for loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  // FIX: Select the first item from the array for the Hero section
  const [heroAnime] = trending;

  return (
    <div className="min-h-screen bg-gray-900 pb-12 text-white font-sans">
      {/* --- HERO SECTION --- */}
      {heroAnime && (
        <div className="relative h-[75vh] w-full overflow-hidden">
          <img
            src={heroAnime.posterImage}
            alt="Hero"
            className="h-full w-full object-cover opacity-20 blur-[2px]"
          />
          <div className="absolute inset-0 bg-linear-to-t from-gray-900 via-gray-900/20 to-transparent" />
          <div className="absolute bottom-12 left-6 max-w-3xl md:left-12">
            <span className="mb-3 inline-block rounded bg-blue-600 px-3 py-1 text-xs font-bold uppercase tracking-wider">
              Trending #1
            </span>
            <h1 className="mb-4 text-4xl font-black md:text-7xl leading-tight">
              {heroAnime?.title?.english || heroAnime?.title?.romaji}
            </h1>
            <p className="mb-8 line-clamp-3 text-lg text-gray-300 md:text-xl md:max-w-xl">
              {heroAnime?.synopsis}
            </p>
            <div className="flex gap-4">
              <button className="rounded bg-white px-10 py-3 font-bold text-black transition hover:bg-gray-200">
                Details
              </button>
              <button className="rounded bg-gray-500/30 px-10 py-3 font-bold text-white backdrop-blur-md transition hover:bg-gray-500/50">
                + Watchlist
              </button>
            </div>
          </div>
        </div>
      )}
      <div>

        <div className="flex justify-center mt-8">
        <button className="rounded bg-gray-500/30 px-10 py-3 font-bold text-white backdrop-blur-md transition hover:bg-gray-500/50" onClick={() => navigate("/about-us")}>
          About Us
        </button>
        </div>
      </div>

      {/* --- CONTENT SECTIONS --- */}
      <div className="mt-8 space-y-16 px-6 md:px-12">
        <AnimeRow title="Trending Now" items={trending} />
        <AnimeRow title="Action Hits" items={actionAnime} />
        <AnimeRow title="Epic Adventures" items={adventureAnime} />
        <AnimeRow title="Romance" items={romanceAnime} />
        <AnimeRow title="Fantasy Worlds" items={fantasyAnime} />
        <AnimeRow title="Comedy" items={comedyAnime} />
        <AnimeRow title="Sci-Fi" items={sciFiAnime} />
      </div>
    </div>
  );
};


export default Home;