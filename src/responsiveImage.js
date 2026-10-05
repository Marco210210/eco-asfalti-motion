const BASE = import.meta.env.BASE_URL
export function responsiveImage(src, sizes = '(max-width: 760px) 100vw, 50vw') {
  const name = src.split('/').pop().replace(/\.[^.]+$/, '')
  const widths = name === 'eco-asfalti-logo' ? [120, 240] : name.endsWith('-editoriale') ? [480, 640, 960] : [480, 640, 960, 1600]
  return {
    src: `${BASE}images/optimized/${name}-${widths[0]}.webp`,
    srcSet: widths.map(width => `${BASE}images/optimized/${name}-${width}.webp ${width}w`).join(', '),
    sizes,
  }
}
