import React, { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, BookMarked, ShieldAlert, UserCheck, Camera } from 'lucide-react';

interface InstructorBannerProps {
  currentImage: string;
  onOpenImageModal: () => void;
}

export const InstructorBanner: React.FC<InstructorBannerProps> = ({
  currentImage,
  onOpenImageModal
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white rounded-2xl shadow-md border border-emerald-700/60 p-5 md:p-6 mb-8">
      {/* Subtle background ambient graphic */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none mix-blend-overlay"
        style={{ backgroundImage: `url('/src/assets/images/banner_sena_sst_1791302828007.jpg')` }}
      />

      <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-5">
        <div className="flex items-start gap-4 sm:gap-5">
          {/* Permanent Image Avatar with quick change overlay */}
          <div className="relative group shrink-0">
            <img
              src={currentImage}
              alt="Instructor Carlos Eduardo Ospina R. - SENA SST"
              referrerPolicy="no-referrer"
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-emerald-400 shadow-lg"
            />
            <button
              onClick={onOpenImageModal}
              title="Cambiar o personalizar imagen para todas las ventanas"
              className="absolute -bottom-1 -right-1 p-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow border border-white/40 text-[10px]"
            >
              <Camera className="w-3.5 h-3.5" />
            </button>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                Instructor Líder SENA SST · 13 Años de Experiencia
              </span>
              <span className="text-white/40">·</span>
              <span className="text-xs text-white/80">Carlos Eduardo Ospina R.</span>
              <span className="text-white/40">·</span>
              <span className="text-[11px] bg-emerald-500/20 text-emerald-200 px-2 py-0.5 rounded border border-emerald-400/30">
                Imagen activa en todas las ventanas
              </span>
            </div>

            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight mt-1">
              Herramienta Pedagógica de Identificación de Peligros y Valoración de Riesgos
            </h1>

            <p className="text-xs sm:text-sm text-emerald-100/90 mt-1.5 max-w-3xl leading-relaxed">
              «Bienvenido, estimado aprendiz. La Seguridad y Salud en el Trabajo no es llenar papeles para evitar multas: es el compromiso técnico y ético de garantizar que cada trabajador regrese sano y salvo a su hogar al final de la jornada. Aquí aprenderás a aplicar con rigor la <strong>GTC 45</strong>, el <strong>Decreto 1072 de 2015</strong> y la <strong>Resolución 0312 de 2019</strong> a través de casos reales de nuestros sectores productivos colombianos.»
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-white/10 hover:bg-white/20 text-emerald-100 border border-white/15 transition-colors whitespace-nowrap"
          >
            <span>{expanded ? 'Ocultar orientaciones' : 'Ver orientaciones'}</span>
            {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {expanded && (
        <div className="relative z-10 mt-5 pt-5 border-t border-white/15 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-white/5 rounded-lg p-3.5 border border-white/10">
            <div className="flex items-center gap-2 text-emerald-300 font-semibold mb-1.5">
              <BookMarked className="w-4 h-4" />
              <span>1. Rigor Técnico según GTC 45</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              No confundas peligro con riesgo. El peligro se <strong>identifica</strong> (la fuente viva); el riesgo se <strong>valora</strong> combinando la probabilidad de ocurrencia por la severidad del impacto.
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-3.5 border border-white/10">
            <div className="flex items-center gap-2 text-amber-300 font-semibold mb-1.5">
              <ShieldAlert className="w-4 h-4" />
              <span>2. Jerarquía de Controles OIT</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              Regla de oro del SENA: Los Elementos de Protección Personal (EPP) son la <strong>última barrera</strong>. Primero debes agotar la eliminación, sustitución y controles de ingeniería en la fuente.
            </p>
          </div>

          <div className="bg-white/5 rounded-lg p-3.5 border border-white/10">
            <div className="flex items-center gap-2 text-sky-300 font-semibold mb-1.5">
              <UserCheck className="w-4 h-4" />
              <span>3. Cultura de Aprendizaje Vivencial</span>
            </div>
            <p className="text-white/80 leading-relaxed">
              El análisis del caso real de "Industrias del Valle" te permitirá diagnosticar fallas humanas y mecánicas, proponer una lluvia de ideas y construir un plan de prevención ejecutable.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
