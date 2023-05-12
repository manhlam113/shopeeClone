import { Product, ProductList, ProductListConfig } from '../types/product.type'
import { ResponseApiSuccess } from '../types/utils.type'
import http from '../utils/http'

const URL = 'products'
export const productApi = {
  getProductList: (params: ProductListConfig) => {
    return http.get<ResponseApiSuccess<ProductList>>(URL, {
      params
    })
  },
  getProductItem: (id: string) => {
    return http.get<ResponseApiSuccess<Product>>(`${URL}/${id}`)
  }
}
