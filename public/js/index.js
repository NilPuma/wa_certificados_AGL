// ============================================================
// INDEX.JS - AGL INTEGRITY S.A.C.
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  inicializarCarruseles();
  inicializarScrollReveal();
  /* consultarCertificado(); */
  inicializarModalServicios();
  inicializarMenuMovil();
  inicializarToastCerrar();
});

// ============================================================
// CARRUSELES (FLICKITY)
// ============================================================
function inicializarCarruseles() {
  if (typeof Flickity === 'undefined') return;

  new Flickity('.carousel-header', {
    cellAlign: 'center',
    contain: true,
    wrapAround: true,
    autoPlay: 4000,
    prevNextButtons: false,
    pageDots: true,
    pauseAutoPlayOnHover: false,
    percentPosition: false,
    draggable: true
  });

  new Flickity('.carousel-clientes', {
    cellAlign: 'center',
    contain: true,
    wrapAround: true,
    autoPlay: 3000,
    prevNextButtons: true,
    pageDots: false,
    groupCells: 1,
    freeScroll: false,
    friction: 0.8,
    selectedAttraction: 0.1,
    adaptiveHeight: true,
    pauseAutoPlayOnHover: true
  });
}

// ============================================================
// EFECTO DE REVELADO AL HACER SCROLL
// ============================================================
function inicializarScrollReveal() {
  var revealEls = document.querySelectorAll('.reveal');
  if (!revealEls.length) return;

  if (!('IntersectionObserver' in window)) {
    revealEls.forEach(function(el) { el.classList.add('is-visible'); });
    return;
  }

  revealEls.forEach(function(el) { el.classList.add('reveal-ready'); });

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealEls.forEach(function(el) { observer.observe(el); });
}

// ============================================================
// MODAL DE CÓDIGO DE ACCESO (CERTIFICADOS)
// ============================================================

let btnVerificarCodigo = document.querySelector("#btnVerificarCodigo");


btnVerificarCodigo.addEventListener('click',()=>{  
  consultarCertificado();
})


function consultarCertificado() {
  let codigoAcceso = document.querySelector('#codigoAcceso');
  
  let codigo = codigoAcceso.value.trim();
  if (!codigo) {
      mostrarToast('error', 'Ingrese  un Código', 'Es olbigatorio ingresar el codigo');
      return;
  }

  axios.post('/api/consultarCertificado', {codigo: codigo})
  .then((res) => {

    if (res.data.ok == true) {
      console.log(res.data);
      mostrarToast('exito', 'Verificación exitosa', res.data.mensaje);
      /* window.open(res.data.link_pdf, '_blank'); */
    }else {
      console.log(res.data.mensaje);
      mostrarToast('error', 'Hubo un Error', res.data.mensaje);
    }

  })
  .catch(error => {
    console.error(error);
  });
}

function dasdsadas(params) {
  // Resetear todo al cerrar el modal
  document.getElementById('modalCodigo').addEventListener('hidden.bs.modal', function() {
    // Mostrar formulario e imagen
    formularioCodigo.classList.remove('d-none');
    if (imagenCertificado) imagenCertificado.classList.remove('d-none');
    
    // Ocultar mensajes
    mensajeExito.classList.add('d-none');
    mensajeError.classList.add('d-none');
    
    // Limpiar input
    var input = document.getElementById('codigoAcceso');
    if (input) {
      input.value = '';
      input.classList.remove('is-invalid');
    }
  });
}

// ============================================================
// MODAL DE SERVICIOS (CARGA DINÁMICA)
// ============================================================
function inicializarModalServicios() {
  var modalServicio = document.getElementById('modalServicio');

  if (!modalServicio || typeof serviciosData === 'undefined') return;

  modalServicio.addEventListener('show.bs.modal', function(event) {
    var button = event.relatedTarget;
    var servicioId = button.getAttribute('data-servicio');
    var servicio = serviciosData[servicioId];

    if (servicio) {
      modalServicio.querySelector('.modal-title').textContent = servicio.titulo;

      var modalImage = modalServicio.querySelector('#modalServicioImagen');
      modalImage.src = servicio.imagen;
      modalImage.alt = servicio.titulo;

      modalServicio.querySelector('#modalServicioContenido').innerHTML = servicio.contenido;
    }
  });

  modalServicio.addEventListener('hidden.bs.modal', function() {
    var modalImage = modalServicio.querySelector('#modalServicioImagen');
    if (modalImage) modalImage.src = '';

    var modalContent = modalServicio.querySelector('#modalServicioContenido');
    if (modalContent) modalContent.innerHTML = '';
  });
}

// ============================================================
// MENÚ MÓVIL (HAMBURGUESA + OVERLAY)
// ============================================================
function inicializarMenuMovil() {
  var btnToggle = document.getElementById('btnMenuToggle');
  var iconoToggle = document.getElementById('iconoMenuToggle');
  var overlay = document.getElementById('menuOverlay');
  var menu = document.getElementById('menu');

  if (!btnToggle || !overlay || !menu) return;

  function abrirMenu() {
    document.body.classList.add('menu-abierto');
    btnToggle.setAttribute('aria-expanded', 'true');
    if (iconoToggle) {
      iconoToggle.classList.remove('bi-list');
      iconoToggle.classList.add('bi-x-lg');
    }
  }

  function cerrarMenu() {
    document.body.classList.remove('menu-abierto');
    btnToggle.setAttribute('aria-expanded', 'false');
    if (iconoToggle) {
      iconoToggle.classList.remove('bi-x-lg');
      iconoToggle.classList.add('bi-list');
    }
  }

  btnToggle.addEventListener('click', function() {
    document.body.classList.contains('menu-abierto') ? cerrarMenu() : abrirMenu();
  });

  overlay.addEventListener('click', cerrarMenu);

  menu.querySelectorAll('a, .btn--header').forEach(function(opcion) {
    opcion.addEventListener('click', cerrarMenu);
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth > 991.98 && document.body.classList.contains('menu-abierto')) {
      cerrarMenu();
    }
  });
}

// ============================================================
// EXPORTAR FUNCIONES GLOBALES
// ============================================================
window.aglUtils = {
  inicializarCarruseles: inicializarCarruseles
};

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