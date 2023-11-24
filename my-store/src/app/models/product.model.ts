export interface Category{
  id: string;
  name: string;
  typeImg: string;
}

export interface Product{
  id: string;
  title: string;
  name: string;
  price: number;
  images: string[];
  description: string;
  category: Category
}
