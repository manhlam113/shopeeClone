import { Category } from '../types/category.type'
import { ResponseApiSuccess } from '../types/utils.type'
import http from '../utils/http'
const URLCategory = 'categories'
export const categoryApi = {
  getCategories: () => {
    return http.get<ResponseApiSuccess<Category[]>>(URLCategory)
  }
}
