document.addEventListener('DOMContentLoaded', async () => {
    await cargarPersonas();
    inicializarToastCerrar();
    
    /* setInterval(cargarPersonas, 5000); //aca podemos hacer polling cada 5Segundos*/
});

// Creación de fragmento para optimizar manipulaciones del DOM
const fragmento = document.createDocumentFragment();

/* Invocamos a los botones del menu */
let btnMenuInicio = document.querySelector('#btnMenuInicio');
let btnMenuClientes = document.querySelector('#btnMenuClientes');
let btnMenuArchivos = document.querySelector('#btnMenuArchivos');
let btnMenuNotificacion = document.querySelector('#btnMenuNotificacion');
let btnMenuConfiguracion = document.querySelector('#btnMenuConfiguracion');
let btnMenuCerrar = document.querySelector('#btnMenuCerrar');

// Capturar referencia al contenedor principal de renderizado
let contenedorReactivo = document.querySelector('#contenedorReactivo');

// Capturar los templates de las secciones
const templateContenedorClientes = document.querySelector('#templateContenedorClientes').content;
const templateContenedorArchivos = document.querySelector('#templateContenedorArchivos').content;
const templateContenedorNotificacion = document.querySelector('#templateContenedorNotificacion').content;
const templateContenedorConfiguracion = document.querySelector('#templateContenedorConfiguracion').content;

/* Variables globales */
let listadoGeneralArchivos = [];
let listadoGeneralPersonas = [];
let listadoGeneralUsuarios = [];

/* Variables de paginación */
let paginaActual = 1;
let registrosPorPagina = 5;
let terminoBusquedaActual = '';

async function cargarPersonas() {
    try {
        const response = await axios.get("/api/listarPersonas");
        listadoGeneralPersonas = [...response.data];
    } catch (error) {
        console.error(error);
    }
}

//MODULO DE CLIENTES-ADMIN
btnMenuClientes.addEventListener('click', function(){
    contenedorReactivo.innerHTML = "";
    const clone = templateContenedorClientes.cloneNode(true);
    fragmento.appendChild(clone);
    contenedorReactivo.appendChild(fragmento);
    
    // Resetear paginación
    paginaActual = 1;
    registrosPorPagina = 5;
    terminoBusquedaActual = '';
    
    listarPersonas();
});

// ========== FUNCIÓN CENTRAL DE RENDERIZADO ==========
function renderizarTablaClientes(datos) {
    let contenedorTablaCliente = document.querySelector('#contenedorTablaCliente');
    let busquedaVacia = document.querySelector('#busquedaVacia');
    const templateTablaClientes = document.querySelector('#templateTablaClientes').content;

    // Limpiar tabla y mensaje
    contenedorTablaCliente.innerHTML = "";
    busquedaVacia.textContent = '';
    busquedaVacia.classList.add('d-none');

    // Si no hay datos
    if (datos.length === 0) {
        busquedaVacia.textContent = 'No se encontraron resultados';
        busquedaVacia.classList.remove('d-none');
        renderizarInfoPaginacion(0, 0);
        renderizarPaginacion(0);
        return;
    }

    // Calcular paginación
    const totalPaginas = Math.ceil(datos.length / registrosPorPagina);
    if (paginaActual > totalPaginas) paginaActual = totalPaginas;
    if (paginaActual < 1) paginaActual = 1;

    const inicio = (paginaActual - 1) * registrosPorPagina;
    const pagina = datos.slice(inicio, inicio + registrosPorPagina);

    // Renderizar personas de la página actual
    pagina.forEach(persona => {
        templateTablaClientes.querySelector('.id-persona').textContent = persona.id_persona;
        templateTablaClientes.querySelector('.documento-persona').textContent = persona.documento;
        templateTablaClientes.querySelector('.nombres-persona').textContent = persona.nombres;
        templateTablaClientes.querySelector('.telefono-persona').textContent = persona.telefono;
        templateTablaClientes.querySelector('.estado-persona').innerHTML = `<input class="form-check-input estado-editar-personal" type="checkbox" value="" id="flexCheckDefault" disabled ${persona.estado ? "checked" : ""}>`;
        templateTablaClientes.querySelector('.btn-certificados').dataset.id = persona.id_persona;
        
        const clone = templateTablaClientes.cloneNode(true);
        fragmento.appendChild(clone);
    });
    
    contenedorTablaCliente.appendChild(fragmento);
    
    // Actualizar información y paginación
    renderizarInfoPaginacion(datos.length, inicio);
    renderizarPaginacion(totalPaginas);
}

function renderizarInfoPaginacion(total, inicio) {
    const infoPaginacion = document.querySelector('#infoPaginacion');
    if (total === 0) {
        infoPaginacion.textContent = '';
        return;
    }
    const desde = inicio + 1;
    const hasta = Math.min(inicio + registrosPorPagina, total);
    infoPaginacion.textContent = `Mostrando ${desde}-${hasta} de ${total} registros`;
}

function renderizarPaginacion(totalPaginas) {
    const contenedorPaginacion = document.querySelector('#paginacionClientes');
    contenedorPaginacion.innerHTML = '';

    if (totalPaginas <= 1) return;

    const crearBoton = (texto, pagina, deshabilitado = false, activo = false) => {
        const li = document.createElement('li');
        li.className = `page-item ${deshabilitado ? 'disabled' : ''} ${activo ? 'active' : ''}`;
        li.innerHTML = `<span class="page-link" data-pagina="${pagina}">${texto}</span>`;
        return li;
    };

    const crearElipsis = () => {
        const li = document.createElement('li');
        li.className = 'page-item disabled';
        li.innerHTML = '<span class="page-link">...</span>';
        return li;
    };

    // Botón anterior
    contenedorPaginacion.appendChild(crearBoton('«', paginaActual - 1, paginaActual === 1));

    // Lógica de paginación inteligente
    if (totalPaginas <= 7) {
        // Si hay pocas páginas, mostrar todas
        for (let i = 1; i <= totalPaginas; i++) {
            contenedorPaginacion.appendChild(crearBoton(i, i, false, i === paginaActual));
        }
    } else {
        // Siempre mostrar primera página
        contenedorPaginacion.appendChild(crearBoton(1, 1, false, paginaActual === 1));

        // Elipsis izquierda si es necesario
        if (paginaActual > 4) {
            contenedorPaginacion.appendChild(crearElipsis());
        }

        // Páginas alrededor de la actual
        const inicio = Math.max(2, paginaActual - 1);
        const fin = Math.min(totalPaginas - 1, paginaActual + 1);

        for (let i = inicio; i <= fin; i++) {
            contenedorPaginacion.appendChild(crearBoton(i, i, false, i === paginaActual));
        }

        // Elipsis derecha si es necesario
        if (paginaActual < totalPaginas - 3) {
            contenedorPaginacion.appendChild(crearElipsis());
        }

        // Siempre mostrar última página
        contenedorPaginacion.appendChild(crearBoton(totalPaginas, totalPaginas, false, paginaActual === totalPaginas));
    }

    // Botón siguiente
    contenedorPaginacion.appendChild(crearBoton('»', paginaActual + 1, paginaActual === totalPaginas));
}

// ========== FUNCIONES SIMPLIFICADAS ==========
function listarPersonas() {
    renderizarTablaClientes(listadoGeneralPersonas);
}

function filtrarPersonas(termino) {
    paginaActual = 1;
    terminoBusquedaActual = termino;
    
    const personasFiltradas = listadoGeneralPersonas.filter(persona => {
        return persona.documento.toString().includes(termino) ||
               persona.nombres.toLowerCase().includes(termino);
    });
    
    renderizarTablaClientes(personasFiltradas);
}

function filtrarPersonasSinResetPagina(termino) {
    terminoBusquedaActual = termino;
    
    const personasFiltradas = listadoGeneralPersonas.filter(persona => {
        return persona.documento.toString().includes(termino) ||
               persona.nombres.toLowerCase().includes(termino);
    });
    
    renderizarTablaClientes(personasFiltradas);
}

// ========== EVENTOS ==========
document.addEventListener('input', function(event) {
    const buscador = event.target.closest('#inputBuscarCertificado');
    if (!buscador) {
        return;
    }

    const termino = buscador.value.toLowerCase().trim();
    filtrarPersonas(termino);
});

// Evento para paginación
document.addEventListener('click', function(event) {
    const botonPagina = event.target.closest('#paginacionClientes .page-link');
    if (!botonPagina) return;

    const li = botonPagina.closest('.page-item');
    if (li.classList.contains('disabled')) return;

    paginaActual = parseInt(botonPagina.dataset.pagina, 10);

    if (terminoBusquedaActual) {
        filtrarPersonasSinResetPagina(terminoBusquedaActual);
    } else {
        renderizarTablaClientes(listadoGeneralPersonas);
    }
});

// Evento para cambiar registros por página
document.addEventListener('change', function(event) {
    const select = event.target.closest('#selectRegistrosPorPagina');
    if (!select) return;

    registrosPorPagina = parseInt(select.value, 10);
    paginaActual = 1;

    if (terminoBusquedaActual) {
        filtrarPersonas(terminoBusquedaActual);
    } else {
        listarPersonas();
    }
});

function limpiarRegistro() {
  document.querySelector("#documento").value ='';
  document.querySelector("#nombres").value ='';
  document.querySelector("#apellidos").value ='';
  document.querySelector("#telefono").value ='';
}

//Delegación para registrar una nueva persona
document.addEventListener('click', function(event) {
    const btnRegistrar = event.target.closest('#btnAñadirCliente');
    if (!btnRegistrar) {
        return;
    }

    let documento = document.querySelector("#documento").value;
    let nombres = document.querySelector("#nombres").value;
    let apellidos = document.querySelector("#apellidos").value;
    let telefono = document.querySelector("#telefono").value;

    if (!documento || !nombres || !telefono ) {
        mostrarToast('error', 'Campos Vacios', 'Ingrese los datos solicitados');
        return;
    }
    let correo = documento + '@gmail.com';
    let password = 'innova123'    

    axios.post("/api/registrarUsuario",
    {
        documento,
        nombres,
        apellidos,
        telefono,
        correo,
        password
    })
    .then(async(res) => {
        if (res.data.ok) {
            
            await cargarPersonas();// Actualizar los datos
            listarPersonas(); // Actualizar la tabla
            limpiarRegistro();
            
            $('#modalRegistro').modal("hide");
            mostrarToast('exito', 'Registro Exitoso', 'Los datos fueron registrados correctamente');
        } else {
            alert(res.data.mensaje);
        }
        
    })
    .catch((error) => {        
        if (error.response) {
        mostrarToast('error', 'Error', error.response.data.mensaje);
        }
    });
});

//Delegación de eventos para ver certificados de cada persona
document.addEventListener('click', function(event) {
    const boton = event.target.closest('.btn-certificados');

    if (!boton) {
        return;
    }

    const idPersona = boton.dataset.id;
    const persona = listadoGeneralPersonas.find(p => p.id_persona == idPersona);
    

    if (!persona) {
        console.error('No se encontró la persona');
        mostrarToast('error', 'Error!!!', 'No se encontró la persona');
        return;
    }

    listarCertificados(idPersona);

    const modalElement = document.querySelector('#modalListarCertificado');
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();

    cargarDatosPersonaCertificado(persona) 

});

function cargarDatosPersonaCertificado(persona) {

    // Guardamos la persona seleccionada
    window.idPersonaCertificado = persona.id_persona;

    // Mostrar información del cliente
    document.querySelector('.doc-cliente-certificado').textContent = persona.documento;
    document.querySelector('.nombre-cliente-certificado').textContent = `${persona.nombres} ${persona.apellidos || ''}`;
}

async function listarCertificados(idPersona) {    

    try {
        // Limpiar tabla
        const contenedorCert = document.querySelector('#contenedorCert');
            contenedorCert.innerHTML = '';

        // Consultar backend
        const res = await axios.get('/api/certificadosPersona/' + idPersona);

        if (!res.data.ok) {
            console.log(res.data.mensaje);
            return;
        }

        const certificados = res.data.certificados;
        // Si no tiene certificados
        if (certificados.length === 0) {
            document.querySelector('#certVacio').textContent = 'Este cliente no tiene certificados.';
            return;
        }
        document.querySelector('#certVacio').textContent='';

        // Template
        const template = document.querySelector('#templateCert').content;

        certificados.forEach(certificado => {

            const clone = template.cloneNode(true);

            clone.querySelector('.codigo').textContent = certificado.codigo;
            clone.querySelector('.titulo').textContent = certificado.titulo;
            clone.querySelector('.estado').textContent = certificado.estado;
            clone.querySelector('.btn-ver-certificado').dataset.id = certificado.id_certificado;
            clone.querySelector('.btn-ver-certificado').dataset.url = certificado.url_pdf;
            clone.querySelector('.btn-eliminar-certificado').dataset.id = certificado.id_certificado;
            contenedorCert.appendChild(clone);
        });
    } catch (error) {
        mostrarToast('error', 'Error al listar certificados:', error);
    }
}

//Añadir certificados
document.querySelector('#btnAgregarCertificado').addEventListener('click', () => {

    document.querySelector('#contenedorAgregarCertificado').classList.remove('d-none');
    document.querySelector('#btnAgregarCertificado').classList.add('d-none');

});

/* Cancelar y borrar formularios */
document.querySelector('#btnCancelarAgregarCertificado').addEventListener('click', () => {
    document.querySelector('#contenedorAgregarCertificado').classList.add('d-none');
    document.querySelector('#btnAgregarCertificado').classList.remove('d-none');
});

//Guardar Certificado
document.querySelector('#btnGuardarCertificado').addEventListener('click', async () => {

    try {
        const codigo = document.querySelector('#codigoCertificado').value.trim();
        const titulo = document.querySelector('#tituloCertificado').value.trim();
        const archivo = document.querySelector('#archivoCertificado').files[0];

        if (!codigo || !titulo || !archivo) {
            mostrarToast('advertencia', 'Importante!', 'Todos los campos son obligatorios');
            return;
        }

        const formData = new FormData();

        formData.append('id_persona',window.idPersonaCertificado);
        formData.append('codigo', codigo);
        formData.append('titulo',titulo);
        formData.append('archivo',archivo);

        const res = await axios.post('/api/registrarCertificado', formData);
        if (res.data.ok) {
            
            mostrarToast('exito', 'EXITO', 'Certificado registrado correctamente');

            document.querySelector('#codigoCertificado').value = '';
            document.querySelector('#tituloCertificado').value = '';
            document.querySelector('#contenedorAgregarCertificado').classList.add('d-none');
            document.querySelector('#btnAgregarCertificado').classList.remove('d-none');

            // Actualizar listado
            await listarCertificados(window.idPersonaCertificado);

        }

    } catch (error) {
        console.error(error);
        if (error.response) {
            console.log(error.response);
            mostrarToast('error', 'ERROR!!!', error.response.data.mensaje);
        }
    }
});

/* Ver o abrir PDF */
document.addEventListener('click', (event) => {

    const boton = event.target.closest('.btn-ver-certificado');
    if (!boton) {
        return;
    }

    const url = boton.dataset.url;
    if (!url) {
        mostrarToast('error', 'ERROR!!!', 'No se enconro archivo fisico(PDF)');
        return;
    }

    window.open(url,'_blank');
});

/* Eliminar Certificado */
document.addEventListener('click', async (event) => {

        const boton = event.target.closest('.btn-eliminar-certificado');
        if (!boton) return;

        const id = boton.dataset.id;

        const confirmar = confirm('¿Desea eliminar este certificado?');

        if (!confirmar) return;
        try {
            const res = await axios.delete('/api/Eliminarcertificado/' + id);

            if (res.data.ok) {
                
                mostrarToast('exito', 'EXITO', res.data.mensaje);
                // Actualizar listado
                await listarCertificados(window.idPersonaCertificado);
            }

        } catch (error) {

            console.error(error);
        }

    }
);

btnMenuArchivos.addEventListener('click', function(){
    
    contenedorReactivo.innerHTML = "";
    templateContenedorArchivos.querySelector('.mis-archivos').textContent = "Yo me reenderizo cuando haces clic en Clientes";

    const clone = templateContenedorArchivos.cloneNode(true);
    fragmento.appendChild(clone);
    contenedorReactivo.appendChild(fragmento);
});

btnMenuNotificacion.addEventListener('click', function(){

    contenedorReactivo.innerHTML = "";
    templateContenedorNotificacion.querySelector('.notificacion').textContent = "Yo me reenderizo cuando haces clic en Notificacion";

    const clone = templateContenedorNotificacion.cloneNode(true);
    fragmento.appendChild(clone);
    contenedorReactivo.appendChild(fragmento);
});

btnMenuConfiguracion.addEventListener('click', function(){

    contenedorReactivo.innerHTML = "";
    templateContenedorConfiguracion.querySelector('.configuracion').textContent = "Yo me reenderizo cuando haces clic en Configuracion";

    const clone = templateContenedorConfiguracion.cloneNode(true);
    fragmento.appendChild(clone);
    contenedorReactivo.appendChild(fragmento);
});

// ============================================================
// TOASTS / ALERTAS PERSONALIZADAS
// ============================================================
var toastTimeoutId = null;

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

function inicializarToastCerrar() {
  var btnCerrar = document.getElementById('toastCerrar');
  var toast = document.getElementById('toastCertificado');
  if (!btnCerrar || !toast) return;

  btnCerrar.addEventListener('click', function() {
    toast.classList.remove('is-visible');
    if (toastTimeoutId) clearTimeout(toastTimeoutId);
  });
}