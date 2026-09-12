import Reveal from './Reveal.jsx'

const IMAGE_BASE = `${import.meta.env.BASE_URL}images/`

const PHOTOS = [
  { src: `${IMAGE_BASE}impianto-01.webp`, alt: "Vista zenitale dell'impianto e delle aree di stoccaggio", label: 'Stoccaggio degli aggregati' },
  { src: `${IMAGE_BASE}impianto-03.webp`, alt: "Vista ravvicinata dell'impianto Eco Asfalti e dei silos", label: "Cuore dell'impianto" },
  { src: `${IMAGE_BASE}impianto-04.webp`, alt: "Vista aerea della linea di produzione Eco Asfalti", label: 'Linea di produzione' },
  { src: `${IMAGE_BASE}impianto-06.webp`, alt: "Impianto Eco Asfalti nel contesto urbano di Nocera Superiore", label: 'Impianto e territorio' },
]

export default function ImpiantoGallery() {
  return (
    <section className="section plant-gallery" id="impianto">
      <div className="container">
        <Reveal className="section-head">
          <span className="eyebrow">L'impianto</span>
          <h2 className="section-title">Dentro la <span className="out">produzione.</span></h2>
          <p className="section-intro">Il sito di Nocera Superiore riunisce produzione e recupero: un impianto, un ciclo che valorizza la materia.</p>
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
