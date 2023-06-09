import { useState } from 'react'
import InputNumber, { InputProps } from '../InputNumber'

interface QuantityControllerProps extends InputProps {
  max?: number
  onIncrease?: (value: number) => void
  onDecrease?: (value: number) => void
  onType?: (value: number) => void
  onFocusOut?: (value: number) => void
}

export default function QuantityController({
  max,
  onIncrease,
  onDecrease,
  onType,
  onFocusOut,
  disabled,
  value,
  className = 'ml-10 flex items-center'
}: QuantityControllerProps) {
  const [localValue, setLocalValue] = useState(Number(value) || 0)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    /**
     * Value này chỉ là value lấy từ props vào nếu mà k có thì lấy value từ state mình tạo vậy thui
     *
     *
     */
    let _value = Number(event.target.value)
    if (max !== undefined && _value > max) {
      _value = max
    } else if (_value < 1) {
      _value = 1
    }
    onType && onType(_value)
    setLocalValue(_value)
  }
  const decrease = () => {
    let _value = Number(value || localValue) - 1
    if (_value <= 0) {
      _value = 1
    }
    onDecrease && onDecrease(_value)
    setLocalValue(_value)
  }
  const increase = () => {
    let _value = Number(value || localValue) + 1
    if (max !== undefined && _value > max) {
      _value = max
    }
    onIncrease && onIncrease(_value)
    setLocalValue(_value)
  }
  const handleBlur = (event: React.FocusEvent<HTMLInputElement, Element>) => {
    const _value = Number(event.target.value)
    onFocusOut && onFocusOut(_value)
  }
  return (
    <div className={className}>
      <button
        className='flex h-8 w-8 items-center justify-center rounded-l-sm border border-gray-300 text-gray-600'
        onClick={decrease}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 12h-15' />
        </svg>
      </button>
      <InputNumber
        value={value || localValue}
        className=''
        classNameError='hidden'
        disabled={disabled}
        onChange={handleChange}
        onBlur={handleBlur}
        classNameInput='h-8 w-14 border-t border-b border-gray-300 p-1 text-center outline-none'
      />
      <button
        className='flex h-8 w-8 items-center justify-center rounded-r-sm border border-gray-300 text-gray-600'
        onClick={increase}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='h-4 w-4'
        >
          <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
        </svg>
      </button>
    </div>
  )
}
