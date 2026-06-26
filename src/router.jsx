import { lazy } from 'react'
import { createBrowserRouter, useParams } from 'react-router-dom'
import Layout from './layouts/Layout'

const PhoneListPage = lazy(() => import('./pages/PhoneListPage'))
const PhoneDetailsPage = lazy(() => import('./pages/PhoneDetailsPage'))
const CartPage = lazy(() => import('./pages/CartPage'))

function PhoneDetailsRoute() {
  const { id } = useParams()
  return <PhoneDetailsPage key={id} />
}

const AppRouter = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <PhoneListPage />,
        index: true,
      },
      {
        path: '/phones/:id',
        element: <PhoneDetailsRoute />,
      },
      {
        path: '/cart',
        element: <CartPage />,
      },
    ],
  },
])

export default AppRouter
