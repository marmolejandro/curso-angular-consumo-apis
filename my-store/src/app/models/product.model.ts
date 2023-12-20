export interface Category{
  id: string;
  name: string;
  typeImg: string;
}

export interface Product{
  id: string;
  title: string;
  price: number;
  images: string[];
  description: string;
  category: Category;
  taxes?: number;
}

// Omit -> omite los campos indicados
export interface CreateProductDTO extends Omit<Product, 'id' | 'category'> {
  categoryId: number
}

// Partial vuelve opcionales los campos del que se está extendiendo
export interface UpdateProductDTO extends Partial<CreateProductDTO> {}
