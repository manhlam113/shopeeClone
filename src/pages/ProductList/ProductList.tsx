import AsideFilter from './components/AsideFilter'
import Product from './components/Product'
import SortProduct from './components/SortProduct'

export default function ProductList() {
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
