document.addEventListener('DOMContentLoaded', async () => {
    await cargarPersonas();
    await cargarMensajes();
    inicializarToastCerrar();

    /* setInterval(cargarPersonas, 5000); //aca podemos hacer polling cada 5Segundos*/
});

// Creación de fragmento para optimizar manipulaciones del DOM
const fragmento = document.createDocumentFragment();

/* Invocamos a los botones del menu */
let btnMenuInicio = document.querySelector('#btnMenuInicio');
let btnMenuClientes = document.querySelector('#btnMenuClientes');
let btnMenuMensajes = document.querySelector('#btnMenuMensajes');
let btnMenuNotificacion = document.querySelector('#btnMenuNotificacion');
let btnMenuConfiguracion = document.querySelector('#btnMenuConfiguracion');
let btnMenuCerrar = document.querySelector('#btnMenuCerrar');

// Capturar referencia al contenedor principal de renderizado
let contenedorReactivo = document.querySelector('#contenedorReactivo');

// Capturar los templates de las secciones
const templateContenedorClientes = document.querySelector('#templateContenedorClientes').content;
const templateContenedorMensajes = document.querySelector('#templateContenedorMensajes').content;
/* const templateContenedorNotificacion = document.querySelector('#templateContenedorNotificacion').content; */
const templateContenedorConfiguracion = document.querySelector('#templateContenedorConfiguracion').content;
const templateContenedorCerrar = document.querySelector('#templateContenedorCerrar').content;

/* Variables globales */
let listadoGeneralMensajes = [];
let listadoGeneralPersonas = [];
let listadoGeneralUsuarios = [];

async function cargarPersonas() {
    try {

        const response = await axios.get("/api/listarPersonas");
        listadoGeneralPersonas = [...response.data];

    } catch (error) {

        console.error(error);
    }
}
async function cargarMensajes() {
    try {

        const response = await axios.get("/api/listarMensajes");
        listadoGeneralMensajes = [...response.data];

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
    listarPersonas();
});

function listarPersonas() {
    let contenedorTablaCliente = document.querySelector('#contenedorTablaCliente');
    const templateTablaClientes = document.querySelector('#templateTablaClientes').content;
    contenedorTablaCliente.innerHTML = "";

    listadoGeneralPersonas.forEach(persona => {
        templateTablaClientes.querySelector('.id-persona').textContent = persona.id_persona;
        templateTablaClientes.querySelector('.documento-persona').textContent = persona.documento;
        templateTablaClientes.querySelector('.nombres-persona').textContent = persona.nombres;
        templateTablaClientes.querySelector('.telefono-persona').textContent = persona.telefono;
        /* if (persona.estado == 'activo') {
            templateTablaClientes.querySelector('#contenedorEstadoListar').innerHTML = innerHTML = `<span class="rounded bg-success p-1 text-white">Activo</span>`;
        }
        if (persona.estado == 'inactivo') {
            templateTablaClientes.querySelector('#contenedorEstadoListar').innerHTML = innerHTML = `<span class="rounded bg-danger p-1 text-white">Inactivo</span>`;
        } */
        templateTablaClientes.querySelector('#verCertificados').dataset.id = persona.id_persona;
        templateTablaClientes.querySelector('#editarPersona').dataset.id = persona.id_persona;
        templateTablaClientes.querySelector('#eliminarPersona').dataset.id = persona.id_persona;
        const clone = templateTablaClientes.cloneNode(true);
        fragmento.appendChild(clone);
    });

    contenedorTablaCliente.appendChild(fragmento);
}

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
    /* let correo = document.querySelector("#correoRegistro").value;
    let password = document.querySelector("#passwordRegistro").value; */

    if (!documento || !nombres || !telefono ) {
        mostrarToast('error', 'Campos Vacios', 'Ingrese los datos solicitados');
        return;
    }
    let correo = documento + '@gmail.com';
    let password = 'innova123'

    axios.post("/api/registrarPersona",
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
    const boton = event.target.closest('#verCertificados');

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
        /* if (archivo.type !== 'application/pdf') {

            alert('Solo se permiten archivos PDF');
            return;
        } */

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

//Delegación de eventos para editar persona
document.addEventListener('click', function(event) {
    const boton = event.target.closest('#editarPersona');

    if (!boton) {
        return;
    }

    const idPersona = boton.dataset.id;
    const persona = listadoGeneralPersonas.find(p => p.id_persona == idPersona);
    //Cargamos datos para editar
    document.querySelector('#editarDocumento').value = persona.documento;
    document.querySelector('#editarNombres').value = persona.nombres;
    document.querySelector('#editarApellidos').value = persona.apellidos;
    document.querySelector('#editarTelefono').value = persona.telefono;
    /* if (persona.estado == 'activo') {
        document.querySelector('#contenedorEstado').innerHTML = innerHTML = `<input id="editarEstado" class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked><span class="p-2 bg-success">Activo</span>`;
    }
    if (persona.estado == 'inactivo') {
        document.querySelector('#contenedorEstado').innerHTML = innerHTML = `<input id="editarEstado" class="form-check-input" type="checkbox" value="" id="flexCheckDefault"><span class="p-2 bg-danger">Activo</span>`;
    } */

    document.querySelector('#actualizaPersona').dataset.id = persona.id_persona;
});

//Guardar datos a editar
document.addEventListener('click', async function(event) {
    const boton = event.target.closest('#actualizaPersona');

    if (!boton) {return;}

    try {
        let documento = document.querySelector('#editarDocumento').value;
        let nombres = document.querySelector('#editarNombres').value;
        let apellidos = document.querySelector('#editarApellidos').value;
        let telefono = document.querySelector('#editarTelefono').value;
        /* let estado = document.querySelector('#editarEstado').checked; */
        let idPersona = document.querySelector('#actualizaPersona').dataset.id;

        /* if (estado == true) {
            estado = "activo"
        }else{
            estado = "inactivo"
        } */
        const datos = {
            documento,
            nombres,
            apellidos,
            telefono,
            /* estado */
        };

        const res = await axios.put('/api/editarPersona/' + idPersona, datos);
        if (res.data.ok) {

            mostrarToast('exito', 'Correcto', res.data.mensaje);

            // Cerrar modal
            const modalElement = document.querySelector('#modalEditarPersona');
            const modal =bootstrap.Modal.getInstance(modalElement);
            modal.hide();
            await cargarPersonas();// Actualizar los datos
            listarPersonas();

        }
    } catch (error) {

        console.error('Error editando persona:', error);

        if (error.response) {

            mostrarToast('error', 'Error', error.response.data.mensaje);
        }
    }
});

//delegacion para eliminar persona
document.addEventListener('click', async function(event) {
    const boton = event.target.closest('#eliminarPersona');

    if (!boton) return;
    const idPersona = boton.dataset.id;

    if (!idPersona) {
        console.error('No se encontró el id de la persona');
        return;
    }

    const confirmar = confirm('¿Está seguro de eliminar esta persona?');
    if (!confirmar) return;

    try {
        const res = await axios.delete('/api/eliminarPersona/' + idPersona);
        if (res.data.ok) {
            mostrarToast('exito', 'Correcto', res.data.mensaje);
            await cargarPersonas();
            listarPersonas();
        }

    } catch (error) {
        console.error('Error eliminando persona:', error);

        if (error.response) {
            mostrarToast('error', 'Error', error.response.data.mensaje);

        } else {

            mostrarToast('error', 'Error', 'No se pudo conectar con el servidor');
        }
    }
});


btnMenuMensajes.addEventListener('click', function(){
    contenedorReactivo.innerHTML = "";
    const clone = templateContenedorMensajes.cloneNode(true);
    fragmento.appendChild(clone);
    contenedorReactivo.appendChild(fragmento);
    listarMensajes ();
});
function listarMensajes() {
    let contenedorTablaMensajes = document.querySelector('#contenedorTablaMensajes');
    const templateTablaMensajes = document.querySelector('#templateTablaMensajes').content;
    contenedorTablaMensajes.innerHTML = "";

    listadoGeneralMensajes.forEach(mensaje => {
        templateTablaMensajes.querySelector('.id-mensaje').textContent = mensaje.id_mensaje;
        templateTablaMensajes.querySelector('.documento-mensaje').textContent = mensaje.documento;
        templateTablaMensajes.querySelector('.nombres-mensaje').textContent = mensaje.nombres;
        templateTablaMensajes.querySelector('.telefono-mensaje').textContent = mensaje.telefono;
        templateTablaMensajes.querySelector('#verMensaje').dataset.id = mensaje.id_mensaje;
        templateTablaMensajes.querySelector('#eliminarMensaje').dataset.id = mensaje.id_mensaje;
        const clone = templateTablaMensajes.cloneNode(true);
        fragmento.appendChild(clone);
    });

    contenedorTablaMensajes.appendChild(fragmento);
}

//Delegación de eventos para ver mensaje en modal
document.addEventListener('click', function(event) {
    const boton = event.target.closest('#verMensaje');

    if (!boton) {
        return;
    }

    const idMensaje = boton.dataset.id;
    const mensaje = listadoGeneralMensajes.find(p => p.id_mensaje == idMensaje);
    //Cargamos datos para ver
    document.querySelector('#smsDocumento').value = mensaje.documento;
    document.querySelector('#smsNombres').value = mensaje.nombres;
    document.querySelector('#smsTelefono').value = mensaje.telefono;
    document.querySelector('#smsCorreo').value = mensaje.correo;
    document.querySelector('#smsDetalles').value = mensaje.asunto;

});

//delegacion para eliminar mensaje
document.addEventListener('click', async function(event) {
    const boton = event.target.closest('#eliminarMensaje');

    if (!boton) return;
    const idPersona = boton.dataset.id;

    if (!idPersona) {
        console.error('No se encontró el id de la persona');
        return;
    }

    const confirmar = confirm('¿Está seguro de eliminar el mensaje?');
    if (!confirmar) return;

    try {
        const res = await axios.delete('/api/eliminarMensaje/' + idPersona);
        if (res.data.ok) {

            console.log();

            mostrarToast('exito', 'Correcto', res.data.mensaje);
            await cargarMensajes();
            listarMensajes();
        }

    } catch (error) {
        console.error('Error eliminando mensaje:', error);

        if (error.response) {
            mostrarToast('error', 'Error', error.response.data.mensaje);

        } else {

            mostrarToast('error', 'Error', 'No se pudo conectar con el servidor');
        }
    }
});
/* btnMenuNotificacion.addEventListener('click', function(){

    contenedorReactivo.innerHTML = "";
    templateContenedorNotificacion.querySelector('.notificacion').textContent = "Yo me reenderizo cuando haces clic en Notificacion";

    const clone = templateContenedorNotificacion.cloneNode(true);
    fragmento.appendChild(clone);
    contenedorReactivo.appendChild(fragmento);
}); */

btnMenuConfiguracion.addEventListener('click', function(){

    contenedorReactivo.innerHTML = "";

    const clone = templateContenedorConfiguracion.cloneNode(true);
    fragmento.appendChild(clone);
    contenedorReactivo.appendChild(fragmento);
});

//Cerrar Sesion
btnMenuCerrar.addEventListener('click', function() {

    contenedorReactivo.innerHTML = '';
    const clone = templateContenedorCerrar.cloneNode(true);
    fragmento.appendChild(clone);
    contenedorReactivo.appendChild(fragmento);

    const modalElement = document.querySelector('#modalCerrarSesion');

    if (!modalElement) {
        console.error('No se encontró el modal de cerrar sesión');
        return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();

});
document.addEventListener('click', async function(event) {

    const boton = event.target.closest('#btnConfirmarCerrarSesion');
    if (!boton) return;

    await cerrarSesion();

});
async function cerrarSesion() {

    try {
        const res = await axios.post('/api/logout');
        if (res.data.ok) {

            console.log(res.data.mensaje);
            window.location.href = '/login';
        }

    } catch (error) {
        console.error('Error cerrando sesión:',error);

        if (error.response) {

            mostrarToast( 'error', 'Error', error.response.data.mensaje);
        } else {

            mostrarToast('error', 'Error', 'No se pudo cerrar sesión');
        }
    }
}

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


// ============================================================
// BÚSQUEDA Y PAGINACIÓN — MÓDULOS CLIENTES Y MENSAJES
// ============================================================
(function () {

    function crearModulo(config) {
        let paginaActual = 1;
        let porPagina = 5;
        let texto = '';
        const estado = { lock: false };

        function refs() {
            const cont = document.querySelector(config.contenedor);
            if (!cont) return null;
            return {
                cont,
                tabla: cont.querySelector(config.tabla),
                input: cont.querySelector('input#inputBuscarCertificado'),
                select: cont.querySelector('select#selectRegistrosPorPagina'),
                info: cont.querySelector('#infoPaginacion'),
                pag: cont.querySelector(config.paginacion)
            };
        }

        function filtrados() {
            const datos = config.obtenerDatos();
            if (!texto) return datos;
            const t = texto.toLowerCase();
            return datos.filter(item =>
                config.camposBusqueda.some(c =>
                    (item[c] ?? '').toString().toLowerCase().includes(t)
                )
            );
        }

        function pintarBotones(ul, totalPag) {
            ul.innerHTML = '';
            if (totalPag <= 1) return;

            const frag = document.createDocumentFragment();
            const crear = (label, pag, { disabled = false, active = false } = {}) => {
                const li = document.createElement('li');
                li.className = 'page-item' + (disabled ? ' disabled' : '') + (active ? ' active' : '');
                const a = document.createElement('a');
                a.className = 'page-link';
                a.href = '#';
                a.textContent = label;
                a.dataset.pagina = pag;
                a.dataset.disabled = disabled ? '1' : '';
                a.dataset.active = active ? '1' : '';
                li.appendChild(a);
                return li;
            };

            frag.appendChild(crear('«', paginaActual - 1, { disabled: paginaActual === 1 }));

            const desde = Math.max(1, paginaActual - 2);
            const hasta = Math.min(totalPag, paginaActual + 2);

            if (desde > 1) {
                frag.appendChild(crear('1', 1, { active: paginaActual === 1 }));
                if (desde > 2) {
                    const li = document.createElement('li');
                    li.className = 'page-item disabled';
                    li.innerHTML = '<span class="page-link">…</span>';
                    frag.appendChild(li);
                }
            }
            for (let p = desde; p <= hasta; p++) {
                frag.appendChild(crear(String(p), p, { active: p === paginaActual }));
            }
            if (hasta < totalPag) {
                if (hasta < totalPag - 1) {
                    const li = document.createElement('li');
                    li.className = 'page-item disabled';
                    li.innerHTML = '<span class="page-link">…</span>';
                    frag.appendChild(li);
                }
                frag.appendChild(crear(String(totalPag), totalPag, { active: paginaActual === totalPag }));
            }
            frag.appendChild(crear('»', paginaActual + 1, { disabled: paginaActual === totalPag }));

            ul.appendChild(frag);
        }

        function pintar() {
            const r = refs();
            if (!r) return;

            const datos = filtrados();
            const totalPag = Math.max(1, Math.ceil(datos.length / porPagina));
            if (paginaActual > totalPag) paginaActual = totalPag;
            if (paginaActual < 1) paginaActual = 1;

            const ini = (paginaActual - 1) * porPagina;
            const fin = Math.min(ini + porPagina, datos.length);
            const pagina = datos.slice(ini, fin);

            const template = document.querySelector(config.template).content;
            const frag = document.createDocumentFragment();
            r.tabla.innerHTML = '';

            if (pagina.length === 0) {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                td.colSpan = 5;
                td.className = 'text-muted py-3';
                td.textContent = config.mensajeVacio;
                tr.appendChild(td);
                frag.appendChild(tr);
            } else {
                pagina.forEach(item => {
                    const c = template.cloneNode(true);
                    config.rellenarFila(c, item);
                    frag.appendChild(c);
                });
            }
            r.tabla.appendChild(frag);

            r.info.textContent = datos.length === 0
                ? `Mostrando 0 de 0 ${config.etiqueta}`
                : `Mostrando ${ini + 1}-${fin} de ${datos.length} ${config.etiqueta}`;

            pintarBotones(r.pag, totalPag);
        }

        function bindPaginacion(ul) {
            if (ul.dataset.bind) return;
            ul.dataset.bind = '1';
            ul.addEventListener('click', e => {
                const a = e.target.closest('a.page-link');
                if (!a || !a.dataset.pagina) return;
                if (a.dataset.disabled || a.dataset.active) return;
                e.preventDefault();
                paginaActual = parseInt(a.dataset.pagina, 10);
                pintar();
            });
        }

        function activar() {
            paginaActual = 1;
            texto = '';

            setTimeout(() => {
                const r = refs();
                if (!r) return;

                porPagina = parseInt(r.select.value, 10) || 5;
                r.input.value = '';

                if (!r.input.dataset.bind) {
                    r.input.dataset.bind = '1';
                    r.input.addEventListener('input', ev => {
                        texto = ev.target.value.trim();
                        paginaActual = 1;
                        pintar();
                    });
                }
                if (!r.select.dataset.bind) {
                    r.select.dataset.bind = '1';
                    r.select.addEventListener('change', ev => {
                        porPagina = parseInt(ev.target.value, 10) || 5;
                        paginaActual = 1;
                        pintar();
                    });
                }
                bindPaginacion(r.pag);
                pintar();
            }, 0);
        }

        document.addEventListener('click', e => {
            if (e.target.closest(config.btnMenu)) activar();
        });

        const contGlobal = document.querySelector('#contenedorReactivo');
        if (contGlobal) {
            new MutationObserver(() => {
                if (!document.querySelector(config.contenedor)) return;
                if (!refs()) return;
                if (estado.lock) return;
                estado.lock = true;
                pintar();
                setTimeout(() => { estado.lock = false; }, 0);
            }).observe(contGlobal, { childList: true, subtree: true });
        }
    }

    // ---------- Configuración Clientes ----------
    crearModulo({
        contenedor: '#clientesAdmin',
        tabla: '#contenedorTablaCliente',
        paginacion: '#paginacionClientes',
        template: '#templateTablaClientes',
        btnMenu: '#btnMenuClientes',
        etiqueta: 'clientes',
        mensajeVacio: 'No se encontraron clientes.',
        obtenerDatos: () => listadoGeneralPersonas,
        camposBusqueda: ['documento', 'nombres', 'telefono'],
        rellenarFila: (c, persona) => {
            c.querySelector('.id-persona').textContent = persona.id_persona;
            c.querySelector('.documento-persona').textContent = persona.documento;
            c.querySelector('.nombres-persona').textContent = persona.nombres;
            c.querySelector('.telefono-persona').textContent = persona.telefono;
            c.querySelector('#verCertificados').dataset.id = persona.id_persona;
            c.querySelector('#editarPersona').dataset.id = persona.id_persona;
            c.querySelector('#eliminarPersona').dataset.id = persona.id_persona;
        }
    });

    // ---------- Configuración Mensajes ----------
    crearModulo({
        contenedor: '#mensajes',
        tabla: '#contenedorTablaMensajes',
        paginacion: '#paginacionMensajes',
        template: '#templateTablaMensajes',
        btnMenu: '#btnMenuMensajes',
        etiqueta: 'mensajes',
        mensajeVacio: 'No se encontraron mensajes.',
        obtenerDatos: () => listadoGeneralMensajes,
        camposBusqueda: ['documento', 'nombres', 'telefono'],
        rellenarFila: (c, mensaje) => {
            c.querySelector('.id-mensaje').textContent = mensaje.id_mensaje;
            c.querySelector('.documento-mensaje').textContent = mensaje.documento;
            c.querySelector('.nombres-mensaje').textContent = mensaje.nombres;
            c.querySelector('.telefono-mensaje').textContent = mensaje.telefono;
            c.querySelector('#verMensaje').dataset.id = mensaje.id_mensaje;
            c.querySelector('#eliminarMensaje').dataset.id = mensaje.id_mensaje;
        }
    });

})();