// ============================================================
// LOGIN.JS - AGL INTEGRITY S.A.C.
// ============================================================

document.addEventListener('DOMContentLoaded', function() {
  inicializarEfectoModales();
});

// ============================================================
// EFECTO DE DIFUMINADO AL ABRIR CUALQUIER MODAL
// ============================================================
function inicializarEfectoModales() {
  document.addEventListener('show.bs.modal', function() {
    document.body.classList.add('modal-abierto');
  });

  document.addEventListener('hidden.bs.modal', function() {
    if (!document.querySelector('.modal.show')) {
      document.body.classList.remove('modal-abierto');
    }
  });
}

// ============================================================
// VALIDAR USUARIO (login)
// ============================================================
function validarUsuario() {
  // Tu lógica de login aquí (por ejemplo, axios.post('/api/login', {...}))
}