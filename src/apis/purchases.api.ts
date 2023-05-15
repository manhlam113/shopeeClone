import { Purchase, PurchaseStatusList } from '../types/purchases.type'
import { ResponseApiSuccess } from '../types/utils.type'
import http from '../utils/http'
const URL = 'purchases'
const purchasesApi = {
  addProductToCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<ResponseApiSuccess<Purchase>>(`${URL}/add-to-cart`, body)
  },
  getPurchases: (params: { status: PurchaseStatusList }) => {
    return http.get<ResponseApiSuccess<Purchase[]>>(URL, {
      params
    })
  },
  buyPurchases: (body: { product_id: string; buy_count: number }[]) => {
    return http.post<ResponseApiSuccess<Purchase[]>>(`${URL}/buy-products`, body)
  },
  updateCart: (body: { product_id: string; buy_count: number }) => {
    return http.post<ResponseApiSuccess<Purchase>>(`${URL}/update-purchase`, body)
  },
  deleteCart: (purchaseIds: string[]) => {
    return http.delete<ResponseApiSuccess<{ deleted_count: number }>>(URL, {
      data: purchaseIds
    })
  }
}
export default purchasesApi
