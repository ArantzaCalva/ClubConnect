ClubConnect - Proyecto preparado por ChatGPT
Contenido generado: PHP backend, JS, SQL and basic admin/user pages.

Instrucciones rápidas:
1. Copia la carpeta 'clubconnect' dentro de tu htdocs (ej: C:\xampp\htdocs\clubconnect)
2. Importa 'clubconnect.sql' en phpMyAdmin (o ejecútalo).
3. Accede a http://localhost/clubconnect/create_admin.php?user=admin&pass=admin123
   Esto creará un admin con usuario 'admin' y contraseña 'admin123' (hashed correctamente).
4. Abre http://localhost/clubconnect/login.html para probar login y registro.
5. Ajusta credenciales de DB en php/conexion.php si tu MySQL no usa root sin password.

Archivos importantes:
- /php/*.php  (backend endpoints)
- /js/login.js (login + registro)
- /admin/index.html, /admin/js/admin.js (panel admin básico)
- /usuario/indexUser.html, /jsUsuario/usuario.js (panel usuario básico)

Nota de seguridad:
- En producción, habilita HTTPS, valida y sanitiza todos los inputs y añade controles de sesión y CSRF.
