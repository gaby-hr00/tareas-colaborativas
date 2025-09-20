# Lista de Tareas Colaborativa

## La Lista de Tareas Colaborativa permite a varios usuarios trabajar sobre un mismo panel, permitiéndoles crear, consultar, filtrar y eliminar tareas. Los usuarios pueden observar en el panel quién es el autor de la tarea y quién fue su último editor. Además, pueden cambiar los estados y prioridades, así como marcar las tareas como completas.

## La página cuenta con paginación y búsqueda por texto, lo que facilita la navegación y búsqueda de tareas, manteniendo el orden.

# Instalación
1. Clonar el Repositorio

## Primero, clona el repositorio usando el siguiente comando:

git clone https://github.com/gaby-hr00/tareas-colaborativas.git

2. Acceder a la Carpeta del Proyecto

## Entra a la carpeta del proyecto:

cd tareas-colaborativas

3. Instalar Dependencias

## Instala las dependencias necesarias ejecutando:

npm install


## Además, instala json-server y axios de forma global (si no lo tienes ya instalado):

npm install -g json-server
npm install axios

# Iniciar el Proyecto

## Para iniciar la aplicación en modo desarrollo, ejecuta:

npm run dev


## Luego, abre el siguiente enlace en tu navegador:

http://localhost:5173/

# Iniciar el Servidor para la Base de Datos

## En una terminal Git Bash o terminal adicional, inicia el servidor de base de datos json-server con el siguiente comando:

json-server --watch db.json --port 5000


## Verifica que en el archivo package.json, en la sección de scripts, exista la siguiente configuración:

"start": "json-server --watch db.json --port 5000"


## Una vez iniciado el servidor, abre los siguientes vínculos en tu navegador para verificar que todo está funcionando correctamente:

http://localhost:5000/usuarios

http://localhost:5000/tareas

# Uso

1. Acceder a la Página Principal

## Una vez que los servidores estén en ejecución, abre la página principal en tu navegador. Al acceder, deberías encontrarte en el formulario de registro.

2. Registrar una Cuenta

## Diligencia tus datos siguiendo los estándares solicitados en el formulario de registro. Asegúrate de completar todos los campos necesarios.

3. Verificar la Creación de la Cuenta

## Verifica que tu nueva cuenta haya sido agregada correctamente en el servidor json-server. Puedes comprobarlo accediendo a la siguiente URL:

http://localhost:5000/usuarios


## Deberías ver los datos de tu cuenta en la lista de usuarios.

4. Iniciar Sesión

## Una vez registrado, puedes proceder a iniciar sesión con tus credenciales. Esto te permitirá acceder a todas las funcionalidades del panel de tareas colaborativas.

5. Comenzar a Trabajar en Equipo

## ¡Listo! Ahora puedes comenzar a trabajar en equipo. Ya podrás crear, editar y gestionar tareas y colaborar con otros usuarios.

# Créditos

## Autor: Ana Hernandez, Valentina Sierra, Camilo Silva

## Dependencias: 
  json-server
  axios

## Cada proyecto es diferente, por lo que puedes agregar o quitar secciones según lo que sea relevante para tu caso específico.


