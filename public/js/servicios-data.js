// ============================================================
// DATOS DE SERVICIOS - AGL INTEGRITY S.A.C.
// Contenido dinámico para el modal de servicios
// ============================================================

const serviciosData = {

  // ============================================================
  // 1. INTEGRIDAD DE RECIPIENTES A PRESIÓN
  // ============================================================
  'integridad-recipientes-presion': {
    titulo: 'Integridad de Recipientes a Presión',
    imagen: '/img/servicios/0.jpg',
    posicionImagen: 'center 40%',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Evaluación bajo ASME Sec. VIII y API 510</h4>
      <p class="lh-lg nosotros-texto">Gestionamos la integridad de recipientes a presión durante todo su ciclo de vida, desde el diseño y la fabricación hasta la operación. Aplicamos los requisitos de ASME Sec. VIII para diseño, fabricación, examinación y pruebas, y de API 510 para inspección en servicio, cálculo de vida remanente, reparación, alteración y recalificación.</p>

      <h5 class="mt-4 mb-3 titulo-seccion">Áreas de Especialización:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Fabricación según ASME Sec. VIII:</strong> Verifica que el diseño, la soldadura, la examinación y la prueba de presión cumplan con ASME Sec. VIII, IX y V, asegurando la conformidad del recipiente antes de su puesta en servicio.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Inspección en Servicio según API 510:</strong> Planifica y ejecuta inspecciones internas, externas y en operación, identificando los mecanismos de daño activos según API 571 para anticipar fallas.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Cálculo de Vida Remanente y MAWP:</strong> Determina la velocidad de corrosión, el espesor mínimo requerido y la presión máxima de trabajo admisible, para estimar la vida remanente y definir los intervalos de inspección conforme a API 510.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Reparaciones, Alteraciones y Recalificación:</strong> Define y verifica reparaciones, alteraciones y cambios en condiciones de diseño (rerating), conforme a API 510 y ASME PCC-2, restableciendo la integridad del equipo de forma segura y trazable.
          </div>
        </li>
      </ul>

      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Sectores atendidos:</strong> Hidrocarburos, Minero, Energético, Químico e Industrial.
      </div>
    `
  },

  // ============================================================
  // 2. INTEGRIDAD DE TUBERÍAS Y DUCTOS
  // ============================================================
  'integridad-tuberias-ductos': {
    titulo: 'Integridad de Tuberías y Ductos',
    imagen: '/img/servicios/1.jpg',
    posicionImagen: 'center 35%',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Evaluación bajo ASME B31 y API 570</h4>
      <p class="lh-lg nosotros-texto">Gestionamos la integridad de tuberías de proceso y ductos durante todo su ciclo de vida, desde la fabricación y el montaje hasta la operación. Aplicamos los requisitos de ASME B31 para fabricación, examinación y pruebas, y de API 570 para inspección en servicio, cálculo de vida remanente, reparación y alteración.</p>

      <h5 class="mt-4 mb-3 titulo-seccion">Áreas de Especialización:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Fabricación y Montaje según ASME B31:</strong> Verifica que la fabricación, examinación y prueba de presión de tuberías y ductos cumplan con ASME B31.3, B31.4 y B31.8, asegurando su conformidad antes de la puesta en servicio.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Inspección en Servicio según API 570:</strong> Establece circuitos de inspección y puntos de monitoreo de condición (CML), identificando los mecanismos de daño activos según API 571 para anticipar fallas.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Cálculo de Vida Remanente:</strong> Determina la velocidad de corrosión y el espesor mínimo requerido para estimar la vida remanente y definir los intervalos de inspección, conforme a API 570.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Evaluación de Pérdida de Metal en Ductos:</strong> Determina la resistencia remanente de zonas corroídas según ASME B31G, sustentando decisiones de operación, reducción de presión o reparación.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Reparaciones y Alteraciones:</strong> Define y verifica reparaciones de tuberías y ductos conforme a API 570 y ASME PCC-2, restableciendo su integridad de forma segura y trazable.
          </div>
        </li>
      </ul>

      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Sectores atendidos:</strong> Hidrocarburos, Minero, Energético e Industrial.
      </div>
    `
  },

  // ============================================================
  // 3. ENSAYO POR ULTRASONIDO CONVENCIONAL (UT y UTG)
  // ============================================================
  'ultrasonido-convencional': {
    titulo: 'Ensayo por Ultrasonido Convencional (UT y UTG)',
    imagen: '/img/servicios/2.jpg',
    posicionImagen: 'center 35%',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Inspección Volumétrica y Medición de Espesores</h4>
      <p class="lh-lg nosotros-texto">Detectamos, localizamos y dimensionamos discontinuidades internas en uniones soldadas y material base, evaluándolas según los criterios de aceptación del código aplicable para determinar si constituyen defectos. Además, realizamos medición de espesores para evaluar pérdida de material por corrosión o desgaste.</p>

      <h5 class="mt-4 mb-3 titulo-seccion">Áreas de Especialización:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Inspección de Uniones Soldadas:</strong> Detección y dimensionamiento de grietas, faltas de fusión, penetración incompleta, inclusiones y porosidad mediante técnica de haz angular.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Medición de Espesores:</strong> Determinación de espesor remanente y mapeo de corrosión en tanques, tuberías, recipientes a presión y estructuras.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Inspección de Material Base:</strong> Detección de laminaciones y discontinuidades en planchas y componentes, antes de su fabricación o durante su servicio.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Evaluación según Código:</strong> Interpretación de indicaciones bajo AWS D1.1, ASME Sec. V y VIII, API 1104, API 510 y API 570, entre otros.
          </div>
        </li>
      </ul>

      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Sectores atendidos:</strong> Minero, Hidrocarburos, Energético, Metalmecánico e Industrial.
      </div>
    `
  },

  // ============================================================
  // 4. ENSAYO POR ULTRASONIDO AVANZADO (PAUT y TOFD)
  // ============================================================
  'ultrasonido-avanzado': {
    titulo: 'Ensayo por Ultrasonido Avanzado (PAUT y TOFD)',
    imagen: '/img/servicios/3.jpg',
    posicionImagen: 'center 40%',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Inspección Volumétrica con Registro Digital</h4>
      <p class="lh-lg nosotros-texto">Aplicamos las técnicas de Phased Array (PAUT) y Tiempo de Vuelo por Difracción (TOFD) para detectar, localizar y dimensionar con alta precisión discontinuidades internas en uniones soldadas y material base. La inspección se registra digitalmente, lo que da trazabilidad completa y permite reevaluar los datos según los criterios de aceptación del código aplicable.</p>

      <h5 class="mt-4 mb-3 titulo-seccion">Áreas de Especialización:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Inspección de Soldaduras por PAUT:</strong> Barridos sectoriales y lineales con registro codificado, que generan una imagen de la sección inspeccionada para una interpretación más confiable.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Dimensionamiento por TOFD:</strong> Medición precisa de la altura de discontinuidades por difracción, con alta probabilidad de detección independientemente de su orientación.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Mapeo de Corrosión:</strong> Imágenes C-scan de pérdida de espesor en tanques, tuberías y recipientes a presión, para identificar corrosión generalizada y localizada.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Alternativa a la Radiografía:</strong> Inspección volumétrica sin radiación ionizante, sin interrumpir trabajos en el área y con resultados inmediatos, bajo ASME Sec. V y VIII, ISO 13588 e ISO 10863, entre otros.
          </div>
        </li>
      </ul>

      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Sectores atendidos:</strong> Minero, Hidrocarburos, Energético, Metalmecánico e Industrial.
      </div>
    `
  },

  // ============================================================
  // 5. PRUEBA DE HERMETICIDAD (LT)
  // ============================================================
  'prueba-hermeticidad': {
    titulo: 'Prueba de Hermeticidad (LT)',
    imagen: '/img/servicios/4.jpg',
    posicionImagen: 'center 40%',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Pruebas de Fugas y de Presión</h4>
      <p class="lh-lg nosotros-texto">Realizamos pruebas de hermeticidad en recipientes, tanques, cisternas y sistemas de tuberías para detectar y localizar fugas en soldaduras, uniones, conexiones y accesorios, y verificamos su resistencia mediante pruebas de presión. Los resultados se evalúan según los criterios de aceptación del código aplicable para garantizar la integridad y seguridad operativa del equipo.</p>

      <h5 class="mt-4 mb-3 titulo-seccion">Áreas de Especialización:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Prueba por Cambio de Presión:</strong> Evalúa la hermeticidad global de recipientes y sistemas cerrados, cuantificando su capacidad de retener presión dentro de los límites admisibles.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Prueba Hidrostática:</strong> Valida la resistencia mecánica y la hermeticidad de recipientes, tuberías y tanques a su presión de prueba, como requisito previo a su puesta en servicio o posterior a reparaciones y alteraciones.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Prueba de Burbuja por Presión Directa:</strong> Permite la localización precisa de fugas en uniones soldadas, bridas, empaquetaduras y conexiones, asegurando la integridad del sistema antes de su operación.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Prueba con Caja de Vacío:</strong> Verifica la hermeticidad de soldaduras con acceso por una sola cara, como fondos y placas anulares de tanques de almacenamiento, conforme a API 650 para construcción y API 653 para inspección, reparación y alteración.
          </div>
        </li>
      </ul>

      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Sectores atendidos:</strong> Hidrocarburos, Minero, Transporte de Materiales Peligrosos e Industrial.
      </div>
    `
  },

  // ============================================================
  // 6. ENSAYO POR TINTES PENETRANTES (PT)
  // ============================================================
  'tintes-penetrantes': {
    titulo: 'Ensayo por Tintes Penetrantes (PT)',
    imagen: '/img/servicios/5.jpg',
    posicionImagen: 'center 45%',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Detección de Discontinuidades Superficiales</h4>
      <p class="lh-lg nosotros-texto">Detectamos discontinuidades abiertas a la superficie, como grietas, porosidad, traslapes y faltas de fusión, en uniones soldadas, piezas fundidas, forjadas y componentes mecanizados. Las indicaciones se evalúan según los criterios de aceptación del código aplicable para determinar si constituyen defectos.</p>

      <h5 class="mt-4 mb-3 titulo-seccion">Áreas de Especialización:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Inspección de Uniones Soldadas:</strong> Valida la calidad superficial de pases de raíz, soldaduras terminadas y biseles, asegurando su conformidad antes de continuar con la fabricación o liberar el componente.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Materiales No Ferromagnéticos:</strong> Permite la inspección superficial de acero inoxidable, aluminio, cobre, titanio y otras aleaciones donde el ensayo por partículas magnéticas no es aplicable.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Inspección en Servicio:</strong> Identifica grietas por fatiga, corrosión bajo tensión y desgaste en ejes, carcasas y componentes críticos, para anticipar fallas y programar el mantenimiento.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Verificación de Reparaciones:</strong> Confirma la eliminación total de discontinuidades en excavaciones y zonas reparadas antes de proceder con la soldadura de relleno.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Evaluación según Código:</strong> Interpretación de indicaciones bajo ASME Sec. V Art. 6 y Sec. VIII, AWS D1.1 y ASTM E165, entre otros.
          </div>
        </li>
      </ul>

      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Sectores atendidos:</strong> Minero, Metalmecánico, Hidrocarburos, Energético e Industrial.
      </div>
    `
  },

  // ============================================================
  // 7. ENSAYO POR PARTÍCULAS MAGNÉTICAS (MT)
  // ============================================================
  'particulas-magneticas': {
    titulo: 'Ensayo por Partículas Magnéticas (MT)',
    imagen: '/img/servicios/6.jpg',
    posicionImagen: 'center 45%',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Detección de Discontinuidades Superficiales y Subsuperficiales</h4>
      <p class="lh-lg nosotros-texto">Detectamos discontinuidades superficiales y subsuperficiales cercanas a la superficie, como grietas, faltas de fusión, inclusiones y traslapes, en materiales ferromagnéticos. Las indicaciones se evalúan según los criterios de aceptación del código aplicable para determinar si constituyen defectos.</p>

      <h5 class="mt-4 mb-3 titulo-seccion">Áreas de Especialización:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Inspección de Uniones Soldadas:</strong> Valida la calidad de soldaduras en acero al carbono y de baja aleación, con alta sensibilidad para detectar grietas finas antes de liberar el componente a servicio.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Detección Subsuperficial:</strong> Permite identificar discontinuidades ubicadas ligeramente por debajo de la superficie, no detectables mediante inspección visual ni tintes penetrantes.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Equipos de Izaje y Estructuras:</strong> Verifica la integridad de ganchos, grilletes, orejas de izaje y elementos estructurales, reduciendo el riesgo de fallas en operaciones críticas.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Inspección en Servicio:</strong> Identifica grietas por fatiga en ejes, engranajes, chancadoras, cucharones y componentes sometidos a cargas cíclicas, para anticipar fallas y programar el mantenimiento.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Evaluación según Código:</strong> Interpretación de indicaciones bajo ASME Sec. V Art. 7 y Sec. VIII, AWS D1.1 y ASTM E709, entre otros.
          </div>
        </li>
      </ul>

      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Sectores atendidos:</strong> Minero, Metalmecánico, Hidrocarburos, Energético e Industrial.
      </div>
    `
  },

  // ============================================================
  // 8. ENSAYO VISUAL Y VIDEOSCOPÍA (VT)
  // ============================================================
  'ensayo-visual': {
    titulo: 'Ensayo Visual y Videoscopía (VT)',
    imagen: '/img/servicios/7.jpg',
    posicionImagen: 'center 50%',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Inspección Visual Directa y Remota</h4>
      <p class="lh-lg nosotros-texto">Evaluamos la condición superficial de uniones soldadas, componentes y equipos mediante inspección visual directa y remota, identificando discontinuidades, daños y desviaciones dimensionales. Con videoscopía accedemos al interior de equipos y zonas de difícil acceso sin necesidad de desmontaje. Los hallazgos se evalúan según los criterios de aceptación del código aplicable.</p>

      <h5 class="mt-4 mb-3 titulo-seccion">Áreas de Especialización:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Inspección de Uniones Soldadas:</strong> Verifica la conformidad de la soldadura antes, durante y después del proceso, incluyendo preparación de juntas, perfil, dimensiones, socavaciones, traslapes y porosidad superficial.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Inspección Remota por Videoscopía:</strong> Permite evaluar el interior de tuberías, intercambiadores de calor, recipientes, cajas de engranajes y turbinas sin desmontaje, reduciendo tiempos de parada y costos de mantenimiento.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Evaluación de Daños en Servicio:</strong> Identifica corrosión, erosión, desgaste, deformaciones y pérdida de recubrimientos en tanques, tuberías y estructuras, como base para la planificación del mantenimiento.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Control Dimensional:</strong> Verifica que componentes y uniones soldadas cumplan con las dimensiones y tolerancias establecidas en planos y especificaciones técnicas.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Evaluación según Código:</strong> Evaluación de hallazgos bajo ASME Sec. V Art. 9, AWS D1.1, API 510, API 570 y API 653, entre otros.
          </div>
        </li>
      </ul>

      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Sectores atendidos:</strong> Minero, Metalmecánico, Hidrocarburos, Energético e Industrial.
      </div>
    `
  },

  // ============================================================
  // 9. INSPECCIÓN DE RECUBRIMIENTOS
  // ============================================================
  'inspeccion-recubrimientos': {
    titulo: 'Inspección de Recubrimientos',
    imagen: '/img/servicios/8.jpg',
    posicionImagen: 'center 50%',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Control de Calidad de Recubrimientos Industriales</h4>
      <p class="lh-lg nosotros-texto">Verificamos la calidad de sistemas de recubrimiento en todas sus etapas, desde la preparación de superficie hasta la inspección final y en servicio. La medición de espesores de película seca se realiza conforme a SSPC-PA 2, garantizando que el recubrimiento cumpla con las especificaciones del proyecto y brinde la protección anticorrosiva esperada.</p>

      <h5 class="mt-4 mb-3 titulo-seccion">Áreas de Especialización:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Medición de Espesor de Película Seca (DFT):</strong> Determina la conformidad del espesor aplicado con los requisitos especificados, conforme a SSPC-PA 2 y ASTM D7091, asegurando la vida útil proyectada del sistema de protección.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Verificación de Preparación de Superficie:</strong> Confirma el grado de limpieza y el perfil de anclaje requeridos, según SSPC-SP e ISO 8501-1, para garantizar la correcta adherencia del recubrimiento.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Control de Condiciones Ambientales:</strong> Verifica que la humedad relativa, el punto de rocío y la temperatura de superficie se encuentren dentro de los límites admisibles durante la aplicación.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Ensayos de Adherencia y Discontinuidades:</strong> Evalúa la adherencia del sistema y detecta poros o discontinuidades en revestimientos para servicio de inmersión, según ASTM D4541 y NACE SP0188.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Evaluación de Recubrimientos en Servicio:</strong> Determina el grado de deterioro, corrosión y ampollamiento de sistemas existentes, como base para planificar el mantenimiento o repintado.
          </div>
        </li>
      </ul>

      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Sectores atendidos:</strong> Minero, Hidrocarburos, Energético, Metalmecánico e Industrial.
      </div>
    `
  },

  // ============================================================
  // 10. MANTENIMIENTO Y REPARACIONES
  // ============================================================
  'mantenimiento-reparaciones': {
    titulo: 'Mantenimiento y Reparaciones',
    imagen: '/img/servicios/9.jpg',
    posicionImagen: 'center 50%',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Reparaciones bajo ASME PCC-2</h4>
      <p class="lh-lg nosotros-texto">Ejecutamos reparaciones en recipientes a presión, tuberías y ductos conforme a ASME PCC-2, mediante métodos soldados, mecánicos y de material compuesto. Cada reparación se respalda con procedimientos calificados, ensayos no destructivos y pruebas de presión.</p>

      <h5 class="mt-4 mb-3 titulo-seccion">Áreas de Especialización:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Reparaciones por Soldadura:</strong> Restituyen el espesor y la resistencia de zonas con pérdida de metal mediante placas de inserción, recargue de soldadura y camisas de refuerzo.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Parches Soldados:</strong> Recuperan la integridad de zonas corroídas o dañadas como solución temporal o permanente, según su diseño y condición de servicio.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Reparaciones con Material Compuesto:</strong> Restablecen la resistencia de componentes con corrosión o fugas, sin trabajos en caliente y con mínima interrupción de la operación.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Contención de Fugas en Servicio:</strong> Controlan fugas activas mediante abrazaderas y cajas de contención, garantizando la continuidad operativa hasta la reparación definitiva.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Verificación de Reparaciones:</strong> Confirma la calidad de cada reparación mediante NDT, pruebas de presión y hermeticidad antes del retorno del equipo al servicio.
          </div>
        </li>
      </ul>

      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Sectores atendidos:</strong> Hidrocarburos, Minero, Energético, Químico e Industrial.
      </div>
    `
  },

  // ============================================================
  // 11. LIMPIEZA INDUSTRIAL
  // ============================================================
  'limpieza-industrial': {
    titulo: 'Limpieza Industrial',
    imagen: '/img/servicios/10.jpg',
    posicionImagen: 'center 35%',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Limpieza Interior de Tanques, Recipientes, Cisternas y Tuberías</h4>
      <p class="lh-lg nosotros-texto">Realizamos la limpieza interior de tanques, recipientes a presión, cisternas de transporte de materiales peligrosos y tuberías, removiendo residuos, lodos e incrustaciones mediante hidrolavado a alta presión, vapor y limpieza química. Cada trabajo se ejecuta bajo protocolos de espacio confinado y control de atmósfera, dejando el equipo apto para su inspección, reparación o retorno a la operación.</p>

      <h5 class="mt-4 mb-3 titulo-seccion">Áreas de Especialización:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Limpieza de Tanques de Almacenamiento:</strong> Remueve lodos, sedimentos y residuos de producto, habilitando la inspección interna del fondo y la envolvente.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Limpieza de Recipientes a Presión:</strong> Elimina depósitos e incrustaciones internas, como paso previo a la inspección interna y a trabajos de reparación.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Limpieza de Cisternas de Materiales Peligrosos:</strong> Descontamina y neutraliza compartimentos que transportan combustibles, ácidos y otros productos, para su inspección, reparación o cambio de producto.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Limpieza de Tuberías:</strong> Remueve incrustaciones y depósitos internos, restableciendo la capacidad de flujo y permitiendo su inspección.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Desgasificación y Control de Atmósfera:</strong> Verifica niveles de oxígeno, gases inflamables y tóxicos, garantizando el ingreso seguro del personal a espacios confinados.
          </div>
        </li>
      </ul>

      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Sectores atendidos:</strong> Hidrocarburos, Minero, Transporte de Materiales Peligrosos, Energético, Químico e Industrial.
      </div>
    `
  },

  // ============================================================
  // 12. ASESORAMIENTO NORMATIVO
  // ============================================================
  'asesoramiento-normativo': {
    titulo: 'Asesoramiento Normativo',
    imagen: '/img/servicios/11.jpg',
    posicionImagen: 'center 50%',
    contenido: `
      <h4 class="mb-3 titulo-seccion--principal">Cumplimiento de Códigos y Normas Internacionales</h4>
      <p class="lh-lg nosotros-texto">Asesoramos a nuestros clientes en la identificación y aplicación de las normas que rigen su proyecto o activo, en cualquier etapa: diseño, fabricación, puesta en marcha, operación, mantenimiento o reparación. Trabajamos con códigos y normas internacionales como ASME, API, AWS, NFPA, ASTM, ISO y AMPP (NACE/SSPC), además de la normativa nacional aplicable.</p>

      <h5 class="mt-4 mb-3 titulo-seccion">Áreas de Especialización:</h5>
      <ul class="list-unstyled">
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Identificación de Normativa Aplicable:</strong> Determinamos los códigos y normas que corresponden según el tipo de activo, su servicio y la etapa del proyecto.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Diseño, Fabricación y Puesta en Marcha:</strong> Orientamos sobre los requisitos de ASME, API y AWS para asegurar la conformidad desde el inicio del proyecto.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Inspección, Mantenimiento y Reparación:</strong> Definimos los criterios de API 510, API 570 y ASME PCC-2 para estructurar programas de integridad y reparaciones conformes.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Seguridad y Protección contra Incendios:</strong> Orientamos en el cumplimiento de los requisitos NFPA para instalaciones de almacenamiento y manejo de combustibles.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Revisión Documentaria:</strong> Evaluamos procedimientos, calificaciones de soldadura (WPS/PQR), dossiers de calidad e informes técnicos frente a los requisitos normativos.
          </div>
        </li>
        <li class="mb-3 d-flex">
          <i class="bi bi-check-circle-fill text-success me-3 mt-1"></i>
          <div>
            <strong>Cumplimiento Regulatorio Nacional:</strong> Alineamos sus activos y operaciones con la normativa peruana vigente, preparándolos para auditorías y fiscalizaciones.
          </div>
        </li>
      </ul>

      <div class="alert alert-servicio-info mt-4" role="alert">
        <i class="bi bi-info-circle me-2"></i>
        <strong>Sectores atendidos:</strong> Hidrocarburos, Minero, Transporte de Materiales Peligrosos, Energético, Químico e Industrial.
      </div>
    `
  }

};