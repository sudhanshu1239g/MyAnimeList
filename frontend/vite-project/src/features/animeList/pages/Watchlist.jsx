import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../AuthContext';
import { useNavigate } from 'react-router-dom';
import imgWatch from '../../../assets/imgWatch.jpg'
import girlie from '../../../assets/girlie.png'
import kumi from '../../../assets/kumi.png'

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: true
})

const Watchlist = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { token } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const res = await api.get('/api/auth/watchlist', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setList(res.data);
            } catch (err) {
                console.error("Error fetching watchlist", err);
            } finally {
                setLoading(false);
            }
        };
        fetchWatchlist();
    }, [token]);

    const handleRemove = async (e, animeId) => {
        e.stopPropagation(); // Prevent navigating to detail page
        try {
            await api.delete(`/api/auth/watchlist/${animeId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setList(list.filter(item => item._id !== animeId));
        } catch (err) {
            alert("Failed to remove item");
        }
    };

    if (loading) return <div className="h-screen flex items-center justify-center text-violet-500 font-bold">Loading your list...</div>;

    return (
        <div className="min-h-screen bg-gray-950 px-6 py-12 md:px-12">

            <div className="flex items-center justify-between mb-12">
                
                <div>
                    <h1 className="text-4xl font-black text-white mb-2">My Watchlist</h1>

                    <p className="text-gray-400 font-medium">{list.length} Anime Saved</p>
                </div>
                <button
                    onClick={() => navigate('/')}
                    className="text-sm font-bold text-violet-400 hover:text-white transition-colors"
                >
                    + Add More
                </button>
            </div>

            {list.length === 0 ? (
                <div className="text-center py-20 bg-gray-900/30 rounded-3xl border border-dashed border-white/10">
                    <div className="relative mt-16 h-80 w-full overflow-hidden">
                        <img
                            src={kumi}
                            alt="kumi"
                            className="h-full w-full object-contain"
                        />
                    </div>
                    <p className="text-gray-400 mb-6">Your watchlist is empty.... 💤</p>
                    

                    <button
                        onClick={() => navigate('/')}
                        className="bg-violet-600 px-8 py-3 rounded-full font-bold text-white hover:bg-violet-500 transition-all"
                    >
                        Explore Trending Anime
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {list.map((anime) => (
                        <div
                            key={anime._id}
                            onClick={() => navigate(`/anime/${anime._id}`)}
                            className="group relative cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-2/3 overflow-hidden rounded-2xl border border-white/5 shadow-xl transition-transform duration-300 group-hover:-translate-y-2">
                                <img
                                    src={anime.posterImage}
                                    alt={anime.title.english}
                                    className="h-full w-full object-cover"
                                />

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        onClick={(e) => handleRemove(e, anime._id)}
                                        className="bg-red-500/80 hover:bg-red-500 p-3 rounded-full text-white backdrop-blur-md transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="mt-3 text-sm font-bold text-gray-200 line-clamp-1 group-hover:text-violet-400 transition-colors">
                                {anime.title.english || anime.title.romaji}
                            </h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;