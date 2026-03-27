import { useState } from 'react';
import type { Category } from './types';
import { products } from './data/mockData';
import ProductCard from './components/ProductCard';
import CategoryFilter from './components/CategoryFilter';

// 모든 카테고리 목록 추출 (중복 제거) - 실제로는 API에서 오거나 정적으로 정의
const CATEGORIES: Category[] = ['All', 'Electronics', 'Clothing', 'Books', 'Home'];

function App() {
  // 제네릭을 적용한 useState 사용
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');

  // 필터 이벤트 핸들러 - 매개변수에 명시적 타입 지정
  const handleSelectCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  // 조건부 데이터 필터링 기능
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto max-w-6xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            Trending Products
          </h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Explore our curated collection of the latest electronics, fashion, and lifestyle essentials.
          </p>
        </header>

        <div className="flex justify-center">
          <CategoryFilter 
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={handleSelectCategory}
          />
        </div>

        {/* 조건부 렌더링: 상품이 있을 때와 없을 때 */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onClick={(id) => console.log('Product clicked:', id)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-medium text-gray-900 mb-1">No products found</h3>
            <p className="text-gray-500">There are no products in this category at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
