import AsideFilter from './components/AsideFilter'
import Product from './components/Product'
import SortProduct from './components/SortProduct'
import { queryKey } from '../../constants/query.key'
import { productApi } from '../../apis/products.api'
import useQueryStringParams from '../../hooks/useQueryStringParams/useQueryStringParams'
import { useQuery } from '@tanstack/react-query'

export default function ProductList() {
  const queryParams = useQueryStringParams()
  const { data } = useQuery({
    queryKey: [queryKey.products, queryParams],
    queryFn: () => productApi.getProductList(queryParams)
  })
  console.log('DATA', data)

  return (
    <div className='py-6'>
      <div className='container'>
        <div className='grid grid-cols-12 gap-6'>
          <div className='col-span-3'>
            <AsideFilter></AsideFilter>
          </div>
          <div className='col-span-9'>
            <SortProduct></SortProduct>
            <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
              {Array(100)
                .fill(0)
                .map((_, index) => {
                  return <Product key={index}></Product>
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
