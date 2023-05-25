import { Navigate, Outlet, useRoutes } from 'react-router-dom'

import RegisterLayout from '../layout/RegisterLayout'
import MainLayout from '../layout/MainLayout'
import { useContext, lazy, Suspense } from 'react'
import { AppContext } from '../context/authenticated.context'
import { path } from '../constants/path'
import CartLayout from '../layout/CartLayout'
import UserLayout from '../pages/User/layout'

// eslint-disable-next-line react-hooks/rules-of-hooks
const Login = lazy(() => import('../pages/Login'))
const ProductList = lazy(() => import('../pages/ProductList'))
const UserProfile = lazy(() => import('../pages/User/pages/UserProfile'))
const Register = lazy(() => import('../pages/Register'))
const ProductDetail = lazy(() => import('../pages/ProductDetail'))
const Cart = lazy(() => import('../pages/Cart'))
const ChangePassword = lazy(() => import('../pages/User/pages/ChangePassword'))
const HistoryPurchase = lazy(() => import('../pages/User/pages/HistoryPurchase'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound'))
function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}
function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}
export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Suspense>
                <Cart />
              </Suspense>
            </CartLayout>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            {
              path: path.profile,
              element: (
                <Suspense>
                  <UserProfile />
                </Suspense>
              )
            },
            {
              path: path.password,
              element: (
                <Suspense>
                  <ChangePassword />
                </Suspense>
              )
            },
            {
              path: path.historyPurchase,
              element: (
                <Suspense>
                  <HistoryPurchase />
                </Suspense>
              )
            }
          ]
        }
      ]
    },
    /**
     *
     * Tại sao thằng này ko có component Protected và Rejected
     * bởi vì behavior tại đây là muốn người dùng dù không đăng nhập
     *  hay chưa đăng nhập thì vẫn vào được
     *  + khi họ logout tại trang product list nó chỉ yêu cầu họ đăng nhập nếu muốn chứ k
     * phải là navigate họ về trang login
     */
    {
      path: '',
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: ':id',
      index: true,
      element: (
        <MainLayout>
          <Suspense>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense>
            <NotFound />
          </Suspense>
        </MainLayout>
      )
    }
  ])
  return routeElement
}
