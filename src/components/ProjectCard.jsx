import React from 'react'
import { ArrowUpRight } from '../icons'

export default function ProjectCard({ project }) {
  return (
    <a className="project-card" href={project.url} target="_blank" rel="me noopener noreferrer">
      <div className="project-top">
        <span className="project-mark" aria-hidden="true">{project.accent}</span>
        <ArrowUpRight size={19} aria-hidden="true" />
      </div>
      <p className="label">{project.category}</p>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </a>
  )
}
