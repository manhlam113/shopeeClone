import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { queryKey } from '../../constants/query.key'
import { productApi } from '../../apis/products.api'
import { useNavigate, useParams } from 'react-router-dom'
import ProductRating from '../ProductList/components/ProductRating'
import { formatNumberToCurrency, formatNumberToSocialStyle, getNameIdfromURL, rateSale } from '../../utils/utils'

import DOMPurify from 'dompurify'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Product as ProductType, ProductListConfig } from '../../types/product.type'
import Product from '../ProductList/components/Product'
import QuantityController from '../../components/QuantityController'
import purchasesApi from '../../apis/purchases.api'
import { toast } from 'react-toastify'
import { purchaseStatus } from '../../constants/purchase'
import { Helmet } from 'react-helmet-async'
import { convert } from 'html-to-text'
export default function ProductDetail() {
  const imageRef = useRef<HTMLImageElement>(null)
  const navigator = useNavigate()
  const [buyCount, setBuyCount] = useState(1)
  const [activeImg, setActiveImg] = useState('')
  const [currentIndexImg, setCurrentIndexImg] = useState([0, 5])
  const queryClient = useQueryClient()
  const { id } = useParams()
  const nameId = getNameIdfromURL(id as string)

  const { data: productDetail } = useQuery({
    queryKey: [queryKey.products.productDetails, nameId],
    queryFn: () => productApi.getProductItem(nameId)
  })

  const product = productDetail?.data.data
  const currentImgs = useMemo(
    () => (product ? product?.images.slice(...currentIndexImg) : []),
    [product, currentIndexImg]
  )

  const queryConfig: ProductListConfig = { limit: '10', category: product?.category._id, page: '1' }
  const { data: productsData } = useQuery({
    queryKey: [queryKey.products.productList, queryConfig],
    queryFn: () => productApi.getProductList(queryConfig as ProductListConfig),
    staleTime: 3 * 60 * 1000
  })

  useEffect(() => {
    if (product && product.images.length > 0) setActiveImg(product?.images[0])
  }, [product])

  const handlePrevImg = () => {
    if (currentIndexImg[0] > 0) {
      setCurrentIndexImg((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  const handleNextImg = () => {
    if (currentIndexImg[1] < (product as ProductType).images.length) {
      setCurrentIndexImg((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const handleBuyCount = (value: number) => {
    setBuyCount(value)
  }
  const handleOnMouseMove = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const img = imageRef.current as HTMLImageElement
    const rect = event.currentTarget.getBoundingClientRect()
    const { naturalWidth, naturalHeight } = img
    img.style.width = naturalWidth + 'px'
    img.style.height = naturalHeight + 'px'
    img.style.maxWidth = 'unset'
    const { offsetX, offsetY } = event.nativeEvent
    const top = offsetY * (1 - naturalHeight / rect.height)
    const left = offsetX * (1 - naturalHeight / rect.height)
    img.style.top = top + 'px'
    img.style.left = left + 'px'
  }
  const handleRemoveZoom = () => {
    imageRef.current?.removeAttribute('style')
  }

  const addProductToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => purchasesApi.addProductToCart(body)
  })
  const handleAddProductToCart = () => {
    addProductToCartMutation.mutate(
      { product_id: product?._id as string, buy_count: buyCount },
      {
        onSuccess: () => {
          toast.success('Thêm sản phẩm vào giỏ hàng thành công'),
            queryClient.invalidateQueries(['purchases', { status: purchaseStatus.inCart }])
        }
      }
    )
  }
  const handleBuyNow = async () => {
    const res = await addProductToCartMutation.mutateAsync({ buy_count: buyCount, product_id: product?._id as string })
    const purchase = res.data.data
    navigator('/cart', {
      state: {
        purchaseId: purchase._id
      }
    })
  }

  if (!product) return null
  return (
    <div className='bg-[#f5f5f5] p-4'>
      <Helmet>
        <title>{product.name}</title>
        <meta
          name='description'
          content={convert(product.description, {
            limits: {
              ellipsis: '...',
              maxInputLength: 120
            }
          })}
        />
      </Helmet>
      <div className='container'>
        <div className='bg-white p-4'>
          <div className='grid grid-cols-12 gap-6'>
            <div className='col-span-5'>
              <div
                className='relative w-full cursor-zoom-in overflow-hidden pt-[100%]'
                onMouseMove={handleOnMouseMove}
                onMouseLeave={handleRemoveZoom}
              >
                <img
                  src={activeImg}
                  alt=''
                  className='pointer-events-none absolute left-0 top-0 h-full w-full bg-white object-cover'
                  ref={imageRef}
                />
              </div>
              <div className='relative mt-6 grid grid-cols-5 gap-2'>
                <button
                  className='absolute left-0 top-[50%] z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                  onClick={handlePrevImg}
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15.75 19.5L8.25 12l7.5-7.5' />
                  </svg>
                </button>
                {currentImgs.slice(0, 5).map((image) => {
                  const isActiveImage = image === activeImg
                  return (
                    <div
                      className='relative w-full cursor-pointer border border-transparent pt-[100%]'
                      key={image}
                      onMouseEnter={() => setActiveImg(image)}
                    >
                      <img src={image} alt='' className='absolute left-0 top-0 h-full w-full' />
                      {isActiveImage && <div className='absolute inset-0 border-2 border-orange'></div>}
                    </div>
                  )
                })}
                <button
                  onClick={handleNextImg}
                  className='absolute right-0 top-[50%] z-10 h-9 w-5 -translate-y-1/2 bg-black/20 text-white'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='h-6 w-6'
                  >
                    <path strokeLinecap='round' strokeLinejoin='round' d='M8.25 4.5l7.5 7.5-7.5 7.5' />
                  </svg>
                </button>
              </div>
            </div>
            <div className='col-span-7'>
              <h1 className='text-xl font-medium capitalize text-gray-500'>{product.name}</h1>
              <div className='mt-4 flex items-center'>
                <span className='mr-2 text-orange'>{product.rating}</span>
                <ProductRating rating={product.rating} activeClass='h-3 w-3 fill-orange text-orange'></ProductRating>
                <div className='mx-4 h-4 w-[1px] bg-gray-300'></div>
                <div>
                  <span>{formatNumberToSocialStyle(product.sold)}</span>
                  <span className='ml-1 text-gray-500'>Đã bán</span>
                </div>
              </div>
              <div className='mt-8 flex items-center bg-gray-50 px-5 py-4'>
                <div className='text-gray-500 line-through'>
                  ₫{formatNumberToCurrency(product.price_before_discount)}
                </div>
                <div className='ml-3 text-3xl font-medium text-orange'>₫{formatNumberToCurrency(product.price)}</div>
                <div className='ml-4 rounded-sm bg-orange px-1 py-[2px] text-xs font-semibold uppercase text-white'>
                  {rateSale(product.price_before_discount, product.price)} giảm
                </div>
              </div>
              <div className='mt-8 flex items-center'>
                <div className='capitalize text-gray-500'>Số lượng</div>
                <QuantityController
                  max={product.quantity}
                  onType={handleBuyCount}
                  onIncrease={handleBuyCount}
                  onDecrease={handleBuyCount}
                  value={buyCount}
                ></QuantityController>
                <div className='ml-6 text-sm text-gray-500'>{product.quantity} sản phẩm có sẵn</div>
              </div>
              <div className='mt-8 flex items-center'>
                <button
                  className='flex h-12 items-center justify-center rounded-sm border border-orange bg-orange/10 px-5 capitalize text-orange shadow-sm hover:bg-orange/5'
                  onClick={handleAddProductToCart}
                >
                  <svg
                    enableBackground='new 0 0 15 15'
                    viewBox='0 0 15 15'
                    x={0}
                    y={0}
                    className='mr-[10px] h-5 w-5 fill-current stroke-orange text-orange'
                  >
                    <g>
                      <g>
                        <polyline
                          fill='none'
                          points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeMiterlimit={10}
                        />
                        <circle cx={6} cy='13.5' r={1} stroke='none' />
                        <circle cx='11.5' cy='13.5' r={1} stroke='none' />
                      </g>
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
                      <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
                    </g>
                  </svg>
                  Thêm vào giỏ hàng
                </button>
                <button
                  className='fkex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
                  onClick={handleBuyNow}
                >
                  Mua ngay
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8 bg-white p-4 shadow'>
          <div className='container'>
            <div className='rounded bg-gray-50 p-4 text-lg capitalize text-slate-700'>Mô tả sản phẩm</div>
            <div className='mx-4 mb-4 mt-12 text-sm leading-loose'>
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description)
                }}
              />
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <div className='text-lg uppercase'>CÓ THỂ BẠN CŨNG THÍCH</div>
          {productsData && (
            <div className='mt-4 grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6'>
              {productsData.data.data.products.map((productItem) => (
                <Product key={productItem._id} productItem={productItem}></Product>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
