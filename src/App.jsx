import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useScroll, useSpring } from 'framer-motion'
import Preloader from './components/Preloader.jsx'
import Cursor from './components/Cursor.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Manifesto from './components/Manifesto.jsx'
import Stats from './components/Stats.jsx'
import MaterialiScroll from './components/MaterialiScroll.jsx'
import Paver from './components/Paver.jsx'
import Servizi from './components/Servizi.jsx'
import Certificazioni from './components/Certificazioni.jsx'
import Realizzazioni from './components/Realizzazioni.jsx'
import Faq from './components/Faq.jsx'
import CtaBanner from './components/CtaBanner.jsx'
import Contatti from './components/Contatti.jsx'
import Footer from './components/Footer.jsx'
import AuthGate from './components/AuthGate.jsx'

const MARQUEE_ITEMS = ['Conglomerati bituminosi', 'Pavimentazioni', 'Materiali riciclati', 'Certificazione ISO', 'Manutenzione']

export default function App() {
  const [loading, setLoading] = useState(true)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  useEffect(() => {
    document.body.classList.toggle('preloading', loading)
  }, [loading])

  return (
    <AuthGate>
      <Cursor />
      <AnimatePresence>
        {loading && <Preloader key="pre" onDone={() => setLoading(false)} />}
      </AnimatePresence>

      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Header />
      <main>
        <Hero />
        <Marquee items={MARQUEE_ITEMS} direction={1} duration={24} className="ink" />
        <Manifesto />
        <Stats />
        <Marquee items={MARQUEE_ITEMS} direction={-1} duration={30} className="outline skew" />
        <MaterialiScroll />
        <Paver />
        <Servizi />
        <Certificazioni />
        <Realizzazioni />
        <Faq />
        <CtaBanner />
        <Contatti />
      </main>
      <Footer />
    </AuthGate>
  )
}
