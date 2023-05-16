import CartHeader from '../../components/CartHeader'
import Footer from '../../components/Footer'

interface MainLayoutProps {
  children: React.ReactNode
}
export default function CartLayout({ children }: MainLayoutProps) {
  return (
    <div>
      <CartHeader />
      {children}
      <Footer />
    </div>
  )
}
