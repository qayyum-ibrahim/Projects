import { useEffect, useRef, useState } from 'react'
import { useMediaQuery } from '../hooks/useMediaQuery.js'
import './ProjectCard.css'

// Stable hue per project, so each fallback block keeps its color.
function hueFromId(id) {
  let hash = 0
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) % 360
  return hash
}

export default function ProjectCard({ project }) {
  const { id, title, type, liveUrl, videoUrl, posterUrl } = project
  const cardRef = useRef(null)
  const videoRef = useRef(null)
  const canHover = useMediaQuery('(hover: hover)')
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')

  const [active, setActive] = useState(false)
  const [near, setNear] = useState(false)
  const [started, setStarted] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [posterFailed, setPosterFailed] = useState(false)

  const showVideo = Boolean(videoUrl) && !reducedMotion && !videoFailed
  const showPoster = !showVideo && Boolean(posterUrl) && !posterFailed

  // Load the video only once the card comes near the screen.
  useEffect(() => {
    if (!showVideo) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        setNear(entry.isIntersecting)
        if (entry.isIntersecting) setStarted(true)
      },
      { rootMargin: '200px 0px' },
    )
    observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [showVideo])

  // Play while near the screen, pause when it leaves.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (near) video.play().catch(() => {})
    else video.pause()
  }, [near, started])

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
        {showVideo && started && (
          <video
            ref={videoRef}
            className="project-card-video"
            src={videoUrl}
            poster={posterUrl}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            onError={() => setVideoFailed(true)}
          />
        )}
        {showPoster && (
          <img
            className="project-card-video"
            src={posterUrl}
            alt=""
            loading="lazy"
            onError={() => setPosterFailed(true)}
          />
        )}
      </div>

      <div className="project-card-overlay">
        <h3 className="project-card-title">{title}</h3>
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
