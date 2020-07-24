# grupo_3_mercadomeme

## MercadoMEME - Trabajo Integrador

### Tematica del sitio

El sitio está destinado a la venta de productos customizados con diversos memes, que pueden ser seleccionados de una gran base de datos, o creados por el usuario.
El usuario podrá optar por dos caminos:
1) Elegir algún producto de interés y customizarlo con un meme de su agrado.
2) Elegir o crear su propio meme y luego plasmarlo en un producto para darle entidad. 
Los productos disponibles serán los que solemos ven en merchandising, tazas, remeras, gorras, mochilas, vasos térmicos, etc...

El sitio está destinado a usuarios que quieran regalar algo pensado, o bien, comprar algún producto de utilidad para usar día a día mostrando algún mensaje o pensamiento propio.

### Listado de referentes:

#### Productos
* https://flashcookie.com/
* https://www.threadless.com/
* https://www.tiendakitsch.com/

#### Memes
* https://sustancia.mitiendanube.com/
* https://www.memegenerator.es/
* https://www.kapwing.com/meme-maker
* https://imgflip.com/memegenerator


### Integrantes del grupo:

* Juan Manuel Beytrison
* Leonel Stefani
* Agustín Venditti


### Wireframe - Sprint 1:

https://xd.adobe.com/view/a7fb86e3-55c5-4e07-91f0-b2f05f349c3a-f2a8/


### Tablero de trabajo:

https://trello.com/b/24CXEKkc/mercadomeme


### Sprint 2:

* Ver archivo retro.md
* Ver tablero de trabajo.
* Implementación de la estructura MVC. Decidimos utilizar express-generator y ubicar el proyecto completo dentro de /myapp. Leimos que esta es una práctica muy utilizada en todo el mundo. Dentro de la carpeta del proyecto, decidimos modificar la esturctura para disponer de la carpeta /public (pública para el navegador) y la carpeta /src con toda la funcionalidad.
* Home del sitio. En nuestro caso llamada "Index" te mostrará ejemplos de lo que ofrece el sitio y te invitará a buscar un meme o un producto. Además, te mostrará algunos de los productos más vendidos.
* Productos. Si decidiste llegar hasta acá, estamos dispuestos a ofrecerte todos los productos que tenemos, mostrándote variantes, descripciones y precios.
* Memes. En caso de que te interese más el meme, podés ir directamente por este camino y buscar lo que tengas en mente. Más adelante tendrás que aplicarselo a un producto.
* Detalle de producto. Cuando llegues acá, deberías tener al menos un producto seleccionado. Si todavía no elegiste un meme podrás ir a buscarlo (podés elegir varios y guardarlos en tu biblioteca para tenerlos disponibles en el detalle de producto). Una vez que tengas producto y meme (o la biblioteca llena), podrás seleccionar color y tamaño de entre los disponibles. Se te mostrará una imágen de cómo va quedando, y el precio final. Terminaste? Agregalo a tu carrito y seguí buscando, o bien, andá directamente a comprar.
* Una vez en el carrito, se te mostrarán todos los productos que hayas agregado. En cada producto verás una pequeña imágen del mismo, una descripción, las características que hayas seleccionado (tamaño, color, etc), el precio y un selector para la cantidad. Se te permitirá además eliminar ese producto de la lista. Cuando termines de elegir las cantidades de cada item que estés comprando, tendras un botón para avanzar hacia el pago...
* En todo momento tendrás la opción de registrarte. Si clickeas en "Registrarme" el sitio te redireccionará a un formulario de registro. Cuenta con pocos pasos ya que queremos que lo hagas lo más rápido posible y puedas seguir navegando.
* Carga de producto (administrador). Desde esta página, el administrador podrá cargar un producto o modificar uno existente. Deberá seleccionar una categoría que le habilitará distintas opciones. Deberá cargar todos los datos, nombre, precio, tamaños disponibles, colores disponibles, descripción, etc... Además le deberá cargar una imágen principal y hasta 4 imágenes alternativas.


#### Aclaraciones:
* Todas las páginas responden a cualquier tamaño de viewPort, y fueron pensadas para ser cómodas en formato "mobile".
* En cualquier momento podrás cliclear el logo y te llevará a index.
* En cualquier momento podrás cliclear "Productos", "Memes", "Registrarme" o el logo del carrito y te llevará a cada sitio respectivamente.
* Para llegar al detalle de producto puedes ir a "Productos" y avanzar, o bien ingresar a la ruta ".../products/detail".
* Para llegar al formulario de carga de producto deberás ingresar a la ruta ".../products/upload".
* Para checkear cómo se verá la página de error deberás ingresar a la ruta ".../error".


### Sprint 3:

* Ver archivo retro.md
* Ver tablero de trabajo.
* Template engines. Siguiendo la línea de lo trabajado en el Sprint 2, se agregaron nuevas vistas en formato (.ejs). Además se implementaron líneas de JS en las vistas para procesar información y mostrarla. La metodología de archivos parciales fue implementada ya desde el Sprint 2, y se continuó en la misma línea.
* JSON de productos. Se pensó en función de los procesamientos que queremos hacer.
* JSON de usuarios. Fue creado, se utilizará en un futuro.
* Vista de login. Se puede acceder en todo momento haciendo click en "login".
* Home del sitio. Se mostrarán los 4 más vendidos, extraídos del JSON de productos y ordenados según la cantidad vendida (qtySold).
* Productos. Agrupados por categoría (extraídas del JSON), con un dropdown se pueden ver todos los productos de esa categoría. Haciendo click en el producto que quieras, te previsualizará más abajo sus detalles, tamaños disponibles, colores, precio, etc... La idea es que puedas ágilmente cambiar de un producto a otro e ir viendo sus características.
* Detalle de producto. Cuando llegues acá, deberías tener al menos un producto seleccionado. La vista tendrá todos los detalles del producto y se podrá seleccionar el tamaño y color que quieras. Notesé que las opciones variarán según los tamaños y colores disponibles de cada producto.
* Upload. Operaciones CRUD. Para acceder, debes seguir la ruta ".../products/upload" (entorno Test). En próximos sprints, si el usuario es administrador, una opción para administrar productos se le mostrará condicionalmente para que pueda acceder. Desde esta vista tendrás 2 opciones:
* Create. Si quieres crear un producto nuevo, puedes seleccionar "Ir a crear producto". El sistema te asignará el id automáticamente (el siguiente según el JSON de productos). Luego puedes seleccionar todos las características recorriendo los campos. Al finalizar, apretando "Crear producto" el sistema te redirigirá a upload y archivará el producto nuevo que hayas creado.
* Editar o eliminar. Para editar o eliminar un producto, primero tendrás que buscarlo. Puedes hacerlo por id, nombre o categoría. Cuando apliques los filtros se te mostrarán todos los productos que coinciden con tu búsqueda. Sobre cada uno puedes editar o eliminar:
* Eliminar. Te redirige a una vista que te resume todas las características del producto que estás eliminando. Si decides ELIMINAR, te redirigirá a upload y eliminará el producto.
* Editar. Te redirige a una vista muy similar a create, pero con todos los campos cargados (con los datos que ya tiene el producto). Puedes editar lo que quieras y al "Confirmar la edición de producto" te redirigirá a upload y editará el producto. Notesé que los valores que no selecciones o no cambies, permanecerán como estaban en el producto.

#### Aclaraciones:
* Se pueden realizar testeos y recuperar el JSON desde backupProducts.JSON.












