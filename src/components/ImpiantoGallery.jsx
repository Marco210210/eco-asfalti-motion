import Reveal from './Reveal.jsx'

const IMAGE_BASE = `${import.meta.env.BASE_URL}images/`

const PHOTOS = [
  { src: `${IMAGE_BASE}impianto-01.webp`, alt: "Vista zenitale dell'impianto e delle aree di stoccaggio", label: 'Impianto e stoccaggi' },
  { src: `${IMAGE_BASE}impianto-02.webp`, alt: "Vista aerea dell'impianto con mezzi in ingresso e in uscita", label: 'Flussi operativi' },
  { src: `${IMAGE_BASE}impianto-03.webp`, alt: 'Vista ravvicinata dei silos e delle tramogge degli aggregati', label: 'Aggregati e dosaggio' },
  { src: `${IMAGE_BASE}impianto-04.webp`, alt: "Vista aerea dell'area produttiva Eco Asfalti", label: 'Area produttiva' },
  { src: `${IMAGE_BASE}impianto-05.webp`, alt: 'Impianto Eco Asfalti visto dal lato dei capannoni', label: 'Ciclo di produzione' },
  { src: `${IMAGE_BASE}impianto-06.webp`, alt: "Impianto Eco Asfalti nel contesto urbano di Nocera Superiore", label: 'Territorio e infrastrutture' },
]

export default function ImpiantoGallery() {
  return (
    <section className="section plant-gallery" id="impianto">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">L'impianto</span>
          <h2 className="section-title">Dentro la <span className="out">produzione.</span></h2>
          <p className="section-intro">Sei prospettive reali del sito produttivo di Nocera Superiore.</p>
        </Reveal>

        <div className="plant-gallery-grid">
          {PHOTOS.map((photo, index) => (
            <Reveal className={`plant-shot plant-shot-${index + 1}`} key={photo.src} delay={index * 0.04}>
              <figure>
                <img src={photo.src} alt={photo.alt} width="2200" height="1238" loading="lazy" />
                <figcaption><span>0{index + 1}</span>{photo.label}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
