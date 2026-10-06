export interface Gtc45Result {
  np: number;
  interpretacionNP: 'Muy Alto (MA)' | 'Alto (A)' | 'Medio (M)' | 'Bajo (B)';
  nr: number;
  nivelRiesgoRomano: 'I' | 'II' | 'III' | 'IV';
  aceptabilidad: 'No Aceptable' | 'No Aceptable o Aceptable con control específico' | 'Mejorable' | 'Aceptable';
  significadoIntervencion: string;
  badgeColorClass: string;
}

export function calculateGtc45(nd: number, ne: number, nc: number): Gtc45Result {
  const np = nd * ne;
  
  let interpretacionNP: 'Muy Alto (MA)' | 'Alto (A)' | 'Medio (M)' | 'Bajo (B)' = 'Bajo (B)';
  if (np >= 24) {
    interpretacionNP = 'Muy Alto (MA)';
  } else if (np >= 10) {
    interpretacionNP = 'Alto (A)';
  } else if (np >= 6) {
    interpretacionNP = 'Medio (M)';
  } else {
    interpretacionNP = 'Bajo (B)';
  }

  const nr = np * nc;

  let nivelRiesgoRomano: 'I' | 'II' | 'III' | 'IV' = 'IV';
  let aceptabilidad: 'No Aceptable' | 'No Aceptable o Aceptable con control específico' | 'Mejorable' | 'Aceptable' = 'Aceptable';
  let significadoIntervencion = '';
  let badgeColorClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';

  if (nr >= 600) {
    nivelRiesgoRomano = 'I';
    aceptabilidad = 'No Aceptable';
    significadoIntervencion = 'Situación crítica. Suspender actividades de inmediato hasta que el riesgo esté bajo control. Intervención urgente y prioritaria.';
    badgeColorClass = 'text-rose-700 bg-rose-50 border-rose-300';
  } else if (nr >= 150) {
    nivelRiesgoRomano = 'II';
    aceptabilidad = 'No Aceptable o Aceptable con control específico';
    significadoIntervencion = 'Corregir y adoptar medidas de control de inmediato para evitar incidentes graves o enfermedades.';
    badgeColorClass = 'text-amber-700 bg-amber-50 border-amber-300';
  } else if (nr >= 40) {
    nivelRiesgoRomano = 'III';
    aceptabilidad = 'Mejorable';
    significadoIntervencion = 'Mejorar si es posible. Monitorear periódicamente los controles existentes.';
    badgeColorClass = 'text-sky-700 bg-sky-50 border-sky-300';
  } else {
    nivelRiesgoRomano = 'IV';
    aceptabilidad = 'Aceptable';
    significadoIntervencion = 'Mantener las medidas de control existentes y verificar periódicamente.';
    badgeColorClass = 'text-emerald-700 bg-emerald-50 border-emerald-300';
  }

  return {
    np,
    interpretacionNP,
    nr,
    nivelRiesgoRomano,
    aceptabilidad,
    significadoIntervencion,
    badgeColorClass
  };
}
