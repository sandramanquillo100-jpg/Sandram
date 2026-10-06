import React, { useState } from 'react';
import { 
  BookOpen, 
  HelpCircle, 
  Scale, 
  Shield, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  ChevronRight,
  Flame,
  FileText
} from 'lucide-react';

interface ConceptsFrameworkProps {
  currentImage?: string;
}

export const ConceptsFramework: React.FC<ConceptsFrameworkProps> = ({ currentImage = '/src/assets/images/instructor_sena_sst_1791302813723.jpg' }) => {
  const [activeSection, setActiveSection] = useState<'fundamentos' | 'clasificacion' | 'jerarquia' | 'normatividad' | 'taller'>('fundamentos');
  
  // Interactive test for apprentice
  const [selectedExample, setSelectedExample] = useState<number | null>(null);
  const [userGuess, setUserGuess] = useState<'peligro' | 'riesgo' | null>(null);

  const interactiveExamples = [
    {
      caso: 'Un charco de aceite derramado en el pasillo de tránsito de la bodega.',
      tipo: 'peligro',
      justificacion: 'Es la fuente o condición física real existente en el entorno con potencial de causar una caída.'
    },
    {
      caso: 'La probabilidad de que un operario resbale y sufra una fractura de cadera al pisar el charco.',
      tipo: 'riesgo',
      justificacion: 'Es la probabilidad de ocurrencia combinada con la severidad del daño a la salud.'
    },
    {
      caso: 'Un cilindro de gas comprimido con la válvula golpeada y sin asegurar a la pared.',
      tipo: 'peligro',
      justificacion: 'Es una condición peligrosa que almacena energía potencial capaz de explotar.'
    },
    {
      caso: 'La probabilidad de quemaduras de tercer grado o asfixia si el gas se inflama durante la jornada.',
      tipo: 'riesgo',
      justificacion: 'Mide la materialización del daño y su impacto clínico en el ser humano.'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Subnav pills */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 rounded-lg max-w-fit">
        <button
          onClick={() => setActiveSection('fundamentos')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeSection === 'fundamentos'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          1. Peligro vs. Riesgo
        </button>
        <button
          onClick={() => setActiveSection('clasificacion')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeSection === 'clasificacion'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          2. Clasificación GTC 45
        </button>
        <button
          onClick={() => setActiveSection('jerarquia')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeSection === 'jerarquia'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          3. Jerarquía de Controles
        </button>
        <button
          onClick={() => setActiveSection('normatividad')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeSection === 'normatividad'
              ? 'bg-white text-emerald-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          4. Marco Legal Colombiano
        </button>
        <button
          onClick={() => setActiveSection('taller')}
          className={`px-3.5 py-1.5 text-xs font-semibold rounded-md transition-colors ${
            activeSection === 'taller'
              ? 'bg-emerald-700 text-white shadow-sm'
              : 'text-emerald-800 hover:text-emerald-900 bg-emerald-100/60'
          }`}
        >
          Taller Rápido de Afianzamiento
        </button>
      </div>

      {/* SECTION 1: PELIGRO VS RIESGO */}
      {activeSection === 'fundamentos' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900 mb-1">
                  Conceptos Clave de Seguridad y Salud en el Trabajo (GTC 45 & Decreto 1072/2015)
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  En la formación profesional integral del SENA, dominar la distinción entre estos términos es el cimiento para no cometer errores en la matriz de riesgos.
                </p>
              </div>
              <div className="flex items-center gap-2.5 shrink-0 bg-slate-50 p-2 rounded-xl border border-slate-200">
                <img
                  src={currentImage}
                  alt="Instructor SENA"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-lg object-cover border border-emerald-600 shadow-xs"
                />
                <div className="text-[11px] leading-tight">
                  <span className="font-bold text-slate-900 block">Carlos E. Ospina R.</span>
                  <span className="text-slate-500">Instructor SST · 13 Años</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Peligro */}
              <div className="p-5 rounded-lg border border-amber-200 bg-amber-50/50">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-base mb-2">
                  <Flame className="w-5 h-5 text-amber-600" />
                  <span>PELIGRO (La Fuente o Situación)</span>
                </div>
                <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
                  <p>
                    <strong>Definición normativa:</strong> Fuente, situación o acto con potencial de causar daño en la salud de los trabajadores, en los equipos o en las instalaciones (Dec. 1072/15, Art. 2.2.4.6.2).
                  </p>
                  <p>
                    <strong>Pregunta clave:</strong> <em>¿Qué elemento físico o condición en el puesto de trabajo tiene la capacidad intrínseca de hacer daño?</em>
                  </p>
                  <div className="pt-2 border-t border-amber-200/60 text-slate-800">
                    <span className="font-semibold text-amber-900">Ejemplos reales:</span>
                    <ul className="list-disc list-inside mt-1 space-y-0.5">
                      <li>Prensa hidráulica sin guarda mecánica instalada.</li>
                      <li>Cable eléctrico de 220V expuesto y energizado.</li>
                      <li>Vapor de benceno en el laboratorio de tintas.</li>
                      <li>Andamio tubular a 6 metros sin baranda perimetral.</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card Riesgo */}
              <div className="p-5 rounded-lg border border-rose-200 bg-rose-50/50">
                <div className="flex items-center gap-2 text-rose-800 font-bold text-base mb-2">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                  <span>RIESGO (Probabilidad × Consecuencia)</span>
                </div>
                <div className="text-xs text-slate-700 space-y-2 leading-relaxed">
                  <p>
                    <strong>Definición normativa:</strong> Combinación de la probabilidad de que ocurra una o más exposiciones o eventos peligrosos y la severidad del daño que puede ser causada por estos.
                  </p>
                  <p>
                    <strong>Pregunta clave:</strong> <em>¿Qué tan probable es que ocurra el evento no deseado y qué tan grave será la lesión o enfermedad?</em>
                  </p>
                  <div className="pt-2 border-t border-rose-200/60 text-slate-800">
                    <span className="font-semibold text-rose-900">Ejemplos reales:</span>
                    <ul className="list-disc list-inside mt-1 space-y-0.5">
                      <li>Riesgo de atrapamiento y amputación de falanges en la prensa.</li>
                      <li>Riesgo de electrocución con paro cardiorrespiratorio.</li>
                      <li>Riesgo de intoxicación aguda y leucemia por inhalación de vapores.</li>
                      <li>Riesgo de caída a distinto nivel con politraumatismo fatal.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Comparativa adicional */}
            <div className="mt-6 pt-6 border-t border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Factor de Riesgo</span>
                <p className="text-slate-600 leading-relaxed">
                  Elemento, fenómeno o acción humana que incrementa la probabilidad de que se desencadene un accidente o enfermedad laboral (ej. falta de capacitación, suelo resbaloso).
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Accidente de Trabajo (AT)</span>
                <p className="text-slate-600 leading-relaxed">
                  Todo suceso repentino que sobrevenga por causa o con ocasión del trabajo, y que produzca en el trabajador una lesión orgánica, perturbación funcional, psiquiátrica, invalidez o la muerte (Ley 1562/2012, Art. 3).
                </p>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-900 block mb-1">Enfermedad Laboral (EL)</span>
                <p className="text-slate-600 leading-relaxed">
                  La contraída como resultado de la exposición a factores de riesgo inherentes a la actividad laboral o del medio en el que el trabajador se ha visto obligado a trabajar (Decreto 1477/2014 modificado por Dec. 676/2020).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: CLASIFICACION GTC 45 */}
      {activeSection === 'clasificacion' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Clasificación Oficial de Peligros según la Guía Técnica Colombiana (GTC 45)
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            La GTC 45 agrupa los peligros en siete grandes categorías. Como aprendiz SENA, debes identificar cada peligro en su familia correspondiente:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* 1. Biológico */}
            <div className="border border-emerald-200 bg-emerald-50/40 p-4 rounded-lg">
              <span className="font-bold text-emerald-900 text-sm block mb-1">1. Biológico</span>
              <p className="text-slate-600 mb-2">
                Agentes orgánicos vivos o derivados que pueden causar infecciones, alergias o toxicidad.
              </p>
              <div className="text-slate-700 space-y-1">
                <span className="font-semibold block text-emerald-800">Subclasificaciones:</span>
                <p>• Virus, Bacterias, Hongos, Ricketsias, Parásitos, Picaduras, Mordeduras, Fluidos corporales o excrementos.</p>
              </div>
            </div>

            {/* 2. Físico */}
            <div className="border border-sky-200 bg-sky-50/40 p-4 rounded-lg">
              <span className="font-bold text-sky-900 text-sm block mb-1">2. Físico</span>
              <p className="text-slate-600 mb-2">
                Distintas formas de energía que pueden transferirse al cuerpo humano con efectos adversos.
              </p>
              <div className="text-slate-700 space-y-1">
                <span className="font-semibold block text-sky-800">Subclasificaciones:</span>
                <p>• Ruido (continuo/impacto), Iluminación (exceso/deficiencia), Vibración (cuerpo entero/mano-brazo), Temperaturas extremas (calor/frío), Presión atmosférica, Radiaciones ionizantes y no ionizantes.</p>
              </div>
            </div>

            {/* 3. Químico */}
            <div className="border border-purple-200 bg-purple-50/40 p-4 rounded-lg">
              <span className="font-bold text-purple-900 text-sm block mb-1">3. Químico</span>
              <p className="text-slate-600 mb-2">
                Sustancias orgánicas o inorgánicas que pueden ingresar por vía respiratoria, dérmica o digestiva.
              </p>
              <div className="text-slate-700 space-y-1">
                <span className="font-semibold block text-purple-800">Subclasificaciones:</span>
                <p>• Polvos orgánicos e inorgánicos, Fibras, Líquidos (nieblas y rocíos), Gases y vapores, Humos metálicos y no metálicos, Material particulado.</p>
              </div>
            </div>

            {/* 4. Psicosocial */}
            <div className="border border-indigo-200 bg-indigo-50/40 p-4 rounded-lg">
              <span className="font-bold text-indigo-900 text-sm block mb-1">4. Psicosocial</span>
              <p className="text-slate-600 mb-2">
                Interacción entre el trabajo, su medio ambiente, la satisfacción y las condiciones del trabajador.
              </p>
              <div className="text-slate-700 space-y-1">
                <span className="font-semibold block text-indigo-800">Subclasificaciones:</span>
                <p>• Gestión organizacional, Características de la organización del trabajo, Condiciones de la tarea, Jornada laboral (turnos nocturnos, horas extras), Relaciones interpersonales.</p>
              </div>
            </div>

            {/* 5. Biomecánico */}
            <div className="border border-amber-200 bg-amber-50/40 p-4 rounded-lg">
              <span className="font-bold text-amber-900 text-sm block mb-1">5. Biomecánico (Ergonómico)</span>
              <p className="text-slate-600 mb-2">
                Atributos de la tarea que involucran interacción física, esfuerzo y postura del operario.
              </p>
              <div className="text-slate-700 space-y-1">
                <span className="font-semibold block text-amber-800">Subclasificaciones:</span>
                <p>• Posturas (prolongada, mantenida, forzada, antigravitacional), Esfuerzo, Movimiento repetitivo, Manipulación manual de cargas (MMC).</p>
              </div>
            </div>

            {/* 6. Condiciones de Seguridad */}
            <div className="border border-rose-200 bg-rose-50/40 p-4 rounded-lg">
              <span className="font-bold text-rose-900 text-sm block mb-1">6. Condiciones de Seguridad</span>
              <p className="text-slate-600 mb-2">
                Factores del entorno y equipos que provocan de forma directa accidentes de trabajo agudos.
              </p>
              <div className="text-slate-700 space-y-1">
                <span className="font-semibold block text-rose-800">Subclasificaciones:</span>
                <p>• Mecánico, Eléctrico (alta/baja tensión), Locativo (orden/superficies), Tecnológico (explosión/fuego), Tránsito, Públicos, Trabajo en alturas, Espacios confinados.</p>
              </div>
            </div>

            {/* 7. Fenómenos Naturales */}
            <div className="border border-teal-200 bg-teal-50/40 p-4 rounded-lg md:col-span-2 lg:col-span-3">
              <span className="font-bold text-teal-900 text-sm block mb-1">7. Fenómenos Naturales</span>
              <p className="text-slate-600 mb-1">
                Situaciones no provocadas por la actividad humana directa pero que pueden afectar las instalaciones y la vida laboral.
              </p>
              <p className="text-slate-700">
                • Sismo, Terremoto, Vendaval, Inundación, Derrumbe, Precipitaciones intensas (lluvias torrenciales o granizadas).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: JERARQUIA DE CONTROLES */}
      {activeSection === 'jerarquia' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-1">
            Jerarquía de Controles de Intervención (Decreto 1072/15, Art. 2.2.4.6.24)
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            El empleador debe aplicar medidas de prevención y control siguiendo este estricto orden de prelación. La efectividad disminuye desde la cúspide hacia la base:
          </p>

          <div className="space-y-3 max-w-4xl mx-auto">
            {/* 1. Eliminación */}
            <div className="border-l-4 border-emerald-600 bg-emerald-50/50 p-4 rounded-r-lg">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-950 text-sm">1. ELIMINACIÓN (Máxima Efectividad)</span>
                <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Foco: La Fuente
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                Modificar el diseño o proceso para suprimir totalmente el peligro. Ejemplo: rediseñar una viga prefabricada para instalarla con grúa desde el suelo, suprimiendo la necesidad de subir trabajadores a 8 metros.
              </p>
            </div>

            {/* 2. Sustitución */}
            <div className="border-l-4 border-teal-600 bg-teal-50/50 p-4 rounded-r-lg">
              <div className="flex items-center justify-between">
                <span className="font-bold text-teal-950 text-sm">2. SUSTITUCIÓN</span>
                <span className="text-[11px] font-semibold text-teal-800 bg-teal-100 px-2 py-0.5 rounded">
                  Foco: La Fuente
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                Reemplazar un peligro por otro que genere menor riesgo. Ejemplo: sustituir pintura base solvente inflamable con tolueno por una base agua de bajo COV; cambiar plaguicida organofosforado por biocontrolador orgánico.
              </p>
            </div>

            {/* 3. Controles de Ingeniería */}
            <div className="border-l-4 border-blue-600 bg-blue-50/50 p-4 rounded-r-lg">
              <div className="flex items-center justify-between">
                <span className="font-bold text-blue-950 text-sm">3. CONTROLES DE INGENIERÍA</span>
                <span className="text-[11px] font-semibold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                  Foco: La Fuente y el Medio
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                Medidas técnicas para aislar o confinar el peligro del trabajador. Ejemplo: guardas fijas en prensas, cortinas fotoeléctricas de parada automática, sistemas de extracción localizada de humos, barandas perimetrales pasivas.
              </p>
            </div>

            {/* 4. Controles Administrativos */}
            <div className="border-l-4 border-amber-600 bg-amber-50/50 p-4 rounded-r-lg">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-950 text-sm">4. CONTROLES ADMINISTRATIVOS Y SEÑALIZACIÓN</span>
                <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
                  Foco: El Medio y la Organización
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                Medidas para reducir la exposición mediante procedimientos. Ejemplo: rotación de operarios para disminuir dosis de ruido, permisos de trabajo en alturas (PTA), señalización óptica/acústica, pausas activas, programas de mantenimiento.
              </p>
            </div>

            {/* 5. EPP */}
            <div className="border-l-4 border-rose-600 bg-rose-50/50 p-4 rounded-r-lg">
              <div className="flex items-center justify-between">
                <span className="font-bold text-rose-950 text-sm">5. EQUIPOS Y ELEMENTOS DE PROTECCIÓN PERSONAL (EPP)</span>
                <span className="text-[11px] font-semibold text-rose-800 bg-rose-100 px-2 py-0.5 rounded">
                  Foco: El Trabajador (Última Barrera)
                </span>
              </div>
              <p className="text-xs text-slate-700 mt-1 leading-relaxed">
                Dispositivos de uso personal para atenuar las consecuencias si el evento ocurre. <strong>No eliminan el peligro</strong>. Ejemplo: arnés de cuerpo entero, protectores auditivos de copa, respiradores con filtros, botas con puntera.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: MARCO NORMATIVO COLOMBIANO */}
      {activeSection === 'normatividad' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900 mb-2">
            Marco Normativo Colombiano Aplicable al SG-SST
          </h2>
          <p className="text-sm text-slate-600 mb-6">
            Como profesionales en formación SENA, toda medida y matriz debe estar debidamente soportada en los estándares legales vigentes expedidos por el Ministerio del Trabajo y la legislación nacional:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <div className="font-bold text-slate-900 text-sm mb-1">
                Decreto 1072 de 2015 (Libro 2, Parte 2, Título 4, Cap. 6)
              </div>
              <span className="text-emerald-700 font-semibold block mb-1">Decreto Único Reglamentario del Sector Trabajo</span>
              <p className="text-slate-600 leading-relaxed">
                Establece la obligatoriedad de implementar el Sistema de Gestión de la Seguridad y Salud en el Trabajo (SG-SST) basado en el ciclo PHVA (Planear, Hacer, Verificar, Actuar) para todos los empleadores públicos y privados.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <div className="font-bold text-slate-900 text-sm mb-1">
                Resolución 0312 de 2019
              </div>
              <span className="text-emerald-700 font-semibold block mb-1">Estándares Mínimos del SG-SST</span>
              <p className="text-slate-600 leading-relaxed">
                Define el conjunto de normas, requisitos y procedimientos de obligatorio cumplimiento según el número de trabajadores y el nivel de riesgo de la empresa (Riesgo I a V).
              </p>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <div className="font-bold text-slate-900 text-sm mb-1">
                Ley 1562 de 2012
              </div>
              <span className="text-emerald-700 font-semibold block mb-1">Modificación del Sistema de Riesgos Laborales</span>
              <p className="text-slate-600 leading-relaxed">
                Modifica el Sistema General de Riesgos Laborales y dicta otras disposiciones en materia de Salud Ocupacional, redefiniendo Accidente de Trabajo (AT) y Enfermedad Laboral (EL).
              </p>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <div className="font-bold text-slate-900 text-sm mb-1">
                Resolución 4272 de 2021
              </div>
              <span className="text-emerald-700 font-semibold block mb-1">Reglamento Técnico de Trabajo en Alturas</span>
              <p className="text-slate-600 leading-relaxed">
                Fija el nuevo estándar general de 2.00 metros para trabajo en alturas en Colombia, exigiendo roles definidos (coordinador, trabajador autorizado), permisos de trabajo y sistemas anticaídas certificados.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <div className="font-bold text-slate-900 text-sm mb-1">
                Resolución 2400 de 1979
              </div>
              <span className="text-emerald-700 font-semibold block mb-1">Estatuto de Seguridad Industrial</span>
              <p className="text-slate-600 leading-relaxed">
                Norma madre de la higiene y seguridad en los establecimientos de trabajo. Regula instalaciones, resguardos de maquinaria peligrosa, sustancias químicas, ruidos y ventilación.
              </p>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <div className="font-bold text-slate-900 text-sm mb-1">
                Guía Técnica Colombiana GTC 45 (2012)
              </div>
              <span className="text-emerald-700 font-semibold block mb-1">ICONTEC - Guía para la Identificación de Peligros</span>
              <p className="text-slate-600 leading-relaxed">
                Directriz técnica nacional para diagnosticar condiciones de trabajo, calcular Nivel de Deficiencia (ND), Exposición (NE), Probabilidad (NP), Consecuencia (NC) y Nivel de Riesgo (NR).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: TALLER RÁPIDO DE AFIANZAMIENTO */}
      {activeSection === 'taller' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Shield className="w-5 h-5 text-emerald-700" />
            <h2 className="text-lg font-bold text-slate-900">
              Taller Práctico: ¿Peligro o Riesgo?
            </h2>
          </div>
          <p className="text-sm text-slate-600 mb-6">
            Selecciona una situación del entorno laboral y demuestra tu criterio técnico eligiendo si corresponde a un <strong>Peligro</strong> o a un <strong>Riesgo</strong>:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {interactiveExamples.map((item, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setSelectedExample(idx);
                  setUserGuess(null);
                }}
                className={`text-left p-4 rounded-lg border transition-all text-xs ${
                  selectedExample === idx
                    ? 'border-emerald-600 bg-emerald-50/60 ring-2 ring-emerald-500/20'
                    : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100/60'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-slate-900">Caso #{idx + 1}</span>
                  {selectedExample === idx && (
                    <span className="text-emerald-700 font-semibold text-[11px]">Seleccionado</span>
                  )}
                </div>
                <p className="text-slate-700 mt-2 font-medium leading-relaxed">
                  "{item.caso}"
                </p>
              </button>
            ))}
          </div>

          {selectedExample !== null && (
            <div className="p-5 rounded-xl border border-slate-200 bg-slate-50/80">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                Clasifica la situación seleccionada:
              </h3>
              <p className="text-sm font-semibold text-slate-800 mb-4">
                "{interactiveExamples[selectedExample].caso}"
              </p>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setUserGuess('peligro')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    userGuess === 'peligro'
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  Es un PELIGRO
                </button>
                <button
                  onClick={() => setUserGuess('riesgo')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                    userGuess === 'riesgo'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  Es un RIESGO
                </button>
              </div>

              {userGuess !== null && (
                <div className="mt-4 pt-4 border-t border-slate-200">
                  {userGuess === interactiveExamples[selectedExample].tipo ? (
                    <div className="flex items-start gap-2.5 text-xs text-emerald-900 bg-emerald-100/70 p-3 rounded-lg border border-emerald-300">
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">¡Respuesta Correcta, Aprendiz!</strong>
                        <p className="mt-1 text-emerald-800 leading-relaxed">
                          {interactiveExamples[selectedExample].justificacion}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-start gap-2.5 text-xs text-rose-900 bg-rose-100/70 p-3 rounded-lg border border-rose-300">
                      <AlertCircle className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
                      <div>
                        <strong className="font-bold">¡Ojo a la retroalimentación del instructor!</strong>
                        <p className="mt-1 text-rose-800 leading-relaxed">
                          En realidad correspondía a <strong>{interactiveExamples[selectedExample].tipo.toUpperCase()}</strong>. {interactiveExamples[selectedExample].justificacion}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
