import Header from '../components/Header'
import FloatingAddWidget from '../components/FloatingAddWidget'
import FloatingMessage from '../components/FloatingMessage'
export default function MainLayout({children}) {
  return (
    <>
      <Header />
      <FloatingMessage />
      <FloatingAddWidget />
      <div className="pt-16">
        {children}
      </div>
    </>
  )
}
