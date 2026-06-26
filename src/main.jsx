import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/main.scss'
import { CartProvider } from './context/CartProvider.jsx'
import { RouterProvider } from 'react-router-dom'
import AppRouter from './router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={AppRouter} />
    </CartProvider>
  </StrictMode>,
)
