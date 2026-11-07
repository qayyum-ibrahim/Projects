import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import './ProjectCard.css'

// Stable hue per project, so each fallback block keeps its color.
function hueFromId(id) {
  let hash = 0
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) % 360
  return hash
}

// Scroll speed of the full-page image, in pixels per second.
const SCROLL_SPEED = 80

export default function ProjectCard({ project, headingLevel = 3 }) {
  const { id, title, type, liveUrl } = project
  // Full-page screenshot, named after the project id (see npm run images).
  const imageUrl = `/images/${id}.jpg`
  const Heading = `h${headingLevel}`
  const cardRef = useRef(null)
  const imageRef = useRef(null)
  const canHover = useMediaQuery('(hover: hover)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const [active, setActive] = useState(false)
  const [near, setNear] = useState(false)
  const [started, setStarted] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [imageFailed, setImageFailed] = useState(false)
  const [distance, setDistance] = useState(0)

  const showImage = !imageFailed

  // Load the image only once the card comes near the screen.
  useEffect(() => {
    if (!showImage) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNear(entry.isIntersecting)
        if (entry.isIntersecting) setStarted(true)
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [showImage])

  // How far the image can scroll: its height minus the card height.
  useEffect(() => {
    if (!loaded) return
    const measure = () => {
      const image = imageRef.current
      if (!image) return
      setDistance(Math.max(0, image.offsetHeight - cardRef.current.clientHeight))
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [loaded])

  const scrolling = loaded && distance > 0 && !reducedMotion
  // Down and back up, plus a short rest at each end (30% of the loop).
  const duration = (2 * distance) / SCROLL_SPEED / 0.7

  // Touch: a tap outside the card hides the overlay.
  useEffect(() => {
    if (!active) return
    function onPointerDown(event) {
      if (!cardRef.current.contains(event.target)) setActive(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [active])

  function handleClick() {
    if (!canHover) setActive(true)
  }

  return (
    <article
      ref={cardRef}
      className={`project-card${active ? ' is-active' : ''}`}
      style={{ '--hue': hueFromId(id) }}
      onClick={handleClick}
    >
      <div className="project-card-media" aria-hidden="true">
        <div className="project-card-fallback">
          <span>{title}</span>
        </div>
        {showImage && started && (
          <img
            ref={imageRef}
            className={`project-card-image${loaded ? ' is-loaded' : ''}${scrolling ? ' is-scrolling' : ''}`}
            style={
              scrolling
                ? {
                    '--scroll-distance': `${distance}px`,
                    '--scroll-duration': `${duration}s`,
                    animationPlayState: near ? 'running' : 'paused',
                  }
                : undefined
            }
            src={imageUrl}
            alt=""
            decoding="async"
            onLoad={() => setLoaded(true)}
            onError={() => setImageFailed(true)}
          />
        )}
      </div>

      <div className="project-card-overlay">
        <Heading className="project-card-title">{title}</Heading>
        <p className="project-card-type">{type}</p>
        <a
          className="project-card-link"
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${title} live site (opens in a new tab)`}
        >
          Visit live site
        </a>
      </div>
    </article>
  )
}
