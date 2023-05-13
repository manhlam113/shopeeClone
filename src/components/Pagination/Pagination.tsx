import classNames from 'classnames'
import { QueryConfig } from '../../pages/ProductList/ProductList'
import { Link, createSearchParams } from 'react-router-dom'
import { path } from '../../constants/path'

interface PaginationProps {
  queryConfig: QueryConfig
  pageSize: number
}
const RANGE = 2
const renderPageNumber = (page: number, pageSize: number, queryConfig: QueryConfig) => {
  let dotAfter = false
  let dotBefore = false
  const renderDotAfter = (index: number) => {
    const pageNumber = index + 1
    if (!dotAfter) {
      dotAfter = true
      return (
        <span className='border border-gray-400 bg-white px-3 py-3' key={pageNumber}>
          ...
        </span>
      )
    }
    return null
  }
  const renderDotBefore = (index: number) => {
    const pageNumber = index + 1
    if (!dotBefore) {
      dotBefore = true
      return (
        <span className=' border border-gray-400 bg-white px-3 py-3' key={pageNumber}>
          ...
        </span>
      )
    }
    return null
  }
  return Array(pageSize)
    .fill(0)
    .map((_, index) => {
      const pageNumber = index + 1
      if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
        return renderDotAfter(index)
      } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
        if (pageNumber < page - RANGE && pageNumber > RANGE) {
          return renderDotBefore(index)
        } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        }
      } else if (page >= pageSize - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
        return renderDotBefore(index)
      }

      return (
        <Link
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: pageNumber.toString()
            }).toString()
          }}
          key={pageNumber}
          className={classNames(`border border-gray-400 bg-white px-3 py-3`, {
            'border-orange': pageNumber === page,
            'border-gray-400': pageNumber !== page
          })}
        >
          {pageNumber}
        </Link>
      )
    })
}
export default function Pagination(props: PaginationProps) {
  const { queryConfig, pageSize } = props
  const page = Number(queryConfig.page)

  return (
    <div className='mt-6 flex flex-wrap justify-center gap-2'>
      {page === 1 ? (
        <span className='cursor-not-allowed border border-gray-400 bg-gray-200/80 bg-white px-3 py-3'>Previous</span>
      ) : (
        <Link to={`?page=${page - 1}`} className=' border border-gray-400 bg-white px-3 py-3'>
          Previous
        </Link>
      )}
      {renderPageNumber(page, pageSize, queryConfig)}
      {page >= pageSize ? (
        <span className='cursor-not-allowed border border-gray-400 bg-gray-200/80 bg-white px-3 py-3'>Next</span>
      ) : (
        <Link to={`?page=${page + 1}`} className=' border border-gray-400 bg-white px-3 py-3'>
          Next
        </Link>
      )}
    </div>
  )
}
