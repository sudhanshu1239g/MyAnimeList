
import { useNavigate } from "react-router-dom";


const AnimeCard = ({ anime }) => {

  const navigate = useNavigate();

  return (

    <div
    onClick={() => navigate(`/anime/${anime._id}`)}

     className="group relative cursor-pointer overflow-hidden rounded-xl bg-gray-800 transition-all duration-500 hover:scale-105 hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
    <div className="relative aspect-3/3 overflow-hidden">
      <img 
        src={anime.posterImage}
        alt={anime.title.english}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
      {/* Overlay on Hover */}
      <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-black via-black/40 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="flex items-center justify-between text-sm font-bold text-yellow-400 mb-1">
          <span>⭐ {anime.averageScore}</span>
          <span className="rounded bg-blue-600 px-0.5 py-0.5 text-[9px] text-white uppercase">
            {anime.type}
          </span>
        </div>
      </div>
    </div>
    <div className="p-4">
      <h3 className="truncate text-sm font-bold text-gray-100 mb-1 group-hover:text-blue-400 transition-colors">
        {anime.title.english || anime.title.romaji}
      </h3>
      <div className="flex items-center justify-between">
        <span className="text-[9px] text-gray-500">{anime.episodes} eps</span>
        <span className="text-[9px] font-medium text-gray-400 uppercase tracking-tighter">
          {anime.status}
        </span>
      </div>
    </div>
  </div>
  )
};
export default AnimeCard