        // FUNCIONES PARA ABRIR Y CERRAR MODALES
        function abrirModal(idModal) {
            document.getElementById(idModal).classList.add('activo');
            document.body.style.overflow = 'hidden'; // Evita scroll del fondo
        }

        function cerrarModal(idModal) {
            document.getElementById(idModal).classList.remove('activo');
            document.body.style.overflow = 'auto'; // Restaura scroll
        }

        // Cerrar modal al hacer clic fuera del contenido
        document.querySelectorAll('.modal-fondo').forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    cerrarModal(this.id);
                }
            });
        });

        // Cerrar modal con tecla ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.querySelectorAll('.modal-fondo.activo').forEach(modal => {
                    cerrarModal(modal.id);
                });
            }
        });

        // FORMULARIO NUEVO SOCIO
        document.querySelector('#modal-nuevo-socio .formulario-modal').addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aquí irá la conexión a la base de datos
            alert('¡Socio registrado exitosamente! 🎉\n(Próximamente: Conexión a base de datos)');
            
            // Limpiar formulario
            this.reset();
            
            // Cerrar modal
            cerrarModal('modal-nuevo-socio');
            
            // Recargar lista de socios (cuando esté conectado a BD)
            // location.reload();
        });

        // BUSCADOR EN TIEMPO REAL
        document.querySelector('.caja-buscar input').addEventListener('input', function(e) {
            const textoBusqueda = e.target.value.toLowerCase();
            const tarjetas = document.querySelectorAll('.tarjeta-socio');
            
            tarjetas.forEach(tarjeta => {
                const nombre = tarjeta.querySelector('.info-basica h2').textContent.toLowerCase();
                const email = tarjeta.querySelector('.info-basica p').textContent.toLowerCase();
                
                if (nombre.includes(textoBusqueda) || email.includes(textoBusqueda)) {
                    tarjeta.style.display = 'block';
                } else {
                    tarjeta.style.display = 'none';
                }
            });
        });

        // FILTROS RÁPIDOS
        document.querySelectorAll('.filtro').forEach(filtro => {
            filtro.addEventListener('click', function() {
                // Remover clase activo de todos
                document.querySelectorAll('.filtro').forEach(f => f.classList.remove('activo'));
                
                // Agregar clase activo al clickeado
                this.classList.add('activo');
                
                // Aquí irá la lógica de filtrado cuando esté conectado a BD
                console.log('Filtro seleccionado:', this.textContent.trim());
            });
        });

        // BOTONES DE ACCIONES EN TARJETAS
        document.querySelectorAll('.accion-ver').forEach(boton => {
            boton.addEventListener('click', function() {
                const tarjeta = this.closest('.tarjeta-socio');
                const nombre = tarjeta.querySelector('.info-basica h2').textContent;
                alert(`Ver perfil completo de: ${nombre}\n(Próximamente: Modal con perfil detallado)`);
            });
        });

        document.querySelectorAll('.accion-editar').forEach(boton => {
            boton.addEventListener('click', function() {
                const tarjeta = this.closest('.tarjeta-socio');
                const nombre = tarjeta.querySelector('.info-basica h2').textContent;
                alert(`Editar información de: ${nombre}\n(Próximamente: Modal de edición con datos precargados)`);
            });
        });

        document.querySelectorAll('.accion-mas').forEach(boton => {
            boton.addEventListener('click', function() {
                alert('Opciones adicionales:\n• Enviar mensaje\n• Ver historial de pagos\n• Ver asistencias\n• Suspender membresía\n• Eliminar socio\n\n(Próximamente: Menú contextual)');
            });
        });

        // BOTONES EN MODAL DE ACTIVIDADES
        document.querySelector('.boton-nueva-actividad')?.addEventListener('click', function() {
            alert('Crear nueva actividad:\n(Próximamente: Modal con formulario para agregar actividad)');
        });

        document.querySelectorAll('.btn-editar-actividad').forEach(boton => {
            boton.addEventListener('click', function() {
                const actividad = this.closest('.item-actividad').querySelector('h4').textContent;
                alert(`Editar actividad: ${actividad}\n(Próximamente: Modal de edición)`);
            });
        });

        document.querySelectorAll('.btn-eliminar-actividad').forEach(boton => {
            boton.addEventListener('click', function() {
                const actividad = this.closest('.item-actividad').querySelector('h4').textContent;
                if (confirm(`¿Estás seguro de eliminar la actividad "${actividad}"?`)) {
                    alert('Actividad eliminada\n(Próximamente: Eliminar de base de datos)');
                }
            });
        });

        // ANIMACIÓN DE BARRAS EN ESTADÍSTICAS
        function animarBarras() {
            const barras = document.querySelectorAll('.relleno-barra');
            barras.forEach(barra => {
                const ancho = barra.style.width;
                barra.style.width = '0';
                setTimeout(() => {
                    barra.style.width = ancho;
                }, 100);
            });
        }

        // Animar barras cuando se abre el modal de estadísticas
        document.querySelector('.boton-estadisticas')?.addEventListener('click', function() {
            setTimeout(animarBarras, 300);
        });

        /*========== JAVASCRIPT PARA MENÚ RESPONSIVO ==========*/

// Esperar a que cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
    
    // Obtener elementos
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');

    // Función para mostrar/ocultar menú
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            navMenu.classList.toggle('show-menu');
            console.log('Toggle clicked, menu:', navMenu.classList.contains('show-menu'));
        });
    }

    // Cerrar menú al hacer clic en un enlace (solo en móvil)
    if (navLinks) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768 && navMenu) {
                    navMenu.classList.remove('show-menu');
                }
            });
        });
    }

    // Cerrar menú al hacer clic fuera de él
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && navMenu) {
            const isClickInsideMenu = navMenu.contains(e.target);
            const isClickOnToggle = navToggle && navToggle.contains(e.target);
            
            if (!isClickInsideMenu && !isClickOnToggle) {
                navMenu.classList.remove('show-menu');
            }
        }
    });

    // Cerrar menú al cambiar tamaño de ventana (si pasa de móvil a desktop)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu) {
            navMenu.classList.remove('show-menu');
        }
    });

    // Cambiar color del header al hacer scroll
    function scrollHeader() {
        const header = document.querySelector('.l-header');
        if (header) {
            if (window.scrollY >= 50) {
                header.classList.add('scroll-header');
            } else {
                header.classList.remove('scroll-header');
            }
        }
    }
    window.addEventListener('scroll', scrollHeader);

    // Mostrar botón scroll to top
    function scrollTop() {
        const scrollTopBtn = document.querySelector('.scrolltop');
        if (scrollTopBtn) {
            if (window.scrollY >= 560) {
                scrollTopBtn.classList.add('show-scroll');
            } else {
                scrollTopBtn.classList.remove('show-scroll');
            }
        }
    }
    window.addEventListener('scroll', scrollTop);

});

console.log('Script de menú cargado');

/*========== JAVASCRIPT PARA MENÚ RESPONSIVO ==========*/
console.log('🚀 Menu.js cargado');

// Esperar a que cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM cargado');
    
    // Obtener elementos
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav__link');

    console.log('📋 Elementos encontrados:');
    console.log('- navMenu:', navMenu);
    console.log('- navToggle:', navToggle);
    console.log('- navLinks:', navLinks.length);

    // TOGGLE MENÚ
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            navMenu.classList.toggle('show-menu');
            
            const isOpen = navMenu.classList.contains('show-menu');
            console.log('🍔 Toggle clickeado - Menú abierto:', isOpen);
        });
        console.log('✅ Event listener del toggle agregado');
    } else {
        console.error('❌ No se encontraron los elementos navToggle o navMenu');
    }

    // CERRAR menú al hacer clic en un enlace (solo móvil)
    navLinks.forEach((link, index) => {
        link.addEventListener('click', function() {
            console.log(`🔗 Link ${index} clickeado`);
            if (window.innerWidth <= 768 && navMenu) {
                navMenu.classList.remove('show-menu');
                console.log('📱 Menú cerrado (móvil)');
            }
        });
    });

    // CERRAR menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768 && navMenu && navToggle) {
            const clickedMenu = navMenu.contains(e.target);
            const clickedToggle = navToggle.contains(e.target);
            
            if (!clickedMenu && !clickedToggle && navMenu.classList.contains('show-menu')) {
                navMenu.classList.remove('show-menu');
                console.log('👆 Cerrado por clic fuera');
            }
        }
    });

    // CERRAR menú al redimensionar ventana
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && navMenu) {
            navMenu.classList.remove('show-menu');
        }
    });

    // SCROLL HEADER
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.l-header');
        if (header) {
            if (window.scrollY >= 50) {
                header.classList.add('scroll-header');
            } else {
                header.classList.remove('scroll-header');
            }
        }
    });

    // SCROLL TOP BUTTON
    window.addEventListener('scroll', function() {
        const scrollTopBtn = document.querySelector('.scrolltop');
        if (scrollTopBtn) {
            if (window.scrollY >= 560) {
                scrollTopBtn.classList.add('show-scroll');
            } else {
                scrollTopBtn.classList.remove('show-scroll');
            }
        }
    });

    console.log('✅ Todos los event listeners configurados');
});