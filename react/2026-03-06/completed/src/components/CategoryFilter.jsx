export default function CategoryFilter({
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
            selectedCategory === category
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white text-gray-600 border border-gray-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
