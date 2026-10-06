import { HazardDetail, SectorInfo, Gtc45MatrixRow, BrainstormIdea, ActionPlanItem } from '../types/sst';

export const SECTORES: SectorInfo[] = [
  {
    id: 'construccion',
    name: 'Construcción e Infraestructura',
    title: 'Obras Civiles, Edificaciones y Vías',
    description: 'Sector con alta accidentalidad caracterizado por trabajo en alturas, izaje de cargas, excavaciones, manipulación de cemento y maquinaria pesada.',
    typicalProgramsSena: [
      'Técnico en Obras Civiles',
      'Tecnólogo en Construcción de Edificaciones',
      'Técnico en Soldadura y Estructuras Metálicas',
      'Operación de Maquinaria Pesada'
    ],
    mainRisks: ['Trabajo en Alturas (>2.0m)', 'Atrapamientos mecánicos', 'Derrumbes en excavaciones', 'Inhalación de sílice libre', 'Sobreesfuerzos'],
    accentColor: 'border-amber-500'
  },
  {
    id: 'metalmecanica',
    name: 'Manufactura y Metalmecánica',
    title: 'Plantas Industriales, Mecanizado y Soldadura',
    description: 'Transformación de metales, corte, estampado, mecanizado y fundición. Presencia de prensas, tornos, fresadoras y exposición a humos metálicos y ruido.',
    typicalProgramsSena: [
      'Tecnólogo en Gestión de la SST',
      'Técnico en Mecánica Industrial',
      'Técnico en Torno y Fresadora Convencional/CNC',
      'Mantenimiento Electromecánico'
    ],
    mainRisks: ['Atrapamiento en partes móviles', 'Proyección de esquirlas', 'Humos de soldadura', 'Ruido > 85 dB(A)', 'Cargas térmicas'],
    accentColor: 'border-blue-600'
  },
  {
    id: 'salud',
    name: 'Salud y Servicios Hospitalarios',
    title: 'Clínicas, Hospitales y Laboratorios',
    description: 'Atención asistencial, urgencias, cirugía y esterilización. Riesgos biológicos de alto contagio, material cortopunzante, radiaciones y carga mental.',
    typicalProgramsSena: [
      'Técnico en Enfermería',
      'Técnico en Servicios Farmacéuticos',
      'Tecnólogo en Imágenes Diagnósticas',
      'Técnico en Salud Pública'
    ],
    mainRisks: ['Pinchazos cortopunzantes', 'Fluidos biológicos de alto riesgo', 'Carga mental y turnos nocturnos', 'Gases anestésicos', 'Posturas forzadas'],
    accentColor: 'border-emerald-600'
  },
  {
    id: 'agropecuario',
    name: 'Agropecuario y Agroindustrial',
    title: 'Cultivos, Pecuario y Beneficio de Alimentos',
    description: 'Actividades agrícolas de campo, manejo de animales, beneficio de café/palma/caña y aplicación de plaguicidas bajo radiación solar directa.',
    typicalProgramsSena: [
      'Técnico en Producción Agropecuaria',
      'Tecnólogo en Gestión de Empresas Agropecuarias',
      'Técnico en Mayordomía de Empresas Ganaderas',
      'Agroindustria Alimentaria'
    ],
    mainRisks: ['Intoxicación por organofosforados', 'Golpe de calor por radiación solar', 'Ataque de serpientes e insectos', 'Vuelco de tractores', 'Zoonosis'],
    accentColor: 'border-lime-600'
  },
  {
    id: 'administrativo',
    name: 'Administrativo, Financiero y TIC',
    title: 'Oficinas, Banca, Software y Centros de Contacto',
    description: 'Ambientes de trabajo terciarios donde predominan el uso prolongado de PVD (pantallas de video), sedentarismo, demandas cuantitativas y estrés.',
    typicalProgramsSena: [
      'Tecnólogo en Análisis y Desarrollo de Software (ADSO)',
      'Tecnólogo en Gestión Administrativa',
      'Técnico en Asistencia Administrativa',
      'Tecnólogo en Gestión Financiera'
    ],
    mainRisks: ['Síndrome del túnel carpiano', 'Fatiga visual (astenopía)', 'Estrés laboral y burnout', 'Sedentarismo prolongado', 'Trastornos lumbares'],
    accentColor: 'border-indigo-600'
  },
  {
    id: 'logistica',
    name: 'Logística, Bodega y Transporte',
    title: 'Almacenamiento, Distribución y Flota Vehicular',
    description: 'Recepción, cargue, consolidación, uso de montacargas, apilamiento en racks elevados y conducción de vehículos en carretera.',
    typicalProgramsSena: [
      'Tecnólogo en Gestión Logística',
      'Técnico en Almacenamiento y Bodega',
      'Operación de Montacargas',
      'Técnico en Transporte Terrestre'
    ],
    mainRisks: ['Colisión o volcamiento de montacargas', 'Caída de pallets y objetos almacenados', 'Lumbalgias por estibado manual', 'Accidentes viales', 'Atropellamientos'],
    accentColor: 'border-orange-500'
  }
];

export const HAZARDS_CATALOG: HazardDetail[] = [
  // FÍSICO
  {
    id: 'fisico-ruido',
    name: 'Ruido Continuo e Intermitente (>85 dBA)',
    category: 'Físico',
    sectorIds: ['construccion', 'metalmecanica', 'agropecuario', 'logistica'],
    concept: 'Energía acústica vibratoria indeseada que supera los niveles seguros de exposición laboral permitidos por la normativa colombiana durante la jornada laboral.',
    classificationDetail: 'Ruido continuo (compresores, motores), de impacto (troqueladoras, prensas) e intermitente (sierras, martillos neumáticos).',
    healthEffectsAcute: [
      'Fatiga auditiva temporal',
      'Acúfenos (tinnitus o zumbido en los oídos)',
      'Disminución del estado de alerta y aumento de errores operativos'
    ],
    healthEffectsChronic: [
      'Hipoacusia neurosensorial inducida por ruido (HNIR) bilateral e irreversible',
      'Hipertensión arterial secundaria',
      'Trastornos del sueño, irritabilidad y fatiga neuropsíquica crónica'
    ],
    regulationsColombia: [
      { code: 'Resolución 1792 de 1990', description: 'Valores límites permisibles para exposición a ruido (85 dBA para 8 horas).' },
      { code: 'Resolución 2400 de 1979', description: 'Título III, Capítulo IV: De los ruidos y vibraciones en lugares de trabajo.' },
      { code: 'Decreto 1072 de 2015', description: 'Implementación del Sistema de Vigilancia Epidemiológica para Conservación Auditiva (SVE-CA).' }
    ],
    preventiveMeasures: {
      eliminacion: 'Sustituir procesos de impacto por corte láser o prensado hidráulico silenciado.',
      sustitucion: 'Reemplazar motores diésel o compresores antiguos por tecnología eléctrica insonorizada.',
      ingenieria: 'Encapsulamiento acústico de máquinas ruidosas, instalación de silenciadores en escapes de aire y pantallas fonoabsorbentes.',
      administrativo: 'Rotación del personal expuesto para reducir tiempo Twa, señalización de zona de uso obligatorio de EPP, audiometrías periódicas.',
      epp: 'Protectores auditivos tipo copa (NRR > 25 dB) o de inserción premoldeados certificados ANSI S3.19.'
    },
    sampleTask: 'Operación de sierra circular de banco en taller de carpintería metálica sin cabina acústica.',
    commonAccidents: ['Falta de atención auditiva a señales de alarma o montacargas que provoca atropellamiento']
  },
  {
    id: 'fisico-vibraciones',
    name: 'Vibraciones de Cuerpo Entero y Mano-Brazo',
    category: 'Físico',
    sectorIds: ['construccion', 'agropecuario', 'logistica', 'metalmecanica'],
    concept: 'Movimiento oscilatorio de un cuerpo sólido transmitido al organismo humano a través del contacto directo con herramientas mecánicas o vehículos pesados.',
    classificationDetail: 'Mano-Brazo (herramientas rotativas y percutoras) y Cuerpo Entero (asientos de maquinaria amarilla, tractores y montacargas).',
    healthEffectsAcute: ['Parestesias en extremidades', 'Pérdida temporal de fuerza de agarre', 'Dolor muscular localizado'],
    healthEffectsChronic: [
      'Síndrome del dedo blanco inducido por vibración (Enfermedad de Raynaud profesional)',
      'Artrosis de muñeca y codo',
      'Degeneración de discos intervertebrales lumbares y hernias discales'
    ],
    regulationsColombia: [
      { code: 'Resolución 2400 de 1979', description: 'Artículos 93 a 96 sobre control de vibraciones en herramientas y máquinas.' },
      { code: 'Guía GTC 45 de 2012', description: 'Clasificación de vibraciones y valoración del nivel de exposición diario.' },
      { code: 'ISO 5349 / ISO 2631', description: 'Estándares internacionales adoptados por el Ministerio de Trabajo para dosis diaria.' }
    ],
    preventiveMeasures: {
      ingenieria: 'Sistemas antivibración en el mango de herramientas, amortiguadores neumáticos en sillas de operadores de montacargas y tractores.',
      administrativo: 'Mantenimiento preventivo periódico de maquinaria, pausas activas con ejercicios de estiramiento articular cada 2 horas.',
      epp: 'Guantes certificados antivibración (norma ISO 10819) con almohadillas viscoelásticas.'
    },
    sampleTask: 'Manejo continuo de rotomartillo demoliendo losa de concreto durante 6 horas continuas.',
    commonAccidents: ['Pérdida súbita de control de la herramienta que genera contusiones graves en extremidades']
  },

  // QUÍMICO
  {
    id: 'quimico-humos-soldadura',
    name: 'Humos Metálicos de Soldadura (Cromo, Manganeso, Níquel)',
    category: 'Químico',
    sectorIds: ['metalmecanica', 'construccion'],
    concept: 'Aerosol formado por partículas sólidas microscópicas generadas por la condensación de vapores metálicos desprendidos a altas temperaturas durante la soldadura SMAW, MIG o TIG.',
    classificationDetail: 'Químico - Humos metálicos con presencia de óxidos de hierro, manganeso, ozono y gases nitrosos.',
    healthEffectsAcute: [
      'Fiebre de humos metálicos (escalofríos, malestar general, sabor metálico)',
      'Irritación severa de las vías respiratorias altas y tos seca',
      'Conjuntivitis química y sensación de arena en los ojos'
    ],
    healthEffectsChronic: [
      'Manganismo (trastorno neurodegenerativo similar al Parkinson)',
      'Siderosis pulmonar y fibrosis pulmonar intersticial',
      'Cáncer de pulmón y cavidades nasales (asociado a cromo hexavalente Cr VI)'
    ],
    regulationsColombia: [
      { code: 'Ley 55 de 1993', description: 'Convenio OIT 170 sobre seguridad en la utilización de los productos químicos en el trabajo.' },
      { code: 'Decreto 1496 de 2018', description: 'Adopción del Sistema Globalmente Armonizado (SGA / GHS) de clasificación y etiquetado.' },
      { code: 'Resolución 2400 de 1979', description: 'Artículos 153 a 169: De las concentraciones máximas permisibles y ventilación.' }
    ],
    preventiveMeasures: {
      sustitucion: 'Emplear materiales de aporte y electrodos con menor contenido de sustancias peligrosas o procesos robóticos cerrados.',
      ingenieria: 'Sistemas de extracción localizada en el origen con campana articulada tipo cuello de cisne (velocidad de captura > 0.5 m/s).',
      administrativo: 'Capacitación en hojas de datos de seguridad (FDS/MSDS SGA), exámenes médicos con espirometría periódica.',
      epp: 'Respirador de media cara de silicona con filtros P100 para humos metálicos y vapores, careta de soldadura con visor fotosensible.'
    },
    sampleTask: 'Soldadura de vigas IPE en taller cerrado sin ventilación forzada.',
    commonAccidents: ['Intoxicación aguda por inhalación en espacios semicerrados que provoca desmayo y caída']
  },
  {
    id: 'quimico-plaguicidas',
    name: 'Plaguicidas y Agroquímicos (Organofosforados y Piretroides)',
    category: 'Químico',
    sectorIds: ['agropecuario'],
    concept: 'Sustancias químicas formuladas para prevenir, destruir o controlar plagas que por su toxicidad pueden ingresar al organismo por vía dérmica, inhalatoria u oral.',
    classificationDetail: 'Químico - Líquidos, nieblas y vapores clasificados en categorías toxicológicas SGA I a IV.',
    healthEffectsAcute: [
      'Síndrome colinérgico: miosis, salivación excesiva, broncoespasmo, vómito y convulsiones',
      'Cefalea intensa y mareo incapacitante',
      'Quemaduras químicas en piel y mucosas'
    ],
    healthEffectsChronic: [
      'Neuropatía retardada inducida por organofosforados',
      'Alteraciones endocrinas y teratogénesis',
      'Enfermedad renal crónica no tradicional del agricultor'
    ],
    regulationsColombia: [
      { code: 'Decreto 1843 de 1991', description: 'Reglamentación del uso y manejo de plaguicidas en Colombia.' },
      { code: 'Resolución 0312 de 2019', description: 'Estándar para empresas con riesgos químicos y manejo de sustancias restringidas.' },
      { code: 'Resolución 773 de 2021', description: 'Acciones de los empleadores para la aplicación del SGA en los lugares de trabajo.' }
    ],
    preventiveMeasures: {
      sustitucion: 'Implementar control biológico de plagas e insumos orgánicos de bajo impacto eco-toxicológico.',
      ingenieria: 'Uso de sistemas de dosificación cerrada y tractores con cabina presurizada con filtros de carbón activado.',
      administrativo: 'Periodos de reingreso al cultivo estrictos, rotulación SGA visible, baño obligatorio pos-jornada, medición de colinesterasa sérica.',
      epp: 'Traje impermeable Tychem o PVC completo, guantes de nitrilo puño largo, botas de caucho sin forro, careta facial y respirador con cartuchos mixtos.'
    },
    sampleTask: 'Fumigación con bomba de espalda de cultivo de hortalizas en horas del mediodía.',
    commonAccidents: ['Derrame del producto químico en la espalda por manguera fisurada provocando absorción cutánea masiva']
  },

  // BIOLÓGICO
  {
    id: 'biologico-sangre-fluidos',
    name: 'Microorganismos Patógenos en Sangre y Fluidos Corporales',
    category: 'Biológico',
    sectorIds: ['salud'],
    concept: 'Exposición laboral a virus, bacterias y parásitos transmisibles por inoculación accidental con agujas, bisturís o contacto de fluidos con mucosas.',
    classificationDetail: 'Biológico - Virus (VIH, VHB, VHC) y bacterias multirresistentes en ambiente hospitalario.',
    healthEffectsAcute: [
      'Infección bacteriana local o absceso en sitio de punción',
      'Ansiedad post-exposición y crisis psicológica por riesgo biológico severo'
    ],
    healthEffectsChronic: [
      'Hepatitis B o C crónica con evolución a cirrosis o hepatocarcinoma',
      'Infección por el Virus de la Inmunodeficiencia Humana (VIH/SIDA)'
    ],
    regulationsColombia: [
      { code: 'Resolución 1164 de 2002', description: 'Manual de Procedimientos para la Gestión Integral de los Residuos Hospitalarios y Similares (MPGIRH).' },
      { code: 'Decreto 1072 de 2015', description: 'Protocolo obligatorio de reporte y manejo de accidente de trabajo con riesgo biológico.' },
      { code: 'Resolución 2400 de 1979', description: 'Normas de bioseguridad e higiene en instalaciones de atención humana.' }
    ],
    preventiveMeasures: {
      eliminacion: 'Uso de sistemas sin aguja para infusión intravenosa siempre que sea clínicamente viable.',
      ingenieria: 'Dispositivos de seguridad retráctiles automáticos en agujas y catéteres; recipientes guardianes rígidos a la altura de los ojos.',
      administrativo: 'Esquema de vacunación completo verificado (Titulado Hepatitis B, Tétanos, Influenza); protocolo estricto de no re-encapuchar agujas.',
      epp: 'Guantes de nitrilo de examen, bata antifluidos manga larga con puño elástico, gafas de seguridad con protección lateral y mascarilla N95.'
    },
    sampleTask: 'Canalización de vía venosa periférica a paciente agitado en sala de urgencias.',
    commonAccidents: ['Pinchazo en el dedo al intentar re-encapuchar una aguja hipodérmica contaminada']
  },

  // BIOMECÁNICO
  {
    id: 'biomecanico-cargas',
    name: 'Manipulación Manual de Cargas (MMC) y Sobreesfuerzo',
    category: 'Biomecánico',
    sectorIds: ['construccion', 'logistica', 'agropecuario', 'salud'],
    concept: 'Cualquier operación de transporte o sujeción de una carga (levantamiento, colocación, empuje, tracción o desplazamiento) que exige esfuerzo muscular.',
    classificationDetail: 'Biomecánico - Cargas superiores a 25 kg en hombres y 12.5 kg en mujeres (según estándares técnicos colombianos).',
    healthEffectsAcute: [
      'Lumbago agudo incapacitante',
      'Desgarros musculares e hiperlaxitud ligamentaria',
      'Atrapamiento o golpe en pies por caída súbita de la carga'
    ],
    healthEffectsChronic: [
      'Hernia discal lumbar (L4-L5, L5-S1) con radiculopatía ciática',
      'Discopatía degenerativa prematura',
      'Deformidades posturales y dolor lumbar crónico intratable'
    ],
    regulationsColombia: [
      { code: 'Resolución 2400 de 1979', description: 'Artículos 388 a 397: Levantamiento y transporte manual de pesos (límites máximos de carga).' },
      { code: 'NTC 5693-1', description: 'Ergonomía. Manipulación manual. Parte 1: Levantamiento y transporte.' },
      { code: 'Resolución 0312 de 2019', description: 'Programa de vigilancia epidemiológica osteomuscular en el SG-SST.' }
    ],
    preventiveMeasures: {
      eliminacion: 'Automatización del paletizado y descarga de sacos.',
      sustitucion: 'Comprar bultos de insumos en presentaciones fraccionadas de 25 kg en lugar de 50 kg.',
      ingenieria: 'Ayudas mecánicas: transpaletas hidráulicas, polipastos, carretillas de dos ruedas, mesas de tijera elevadoras.',
      administrativo: 'Técnica ergonómica de levantamiento (flexionar rodillas, espalda recta, carga pegada al cuerpo), pausas activas dirigidas.',
      epp: 'Calzado de seguridad con puntera de acero/composite y suela antideslizante, guantes con recubrimiento de látex corrugado para agarre firme.'
    },
    sampleTask: 'Cargue manual al hombro de 80 bultos de cemento de 50 kg desde el camión hasta la bodega.',
    commonAccidents: ['Tirón lumbar brusco con pérdida de estabilidad y caída del bulto sobre las piernas']
  },
  {
    id: 'biomecanico-posturas-repetitivas',
    name: 'Postura Sedente Prolongada y Movimientos Repetitivos de Miembro Superior',
    category: 'Biomecánico',
    sectorIds: ['administrativo', 'metalmecanica'],
    concept: 'Mantenimiento de la postura de trabajo sentado por más del 75% de la jornada laboral sumado a ciclos repetitivos rápidos de muñeca y dedos.',
    classificationDetail: 'Biomecánico - Postura estática prolongada, flexo-extensión forzada de muñeca y digitación continua.',
    healthEffectsAcute: [
      'Espasmo muscular en trapecios y cuello (cervicalgia)',
      'Pesadez y parestesias transitorias en antebrazos'
    ],
    healthEffectsChronic: [
      'Síndrome del Túnel Carpiano (STC) bilateral',
      'Tendinitis de Quervain y epicondilitis lateral (codo de tenista laboral)',
      'Insuficiencia venosa periférica en miembros inferiores'
    ],
    regulationsColombia: [
      { code: 'Ley 1355 de 2009', description: 'Artículo 5: Mecanismos para promover pausas activas y actividad física en el entorno laboral.' },
      { code: 'NTC 5655', description: 'Principios ergonómicos relativos a la carga de trabajo mental y físico en puestos de oficina.' },
      { code: 'Decreto 1477 de 2014', description: 'Tabla de Enfermedades Laborales (Sección II, Grupo X: Trastornos músculo-esqueléticos).' }
    ],
    preventiveMeasures: {
      ingenieria: 'Silla ergonómica graduable con apoyo lumbar, apoyabrazos y mecanismo sincro; soporte para monitor regulable a la altura de los ojos; mouse vertical ergonómico.',
      administrativo: 'Protocolo de pausas activas obligatorias de 7 minutos cada 2 horas; diseño de estaciones de trabajo con alternancia sentado/de pie (sit-stand desks).',
      epp: 'No aplica EPP directo para este riesgo (se priorizan controles ergonómicos de ingeniería y administrativos).'
    },
    sampleTask: 'Digitación de expedientes y desarrollo de código durante 8 horas continuas en silla fija no regulable.',
    commonAccidents: ['Desencadenamiento progresivo de STC con pérdida de la pinza digital y necesidad de cirugía descompresiva']
  },

  // CONDICIONES DE SEGURIDAD - TRABAJO EN ALTURAS
  {
    id: 'seguridad-alturas',
    name: 'Trabajo en Alturas (> 2.00 Metros)',
    category: 'Condiciones de Seguridad',
    sectorIds: ['construccion', 'logistica', 'metalmecanica'],
    concept: 'Toda actividad o desplazamiento que se realice a una altura igual o superior a 2.00 metros sobre un nivel inferior donde existe riesgo de caída.',
    classificationDetail: 'Condiciones de Seguridad - Trabajo en alturas, andamios, cubiertas, escaleras y plataformas elevadoras.',
    healthEffectsAcute: [
      'Politraumatismo severo, fracturas múltiples de pelvis y extremidades',
      'Trauma craneoencefálico severo (TCE) y muerte inmediata por impacto contra el suelo',
      'Síndrome del arnés (shock ortostático por suspensión inerte prolongada)'
    ],
    healthEffectsChronic: [
      'Discapacidad física permanente, paraplejia o tetraplejia por lesión medular',
      'Secuelas neurológicas postraumáticas irreversibles'
    ],
    regulationsColombia: [
      { code: 'Resolución 4272 de 2021', description: 'Nuevo Reglamento de Seguridad para protección contra caídas en trabajo en alturas en Colombia.' },
      { code: 'Resolución 1409 de 2012', description: 'Antecedente técnico normativo y lineamientos para centros de entrenamiento autorizados.' },
      { code: 'Resolución 0312 de 2019', description: 'Estándar obligatorio de verificación de coordinadores de alturas y certificados vigentes.' }
    ],
    preventiveMeasures: {
      eliminacion: 'Instalar sistemas prefabricados o brazos telescópicos desde el piso para evitar subir a la altura.',
      ingenieria: 'Sistemas pasivos de protección: barandas perimetrales reglamentarias (altura 1.20 m con rodapié de 9 cm y travesaño intermedio), redes de seguridad.',
      administrativo: 'Permiso de Trabajo en Alturas (PTA) firmado, lista de chequeo pre-operacional, certificado de aptitud médica laboral para alturas vigente, coordinador de alturas presente.',
      epp: 'Sistema individual de detención de caídas: Arnés de cuerpo entero de 4 argollas certificado ANSI Z359.11, eslinga con absorbedor de energía, línea de vida y casco con barboquejo de 3 puntos.'
    },
    sampleTask: 'Instalación de cubierta metálica sobre cerchas a 7 metros de altura sin línea de vida instalada.',
    commonAccidents: ['Pisar una teja traslúcida que se quiebra, cayendo al vacío desde 7 metros']
  },

  // CONDICIONES DE SEGURIDAD - MECÁNICO
  {
    id: 'seguridad-mecanico-prensas',
    name: 'Riesgo Mecánico: Atrapamiento en Prensas y Partes Móviles',
    category: 'Condiciones de Seguridad',
    sectorIds: ['metalmecanica', 'construccion', 'agropecuario'],
    concept: 'Conjunto de factores físicos generados por elementos de máquinas, engranajes, poleas, cilindros o piezas móviles que pueden causar lesiones por aplastamiento, corte o atrapamiento.',
    classificationDetail: 'Condiciones de Seguridad - Mecánico: Puntos de operación sin protección, órganos de transmisión desprotegidos.',
    healthEffectsAcute: [
      'Amputación traumática de dedos, manos o antebrazos',
      'Aplastamiento severo de tejidos blandos y huesos',
      'Heridas abiertas complejas por laceración o corte profundo'
    ],
    healthEffectsChronic: [
      'Pérdida de la capacidad laboral (PCL) permanente calificada',
      'Trastorno de estrés postraumático (TEPT)',
      'Dolor fantasma en extremidades amputadas'
    ],
    regulationsColombia: [
      { code: 'Resolución 2400 de 1979', description: 'Título VIII: De las máquinas, equipos y aparatos en general (guardas de seguridad obligatorias).' },
      { code: 'Decreto 1072 de 2015', description: 'Obligación del empleador de garantizar mantenimiento preventivo y guardas fijas de protección.' },
      { code: 'NTC 2506 / ISO 12100', description: 'Seguridad de las máquinas. Conceptos básicos y principios generales para el diseño.' }
    ],
    preventiveMeasures: {
      eliminacion: 'Alimentación automática robotizada de piezas a la matriz de la prensa sin intervención manual directa.',
      sustitucion: 'Modernizar prensas mecánicas de embrague positivo por servoprensas programables con paro instantáneo.',
      ingenieria: 'Guardas fijas perimetrales enclavadas con micro-switches de seguridad; cortinas de luz fotoeléctricas redundantes (Categoría 4); mandos bimanuales que obliguen al uso de ambas manos fuera de la zona de peligro.',
      administrativo: 'Procedimiento de bloqueo y etiquetado (LOTO - Lockout/Tagout) para mantenimiento; señalización de zona de peligro; prohibición de trabajar con mangas sueltas, joyas o cabello desatado.',
      epp: 'Guantes de nitrilo o cuero ajustados para manipulación de chapas, gafas de seguridad resistentes a impacto Z87+, calzado dieléctrico con puntera reforzada.'
    },
    sampleTask: 'Retiro manual de viruta o chapa atascada en el troquel de una prensa excéntrica con el motor encendido.',
    commonAccidents: ['El operario activa accidentalmente el pedal mientras retira una pieza, sufriendo la amputación de 3 dedos']
  },

  // PSICOSOCIAL
  {
    id: 'psicosocial-estres-turnos',
    name: 'Carga Mental, Turnos Rotativos y Demandas Emocionales',
    category: 'Psicosocial',
    sectorIds: ['salud', 'administrativo', 'logistica'],
    concept: 'Condiciones intralaborales, extralaborales e individuales que surgen de la organización del trabajo, ritmo, nivel de responsabilidad y relaciones interpersonales.',
    classificationDetail: 'Psicosocial - Demandas cuantitativas y de la carga mental, jornada nocturna y rol de liderazgo.',
    healthEffectsAcute: [
      'Crisis de ansiedad, cefalea tensional y desorientación',
      'Somnolencia diurna excesiva con alteración de reflejos psicomotores'
    ],
    healthEffectsChronic: [
      'Síndrome de Desgaste Profesional (Burnout)',
      'Gastritis crónica y úlcera péptica',
      'Depresión mayor reactiva al estrés laboral y riesgo cardiovascular aumentado'
    ],
    regulationsColombia: [
      { code: 'Resolución 2646 de 2008', description: 'Disposiciones para la identificación, evaluación, prevención e intervención de los factores de riesgo psicosocial.' },
      { code: 'Resolución 2764 de 2022', description: 'Adopción de la nueva Batería de Instrumentos para la Evaluación de Factores de Riesgo Psicosocial.' },
      { code: 'Ley 1010 de 2006', description: 'Medidas para prevenir, corregir y sancionar el acoso laboral en Colombia.' }
    ],
    preventiveMeasures: {
      ingenieria: 'Acondicionamiento acústico y ergonómico de los puestos de trabajo para reducir fatiga sensorial.',
      administrativo: 'Diseño de cronogramas de turnos respetando el ciclo circadiano (máximo 2 noches consecutivas); redistribución equitativa de cargas de trabajo; conformación activa del Comité de Convivencia Laboral; talleres de manejo del estrés y resiliencia.',
      epp: 'No aplica EPP (la intervención es 100% organizacional y psicológica).'
    },
    sampleTask: 'Atención de pacientes críticos en UCI pediátrica durante turno nocturno de 12 horas consecutivas.',
    commonAccidents: ['Error en la administración de dosis de medicamentos por fatiga mental extrema del personal de enfermería']
  }
];

export const CASO_REAL_SENA = {
  titulo: 'Accidente Grave en la Empresa "Industrias del Valle S.A.S." - Planta Metalmecánica Palmira',
  aprendizInvolucrado: 'Juan David Morales (19 años, Aprendiz SENA del programa Técnico en Mecánica Industrial, 2 semanas en etapa práctica)',
  supervisor: 'Don Ramón Castillo (Jefe de Taller con 24 años en la empresa)',
  fechaHecho: 'Martes 14 de mayo, 4:45 PM (Fin de turno de entrega urgente)',
  descripcionContexto: `
Juan David se encontraba realizando sus prácticas formativas en el taller de troquelado y mecanizado. La empresa tenía un pedido urgente de 1.500 soportes de acero para un cliente automotriz. 
Para acelerar el proceso, el operador titular de la Prensa Hidráulica de 40 Toneladas había retirado la guarda fija de protección lateral porque "estorbaba para sacar rápido las piezas defectuosas".
Adicionalmente, el sensor de cortina óptica presentaba una falla intermitente desde hacía 3 semanas y había sido puenteado provisionalmente con cinta adhesiva para que la máquina no se detuviera.
A las 4:35 PM, Juan David fue enviado por el supervisor a retirar rebabas y desatascar una lámina doblada en el troquel inferior. El aprendiz llevaba puestos guantes de hilaza sueltos con hilachas colgando y no había recibido inducción formal sobre el protocolo LOTO (Bloqueo y Etiquetado).
Mientras introducía su mano derecha para jalar la lámina atascada, tropezó con una manguera de aire comprimido desordenada en el suelo y accionó involuntariamente el pedal de marcha con su pie izquierdo.
El pisador descendió violentamente, provocando el aplastamiento y amputación traumática de la falange distal y media de los dedos índice y medio de su mano derecha.
  `,
  hechosClave: [
    'Falta de inducción específica y entrenamiento formal en SST para el nuevo aprendiz en etapa productiva.',
    'Retiro intencional de la guarda de seguridad por razones de "producción acelerada".',
    'Puenteo eléctrico ilegal de la cortina de seguridad fotoeléctrica.',
    'Ausencia de procedimiento de Bloqueo y Etiquetado (LOTO) antes de intervenir zonas peligrosas.',
    'Condición locativa insegura: Mangueras y cables atravesados en la zona de tránsito del operario.',
    'Uso de guantes de hilaza no aptos para trabajo con partes rotativas o prensas mecánicas.',
    'Mando por pedal sin capuchón protector ni seguro contra accionamiento accidental.'
  ],
  causasInmediatas: {
    actosInseguros: [
      'Introducir las manos en la zona del troquel con la máquina energizada.',
      'Trabajar con la guarda de protección desmontada y sensores puenteados.',
      'Usar guantes de tela holgados con hilachas cerca a puntos de atrapamiento.'
    ],
    condicionesInseguras: [
      'Prensa hidráulica sin protección en el punto de operación.',
      'Pedal de accionamiento desprotegido sin cubierta contra caída de objetos o pisadas involuntarias.',
      'Desorden locativo con mangueras en el piso cerca del puesto de mando.'
    ]
  },
  causasBasicas: {
    factoresTrabajo: [
      'Criterio de producción por encima de la seguridad del trabajador.',
      'Falta de mantenimiento preventivo a los dispositivos de seguridad de la máquina.',
      'Inexistencia de un estándar seguro de trabajo (AST/PTS) para la operación de la prensa.'
    ],
    factoresPersonales: [
      'Inexperiencia del aprendiz y falta de capacitación previa certificada.',
      'Presión por el cumplimiento de metas de entrega al final de la jornada laboral.'
    ]
  }
};

export const IDEAS_PREDETERMINADAS_BRAINSTORM: BrainstormIdea[] = [
  {
    id: 'idea-1',
    category: 'Fuente',
    author: 'Instructor Carlos Ospina',
    role: 'Instructor',
    text: 'Restaurar y fijar permanentemente la guarda de seguridad mecánica con tornillería de seguridad que impida su retiro manual sin herramienta especial.',
    votes: 18,
    isAdopted: true
  },
  {
    id: 'idea-2',
    category: 'Fuente',
    author: 'Brigadista SST',
    role: 'Brigadista',
    text: 'Eliminar el pedal de accionamiento simple y reemplazarlo obligatoriamente por un mando bimanual sincronizado con relé de seguridad redundante Categoría 4.',
    votes: 24,
    isAdopted: true
  },
  {
    id: 'idea-3',
    category: 'Medio',
    author: 'Comité COPASST',
    role: 'Comité Paritario (COPASST)',
    text: 'Canalizar por bandeja aérea todas las mangueras neumáticas y cables eléctricos para despejar completamente la superficie de tránsito del operario.',
    votes: 15,
    isAdopted: true
  },
  {
    id: 'idea-4',
    category: 'GestionSST',
    author: 'Aprendiz SENA',
    role: 'Aprendiz',
    text: 'Establecer una inducción técnica obligatoria de 16 horas antes de que cualquier aprendiz o nuevo operario manipule máquinas industriales con evaluación práctica.',
    votes: 21,
    isAdopted: true
  },
  {
    id: 'idea-5',
    category: 'Individuo',
    author: 'Instructor Carlos Ospina',
    role: 'Instructor',
    text: 'Prohibir terminantemente el uso de guantes holgados en máquinas de prensa o corte, e implementar tenazas o pinzas magnéticas para manipular piezas en el troquel.',
    votes: 19,
    isAdopted: true
  }
];

export const EJEMPLO_MATRIZ_GTC45: Gtc45MatrixRow[] = [
  {
    id: 'row-1',
    proceso: 'Mecanizado y Conformado de Metales',
    zonaLugar: 'Taller de Troquelado - Nave 2',
    actividad: 'Troquelado de chapas automotrices',
    tarea: 'Posicionamiento y extracción de piezas en prensa hidráulica',
    rutinaria: true,
    peligroDescripcion: 'Atrapamiento y aplastamiento de extremidades en punto de operación de prensa',
    peligroClasificacion: 'Condiciones de Seguridad',
    efectosPosibles: 'Amputación traumática de falanges, fracturas óseas complejas, aplastamiento',
    controlFuente: 'Ninguno (guarda retirada y cortina puenteada)',
    controlMedio: 'Demarcación de piso desgastada',
    controlIndividuo: 'Guantes de hilaza inadecuados',
    nivelDeficiencia: 10, // Muy deficiente
    nivelExposicion: 4,    // Continua
    nivelConsecuencia: 60, // Muy grave (amputación)
    peorConsecuencia: 'Amputación total de la mano derecha con incapacidad permanente parcial superior al 45%',
    requisitoLegal: true,
    intervencionEliminacion: 'Alimentación neumática por gravedad para evitar que las manos ingresen al troquel.',
    intervencionSustitucion: 'No aplicable técnicamente para la prensa.',
    intervencionIngenieria: 'Instalar mando bimanual con simultaneidad de 0.5s y cortina de seguridad fotoeléctrica enclavada a la parada de emergencia.',
    intervencionAdministrativa: 'Procedimiento Seguro de Trabajo (PTS), tarjeta roja de parada segura por el trabajador, capacitación LOTO.',
    intervencionEpp: 'Pinzas de agarre magnético, guantes anticorte nivel 5 ajustados, gafas de seguridad Z87+.'
  },
  {
    id: 'row-2',
    proceso: 'Soldadura y Ensamble Estructural',
    zonaLugar: 'Bahía de Soldadura 4',
    actividad: 'Unión de perfiles de acero al carbono',
    tarea: 'Aplicación de cordón continuo con proceso MIG/GMAW',
    rutinaria: true,
    peligroDescripcion: 'Inhalación de humos metálicos y exposición a radiación UV no ionizante del arco',
    peligroClasificacion: 'Químico',
    efectosPosibles: 'Fiebre de humos metálicos, queratoconjuntivitis actínica, bronquitis crónica',
    controlFuente: 'Extracción localizada dañada',
    controlMedio: 'Mampara de lona plomada parcial',
    controlIndividuo: 'Careta de soldar común',
    nivelDeficiencia: 6,
    nivelExposicion: 3,
    nivelConsecuencia: 25,
    peorConsecuencia: 'Fibrosis pulmonar crónica e hipoacusia combinada',
    requisitoLegal: true,
    intervencionEliminacion: 'No aplica.',
    intervencionSustitucion: 'Emplear alambre con menor contenido de metales pesados volátiles.',
    intervencionIngenieria: 'Instalación de brazo de extracción localizada articulado con caudal mínimo de 1.200 m³/h.',
    intervencionAdministrativa: 'Monitoreo de humos metálicos, rotación del personal a tareas sin soldadura, espirometría anual.',
    intervencionEpp: 'Respirador con filtros para humos P100 bajo la careta de soldadura con visor fotosensible DIN 9-13.'
  }
];

export const PREGUNTAS_EVALUACION = [
  {
    id: 1,
    pregunta: '¿Cuál es la diferencia fundamental entre Peligro y Riesgo según la GTC 45 y el Decreto 1072 de 2015?',
    opciones: [
      'El peligro es la consecuencia final y el riesgo es el accidente de trabajo ocurrido.',
      'El peligro es la fuente, situación o acto con potencial de causar daño; el riesgo es la combinación de la probabilidad de que ocurra y la severidad del daño.',
      'El peligro solo aplica para riesgos físicos y el riesgo para aspectos psicosociales y químicos.',
      'Son términos sinónimos en la legislación colombiana y pueden utilizarse indistintamente.'
    ],
    respuestaCorrecta: 1,
    explicacionInstructor: '¡Excelente! Como siempre les recalco en el SENA: el cable pelado con corriente es el PELIGRO (la fuente). El RIESGO es la probabilidad de que el aprendiz lo toque y la severidad del choque eléctrico que pueda sufrir.'
  },
  {
    id: 2,
    pregunta: 'En la Jerarquía de Controles de Seguridad y Salud en el Trabajo, ¿cuál es el orden correcto de mayor a menor efectividad preventiva?',
    opciones: [
      'EPP → Controles Administrativos → Controles de Ingeniería → Sustitución → Eliminación',
      'Controles Administrativos → EPP → Sustitución → Controles de Ingeniería → Eliminación',
      'Eliminación → Sustitución → Controles de Ingeniería → Controles Administrativos → Equipos de Protección Personal (EPP)',
      'Controles de Ingeniería → Eliminación → EPP → Sustitución → Controles Administrativos'
    ],
    respuestaCorrecta: 2,
    explicacionInstructor: '¡Exacto! El EPP es la última línea de defensa, la más vulnerable y la que depende del comportamiento humano. Siempre debemos apuntar primero a eliminar el peligro en la fuente o aplicar controles de ingeniería.'
  },
  {
    id: 3,
    pregunta: 'Según la GTC 45, si calculamos un Nivel de Deficiencia (ND) de 10 y un Nivel de Exposición (NE) de 4, ¿cuál es el Nivel de Probabilidad (NP) y cómo se interpreta?',
    opciones: [
      'NP = 14 (Medio)',
      'NP = 40 (Muy Alto - MA)',
      'NP = 2.5 (Bajo - B)',
      'NP = 60 (Alto - A)'
    ],
    respuestaCorrecta: 1,
    explicacionInstructor: 'Muy bien. La fórmula de la GTC 45 es NP = ND × NE. Al multiplicar 10 × 4 obtenemos 40. Un valor entre 40 y 24 corresponde al rango "Muy Alto (MA)", lo que indica una situación crítica donde los controles fallan sistemáticamente.'
  },
  {
    id: 4,
    pregunta: 'De acuerdo con la Resolución 4272 de 2021 en Colombia, ¿a partir de qué altura sobre un nivel inferior se considera obligatoria la aplicación del reglamento de protección contra caídas?',
    opciones: [
      '1.50 metros',
      '1.80 metros',
      '2.00 metros',
      '3.00 metros'
    ],
    respuestaCorrecta: 2,
    explicacionInstructor: '¡Muy bien aprendido! Recuerda que la Resolución 4272 de 2021 actualizó el estándar anterior (1.50 m) fijando los 2.00 metros como umbral general para trabajo en alturas en Colombia, exigiendo coordinador, permiso de trabajo y sistemas certificados.'
  },
  {
    id: 5,
    pregunta: 'Ante el caso del aprendiz en la prensa de "Industrias del Valle", ¿cuál de las siguientes medidas representa un Control de Ingeniería auténtico?',
    opciones: [
      'Hacerle firmar un compromiso de no meter la mano al aprendiz.',
      'Suministrarle guantes de cuero más gruesos para proteger sus dedos.',
      'Instalar un mando bimanual sincronizado y una cortina fotoeléctrica enclavada al circuito de seguridad.',
      'Colocar un letrero que diga: "Peligro: Máquina en movimiento".'
    ],
    respuestaCorrecta: 2,
    explicacionInstructor: '¡Correcto! Los letreros y compromisos son controles administrativos. Los guantes son EPP. El control de ingeniería modifica físicamente el sistema para que la máquina no pueda descender si las manos están en el troquel.'
  }
];
