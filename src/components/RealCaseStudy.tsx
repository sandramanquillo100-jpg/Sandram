import React, { useState } from 'react';
import { CASO_REAL_SENA, IDEAS_PREDETERMINADAS_BRAINSTORM } from '../data/sstData';
import { BrainstormIdea, ActionPlanItem } from '../types/sst';
import { 
  AlertTriangle, 
  Lightbulb, 
  Users, 
  CheckCircle, 
  ThumbsUp, 
  Plus, 
  Sparkles, 
  ShieldAlert, 
  ClipboardCheck, 
  Clock, 
  ArrowRight,
  User,
  Wrench,
  FileCheck
} from 'lucide-react';

interface RealCaseStudyProps {
  currentImage?: string;
}

export const RealCaseStudy: React.FC<RealCaseStudyProps> = ({
  currentImage = '/src/assets/images/instructor_sena_sst_1791302813723.jpg'
}) => {
  const [activeTab, setActiveTab] = useState<'caso' | 'lluvia' | 'plan' | 'dictamen'>('caso');
  const [ideas, setIdeas] = useState<BrainstormIdea[]>(IDEAS_PREDETERMINADAS_BRAINSTORM);

  // New brainstorm idea input
  const [newIdeaText, setNewIdeaText] = useState('');
  const [newIdeaCategory, setNewIdeaCategory] = useState<'Fuente' | 'Medio' | 'Individuo' | 'GestionSST'>('Fuente');
  const [newIdeaRole, setNewIdeaRole] = useState<'Aprendiz' | 'Instructor' | 'Comité Paritario (COPASST)' | 'Brigadista'>('Aprendiz');

  // Action plan state
  const [actionPlan, setActionPlan] = useState<ActionPlanItem[]>([
    {
      id: 'plan-1',
      solucion: 'Restaurar y certificar las cortinas ópticas fotoeléctricas redundantes con relé de seguridad Categoría 4 en la prensa hidráulica.',
      jerarquia: 'Ingeniería',
      responsable: 'Jefe de Mantenimiento Electromecánico y Líder SG-SST',
      plazo: 'Inmediato (3 días - máquina suspendida hasta validación)',
      recursos: '$4.500.000 COP (Repuestos y calibración certificada)',
      indicadorEficacia: '100% de paradas instantáneas comprobadas en checklist pre-operacional diario',
      meta: '0 fallas de enclavamiento'
    },
    {
      id: 'plan-2',
      solucion: 'Eliminar el pedal simple descubierto e instalar una estación de mando bimanual sincronizado con distancia de seguridad reglamentaria.',
      jerarquia: 'Ingeniería',
      responsable: 'Ingeniería de Planta y Proveedor Especializado',
      plazo: '5 días hábiles',
      recursos: '$2.800.000 COP',
      indicadorEficacia: '% de accionamientos con ambas manos fuera del troquel (100%)',
      meta: 'Imposibilidad física de accionar con extremidades en la zona de peligro'
    },
    {
      id: 'plan-3',
      solucion: 'Diseñar e impartir inducción técnica obligatoria de 16 horas en operación segura y protocolo LOTO para aprendices y personal nuevo.',
      jerarquia: 'Administrativo',
      responsable: 'Coordinador SG-SST y Centro de Formación SENA',
      plazo: '1 semana (permanente para cada nuevo ingreso)',
      recursos: 'Material didáctico y horas hombre de facilitador',
      indicadorEficacia: 'Aprobación del 100% de aprendices con examen práctico antes de ingresar a planta',
      meta: '100% de cobertura en inducción'
    },
    {
      id: 'plan-4',
      solucion: 'Retiro y prohibición total de guantes de hilaza cerca de partes móviles; suministro de pinzas magnéticas y tenazas para extracción de piezas.',
      jerarquia: 'EPP',
      responsable: 'Almacén y Supervisor de Turno',
      plazo: 'Inmediato (24 horas)',
      recursos: '$350.000 COP (Juego de pinzas magnéticas de alta sujeción)',
      indicadorEficacia: 'Cero exposición manual en zona de prensado',
      meta: '100% de cumplimiento en inspecciones de puesto'
    }
  ]);

  // Form state for adding action item
  const [newPlanSolucion, setNewPlanSolucion] = useState('');
  const [newPlanJerarquia, setNewPlanJerarquia] = useState<'Eliminación' | 'Sustitución' | 'Ingeniería' | 'Administrativo' | 'EPP'>('Ingeniería');
  const [newPlanResponsable, setNewPlanResponsable] = useState('');
  const [newPlanPlazo, setNewPlanPlazo] = useState('');

  const handleVote = (id: string) => {
    setIdeas(prev =>
      prev.map(idea => (idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea))
    );
  };

  const handleToggleAdopt = (id: string) => {
    setIdeas(prev =>
      prev.map(idea => (idea.id === id ? { ...idea, isAdopted: !idea.isAdopted } : idea))
    );
  };

  const handleAddIdea = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newIdeaText.trim()) return;

    const newIdea: BrainstormIdea = {
      id: `idea-${Date.now()}`,
      category: newIdeaCategory,
      author: 'Aprendiz SENA (Tú)',
      role: newIdeaRole,
      text: newIdeaText.trim(),
      votes: 1,
      isAdopted: false
    };

    setIdeas(prev => [newIdea, ...prev]);
    setNewIdeaText('');
  };

  const handleAddPlanItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlanSolucion.trim()) return;

    const item: ActionPlanItem = {
      id: `plan-${Date.now()}`,
      solucion: newPlanSolucion.trim(),
      jerarquia: newPlanJerarquia,
      responsable: newPlanResponsable.trim() || 'Coordinador SG-SST',
      plazo: newPlanPlazo.trim() || '15 días calendario',
      recursos: 'Presupuesto SG-SST anual',
      indicadorEficacia: '% de cumplimiento de la acción preventiva',
      meta: '100% implementado'
    };

    setActionPlan(prev => [...prev, item]);
    setNewPlanSolucion('');
    setNewPlanResponsable('');
    setNewPlanPlazo('');
  };

  return (
    <div className="space-y-6">
      {/* Navigation tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs font-semibold text-rose-700 uppercase tracking-wider block">
            Caso de la Vida Real y Taller Participativo
          </span>
          <h2 className="text-base sm:text-lg font-bold text-slate-900">
            Investigación y Prevención de Accidentes Graves: Industrias del Valle S.A.S.
          </h2>
        </div>

        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-lg">
          <button
            onClick={() => setActiveTab('caso')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'caso' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            1. El Caso y Hechos
          </button>
          <button
            onClick={() => setActiveTab('lluvia')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'lluvia' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            2. Lluvia de Ideas ({ideas.length})
          </button>
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'plan' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            3. Plan de Solución ({actionPlan.length})
          </button>
          <button
            onClick={() => setActiveTab('dictamen')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors ${
              activeTab === 'dictamen' ? 'bg-emerald-700 text-white shadow-sm' : 'text-emerald-800 hover:text-emerald-900'
            }`}
          >
            Dictamen del Instructor
          </button>
        </div>
      </div>

      {/* TAB 1: EL CASO Y HECHOS */}
      {activeTab === 'caso' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex items-start gap-3 pb-4 border-b border-slate-200">
              <div className="p-2.5 rounded-lg bg-rose-100 text-rose-800 shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wide">
                  Notificación de Evento Catastrófico Laboral (Resolución 1401/2007)
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  {CASO_REAL_SENA.titulo}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 mt-1">
                  <span><strong>Aprendiz Afectado:</strong> {CASO_REAL_SENA.aprendizInvolucrado}</span>
                  <span>·</span>
                  <span><strong>Fecha/Hora:</strong> {CASO_REAL_SENA.fechaHecho}</span>
                </div>
              </div>
            </div>

            {/* Narrative text */}
            <div className="mt-5 text-xs text-slate-700 leading-relaxed space-y-3 bg-slate-50 p-4 rounded-lg border border-slate-200">
              <span className="font-bold text-slate-900 block text-sm">Relato Circunstancial de los Hechos:</span>
              <p className="whitespace-pre-line">
                {CASO_REAL_SENA.descripcionContexto}
              </p>
            </div>

            {/* Key Facts Timeline */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Factores Determinantes Identificados por el Equipo Investigador
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {CASO_REAL_SENA.hechosClave.map((hecho, i) => (
                  <div key={i} className="flex items-start gap-2.5 p-3 rounded-lg border border-slate-200 bg-white">
                    <span className="w-5 h-5 rounded-full bg-rose-50 text-rose-700 font-bold flex items-center justify-center shrink-0 text-[11px] border border-rose-200">
                      {i + 1}
                    </span>
                    <span className="text-slate-700 font-medium leading-relaxed">{hecho}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Causes analysis: Immediate vs Basic */}
            <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              {/* Inmediatas */}
              <div className="p-4 rounded-lg border border-amber-200 bg-amber-50/40">
                <span className="font-bold text-amber-950 text-sm block mb-2">
                  1. Causas Inmediatas (Síntomas Evidentes)
                </span>
                
                <div className="space-y-3">
                  <div>
                    <strong className="text-amber-900 block mb-1">Actos Inseguros (Subestándar):</strong>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {CASO_REAL_SENA.causasInmediatas.actosInseguros.map((act, idx) => (
                        <li key={idx}>{act}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <strong className="text-amber-900 block mb-1">Condiciones Inseguras (Subestándar):</strong>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {CASO_REAL_SENA.causasInmediatas.condicionesInseguras.map((cond, idx) => (
                        <li key={idx}>{cond}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Básicas */}
              <div className="p-4 rounded-lg border border-indigo-200 bg-indigo-50/40">
                <span className="font-bold text-indigo-950 text-sm block mb-2">
                  2. Causas Básicas (Origen Raíz Organizacional)
                </span>

                <div className="space-y-3">
                  <div>
                    <strong className="text-indigo-900 block mb-1">Factores del Trabajo / Sistema:</strong>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {CASO_REAL_SENA.causasBasicas.factoresTrabajo.map((fac, idx) => (
                        <li key={idx}>{fac}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <strong className="text-indigo-900 block mb-1">Factores Personales / Humanos:</strong>
                    <ul className="list-disc list-inside space-y-1 text-slate-700">
                      {CASO_REAL_SENA.causasBasicas.factoresPersonales.map((fac, idx) => (
                        <li key={idx}>{fac}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="mt-6 pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                ¿Qué propondrías tú para evitar que esto vuelva a ocurrirle a un compañero aprendiz?
              </span>
              <button
                onClick={() => setActiveTab('lluvia')}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors"
              >
                <span>Ir al Taller de Lluvia de Ideas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: LLUVIA DE IDEAS (BRAINSTORMING) */}
      {activeTab === 'lluvia' && (
        <div className="space-y-6">
          {/* Post Idea Form */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold text-slate-900">
                Lluvia de Ideas: Propuestas Preventivas de la Comunidad Formativa
              </h3>
            </div>
            <p className="text-xs text-slate-600 mb-4 leading-relaxed">
              Como aprendiz SENA, aporta tus ideas de intervención. Clasifícalas según el punto de control (Fuente, Medio, Individuo o Gestión SST) y somételas a votación para construir el plan definitivo.
            </p>

            <form onSubmit={handleAddIdea} className="space-y-3">
              <textarea
                value={newIdeaText}
                onChange={e => setNewIdeaText(e.target.value)}
                placeholder="Escribe tu propuesta preventiva para este caso (Ej: Instalar relé de seguridad bimanual, implementar protocolo LOTO obligatorio, rediseñar el puesto de trabajo...)"
                rows={3}
                className="w-full p-3 text-xs border border-slate-300 rounded-lg focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                required
              />

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <label className="font-semibold text-slate-700">Punto de Control:</label>
                    <select
                      value={newIdeaCategory}
                      onChange={e => setNewIdeaCategory(e.target.value as any)}
                      className="px-2.5 py-1 bg-slate-50 border border-slate-300 rounded font-medium text-slate-800"
                    >
                      <option value="Fuente">En la Fuente (Máquina)</option>
                      <option value="Medio">En el Medio (Entorno / Taller)</option>
                      <option value="Individuo">En el Trabajador (EPP / Prácticas)</option>
                      <option value="GestionSST">Gestión del SG-SST (Capacitación / Normas)</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <label className="font-semibold text-slate-700">Tu Rol:</label>
                    <select
                      value={newIdeaRole}
                      onChange={e => setNewIdeaRole(e.target.value as any)}
                      className="px-2.5 py-1 bg-slate-50 border border-slate-300 rounded font-medium text-slate-800"
                    >
                      <option value="Aprendiz">Aprendiz SENA</option>
                      <option value="Comité Paritario (COPASST)">Comité COPASST</option>
                      <option value="Brigadista">Brigadista SST</option>
                      <option value="Instructor">Instructor</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-bold shadow-sm transition-colors text-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publicar mi Idea en el Muro</span>
                </button>
              </div>
            </form>
          </div>

          {/* Ideas Wall Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {ideas.map(idea => (
              <div
                key={idea.id}
                className={`p-4 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                  idea.isAdopted
                    ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">{idea.author}</span>
                      <span className="text-[11px] text-slate-500">({idea.role})</span>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                      idea.category === 'Fuente' ? 'bg-rose-50 text-rose-800 border-rose-200' :
                      idea.category === 'Medio' ? 'bg-sky-50 text-sky-800 border-sky-200' :
                      idea.category === 'Individuo' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                      'bg-purple-50 text-purple-800 border-purple-200'
                    }`}>
                      Control en {idea.category}
                    </span>
                  </div>

                  <p className="text-slate-700 leading-relaxed font-medium">
                    "{idea.text}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <button
                    onClick={() => handleVote(idea.id)}
                    className="flex items-center gap-1.5 text-slate-600 hover:text-emerald-700 font-semibold"
                  >
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{idea.votes} Votos de apoyo</span>
                  </button>

                  <button
                    onClick={() => handleToggleAdopt(idea.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                      idea.isAdopted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>{idea.isAdopted ? 'Incluida en el Plan' : 'Adoptar para el Plan'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PLAN DE ACCIÓN Y SOLUCIÓN */}
      {activeTab === 'plan' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                  Plan de Prevención Integral y Mejora Continua (Ciclo PHVA)
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">
                  Plan de Acción Correctivo y Preventivo para Industrias del Valle S.A.S.
                </h3>
              </div>
              <span className="text-xs text-slate-500">
                {actionPlan.length} Acciones Estratégicas Formuladas
              </span>
            </div>

            {/* Table of Action Plan */}
            <div className="overflow-x-auto border border-slate-200 rounded-lg">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-semibold border-b border-slate-200">
                    <th className="p-3 w-12 text-center">#</th>
                    <th className="p-3 min-w-[220px]">Medida Correctiva / Preventiva</th>
                    <th className="p-3 min-w-[110px]">Jerarquía</th>
                    <th className="p-3 min-w-[150px]">Responsable</th>
                    <th className="p-3 min-w-[120px]">Plazo de Ejecución</th>
                    <th className="p-3 min-w-[160px]">Indicador de Eficacia</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {actionPlan.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-slate-50/80">
                      <td className="p-3 text-center font-bold text-slate-400">{idx + 1}</td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-900 leading-snug">{item.solucion}</div>
                        <div className="text-[10px] text-slate-500 mt-1">
                          <strong>Recursos:</strong> {item.recursos}
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border ${
                          item.jerarquia === 'Eliminación' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                          item.jerarquia === 'Sustitución' ? 'bg-teal-50 text-teal-800 border-teal-200' :
                          item.jerarquia === 'Ingeniería' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                          item.jerarquia === 'Administrativo' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                          'bg-rose-50 text-rose-800 border-rose-200'
                        }`}>
                          {item.jerarquia}
                        </span>
                      </td>
                      <td className="p-3 text-slate-700 font-medium">{item.responsable}</td>
                      <td className="p-3 text-slate-700">{item.plazo}</td>
                      <td className="p-3">
                        <div className="text-slate-800 font-medium">{item.indicadorEficacia}</div>
                        <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
                          Meta: {item.meta}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Quick add custom action row */}
            <form onSubmit={handleAddPlanItem} className="mt-5 p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-3 text-xs">
              <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider">
                Añadir Nueva Acción Preventiva al Plan:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <input
                    type="text"
                    value={newPlanSolucion}
                    onChange={e => setNewPlanSolucion(e.target.value)}
                    placeholder="Descripción de la solución correctiva..."
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md"
                    required
                  />
                </div>
                <div>
                  <select
                    value={newPlanJerarquia}
                    onChange={e => setNewPlanJerarquia(e.target.value as any)}
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md font-semibold"
                  >
                    <option value="Eliminación">Eliminación</option>
                    <option value="Sustitución">Sustitución</option>
                    <option value="Ingeniería">Ingeniería</option>
                    <option value="Administrativo">Administrativo</option>
                    <option value="EPP">EPP</option>
                  </select>
                </div>
                <div>
                  <input
                    type="text"
                    value={newPlanResponsable}
                    onChange={e => setNewPlanResponsable(e.target.value)}
                    placeholder="Responsable (ej. COPASST, Mantenimiento)"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    value={newPlanPlazo}
                    onChange={e => setNewPlanPlazo(e.target.value)}
                    placeholder="Plazo (ej. 15 días)"
                    className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-md shadow-sm"
                  >
                    Agregar Acción
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* TAB 4: DICTAMEN DEL INSTRUCTOR SENA */}
      {activeTab === 'dictamen' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-5 text-xs">
          <div className="flex items-start gap-4 pb-4 border-b border-slate-200">
            <img
              src={currentImage}
              alt="Instructor Carlos Eduardo Ospina R."
              referrerPolicy="no-referrer"
              className="w-14 h-14 rounded-2xl object-cover border-2 border-emerald-600 shadow-sm shrink-0"
            />
            <div>
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wide">
                Dictamen Técnico y Pedagógico del Instructor
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Evaluación del Caso "Industrias del Valle" y Criterios Formativos
              </h3>
              <p className="text-slate-500 mt-0.5">
                Instructor Carlos Eduardo Ospina R. · 13 Años en el Área de Seguridad y Salud en el Trabajo
              </p>
            </div>
          </div>

          <div className="space-y-4 text-slate-700 leading-relaxed">
            <div className="p-4 rounded-lg bg-emerald-50/60 border border-emerald-200">
              <h4 className="text-emerald-950 font-bold block mb-1.5 text-sm">
                1. La Falacia de Culpar Únicamente al Operario o Aprendiz
              </h4>
              <p>
                «En mis 13 años como instructor del SENA, el error más común de los empleadores es calificar este evento como "imprudencia del trabajador". Esa es una investigación mediocre. Juan David apenas tenía 14 días en la empresa; la guarda estaba retirada por órdenes de acelerar producción, la cortina óptica estaba deliberadamente saboteada con cinta adhesiva y el pedal carecía de capuchón. <strong>La culpa no es del aprendiz; es la falla sistémica de los controles en la fuente y en la organización.</strong>»
              </p>
            </div>

            <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
              <h4 className="text-slate-900 font-bold block mb-1.5 text-sm">
                2. Lecciones Aprendidas Fundamentales para la Vida Laboral
              </h4>
              <ul className="list-disc list-inside space-y-1.5">
                <li>
                  <strong>Regla de Oro de la Guarda:</strong> Una máquina con resguardos retirados o sensores puenteados es una trampa mortal y debe ser parada inmediatamente con tarjeta roja (Derecho de Negativa al Trabajo Inseguro, Decreto 1072/15).
                </li>
                <li>
                  <strong>El pedal nunca debe estar al descubierto:</strong> Debe poseer carcasa superior que impida que una pisada accidental por tropiezo o caída de objetos cierre el circuito de descenso.
                </li>
                <li>
                  <strong>El mando bimanual salva manos:</strong> Obliga al operario a tener ambas manos simultáneamente fuera de la zona de pellizco mientras desciende la matriz.
                </li>
                <li>
                  <strong>Inducción y Acompañamiento:</strong> Ningún aprendiz en etapa práctica debe operar maquinaria crítica sin supervisión directa y calificación de idoneidad previa.
                </li>
              </ul>
            </div>

            <div className="p-4 rounded-lg bg-blue-50/60 border border-blue-200">
              <h4 className="text-blue-950 font-bold block mb-1.5 text-sm">
                3. Consecuencias Legales en Colombia (Sanciones del Ministerio del Trabajo)
              </h4>
              <p>
                Por un accidente grave con amputación calificada atribuible a la falta de medidas de seguridad en máquinas (violación directa de la <strong>Resolución 2400 de 1979</strong> y el <strong>Decreto 1072 de 2015</strong>), la empresa enfrenta:
              </p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Multas administrativas de hasta 500 salarios mínimos legales mensuales vigentes (SMLMV) por parte de la Dirección Territorial del Ministerio de Trabajo.</li>
                <li>Demanda por Responsabilidad Civil Ordinaria (Código Sustantivo del Trabajo, Art. 216) por culpa patronal comprobada.</li>
                <li>Sanción y reporte a la Administradora de Riesgos Laborales (ARL).</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
