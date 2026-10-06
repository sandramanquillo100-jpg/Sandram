import React from 'react';
import { ApprenticeInfo, Gtc45MatrixRow } from '../types/sst';
import { calculateGtc45 } from '../utils/gtc45Calculator';
import { SECTORES } from '../data/sstData';
import { X, Printer, Download, CheckCircle, FileText } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  apprenticeInfo: ApprenticeInfo;
  matrixRows: Gtc45MatrixRow[];
  currentImage?: string;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  apprenticeInfo,
  matrixRows,
  currentImage = '/src/assets/images/instructor_sena_sst_1791302813723.jpg'
}) => {
  if (!isOpen) return null;

  const currentSector = SECTORES.find(s => s.id === apprenticeInfo.sectorSeleccionado)?.name || 'General';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200">
        {/* Modal Topbar (hidden during print) */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between print:hidden bg-slate-50 rounded-t-2xl">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-emerald-700" />
            <h3 className="text-base font-bold text-slate-900">
              Vista Previa de Impresión / Entrega Pedagógica SENA
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Guardar como PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Printable Content Area */}
        <div className="p-8 overflow-y-auto space-y-6 text-slate-900 print:p-0 print:overflow-visible">
          {/* Official Document Header */}
          <div className="border border-slate-300 rounded-lg p-5 bg-slate-50/50">
            <div className="flex flex-col sm:flex-row items-center justify-between pb-4 border-b border-slate-300 gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={currentImage}
                  alt="Instructor SENA SST"
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-lg object-cover border-2 border-emerald-800 shadow-xs shrink-0"
                />
                <div>
                  <h1 className="text-sm sm:text-base font-bold text-slate-900 uppercase">
                    Servicio Nacional de Aprendizaje - SENA
                  </h1>
                  <h2 className="text-xs font-semibold text-emerald-800">
                    Sistema Integrado de Gestión · Seguridad y Salud en el Trabajo (SG-SST)
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Formato de Identificación de Peligros, Evaluación y Valoración de los Riesgos (GTC 45)
                  </p>
                </div>
              </div>

              <div className="text-right text-[11px] text-slate-600 sm:border-l sm:border-slate-300 sm:pl-4">
                <div><strong>Versión:</strong> 04 - Pedagógica</div>
                <div><strong>Norma Base:</strong> GTC 45 / Dec. 1072:2015</div>
                <div><strong>Fecha:</strong> {apprenticeInfo.fecha || '2026-10-06'}</div>
              </div>
            </div>

            {/* Apprentice metadata */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs pt-4">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Aprendiz:</span>
                <span className="font-bold text-slate-900">{apprenticeInfo.nombre || 'Sin registrar'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Documento:</span>
                <span className="font-semibold text-slate-900">{apprenticeInfo.documento || 'Sin registrar'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Ficha SENA:</span>
                <span className="font-semibold text-slate-900">{apprenticeInfo.fichaSena || 'Sin registrar'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Programa:</span>
                <span className="font-semibold text-slate-900">{apprenticeInfo.programaFormacion || 'Sin registrar'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Sector:</span>
                <span className="font-semibold text-slate-900">{currentSector}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Centro:</span>
                <span className="font-semibold text-slate-900">{apprenticeInfo.centroFormacion || 'Centro Industrial'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Regional:</span>
                <span className="font-semibold text-slate-900">{apprenticeInfo.regional || 'SENA'}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-semibold">Instructor:</span>
                <span className="font-semibold text-slate-900">Carlos Eduardo Ospina R.</span>
              </div>
            </div>
          </div>

          {/* Matrix table */}
          <div>
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Matriz Técnica de Identificación de Peligros y Valoración del Riesgo
            </h3>

            {matrixRows.length === 0 ? (
              <p className="text-xs text-slate-500 italic p-4 border border-dashed rounded text-center">
                No hay filas diligenciadas actualmente.
              </p>
            ) : (
              <div className="border border-slate-300 rounded-lg overflow-x-auto text-[11px]">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-300 text-slate-800 font-bold">
                      <th className="p-2 border-r border-slate-200">#</th>
                      <th className="p-2 border-r border-slate-200">Proceso / Tarea</th>
                      <th className="p-2 border-r border-slate-200">Peligro y Clasificación</th>
                      <th className="p-2 border-r border-slate-200">Efectos a la Salud</th>
                      <th className="p-2 border-r border-slate-200 text-center">NP</th>
                      <th className="p-2 border-r border-slate-200 text-center">NR</th>
                      <th className="p-2 border-r border-slate-200">Aceptabilidad</th>
                      <th className="p-2">Medidas de Intervención</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {matrixRows.map((row, idx) => {
                      const calc = calculateGtc45(row.nivelDeficiencia, row.nivelExposicion, row.nivelConsecuencia);
                      return (
                        <tr key={row.id}>
                          <td className="p-2 text-center font-bold text-slate-500 border-r border-slate-200">
                            {idx + 1}
                          </td>
                          <td className="p-2 border-r border-slate-200">
                            <strong>{row.proceso}</strong>
                            <div className="text-slate-600">Lugar: {row.zonaLugar}</div>
                            <div className="text-slate-500">Tarea: {row.tarea}</div>
                          </td>
                          <td className="p-2 border-r border-slate-200">
                            <span className="font-bold text-emerald-800 block text-[10px] uppercase">
                              {row.peligroClasificacion}
                            </span>
                            <span className="text-slate-900">{row.peligroDescripcion}</span>
                          </td>
                          <td className="p-2 border-r border-slate-200 text-slate-700">
                            {row.efectosPosibles}
                          </td>
                          <td className="p-2 text-center border-r border-slate-200 font-mono">
                            {calc.np}
                          </td>
                          <td className="p-2 text-center border-r border-slate-200 font-mono font-bold">
                            {calc.nr} ({calc.nivelRiesgoRomano})
                          </td>
                          <td className="p-2 border-r border-slate-200">
                            <span className="font-bold">{calc.aceptabilidad}</span>
                          </td>
                          <td className="p-2 text-slate-700">
                            {row.intervencionIngenieria && <div><strong>Ing:</strong> {row.intervencionIngenieria}</div>}
                            {row.intervencionAdministrativa && <div><strong>Adm:</strong> {row.intervencionAdministrativa}</div>}
                            {row.intervencionEpp && <div><strong>EPP:</strong> {row.intervencionEpp}</div>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Instructor endorsement and signatures */}
          <div className="pt-8 border-t border-slate-300 grid grid-cols-2 gap-8 text-xs">
            <div className="border-t border-slate-400 pt-2 text-center">
              <span className="font-bold text-slate-900 block">{apprenticeInfo.nombre || 'Firma del Aprendiz'}</span>
              <span className="text-slate-500 block">Aprendiz en Etapa Lectiva / Productiva</span>
              <span className="text-slate-400 text-[10px]">C.C. {apprenticeInfo.documento || '_________________'}</span>
            </div>

            <div className="border-t border-slate-400 pt-2 text-center flex flex-col items-center">
              <img
                src={currentImage}
                alt="Carlos Eduardo Ospina R."
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-emerald-600 mb-1"
              />
              <span className="font-bold text-slate-900 block">Carlos Eduardo Ospina R.</span>
              <span className="text-slate-500 block">Instructor SENA SST · Licencia SST No. 04821</span>
              <span className="text-slate-400 text-[10px]">Líder de Área · Formación Profesional Integral</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
