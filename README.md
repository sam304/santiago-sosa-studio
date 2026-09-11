# Santiago Sosa Studio — fase 4

Sitio estático en español. HTML5, CSS3 y JavaScript nativo. No necesita Node, paquetes ni backend para funcionar. Abrir `docs/index.html` después de extraer el ZIP. Todos los enlaces usan rutas relativas compatibles con hosting convencional y subdirectorios.

## Contenido

11 páginas: Inicio, Soluciones, Productos, Proyectos, El taller, Contacto, tres fichas de producto y dos aplicaciones conceptuales.

- `docs/`: sitio, listo para copiar a la raíz pública del hosting cuando se apruebe publicar.
- `docs/assets/styles.css`: colores, tipografía, espaciado y responsive.
- `docs/assets/config.js`: teléfono WhatsApp internacional (solo dígitos) y correo reales.
- `docs/assets/main.js`: menú accesible y consultas contextualizadas.
- `build.py`: fuente de contenido y componentes compartidos. `python3 build.py` regenera los HTML sin dependencias. Editar aquí los contenidos para conservar cambios en futuras regeneraciones. También se pueden editar directamente los HTML si no se regenera.

## Estado y pendientes

No publicado. Sin repositorio remoto creado. Se mantuvo el trabajo dentro de fase 4.

Antes de publicación:
1. Completar WhatsApp y correo en `config.js`. En ausencia de datos, no se generan enlaces ficticios: contacto muestra disponibilidad próxima.
2. Reemplazar fotografías conceptuales por fotografías propias. Las aplicaciones mostradas NO son proyectos ejecutados ni clientes reales. Actualizar las descripciones y etiquetas al incorporar material real.
3. Incorporar dirección/horario únicamente si se van a publicar y confirmar atención presencial.
4. Ejecutar fase 5: revisión visual en navegador, teclado, móvil, contraste, zoom y recorrido completo de contacto.
5. Con dominio confirmado y contenido real, retirar `noindex,nofollow`, añadir canonical, sitemap y metadatos de idioma según URLs finales. No se inventó dominio ni marcado de negocio con información no confirmada.
6. Fase 6 requiere aprobación: GitHub, hosting y dominio. La carpeta `.openai` solo declara el directorio estático; no hay sitio registrado ni desplegado.

La instalación se evalúa y cotiza por separado según alcance, ubicación, complejidad y desplazamiento.

## Diseño

Paleta: mineral #F5F5F2, grafito #202224, naranja #FF6B35. Soluciones, productos y sectores son secciones independientes con 64–120 px de espacio vertical. Responsive: 1050, 850 y 600 px; navegación móvil con teclado/Escape. Se respeta movimiento reducido. Fotografías WebP de 1200 × 900, carga diferida excepto imagen principal.

## Idiomas

Español inicial (`lang="es"`). Para inglés se recomienda añadir páginas bajo `/en/`, navegación entre equivalentes y hreflang con dominio final. No traducido todavía.

## Verificaciones de fase 4

Sintaxis JavaScript y enlaces/recursos locales verificados. No se ha realizado todavía la revisión visual en navegador de fase 5. No hay formulario ni envío de datos a servidor. Las consultas abren WhatsApp/mailto una vez configurados.
