import { useState } from 'react'
import Reveal from './Reveal.jsx'
import useActiveCards from '../hooks/useActiveCards.js'

const CERTS = [
  { file: 'modello-231.pdf', group: 'Governance', title: 'Modello organizzativo 231', tag: 'Organizzazione, gestione e controllo', desc: 'Il modello aziendale ai sensi del D.Lgs. 231/2001: principi, responsabilità e procedure di controllo.', reference: 'D.Lgs. 231/2001', edition: 'Approvato il 16.02.2024' },
  { file: 'iso-9001.pdf', group: 'Gestione', title: 'ISO 9001:2015', tag: 'Qualità', desc: 'Sistema di gestione per la qualità.', number: 'QMS-020317073-25', validUntil: '27.03.2028' },
  { file: 'iso-14001.pdf', group: 'Gestione', title: 'ISO 14001:2015', tag: 'Ambiente', desc: 'Sistema di gestione ambientale.', number: 'EMS-020317073-25', validUntil: '27.03.2028' },
  { file: 'iso-45001.pdf', group: 'Gestione', title: 'ISO 45001:2018', tag: 'Salute e sicurezza', desc: 'Sistema di gestione della salute e sicurezza sul lavoro.', number: 'HMS-020317073-25', validUntil: '27.03.2028' },
  { file: 'iso-37001.pdf', group: 'Gestione', title: 'UNI ISO 37001:2016', tag: 'Anticorruzione', desc: 'Sistema di gestione per la prevenzione della corruzione.', number: 'ABMS-080117840-25', validUntil: '05.09.2028' },
  { file: 'iso-39001.pdf', group: 'Gestione', title: 'ISO 39001:2012', tag: 'Sicurezza stradale', desc: 'Sistema di gestione della sicurezza del traffico stradale.', number: 'RTS-080117837-25', validUntil: '03.09.2028' },
  { file: 'iso-50001.pdf', group: 'Gestione', title: 'ISO 50001:2018', tag: 'Energia', desc: 'Sistema di gestione dell’energia.', number: '0442E2026', validUntil: '20.04.2029' },
  { file: 'pas-24000.pdf', group: 'Gestione', title: 'PAS 24000:2022', tag: 'Responsabilità sociale', desc: 'Sistema di gestione sociale.', number: 'PAS-020220045-26', validUntil: '18.03.2027' },
  { file: 'parita-genere.pdf', group: 'Gestione', title: 'UNI/PdR 125:2022', tag: 'Parità di genere', desc: 'Sistema di gestione per la parità di genere nel contesto lavorativo.', number: 'PG 3529', validUntil: '03.09.2028' },
  { file: 'esg-labex.pdf', group: 'Gestione', title: 'ESG-LABEX', tag: 'Rating AAA/AAA−', desc: 'Score 80 e 13 Obiettivi di Sviluppo Sostenibile raggiunti.', number: 'OMS-020220044-26', validUntil: '18.03.2027' },
  { file: 'remade.pdf', group: 'Prodotti ecologici', title: 'ReMade®', tag: 'Contenuto riciclato', desc: 'Certificazione ReMade® dei conglomerati bituminosi. Consulta il documento e il relativo campo di applicazione.', number: '1591/001 rev.0', validUntil: '01.04.2029' },
  { file: 'soa-og3.pdf', group: 'Qualificazioni', title: 'SOA OG 3 · II', tag: 'Lavori pubblici', desc: 'Qualificazione per strade, autostrade, ponti, viadotti e relative opere complementari.', number: '109951/31/00', validUntil: '15.07.2030' },
]

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12l2 2 4-4" />
      <path d="M12 3l7 3v6c0 4-3 7-7 8-4-1-7-4-7-8V6z" />
    </svg>
  )
}

const FILTERS = ['Tutte', 'Prodotti ecologici', 'Gestione', 'Qualificazioni', 'Governance']

export default function Certificazioni() {
  const [filter, setFilter] = useState('Tutte')
  const certificates = [...CERTS].sort((a, b) => Number(b.group === 'Prodotti ecologici') - Number(a.group === 'Prodotti ecologici')).filter(cert => filter === 'Tutte' || cert.group === filter)
  const { activeIndex, propsFor } = useActiveCards(certificates.length)
  return (
    <section className="section certifications-section" id="certificazioni">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">Documenti pubblici · Accesso diretto</span>
          <h2 className="section-title">La qualità si può<br /><span className="out">consultare.</span></h2>
          <p className="section-intro">Certificazioni dei prodotti ecologici, sistemi di gestione, qualificazioni aziendali e modello organizzativo 231. Apri i documenti e scopri cosa c’è dietro ogni impegno.</p>
        </Reveal>
        <div className="cert-filters" role="group" aria-label="Filtra le certificazioni">
          {FILTERS.map(item => <button type="button" key={item} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}
        </div>
        <p className="sr-only" role="status">{certificates.length} documenti disponibili</p>
        <div className="cert-grid">
          {certificates.map((cert, index) => (
            <Reveal className={`cert-card${cert.group === 'Prodotti ecologici' ? ' cert-card-featured' : ''}${activeIndex === index ? ' is-active' : ''}`} key={`${filter}-${cert.title}`} delay={(index % 4) * 0.05} {...propsFor(index)}>
              <div className="cert-card-top">
                <div className="cert-badge" aria-hidden="true"><ShieldIcon /></div>
                <span className="cert-valid">{cert.validUntil ? `fino al ${cert.validUntil}` : cert.edition}</span>
              </div>
              <h3>{cert.title}</h3>
              <p className="cert-tag">{cert.tag}</p>
              <p>{cert.desc}</p>
              <p className="cert-number">{cert.reference || `Certificato ${cert.number}`}</p>
              <a className="cert-download" href={`${import.meta.env.BASE_URL}certificazioni/${cert.file}`} target="_blank" rel="noreferrer" aria-label={`Apri documento ${cert.title} (PDF, nuova scheda)`}>Apri il PDF <span aria-hidden="true">↗</span></a>
            </Reveal>
          ))}
        </div>
        <Reveal className="legality-card">
          <div><span className="eyebrow">Trasparenza d’impresa</span><h3>Rating di Legalità</h3><p>Consulta la comunicazione AGCM di rinnovo del Rating di Legalità del 13 maggio 2026, protocollo 0056161 del 14 maggio 2026.</p></div>
          <a className="text-link" href={`${import.meta.env.BASE_URL}certificazioni/rating-legalita-agcm.pdf`} target="_blank" rel="noreferrer">Apri il documento AGCM (PDF) <span aria-hidden="true">↗</span><span className="sr-only"> (nuova scheda)</span></a>
        </Reveal>
        <p className="data-note">Validità indicate nei documenti ricevuti e soggette alle sorveglianze periodiche previste dai rispettivi organismi.</p>
      </div>
    </section>
  )
}
