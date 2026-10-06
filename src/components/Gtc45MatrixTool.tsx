import React, { useState } from 'react';
import { ApprenticeInfo, Gtc45MatrixRow, HazardCategory, SectorId } from '../types/sst';
import { calculateGtc45, Gtc45Result } from '../utils/gtc45Calculator';
import { SECTORES, EJEMPLO_MATRIZ_GTC45 } from '../data/sstData';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  AlertTriangle, 
  FileSpreadsheet, 
  Sparkles, 
  Info, 
  Save, 
  Printer, 
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface Gtc45MatrixToolProps {
  apprenticeInfo: ApprenticeInfo;
  setApprenticeInfo: React.Dispatch<React.SetStateAction<ApprenticeInfo>>;
  matrixRows: Gtc45MatrixRow[];
  setMatrixRows: React.Dispatch<React.SetStateAction<Gtc45MatrixRow[]>>;
  onOpenExport: () => void;
  currentImage?: string;
}

export const Gtc45MatrixTool: React.FC<Gtc45MatrixToolProps> = ({
  apprenticeInfo,
  setApprenticeInfo,
  matrixRows,
  setMatrixRows,
  onOpenExport,
  currentImage = '/src/assets/images/instructor_sena_sst_1791302813723.jpg'
}) => {
  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState<boolean>(matrixRows.length === 0);

  // New row form state
  const [formData, setFormData] = useState<Partial<Gtc45MatrixRow>>({
    proceso: 'Operaciones de Planta',
    zonaLugar: 'Área de Trabajo',
    actividad: 'Ejecución de tareas principales',
    tarea: '',
    rutinaria: true,
    peligroDescripcion: '',
    peligroClasificacion: 'Condiciones de Seguridad',
    efectosPosibles: '',
    controlFuente: 'Ninguno',
    controlMedio: 'Ninguno',
    controlIndividuo: 'Uso básico de EPP',
    nivelDeficiencia: 6,
    nivelExposicion: 3,
    nivelConsecuencia: 25,
    peorConsecuencia: '',
    requisitoLegal: true,
    intervencionEliminacion: '',
    intervencionSustitucion: '',
    intervencionIngenieria: '',
    intervencionAdministrativa: '',
    intervencionEpp: ''
  });

  const handleInputChange = (field: keyof ApprenticeInfo, value: string) => {
    setApprenticeInfo(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFormFieldChange = (field: keyof Gtc45MatrixRow, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveRow = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.peligroDescripcion || !formData.tarea) {
      alert('Por favor diligencia al menos la Tarea y la Descripción del Peligro.');
      return;
    }

    if (editingRowId) {
      // Update existing
      setMatrixRows(prev =>
        prev.map(row => (row.id === editingRowId ? ({ ...formData, id: row.id } as Gtc45MatrixRow) : row))
      );
      setEditingRowId(null);
    } else {
      // Add new
      const newRow: Gtc45MatrixRow = {
        ...formData as Gtc45MatrixRow,
        id: `row-${Date.now()}`
      };
      setMatrixRows(prev => [...prev, newRow]);
    }

    // Reset
    setShowAddForm(false);
    setFormData({
      proceso: 'Operaciones de Planta',
      zonaLugar: 'Área de Trabajo',
      actividad: 'Ejecución de tareas principales',
      tarea: '',
      rutinaria: true,
      peligroDescripcion: '',
      peligroClasificacion: 'Condiciones de Seguridad',
      efectosPosibles: '',
      controlFuente: 'Ninguno',
      controlMedio: 'Ninguno',
      controlIndividuo: 'Uso básico de EPP',
      nivelDeficiencia: 6,
      nivelExposicion: 3,
      nivelConsecuencia: 25,
      peorConsecuencia: '',
      requisitoLegal: true,
      intervencionEliminacion: '',
      intervencionSustitucion: '',
      intervencionIngenieria: '',
      intervencionAdministrativa: '',
      intervencionEpp: ''
    });
  };

  const handleStartEdit = (row: Gtc45MatrixRow) => {
    setEditingRowId(row.id);
    setFormData(row);
    setShowAddForm(true);
  };

  const handleDeleteRow = (id: string) => {
    if (confirm('¿Estás seguro de eliminar este registro de la matriz?')) {
      setMatrixRows(prev => prev.filter(r => r.id !== id));
      if (editingRowId === id) {
        setEditingRowId(null);
        setShowAddForm(false);
      }
    }
  };

  const handleLoadSample = () => {
    if (matrixRows.length > 0 && !confirm('¿Deseas recargar el modelo de ejemplo del SENA? Esto agregará las filas estándar.')) {
      return;
    }
    setMatrixRows(EJEMPLO_MATRIZ_GTC45);
    setShowAddForm(false);
  };

  // Metrics summary
  const totalRows = matrixRows.length;
  const nivelI_Count = matrixRows.filter(r => calculateGtc45(r.nivelDeficiencia, r.nivelExposicion, r.nivelConsecuencia).nivelRiesgoRomano === 'I').length;
  const nivelII_Count = matrixRows.filter(r => calculateGtc45(r.nivelDeficiencia, r.nivelExposicion, r.nivelConsecuencia).nivelRiesgoRomano === 'II').length;

  // Real-time preview calculation for the current form
  const currentCalc: Gtc45Result = calculateGtc45(
    Number(formData.nivelDeficiencia || 6),
    Number(formData.nivelExposicion || 3),
    Number(formData.nivelConsecuencia || 25)
  );

  return (
    <div className="space-y-6">
      {/* 1. Header: Apprentice identification card */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <img
              src={currentImage}
              alt="Instructor SENA SST"
              referrerPolicy="no-referrer"
              className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-600 shadow-sm shrink-0"
            />
            <div>
              <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                Formato Oficial Tipo GTC 45 / SG-SST SENA
              </span>
              <h2 className="text-lg font-bold text-slate-900 leading-snug">
                Identificación de Peligros, Evaluación y Valoración de los Riesgos
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleLoadSample}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Cargar Matriz Modelo SENA</span>
            </button>
            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir Formato</span>
            </button>
          </div>
        </div>

        {/* Apprentice Fields */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Nombre del Aprendiz:</label>
            <input
              type="text"
              value={apprenticeInfo.nombre}
              onChange={e => handleInputChange('nombre', e.target.value)}
              placeholder="Ej. Juan David Morales"
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Documento de Identidad:</label>
            <input
              type="text"
              value={apprenticeInfo.documento}
              onChange={e => handleInputChange('documento', e.target.value)}
              placeholder="Ej. C.C. 1.098.765.432"
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Número de Ficha SENA:</label>
            <input
              type="text"
              value={apprenticeInfo.fichaSena}
              onChange={e => handleInputChange('fichaSena', e.target.value)}
              placeholder="Ej. Ficha 2718490"
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Programa de Formación:</label>
            <input
              type="text"
              value={apprenticeInfo.programaFormacion}
              onChange={e => handleInputChange('programaFormacion', e.target.value)}
              placeholder="Ej. Tgo. en Gestión de la SST"
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Sector Productivo:</label>
            <select
              value={apprenticeInfo.sectorSeleccionado}
              onChange={e => handleInputChange('sectorSeleccionado', e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium text-slate-900"
            >
              {SECTORES.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Centro de Formación:</label>
            <input
              type="text"
              value={apprenticeInfo.centroFormacion}
              onChange={e => handleInputChange('centroFormacion', e.target.value)}
              placeholder="Ej. Centro de Gestión Industrial"
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Regional SENA:</label>
            <input
              type="text"
              value={apprenticeInfo.regional}
              onChange={e => handleInputChange('regional', e.target.value)}
              placeholder="Ej. Regional Valle / Regional Distrito Capital"
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium text-slate-900"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Fecha de Valoración:</label>
            <input
              type="date"
              value={apprenticeInfo.fecha}
              onChange={e => handleInputChange('fecha', e.target.value)}
              className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-md focus:bg-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-medium text-slate-900"
            />
          </div>
        </div>

        {/* Instructor Summary Bar */}
        <div className="mt-4 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4 text-slate-600">
            <span><strong>Total Peligros Valorados:</strong> {totalRows}</span>
            <span>·</span>
            <span className="text-rose-700 font-semibold">
              <strong>Nivel I (No Aceptable):</strong> {nivelI_Count}
            </span>
            <span>·</span>
            <span className="text-amber-700 font-semibold">
              <strong>Nivel II:</strong> {nivelII_Count}
            </span>
          </div>

          <button
            onClick={() => {
              setEditingRowId(null);
              setShowAddForm(!showAddForm);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm transition-colors ml-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddForm ? 'Cerrar Formulario' : 'Diligenciar Nuevo Peligro'}</span>
          </button>
        </div>
      </div>

      {/* 2. Form Drawer/Card for Adding / Editing a GTC 45 Row */}
      {showAddForm && (
        <form onSubmit={handleSaveRow} className="bg-white rounded-xl border border-emerald-300 p-6 shadow-md space-y-5 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-700" />
              <h3 className="text-base font-bold text-slate-900">
                {editingRowId ? 'Modificar Registro de la Matriz' : 'Nuevo Registro de Peligro (GTC 45)'}
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              Diligenciamiento guiado paso a paso
            </span>
          </div>

          {/* Step 1: Actividad y Tarea */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              1. Contexto de la Tarea y Proceso
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Proceso:</label>
                <input
                  type="text"
                  value={formData.proceso || ''}
                  onChange={e => handleFormFieldChange('proceso', e.target.value)}
                  placeholder="Ej. Soldadura, Mantenimiento"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Zona / Lugar:</label>
                <input
                  type="text"
                  value={formData.zonaLugar || ''}
                  onChange={e => handleFormFieldChange('zonaLugar', e.target.value)}
                  placeholder="Ej. Taller Metalmecánico Nave 1"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">Actividad:</label>
                <input
                  type="text"
                  value={formData.actividad || ''}
                  onChange={e => handleFormFieldChange('actividad', e.target.value)}
                  placeholder="Ej. Conformado de piezas metálicas"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-700 font-medium mb-1">¿Es Tarea Rutinaria?:</label>
                <select
                  value={formData.rutinaria ? 'si' : 'no'}
                  onChange={e => handleFormFieldChange('rutinaria', e.target.value === 'si')}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500"
                >
                  <option value="si">SÍ (Rutinaria)</option>
                  <option value="no">NO (No Rutinaria)</option>
                </select>
              </div>

              <div className="sm:col-span-2 lg:col-span-4">
                <label className="block text-slate-700 font-medium mb-1">Descripción de la Tarea Específica:</label>
                <input
                  type="text"
                  value={formData.tarea || ''}
                  onChange={e => handleFormFieldChange('tarea', e.target.value)}
                  placeholder="Ej. Alimentación manual de chapas a troquel y retiro de viruta con dedos"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Step 2: Peligro y Efectos en Salud */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              2. Identificación del Peligro y Efectos Posibles en la Salud
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Clasificación GTC 45:</label>
                <select
                  value={formData.peligroClasificacion || 'Condiciones de Seguridad'}
                  onChange={e => handleFormFieldChange('peligroClasificacion', e.target.value as HazardCategory)}
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500 font-semibold"
                >
                  <option value="Físico">Físico</option>
                  <option value="Químico">Químico</option>
                  <option value="Biológico">Biológico</option>
                  <option value="Biomecánico">Biomecánico</option>
                  <option value="Psicosocial">Psicosocial</option>
                  <option value="Condiciones de Seguridad">Condiciones de Seguridad</option>
                  <option value="Fenómenos Naturales">Fenómenos Naturales</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-slate-700 font-medium mb-1">Descripción del Peligro (La Fuente):</label>
                <input
                  type="text"
                  value={formData.peligroDescripcion || ''}
                  onChange={e => handleFormFieldChange('peligroDescripcion', e.target.value)}
                  placeholder="Ej. Órganos móviles y troquel de prensa hidráulica desprotegidos"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-slate-700 font-medium mb-1">Efectos Posibles en la Salud:</label>
                <input
                  type="text"
                  value={formData.efectosPosibles || ''}
                  onChange={e => handleFormFieldChange('efectosPosibles', e.target.value)}
                  placeholder="Ej. Amputación traumática de falanges, aplastamiento óseo, hemorragia aguda"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md focus:ring-1 focus:ring-emerald-500"
                  required
                />
              </div>
            </div>
          </div>

          {/* Step 3: Controles Existentes */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              3. Controles Existentes en la Empresa
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="block text-slate-700 font-medium mb-1">En la Fuente:</label>
                <input
                  type="text"
                  value={formData.controlFuente || ''}
                  onChange={e => handleFormFieldChange('controlFuente', e.target.value)}
                  placeholder="Ej. Guarda retirada / Ninguno"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">En el Medio:</label>
                <input
                  type="text"
                  value={formData.controlMedio || ''}
                  onChange={e => handleFormFieldChange('controlMedio', e.target.value)}
                  placeholder="Ej. Demarcación de pasillos"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-medium mb-1">En el Individuo (Trabajador):</label>
                <input
                  type="text"
                  value={formData.controlIndividuo || ''}
                  onChange={e => handleFormFieldChange('controlIndividuo', e.target.value)}
                  placeholder="Ej. Guantes de tela comunes"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Step 4: Evaluación del Riesgo GTC 45 (Sliders / Selects with live math) */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              4. Evaluación Cuantitativa del Riesgo (Fórmulas GTC 45)
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              {/* Nivel de Deficiencia */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Nivel de Deficiencia (ND):
                </label>
                <select
                  value={formData.nivelDeficiencia || 6}
                  onChange={e => handleFormFieldChange('nivelDeficiencia', Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md font-bold"
                >
                  <option value={10}>10 - Muy Deficiente (Peligros críticos sin control)</option>
                  <option value={6}>6 - Deficiente (Peligros significativos / control bajo)</option>
                  <option value={2}>2 - Medio (Peligros moderados / control parcial)</option>
                  <option value={0}>0 - Aceptable (No se detecta deficiencia)</option>
                </select>
              </div>

              {/* Nivel de Exposicion */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Nivel de Exposición (NE):
                </label>
                <select
                  value={formData.nivelExposicion || 3}
                  onChange={e => handleFormFieldChange('nivelExposicion', Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md font-bold"
                >
                  <option value={4}>4 - Continua (Sin interrupción toda la jornada)</option>
                  <option value={3}>3 - Frecuente (Varias veces al día por tiempos cortos)</option>
                  <option value={2}>2 - Ocasional (Alguna vez durante la jornada)</option>
                  <option value={1}>1 - Esporádica (Eventualmente)</option>
                </select>
              </div>

              {/* Nivel de Consecuencia */}
              <div>
                <label className="block text-slate-700 font-semibold mb-1">
                  Nivel de Consecuencia (NC):
                </label>
                <select
                  value={formData.nivelConsecuencia || 25}
                  onChange={e => handleFormFieldChange('nivelConsecuencia', Number(e.target.value))}
                  className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-md font-bold"
                >
                  <option value={100}>100 - Muerte / Catastrófico</option>
                  <option value={60}>60 - Muy Grave (Incapacidad permanente o invalidez)</option>
                  <option value={25}>25 - Grave (Incapacidad laboral temporal)</option>
                  <option value={10}>10 - Leve (Sin incapacidad / primeros auxilios)</option>
                </select>
              </div>
            </div>

            {/* Live Calculation Panel */}
            <div className="mt-4 pt-4 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Nivel Probabilidad</span>
                <span className="text-base font-black text-slate-900">
                  {currentCalc.np}
                </span>
                <span className="text-[11px] block text-slate-600 font-medium">
                  {currentCalc.interpretacionNP}
                </span>
              </div>

              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Nivel Riesgo (NR)</span>
                <span className="text-base font-black text-slate-900">
                  {currentCalc.nr}
                </span>
                <span className="text-[11px] block font-bold text-slate-800">
                  Romano: {currentCalc.nivelRiesgoRomano}
                </span>
              </div>

              <div className="col-span-2 p-2 bg-white rounded-lg border border-slate-200 flex flex-col justify-center">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Aceptabilidad del Riesgo</span>
                <span className={`text-xs font-bold px-2 py-0.5 rounded border inline-block mx-auto mt-0.5 ${currentCalc.badgeColorClass}`}>
                  {currentCalc.aceptabilidad}
                </span>
                <span className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                  {currentCalc.significadoIntervencion}
                </span>
              </div>
            </div>
          </div>

          {/* Step 5: Criterios y Medidas de Intervención (Jerarquía) */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2.5">
              5. Medidas de Intervención según Jerarquía de Controles
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs mb-3">
              <div>
                <label className="block text-slate-700 font-medium mb-1">Peor Consecuencia Posible:</label>
                <input
                  type="text"
                  value={formData.peorConsecuencia || ''}
                  onChange={e => handleFormFieldChange('peorConsecuencia', e.target.value)}
                  placeholder="Ej. Amputación de ambas manos con pérdida de capacidad laboral"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md"
                />
              </div>
              <div className="flex items-center gap-2 pt-5">
                <input
                  type="checkbox"
                  id="chkReq"
                  checked={formData.requisitoLegal}
                  onChange={e => handleFormFieldChange('requisitoLegal', e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="chkReq" className="text-slate-700 font-medium">
                  ¿Existe Requisito Legal Específico Asociado? (Dec. 1072 / Res. 2400)
                </label>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div>
                <label className="block text-emerald-900 font-bold mb-1">1. Eliminación:</label>
                <input
                  type="text"
                  value={formData.intervencionEliminacion || ''}
                  onChange={e => handleFormFieldChange('intervencionEliminacion', e.target.value)}
                  placeholder="Suprimir el proceso manual por automatización total (si aplica)"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-teal-900 font-bold mb-1">2. Sustitución:</label>
                <input
                  type="text"
                  value={formData.intervencionSustitucion || ''}
                  onChange={e => handleFormFieldChange('intervencionSustitucion', e.target.value)}
                  placeholder="Reemplazar por equipo de menor energía o sustancia inocua"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-blue-900 font-bold mb-1">3. Controles de Ingeniería:</label>
                <input
                  type="text"
                  value={formData.intervencionIngenieria || ''}
                  onChange={e => handleFormFieldChange('intervencionIngenieria', e.target.value)}
                  placeholder="Guardas mecánicas enclavadas, cortinas fotoeléctricas, mandos bimanuales"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-amber-900 font-bold mb-1">4. Controles Administrativos / Señalización:</label>
                <input
                  type="text"
                  value={formData.intervencionAdministrativa || ''}
                  onChange={e => handleFormFieldChange('intervencionAdministrativa', e.target.value)}
                  placeholder="Procedimiento seguro (PTS), capacitación, demarcación, señalización"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md"
                />
              </div>

              <div>
                <label className="block text-rose-900 font-bold mb-1">5. Equipos y Elementos de Protección Personal (EPP):</label>
                <input
                  type="text"
                  value={formData.intervencionEpp || ''}
                  onChange={e => handleFormFieldChange('intervencionEpp', e.target.value)}
                  placeholder="Pinzas auxiliares magnéticas, guantes anticorte, gafas de impacto Z87+"
                  className="w-full px-3 py-1.5 border border-slate-300 rounded-md"
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-200">
            <button
              type="button"
              onClick={() => {
                setShowAddForm(false);
                setEditingRowId(null);
              }}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm"
            >
              <Save className="w-4 h-4" />
              <span>{editingRowId ? 'Actualizar Fila' : 'Guardar Peligro en la Matriz'}</span>
            </button>
          </div>
        </form>
      )}

      {/* 3. Table of Registered Hazards */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/50">
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Registros en la Matriz del Aprendiz ({matrixRows.length})
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Los cálculos de NP, NR y Aceptabilidad se actualizan según GTC 45
          </span>
        </div>

        {matrixRows.length === 0 ? (
          <div className="p-12 text-center space-y-3">
            <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-800">
              No tienes peligros registrados en tu formato todavía
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Puedes pulsar "Diligenciar Nuevo Peligro" arriba, explorar el catálogo por sectores y agregarlos con un clic, o presionar "Cargar Matriz Modelo SENA".
            </p>
            <button
              onClick={handleLoadSample}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Cargar Matriz Modelo SENA</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/80 text-slate-700 font-semibold border-b border-slate-200">
                  <th className="p-3 w-12 text-center">#</th>
                  <th className="p-3 min-w-[140px]">Proceso / Lugar</th>
                  <th className="p-3 min-w-[180px]">Peligro (GTC 45)</th>
                  <th className="p-3 min-w-[160px]">Efectos Salud</th>
                  <th className="p-3 text-center min-w-[70px]">ND × NE</th>
                  <th className="p-3 text-center min-w-[80px]">NP</th>
                  <th className="p-3 text-center min-w-[70px]">NC</th>
                  <th className="p-3 text-center min-w-[90px]">Nivel (NR)</th>
                  <th className="p-3 min-w-[140px]">Aceptabilidad</th>
                  <th className="p-3 min-w-[180px]">Medida Clave (Ingeniería)</th>
                  <th className="p-3 w-20 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {matrixRows.map((row, idx) => {
                  const calc = calculateGtc45(row.nivelDeficiencia, row.nivelExposicion, row.nivelConsecuencia);
                  return (
                    <tr key={row.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="p-3 text-center font-bold text-slate-500">{idx + 1}</td>
                      <td className="p-3">
                        <div className="font-semibold text-slate-900">{row.proceso}</div>
                        <div className="text-[11px] text-slate-500">{row.zonaLugar}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          Tarea: {row.tarea} ({row.rutinaria ? 'Rutinaria' : 'No rutinaria'})
                        </div>
                      </td>

                      <td className="p-3">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                          {row.peligroClasificacion}
                        </span>
                        <div className="text-slate-900 font-medium leading-snug">
                          {row.peligroDescripcion}
                        </div>
                      </td>

                      <td className="p-3 text-slate-600 leading-snug">
                        {row.efectosPosibles}
                      </td>

                      <td className="p-3 text-center font-mono tabular-nums text-slate-600">
                        {row.nivelDeficiencia} × {row.nivelExposicion}
                      </td>

                      <td className="p-3 text-center">
                        <span className="font-mono tabular-nums font-bold text-slate-900 block">
                          {calc.np}
                        </span>
                        <span className="text-[10px] text-slate-500">
                          {calc.interpretacionNP.split(' ')[0]}
                        </span>
                      </td>

                      <td className="p-3 text-center font-mono tabular-nums text-slate-600">
                        {row.nivelConsecuencia}
                      </td>

                      <td className="p-3 text-center">
                        <span className="font-mono tabular-nums font-black text-slate-900 block">
                          {calc.nr}
                        </span>
                        <span className="text-[10px] font-bold text-slate-600">
                          Nivel {calc.nivelRiesgoRomano}
                        </span>
                      </td>

                      <td className="p-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[11px] font-bold border ${calc.badgeColorClass}`}>
                          {calc.aceptabilidad}
                        </span>
                      </td>

                      <td className="p-3 text-slate-700 leading-snug">
                        <div className="font-medium">
                          {row.intervencionIngenieria || row.intervencionAdministrativa || 'Sin definir'}
                        </div>
                        {row.peorConsecuencia && (
                          <div className="text-[10px] text-rose-700 mt-0.5">
                            <strong>Peor daño:</strong> {row.peorConsecuencia}
                          </div>
                        )}
                      </td>

                      <td className="p-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <button
                            onClick={() => handleStartEdit(row)}
                            title="Editar fila"
                            className="p-1 rounded text-slate-600 hover:text-emerald-700 hover:bg-slate-100"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteRow(row.id)}
                            title="Eliminar fila"
                            className="p-1 rounded text-slate-600 hover:text-rose-700 hover:bg-slate-100"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
