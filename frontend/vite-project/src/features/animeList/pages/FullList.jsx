import { useEffect, useState } from 'react';
import { fetchAnimeList } from '../services/animeList.api';
import { useNavigate } from "react-router-dom";

const FullList = () => {
    const [animeData, setAnimeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const getAnime = async () => {
            try {
                const data = await fetchAnimeList();
                setAnimeData(data);
            } catch (err) {
                setError("Failed to load anime. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
        getAnime();
    }, []);

    if (loading) return <div className="text-white text-center mt-40">Loading awesome anime...</div>;
    if (error) return <div className="text-red-500 text-center mt-40">{error}</div>;

    return (
        <main className="min-h-screen bg-gray-950 pt-10 pb-10 px-6">
            {/* Added max-w-4xl to prevent the rows from being too wide on large monitors */}
            <div className='ml-auto'>
                    <button
                        className="bg-violet-500 hover:bg-violet-600 text-white font-bold py-2 px-4 rounded"
                        onClick={() => navigate("/")}
                    >
                        Back to List
                    </button>

                </div>

            <div className="container mx-auto max-w-5xl">
                <h1 className="text-3xl font-bold text-white mb-8 border-l-4 border-violet-500 pl-4">
                    Top Anime Series
                </h1>
                

                {/* Changed to grid-cols-1 for 1 anime per row */}
                <div className="grid grid-cols-1 gap-4">
                    {animeData.map((anime, index) => (
                        <div
                            key={anime.id || index}
                            onClick={() => navigate(`/anime/${anime._id || anime.id}`)}
                            className="group flex flex-row items-center bg-gray-900 rounded-xl overflow-hidden cursor-pointer border border-gray-800 transition-all duration-300 hover:bg-gray-800/50 hover:border-violet-500/30 shadow-lg"
                        >
                            {/* 1. Left: Image (Fixed size for consistency) */}
                            <div className="relative h-32 w-24 sm:h-44 sm:w-32 shrink-0 overflow-hidden">
                                <img
                                    src={anime.image || anime.posterImage}
                                    alt={anime.title?.english}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            </div>

                            {/* 2. Right: Info Area */}
                            <div className="flex flex-1 flex-col justify-between p-4 sm:p-6">
                                <div>
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-lg font-bold text-gray-100 group-hover:text-violet-400 transition-colors line-clamp-1">
                                            {anime.title?.english || anime.title?.romaji || "Unknown Title"}
                                        </h3>
                                        <span className="text-sm font-bold text-yellow-400 flex items-center gap-1">
                                            ⭐ {anime.rating || anime.averageScore || 'N/A'}
                                        </span>
                                    </div>

                                    {/* Small metadata row */}
                                    <div className="flex gap-3 mt-1 text-xs text-gray-500 uppercase font-semibold tracking-wider">
                                        <span>{anime.type || 'TV'}</span>
                                        <span>•</span>
                                        <span>{anime.episodes || '??'} Episodes</span>
                                        <span>•</span>
                                        <span className="text-violet-400">{anime.year || '2024'}</span>
                                    </div>

                                    {/* Description - only shows on larger screens */}
                                    <p className="mt-3 text-sm text-gray-400 line-clamp-2 hidden sm:block">
                                        {anime.description?.replace(/<[^>]*>?/gm, '') || "Experience this incredible journey..."}
                                    </p>
                                </div>

                                {/* Status Tag */}
                                <div className="mt-4 flex items-center">
                                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-800 text-gray-400 border border-gray-700 uppercase">
                                        {anime.status || 'Finished'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default FullList;