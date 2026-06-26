import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import CartIcon from '../components/layout/CartIcon'
import Logo from '../components/layout/Logo'

export default function Layout() {
  return (
    <>
      <header>
        <Logo />
        <CartIcon />
      </header>
      <main className="main-content">
        <Suspense fallback={<p>Loading...</p>}>
          <Outlet />
        </Suspense>
      </main>
    </>
  )
}
