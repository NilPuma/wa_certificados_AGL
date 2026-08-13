// Creación de fragmento para optimizar manipulaciones del DOM
const fragmento = document.createDocumentFragment();

/* Invocamos a los botones del menu */
let btnMenuInicio = document.querySelector('#btnMenuInicio');
let btnMenuArchivos = document.querySelector('#btnMenuArchivos');
let btnMenuNotificacion = document.querySelector('#btnMenuNotificacion');
let btnMenuConfiguracion = document.querySelector('#btnMenuConfiguracion');
let btnMenuCerrar = document.querySelector('#btnMenuCerrar');

// Capturar referencia al contenedor principal de renderizado
let contenedorReactivo = document.querySelector('#contenedorReactivo');

// Capturar los templates de las secciones
const templateArchivos = document.querySelector('#templateArchivos').content;
const templateNotificacion = document.querySelector('#templateNotificacion').content;
const templateConfiguracion = document.querySelector('#templateConfiguracion').content;

/* Variables globales */
let listadoGeneralArchivos = {};
let certificadoActivo = null;
let toastTimeoutId = null;

/* ==========================================
   DATOS FICTICIOS - CERTIFICADOS
   ========================================== */

// Datos mock de certificados
const certificadosMockData = [
    {
        id: 1,
        codigo: 'CERT-2024-001',
        nombre: 'Certificado de Inspección de Equipos',
        fechaEmision: '15/01/2024',
        descripcion: 'Inspección técnica de equipos de perforación',
        archivo: null
    },
    {
        id: 2,
        codigo: 'CERT-2024-002',
        nombre: 'Certificado de Integridad Mecánica',
        fechaEmision: '28/02/2024',
        descripcion: 'Evaluación de integridad de ductos',
        archivo: null
    },
    {
        id: 3,
        codigo: 'CERT-2024-003',
        nombre: 'Certificado de Ensayos No Destructivos',
        fechaEmision: '10/03/2024',
        descripcion: 'Pruebas de ultrasonido en tanques',
        archivo: null
    },
    {
        id: 4,
        codigo: 'CERT-2024-004',
        nombre: 'Certificado de Análisis de Fallas',
        fechaEmision: '05/04/2024',
        descripcion: 'Análisis de falla en válvula de presión',
        archivo: null
    },
    {
        id: 5,
        codigo: 'CERT-2024-005',
        nombre: 'Certificado de Gestión de Riesgos',
        fechaEmision: '20/05/2024',
        descripcion: 'Estudio HAZOP para planta de procesos',
        archivo: null
    },
    {
        id: 6,
        codigo: 'CERT-2024-006',
        nombre: 'Certificado de Inspección de Ductos',
        fechaEmision: '12/06/2024',
        descripcion: 'Inspección de gasoducto principal',
        archivo: null
    },
    {
        id: 7,
        codigo: 'CERT-2024-007',
        nombre: 'Certificado de Auditoría Técnica',
        fechaEmision: '08/07/2024',
        descripcion: 'Auditoría de cumplimiento normativo',
        archivo: null
    },
    {
        id: 8,
        codigo: 'CERT-2024-008',
        nombre: 'Certificado de Capacitación Especializada',
        fechaEmision: '25/07/2024',
        descripcion: 'Capacitación en normas API 579',
        archivo: null
    }
];

/* ==========================================
   DATOS FICTICIOS - NOTIFICACIONES
   ========================================== */

// Datos mock de notificaciones
const notificacionesMockData = [
    {
        id: 1,
        titulo: 'Nuevo certificado disponible',
        mensaje: 'Se ha emitido un nuevo certificado para tu proyecto.',
        fecha: '2024-07-25T10:30:00',
        leida: false,
        tipo: 'certificado',
        icono: 'bi-file-earmark-pdf',
        color: 'bg-danger'
    },
    {
        id: 2,
        titulo: 'Certificado por vencer',
        mensaje: 'Tu certificado CERT-2024-004 vencerá en 30 días.',
        fecha: '2024-07-24T15:45:00',
        leida: false,
        tipo: 'advertencia',
        icono: 'bi-exclamation-triangle',
        color: 'bg-warning'
    },
    {
        id: 3,
        titulo: 'Actualización de datos',
        mensaje: 'Tus datos de contacto han sido actualizados exitosamente.',
        fecha: '2024-07-23T09:15:00',
        leida: true,
        tipo: 'info',
        icono: 'bi-info-circle',
        color: 'bg-primary'
    },
    {
        id: 4,
        titulo: 'Nueva cotización aprobada',
        mensaje: 'Tu cotización COT-2024-015 ha sido aprobada.',
        fecha: '2024-07-22T14:20:00',
        leida: false,
        tipo: 'exito',
        icono: 'bi-check-circle',
        color: 'bg-success'
    },
    {
        id: 5,
        titulo: 'Mantenimiento programado',
        mensaje: 'Se realizará mantenimiento del sistema el día 28/07/2024.',
        fecha: '2024-07-21T11:00:00',
        leida: true,
        tipo: 'info',
        icono: 'bi-tools',
        color: 'bg-secondary'
    },
    {
        id: 6,
        titulo: 'Certificado descargado',
        mensaje: 'Has descargado el certificado CERT-2024-001.',
        fecha: '2024-07-20T16:30:00',
        leida: true,
        tipo: 'info',
        icono: 'bi-download',
        color: 'bg-primary'
    }
];

/* ==========================================
   DATOS FICTICIOS - CONFIGURACIÓN
   ========================================== */

// Datos mock del usuario
const usuarioMockData = {
    nombres: 'Juan Carlos',
    apellidos: 'Pérez Rodríguez',
    dni: '12345678',
    telefono: '999-123-456',
    direccion: 'Av. Los Ingenieros 123, San Isidro'
};

/* ==========================================
   TOASTS / ALERTAS PERSONALIZADAS
   ========================================== */

/**
 * Muestra un toast personalizado
 * @param {string} tipo - Tipo de toast (exito, error, info, advertencia)
 * @param {string} titulo - Título del toast
 * @param {string} mensaje - Mensaje descriptivo
 */
function mostrarToast(tipo, titulo, mensaje) {
    var toast = document.getElementById('toastCertificado');
    var icono = document.getElementById('toastIcono');
    var elTitulo = document.getElementById('toastTitulo');
    var elMensaje = document.getElementById('toastMensaje');

    if (!toast || !icono || !elTitulo || !elMensaje) return;

    elTitulo.textContent = titulo;
    elMensaje.textContent = mensaje;

    var iconosPorTipo = {
        exito: 'bi-check-circle-fill',
        error: 'bi-x-circle-fill',
        info: 'bi-info-circle-fill',
        advertencia: 'bi-exclamation-triangle-fill'
    };

    toast.classList.remove('toast-exito', 'toast-error', 'toast-info', 'toast-advertencia');
    icono.classList.remove('bi-check-circle-fill', 'bi-x-circle-fill', 'bi-info-circle-fill', 'bi-exclamation-triangle-fill');

    toast.classList.add('toast-' + tipo);
    icono.classList.add(iconosPorTipo[tipo] || 'bi-info-circle-fill');

    toast.classList.add('is-visible');

    if (toastTimeoutId) clearTimeout(toastTimeoutId);
    toastTimeoutId = setTimeout(function() {
        toast.classList.remove('is-visible');
    }, 4000);
}

/**
 * Inicializa el botón de cierre del toast
 */
function inicializarToastCerrar() {
    var btnCerrar = document.getElementById('toastCerrar');
    var toast = document.getElementById('toastCertificado');
    if (!btnCerrar || !toast) return;

    btnCerrar.addEventListener('click', function() {
        toast.classList.remove('is-visible');
        if (toastTimeoutId) clearTimeout(toastTimeoutId);
    });
}

/* ==========================================
   FUNCIONES PARA CERTIFICADOS
   ========================================== */

/**
 * Obtiene los certificados filtrados según término de búsqueda
 * @param {string} filtro - Término de búsqueda (código o nombre)
 * @returns {Array} - Lista de certificados filtrados
 */
function obtenerCertificadosFiltrados(filtro = '') {
    let resultado = [...certificadosMockData];
    
    if (filtro.trim()) {
        const termino = filtro.trim().toUpperCase();
        resultado = resultado.filter(certificado => 
            certificado.codigo.toUpperCase().includes(termino) ||
            certificado.nombre.toUpperCase().includes(termino)
        );
    }
    
    return resultado;
}

/**
 * Renderiza la tabla de certificados
 * @param {Array} certificados - Lista de certificados a mostrar
 */
function renderizarTablaCertificados(certificados) {
    const tbody = document.querySelector('#tabla-certificados-body');
    
    if (!tbody) return;
    
    if (certificados.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="4" class="text-center text-muted py-4">
                    <i class="bi bi-file-earmark-x fs-3 d-block mb-2"></i>
                    <small>No se encontraron certificados</small>
                </td>
            </tr>`;
        return;
    }
    
    tbody.innerHTML = certificados.map(certificado => {
        return `
            <tr data-id="${certificado.id}">
                <td class="ps-3 fw-semibold">${certificado.codigo}</td>
                <td>${certificado.nombre}</td>
                <td>${certificado.fechaEmision}</td>
                <td class="text-center">
                    <button type="button" 
                            class="btn btn-outline-primary btn-sm btn-ver-mas-certificado" 
                            data-id="${certificado.id}"
                            title="Ver certificado">
                        <i class="bi bi-eye"></i> Ver más
                    </button>
                </td>
            </tr>`;
    }).join('');
    
    tbody.querySelectorAll('.btn-ver-mas-certificado').forEach(btn => {
        btn.addEventListener('click', () => {
            const certificadoId = parseInt(btn.getAttribute('data-id'));
            mostrarModalCertificado(certificadoId);
        });
    });
}

/**
 * Muestra el modal con el detalle del certificado
 * @param {number} id - ID del certificado
 */
function mostrarModalCertificado(id) {
    certificadoActivo = certificadosMockData.find(c => c.id === id);
    
    if (!certificadoActivo) return;
    
    document.querySelector('#modalCertificadoCodigo').textContent = certificadoActivo.codigo;
    document.querySelector('#modalCertificadoNombre').textContent = certificadoActivo.nombre;
    document.querySelector('#modalCertificadoFecha').textContent = certificadoActivo.fechaEmision;
    document.querySelector('#modalCertificadoDescripcion').textContent = certificadoActivo.descripcion;
    
    generarPDFSimulado(certificadoActivo);
    
    const modal = new bootstrap.Modal(document.querySelector('#modalVerCertificado'));
    modal.show();
}

/**
 * Genera un PDF simulado del certificado
 * @param {Object} certificado - Datos del certificado
 */
function generarPDFSimulado(certificado) {
    const contenedorPDF = document.querySelector('#certificadoPDF');
    
    if (!contenedorPDF) return;
    
    contenedorPDF.innerHTML = `
        <div class="pdf-simulado p-4 bg-light border rounded">
            <div class="text-center mb-4">
                <h4 class="fw-bold mb-1">AGL INTEGRITY S.A.C.</h4>
                <p class="text-muted mb-0 small">Ingeniería y Cumplimiento con Integridad y Precisión</p>
            </div>
            
            <hr>
            
            <div class="text-center mb-4">
                <h5 class="fw-bold text-uppercase mb-2">Certificado</h5>
                <p class="mb-0 small text-muted">${certificado.codigo}</p>
            </div>
            
            <div class="mb-4">
                <p class="mb-2"><strong>Asunto:</strong> ${certificado.nombre}</p>
                <p class="mb-2"><strong>Fecha de Emisión:</strong> ${certificado.fechaEmision}</p>
                <p class="mb-0"><strong>Descripción:</strong> ${certificado.descripcion}</p>
            </div>
            
            <div class="mb-4">
                <p class="mb-1"><strong>Cliente:</strong> ${usuarioMockData.nombres} ${usuarioMockData.apellidos}</p>
                <p class="mb-1"><strong>DNI:</strong> ${usuarioMockData.dni}</p>
                <p class="mb-0"><strong>Proyecto:</strong> [Nombre del Proyecto]</p>
            </div>
            
            <div class="mb-4">
                <p class="text-muted small mb-0">
                    Por medio del presente documento, se certifica que se ha realizado la evaluación técnica correspondiente,
                    cumpliendo con los estándares y normativas vigentes aplicables al sector energético, minero e hidrocarburos.
                </p>
            </div>
            
            <div class="row mt-5">
                <div class="col-6 text-center">
                    <div class="border-top pt-2 mx-4">
                        <p class="small mb-0">Firma del Responsable</p>
                        <p class="small text-muted mb-0">Ing. [Nombre]</p>
                    </div>
                </div>
                <div class="col-6 text-center">
                    <div class="border-top pt-2 mx-4">
                        <p class="small mb-0">Sello de la Empresa</p>
                        <p class="small text-muted mb-0">AGL INTEGRITY S.A.C.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Descarga el certificado como archivo
 */
function descargarCertificado() {
    if (!certificadoActivo) return;
    
    console.log('⬇️ Descargando certificado:', certificadoActivo.codigo);
    
    const contenidoPDF = `
        AGL INTEGRITY S.A.C.
        =====================
        
        CERTIFICADO: ${certificadoActivo.codigo}
        
        Asunto: ${certificadoActivo.nombre}
        Fecha de Emisión: ${certificadoActivo.fechaEmision}
        
        Descripción: ${certificadoActivo.descripcion}
        
        Cliente: ${usuarioMockData.nombres} ${usuarioMockData.apellidos}
        DNI: ${usuarioMockData.dni}
        Proyecto: [Nombre del Proyecto]
        
        Por medio del presente documento, se certifica que se ha realizado 
        la evaluación técnica correspondiente, cumpliendo con los estándares 
        y normativas vigentes.
        
        Firma del Responsable: _____________________
        Sello de la Empresa: AGL INTEGRITY S.A.C.
    `;
    
    const blob = new Blob([contenidoPDF], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const enlace = document.createElement('a');
    enlace.href = url;
    enlace.download = `${certificadoActivo.codigo}.txt`;
    document.body.appendChild(enlace);
    enlace.click();
    document.body.removeChild(enlace);
    URL.revokeObjectURL(url);
    
    mostrarToast('exito', 'Descarga exitosa', 'Certificado descargado correctamente');
}

/**
 * Configura los eventos de la vista de certificados
 */
function configurarEventosCertificados() {
    const inputBuscar = document.querySelector('#inputBuscarCertificado');
    
    if (inputBuscar) {
        inputBuscar.addEventListener('input', () => {
            const filtro = inputBuscar.value;
            const certificadosFiltrados = obtenerCertificadosFiltrados(filtro);
            renderizarTablaCertificados(certificadosFiltrados);
        });
    }
    
    const btnDescargar = document.querySelector('#btnDescargarCertificado');
    if (btnDescargar) {
        btnDescargar.addEventListener('click', descargarCertificado);
    }
}

/**
 * Inicializa la vista de certificados
 */
function inicializarVistaCertificados() {
    renderizarTablaCertificados(certificadosMockData);
    configurarEventosCertificados();
}

/* ==========================================
   FUNCIONES PARA NOTIFICACIONES
   ========================================== */

/**
 * Obtiene las notificaciones filtradas
 * @param {string} filtro - Filtro a aplicar (todas, no-leidas, leidas)
 * @returns {Array} - Lista de notificaciones filtradas
 */
function obtenerNotificacionesFiltradas(filtro = 'todas') {
    let resultado = [...notificacionesMockData];
    
    if (filtro === 'no-leidas') {
        resultado = resultado.filter(n => !n.leida);
    } else if (filtro === 'leidas') {
        resultado = resultado.filter(n => n.leida);
    }
    
    return resultado;
}

/**
 * Formatea la fecha de la notificación
 * @param {string} fechaISO - Fecha en formato ISO
 * @returns {string} - Fecha formateada
 */
function formatearFechaNotificacion(fechaISO) {
    const fecha = new Date(fechaISO);
    const ahora = new Date();
    const diferencia = ahora - fecha;
    
    const minutos = Math.floor(diferencia / 60000);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    
    if (minutos < 1) return 'Hace un momento';
    if (minutos < 60) return `Hace ${minutos} minutos`;
    if (horas < 24) return `Hace ${horas} horas`;
    if (dias === 1) return 'Ayer';
    if (dias < 7) return `Hace ${dias} días`;
    
    return fecha.toLocaleDateString('es-PE', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

/**
 * Renderiza la lista de notificaciones
 * @param {Array} notificaciones - Lista de notificaciones a mostrar
 */
function renderizarNotificaciones(notificaciones) {
    const contenedor = document.querySelector('#listaNotificaciones');
    
    if (!contenedor) return;
    
    if (notificaciones.length === 0) {
        contenedor.innerHTML = `
            <div class="text-center text-muted py-5">
                <i class="bi bi-bell-slash fs-1 d-block mb-3"></i>
                <p class="mb-0">No hay notificaciones</p>
            </div>`;
        return;
    }
    
    contenedor.innerHTML = notificaciones.map(notificacion => {
        const fechaFormateada = formatearFechaNotificacion(notificacion.fecha);
        
        return `
            <div class="card notificacion-card mb-2 shadow-sm ${notificacion.leida ? '' : 'border-start border-4 border-primary'}" 
                 data-id="${notificacion.id}">
                <div class="card-body d-flex align-items-start gap-3 py-3">
                    <div class="notificacion-icono ${notificacion.color} rounded-circle p-2 flex-shrink-0">
                        <i class="bi ${notificacion.icono} text-white"></i>
                    </div>
                    
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between align-items-start">
                            <h6 class="notificacion-titulo mb-1 fw-bold ${notificacion.leida ? 'text-muted' : ''}">
                                ${notificacion.titulo}
                            </h6>
                            ${!notificacion.leida ? '<span class="badge bg-primary rounded-pill">Nueva</span>' : ''}
                        </div>
                        <p class="mb-1 small ${notificacion.leida ? 'text-muted' : ''}">
                            ${notificacion.mensaje}
                        </p>
                        <small class="text-muted">
                            <i class="bi bi-clock me-1"></i>
                            ${fechaFormateada}
                        </small>
                    </div>
                    
                    ${!notificacion.leida ? `
                        <button type="button" 
                                class="btn btn-sm btn-outline-secondary btn-marcar-leida" 
                                data-id="${notificacion.id}"
                                title="Marcar como leída">
                            <i class="bi bi-check2"></i>
                        </button>
                    ` : ''}
                </div>
            </div>`;
    }).join('');
    
    contenedor.querySelectorAll('.btn-marcar-leida').forEach(btn => {
        btn.addEventListener('click', () => {
            const notificacionId = parseInt(btn.getAttribute('data-id'));
            marcarNotificacionLeida(notificacionId);
        });
    });
}

/**
 * Marca una notificación como leída
 * @param {number} id - ID de la notificación
 */
function marcarNotificacionLeida(id) {
    const notificacion = notificacionesMockData.find(n => n.id === id);
    
    if (notificacion) {
        notificacion.leida = true;
        
        const filtroActivo = document.querySelector('.btn-group .active')?.getAttribute('data-filtro') || 'todas';
        const notificacionesFiltradas = obtenerNotificacionesFiltradas(filtroActivo);
        renderizarNotificaciones(notificacionesFiltradas);
        
        mostrarToast('exito', 'Notificación leída', 'La notificación se marcó como leída');
    }
}

/**
 * Marca todas las notificaciones como leídas
 */
function marcarTodasLeidas() {
    notificacionesMockData.forEach(n => n.leida = true);
    
    const filtroActivo = document.querySelector('.btn-group .active')?.getAttribute('data-filtro') || 'todas';
    const notificacionesFiltradas = obtenerNotificacionesFiltradas(filtroActivo);
    renderizarNotificaciones(notificacionesFiltradas);
    
    mostrarToast('exito', 'Todo leído', 'Todas las notificaciones fueron marcadas como leídas');
}

/**
 * Configura los eventos de la vista de notificaciones
 */
function configurarEventosNotificaciones() {
    document.querySelectorAll('.btn-group [data-filtro]').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.btn-group [data-filtro]').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filtro = btn.getAttribute('data-filtro');
            const notificacionesFiltradas = obtenerNotificacionesFiltradas(filtro);
            renderizarNotificaciones(notificacionesFiltradas);
        });
    });
    
    const btnMarcarTodas = document.querySelector('#btnMarcarTodasLeidas');
    if (btnMarcarTodas) {
        btnMarcarTodas.addEventListener('click', marcarTodasLeidas);
    }
}

/**
 * Inicializa la vista de notificaciones
 */
function inicializarVistaNotificaciones() {
    renderizarNotificaciones(notificacionesMockData);
    configurarEventosNotificaciones();
}

/* ==========================================
   FUNCIONES PARA CONFIGURACIÓN
   ========================================== */

/**
 * Llena el formulario con los datos del usuario
 */
function llenarFormularioConfiguracion() {
    document.querySelector('#configNombres').value = usuarioMockData.nombres;
    document.querySelector('#configApellidos').value = usuarioMockData.apellidos;
    document.querySelector('#configDni').value = usuarioMockData.dni;
    document.querySelector('#configTelefono').value = usuarioMockData.telefono;
    document.querySelector('#configDireccion').value = usuarioMockData.direccion;
}

/**
 * Configura los eventos de la vista de configuración
 */
function configurarEventosConfiguracion() {
    const btnGuardar = document.querySelector('#btnGuardarConfiguracion');
    if (btnGuardar) {
        btnGuardar.addEventListener('click', (e) => {
            e.preventDefault();
            
            usuarioMockData.nombres = document.querySelector('#configNombres').value;
            usuarioMockData.apellidos = document.querySelector('#configApellidos').value;
            usuarioMockData.dni = document.querySelector('#configDni').value;
            usuarioMockData.telefono = document.querySelector('#configTelefono').value;
            usuarioMockData.direccion = document.querySelector('#configDireccion').value;
            
            mostrarToast('exito', 'Datos guardados', 'Los cambios se guardaron exitosamente');
        });
    }
    
    const btnCancelar = document.querySelector('#btnCancelarConfiguracion');
    if (btnCancelar) {
        btnCancelar.addEventListener('click', () => {
            llenarFormularioConfiguracion();
            mostrarToast('info', 'Datos restaurados', 'Se restauraron los datos originales');
        });
    }
}

/**
 * Inicializa la vista de configuración
 */
function inicializarVistaConfiguracion() {
    llenarFormularioConfiguracion();
    configurarEventosConfiguracion();
}

/* ==========================================
   FUNCIONES DE NAVEGACIÓN
   ========================================== */

btnMenuInicio.addEventListener('click', function() {
    contenedorReactivo.innerHTML = '';
    location.reload();
});

btnMenuArchivos.addEventListener('click', function(){
    contenedorReactivo.innerHTML = "";
    
    const clone = templateArchivos.cloneNode(true);
    const nuevoFragmento = document.createDocumentFragment();
    nuevoFragmento.appendChild(clone);
    contenedorReactivo.appendChild(nuevoFragmento);
    
    setTimeout(() => inicializarVistaCertificados(), 0);
});

btnMenuNotificacion.addEventListener('click', function(){
    contenedorReactivo.innerHTML = "";
    
    const clone = templateNotificacion.cloneNode(true);
    const nuevoFragmento = document.createDocumentFragment();
    nuevoFragmento.appendChild(clone);
    contenedorReactivo.appendChild(nuevoFragmento);
    
    setTimeout(() => inicializarVistaNotificaciones(), 0);
});

btnMenuConfiguracion.addEventListener('click', function(){
    contenedorReactivo.innerHTML = "";
    
    const clone = templateConfiguracion.cloneNode(true);
    const nuevoFragmento = document.createDocumentFragment();
    nuevoFragmento.appendChild(clone);
    contenedorReactivo.appendChild(nuevoFragmento);
    
    setTimeout(() => inicializarVistaConfiguracion(), 0);
});

btnMenuCerrar.addEventListener('click', function() {
    if (confirm('¿Está seguro de cerrar sesión?')) {
        window.location.href = '/';
    }
});

/* ==========================================
   INICIALIZACIÓN
   ========================================== */
document.addEventListener('DOMContentLoaded', function() {
    inicializarToastCerrar();
});