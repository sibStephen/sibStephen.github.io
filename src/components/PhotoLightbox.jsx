import React, { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight, X } from '../icons'

export default function PhotoLightbox({ images, index, onClose, onIndexChange }) {
  const closeBtnRef = useRef(null)
  const triggerFocusRef = useRef(document.activeElement)

  useEffect(() => {
    closeBtnRef.current?.focus()
    const previouslyFocused = triggerFocusRef.current
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
      previouslyFocused?.focus?.()
    }
  }, [])

  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onIndexChange((index + 1) % images.length)
      if (e.key === 'ArrowLeft') onIndexChange((index - 1 + images.length) % images.length)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [index, images.length, onClose, onIndexChange])

  const current = images[index]

  return (
    <div className="lightbox-overlay" onMouseDown={onClose}>
      <div
        className="lightbox-dialog"
        role="dialog"
        aria-modal="true"
        aria-label={`${current.caption} — photo ${index + 1} of ${images.length}`}
        onMouseDown={e => e.stopPropagation()}
      >
        <button ref={closeBtnRef} type="button" className="lightbox-close" onClick={onClose} aria-label="Close gallery">
          <X size={20} />
        </button>

        <button
          type="button"
          className="lightbox-nav lightbox-prev"
          onClick={() => onIndexChange((index - 1 + images.length) % images.length)}
          aria-label="Previous photo"
        >
          <ChevronLeft size={26} />
        </button>

        <figure className="lightbox-figure">
          <img src={current.src} alt={current.alt} />
          <figcaption>{current.caption}</figcaption>
        </figure>

        <button
          type="button"
          className="lightbox-nav lightbox-next"
          onClick={() => onIndexChange((index + 1) % images.length)}
          aria-label="Next photo"
        >
          <ChevronRight size={26} />
        </button>

        <div className="lightbox-dots" role="tablist" aria-label="Choose a photo">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              className={i === index ? 'dot active' : 'dot'}
              onClick={() => onIndexChange(i)}
              aria-label={`${img.caption} — photo ${i + 1} of ${images.length}`}
              aria-selected={i === index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
