export type SectorId = 
  | 'construccion' 
  | 'metalmecanica' 
  | 'salud' 
  | 'agropecuario' 
  | 'administrativo' 
  | 'logistica';

export type HazardCategory = 
  | 'Físico' 
  | 'Químico' 
  | 'Biológico' 
  | 'Biomecánico' 
  | 'Psicosocial' 
  | 'Condiciones de Seguridad' 
  | 'Fenómenos Naturales';

export interface HazardDetail {
  id: string;
  name: string;
  category: HazardCategory;
  sectorIds: SectorId[];
  concept: string;
  classificationDetail: string;
  healthEffectsAcute: string[];
  healthEffectsChronic: string[];
  regulationsColombia: {
    code: string;
    description: string;
  }[];
  preventiveMeasures: {
    eliminacion?: string;
    sustitucion?: string;
    ingenieria: string;
    administrativo: string;
    epp: string;
  };
  sampleTask: string;
  commonAccidents: string[];
}

export interface SectorInfo {
  id: SectorId;
  name: string;
  title: string;
  description: string;
  typicalProgramsSena: string[];
  mainRisks: string[];
  accentColor: string;
}

export interface Gtc45MatrixRow {
  id: string;
  proceso: string;
  zonaLugar: string;
  actividad: string;
  tarea: string;
  rutinaria: boolean;
  peligroDescripcion: string;
  peligroClasificacion: HazardCategory;
  efectosPosibles: string;
  // Controles existentes
  controlFuente: string;
  controlMedio: string;
  controlIndividuo: string;
  // Evaluación del Riesgo GTC 45
  nivelDeficiencia: number; // 2, 6, 10
  nivelExposicion: number;  // 1, 2, 3, 4
  nivelConsecuencia: number; // 10, 25, 60, 100
  // Criterios para controles
  peorConsecuencia: string;
  requisitoLegal: boolean;
  // Medidas de intervención (Jerarquía)
  intervencionEliminacion: string;
  intervencionSustitucion: string;
  intervencionIngenieria: string;
  intervencionAdministrativa: string;
  intervencionEpp: string;
}

export interface ApprenticeInfo {
  nombre: string;
  documento: string;
  fichaSena: string;
  programaFormacion: string;
  centroFormacion: string;
  regional: string;
  sectorSeleccionado: SectorId;
  fecha: string;
}

export interface BrainstormIdea {
  id: string;
  category: 'Fuente' | 'Medio' | 'Individuo' | 'GestionSST';
  author: string;
  role: 'Aprendiz' | 'Instructor' | 'Comité Paritario (COPASST)' | 'Brigadista';
  text: string;
  votes: number;
  isAdopted: boolean;
}

export interface ActionPlanItem {
  id: string;
  solucion: string;
  jerarquia: 'Eliminación' | 'Sustitución' | 'Ingeniería' | 'Administrativo' | 'EPP';
  responsable: string;
  plazo: string;
  recursos: string;
  indicadorEficacia: string;
  meta: string;
}
