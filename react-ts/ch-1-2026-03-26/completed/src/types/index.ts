export type Category = 'All' | 'Electronics' | 'Clothing' | 'Books' | 'Home';

export interface Product {
  id: number;
  name: string;
  price: number;
  category: Category;
  imageUrl: string;
  inStock: boolean;
}
