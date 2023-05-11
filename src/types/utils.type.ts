/**
 * Ta tưởng tượng interface ResponseApi<Data> bên dưới như một hàm
 *  và Data là kiểu dữ liệu truyền vào hàm
 *  do response từ server trả về có message + data (có thể tùy biến nenen ta đặt cho nó như 1 đối số truyền
 * vào hàm)
 *
 */
export interface ResponseApiSuccess<Data> {
  message: string
  data: Data
}

export interface ResponseApiFail<Data> {
  message: string
  data?: Data
}
