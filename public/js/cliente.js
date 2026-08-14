// ==========================================
// CONSTANTES Y REFERENCIAS DEL DOM
// ==========================================

// Referencias del menú
const btnMenuArchivos = document.querySelector('#btnMenuArchivos');
const btnMenuNotificacion = document.querySelector('#btnMenuNotificacion');
const btnMenuConfiguracion = document.querySelector('#btnMenuConfiguracion');
const btnMenuCerrar = document.querySelector('#btnMenuCerrar');

// Contenedor principal
const contenedorReactivo = document.querySelector('#contenedorReactivo');

// Templates
const templateArchivos = document.querySelector('#templateArchivos').content;
const templateNotificacion = document.querySelector('#templateNotificacion').content;
const templateConfiguracion = document.querySelector('#templateConfiguracion').content;

// Variables globales
let certificadoActivo = null;
let toastTimeoutId = null;
let modalCerrarSesion = null;

// Variables de paginación (simplificadas)
let paginaActual = 1;
let registrosPorPagina = 5;
let certificadosFiltrados = [];

// ==========================================
// UTILIDADES DEL DOM
// ==========================================

/**
 * Crea un elemento DOM con atributos y contenido
 */
function crearElemento(tag, opciones = {}) {
    const elemento = document.createElement(tag);
    
    if (opciones.className) elemento.className = opciones.className;
    if (opciones.id) elemento.id = opciones.id;
    if (opciones.text !== undefined) elemento.textContent = opciones.text;
    if (opciones.type) elemento.type = opciones.type;
    if (opciones.title) elemento.title = opciones.title;
    if (opciones.colSpan) elemento.colSpan = opciones.colSpan;
    
    if (opciones.dataset) {
        Object.entries(opciones.dataset).forEach(([key, value]) => {
            elemento.dataset[key] = value;
        });
    }
    
    if (opciones.attributes) {
        Object.entries(opciones.attributes).forEach(([key, value]) => {
            elemento.setAttribute(key, value);
        });
    }
    
    if (opciones.children) {
        opciones.children.forEach(child => {
            if (child) elemento.appendChild(child);
        });
    }
    
    if (opciones.events) {
        Object.entries(opciones.events).forEach(([evento, handler]) => {
            elemento.addEventListener(evento, handler);
        });
    }
    
    return elemento;
}

/**
 * Limpia el contenido de un elemento
 */
function limpiarElemento(elemento) {
    while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
    }
}

// ==========================================
// DATOS FICTICIOS (MOCK DATA)
// ==========================================

// Certificados
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
    },
    {
        id: 9,
        codigo: 'CERT-2024-009',
        nombre: 'Certificado de Soldadura Estructural',
        fechaEmision: '01/08/2024',
        descripcion: 'Calificación de procedimientos de soldadura',
        archivo: null
    },
    {
        id: 10,
        codigo: 'CERT-2024-010',
        nombre: 'Certificado de Pruebas Hidrostáticas',
        fechaEmision: '15/08/2024',
        descripcion: 'Pruebas de presión en tuberías',
        archivo: null
    },
    {
        id: 11,
        codigo: 'CERT-2024-011',
        nombre: 'Certificado de Inspección Termográfica',
        fechaEmision: '22/08/2024',
        descripcion: 'Análisis termográfico de equipos eléctricos',
        archivo: null
    },
    {
        id: 12,
        codigo: 'CERT-2024-012',
        nombre: 'Certificado de Calibración de Equipos',
        fechaEmision: '30/08/2024',
        descripcion: 'Calibración de instrumentos de medición',
        archivo: null
    }
];

// Notificaciones
const notificacionesMockData = [
    {
        id: 1,
        titulo: 'Nuevo certificado disponible',
        mensaje: 'Se ha emitido un nuevo certificado para tu proyecto.',
        fecha: '2024-07-25T10:30:00',
        tipo: 'certificado',
        icono: 'bi-file-earmark-pdf',
        color: 'bg-danger'
    },
    {
        id: 2,
        titulo: 'Certificado por vencer',
        mensaje: 'Tu certificado CERT-2024-004 vencerá en 30 días.',
        fecha: '2024-07-24T15:45:00',
        tipo: 'advertencia',
        icono: 'bi-exclamation-triangle',
        color: 'bg-warning'
    },
    {
        id: 3,
        titulo: 'Actualización de datos',
        mensaje: 'Tus datos de contacto han sido actualizados exitosamente.',
        fecha: '2024-07-23T09:15:00',
        tipo: 'info',
        icono: 'bi-info-circle',
        color: 'bg-primary'
    },
    {
        id: 4,
        titulo: 'Nueva cotización aprobada',
        mensaje: 'Tu cotización COT-2024-015 ha sido aprobada.',
        fecha: '2024-07-22T14:20:00',
        tipo: 'exito',
        icono: 'bi-check-circle',
        color: 'bg-success'
    },
    {
        id: 5,
        titulo: 'Mantenimiento programado',
        mensaje: 'Se realizará mantenimiento del sistema el día 28/07/2024.',
        fecha: '2024-07-21T11:00:00',
        tipo: 'info',
        icono: 'bi-tools',
        color: 'bg-secondary'
    },
    {
        id: 6,
        titulo: 'Certificado descargado',
        mensaje: 'Has descargado el certificado CERT-2024-001.',
        fecha: '2024-07-20T16:30:00',
        tipo: 'info',
        icono: 'bi-download',
        color: 'bg-primary'
    }
];

// Usuario
const usuarioMockData = {
    nombres: 'Juan Carlos',
    apellidos: 'Pérez Rodríguez',
    dni: '12345678',
    telefono: '999-123-456',
    direccion: 'Av. Los Ingenieros 123, San Isidro'
};

// ==========================================
// SISTEMA DE TOASTS
// ==========================================

function mostrarToast(tipo, titulo, mensaje) {
    const toast = document.getElementById('toastCertificado');
    const icono = document.getElementById('toastIcono');
    const elTitulo = document.getElementById('toastTitulo');
    const elMensaje = document.getElementById('toastMensaje');

    if (!toast || !icono || !elTitulo || !elMensaje) return;

    elTitulo.textContent = titulo;
    elMensaje.textContent = mensaje;

    const iconosPorTipo = {
        exito: 'bi-check-circle-fill',
        error: 'bi-x-circle-fill',
        info: 'bi-info-circle-fill',
        advertencia: 'bi-exclamation-triangle-fill'
    };

    toast.classList.remove('toast-exito', 'toast-error', 'toast-info', 'toast-advertencia');
    icono.classList.remove('bi-check-circle-fill', 'bi-x-circle-fill', 'bi-info-circle-fill', 'bi-exclamation-triangle-fill');

    toast.classList.add(`toast-${tipo}`);
    icono.classList.add(iconosPorTipo[tipo] || 'bi-info-circle-fill');

    toast.classList.add('is-visible');

    if (toastTimeoutId) clearTimeout(toastTimeoutId);
    toastTimeoutId = setTimeout(() => {
        toast.classList.remove('is-visible');
    }, 4000);
}

function inicializarToastCerrar() {
    const btnCerrar = document.getElementById('toastCerrar');
    const toast = document.getElementById('toastCertificado');
    
    if (!btnCerrar || !toast) return;

    btnCerrar.addEventListener('click', () => {
        toast.classList.remove('is-visible');
        if (toastTimeoutId) clearTimeout(toastTimeoutId);
    });
}

// ==========================================
// GESTIÓN DE CIERRE DE SESIÓN
// ==========================================

/**
 * Inicializa el modal de cierre de sesión
 */
function inicializarModalCerrarSesion() {
    const modalElement = document.querySelector('#modalCerrarSesion');
    if (!modalElement) return;
    
    modalCerrarSesion = new bootstrap.Modal(modalElement);
    
    // Evento para confirmar cierre de sesión
    const btnConfirmar = document.querySelector('#btnConfirmarCerrarSesion');
    if (btnConfirmar) {
        btnConfirmar.addEventListener('click', ejecutarCierreSesion);
    }
}

/**
 * Abre el modal de confirmación de cierre de sesión
 */
function mostrarModalCerrarSesion() {
    if (!modalCerrarSesion) {
        inicializarModalCerrarSesion();
    }
    if (modalCerrarSesion) {
        modalCerrarSesion.show();
    }
}

/**
 * Ejecuta el cierre de sesión
 */
async function ejecutarCierreSesion() {
    const btnConfirmar = document.querySelector('#btnConfirmarCerrarSesion');
    if (!btnConfirmar) return;
    
    try {
        // Mostrar estado de carga en el botón
        const textoOriginal = btnConfirmar.textContent;
        btnConfirmar.disabled = true;
        btnConfirmar.textContent = 'Cerrando...';
        
        // Simular llamada al servidor (reemplazar con tu lógica real)
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Aquí iría la llamada real a tu backend
        // const respuesta = await axios.post('/api/auth/logout');
        
        // Limpiar datos de sesión
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        localStorage.removeItem('userSession');
        sessionStorage.clear();
        
        // Invalidar cookies si existen
        document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        
        // Cerrar el modal
        if (modalCerrarSesion) {
            modalCerrarSesion.hide();
        }
        
        // Mostrar toast de éxito
        mostrarToast('exito', 'Sesión cerrada', '¡Hasta pronto! Redirigiendo...');
        
        // Redirigir después de un breve delay
        setTimeout(() => {
            window.location.href = '/';
        }, 1500);
        
    } catch (error) {
        console.error('Error al cerrar sesión:', error);
        
        // Restaurar botón
        btnConfirmar.disabled = false;
        btnConfirmar.textContent = 'Salir';
        
        // Mostrar error
        mostrarToast('error', 'Error', 'No se pudo cerrar la sesión. Intente nuevamente.');
        
        // Cerrar modal
        if (modalCerrarSesion) {
            modalCerrarSesion.hide();
        }
    }
}

// ==========================================
// GESTIÓN DE CERTIFICADOS
// ==========================================

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

// ==========================================
// FUNCIONES DE PAGINACIÓN (SIMPLIFICADAS)
// ==========================================

function renderizarPaginacion(totalRegistros) {
    const contenedorPaginacion = document.querySelector('#paginacionCertificados');
    const infoPaginacion = document.querySelector('#infoPaginacion');
    
    if (!contenedorPaginacion || !infoPaginacion) return;
    
    const totalPaginas = Math.ceil(totalRegistros / registrosPorPagina);
    
    limpiarElemento(contenedorPaginacion);
    
    // Actualizar información
    if (totalRegistros === 0) {
        infoPaginacion.textContent = 'No hay certificados';
        return;
    }
    
    const inicio = (paginaActual - 1) * registrosPorPagina + 1;
    const fin = Math.min(inicio + registrosPorPagina - 1, totalRegistros);
    infoPaginacion.textContent = `Mostrando ${inicio}-${fin} de ${totalRegistros} certificados`;
    
    const fragment = document.createDocumentFragment();
    
    // Botón anterior
    fragment.appendChild(crearItemPaginacion({
        contenidoIcono: 'bi-chevron-left',
        pagina: paginaActual - 1,
        deshabilitado: paginaActual === 1
    }));
    
    // Botones de páginas
    for (let i = 1; i <= totalPaginas; i++) {
        fragment.appendChild(crearItemPaginacion({
            texto: String(i),
            pagina: i,
            activo: i === paginaActual
        }));
    }
    
    // Botón siguiente
    fragment.appendChild(crearItemPaginacion({
        contenidoIcono: 'bi-chevron-right',
        pagina: paginaActual + 1,
        deshabilitado: paginaActual === totalPaginas
    }));
    
    contenedorPaginacion.appendChild(fragment);
}

/**
 * Crea un <li> de paginación (número o flecha)
 */
function crearItemPaginacion({ texto, contenidoIcono, pagina, activo = false, deshabilitado = false }) {
    const clasesLi = ['page-item'];
    if (activo) clasesLi.push('active');
    if (deshabilitado) clasesLi.push('disabled');
    
    return crearElemento('li', {
        className: clasesLi.join(' '),
        children: [
            crearElemento('a', {
                className: 'page-link',
                attributes: { href: '#' },
                dataset: { pagina },
                children: contenidoIcono
                    ? [crearElemento('i', { className: `bi ${contenidoIcono}` })]
                    : undefined,
                text: contenidoIcono ? undefined : texto
            })
        ]
    });
}

/**
 * Cambia a una página específica
 */
function cambiarPagina(numeroPagina) {
    const totalPaginas = Math.ceil(certificadosFiltrados.length / registrosPorPagina);
    
    if (numeroPagina < 1 || numeroPagina > totalPaginas) return;
    
    paginaActual = numeroPagina;
    actualizarVistaCertificados();
}

/**
 * Actualiza la vista completa de certificados con paginación
 */
function actualizarVistaCertificados() {
    const inicio = (paginaActual - 1) * registrosPorPagina;
    const certificadosPagina = certificadosFiltrados.slice(inicio, inicio + registrosPorPagina);
    
    renderizarTablaCertificados(certificadosPagina);
    renderizarPaginacion(certificadosFiltrados.length);
}

function crearFilaCertificado(certificado) {
    return crearElemento('tr', {
        dataset: { id: certificado.id },
        children: [
            crearElemento('td', {
                className: 'ps-3 fw-semibold',
                text: certificado.codigo
            }),
            crearElemento('td', {
                text: certificado.nombre
            }),
            crearElemento('td', {
                text: certificado.fechaEmision
            }),
            crearElemento('td', {
                className: 'text-center',
                children: [
                    crearElemento('button', {
                        type: 'button',
                        className: 'btn btn-outline-primary btn-sm btn-ver-mas-certificado',
                        title: 'Ver certificado',
                        dataset: { id: certificado.id },
                        events: {
                            click: () => mostrarModalCertificado(certificado.id)
                        },
                        children: [
                            crearElemento('i', {
                                className: 'bi bi-eye'
                            }),
                            document.createTextNode(' Ver más')
                        ]
                    })
                ]
            })
        ]
    });
}

function renderizarTablaCertificados(certificados) {
    const tbody = document.querySelector('#tabla-certificados-body');
    
    if (!tbody) return;
    
    limpiarElemento(tbody);
    
    if (certificados.length === 0) {
        const tr = crearElemento('tr', {
            children: [
                crearElemento('td', {
                    colSpan: 4,
                    className: 'text-center text-muted py-4',
                    children: [
                        crearElemento('i', {
                            className: 'bi bi-file-earmark-x fs-3 d-block mb-2'
                        }),
                        crearElemento('small', {
                            text: 'No se encontraron certificados'
                        })
                    ]
                })
            ]
        });
        tbody.appendChild(tr);
        return;
    }
    
    const fragment = document.createDocumentFragment();
    certificados.forEach(certificado => {
        fragment.appendChild(crearFilaCertificado(certificado));
    });
    tbody.appendChild(fragment);
}

function mostrarModalCertificado(id) {
    certificadoActivo = certificadosMockData.find(c => c.id === id);
    
    if (!certificadoActivo) return;
    
    document.querySelector('#modalCertificadoCodigo').textContent = certificadoActivo.codigo;
    document.querySelector('#modalCertificadoNombre').textContent = certificadoActivo.nombre;
    document.querySelector('#modalCertificadoFecha').textContent = certificadoActivo.fechaEmision;
    
    const modal = new bootstrap.Modal(document.querySelector('#modalVerCertificado'));
    modal.show();
}

function crearParrafo(texto, className = '') {
    return crearElemento('p', {
        className,
        text: texto
    });
}

function crearParrafoConStrong(label, valor, className = '') {
    return crearElemento('p', {
        className,
        children: [
            crearElemento('strong', { text: label }),
            document.createTextNode(` ${valor}`)
        ]
    });
}

function generarPDFSimulado(certificado) {
    const contenedorPDF = document.querySelector('#certificadoPDF');
    
    if (!contenedorPDF) return;
    
    limpiarElemento(contenedorPDF);
    
    // Contenedor principal
    const pdfDiv = crearElemento('div', {
        className: 'pdf-simulado p-4 bg-light border rounded'
    });
    
    // Header
    const header = crearElemento('div', {
        className: 'text-center mb-4',
        children: [
            crearElemento('h4', {
                className: 'fw-bold mb-1',
                text: 'AGL INTEGRITY S.A.C.'
            }),
            crearElemento('p', {
                className: 'text-muted mb-0 small',
                text: 'Ingeniería y Cumplimiento con Integridad y Precisión'
            })
        ]
    });
    pdfDiv.appendChild(header);
    
    // Separador
    pdfDiv.appendChild(document.createElement('hr'));
    
    // Título del certificado
    const tituloCert = crearElemento('div', {
        className: 'text-center mb-4',
        children: [
            crearElemento('h5', {
                className: 'fw-bold text-uppercase mb-2',
                text: 'Certificado'
            }),
            crearElemento('p', {
                className: 'mb-0 small text-muted',
                text: certificado.codigo
            })
        ]
    });
    pdfDiv.appendChild(tituloCert);
    
    // Información principal
    const infoPrincipal = crearElemento('div', {
        className: 'mb-4',
        children: [
            crearParrafoConStrong('Asunto:', certificado.nombre, 'mb-2'),
            crearParrafoConStrong('Fecha de Emisión:', certificado.fechaEmision, 'mb-2'),
            crearParrafoConStrong('Descripción:', certificado.descripcion, 'mb-0')
        ]
    });
    pdfDiv.appendChild(infoPrincipal);
    
    // Información del cliente
    const infoCliente = crearElemento('div', {
        className: 'mb-4',
        children: [
            crearParrafoConStrong('Cliente:', `${usuarioMockData.nombres} ${usuarioMockData.apellidos}`, 'mb-1'),
            crearParrafoConStrong('DNI:', usuarioMockData.dni, 'mb-1'),
            crearParrafoConStrong('Proyecto:', '[Nombre del Proyecto]', 'mb-0')
        ]
    });
    pdfDiv.appendChild(infoCliente);
    
    // Descripción legal
    const descripcionLegal = crearElemento('div', {
        className: 'mb-4',
        children: [
            crearElemento('p', {
                className: 'text-muted small mb-0',
                text: 'Por medio del presente documento, se certifica que se ha realizado la evaluación técnica correspondiente, cumpliendo con los estándares y normativas vigentes aplicables al sector energético, minero e hidrocarburos.'
            })
        ]
    });
    pdfDiv.appendChild(descripcionLegal);
    
    // Firmas
    const firmas = crearElemento('div', {
        className: 'row mt-5',
        children: [
            crearElemento('div', {
                className: 'col-6 text-center',
                children: [
                    crearElemento('div', {
                        className: 'border-top pt-2 mx-4',
                        children: [
                            crearElemento('p', {
                                className: 'small mb-0',
                                text: 'Firma del Responsable'
                            }),
                            crearElemento('p', {
                                className: 'small text-muted mb-0',
                                text: 'Ing. [Nombre]'
                            })
                        ]
                    })
                ]
            }),
            crearElemento('div', {
                className: 'col-6 text-center',
                children: [
                    crearElemento('div', {
                        className: 'border-top pt-2 mx-4',
                        children: [
                            crearElemento('p', {
                                className: 'small mb-0',
                                text: 'Sello de la Empresa'
                            }),
                            crearElemento('p', {
                                className: 'small text-muted mb-0',
                                text: 'AGL INTEGRITY S.A.C.'
                            })
                        ]
                    })
                ]
            })
        ]
    });
    pdfDiv.appendChild(firmas);
    
    contenedorPDF.appendChild(pdfDiv);
}

function descargarCertificado() {
    if (!certificadoActivo) return;
    
    console.log('⬇️ Descargando certificado:', certificadoActivo.codigo);
    
    const contenidoPDF = [
        'AGL INTEGRITY S.A.C.',
        '=====================',
        '',
        `CERTIFICADO: ${certificadoActivo.codigo}`,
        '',
        `Asunto: ${certificadoActivo.nombre}`,
        `Fecha de Emisión: ${certificadoActivo.fechaEmision}`,
        '',
        `Descripción: ${certificadoActivo.descripcion}`,
        '',
        `Cliente: ${usuarioMockData.nombres} ${usuarioMockData.apellidos}`,
        `DNI: ${usuarioMockData.dni}`,
        'Proyecto: [Nombre del Proyecto]',
        '',
        'Por medio del presente documento, se certifica que se ha realizado',
        'la evaluación técnica correspondiente, cumpliendo con los estándares',
        'y normativas vigentes.',
        '',
        'Firma del Responsable: _____________________',
        'Sello de la Empresa: AGL INTEGRITY S.A.C.'
    ].join('\n');
    
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

function configurarEventosCertificados() {
    // Evento para el buscador
    const inputBuscar = document.querySelector('#inputBuscarCertificado');
    
    if (inputBuscar) {
        inputBuscar.addEventListener('input', () => {
            const filtro = inputBuscar.value;
            certificadosFiltrados = obtenerCertificadosFiltrados(filtro);
            paginaActual = 1; // Resetear a primera página al buscar
            actualizarVistaCertificados();
        });
    }
    
    // Evento para el selector de registros por página
    const selectRegistros = document.querySelector('#selectRegistrosPorPagina');
    
    if (selectRegistros) {
        selectRegistros.addEventListener('change', (e) => {
            registrosPorPagina = parseInt(e.target.value);
            paginaActual = 1; // Resetear a primera página
            actualizarVistaCertificados();
        });
    }
    
    // Evento para descargar certificado
    const btnDescargar = document.querySelector('#btnDescargarCertificado');
    if (btnDescargar) {
        btnDescargar.addEventListener('click', descargarCertificado);
    }
    
    // Delegación de eventos para paginación
    const contenedorPaginacion = document.querySelector('#paginacionCertificados');
    if (contenedorPaginacion) {
        contenedorPaginacion.addEventListener('click', (e) => {
            e.preventDefault();
            const link = e.target.closest('.page-link');
            if (!link || link.parentElement.classList.contains('disabled')) return;
            
            const pagina = parseInt(link.dataset.pagina, 10);
            cambiarPagina(pagina);
        });
    }
}

function inicializarVistaCertificados() {
    // Inicializar variables de paginación
    paginaActual = 1;
    registrosPorPagina = 5;
    certificadosFiltrados = [...certificadosMockData];
    
    configurarEventosCertificados();
    actualizarVistaCertificados();
}

// ==========================================
// GESTIÓN DE NOTIFICACIONES
// ==========================================

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

function crearTarjetaNotificacion(notificacion) {
    const fechaFormateada = formatearFechaNotificacion(notificacion.fecha);
    
    // Card principal
    const card = crearElemento('div', {
        className: 'card notificacion-card mb-2 shadow-sm',
        dataset: { id: notificacion.id }
    });
    
    // Card body
    const cardBody = crearElemento('div', {
        className: 'card-body d-flex align-items-start gap-3 py-3'
    });
    
    // Icono
    const iconoContenedor = crearElemento('div', {
        className: `notificacion-icono ${notificacion.color} rounded-circle p-2 flex-shrink-0`,
        children: [
            crearElemento('i', {
                className: `bi ${notificacion.icono} text-white`
            })
        ]
    });
    cardBody.appendChild(iconoContenedor);
    
    // Contenido
    const contenido = crearElemento('div', {
        className: 'flex-grow-1'
    });
    
    // Título
    contenido.appendChild(
        crearElemento('h6', {
            className: 'notificacion-titulo mb-1 fw-bold',
            text: notificacion.titulo
        })
    );
    
    // Mensaje
    contenido.appendChild(
        crearElemento('p', {
            className: 'mb-1 small',
            text: notificacion.mensaje
        })
    );
    
    // Fecha
    contenido.appendChild(
        crearElemento('small', {
            className: 'text-muted',
            children: [
                crearElemento('i', {
                    className: 'bi bi-clock me-1'
                }),
                document.createTextNode(fechaFormateada)
            ]
        })
    );
    
    cardBody.appendChild(contenido);
    card.appendChild(cardBody);
    return card;
}

function renderizarNotificaciones(notificaciones) {
    const contenedor = document.querySelector('#listaNotificaciones');
    
    if (!contenedor) return;
    
    limpiarElemento(contenedor);
    
    if (notificaciones.length === 0) {
        const vacio = crearElemento('div', {
            className: 'text-center text-muted py-5',
            children: [
                crearElemento('i', {
                    className: 'bi bi-bell-slash fs-1 d-block mb-3'
                }),
                crearElemento('p', {
                    className: 'mb-0',
                    text: 'No hay notificaciones'
                })
            ]
        });
        contenedor.appendChild(vacio);
        return;
    }
    
    const fragment = document.createDocumentFragment();
    notificaciones.forEach(notificacion => {
        fragment.appendChild(crearTarjetaNotificacion(notificacion));
    });
    contenedor.appendChild(fragment);
}

function inicializarVistaNotificaciones() {
    renderizarNotificaciones(notificacionesMockData);
}

// ==========================================
// GESTIÓN DE CONFIGURACIÓN
// ==========================================

function llenarFormularioConfiguracion() {
    document.querySelector('#configNombres').value = usuarioMockData.nombres;
    document.querySelector('#configApellidos').value = usuarioMockData.apellidos;
    document.querySelector('#configDni').value = usuarioMockData.dni;
    document.querySelector('#configTelefono').value = usuarioMockData.telefono;
    document.querySelector('#configDireccion').value = usuarioMockData.direccion;
}

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

function inicializarVistaConfiguracion() {
    llenarFormularioConfiguracion();
    configurarEventosConfiguracion();
}

// ==========================================
// NAVEGACIÓN
// ==========================================

function cambiarVista(template, inicializador) {
    limpiarElemento(contenedorReactivo);
    
    const clone = template.cloneNode(true);
    const fragment = document.createDocumentFragment();
    fragment.appendChild(clone);
    contenedorReactivo.appendChild(fragment);
    
    setTimeout(inicializador, 0);
}

btnMenuArchivos.addEventListener('click', () => {
    cambiarVista(templateArchivos, inicializarVistaCertificados);
});

btnMenuNotificacion.addEventListener('click', () => {
    cambiarVista(templateNotificacion, inicializarVistaNotificaciones);
});

btnMenuConfiguracion.addEventListener('click', () => {
    cambiarVista(templateConfiguracion, inicializarVistaConfiguracion);
});

// Evento modificado para cerrar sesión con modal
btnMenuCerrar.addEventListener('click', (e) => {
    e.preventDefault();
    mostrarModalCerrarSesion();
});

// ==========================================
// INICIALIZACIÓN
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    inicializarToastCerrar();
    inicializarModalCerrarSesion(); // Inicializar modal de cierre de sesión
    
    // Cargar la vista de Certificados por defecto al iniciar
    cambiarVista(templateArchivos, inicializarVistaCertificados);
});