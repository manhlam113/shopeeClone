import classNames from 'classnames'
import { Link, createSearchParams } from 'react-router-dom'
import useQueryStringParams from '../../../../hooks/useQueryStringParams/useQueryStringParams'
import { purchaseStatus } from '../../../../constants/purchase'
import { path } from '../../../../constants/path'
import { useQuery } from '@tanstack/react-query'
import purchasesApi from '../../../../apis/purchases.api'
import { PurchaseStatusList } from '../../../../types/purchases.type'
import { formatNumberToCurrency, generateURLProductDetail } from '../../../../utils/utils'
const purchaseTabs = [
  { status: purchaseStatus.all, name: 'Tất cả' },
  { status: purchaseStatus.watingForConfirmation, name: 'Chờ xác nhận' },
  { status: purchaseStatus.waitingForGetting, name: 'Chờ lấy hàng' },
  { status: purchaseStatus.inProgess, name: 'Đang giao' },
  { status: purchaseStatus.delivered, name: 'Đã giao' },
  { status: purchaseStatus.cancelled, name: 'Đã hủy' }
]
export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryStringParams()
  const status: number = Number(queryParams.status) || purchaseStatus.all

  const { data: purchasesInCartData } = useQuery({
    queryKey: ['purchases', { status: status }],
    queryFn: () => purchasesApi.getPurchases({ status: status as PurchaseStatusList })
  })
  const purchasesInCart = purchasesInCartData?.data.data
  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({
          status: String(tab.status)
        }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
    >
      {tab.name}
    </Link>
  ))
  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
          <div>
            {purchasesInCart &&
              purchasesInCart?.length > 0 &&
              purchasesInCart?.map((purchase) => (
                <div
                  key={purchase._id}
                  className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'
                >
                  <Link
                    to={`${path.home}${generateURLProductDetail(purchase.product.name, purchase.product._id)})}`}
                    className='flex'
                  >
                    <div className='flex-shrink-0'>
                      <img
                        className='h-20 w-20 object-cover'
                        src={purchase.product.image}
                        alt={purchase.product.name}
                      />
                    </div>
                    <div className='ml-3 flex-grow overflow-hidden'>
                      <div className='truncate'>{purchase.product.name}</div>
                      <div className='mt-3'>x{purchase.buy_count}</div>
                    </div>
                    <div className='ml-3 flex-shrink-0'>
                      <span className='truncate text-gray-500 line-through'>
                        ₫{formatNumberToCurrency(purchase.product.price_before_discount)}
                      </span>
                      <span className='ml-2 truncate text-orange'>
                        ₫{formatNumberToCurrency(purchase.product.price)}
                      </span>
                    </div>
                  </Link>
                  <div className='flex justify-end'>
                    <div>
                      <span>Tổng giá tiền</span>
                      <span className='ml-4 text-xl text-orange'>
                        ₫{formatNumberToCurrency(purchase.product.price * purchase.buy_count)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            {purchasesInCart && purchasesInCart?.length <= 0 && (
              <div className='flex min-h-[300px] items-center justify-center bg-white'>Chưa có đơn hàng</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
