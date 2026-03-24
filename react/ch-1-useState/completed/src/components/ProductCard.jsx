export default function ProductCard({ product }) {
  const { name, category, price, rating, image, description, inStock } =
    product;

  const handleAddToCart = () => {
    alert(`"${name}" 상품이 장바구니에 추가되었습니다!`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden flex flex-col">
      <div className="bg-gray-100 h-48 flex items-center justify-center text-7xl">
        {image}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
            {category}
          </span>
          <span className="text-sm text-yellow-500 font-medium">
            ⭐ {rating}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 mb-1">{name}</h3>
        <p className="text-sm text-gray-500 mb-4 flex-1">{description}</p>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-xl font-bold text-gray-900">
            {price.toLocaleString()}원
          </span>
          <button
            onClick={handleAddToCart}
            disabled={!inStock}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer ${
              inStock
                ? "bg-indigo-600 text-white hover:bg-indigo-700 active:bg-indigo-800"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {inStock ? "담기" : "품절"}
          </button>
        </div>
      </div>
    </div>
  );
}
