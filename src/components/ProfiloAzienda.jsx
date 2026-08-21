import Reveal from './Reveal.jsx'

const PROFILE_IMAGE = `${import.meta.env.BASE_URL}images/impianto-03.webp`

const COMPANY_FACTS = [
  { label: 'Sede legale e operativa', value: 'Via Alveo Santa Croce 46, 84015 Nocera Superiore (SA)' },
  { label: 'Codice fiscale e P. IVA', value: '06052780654' },
  { label: 'Registro Imprese', value: 'REA SA-493642' },
  { label: 'Governance', value: 'Modello 231, Codice Etico, OdV e whistleblowing' },
]

export default function ProfiloAzienda() {
  return (
    <section className="section company-profile" id="azienda">
      <div className="container company-profile-grid">
        <Reveal className="company-photo-wrap">
          <img
            className="company-photo"
            src={PROFILE_IMAGE}
            alt="Vista aerea dell'impianto Eco Asfalti a Nocera Superiore"
            width="2200"
            height="1238"
            loading="lazy"
          />
          <span className="company-photo-label">Nocera Superiore · SA</span>
        </Reveal>

        <Reveal className="company-copy" delay={0.08}>
          <span className="eyebrow">Profilo aziendale</span>
          <h2 className="section-title">Un ciclo <span className="out">completo.</span></h2>
          <p className="company-lead">
            Eco Asfalti produce conglomerati bituminosi, recupera rifiuti non pericolosi e materiali
            provenienti dalla fresatura delle pavimentazioni, noleggia mezzi meccanici e svolge
            manutenzione stradale.
          </p>
          <p>
            Produzione e recupero convivono nello stesso sito operativo: il fresato torna risorsa,
            le miscele sono controllate e ogni attività è inserita in un sistema di gestione
            certificato per qualità, ambiente, sicurezza, energia, responsabilità sociale e governance.
          </p>

          <dl className="company-facts">
            {COMPANY_FACTS.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
          <div className="company-governance">
            <strong>Responsabilità d'impresa</strong>
            <p>Modello di Organizzazione, Gestione e Controllo ex D.Lgs. 231/2001, revisione 1 del 14 febbraio 2023 e approvazione del 16 febbraio 2024.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
