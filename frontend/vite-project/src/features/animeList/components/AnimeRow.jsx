/* --- REUSABLE ROW COMPONENT --- */
import AnimeCard from "./AnimeCard";
const AnimeRow = ({ title, items }) => {
  if (items.length === 0) return null; // Don't show empty rows
  
  return (
    <section>
      <h2 className="mb-6 text-2xl font-bold tracking-tight border-l-4 border-blue-600 pl-4">
        {title}
      </h2>
      <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {items.map((anime) => (
          <AnimeCard key={anime._id} anime={anime} />
        ))}
      </div>
    </section>
  );
};
export default AnimeRow