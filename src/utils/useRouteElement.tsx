import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from '../pages/ProductList'
import Register from '../pages/Register'
import Login from '../pages/Login'
import RegisterLayout from '../layout/RegisterLayout'
import MainLayout from '../layout/MainLayout'
import { useContext } from 'react'
import { AppContext } from '../context/authenticated.context'
import { path } from '../constants/path'
import ProductDetail from '../pages/ProductDetail'
import Cart from '../pages/Cart'
import CartLayout from '../layout/CartLayout'
import HistoryPurchase from '../pages/User/pages/HistoryPurchase'
import ChangePassword from '../pages/User/pages/ChangePassword'
import UserLayout from '../pages/User/layout'
import UserProfile from '../pages/User/pages/UserProfile'

// eslint-disable-next-line react-hooks/rules-of-hooks

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
              <Register />
            </RegisterLayout>
          )
        },
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
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
              <Cart />
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
              element: <UserProfile />
            },
            {
              path: path.password,
              element: <ChangePassword />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
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
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: ':id',
      index: true,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    }
  ])
  return routeElement
}
