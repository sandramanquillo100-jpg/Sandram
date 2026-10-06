import React, { useState } from 'react';
import { SectorId, HazardDetail, HazardCategory } from '../types/sst';
import { SECTORES, HAZARDS_CATALOG } from '../data/sstData';
import { 
  Building2, 
  Wrench, 
  Stethoscope, 
  Sprout, 
  Laptop, 
  Truck, 
  ShieldCheck, 
  AlertTriangle, 
  Plus, 
  FileCheck2, 
  BookOpen, 
  HeartPulse, 
  Scale, 
  Filter
} from 'lucide-react';

interface SectorsCatalogProps {
  onAddHazardToMatrix: (hazard: HazardDetail) => void;
  selectedSectorId: SectorId;
  onSelectSectorId: (sectorId: SectorId) => void;
  currentImage?: string;
}

export const SectorsCatalog: React.FC<SectorsCatalogProps> = ({
  onAddHazardToMatrix,
  selectedSectorId,
  onSelectSectorId,
  currentImage = '/src/assets/images/instructor_sena_sst_1791302813723.jpg'
}) => {
  const [categoryFilter, setCategoryFilter] = useState<string>('todos');
  const [selectedHazardId, setSelectedHazardId] = useState<string>(HAZARDS_CATALOG[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [addedSuccessId, setAddedSuccessId] = useState<string | null>(null);

  const activeSector = SECTORES.find(s => s.id === selectedSectorId) || SECTORES[0];

  const sectorHazards = HAZARDS_CATALOG.filter(hazard => {
    const matchesSector = hazard.sectorIds.includes(selectedSectorId);
    const matchesCategory = categoryFilter === 'todos' || hazard.category === categoryFilter;
    const matchesSearch = 
      hazard.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      hazard.concept.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSector && matchesCategory && matchesSearch;
  });

  const activeHazard = HAZARDS_CATALOG.find(h => h.id === selectedHazardId) || sectorHazards[0] || HAZARDS_CATALOG[0];

  const handleAdd = (hazard: HazardDetail) => {
    onAddHazardToMatrix(hazard);
    setAddedSuccessId(hazard.id);
    setTimeout(() => {
      setAddedSuccessId(null);
    }, 2500);
  };

  const getSectorIcon = (id: SectorId) => {
    switch (id) {
      case 'construccion': return <Building2 className="w-4 h-4" />;
      case 'metalmecanica': return <Wrench className="w-4 h-4" />;
      case 'salud': return <Stethoscope className="w-4 h-4" />;
      case 'agropecuario': return <Sprout className="w-4 h-4" />;
      case 'administrativo': return <Laptop className="w-4 h-4" />;
      case 'logistica': return <Truck className="w-4 h-4" />;
    }
  };

  const categoriesList: HazardCategory[] = [
    'Físico',
    'Químico',
    'Biológico',
    'Biomecánico',
    'Psicosocial',
    'Condiciones de Seguridad',
    'Fenómenos Naturales'
  ];

  return (
    <div className="space-y-6">
      {/* Sector Navigation Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
              Catálogo Didáctico por Sectores Productivos
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              Peligros Asociados a tu Programa de Formación SENA
            </h2>
          </div>
          <div className="flex items-center gap-2.5 bg-slate-50 p-1.5 px-3 rounded-xl border border-slate-200">
            <img
              src={currentImage}
              alt="Instructor SENA SST"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover border border-emerald-600 shadow-xs"
            />
            <div className="text-[11px] leading-tight">
              <span className="font-bold text-slate-900 block">Tutoría de Sector</span>
              <span className="text-slate-500">GTC 45 / Dec. 1072</span>
            </div>
          </div>
        </div>

        {/* Sectors Tabs (Buttons with handlers) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {SECTORES.map(sector => {
            const isActive = sector.id === selectedSectorId;
            return (
              <button
                key={sector.id}
                onClick={() => {
                  onSelectSectorId(sector.id);
                  // Pick first hazard in that sector if exists
                  const firstH = HAZARDS_CATALOG.find(h => h.sectorIds.includes(sector.id));
                  if (firstH) setSelectedHazardId(firstH.id);
                }}
                className={`flex flex-col items-center justify-center p-3 rounded-lg border text-xs font-semibold transition-all text-center gap-1.5 ${
                  isActive
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 shadow-sm ring-1 ring-emerald-500/30'
                    : 'border-slate-200 bg-slate-50/60 text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className={`p-1.5 rounded-md ${isActive ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  {getSectorIcon(sector.id)}
                </div>
                <span className="leading-tight line-clamp-2">{sector.name}</span>
              </button>
            );
          })}
        </div>

        {/* Sector Description & Training Programs */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs bg-slate-50 p-3 rounded-lg">
          <div>
            <span className="font-bold text-slate-900">{activeSector.title}: </span>
            <span className="text-slate-600">{activeSector.description}</span>
          </div>
          <div className="shrink-0 flex items-center gap-1.5 text-slate-500">
            <span className="font-semibold text-slate-700">Programas SENA afines:</span>
            <span className="text-slate-600 truncate max-w-xs">{activeSector.typicalProgramsSena.slice(0, 2).join(' · ')}</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Hazard Selector List & Detailed Hazard Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Filter and Hazards list */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                Peligros del Sector ({sectorHazards.length})
              </span>
              <div className="flex items-center gap-1 text-slate-500 text-xs">
                <Filter className="w-3.5 h-3.5" />
                <span>Filtrar</span>
              </div>
            </div>

            {/* Category filter segmented controls */}
            <div className="flex flex-wrap gap-1">
              <button
                onClick={() => setCategoryFilter('todos')}
                className={`px-2 py-1 text-[11px] font-semibold rounded ${
                  categoryFilter === 'todos' ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Todos
              </button>
              {categoriesList.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-2 py-1 text-[11px] font-semibold rounded ${
                    categoryFilter === cat ? 'bg-emerald-700 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Hazards Card List */}
            <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
              {sectorHazards.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500">
                  No se encontraron peligros para este filtro específico en el sector.
                </div>
              ) : (
                sectorHazards.map(h => {
                  const isSelected = activeHazard?.id === h.id;
                  return (
                    <div
                      key={h.id}
                      onClick={() => setSelectedHazardId(h.id)}
                      className={`cursor-pointer p-3.5 rounded-lg border text-xs transition-all ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-500/30'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mb-1">
                            <span className="font-semibold text-emerald-800">{h.category}</span>
                            <span>·</span>
                            <span>{h.classificationDetail.split(' - ')[1] || h.category}</span>
                          </div>
                          <h4 className="font-bold text-slate-900 text-xs leading-snug">
                            {h.name}
                          </h4>
                        </div>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-1.5 line-clamp-2 leading-relaxed">
                        {h.concept}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Full Technical Dossier for activeHazard */}
        <div className="lg:col-span-7">
          {activeHazard ? (
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm space-y-6">
              {/* Dossier Header */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
                    <span className="font-bold text-emerald-800 uppercase tracking-wide">
                      Clasificación GTC 45: {activeHazard.category}
                    </span>
                    <span>·</span>
                    <span>Ficha Técnica Formativa</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    {activeHazard.name}
                  </h3>
                </div>

                <button
                  onClick={() => handleAdd(activeHazard)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-sm shrink-0 ${
                    addedSuccessId === activeHazard.id
                      ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                      : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                  }`}
                >
                  {addedSuccessId === activeHazard.id ? (
                    <>
                      <FileCheck2 className="w-4 h-4" />
                      <span>¡Agregado a tu Formato!</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      <span>Aplicar a mi Formato GTC 45</span>
                    </>
                  )}
                </button>
              </div>

              {/* Concept & Classification Detail */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1.5">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <span>Concepto Técnico</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {activeHazard.concept}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 mb-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Clasificación y Subtipo</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {activeHazard.classificationDetail}
                  </p>
                  <p className="text-slate-500 text-[11px] mt-2">
                    <strong>Tarea típica de exposición:</strong> {activeHazard.sampleTask}
                  </p>
                </div>
              </div>

              {/* Health Effects: Acute vs Chronic */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide mb-3">
                  <HeartPulse className="w-4 h-4 text-rose-600" />
                  <span>Efectos a la Salud del Trabajador (Agudos vs. Crónicos)</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {/* Acute effects */}
                  <div className="p-3.5 rounded-lg border border-rose-200 bg-rose-50/40">
                    <span className="font-bold text-rose-900 block mb-2">
                      Efectos Agudos (Inmediatos / Accidente de Trabajo)
                    </span>
                    <ul className="space-y-1.5 text-slate-700">
                      {activeHazard.healthEffectsAcute.map((eff, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-600 font-bold">•</span>
                          <span>{eff}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Chronic effects */}
                  <div className="p-3.5 rounded-lg border border-purple-200 bg-purple-50/40">
                    <span className="font-bold text-purple-900 block mb-2">
                      Efectos Crónicos (A largo plazo / Enfermedad Laboral)
                    </span>
                    <ul className="space-y-1.5 text-slate-700">
                      {activeHazard.healthEffectsChronic.map((eff, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-purple-600 font-bold">•</span>
                          <span>{eff}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Colombian Regulations */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide mb-2.5">
                  <Scale className="w-4 h-4 text-blue-700" />
                  <span>Normatividad Colombiana Aplicable</span>
                </div>
                <div className="space-y-2 text-xs">
                  {activeHazard.regulationsColombia.map((reg, idx) => (
                    <div key={idx} className="p-3 rounded-lg border border-slate-200 bg-slate-50/60 flex items-start gap-3">
                      <span className="font-bold text-blue-900 shrink-0 w-36 sm:w-44">
                        {reg.code}
                      </span>
                      <span className="text-slate-600 leading-relaxed">
                        {reg.description}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preventative Measures under Hierarchy of Controls */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide mb-2.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-700" />
                  <span>Medidas Preventivas según Jerarquía de Controles</span>
                </div>

                <div className="space-y-2 text-xs">
                  {activeHazard.preventiveMeasures.eliminacion && (
                    <div className="p-2.5 rounded border border-emerald-200 bg-emerald-50/40 flex items-start gap-2">
                      <span className="font-bold text-emerald-900 shrink-0 w-28">1. Eliminación:</span>
                      <span className="text-slate-700">{activeHazard.preventiveMeasures.eliminacion}</span>
                    </div>
                  )}

                  {activeHazard.preventiveMeasures.sustitucion && (
                    <div className="p-2.5 rounded border border-teal-200 bg-teal-50/40 flex items-start gap-2">
                      <span className="font-bold text-teal-900 shrink-0 w-28">2. Sustitución:</span>
                      <span className="text-slate-700">{activeHazard.preventiveMeasures.sustitucion}</span>
                    </div>
                  )}

                  <div className="p-2.5 rounded border border-blue-200 bg-blue-50/40 flex items-start gap-2">
                    <span className="font-bold text-blue-900 shrink-0 w-28">3. Ingeniería:</span>
                    <span className="text-slate-700">{activeHazard.preventiveMeasures.ingenieria}</span>
                  </div>

                  <div className="p-2.5 rounded border border-amber-200 bg-amber-50/40 flex items-start gap-2">
                    <span className="font-bold text-amber-900 shrink-0 w-28">4. Administrativo:</span>
                    <span className="text-slate-700">{activeHazard.preventiveMeasures.administrativo}</span>
                  </div>

                  <div className="p-2.5 rounded border border-rose-200 bg-rose-50/40 flex items-start gap-2">
                    <span className="font-bold text-rose-900 shrink-0 w-28">5. EPP:</span>
                    <span className="text-slate-700">{activeHazard.preventiveMeasures.epp}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-8 text-center text-slate-500">
              Selecciona un peligro de la lista para ver su ficha técnica completa.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
