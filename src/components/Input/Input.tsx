import type { UseFormRegister, FieldErrors, RegisterOptions } from 'react-hook-form'
interface InputProps {
  type: React.HTMLInputTypeAttribute
  errorMessage?: string
  className?: string
  placeholder?: string
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>
  rules?: RegisterOptions
}
export default function Input({ type, className, name, placeholder, register, errorMessage, rules }: InputProps) {
  return (
    <div className={className}>
      <input
        type={type}
        className='w-full rounded-sm border border-gray-300 p-3 outline-none focus:border-gray-500 focus:shadow-sm'
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <div className='mt-1 min-h-[1rem] text-sm text-red-600'>{errorMessage}</div>
    </div>
  )
}
