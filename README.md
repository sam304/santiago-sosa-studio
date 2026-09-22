# Santiago Sosa Studio — revisión estructural y UX

Sitio estático con 18 páginas, HTML/CSS/JS nativo y fuentes locales. Se conserva la identidad visual.

## Editar y verificar

- `build.py` es la fuente de contenido: `python build.py` regenera los HTML.
- `docs/assets/styles.css` conserva el diseño y añade formulario y ajustes responsive.
- `docs/assets/main.js` controla menú, parámetros y preparación de consultas.
- `docs/assets/config.js` conserva el WhatsApp existente. Sin correo configurado.
- `python validate.py` comprueba rutas, anclas, metadatos y parámetros.
- `python -m http.server 8765 --directory docs` permite previsualizar.

## Formulario

Se prepara la consulta para WhatsApp, según elección del usuario. Solo nombre, teléfono y necesidad son obligatorios. El visitante revisa el resumen y envía el mensaje en WhatsApp. No hay recepción en servidor ni almacenamiento. Adjuntos preparados pero deshabilitados; se comparten en WhatsApp hasta disponer de recepción segura. Los parámetros interes, producto y origen se validan contra valores conocidos. Editar campos invalida el resumen previo.

## Contenido y arquitectura

Home presenta el estudio, dos trabajos, capacidades resumidas y dos productos. Soluciones conserva cuatro categorías. Productos conserva tres tipologías y fichas. Todos son `data-product-type="custom"`; los modos futuros standard y configurable no activan compra ni precios. Proyectos muestra cuatro trabajos; el proceso se presenta en El Taller. Se conservan todas las imágenes y rutas. Referencias conceptuales etiquetadas. Horario provisional y ubicación sin cambios.

Páginas reales: index,follow y canonical del dominio santiagososastudio.com. Las dos fichas conceptuales conservan noindex,follow. Un staging público debe impedir indexación a nivel de servidor.

## Publicación

Publicar solo el contenido de docs, con index.html en la raíz. GitHub conserva el código fuente y los archivos generados. No hay workflow de despliegue en el repositorio; subir los cambios a GitHub no actualiza automáticamente el sitio en producción.

## Validación

18 páginas y 330 referencias locales. Navegador: 390, 768 y 1440 px (54 combinaciones), sin overflow horizontal ni imágenes cargadas rotas; un H1 por página y sin errores JS registrados. Formulario, resumen, edición, parámetros válidos/desconocidos y menú móvil/Escape comprobados sin enviar mensajes. Revisión visual de las seis páginas principales y formulario móvil.

Sin e-commerce, pagos, usuarios, Supabase, CRM, filtros, buscador ni automatizaciones.
