import { InputHTMLAttributes, forwardRef, useState } from 'react'

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  /**
   *
   * Đây là những props được thêm vào khi tạo component InputNumber
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}
const InputNumber = forwardRef<HTMLInputElement, InputProps>(function InputNumberInner(
  {
    errorMessage,
    className, //props mặc định
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    onChange, //props mặc định
    value = '', //props mặc định or ngoài truyền vào mặc định là chuỗi rỗng
    ...rest //props mặc định
  },
  ref
) {
  const [localValue, setLocalValue] = useState<string>(value as string)
  /**
   * Gioong như handle 1 thẻ input bình thường là muốn Reactjs control input thì truyền
   *  value và onChange trong onChange này giá trị của input sẽ đc quản lý bởi state đã tạo
   *
   * case ở đây là người dùng ko truyền vào value, thì mình lấy props value từ HTMLinput truyền
   *  thẻ input, 1 value ít nhất có giá trị là chuỗi rỗng, để ko là undefined sẽ bị warning
   *  là mình đang change 1 giá trị là undefined -> uncontrolled.
   *
   * sau đó onChange thì kiểm tra nếu nhập vào số thì mới thực hiện onChange và cho state của react lưu giá trị này
   *
   *
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    if (/^\d+$/.test(value) || value === '') {
      //
      onChange && onChange(event) //==> tương tự onchange của input nhưng đây là onChange của component InputNumber
      /**
       * Dòng onChange && onChange(event) => giống như là khi bên ngoài truuyeenf vào 1 hàm
       *  thì ở đây sẽ nhận event => trả về cho cái hàm bên ngoài kia thực thi vậy
       * giống như là đặt cảnh báo khi máy pha cà phê pha xong thì lấy cà phê ra
       *
       */
      setLocalValue(value)
    }
  }
  return (
    <div className={className}>
      <input
        className={classNameInput}
        onChange={handleChange}
        value={value === undefined ? localValue : value}
        {...rest}
        ref={ref}
      />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
})

export default InputNumber
