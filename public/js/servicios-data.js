// ============================================================
// DATOS DE SERVICIOS - AGL INTEGRITY S.A.C.
// Contenido dinámico para el modal de servicios
// ============================================================

const serviciosData = {
  'ingenieria-industrial': {
    titulo: 'Ingeniería de Instalaciones Industriales',
    imagen: '/img/servicios/ingenieria-industriales.jfif',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Servicio Integral de Ingeniería</h4>
      <p class="lh-lg nosotros-texto">Nuestro equipo de ingenieros especializados ofrece soluciones completas que abarcan todas las fases del proyecto, desde la conceptualización hasta la puesta en marcha, cumpliendo con los más altos estándares de calidad y normativas vigentes.</p>
      
      <h5 class="mt-4 mb-3 titulo-seccion">Áreas de Especialización:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Ingeniería Conceptual:</strong> Estudios de viabilidad, definición de alcances y anteproyectos para evaluar la factibilidad técnica y económica.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Ingeniería Básica:</strong> Diagramas de flujo, balances de materia y energía, especificaciones técnicas preliminares y selección de equipos principales.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Ingeniería de Detalle:</strong> Planos constructivos, isométricos, cálculos estructurales, memorias técnicas y documentos para construcción.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Gestión de Proyectos:</strong> Planificación, control de costos, supervisión de obra y cierre de proyectos bajo estándares PMI.
          </div>
        </li>
      </ul>
      
      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Sectores atendidos:</strong> Energético, Minero, Hidrocarburos, Industrial y Construcción.
      </div>
    `
  },
  
  'integridad-mecanica': {
    titulo: 'Integridad Mecánica de Activos',
    imagen: '/img/servicios/integridad-mecanica.jpg',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Gestión de Integridad de Activos</h4>
      <p class="lh-lg nosotros-texto">Implementamos programas integrales de integridad mecánica basados en normas internacionales (API, ASME, ISO) para maximizar la vida útil y confiabilidad de sus activos industriales, reduciendo riesgos operativos y costos de mantenimiento.</p>
      
      <h5 class="mt-4 mb-3 titulo-seccion">Servicios Específicos:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Inspección Basada en Riesgo (RBI):</strong> Metodología API 580/581 para optimizar planes de inspección según criticidad.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Evaluación de Vida Remanente:</strong> Cálculos de vida útil según condiciones operativas reales y mecanismos de daño.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Planes de Integridad:</strong> Documentos maestros con frecuencias, métodos y criterios de aceptación para cada activo.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Monitoreo de Condición:</strong> Seguimiento continuo de parámetros críticos como espesores, vibraciones y temperatura.
          </div>
        </li>
      </ul>
      
      <div class="alert alert-servicio-advertencia mt-4" role="alert">
        <i class="bi bi-exclamation-triangle me-2"></i>
        <strong>Normativas:</strong> Cumplimos con API 510, API 570, API 653, ASME B31.3 y el Anexo 3 del DS-043-2007-EM.
      </div>
    `
  },

  'fitness-for-service': {
    titulo: 'Fitness For Service (FFS)',
    imagen: '/img/servicios/fitness-service.jpg',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Evaluación de Aptitud para el Servicio</h4>
      <p class="lh-lg nosotros-texto">Aplicamos la metodología API 579-1/ASME FFS-1 para evaluar si un equipo con defectos o daños puede continuar operando de manera segura, determinando los límites de operación y los intervalos de inspección requeridos.</p>
      
      <h5 class="mt-4 mb-3 titulo-seccion">Niveles de Evaluación:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Nivel 1:</strong> Evaluación preliminar con criterios conservadores y datos mínimos de inspección.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Nivel 2:</strong> Análisis detallado con cálculos de mecánica de fractura y límites de operación específicos.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Nivel 3:</strong> Análisis avanzado mediante elementos finitos (FEA) para casos complejos con geometrías irregulares.
          </div>
        </li>
      </ul>
      
      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Aplicaciones:</strong> Pérdida de espesor, grietas, deformaciones, picaduras, daño por fuego y defectos de fabricación.
      </div>
    `
  },

  'analisis-fallas': {
    titulo: 'Análisis de Fallas',
    imagen: '/img/servicios/analisis-fallos.jpg',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Investigación de Fallas Mecánicas</h4>
      <p class="lh-lg nosotros-texto">Realizamos investigaciones exhaustivas de fallas en componentes industriales utilizando metodologías de análisis causa raíz (RCA) para identificar el origen del problema y proponer soluciones efectivas que eviten su recurrencia.</p>
      
      <h5 class="mt-4 mb-3 titulo-seccion">Metodología de Investigación:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Recopilación de Datos:</strong> Historial operativo, condiciones de servicio, registros de mantenimiento e inspecciones previas.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Ensayos de Laboratorio:</strong> Análisis metalográfico, microscopía electrónica, ensayos mecánicos y análisis químico.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Análisis Causa Raíz:</strong> Aplicación de técnicas como 5 Porqués, Diagrama de Ishikawa y Análisis de Árbol de Fallas.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Recomendaciones:</strong> Plan de acción correctivo y preventivo con medidas específicas de mitigación.
          </div>
        </li>
      </ul>
      
      <div class="alert alert-servicio-advertencia mt-4" role="alert">
        <i class="bi bi-exclamation-triangle me-2"></i>
        <strong>Tipos de fallas investigadas:</strong> Fractura frágil, fatiga, corrosión bajo tensión, creep, desgaste y fallas por sobrecarga.
      </div>
    `
  },

  'corrosion-materiales': {
    titulo: 'Corrosión y Materiales',
    imagen: '/img/servicios/corrosion-materiales.jpg',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Estudios de Corrosión y Selección de Materiales</h4>
      <p class="lh-lg nosotros-texto">Ofrecemos servicios especializados en el estudio de mecanismos de corrosión y degradación de materiales para ambientes agresivos, así como la selección óptima de materiales que garanticen la vida útil requerida en condiciones de operación específicas.</p>
      
      <h5 class="mt-4 mb-3 titulo-seccion">Servicios Específicos:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Evaluación de Mecanismos de Daño:</strong> Identificación de mecanismos activos según API 571 para refinerías y plantas de proceso.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Selección de Materiales:</strong> Recomendación de aleaciones y recubrimientos según condiciones de proceso y requisitos normativos.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Diagramas de Corrosión:</strong> Elaboración de diagramas de corrosión para circuitos y sistemas de tuberías.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Planes de Mitigación:</strong> Estrategias de control: inhibidores, protección catódica, recubrimientos y monitoreo.
          </div>
        </li>
      </ul>
      
      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Ambientes estudiados:</strong> Servicio con H₂S, CO₂, cloruros, altas temperaturas, ácidos y medios criogénicos.
      </div>
    `
  },

  'ensayos-no-destructivos': {
    titulo: 'Ensayos No Destructivos (END/NDT)',
    imagen: '/img/servicios/ensayos-no-destructivos.jpg',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Inspección No Destructiva Avanzada</h4>
      <p class="lh-lg nosotros-texto">Ejecutamos ensayos no destructivos con personal certificado bajo ASNT, empleando equipos de última generación para detectar discontinuidades y evaluar la integridad de componentes sin afectar su funcionalidad, garantizando resultados confiables y trazables.</p>
      
      <h5 class="mt-4 mb-3 titulo-seccion">Métodos de Inspección:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Ultrasonido Industrial (UT):</strong> Medición de espesores, detección de defectos internos y técnica Phased Array para inspecciones avanzadas.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Partículas Magnéticas (MT):</strong> Detección de discontinuidades superficiales y subsuperficiales en materiales ferromagnéticos.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Líquidos Penetrantes (PT):</strong> Revelado de grietas y poros abiertos a la superficie en cualquier material no poroso.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Radiografía Industrial (RT):</strong> Evaluación volumétrica de soldaduras y componentes mediante rayos X o gamma.
          </div>
        </li>
      </ul>
      
      <div class="alert alert-servicio-advertencia mt-4" role="alert">
        <i class="bi bi-exclamation-triangle me-2"></i>
        <strong>Certificaciones:</strong> Personal calificado ASNT Nivel II y III. Procedimientos según ASME Sec. V y API.
      </div>
    `
  },

  'inspeccion-perforacion': {
    titulo: 'Inspección de Equipos de Perforación',
    imagen: '/img/servicios/inspeccion-perforacion.jpg',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Inspección y Certificación de Equipos de Perforación</h4>
      <p class="lh-lg nosotros-texto">Realizamos inspecciones técnicas exhaustivas de equipos utilizados en operaciones de perforación y workover, verificando su condición mecánica y estructural conforme a estándares internacionales para garantizar operaciones seguras y continuas.</p>
      
      <h5 class="mt-4 mb-3 titulo-seccion">Alcance de Inspección:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Mástiles y Subestructuras:</strong> Inspección visual, medición de espesores y evaluación de integridad estructural según API 4F.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Malacates y Sistemas de Izaje:</strong> Evaluación de tambores, frenos, cables y poleas según API 7K y API 8C.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Bombas de Lodo:</strong> Inspección de componentes hidráulicos, válvulas y sistemas de sellado.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Sistemas de Seguridad:</strong> Verificación de BOP, acumuladores, líneas de control y sistemas de parada de emergencia.
          </div>
        </li>
      </ul>
      
      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Normas aplicables:</strong> API 4F, API 7K, API 8C, API 53, API RP 54 y DS-043-2007-EM.
      </div>
    `
  },

  'gestion-riesgos': {
    titulo: 'Gestión de Riesgos y Seguridad de Procesos',
    imagen: '/img/servicios/seguridad-procesos.jpg',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Seguridad de Procesos y Análisis de Riesgos</h4>
      <p class="lh-lg nosotros-texto">Aplicamos metodologías reconocidas internacionalmente para identificar, evaluar y gestionar riesgos en procesos industriales, ayudando a nuestros clientes a prevenir incidentes mayores y asegurar la continuidad operativa de sus instalaciones.</p>
      
      <h5 class="mt-4 mb-3 titulo-seccion">Estudios y Servicios:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>HAZOP:</strong> Análisis de peligros y operabilidad para identificar desviaciones de proceso y sus consecuencias.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>HAZID:</strong> Identificación temprana de peligros en etapas de diseño conceptual para prevenir riesgos.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>PSM (Process Safety Management):</strong> Implementación de sistemas de gestión de seguridad de procesos bajo OSHA 1910.119.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Análisis SIL:</strong> Determinación de niveles de integridad de seguridad para sistemas instrumentados según IEC 61511.
          </div>
        </li>
      </ul>
      
      <div class="alert alert-servicio-advertencia mt-4" role="alert">
        <i class="bi bi-exclamation-triangle me-2"></i>
        <strong>Entregables:</strong> Matrices de riesgos, reportes HAZOP, planes de acción y documentos de cierre de recomendaciones.
      </div>
    `
  },

  'integridad-ductos': {
    titulo: 'Integridad de Ductos',
    imagen: '/img/servicios/integridad-ductos.jpeg',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Gestión de Integridad de Sistemas de Transporte</h4>
      <p class="lh-lg nosotros-texto">Desarrollamos e implementamos programas de gestión de integridad para oleoductos, gasoductos y poliductos, alineados con normativas internacionales y locales, que permiten operar de forma segura, confiable y cumpliendo con los requisitos regulatorios peruanos.</p>
      
      <h5 class="mt-4 mb-3 titulo-seccion">Componentes del Programa:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Evaluación de Amenazas:</strong> Identificación de corrosión externa/interna, agrietamiento, daños mecánicos y fallas geotécnicas.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Inspección con Herramientas ILI:</strong> Especificación técnica, supervisión y análisis de datos de corridas instrumentadas.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Evaluación Directa:</strong> Metodologías ECDA, ICDA y SCCDA para ductos no pasibles de inspección interna.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Planes de Reparación:</strong> Priorización de anomalías, diseño de reparaciones y seguimiento post-intervención.
          </div>
        </li>
      </ul>
      
      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Normas:</strong> ASME B31.4, ASME B31.8, API 1160, API 1163, NACE SP0502 y DS-081-2007-EM.
      </div>
    `
  },

  'estudios-ambientales': {
    titulo: 'Estudios Ambientales y Cumplimiento',
    imagen: '/img/servicios/estudios-ambientales.jfif',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Gestión Ambiental para Proyectos Industriales</h4>
      <p class="lh-lg nosotros-texto">Elaboramos estudios ambientales completos y gestionamos los permisos necesarios ante las autoridades competentes, asegurando que los proyectos de nuestros clientes cumplan con la normativa ambiental peruana y estándares internacionales de sostenibilidad.</p>
      
      <h5 class="mt-4 mb-3 titulo-seccion">Instrumentos de Gestión Ambiental:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>EIA (Estudio de Impacto Ambiental):</strong> Estudios detallados y semidetallados para nuevos proyectos de gran envergadura.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>ITS (Informe Técnico Sustentatorio):</strong> Documentos para modificaciones de componentes aprobados en instrumentos existentes.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>PAMA (Programa de Adecuación y Manejo Ambiental):</strong> Planes para instalaciones existentes que requieren adecuación ambiental.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Monitoreo Ambiental:</strong> Programas de monitoreo de aire, agua, suelo y ruido ambiental para seguimiento continuo.
          </div>
        </li>
      </ul>
      
      <div class="alert alert-servicio-advertencia mt-4" role="alert">
        <i class="bi bi-exclamation-triangle me-2"></i>
        <strong>Autoridades:</strong> Trámites ante MINEM, SENACE, OEFA, ANA y gobiernos regionales según corresponda.
      </div>
    `
  },

  'capacitacion-tecnica': {
    titulo: 'Capacitación Técnica Especializada',
    imagen: '/img/servicios/capacitacion-corporativa.jpg',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Formación Técnica para la Industria</h4>
      <p class="lh-lg nosotros-texto">Ofrecemos programas de capacitación diseñados a medida para empresas del sector energético, minero e hidrocarburos, impartidos por instructores con amplia experiencia de campo y conocimiento actualizado de las normativas internacionales aplicables.</p>
      
      <h5 class="mt-4 mb-3 titulo-seccion">Cursos y Programas:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Normas API:</strong> Interpretación y aplicación de API 510, 570, 653, 580, 581 y otras normas de inspección.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Códigos ASME:</strong> Diseño, fabricación e inspección según ASME Sec. VIII, ASME B31.3 y ASME Sec. V.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Ensayos No Destructivos:</strong> Preparación para certificación ASNT en métodos UT, MT, PT y RT.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Integridad Mecánica:</strong> Programas de integridad, RBI, FFS y gestión de corrosión en plantas industriales.
          </div>
        </li>
      </ul>
      
      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Modalidades:</strong> Cursos presenciales en nuestras instalaciones o in-house en las facilidades del cliente.
      </div>
    `
  },

  'auditorias-tecnicas': {
    titulo: 'Auditorías Técnicas y Cumplimiento Normativo',
    imagen: '/img/servicios/auditoria-tecnica.jpg',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Auditorías de Integridad y Cumplimiento</h4>
      <p class="lh-lg nosotros-texto">Realizamos auditorías técnicas independientes para verificar el cumplimiento normativo, evaluar la efectividad de los programas de integridad y emitir diagnósticos objetivos que permitan a nuestros clientes implementar mejoras continuas en sus sistemas de gestión.</p>
      
      <h5 class="mt-4 mb-3 titulo-seccion">Tipos de Auditoría:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Auditorías de Integridad Mecánica:</strong> Verificación del cumplimiento de planes de inspección, frecuencias y criterios de aceptación.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Diagnósticos Normativos:</strong> Evaluación del cumplimiento de requisitos del DS-043-2007-EM y normas complementarias.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Due Diligence Técnica:</strong> Evaluaciones previas a la compra de activos o instalaciones para identificar pasivos ocultos.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Auditorías de Soldadura:</strong> Verificación de WPS, PQR y calificación de soldadores según ASME Sec. IX.
          </div>
        </li>
      </ul>
      
      <div class="alert alert-servicio-advertencia mt-4" role="alert">
        <i class="bi bi-exclamation-triangle me-2"></i>
        <strong>Entregables:</strong> Informes detallados con hallazgos, no conformidades, recomendaciones y planes de acción priorizados.
      </div>
    `
  }
};