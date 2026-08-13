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

/* Funciones de los botones para reenderizar el DOM */
btnMenuArchivos.addEventListener('click', function(){
    
    contenedorReactivo.innerHTML = "";
    templateArchivos.querySelector('.mis-archivos').textContent = "Yo me reenderizo cuando haces clic en Certificados";

    const clone = templateArchivos.cloneNode(true);
    fragmento.appendChild(clone);
    contenedorReactivo.appendChild(fragmento);
});

btnMenuNotificacion.addEventListener('click', function(){

    contenedorReactivo.innerHTML = "";
    templateNotificacion.querySelector('.notificacion').textContent = "Yo me reenderizo cuando haces clic en Notificacion";

    const clone = templateNotificacion.cloneNode(true);
    fragmento.appendChild(clone);
    contenedorReactivo.appendChild(fragmento);
});

btnMenuConfiguracion.addEventListener('click', function(){

    contenedorReactivo.innerHTML = "";
    templateConfiguracion.querySelector('.configuracion').textContent = "Yo me reenderizo cuando haces clic en Configuracion";

    const clone = templateConfiguracion.cloneNode(true);
    fragmento.appendChild(clone);
    contenedorReactivo.appendChild(fragmento);
});
