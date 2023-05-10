import { useRoutes } from 'react-router-dom'
import ProductList from '../pages/ProductList'
import Register from '../pages/Register'
import Login from '../pages/Login'
import RegisterLayout from '../layout/RegisterLayout'
import MainLayout from '../layout/MainLayout'
export default function useRouteElement() {
  const routeElement = useRoutes([
    {
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: '/register',
      element: (
        <RegisterLayout>
          <Register />
        </RegisterLayout>
      )
    },
    {
      path: '/login',
      element: (
        <RegisterLayout>
          <Login />
        </RegisterLayout>
      )
    }
  ])
  return routeElement
}
