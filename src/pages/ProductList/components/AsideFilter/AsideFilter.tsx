import { Link, createSearchParams, useNavigate } from 'react-router-dom'

import Button from '../../../../components/Button/Button'
import { QueryConfig } from '../../ProductList'
import { Category } from '../../../../types/category.type'
import classNames from 'classnames'
import { path } from '../../../../constants/path'
import InputNumber from '../../../../components/InputNumber'
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Schema, schema } from '../../../../utils/rules'
import { NoUndefinedField } from '../../../../utils/utils'
import RatingStar from '../../../../components/RatingStar'
import { omit } from 'lodash'

interface AsideFilterProps {
  queryConfig: QueryConfig
  category: Category[]
}
type FormData = NoUndefinedField<Pick<Schema, 'price_min' | 'price_max'>>
const priceSchema = schema.pick(['price_min', 'price_max'])
export default function AsideFilter({ category, queryConfig }: AsideFilterProps) {
  const navigator = useNavigate()
  const categoryParams = queryConfig.category
  const {
    handleSubmit,
    control,
    trigger,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(priceSchema),
    defaultValues: {
      price_max: '',
      price_min: ''
    },
    shouldFocusError: false
  })
  const isActiveCategory = (categoryId: string) => {
    return categoryParams === categoryId
  }
  const onSubmit = handleSubmit((data) => {
    navigator({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        price_min: data.price_min,
        price_max: data.price_max
      }).toString()
    })
  })
  const handleRemoveAll = () => {
    navigator({
      pathname: path.home,
      search: createSearchParams(omit(queryConfig, ['price_min', 'price_max', 'rating_filter', 'category'])).toString()
    })
  }
  return (
    <div className='py-5'>
      <Link
        to={path.home}
        className={classNames('flex items-center font-bold', {
          'text-orange ': !categoryParams
        })}
      >
        <svg viewBox='0 0 12 10' className='mr-3 h-4 w-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất Cả Danh Mục
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <ul>
        {category.map((categoryItem) => {
          return (
            <li className='py-2 pl-2' key={categoryItem._id}>
              <Link
                to={{
                  pathname: path.home,
                  search: createSearchParams({
                    ...queryConfig,
                    category: categoryItem._id
                  }).toString()
                }}
                className={classNames('flex items-center', {
                  'font-bold text-orange': isActiveCategory(categoryItem._id),
                  'text-black': !isActiveCategory(categoryItem._id)
                })}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='mr-1 h-3 w-3'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5'
                  />
                </svg>

                {categoryItem.name}
              </Link>
            </li>
          )
        })}
      </ul>
      <Link to={path.home} className='mt-4 flex items-center font-bold capitalize'>
        <svg
          enableBackground='new 0 0 15 15'
          viewBox='0 0 15 15'
          x={0}
          y={0}
          className='mr-3 h-4 w-4 fill-current stroke-current'
        >
          <g>
            <polyline
              fill='none'
              points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeMiterlimit={10}
            />
          </g>
        </svg>
        Bộ lọc tìm kiếm
      </Link>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='my-5'>
        <div className='my-2 mr-2 font-bold'>Khoảng giá</div>
        <form className='mt-2' onSubmit={onSubmit}>
          <div className='flex items-start'>
            <Controller
              name='price_min'
              control={control}
              render={({ field }) => (
                <InputNumber
                  type='text'
                  className='grow'
                  placeholder='₫ TỪ'
                  classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  classNameError='hidden'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_max')
                  }}
                />
              )}
            />
            <div className='mx-2 mt-2 shrink-0'>-</div>
            <Controller
              name='price_max'
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <InputNumber
                  type='text'
                  className='grow'
                  placeholder='₫ ĐẾN'
                  classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  classNameError='hidden'
                  {...field}
                  onChange={(event) => {
                    field.onChange(event)
                    trigger('price_min')
                  }}
                />
              )}
            />
          </div>
          <div className='h-[1.25rem] text-center text-sm text-red-500'>{errors.price_max?.message}</div>
          <Button className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'>
            Áp dụng
          </Button>
        </form>
      </div>
      <div className='my-4 h-[1px] bg-gray-300' />
      <div className='text-sm'>Đánh giá</div>
      <RatingStar queryConfig={queryConfig} />
      <div className='my-4 h-[1px] bg-gray-300' />
      <Button
        className='flex w-full items-center justify-center bg-orange p-2 text-sm uppercase text-white hover:bg-orange/80'
        onClick={handleRemoveAll}
      >
        Xóa tất cả
      </Button>
    </div>
  )
}
