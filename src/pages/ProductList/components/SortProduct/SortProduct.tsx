import { QueryConfig } from '../../ProductList'
import classNames from 'classnames'
import { sortBy } from '../../../../constants/params'
import { createSearchParams, useNavigate } from 'react-router-dom'
import omit from 'lodash/omit'
import { path } from '../../../../constants/path'
import { useTranslation } from 'react-i18next'

interface SortProduct {
  queryConfig: QueryConfig
  pageSize: number
}
export default function SortProduct(props: SortProduct) {
  const navigator = useNavigate('home')
  const { queryConfig, pageSize } = props
  const page = Number(queryConfig.page)
  const { sort_by = sortBy.createdAt, order } = queryConfig
  const { t } = useTranslation()
  const handleSortBy = (sortByValue: string) => {
    navigator({
      pathname: path.home,
      search: createSearchParams(
        omit(
          {
            ...queryConfig,
            sort_by: sortByValue
          },
          ['order']
        )
      ).toString()
    })
  }
  const handleChangePrice = (event: React.ChangeEvent<HTMLSelectElement>) => {
    navigator({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        sort_by: sortBy.price,
        order: event.target.value
      }).toString()
    })
  }
  const handlePreviousMini = () => {
    navigator({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        page: (page - 1).toString()
      }).toString()
    })
  }
  const handleNextMini = () => {
    navigator({
      pathname: path.home,
      search: createSearchParams({
        ...queryConfig,
        page: (page + 1).toString()
      }).toString()
    })
  }
  return (
    <div className='py-5'>
      <div className='bg-[rgba(0,0,0,.03)] p-2'>
        <div className='flex flex-wrap items-center justify-between gap-2'>
          <div className='flex items-center gap-2'>
            <div>{t('sort product list.products by')}</div>
            <button
              onClick={() => handleSortBy(sortBy.view)}
              className={classNames('h-8 px-4 text-center text-sm capitalize ', {
                'bg-orange text-white hover:bg-orange/80': sortBy.view === sort_by,
                'bg-white text-black hover:bg-slate-100': sortBy.view !== sort_by
              })}
            >
              {t('sort product list.popular')}
            </button>
            <button
              onClick={() => handleSortBy(sortBy.createdAt)}
              className={classNames('h-8 px-4 text-center text-sm capitalize ', {
                'bg-orange text-white hover:bg-orange/80': sortBy.createdAt === sort_by,
                'bg-white text-black hover:bg-slate-100': sortBy.createdAt !== sort_by
              })}
            >
              {t('sort product list.newest')}
            </button>
            <button
              onClick={() => handleSortBy(sortBy.sold)}
              className={classNames('h-8 px-4 text-center text-sm capitalize ', {
                'bg-orange text-white hover:bg-orange/80': sortBy.sold === sort_by,
                'bg-white text-black hover:bg-slate-100': sortBy.sold !== sort_by
              })}
            >
              {t('sort product list.selling')}
            </button>
            <select
              className={classNames('h-8  px-4 text-left text-sm capitalize  outline-none ', {
                'bg-orange text-white hover:bg-orange/80': sortBy.price === sort_by,
                'bg-white text-black hover:bg-slate-100': sortBy.price !== sort_by
              })}
              defaultValue=''
              value={order}
              onChange={handleChangePrice}
            >
              <option value='' className='bg-white text-black'>
                {t('sort product list.price')}
              </option>
              <option value='asc' className='bg-white text-black'>
                {t('sort product list.price low to high')}
              </option>
              <option value='desc' className='bg-white text-black'>
                {t('sort product list.price high to low')}
              </option>
            </select>
          </div>
          <div className='flex items-center gap-2'>
            <span className='text-red-500'>
              {page}
              <span className='text-black'>/{pageSize}</span>
            </span>
            <div className='flex'>
              {page === 1 ? (
                <span className='flex h-8 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-3 w-3'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </span>
              ) : (
                <button
                  onClick={handlePreviousMini}
                  className='h-8 rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-3 w-3'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
              )}
              {page === pageSize ? (
                <span className='flex h-8 cursor-not-allowed items-center justify-center rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-3 w-3'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </span>
              ) : (
                <button
                  onClick={handleNextMini}
                  className='h-8 rounded-bl-sm rounded-tl-sm bg-white/60 px-3 shadow hover:bg-slate-100'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-3 w-3'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
