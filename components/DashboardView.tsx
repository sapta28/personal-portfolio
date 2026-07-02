'use client'

import { useState } from 'react'
import DashboardTable from './DashboardTable'
import DashboardServicesTable, { Service } from './DashboardServicesTable'
import { Project } from './ProjectCard'
import { Database, Code, Globe, Award, Layers } from 'lucide-react'

interface DashboardViewProps {
  projects: Project[]
  services: Service[]
}

export default function DashboardView({ projects, services }: DashboardViewProps) {
  const [activeTab, setActiveTab] = useState<'projects' | 'services'>('projects')

  // Stats calculation
  const totalProjects = projects.length
  const uniqueTechs = Array.from(new Set(projects.flatMap((p) => p.tech_stack))).length
  const totalServices = services.length

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {/* Stat 1 */}
        <div className="glass p-6 rounded-quad flex items-center gap-4">
          <div className="p-3 bg-primary/10 text-primary rounded-quad">
            <Database size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Proyek</p>
            <h3 className="text-2xl font-black text-white mt-1">{totalProjects}</h3>
          </div>
        </div>

        {/* Stat 2 */}
        <div className="glass p-6 rounded-quad flex items-center gap-4">
          <div className="p-3 bg-accent/10 text-accent rounded-quad">
            <Code size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Teknologi Digunakan</p>
            <h3 className="text-2xl font-black text-white mt-1">{uniqueTechs}</h3>
          </div>
        </div>

        {/* Stat 3 */}
        <div className="glass p-6 rounded-quad flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-quad">
            <Award size={20} />
          </div>
          <div>
            <p className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Total Keahlian</p>
            <h3 className="text-2xl font-black text-white mt-1">{totalServices}</h3>
          </div>
        </div>
      </div>

      {/* Tabs Control */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveTab('projects')}
          className={`px-6 py-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'projects'
              ? 'border-primary text-white bg-slate-900/20'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers size={14} />
          <span>Kelola Proyek ({totalProjects})</span>
        </button>
        <button
          onClick={() => setActiveTab('services')}
          className={`px-6 py-3.5 text-xs font-bold border-b-2 transition-all cursor-pointer flex items-center gap-2 ${
            activeTab === 'services'
              ? 'border-primary text-white bg-slate-900/20'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Award size={14} />
          <span>Kelola Keahlian & Spesialisasi ({totalServices})</span>
        </button>
      </div>

      {/* Render Table */}
      <div className="transition-all duration-300">
        {activeTab === 'projects' ? (
          <DashboardTable initialProjects={projects} />
        ) : (
          <DashboardServicesTable initialServices={services} />
        )}
      </div>
    </div>
  )
}
