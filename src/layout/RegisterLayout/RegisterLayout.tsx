import React from 'react'
import RegisterHeader from '../../components/RegisterHeader'
import Footer from '../../components/Footer'
interface RegisterProps {
  children?: React.ReactNode
}
export default function RegisterLayout({ children }: RegisterProps) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}
