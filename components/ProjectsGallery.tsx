'use client'

import { useState } from 'react'
import ProjectCard, { Project } from '@/components/ProjectCard'
import { Filter } from 'lucide-react'

interface ProjectsGalleryProps {
  initialProjects: Project[]
}

export default function ProjectsGallery({ initialProjects }: ProjectsGalleryProps) {
  const [selectedTag, setSelectedTag] = useState<string>('ALL')

  // Dapatkan seluruh tag unik dari semua proyek
  const allTags = ['ALL', ...Array.from(new Set(initialProjects.flatMap((p) => p.tech_stack)))]

  // Filter proyek berdasarkan tag terpilih
  const filteredProjects = selectedTag === 'ALL'
    ? initialProjects
    : initialProjects.filter((p) => p.tech_stack.includes(selectedTag))

  return (
    <div className="space-y-12">
      {/* Filter Buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-slate-900 pb-8">
        <div className="flex items-center gap-2 text-slate-300 font-medium text-sm">
          <Filter size={16} className="text-accent" />
          <span>Filter berdasarkan teknologi:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 text-xs font-semibold rounded-quad transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-gradient-to-r from-primary to-accent text-white shadow-md'
                  : 'glass text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Proyek */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 glass rounded-quad">
          <p className="text-slate-400 text-sm">Tidak ada proyek yang sesuai dengan teknologi ini.</p>
        </div>
      )}
    </div>
  )
}
