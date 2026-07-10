import { useRef, useState } from 'react'
import Reveal from './Reveal.jsx'

export default function Contatti() {
  const formRef = useRef(null)
  const [feedback, setFeedback] = useState({ msg: '', ok: true })

  const handleSubmit = (e) => {
    e.preventDefault()
    const form = formRef.current
    if (!form.checkValidity()) {
      form.querySelector(':invalid')?.focus()
      setFeedback({ msg: 'Compila i campi obbligatori per inviare la richiesta.', ok: false })
      return
    }
    setFeedback({ msg: 'Grazie! Ti ricontatteremo al più presto.', ok: true })
    form.reset()
  }

  return (
    <section className="section" id="contatti">
      <div className="container contatti-grid">
        <Reveal className="contatti-info">
          <span className="eyebrow">Contatti</span>
          <h2 className="section-title">Parliamone</h2>
          <ul className="contact-list">
            <li><span className="contact-label">Sede &amp; Impianto</span><span className="contact-value">Via dell'Industria 24, 00000 Città (IT)</span></li>
            <li><span className="contact-label">Telefono</span><a className="contact-value" href="tel:+390000000000">+39 000 000 0000</a></li>
            <li><span className="contact-label">Email</span><a className="contact-value" href="mailto:info@ecoasfalti.it">info@ecoasfalti.it</a></li>
            <li><span className="contact-label">Orari</span><span className="contact-value">Lun&ndash;Ven &middot; 7:30 &ndash; 18:00</span></li>
          </ul>
        </Reveal>

        <Reveal className="contact-form" as="form" delay={0.1} ref={formRef} onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label htmlFor="nome">Nome e cognome <span className="req" aria-hidden="true">*</span></label>
            <input type="text" id="nome" name="nome" autoComplete="name" required />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="email">Email <span className="req" aria-hidden="true">*</span></label>
              <input type="email" id="email" name="email" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="tel">Telefono</label>
              <input type="tel" id="tel" name="tel" autoComplete="tel" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="messaggio">Descrivi il tuo progetto <span className="req" aria-hidden="true">*</span></label>
            <textarea id="messaggio" name="messaggio" rows="4" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary full">Invia richiesta</button>
          <p className="form-feedback" role="status" aria-live="polite" style={{ color: feedback.ok ? '#4ade80' : '#f87171' }}>{feedback.msg}</p>
        </Reveal>
      </div>
    </section>
  )
}
