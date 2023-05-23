import { Link } from 'react-router-dom'
import Popover from '../Popover'
import { path } from '../../constants/path'
import authApi from '../../apis/auth.api'
import { useContext } from 'react'
import { AppContext } from '../../context/authenticated.context'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { purchaseStatus } from '../../constants/purchase'
import { getAvatarUrl } from '../../utils/utils'
import { useTranslation } from 'react-i18next'
import { currentLanguageObj } from '../../i18n'
export default function NavHeader() {
  const { i18n } = useTranslation()
  const currentLanguage = i18n.language

  const { isAuthenticated, setIsAuthenticated, profile } = useContext(AppContext)

  const queryClient = useQueryClient()
  const logoutMutation = useMutation({
    mutationFn: authApi.logOut,
    onSuccess: () => {
      setIsAuthenticated(false),
        queryClient.removeQueries({ queryKey: ['purchases', { status: purchaseStatus.inCart }], exact: true })
    }
  })
  const handleLogOut = () => {
    logoutMutation.mutate()
  }
  const handleChangeLng = (lng: string) => {
    i18n.changeLanguage(lng)
  }
  return (
    <div className='flex items-center justify-between'>
      <div className='navbar-left flex'>
        <div className='mr-2 border-r-2  border-r-white/40 pr-2'>Kênh người bán</div>
        <div className='mr-2 border-r-2  border-r-white/40 pr-2'>Trở thành Người bán Shopee</div>
        <div className='mr-2 border-r-2  border-r-white/40 pr-2'>Tải ứng dụng</div>
        <div className='mr-2 border-r-2  border-r-white/40 pr-2'>Kết nối</div>
      </div>
      <div className='navbar-right flex'>
        <Popover
          as='span'
          className='flex cursor-pointer items-center py-1 hover:text-gray-300'
          renderPopover={
            <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
              <div className='flex flex-col py-2 pl-3 pr-28'>
                <button className='px-3 py-2 text-left hover:text-orange' onClick={() => handleChangeLng('vi')}>
                  Tiếng Việt
                </button>
                <button className='mt-2 px-3 py-2  text-left hover:text-orange' onClick={() => handleChangeLng('en')}>
                  English
                </button>
              </div>
            </div>
          }
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418'
            />
          </svg>
          <span className='mx-1'>{currentLanguageObj[currentLanguage as keyof typeof currentLanguageObj]}</span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>
        </Popover>
        {isAuthenticated && (
          <Popover
            className='hover:text-gray-300s ml-6 flex cursor-pointer items-center py-1'
            renderPopover={
              <div className='relative rounded-sm border border-gray-200 bg-white shadow-md'>
                <Link
                  to='/user/profile'
                  className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500'
                >
                  Tài khoản của tôi
                </Link>
                <Link
                  to='/'
                  className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500'
                >
                  Đơn mua
                </Link>
                <button
                  className='block w-full bg-white px-4 py-3 text-left hover:bg-slate-100 hover:text-cyan-500'
                  onClick={handleLogOut}
                >
                  Đăng xuất
                </button>
              </div>
            }
          >
            <div className='mr-2 h-6 w-6 flex-shrink-0'>
              <img
                src={getAvatarUrl(profile?.avatar) || `'https://cf.shopee.vn/file/d04ea22afab6e6d250a370d7ccc2e675_tn'`}
                alt='avatar'
                className='h-full w-full rounded-full object-cover'
              />
            </div>
            <div>{profile?.email}</div>
          </Popover>
        )}
        {!isAuthenticated && (
          <div className='flex items-center'>
            <Link to={path.login} className='ml-2'>
              Đăng nhập
            </Link>
            <div className='ml-2 h-4 border-r-2 border-r-white/40'></div>
            <Link to={path.register} className='ml-2'>
              Đăng ký
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
