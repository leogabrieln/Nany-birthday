import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Heart } from 'lucide-react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { img } from '../data'

export default function Layout({ children }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 24 })
  const location = useLocation()
  return (
    <div className="site-shell">
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <header className="topbar">
        {/* <Link to="/" className="brand"> */}
          <img src={img('convite/star1.png')} alt="" className="brand-star" />
          <span>FESTA<b> · </b>NANY</span>
        {/* </Link>
        {location.pathname === '/convite' && <Link to="/" className="nav-link"><ArrowLeft size={15} /><span>Voltar ao início</span></Link>} */}
      </header>
      <main>{children}</main>
      <footer className="footer">
        {/* <span>FEITO COM <Heart size={12} fill="currentColor" /> PARA A NANY</span> */}
        {/* <span>20 DE NOVEMBRO · VENHA CELEBRAR</span> */}
      </footer>
    </div>
  )
}
