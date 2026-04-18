import React from 'react';

const SidebarSection = ({ title, items, accentColor = "border-violet-600", onNavigate }) => {
  return (
    <section className="mb-10">
      <h3 className={`text-xl font-bold mb-4 border-l-4 ${accentColor} pl-3`}>
        {title}
      </h3>
      <div className="space-y-4">
        {items?.map((item, index) => (
          <div 
            key={item._id} 
            className="flex items-center gap-4 bg-gray-800/20 p-2 rounded-lg hover:bg-gray-800/40 transition-all cursor-pointer group"
            onClick={() => onNavigate(item._id)}
          >
            {/* Thumbnail */}
            <div className="relative shrink-0">
              <img 
                src={item.posterImage} 
                className="w-12 h-16 object-cover rounded shadow-lg border border-white/5" 
                alt={item.title.english} 
              />
            </div>

            {/* Title & Info */}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-sm truncate group-hover:text-violet-400 transition-colors">
                {item.title.english || item.title.romaji}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-medium">
                <span>{item.type}</span>
                <span>•</span>
                <span>{item.episodes} Eps</span>
              </div>
            </div>

            {/* Rank Number */}
            <div className="text-gray-700 font-black text-xl italic group-hover:text-gray-600">
              #{index + 1}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SidebarSection;