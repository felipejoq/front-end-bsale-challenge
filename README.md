## 🧑‍💻 Desafío Bsale - Tienda

- El desafío consta del desarrollo de una tienda que muestre productos obtenidos desde una base de datos experimental dispuesta por Bsale y que el desarrollador debe implementar de tal forma que pueda servir los recursos de esa base de datos dividiendo el proyecto en dos grandes partes: Front-end y Back-end.

#### 🖥 Para instalar y ejecutar:

1. Solo debe copiar el proyecto en un directorio o carpeta pública (que cualquier persona pueda acceder) de un servidor con tecnología APACHE.

### 🤖 Front-End:

##### Tecnologías y lenguajes utilizados, principalmente son:

- HTML para la estructuración del sitio web.
- CSS para entregar estilos a la estructura HTML
- JavaScript usando las especificaciones de ECMAscript v6.
- Librería de íconos de FontAwesome (Externa) ([Source](https://fontawesome.com/))

Mediante estas tecnologías se logra crear el sitio alojado en un servidor al cual se puede acceder usando esta URL: `https://bsale.uncodigo.com/store/`

#### 🤔 ¿Cómo funciona?

Básicamente la estructura de carpetas es la siguiente:

    root
    - img
        - no-image.jpg
    - js
        - main.script.js
    - css
        - styles.css
    - index.html

- El archivo Index.html es el que representa la "Interfaz" del sitio WEB.
- La carpeta `img` contiene recursos gráficos para el desarrollo del sitio web, en este caso contiene una imagen de formato JPG para asignar a los productos que no tienen una URL de imagen válida, si ese atributo está `null` o `vacío`.
- La carpeta `js` contiene el motor (por decirlo así) del sitio web, es allí donde se procesan peticiones al servidor, donde se renderizan algunos elementos HTML y que le entrega interacción al Sitio Web, así pasa de ser un sitio `"estático"` a un sitio `"dinámico"` que puede mostrar los elementos dispuestos por el servidor.
- Finalmente la carpeta `css` contiene reglas de estilos en cascada o mas conocidas como `"Estilos CSS"` para así entregar forma, colores, comportamientos, etc. A las etiquetas HTML que componen la estructura del sitio.

#### 🚧👷‍♂️ TO-DO (Tareas por hacer):

- Modularizar el archivo: `main.script.js` aplicando mejores prácticas de programación y que así sea fácil de mantener a futuro o de agregar nuevas funciones.

#### 👀 Observaciones

- Personalmente he aprendido un montón desarrollando este ejercicio, muchas cosas tuve que volver a investigarlas y también aplicarlas para lograr obtener un resultado que en lo personal me deja muy conforme. 🤓

[En este otro repositorio de GitHub](https://github.com/felipejoq/back-end-bsale-challenge) podemos encontrar la otra parte del proyecto, la parte "Back-End".

😉 Dev with ❤️
