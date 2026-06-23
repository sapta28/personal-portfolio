import Link from 'next/link'
import { ExternalLink, ArrowUpRight } from 'lucide-react'

const GithubIcon = ({ size = 15 }: { size?: number }) => (
  <svg
    viewBox="0 0 24 24"
    width={size}
    height={size}
    stroke="currentColor"
    strokeWidth="2"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
)

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  content: string
  tech_stack: string[]
  thumbnail_url: string
  github_url?: string
  live_url?: string
  created_at: string
}

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="glass glass-hover rounded-quad overflow-hidden flex flex-col h-full group shadow-sm">
      {/* Thumbnail */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img
          src={project.thumbnail_url || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60'}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          <Link
            href={`/projects/${project.slug}`}
            className="flex items-center gap-1.5 px-4 py-2 bg-primary hover:bg-primary-hover text-white rounded-quad text-xs font-semibold shadow-lg transition-transform duration-300"
          >
            <span>Lihat Studi Kasus</span>
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech_stack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 bg-amber-50 border border-amber-200/50 text-amber-800 rounded-quad"
            >
              {tech}
            </span>
          ))}
          {project.tech_stack.length > 3 && (
            <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded-quad">
              +{project.tech_stack.length - 3}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug group-hover:text-primary transition-colors line-clamp-1">
          <Link href={`/projects/${project.slug}`}>
            {project.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-xs line-clamp-3 leading-relaxed mb-6 flex-grow">
          {project.description}
        </p>

        {/* Action Links */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <Link
            href={`/projects/${project.slug}`}
            className="text-xs font-bold text-slate-700 hover:text-primary flex items-center gap-1 transition-colors"
          >
            Studi Kasus →
          </Link>

          <div className="flex items-center space-x-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-primary rounded-quad transition-all"
                title="Source Code"
              >
                <GithubIcon size={15} />
              </a>
            )}
            {project.live_url && (
              <a
                href={project.live_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-primary rounded-quad transition-all"
                title="Live Demo"
              >
                <ExternalLink size={15} />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
