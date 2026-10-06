import React, { useState, useEffect } from 'react';
import { ApprenticeInfo, Gtc45MatrixRow, HazardDetail, SectorId } from './types/sst';
import { EJEMPLO_MATRIZ_GTC45, SECTORES } from './data/sstData';
import { Navbar } from './components/Navbar';
import { InstructorBanner } from './components/InstructorBanner';
import { ConceptsFramework } from './components/ConceptsFramework';
import { SectorsCatalog } from './components/SectorsCatalog';
import { Gtc45MatrixTool } from './components/Gtc45MatrixTool';
import { RealCaseStudy } from './components/RealCaseStudy';
import { KnowledgeQuiz } from './components/KnowledgeQuiz';
import { ExportModal } from './components/ExportModal';
import { ImageCustomizerModal } from './components/ImageCustomizerModal';
import { ShieldCheck, GraduationCap, CheckCircle } from 'lucide-react';

const DEFAULT_INSTRUCTOR_IMAGE = '/src/assets/images/instructor_sena_sst_1791302813723.jpg';

export default function App() {
  const [activeTab, setActiveTab] = useState<'conceptos' | 'sectores' | 'formato' | 'caso' | 'evaluacion'>('conceptos');
  const [selectedSectorId, setSelectedSectorId] = useState<SectorId>('metalmecanica');
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Permanent image across all windows
  const [currentImage, setCurrentImage] = useState<string>(() => {
    return localStorage.getItem('sena_sst_current_image') || DEFAULT_INSTRUCTOR_IMAGE;
  });

  const handleSaveImage = (newImage: string) => {
    setCurrentImage(newImage);
    localStorage.setItem('sena_sst_current_image', newImage);
    showToast('Imagen actualizada exitosamente en todas las ventanas y formatos.');
  };

  // Apprentice Profile state
  const [apprenticeInfo, setApprenticeInfo] = useState<ApprenticeInfo>({
    nombre: 'Juan David Morales',
    documento: '1.098.765.432',
    fichaSena: 'Ficha 2718490',
    programaFormacion: 'Tecnólogo en Gestión de la Seguridad y Salud en el Trabajo',
    centroFormacion: 'Centro de Gestión Industrial',
    regional: 'Regional Valle del Cauca',
    sectorSeleccionado: 'metalmecanica',
    fecha: new Date().toISOString().split('T')[0]
  });

  // Matrix rows state
  const [matrixRows, setMatrixRows] = useState<Gtc45MatrixRow[]>(EJEMPLO_MATRIZ_GTC45);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleAddHazardToMatrix = (hazard: HazardDetail) => {
    const newRow: Gtc45MatrixRow = {
      id: `row-${Date.now()}`,
      proceso: 'Operación Principal del Sector',
      zonaLugar: 'Área Productiva',
      actividad: 'Ejecución de labores técnicas',
      tarea: hazard.sampleTask,
      rutinaria: true,
      peligroDescripcion: hazard.concept,
      peligroClasificacion: hazard.category,
      efectosPosibles: [...hazard.healthEffectsAcute, ...hazard.healthEffectsChronic].slice(0, 2).join('; '),
      controlFuente: 'En evaluación',
      controlMedio: 'En evaluación',
      controlIndividuo: 'Uso de EPP básico',
      nivelDeficiencia: 6,
      nivelExposicion: 3,
      nivelConsecuencia: 25,
      peorConsecuencia: hazard.healthEffectsChronic[0] || 'Incapacidad permanente parcial',
      requisitoLegal: true,
      intervencionEliminacion: hazard.preventiveMeasures.eliminacion || '',
      intervencionSustitucion: hazard.preventiveMeasures.sustitucion || '',
      intervencionIngenieria: hazard.preventiveMeasures.ingenieria,
      intervencionAdministrativa: hazard.preventiveMeasures.administrativo,
      intervencionEpp: hazard.preventiveMeasures.epp
    };

    setMatrixRows(prev => [...prev, newRow]);
    showToast(`"${hazard.name}" ha sido agregado exitosamente a tu Formato GTC 45.`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 bg-emerald-800 text-white px-4 py-3 rounded-xl shadow-lg border border-emerald-600 flex items-center gap-2.5 text-xs font-semibold animate-in slide-in-from-bottom-5">
          <CheckCircle className="w-4 h-4 text-emerald-300 shrink-0" />
          <span>{toastMessage}</span>
          <button
            onClick={() => setActiveTab('formato')}
            className="underline ml-2 text-emerald-200 hover:text-white"
          >
            Ver Formato
          </button>
        </div>
      )}

      {/* Top Navbar with permanent image */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenExport={() => setIsExportOpen(true)}
        matrixRowCount={matrixRows.length}
        currentImage={currentImage}
        onOpenImageModal={() => setIsImageModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* SENA 13-Year Instructor Welcome Banner with permanent image */}
        <InstructorBanner
          currentImage={currentImage}
          onOpenImageModal={() => setIsImageModalOpen(true)}
        />

        {/* View Switcher - all views receive currentImage */}
        {activeTab === 'conceptos' && (
          <ConceptsFramework currentImage={currentImage} />
        )}

        {activeTab === 'sectores' && (
          <SectorsCatalog
            onAddHazardToMatrix={handleAddHazardToMatrix}
            selectedSectorId={selectedSectorId}
            onSelectSectorId={id => {
              setSelectedSectorId(id);
              setApprenticeInfo(prev => ({ ...prev, sectorSeleccionado: id }));
            }}
            currentImage={currentImage}
          />
        )}

        {activeTab === 'formato' && (
          <Gtc45MatrixTool
            apprenticeInfo={apprenticeInfo}
            setApprenticeInfo={setApprenticeInfo}
            matrixRows={matrixRows}
            setMatrixRows={setMatrixRows}
            onOpenExport={() => setIsExportOpen(true)}
            currentImage={currentImage}
          />
        )}

        {activeTab === 'caso' && (
          <RealCaseStudy currentImage={currentImage} />
        )}

        {activeTab === 'evaluacion' && (
          <KnowledgeQuiz
            apprenticeInfo={apprenticeInfo}
            currentImage={currentImage}
          />
        )}
      </main>

      {/* Official Printable / PDF Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
        apprenticeInfo={apprenticeInfo}
        matrixRows={matrixRows}
        currentImage={currentImage}
      />

      {/* Image Customizer / Uploader Modal */}
      <ImageCustomizerModal
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        currentImage={currentImage}
        onSaveImage={handleSaveImage}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-12 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="flex items-center gap-2.5">
            <img
              src={currentImage}
              alt="Instructor SENA SST"
              referrerPolicy="no-referrer"
              className="w-6 h-6 rounded-full object-cover border border-emerald-600"
            />
            <span className="font-semibold text-slate-700">
              SENA · Formación Profesional Integral para el Trabajo
            </span>
            <span>·</span>
            <span>Seguridad y Salud en el Trabajo (SG-SST)</span>
          </div>
          <div className="text-slate-400">
            Guía Técnica Colombiana GTC 45 · Decreto 1072 de 2015 · Resolución 0312 de 2019
          </div>
        </div>
      </footer>
    </div>
  );
}
