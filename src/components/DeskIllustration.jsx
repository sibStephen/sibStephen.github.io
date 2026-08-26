import React from 'react'

const hotspots = [
  {
    key: 'work',
    href: '#work',
    label: 'See my work',
    labelX: 255, labelY: 316, labelW: 118,
    hit: { x: 172, y: 328, w: 156, h: 76 },
  },
  {
    key: 'github',
    href: 'https://github.com/sibStephen',
    external: true,
    label: 'GitHub',
    labelX: 52, labelY: 95, labelW: 76,
    hit: { x: 20, y: 40, w: 70, h: 40 },
  },
  {
    key: 'drupal',
    href: 'https://www.drupal.org/u/sibustephen',
    external: true,
    label: 'Drupal.org',
    labelX: 332, labelY: 175, labelW: 96,
    hit: { x: 306, y: 122, w: 70, h: 40 },
  },
  {
    key: 'writing',
    href: 'https://medium.com/@sibustephen_55060',
    external: true,
    label: 'Writing',
    labelX: 326, labelY: 267, labelW: 72,
    hit: { x: 346, y: 258, w: 62, h: 78 },
  },
  {
    key: 'about',
    href: '#about',
    label: 'About me',
    labelX: 78, labelY: 305, labelW: 80,
    hit: { x: 30, y: 300, w: 90, h: 160 },
  },
  {
    key: 'ai',
    href: '#ai',
    label: 'AI profile',
    labelX: 375, labelY: 191, labelW: 90,
    hit: { x: 356, y: 196, w: 48, h: 48 },
  },
]

function HotspotTip({ h }) {
  return (
    <g className="hotspot-tip" aria-hidden="true">
      <rect x={h.labelX - h.labelW / 2} y={h.labelY - 16} width={h.labelW} height={22} rx={8} />
      <text x={h.labelX} y={h.labelY}>{h.label}</text>
    </g>
  )
}

function Hotspot({ h, children }) {
  const linkProps = h.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <a href={h.href} className="hotspot" aria-label={h.label} {...linkProps}>
      <rect className="hotspot-hit" x={h.hit.x} y={h.hit.y} width={h.hit.w} height={h.hit.h} />
      <g className="hotspot-visual">{children}</g>
      <HotspotTip h={h} />
    </a>
  )
}

export default function DeskIllustration() {
  return (
    <svg
      className="desk-illustration"
      viewBox="0 0 440 480"
      role="img"
      aria-label="Illustration of Sibu at his desk. The laptop, plant, mug and floating icons are links — hover or focus them for his work, writing and profiles."
    >
      <defs>
        <clipPath id="torsoClip">
          <path d="M238 236 C 214 246 208 276 214 312 C 216 336 244 344 272 340 C 300 336 312 312 308 282 C 304 250 274 226 238 236 Z" />
        </clipPath>
      </defs>

      <circle className="desk-blob" cx="256" cy="220" r="140" />

      <Hotspot h={hotspots[1]}>
        <text x="46" y="70" className="desk-glyph desk-float desk-float-a">{'</>'}</text>
      </Hotspot>
      <Hotspot h={hotspots[2]}>
        <text x="330" y="150" className="desk-glyph desk-float desk-float-b">{'{ }'}</text>
      </Hotspot>
      <Hotspot h={hotspots[5]}>
        <path d="M368 210 l6 14 14 6 -14 6 -6 14 -6-14 -14-6 14-6 z" className="desk-spark desk-float desk-float-c" />
      </Hotspot>

      <Hotspot h={hotspots[4]}>
        <g className="desk-plant">
          <path d="M56 452 L100 452 L94 410 L62 410 Z" className="desk-pot" />
          <g className="leaf leaf-1"><path d="M78 410 C 58 380 58 340 84 320 C 96 356 92 388 78 410 Z" /></g>
          <g className="leaf leaf-2"><path d="M78 410 C 108 392 122 356 108 322 C 82 342 70 378 78 410 Z" /></g>
          <g className="leaf leaf-3"><path d="M78 410 C 60 402 40 378 44 348 C 70 356 82 380 78 410 Z" /></g>
        </g>
      </Hotspot>

      <rect x="150" y="392" width="230" height="16" rx="6" className="desk-shadow" />

      <g className="chair-sway">
        <path d="M232 208 C 300 208 316 240 316 300 L316 420" className="chair-back" fill="none" />
        <rect x="216" y="300" width="108" height="20" rx="8" className="chair-seat" />
        <path d="M224 320 L214 400 M316 320 L326 400" className="chair-leg" fill="none" />

        <g className="character-breathe">
          <path d="M226 330 L214 396 L232 396 L242 336 Z" className="leg-fill" />
          <path d="M280 330 L296 394 L314 394 L300 332 Z" className="leg-fill" />
          <ellipse cx="220" cy="400" rx="14" ry="7" className="shoe" />
          <ellipse cx="302" cy="398" rx="14" ry="7" className="shoe" />

          <path d="M238 236 C 214 246 208 276 214 312 C 216 336 244 344 272 340 C 300 336 312 312 308 282 C 304 250 274 226 238 236 Z" className="torso" />
          <g className="plaid" clipPath="url(#torsoClip)" aria-hidden="true">
            <path d="M220 236 L220 344 M240 232 L240 344 M262 230 L262 342 M284 232 L284 340 M304 244 L304 336" className="plaid-line" />
            <path d="M212 254 L310 254 M210 274 L312 274 M212 294 L310 294 M214 314 L308 314 M218 332 L302 332" className="plaid-line" />
          </g>

          <path d="M232 258 C 206 264 178 292 176 328 C 190 334 202 328 210 314 C 214 296 222 276 238 264 Z" className="arm" />
          <path d="M282 258 C 306 266 322 292 320 322 C 306 330 292 324 284 310 C 280 292 274 274 262 262 Z" className="arm" />
          <circle cx="182" cy="326" r="11" className="hand hand-left" />
          <circle cx="316" cy="318" r="11" className="hand hand-right" />

          <circle cx="256" cy="200" r="46" className="head" />
          <path d="M210 196 C 204 156 232 128 260 130 C 292 132 312 158 306 194 C 300 176 292 168 280 172 C 270 152 244 150 232 168 C 218 174 212 184 210 196 Z" className="hair" />
          <circle cx="228" cy="176" r="7" className="curl" />
          <circle cx="252" cy="164" r="7" className="curl" />
          <circle cx="278" cy="170" r="7" className="curl" />
          <circle cx="296" cy="186" r="6" className="curl" />

          <path d="M214 208 C 210 236 228 259 256 259 C 284 259 302 236 298 208 C 288 223 272 231 256 231 C 240 231 224 223 214 208 Z" className="beard" />

          <g className="glasses">
            <circle cx="240" cy="203" r="15" />
            <circle cx="272" cy="203" r="15" />
            <path d="M255 202 L257 202" />
            <path d="M225 200 L211 197" />
            <path d="M287 200 L301 197" />
          </g>

          <g className="eyes">
            <ellipse cx="240" cy="204" rx="4" ry="5.5" />
            <ellipse cx="272" cy="204" rx="4" ry="5.5" />
          </g>
          <path d="M244 222 C 250 227 262 227 268 222" className="smile" fill="none" />
        </g>
      </g>

      <Hotspot h={hotspots[3]}>
        <g className="desk-mug">
          <path className="steam steam-1" d="M362 300 C 356 292 368 284 362 274" fill="none" />
          <path className="steam steam-2" d="M376 300 C 370 290 382 284 376 272" fill="none" />
          <rect x="356" y="300" width="30" height="26" rx="6" className="mug-body" />
          <path d="M386 306 C 398 306 398 322 386 322" className="mug-handle" fill="none" />
        </g>
      </Hotspot>

      <Hotspot h={hotspots[0]}>
        <g className="desk-laptop">
          <rect x="180" y="384" width="140" height="10" rx="3" className="laptop-base" />
          <path d="M190 384 L200 336 L300 336 L310 384 Z" className="laptop-screen" />
          <rect className="screen-glow" x="204" y="342" width="92" height="38" rx="4" />
          <rect className="code-line" x="210" y="350" width="46" height="4" rx="2" />
          <rect className="code-line" x="210" y="359" width="66" height="4" rx="2" />
          <rect className="code-line" x="210" y="368" width="30" height="4" rx="2" />
          <rect className="cursor-blink" x="244" y="368" width="6" height="4" />
        </g>
      </Hotspot>
    </svg>
  )
}
