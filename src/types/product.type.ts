export interface Product {
  _id: string
  images: string[]
  price: number
  rating: number
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  description: string
  category: string
  image: string
  createdAt: string
  updatedAt: string
}
export interface ProductList {
  products: Product[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}
export interface ProductListConfig {
  page?: number
  limit?: number
  order?: 'desc' | 'asc'
  sortBy?: 'createdAt' | 'view' | 'sold' | 'price'
  category?: number
  exclude?: number
  rating_filter?: number
  price_max?: number
  price_min?: number
  name?: string
}
