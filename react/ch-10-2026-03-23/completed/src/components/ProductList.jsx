import { useState } from "react";
import { products } from "../data/mockData";
import CategoryFilter from "./CategoryFilter";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filteredProducts =
    selectedCategory === "전체"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
