# SDM-Tracker — preparación para Netlify

## Publicación

El proyecto web estático se encuentra en `09_DANIEL_PROYECTO/`. El archivo raíz `netlify.toml` configura esa carpeta como base y publica su contenido sin ejecutar un proceso de compilación.

Al conectar este repositorio con Netlify, usa la rama `main` después de integrar esta preparación, o selecciona temporalmente la rama `netlify-prep` para revisar un deploy de prueba.

- Build command: dejar vacío.
- Publish directory: `.` relativo a `09_DANIEL_PROYECTO` (ya definido en `netlify.toml`).
- Node/build dependencies: no se requieren para servir las páginas estáticas actuales.

## Estado real de la aplicación — importante

Esta versión puede publicarse como **prototipo navegable**, pero no está lista como aplicación operativa con datos reales:

- Las páginas cargan `assets/app.js`, que solicita endpoints de servidor como `/api/session`, `/api/settings` y `/api/data/...`.
- En el repositorio no se encuentra el backend/API ni una base de datos. Netlify no crea esos servicios solo por publicar el HTML.
- `_local/navegacion.js` y `_local/lecturas.js` sustituyen llamadas de lectura con datos de demostración y bloquean operaciones de escritura. Por tanto, registros, autenticación, correo y persistencia reales no funcionarán en este despliegue estático.
- La configuración interna todavía identifica la interfaz como **“Proyecto / 09”** y contiene descripciones genéricas de definición de proyecto, requerimientos y decisiones, no una experiencia claramente configurada como SDM Tracker.

**No introduzcas información real, credenciales ni datos de clientes en esta vista.** El atributo `noindex` y los encabezados para buscadores no equivalen a un control de acceso; cualquier sitio estático publicado puede ser visitado por quien tenga la URL, salvo que se proteja en la configuración de Netlify.

## Para convertirlo en producto operativo

1. Definir la funcionalidad y el modelo de datos del SDM Tracker que se espera entregar.
2. Implementar y desplegar una API/backend y almacenamiento persistente adecuados, o adaptar la aplicación a un servicio gestionado.
3. Implementar autenticación y autorización reales en el servidor; ocultar enlaces en la interfaz no protege los datos.
4. Actualizar marca, textos, configuración y pruebas; verificar formularios, permisos, persistencia, errores y accesibilidad en el entorno de despliegue.

## Revisión previa a producción

- [ ] Confirmar que la interfaz corresponde al producto SDM Tracker previsto.
- [ ] Probar navegación y recursos estáticos en la URL de Netlify.
- [ ] Conectar backend/base de datos y probar persistencia si se requieren datos reales.
- [ ] Proteger el sitio y las API antes de cargar información confidencial.
- [ ] Probar el flujo de autenticación, roles y operaciones CRUD con cuentas de prueba.
