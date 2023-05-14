import AsideFilter from './components/AsideFilter'
import Product from './components/Product'
import SortProduct from './components/SortProduct'
import { queryKey } from '../../constants/query.key'
import { productApi } from '../../apis/products.api'
import useQueryStringParams from '../../hooks/useQueryStringParams/useQueryStringParams'
import { useQuery } from '@tanstack/react-query'
import Pagination from '../../components/Pagination'
import { ProductListConfig } from '../../types/product.type'
import { omitBy, isUndefined, omit } from 'lodash'
import { categoryApi } from '../../apis/category.api'

export type QueryConfig = {
  [key in keyof ProductListConfig]: string
}
export default function ProductList() {
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
  const { data: productsData } = useQuery({
    queryKey: [queryKey.products.productList, queryConfig],
    queryFn: () => productApi.getProductList(queryConfig as ProductListConfig),
    keepPreviousData: true
  })
  const { data: categoryData } = useQuery({
    queryKey: [queryKey.categories, queryConfig],
    queryFn: () => categoryApi.getCategories(),
    keepPreviousData: true
  })

  return (
    <div className='py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter queryConfig={queryConfig} category={categoryData?.data.data || []}></AsideFilter>
          </div>
          {productsData && (
            <div className='col-span-9'>
              <SortProduct
                queryConfig={queryConfig}
                pageSize={productsData.data.data.pagination.page_size}
              ></SortProduct>
              <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
                {productsData.data.data.products.map((productItem) => (
                  <Product key={productItem._id} productItem={productItem}></Product>
                ))}
              </div>
              <Pagination queryConfig={queryConfig} pageSize={productsData?.data.data.pagination.page_size} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
