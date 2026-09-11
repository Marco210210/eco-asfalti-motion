import { motion, useScroll, useSpring } from 'framer-motion'
import Cursor from './components/Cursor.jsx'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import Manifesto from './components/Manifesto.jsx'
import ProfiloAzienda from './components/ProfiloAzienda.jsx'
import Produzione from './components/Produzione.jsx'
import Recupero from './components/Recupero.jsx'
import Realizzazioni from './components/Realizzazioni.jsx'
import Reveal from './components/Reveal.jsx'
import ImpiantoGallery from './components/ImpiantoGallery.jsx'
import MaterialiScroll from './components/MaterialiScroll.jsx'
import Paver from './components/Paver.jsx'
import Servizi from './components/Servizi.jsx'
import Certificazioni from './components/Certificazioni.jsx'
import Faq from './components/Faq.jsx'
import CtaBanner from './components/CtaBanner.jsx'
import Contatti from './components/Contatti.jsx'
import Footer from './components/Footer.jsx'
import AuthGate from './components/AuthGate.jsx'
import MobileStickyCta from './components/MobileStickyCta.jsx'
import AnalyticsConsent from './components/AnalyticsConsent.jsx'

const MARQUEE_ITEMS = ['Conglomerati bituminosi', 'Prodotti CAM', 'Materie prime secondarie', 'Miscele ReMade®', 'Qualità certificata']
const ACCESS_GATE_ENABLED = import.meta.env.VITE_ENABLE_ACCESS_GATE === 'true'

export default function App() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 })

  const content = (
    <>
      <Cursor />
      <motion.div className="scroll-progress" style={{ scaleX }} />
      <Header />
      <MobileStickyCta />
      <main>
        <Hero />
        <Marquee items={MARQUEE_ITEMS} direction={1} duration={24} className="ink" />
        <Manifesto />
        <Servizi />
        <section id="produzione" aria-labelledby="produzione-title">
          <Produzione />
          <MaterialiScroll />
          <ImpiantoGallery />
          <Certificazioni />
        </section>
        <Marquee items={MARQUEE_ITEMS} direction={-1} duration={30} className="outline skew" />
        <Recupero />
        <section id="pavimentazioni" aria-labelledby="pavimentazioni-title">
          <div className="section paving-intro">
            <div className="container">
              <Reveal className="section-head">
                <span className="eyebrow">03 / Esecuzione lavori di pavimentazione</span>
                <h2 className="section-title" id="pavimentazioni-title">A completamento<br /><span className="out">della filiera.</span></h2>
                <p className="section-intro">La produzione viene prima. Al suo fianco, eseguiamo lavori di pavimentazione e manutenzione stradale con squadre e mezzi dedicati: un servizio complementare per dare continuità alla qualità dei nostri materiali.</p>
              </Reveal>
            </div>
          </div>
          <Paver />
          <Realizzazioni />
        </section>
        <ProfiloAzienda />
        <Faq />
        <CtaBanner />
        <Contatti />
      </main>
      <Footer />
      <AnalyticsConsent />
    </>
  )

  return ACCESS_GATE_ENABLED ? <AuthGate>{content}</AuthGate> : content
}
