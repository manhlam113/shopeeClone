import { Link } from 'react-router-dom'
import { Product as ProductType } from '../../../../types/product.type'
import { formatNumberToCurrency, formatNumberToSocialStyle } from '../../../../utils/utils'
import ProductRating from '../ProductRating'
type ProductItem = {
  productItem: ProductType
}
export default function Product(props: ProductItem) {
  const { productItem } = props
  return (
    <Link to='/'>
      <div className='overflow-hidden rounded-sm bg-white shadow transition-transform duration-100 hover:translate-y-[-0.04rem] hover:shadow-lg'>
        <div className='relative w-full pt-[100%]'>
          <img src={productItem.image} alt='' className='absolute left-0 top-0 h-full w-full bg-white object-cover' />
        </div>
        <div className='overflow-hidden p-2'>
          <div className='line-clamp-2 min-h-[2rem] text-xs'>{productItem.name}</div>
          <div className='mt-3 flex items-center'>
            <div className='max-w-[50%] truncate text-gray-500 line-through'>
              <span className='text-xs'>₫</span>
              <span>{formatNumberToCurrency(productItem.price_before_discount)}</span>
            </div>
            <div className='ml-1 truncate text-orange'>
              <span className='text-xs'>₫</span>
              <span>{formatNumberToCurrency(productItem.price)}</span>
            </div>
          </div>
          <div className='mt-3 flex items-center justify-end'>
            <ProductRating rating={productItem.rating} />
            <div className='ml-2 text-sm'>
              <span>{formatNumberToSocialStyle(productItem.sold)}</span>
              <span className='ml-1'>Đã bán</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}
