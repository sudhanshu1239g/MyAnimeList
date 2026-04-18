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
    <div className="min-h-screen bg-[#0b0f19] text-slate-200 font-sans selection:bg-violet-500/30">
      {/* 1. Navigation Header */}
      <nav className="p-6 max-w-7xl mx-auto">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 group text-gray-400 hover:text-violet-400 transition-colors"
        >
          <span className="text-xl group-hover:-translate-x-1 transition-transform">←</span>
          <span className="font-medium">Back to Discovery</span>
        </button>
      </nav>

      {/* 2. Main Content Grid */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

          {/* LEFT COLUMN: Poster (Sticky) */}
          <div className="lg:col-span-4">
            <div className="sticky top-10">
              <div className="relative group">
                <img
                  src={anime.posterImage}
                  alt={anime.title.english}
                  className="w-full rounded-2xl shadow-2xl shadow-violet-900/20 border border-white/5 object-cover"
                />
                {/* Score Badge Overlay */}
                <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5">
                  <span className="text-yellow-400 text-lg">★</span>
                  <span className="font-bold text-white">{anime.averageScore}</span>
                </div>
              </div>

              {/* Quick Action (Optional) */}
              <button className="w-full mt-6 bg-violet-600 hover:bg-violet-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-violet-600/20">
                Add to Watchlist+
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Information */}
          <div className="lg:col-span-8 space-y-8">
            {/* Title Section */}
            <section className="space-y-2">
              <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight">
                {anime.title.english}
              </h1>
              <h2 className="text-xl text-gray-500 font-medium italic">
                {anime.title.japanese}
              </h2>
            </section>
            {/* Trailer Section */}
            {anime.trailerUrl && (
              <section className="mt-12 space-y-4">
                <h3 className="text-2xl font-bold text-white">Official Trailer</h3>
                <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5">
                  <iframe
                    src={anime.trailerUrl}
                    title="YouTube trailer"
                    className="absolute inset-0 w-full h-full"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              </section>
            )}

            {/* Meta Tags / Stats Row */}
            <div className="flex flex-wrap gap-4 items-center py-2">
              <span className="px-3 py-1 rounded-md bg-violet-500/10 text-violet-400 border border-violet-500/20 font-semibold uppercase text-xs tracking-wider">
                {anime.type}
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-gray-700" />
              <span className="text-gray-300 font-medium">{anime.episodes} Episodes</span>
              <div className="h-1.5 w-1.5 rounded-full bg-gray-700" />
              <span className={`font-semibold ${anime.status === 'Finished Airing' ? 'text-green-400' : 'text-blue-400'}`}>
                {anime.status}
              </span>
            </div>

            {/* Genre Pills */}
            <div className="flex flex-wrap gap-2">
              {anime.genres?.map((genre) => (
                <span key={genre} className="px-4 py-1.5 rounded-full bg-gray-800/50 border border-white/5 text-sm font-medium hover:bg-gray-700 transition-colors">
                  {genre}
                </span>
              ))}
            </div>

            <hr className="border-white/5" />

            {/* Synopsis */}
            <section className="space-y-4">
              <h3 className="text-2xl font-bold text-white">Synopsis</h3>
              <p className="text-gray-400 text-lg leading-relaxed max-w-3xl">
                {anime.synopsis}
              </p>
            </section>

            {/* Secondary Stats Grid */}
            <section className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6">
              <div className="p-4 rounded-xl bg-gray-800/30 border border-white/5">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Rank</p>
                <p className="text-xl font-semibold">#{anime.rank}</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-800/30 border border-white/5">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-widest mb-1">Popularity</p>
                <p className="text-xl font-semibold">#{anime.popularity}</p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 py-10 text-gray-600 text-center">
        &copy; {new Date().getFullYear()} MyAnimeList Project • Built with ✨
      </footer>
    </div>
  );
};

export default AnimeDetail;