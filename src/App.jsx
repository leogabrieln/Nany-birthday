import { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import Home from './pages/Home'
import Invitation from './pages/Invitation'

export default function App() {
  const location = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [location.pathname])
  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Invitation />} />
          <Route path="/convite" element={<Invitation />} />
          <Route path="*" element={<Invitation to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </Layout>
  )
}
