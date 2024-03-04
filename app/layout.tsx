import NavBar from './components/nav/NavBar'
import Footer from './components/footer/Footer'
import './globals.css'
import { Poppins } from 'next/font/google'
import CartProvider from '@/providers/CartProvider'
import { Toaster } from 'react-hot-toast'

const poppins = Poppins({ subsets: ['latin'], weight: ["400", "700"] })

export const metadata = {
  title: 'GAGE-HERE',
  description: 'Online Shop Ecommerce App',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-slate-700`}>
        <Toaster toastOptions={{
          style: {
            background: 'white',
            color: 'blue'
          }
        }} />
        <CartProvider>
          <div className='flex flex-col min-h-screen '>
            <NavBar />
            <main className=' flex-grow'>
              {children}
            </main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
