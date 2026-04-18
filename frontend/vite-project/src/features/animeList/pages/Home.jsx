import React, { useState, useEffect } from "react";
import AnimeRow from "../components/AnimeRow";
import { fetchTrendingAnime, fetchAnimeByGenre,searchAnime } from "../services/animeList.api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SidebarSection from "../components/SidebarSection";
import HeroCarousel from "../components/HeroCarousel";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [actionAnime, setActionAnime] = useState([]);
  const [adventureAnime, setAdventureAnime] = useState([]);
  const [romanceAnime, setRomanceAnime] = useState([]);
  const [fantasyAnime, setFantasyAnime] = useState([]);
  const [comedyAnime, setComedyAnime] = useState([]);
  const [sciFiAnime, setSciFiAnime] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
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
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    const results = await searchAnime(searchQuery);
    setSearchResults(results);
    setIsSearching(false);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  // FIX: Select the first item from the array for the Hero section
  const [heroAnime] = trending;

  return (
    <div className="min-h-screen bg-gray-900 pb-12 text-white font-sans">
  
  {/* --- HERO SECTION (Full Width) --- */}
  <HeroCarousel items={trending} />
  <div className="mt-10 px-6 md:px-12">
        <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto group">
          <input
            type="text"
            placeholder="Search for your favorite anime..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-800/50 border border-white/10 px-6 py-4 rounded-full text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-gray-800 transition-all placeholder:text-gray-500"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-violet-600 hover:bg-violet-500 text-white px-6 py-2.5 rounded-full font-bold transition-all active:scale-95"
          >
            {isSearching ? "..." : "Search"}
          </button>
        </form>

        {/* --- DYNAMIC SEARCH RESULTS --- */}
        {searchResults.length > 0 && (
          <div className="mt-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-black text-white">Search Results</h2>
              <button onClick={clearSearch} className="text-gray-400 hover:text-violet-400 text-sm font-bold uppercase tracking-widest">
                Clear Results ×
              </button>
            </div>
            <AnimeRow title="" items={searchResults} />
            <hr className="mt-12 border-white/5" />
          </div>
        )}
      </div>

  {/* --- MAIN CONTENT GRID (75/25 Split) --- */}
  <div className="mt-8 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
    
    {/* LEFT PART: AnimeRows (75%) */}
    <div className="lg:col-span-3 space-y-16">
      <AnimeRow title="Trending Now" items={trending} />
      <AnimeRow title="Action Hits" items={actionAnime} />
      <AnimeRow title="Epic Adventures" items={adventureAnime} />
      <AnimeRow title="Romance" items={romanceAnime} />
      <AnimeRow title="Fantasy Worlds" items={fantasyAnime} />
    </div>

    {/* RIGHT PART: Sidebar Tables (25%) */}
    {/* RIGHT PART: Sidebar Tables (25%) */}
<div className="lg:col-span-1">
  <div className="sticky top-24 h-[calc(100vh-120px)] overflow-y-auto pr-2 custom-scrollbar">
    
    {/* Use the component for "Top Rated" */}
    <SidebarSection 
      title="Top Rated" 
      items={trending?.slice(0, 5)} 
      accentColor="border-blue-600" 
      onNavigate={(id) => navigate(`/anime/${id}`)}
    />

    {/* Use it again for "Most Popular" */}
    <SidebarSection 
      title="Most Popular" 
      items={trending?.slice(5, 10)} 
      accentColor="border-purple-600" 
      onNavigate={(id) => navigate(`/anime/${id}`)}
    />

    {/* You can even add a third one easily! */}
    <SidebarSection 
      title="Action Gems" 
      items={actionAnime?.slice(0, 5)} 
      accentColor="border-orange-500" 
      onNavigate={(id) => navigate(`/anime/${id}`)}
    />
    <SidebarSection 
      title="Adventures Gems" 
      items={adventureAnime?.slice(0, 5)} 
      accentColor="border-green-500" 
      onNavigate={(id) => navigate(`/anime/${id}`)}
    />
    <SidebarSection 
      title="Romance Gems" 
      items={romanceAnime?.slice(0, 5)} 
      accentColor="border-pink-500" 
      onNavigate={(id) => navigate(`/anime/${id}`)}
    />

  </div>
</div>
  </div>

  <footer className="mt-28 border-t border-white/5 py-10 text-gray-400 text-sm text-center">
    &copy; {new Date().getFullYear()} MyAnimeList Clone Project
  </footer>
</div>
  );
};


export default Home;