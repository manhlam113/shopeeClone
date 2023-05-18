import { range } from 'lodash'
import { useState } from 'react'
interface DateSelectProps {
  value?: Date
  onChange: (value: Date) => void
  errorMessage?: string
}
export default function DateSelect({ value, onChange, errorMessage }: DateSelectProps) {
  const [date, setDate] = useState({
    date: value?.getDate() || 1,
    month: value?.getMonth() || 0,
    year: value?.getFullYear() || 1990
  })

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value: valueSelect } = event.target
    const newDate = {
      date: value?.getDate() || date.date,
      month: value?.getMonth() || date.month,
      year: value?.getFullYear() || date.year,
      [name]: Number(valueSelect)
    }
    setDate(newDate)
    onChange && onChange(new Date(newDate.year, newDate.month, newDate.date))
  }

  return (
    <div className='mt-2 flex flex-col flex-wrap sm:flex-row'>
      <div className='truncate pt-3 capitalize sm:w-[20%] sm:text-right'>Ngày sinh</div>
      <div className='sm:w-[80%] sm:pl-5'>
        <div className='flex justify-between'>
          <select
            value={Number(value?.getDate()) || date.date}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
            onChange={handleChange}
            name='date'
          >
            <option disabled>Ngày</option>
            {range(1, 31).map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              )
            })}
          </select>
          <select
            value={Number(value?.getMonth()) || date.month}
            name='month'
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
            onChange={handleChange}
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item + 1}
                </option>
              )
            })}
          </select>
          <select
            value={Number(value?.getFullYear()) || date.year}
            name='year'
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3'
            onChange={handleChange}
          >
            <option disabled>Năm</option>
            {range(1990, 2024).map((item, index) => {
              return (
                <option key={index} value={item}>
                  {item}
                </option>
              )
            })}
          </select>
        </div>
        <div className='mt-1 min-h-[1.25rem] text-sm text-red-600'>{errorMessage}</div>
      </div>
    </div>
  )
}
