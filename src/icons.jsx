import React from 'react'
const Svg = ({ children, size = 20, ...props }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{children}</svg>
export const ArrowRight = p => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6"/></Svg>
export const ArrowUpRight = p => <Svg {...p}><path d="M7 17 17 7M7 7h10v10"/></Svg>
export const Github = p => <Svg {...p}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3.5S18.2.1 15 2a13.4 13.4 0 0 0-7 0C4.8.1 3.7.5 3.7.5A5 5 0 0 0 3.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4M8 19c-3 .9-3-1.5-4-2"/></Svg>
export const Menu = p => <Svg {...p}><path d="M4 6h16M4 12h16M4 18h16"/></Svg>
export const X = p => <Svg {...p}><path d="m6 6 12 12M18 6 6 18"/></Svg>
export const Sun = p => <Svg {...p}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></Svg>
export const Moon = p => <Svg {...p}><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z"/></Svg>
export const Search = p => <Svg {...p}><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></Svg>
export const Mic2 = p => <Svg {...p}><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3"/></Svg>
export const Headphones = p => <Svg {...p}><path d="M4 13a8 8 0 0 1 16 0M4 13v6a2 2 0 0 0 2 2h1v-8H4ZM20 13v6a2 2 0 0 1-2 2h-1v-8h3Z"/></Svg>
export const BookOpen = p => <Svg {...p}><path d="M2 4h6a4 4 0 0 1 4 4v12a3 3 0 0 0-3-3H2Z"/><path d="M22 4h-6a4 4 0 0 0-4 4v12a3 3 0 0 1 3-3h7Z"/></Svg>
export const Code2 = p => <Svg {...p}><path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16"/></Svg>
export const ChevronLeft = p => <Svg {...p}><path d="m15 18-6-6 6-6"/></Svg>
export const ChevronRight = p => <Svg {...p}><path d="m9 18 6-6-6-6"/></Svg>
