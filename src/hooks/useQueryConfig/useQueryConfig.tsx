import { isUndefined, omitBy } from 'lodash'
import { QueryConfig } from '../../pages/ProductList/ProductList'
import useQueryStringParams from '../useQueryStringParams/useQueryStringParams'

export const useQueryConfig = () => {
  const queryParams: QueryConfig = useQueryStringParams()
  const queryConfig: QueryConfig = omitBy(
    {
      page: queryParams.page || '1',
      category: queryParams.category,
      exclude: queryParams.exclude,
      limit: queryParams.limit || '10',
      name: queryParams.name,
      order: queryParams.order,
      price_max: queryParams.price_max,
      price_min: queryParams.price_min,
      rating_filter: queryParams.rating_filter,
      sort_by: queryParams.sort_by
    },
    isUndefined
  )
  return queryConfig
}
