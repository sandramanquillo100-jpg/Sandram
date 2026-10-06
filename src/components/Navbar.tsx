import React from 'react';
import { 
  BookOpen, 
  Layers, 
  FileSpreadsheet, 
  AlertTriangle, 
  Award, 
  Printer, 
  Image as ImageIcon 
} from 'lucide-react';

interface NavbarProps {
  activeTab: 'conceptos' | 'sectores' | 'formato' | 'caso' | 'evaluacion';
  setActiveTab: (tab: 'conceptos' | 'sectores' | 'formato' | 'caso' | 'evaluacion') => void;
  onOpenExport: () => void;
  matrixRowCount: number;
  currentImage: string;
  onOpenImageModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenExport,
  matrixRowCount,
  currentImage,
  onOpenImageModal
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Wordmark & Permanent Image */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenImageModal}
              title="Haz clic para ver o cambiar esta imagen en todas las ventanas"
              className="relative group shrink-0"
            >
              <img
                src={currentImage}
                alt="Instructor SENA SST"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border-2 border-emerald-600 shadow-sm group-hover:ring-2 group-hover:ring-emerald-400 transition-all"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[9px] font-bold shadow">
                ✓
              </span>
            </button>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-bold tracking-tight text-slate-900 leading-tight">
                  SENA SST · Gestión del Riesgo
                </span>
              </div>
              <span className="text-xs text-slate-500 hidden sm:block">
                Herramienta Pedagógica Integral GTC 45 · Instructor Líder
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation links */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('conceptos')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'conceptos'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Conceptos y Normatividad</span>
            </button>

            <button
              onClick={() => setActiveTab('sectores')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'sectores'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Peligros por Sectores</span>
            </button>

            <button
              onClick={() => setActiveTab('formato')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-colors relative ${
                activeTab === 'formato'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>Formato GTC 45 (Aprendiz)</span>
              {matrixRowCount > 0 && (
                <span className="w-4 h-4 bg-emerald-600 text-white rounded-full text-[10px] flex items-center justify-center font-bold">
                  {matrixRowCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('caso')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'caso'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Caso Real y Lluvia de Ideas</span>
            </button>

            <button
              onClick={() => setActiveTab('evaluacion')}
              className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-md transition-colors ${
                activeTab === 'evaluacion'
                  ? 'bg-emerald-50 text-emerald-800'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Evaluación de Saberes</span>
            </button>
          </nav>

          {/* Zone 3: Primary Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenImageModal}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors border border-slate-200"
              title="Cambiar o personalizar la imagen institucional en todas las ventanas"
            >
              <ImageIcon className="w-3.5 h-3.5 text-emerald-700" />
              <span>Imagen</span>
            </button>

            <button
              onClick={onOpenExport}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors shadow-sm whitespace-nowrap"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Exportar / PDF</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="lg:hidden border-t border-slate-100 px-3 py-2 flex items-center justify-between overflow-x-auto gap-2 bg-slate-50">
        <button
          onClick={() => setActiveTab('conceptos')}
          className={`px-2.5 py-1 text-xs font-medium rounded whitespace-nowrap ${
            activeTab === 'conceptos' ? 'bg-emerald-700 text-white' : 'text-slate-600'
          }`}
        >
          Conceptos
        </button>
        <button
          onClick={() => setActiveTab('sectores')}
          className={`px-2.5 py-1 text-xs font-medium rounded whitespace-nowrap ${
            activeTab === 'sectores' ? 'bg-emerald-700 text-white' : 'text-slate-600'
          }`}
        >
          Sectores
        </button>
        <button
          onClick={() => setActiveTab('formato')}
          className={`px-2.5 py-1 text-xs font-medium rounded whitespace-nowrap ${
            activeTab === 'formato' ? 'bg-emerald-700 text-white' : 'text-slate-600'
          }`}
        >
          Formato GTC 45 ({matrixRowCount})
        </button>
        <button
          onClick={() => setActiveTab('caso')}
          className={`px-2.5 py-1 text-xs font-medium rounded whitespace-nowrap ${
            activeTab === 'caso' ? 'bg-emerald-700 text-white' : 'text-slate-600'
          }`}
        >
          Caso Real
        </button>
        <button
          onClick={() => setActiveTab('evaluacion')}
          className={`px-2.5 py-1 text-xs font-medium rounded whitespace-nowrap ${
            activeTab === 'evaluacion' ? 'bg-emerald-700 text-white' : 'text-slate-600'
          }`}
        >
          Evaluación
        </button>
      </div>
    </header>
  );
};
