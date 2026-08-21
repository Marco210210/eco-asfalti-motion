import { useRef, useState } from 'react'
import Reveal from './Reveal.jsx'

export default function Contatti() {
  const formRef = useRef(null)
  const [feedback, setFeedback] = useState({ msg: '', ok: true })
  const [submitting, setSubmitting] = useState(false)
  const endpoint = `${import.meta.env.BASE_URL}api/contact.php`

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = formRef.current
    if (!form || submitting) return

    if (!form.checkValidity()) {
      form.querySelector(':invalid')?.focus()
      setFeedback({ msg: 'Compila i campi obbligatori per inviare la richiesta.', ok: false })
      return
    }

    setSubmitting(true)
    setFeedback({ msg: 'Invio della richiesta in corso…', ok: true })

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
        credentials: 'same-origin',
      })

      const payload = await response.json().catch(() => ({}))
      if (!response.ok || payload.ok !== true) {
        throw new Error(payload.message || 'Non è stato possibile inviare la richiesta. Riprova tra poco.')
      }

      form.reset()
      const startedAt = form.elements.namedItem('form_started_at')
      if (startedAt) startedAt.value = String(Math.floor(Date.now() / 1000))
      setFeedback({ msg: 'Grazie! La richiesta è stata inviata a info@ecoasfalti.it.', ok: true })
    } catch (error) {
      setFeedback({
        msg: error instanceof Error ? error.message : 'Non è stato possibile inviare la richiesta. Riprova tra poco.',
        ok: false,
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="section" id="contatti">
      <div className="container contatti-grid">
        <Reveal className="contatti-info">
          <span className="eyebrow">Contatti</span>
          <h2 className="section-title">Parliamone</h2>
          <ul className="contact-list">
            <li><span className="contact-label">Sede legale &amp; operativa</span><span className="contact-value">Via Alveo Santa Croce 46, 84015 Nocera Superiore (SA)</span></li>
            <li><span className="contact-label">Email</span><a className="contact-value" href="mailto:info@ecoasfalti.it">info@ecoasfalti.it</a></li>
            <li><span className="contact-label">C.F. / P. IVA</span><span className="contact-value">06052780654</span></li>
            <li><span className="contact-label">Registro Imprese</span><span className="contact-value">REA SA-493642</span></li>
          </ul>
        </Reveal>

        <Reveal
          className="contact-form"
          as="form"
          delay={0.1}
          ref={formRef}
          action={endpoint}
          method="post"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="form-trap" aria-hidden="true">
            <label htmlFor="website">Lascia vuoto questo campo</label>
            <input type="text" id="website" name="website" tabIndex="-1" autoComplete="off" />
          </div>
          <input type="hidden" name="form_started_at" defaultValue={Math.floor(Date.now() / 1000)} />
          <div className="field">
            <label htmlFor="nome">Nome e cognome <span className="req" aria-hidden="true">*</span></label>
            <input type="text" id="nome" name="nome" autoComplete="name" minLength="2" maxLength="100" required />
          </div>
          <div className="field-row">
            <div className="field">
              <label htmlFor="email">Email <span className="req" aria-hidden="true">*</span></label>
              <input type="email" id="email" name="email" autoComplete="email" maxLength="254" required />
            </div>
            <div className="field">
              <label htmlFor="tel">Telefono</label>
              <input type="tel" id="tel" name="tel" autoComplete="tel" maxLength="40" />
            </div>
          </div>
          <div className="field">
            <label htmlFor="messaggio">Descrivi il tuo progetto <span className="req" aria-hidden="true">*</span></label>
            <textarea id="messaggio" name="messaggio" rows="4" minLength="10" maxLength="5000" required></textarea>
          </div>
          <button type="submit" className="btn btn-primary full" disabled={submitting}>
            {submitting ? 'Invio in corso…' : 'Invia richiesta'}
          </button>
          <p className="form-feedback" role="status" aria-live="polite" style={{ color: feedback.ok ? '#4ade80' : '#f87171' }}>{feedback.msg}</p>
        </Reveal>
      </div>
    </section>
  )
}
