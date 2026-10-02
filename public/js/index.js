// ============================================================
// INDEX.JS - AGL INTEGRITY S.A.C.
// ============================================================

document.addEventListener('DOMContentLoaded', function () {
  inicializarCarruseles();
  inicializarScrollReveal();
  inicializarContadores();
  inicializarModalServicios();
  inicializarMenuMovil();
  inicializarToastCerrar();
  /* consultarCertificado(); */
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
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  revealEls.forEach(function (el) { el.classList.add('reveal-ready'); });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealEls.forEach(function (el) { observer.observe(el); });
}

// ============================================================
// CONTADORES ANIMADOS - SECCIÓN ESTADÍSTICAS
// ============================================================
function inicializarContadores() {
  var contadores = document.querySelectorAll('.stat-numero[data-contador]');
  if (!contadores.length) return;

  var prefiereMovimientoReducido = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function formatearNumero(valor) {
    return valor.toLocaleString('es-PE');
  }

  function animarContador(el) {
    var destino = parseInt(el.dataset.contador, 10);
    var prefijo = el.dataset.prefijo || '';
    var sufijo  = el.dataset.sufijo  || '';
    var duracion = 1800; // ms

    // Accesibilidad: sin animación si el usuario la desactiva
    if (prefiereMovimientoReducido) {
      el.textContent = prefijo + formatearNumero(destino) + sufijo;
      return;
    }

    var inicio = performance.now();

    function paso(ahora) {
      var transcurrido = ahora - inicio;
      var progreso = Math.min(transcurrido / duracion, 1);

      // Easing outCubic: arranca rápido, desacelera al final
      var suavizado = 1 - Math.pow(1 - progreso, 3);
      var valorActual = Math.floor(suavizado * destino);

      el.textContent = prefijo + formatearNumero(valorActual) + sufijo;

      if (progreso < 1) {
        requestAnimationFrame(paso);
      } else {
        // Asegurar valor final exacto
        el.textContent = prefijo + formatearNumero(destino) + sufijo;

        // Efecto "pop" final (definido en CSS como @keyframes popFinal)
        el.classList.add('contador-terminado');
        setTimeout(function () {
          el.classList.remove('contador-terminado');
        }, 600);
      }
    }

    requestAnimationFrame(paso);
  }

  // Sin IntersectionObserver: animar todos al cargar
  if (!('IntersectionObserver' in window)) {
    contadores.forEach(animarContador);
    return;
  }

  var observer = new IntersectionObserver(function (entradas) {
    entradas.forEach(function (entrada) {
      if (entrada.isIntersecting) {
        animarContador(entrada.target);
        observer.unobserve(entrada.target); // Solo se anima una vez
      }
    });
  }, {
    threshold: 0.4,
    rootMargin: '0px 0px -50px 0px'
  });

  contadores.forEach(function (c) { observer.observe(c); });
}

// ============================================================
// MODAL DE CÓDIGO DE ACCESO (CERTIFICADOS)
// ============================================================
var btnVerificarCodigo = document.querySelector('#btnVerificarCodigo');
var btnResetear = document.querySelector('#btnResetear');

if (btnVerificarCodigo) {
  btnVerificarCodigo.addEventListener('click', function () {
    consultarCertificado();
  });
}

if (btnResetear) {
  btnResetear.addEventListener('click', function () {
    resetearCertificado();
  });
}

function resetearCertificado() {
  var inputCodigo = document.querySelector('#codigoAcceso');
  var vistaPdf = document.querySelector('#contenedorVistaPdf');
  var muestraPdf = document.querySelector('#contenedorMuestraPdf');

  if (inputCodigo) inputCodigo.value = '';
  if (vistaPdf) vistaPdf.classList.add('d-none');
  if (muestraPdf) muestraPdf.classList.remove('d-none');
}

function consultarCertificado() {
  var codigoAcceso = document.querySelector('#codigoAcceso');
  if (!codigoAcceso) return;

  var codigo = codigoAcceso.value.trim();
  if (!codigo) {
    mostrarToast('advertencia', 'Importante!', 'Es obligatorio ingresar el código');
    return;
  }

  axios.get('/api/consultarCertificado/' + codigo)
    .then(function (res) {
      if (res.data.ok === true) {
        var urlPdf = res.data.certificado.url_pdf;

        mostrarToast('exito', 'Verificación exitosa', res.data.mensaje);

        // Mostrar contenedor de PDF
        document.querySelector('#contenedorVistaPdf').classList.remove('d-none');
        document.querySelector('#contenedorMuestraPdf').classList.add('d-none');

        // Mostrar PDF
        var visorPdf = document.querySelector('#visorPdf');
        if (visorPdf) visorPdf.src = urlPdf;

        var btnDescargar = document.querySelector('#btnDescargarPdf');
        if (btnDescargar) btnDescargar.href = urlPdf;

      } else {
        console.log(res.data.mensaje);
        mostrarToast('error', 'Hubo un Error', res.data.mensaje);
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

// ============================================================
// FORMULARIO DE CONTACTO
// ============================================================
function limpiarRegistro() {
  document.querySelector('#documentoContacto').value = '';
  document.querySelector('#nombreContacto').value = '';
  document.querySelector('#telefonoContacto').value = '';
  document.querySelector('#correoContacto').value = '';
  document.querySelector('#mensajeContacto').value = '';
}

// Delegación de evento para registrar un mensaje de info
document.addEventListener('click', function (event) {
  var btnEnviarSms = event.target.closest('#btnEnviarSms');
  if (!btnEnviarSms) return;

  var documentoContacto = document.querySelector('#documentoContacto').value.trim();
  var nombreContacto = document.querySelector('#nombreContacto').value.trim();
  var telefonoContacto = document.querySelector('#telefonoContacto').value.trim();
  var correoContacto = document.querySelector('#correoContacto').value.trim();
  var mensajeContacto = document.querySelector('#mensajeContacto').value.trim();

  if (!nombreContacto || !telefonoContacto || !correoContacto || !mensajeContacto) {
    mostrarToast('error', 'Campos Vacíos', 'Ingrese los datos solicitados');
    return;
  }

  // Bloquear botón Enviar mientras envía
  btnEnviarSms.disabled = true;
  btnEnviarSms.textContent = 'Enviando...';

  axios.post('/api/registrarMensaje', {
    documento: documentoContacto,
    nombres: nombreContacto,
    telefono: telefonoContacto,
    correo: correoContacto,
    asunto: mensajeContacto
  })
    .then(function (res) {
      if (res.data.ok) {
        limpiarRegistro();
        mostrarToast('exito', 'Registro Exitoso', 'Los datos fueron registrados correctamente');

        btnEnviarSms.disabled = false;
        btnEnviarSms.innerHTML = 'Enviar mensaje <i class="bi bi-arrow-right"></i>';

      } else {
        alert(res.data.mensaje);
      }
    })
    .catch(function (error) {
      if (error.response) {
        mostrarToast('error', 'Error', error.response.data.mensaje);
      }
    });
});

// ============================================================
// MODAL DE SERVICIOS (CARGA DINÁMICA)
// ============================================================
function inicializarModalServicios() {
  var modalServicio = document.getElementById('modalServicio');

  if (!modalServicio || typeof serviciosData === 'undefined') return;

  modalServicio.addEventListener('show.bs.modal', function (event) {
    var button = event.relatedTarget;
    var servicioId = button.getAttribute('data-servicio');
    var servicio = serviciosData[servicioId];

    if (servicio) {
      modalServicio.querySelector('.modal-title').textContent = servicio.titulo;

      var modalImage = modalServicio.querySelector('#modalServicioImagen');
      modalImage.src = servicio.imagen;
      modalImage.alt = servicio.titulo;
      modalImage.style.objectPosition = servicio.posicionImagen || 'center';

      modalServicio.querySelector('#modalServicioContenido').innerHTML = servicio.contenido;
    }
  });

  modalServicio.addEventListener('hidden.bs.modal', function () {
    var modalImage = modalServicio.querySelector('#modalServicioImagen');
    if (modalImage) {
      modalImage.src = '';
      modalImage.style.objectPosition = '';
    }

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

  btnToggle.addEventListener('click', function () {
    document.body.classList.contains('menu-abierto') ? cerrarMenu() : abrirMenu();
  });

  overlay.addEventListener('click', cerrarMenu);

  menu.querySelectorAll('a, .btn-header').forEach(function (opcion) {
    opcion.addEventListener('click', cerrarMenu);
  });

  window.addEventListener('resize', function () {
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
  toastTimeoutId = setTimeout(function () {
    toast.classList.remove('is-visible');
  }, 4000);
}

function inicializarToastCerrar() {
  var btnCerrar = document.getElementById('toastCerrar');
  var toast = document.getElementById('toastCertificado');
  if (!btnCerrar || !toast) return;

  btnCerrar.addEventListener('click', function () {
    toast.classList.remove('is-visible');
    if (toastTimeoutId) clearTimeout(toastTimeoutId);
  });
}