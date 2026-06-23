# Automotora Frontend React — Comandos de terminal

Este documento recopila los comandos de terminal usados durante la creación del frontend React del proyecto **Automotora**, junto con otros comandos útiles para trabajar con un proyecto **React + Vite + Bootstrap + Axios + React Router DOM**.

La idea es tener una guía rápida para saber:

- Qué instalar primero.
- Para qué sirve cada comando.
- En qué carpeta debe ejecutarse.
- Qué comandos ayudan a revisar errores comunes.
- Qué comandos son útiles para mantener el proyecto.

---

# 1. Orden recomendado de instalación al crear un frontend React

Cuando se crea un proyecto frontend desde cero, conviene seguir este orden:

```txt
1. Verificar Node.js y npm.
2. Crear el proyecto React con Vite.
3. Entrar a la carpeta del proyecto.
4. Instalar dependencias base del proyecto.
5. Levantar el servidor de desarrollo.
6. Instalar Axios para llamadas REST.
7. Instalar React Router DOM para navegación.
8. Instalar Bootstrap para estilos.
9. Crear y configurar .env.
10. Reiniciar el servidor de desarrollo.
```

---

# 2. Comandos de instalación en orden de prioridad

## 2.1. Verificar instalación de Node.js

```bash
node -v
```

### Para qué sirve

Verifica si Node.js está instalado y muestra su versión.

React y Vite necesitan Node.js para funcionar.

### Ejemplo de salida

```txt
v20.11.1
```

---

## 2.2. Verificar instalación de npm

```bash
npm -v
```

### Para qué sirve

Verifica si npm está instalado.

`npm` es el administrador de paquetes que permite instalar librerías como:

```txt
axios
bootstrap
react-router-dom
```

### Ejemplo de salida

```txt
10.2.4
```

---

## 2.3. Crear proyecto React con Vite

```bash
npm create vite@latest automotora-frontend -- --template react
```

### Para qué sirve

Crea un nuevo proyecto React usando Vite.

En este proyecto usamos:

```txt
automotora-frontend
```

como nombre de carpeta del frontend.

### Desglose del comando

```txt
npm create vite@latest    → ejecuta el generador de proyectos de Vite.
automotora-frontend       → nombre de la carpeta que se creará.
-- --template react       → indica que queremos plantilla React.
```

### Resultado esperado

Se crea una carpeta:

```txt
automotora-frontend/
```

con archivos como:

```txt
package.json
vite.config.js
index.html
src/
```

---

## 2.4. Entrar a la carpeta del frontend

```bash
cd automotora-frontend
```

### Para qué sirve

Cambia la ubicación de la terminal hacia la carpeta del proyecto React.

Este paso es obligatorio antes de ejecutar:

```bash
npm install
npm run dev
npm install axios
```

porque esos comandos deben ejecutarse donde está el archivo `package.json`.

---

## 2.5. Instalar dependencias iniciales del proyecto

```bash
npm install
```

### Para qué sirve

Instala todas las dependencias declaradas en `package.json`.

Cuando Vite crea el proyecto, genera un `package.json`, pero las dependencias reales se descargan con:

```bash
npm install
```

### Resultado esperado

Se crea la carpeta:

```txt
node_modules/
```

y el archivo:

```txt
package-lock.json
```

---

## 2.6. Levantar el servidor de desarrollo

```bash
npm run dev
```

### Para qué sirve

Inicia el frontend en modo desarrollo.

Vite normalmente levanta React en:

```txt
http://localhost:5173
```

Si ese puerto está ocupado, puede usar:

```txt
http://localhost:5174
```

### Ejemplo de salida

```txt
Local:   http://localhost:5173/
```

---

## 2.7. Detener el servidor de desarrollo

```bash
Ctrl + C
```

### Para qué sirve

Detiene el proceso que está ejecutando `npm run dev`.

Esto es necesario cuando:

- Cambias el archivo `.env`.
- Instalas nuevas dependencias.
- Quieres reiniciar Vite.
- El servidor quedó usando un puerto incorrecto.

En algunas terminales de Windows puede preguntar:

```txt
Terminate batch job (Y/N)?
```

Puedes responder:

```txt
Y
```

o:

```txt
S
```

según el idioma de tu consola.

---

## 2.8. Instalar Axios

```bash
npm install axios
```

### Para qué sirve

Instala Axios, la librería que usamos para hacer peticiones HTTP desde React hacia Spring Boot.

En el proyecto Automotora, Axios se usa en:

```txt
src/services/axiosConfig.js
src/services/marcaService.js
src/services/vehiculoService.js
```

### Ejemplo de uso en código

```js
const respuesta = await api.get("/marca");
return respuesta.data;
```

---

## 2.9. Instalar React Router DOM

```bash
npm install react-router-dom
```

### Para qué sirve

Instala la librería que permite crear rutas internas en React.

En Automotora se usa para manejar rutas como:

```txt
/
 /marcas
 /marcas/agregar
 /marcas/editar/:idMarca
 /vehiculos
 /vehiculos/agregar
 /vehiculos/editar/:idVehiculo
```

### Elementos usados

```txt
BrowserRouter
Routes
Route
NavLink
useNavigate
useParams
```

---

## 2.10. Instalar Bootstrap

```bash
npm install bootstrap
```

### Para qué sirve

Instala Bootstrap para usar estilos predefinidos.

En Automotora se usa para:

```txt
Navbar
Botones
Tablas
Cards
Formularios
Alertas
Grillas
```

### Ejemplo de clases Bootstrap usadas

```jsx
<button className="btn btn-primary">
  Guardar
</button>
```

---

## 2.11. Instalar React Router DOM y Bootstrap juntos

```bash
npm install react-router-dom bootstrap
```

### Para qué sirve

Instala ambas dependencias en un solo comando.

Es útil si estás configurando la navegación y el estilo visual al mismo tiempo.

---

## 2.12. Instalar Axios, React Router DOM y Bootstrap juntos

```bash
npm install axios react-router-dom bootstrap
```

### Para qué sirve

Instala las tres dependencias principales usadas en este proyecto frontend.

Este comando es útil después de crear el proyecto con Vite.

### Orden lógico de uso

Aunque se pueden instalar juntas, conceptualmente se usan así:

```txt
Axios           → llamadas REST al backend.
React Router    → navegación entre páginas.
Bootstrap       → estilos visuales.
```

---

# 3. Comandos usados durante el proyecto Automotora

## 3.1. Crear el frontend

```bash
npm create vite@latest automotora-frontend -- --template react
```

Crea el proyecto React con Vite.

---

## 3.2. Entrar al proyecto

```bash
cd automotora-frontend
```

Entra a la carpeta del frontend.

---

## 3.3. Instalar dependencias base

```bash
npm install
```

Instala las dependencias iniciales del proyecto.

---

## 3.4. Ejecutar React

```bash
npm run dev
```

Levanta el frontend en desarrollo.

---

## 3.5. Instalar Axios

```bash
npm install axios
```

Permite conectar React con Spring Boot mediante HTTP.

---

## 3.6. Instalar React Router DOM y Bootstrap

```bash
npm install react-router-dom bootstrap
```

Permite navegación entre páginas y estilos visuales.

---

## 3.7. Detener el servidor

```bash
Ctrl + C
```

Detiene el servidor de Vite.

---

## 3.8. Volver una carpeta atrás

```bash
cd ..
```

### Para qué sirve

Sube un nivel en la estructura de carpetas.

Ejemplo:

Si estás en:

```txt
C:\Users\gfjaq\Documents\Proyectos VSCode\Spring\automotora-frontend
```

y ejecutas:

```bash
cd ..
```

quedas en:

```txt
C:\Users\gfjaq\Documents\Proyectos VSCode\Spring
```

---

## 3.9. Listar archivos en Windows PowerShell

```powershell
dir
```

### Para qué sirve

Muestra los archivos y carpetas del directorio actual.

Lo usamos para verificar si estábamos en la carpeta correcta y si existía:

```txt
package.json
src/
vite.config.js
index.html
```

---

# 4. Comandos para verificar que estás en la carpeta correcta

## 4.1. Ver contenido de la carpeta actual

```powershell
dir
```

### Qué debes ver en la raíz del proyecto React

```txt
package.json
vite.config.js
index.html
src
node_modules
.env
```

Si no ves `package.json`, entonces no estás en la carpeta correcta para ejecutar comandos npm.

---

## 4.2. Ver ruta actual en PowerShell

```powershell
pwd
```

### Para qué sirve

Muestra la ruta completa donde estás parado en la terminal.

### Ejemplo

```txt
Path
----
C:\Users\gfjaq\Documents\Proyectos VSCode\Spring\automotora-frontend
```

---

## 4.3. Entrar a una carpeta específica

```powershell
cd nombre-carpeta
```

### Ejemplo

```powershell
cd automotora-frontend
```

---

# 5. Comandos para trabajar con dependencias

## 5.1. Instalar una dependencia específica

```bash
npm install nombre-paquete
```

### Ejemplo

```bash
npm install axios
```

Instala Axios y lo agrega a `package.json`.

---

## 5.2. Instalar varias dependencias

```bash
npm install axios react-router-dom bootstrap
```

Instala varias librerías en un solo comando.

---

## 5.3. Ver dependencias instaladas

```bash
npm list --depth=0
```

### Para qué sirve

Muestra las dependencias principales instaladas en el proyecto.

### Ejemplo de salida esperada

```txt
axios
bootstrap
react
react-dom
react-router-dom
vite
```

---

## 5.4. Ver si Axios está instalado

```bash
npm list axios
```

### Para qué sirve

Confirma si Axios está instalado.

---

## 5.5. Ver si React Router DOM está instalado

```bash
npm list react-router-dom
```

### Para qué sirve

Confirma si React Router DOM está instalado.

---

## 5.6. Ver si Bootstrap está instalado

```bash
npm list bootstrap
```

### Para qué sirve

Confirma si Bootstrap está instalado.

---

## 5.7. Reinstalar todas las dependencias

```bash
npm install
```

### Para qué sirve

Si descargaste el proyecto desde GitHub o borraste `node_modules`, este comando reinstala todo lo definido en `package.json`.

---

# 6. Comandos para limpiar y reinstalar dependencias

A veces un proyecto React puede tener errores por dependencias dañadas o instalación incompleta. En ese caso se puede limpiar y reinstalar.

## 6.1. Borrar `node_modules` en Windows PowerShell

```powershell
Remove-Item -Recurse -Force node_modules
```

### Para qué sirve

Elimina la carpeta donde están instaladas las dependencias.

---

## 6.2. Borrar `package-lock.json` en Windows PowerShell

```powershell
Remove-Item -Force package-lock.json
```

### Para qué sirve

Elimina el archivo de bloqueo de versiones.

Esto fuerza a npm a reconstruirlo.

---

## 6.3. Reinstalar dependencias después de limpiar

```bash
npm install
```

### Para qué sirve

Vuelve a descargar todas las dependencias.

---

## 6.4. Secuencia completa de limpieza

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npm run dev
```

### Cuándo usarlo

Solo cuando hay errores persistentes de dependencias.

No es necesario usarlo en el flujo normal de trabajo.

---

# 7. Comandos para trabajar con `.env`

## 7.1. Crear archivo `.env`

En VS Code puedes crearlo manualmente desde el explorador de archivos.

También puedes hacerlo desde PowerShell:

```powershell
New-Item .env
```

### Para qué sirve

Crea el archivo `.env` en la raíz del proyecto.

---

## 7.2. Agregar variable al `.env` desde PowerShell

```powershell
Set-Content .env "VITE_API_URL=http://localhost:7070"
```

### Para qué sirve

Escribe dentro del archivo `.env` la URL base del backend.

---

## 7.3. Ver contenido del `.env`

```powershell
Get-Content .env
```

### Resultado esperado

```txt
VITE_API_URL=http://localhost:7070
```

---

## 7.4. Reiniciar React después de modificar `.env`

```bash
Ctrl + C
npm run dev
```

### Para qué sirve

Vite necesita reiniciarse para leer cambios en `.env`.

---

# 8. Comandos útiles de Vite

## 8.1. Ejecutar en desarrollo

```bash
npm run dev
```

Levanta el servidor local para desarrollo.

---

## 8.2. Construir versión de producción

```bash
npm run build
```

### Para qué sirve

Genera una versión optimizada del frontend.

El resultado queda normalmente en:

```txt
dist/
```

---

## 8.3. Probar la versión construida

```bash
npm run preview
```

### Para qué sirve

Sirve para probar localmente lo generado por:

```bash
npm run build
```

---

# 9. Comandos de navegación en terminal

## 9.1. Cambiar de carpeta

```bash
cd nombre-carpeta
```

Ejemplo:

```bash
cd automotora-frontend
```

---

## 9.2. Subir un nivel

```bash
cd ..
```

---

## 9.3. Ver archivos y carpetas

PowerShell:

```powershell
dir
```

Git Bash o Linux/macOS:

```bash
ls
```

---

## 9.4. Ver ruta actual

PowerShell:

```powershell
pwd
```

---

## 9.5. Limpiar pantalla

PowerShell:

```powershell
cls
```

Git Bash o Linux/macOS:

```bash
clear
```

---

# 10. Comandos útiles para crear carpetas y archivos

## 10.1. Crear carpeta en PowerShell

```powershell
mkdir src\components
```

### Para qué sirve

Crea una carpeta.

Ejemplo para el proyecto:

```powershell
mkdir src\pages
mkdir src\services
mkdir src\assets
mkdir src\hooks
```

---

## 10.2. Crear archivo vacío en PowerShell

```powershell
New-Item src\components\Navbar.jsx
```

### Para qué sirve

Crea un archivo nuevo.

Ejemplos del proyecto:

```powershell
New-Item src\components\MarcaTable.jsx
New-Item src\components\VehiculoTable.jsx
New-Item src\pages\MarcaListPage.jsx
New-Item src\pages\VehiculoFormPage.jsx
```

---

## 10.3. Abrir VS Code desde terminal

```bash
code .
```

### Para qué sirve

Abre la carpeta actual en Visual Studio Code.

Debe ejecutarse desde la raíz del proyecto.

---

# 11. Comandos para revisar errores comunes

## 11.1. Ver si estás en la carpeta con `package.json`

```powershell
dir
```

Debe aparecer:

```txt
package.json
```

Si no aparece, no ejecutes todavía:

```bash
npm run dev
```

porque fallará.

---

## 11.2. Ver dependencias instaladas

```bash
npm list --depth=0
```

Sirve para confirmar que están instaladas:

```txt
axios
bootstrap
react-router-dom
```

---

## 11.3. Ver posibles vulnerabilidades

```bash
npm audit
```

### Para qué sirve

Analiza dependencias y muestra posibles problemas de seguridad.

---

## 11.4. Intentar corregir vulnerabilidades automáticamente

```bash
npm audit fix
```

### Para qué sirve

Intenta actualizar dependencias para corregir vulnerabilidades compatibles.

---

## 11.5. Ver dependencias desactualizadas

```bash
npm outdated
```

### Para qué sirve

Muestra qué paquetes tienen versiones nuevas disponibles.

---

## 11.6. Actualizar dependencias compatibles

```bash
npm update
```

### Para qué sirve

Actualiza dependencias respetando los rangos definidos en `package.json`.

---

# 12. Comandos útiles con Git

Estos comandos no son obligatorios para ejecutar el proyecto, pero son recomendados para llevar control de versiones.

## 12.1. Inicializar repositorio Git

```bash
git init
```

### Para qué sirve

Crea un repositorio Git en la carpeta actual.

---

## 12.2. Ver estado de archivos

```bash
git status
```

### Para qué sirve

Muestra archivos nuevos, modificados o pendientes de guardar en Git.

---

## 12.3. Agregar cambios al área de preparación

```bash
git add .
```

### Para qué sirve

Prepara todos los archivos modificados para hacer commit.

---

## 12.4. Crear commit

```bash
git commit -m "Crear frontend React Automotora"
```

### Para qué sirve

Guarda una versión del proyecto en Git.

---

## 12.5. Ver historial de commits

```bash
git log --oneline
```

### Para qué sirve

Muestra el historial de cambios de forma resumida.

---

# 13. Comandos para probar backend desde navegador o terminal

## 13.1. Probar endpoint de marcas en navegador

```txt
http://localhost:7070/marca
```

### Para qué sirve

Verifica si el backend devuelve marcas.

---

## 13.2. Probar endpoint de vehículos en navegador

```txt
http://localhost:7070/vehiculo
```

### Para qué sirve

Verifica si el backend devuelve vehículos.

---

## 13.3. Abrir Swagger

```txt
http://localhost:7070/automotora.html
```

### Para qué sirve

Permite probar endpoints Spring Boot desde interfaz web.

---

## 13.4. Probar backend con `curl`

```bash
curl http://localhost:7070/marca
```

### Para qué sirve

Consulta el endpoint desde terminal.

---

## 13.5. Probar vehículos con `curl`

```bash
curl http://localhost:7070/vehiculo
```

---

# 14. Comandos `curl` útiles para CRUD

Estos comandos son útiles para probar el backend sin React.

## 14.1. Crear marca con `curl`

```bash
curl -X POST http://localhost:7070/marca -H "Content-Type: application/json" -d "{\"nombreMarca\":\"Toyota\"}"
```

### Para qué sirve

Prueba el endpoint de creación de marca.

---

## 14.2. Actualizar marca con `curl`

```bash
curl -X PUT http://localhost:7070/marca -H "Content-Type: application/json" -d "{\"idMarca\":1,\"nombreMarca\":\"Toyota Actualizada\"}"
```

---

## 14.3. Eliminar marca con `curl`

```bash
curl -X DELETE http://localhost:7070/marca/1
```

---

## 14.4. Crear vehículo con `curl`

```bash
curl -X POST http://localhost:7070/vehiculo -H "Content-Type: application/json" -d "{\"patente\":\"ABCD12\",\"modelo\":\"Corolla\",\"idMarca\":1}"
```

---

## 14.5. Actualizar vehículo con `curl`

```bash
curl -X PUT http://localhost:7070/vehiculo -H "Content-Type: application/json" -d "{\"idVehiculo\":1,\"patente\":\"WXYZ99\",\"modelo\":\"Yaris\",\"idMarca\":1}"
```

---

## 14.6. Eliminar vehículo con `curl`

```bash
curl -X DELETE http://localhost:7070/vehiculo/1
```

---

# 15. Comandos recomendados para el flujo diario de trabajo

## 15.1. Arrancar backend

Desde VS Code o terminal del backend, ejecutar Spring Boot.

También puedes usar el botón de ejecución de VS Code si tienes el proyecto abierto.

---

## 15.2. Verificar backend

```txt
http://localhost:7070/automotora.html
```

o:

```txt
http://localhost:7070/marca
```

---

## 15.3. Entrar al frontend

```bash
cd automotora-frontend
```

---

## 15.4. Levantar frontend

```bash
npm run dev
```

---

## 15.5. Abrir React

```txt
http://localhost:5173
```

o:

```txt
http://localhost:5174
```

---

# 16. Secuencia completa para crear el frontend desde cero

Esta sería la secuencia recomendada completa:

```bash
node -v
npm -v
npm create vite@latest automotora-frontend -- --template react
cd automotora-frontend
npm install
npm install axios react-router-dom bootstrap
npm run dev
```

Luego crear archivo `.env`:

```env
VITE_API_URL=http://localhost:7070
```

Reiniciar Vite:

```bash
Ctrl + C
npm run dev
```

---

# 17. Secuencia rápida si ya tienes el proyecto creado

Si el proyecto ya existe y solo quieres levantarlo:

```bash
cd automotora-frontend
npm install
npm run dev
```

---

# 18. Secuencia rápida si faltan dependencias

```bash
npm install axios react-router-dom bootstrap
npm run dev
```

---

# 19. Secuencia rápida para resolver problemas de dependencias

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
npm run dev
```

---

# 20. Resumen de comandos esenciales

```bash
node -v
npm -v
npm create vite@latest automotora-frontend -- --template react
cd automotora-frontend
npm install
npm install axios react-router-dom bootstrap
npm run dev
Ctrl + C
```

---

# 21. Tabla resumen

| Comando | Para qué sirve |
|---|---|
| `node -v` | Verifica versión de Node.js |
| `npm -v` | Verifica versión de npm |
| `npm create vite@latest automotora-frontend -- --template react` | Crea el proyecto React con Vite |
| `cd automotora-frontend` | Entra a la carpeta del frontend |
| `npm install` | Instala dependencias del proyecto |
| `npm install axios` | Instala Axios para llamadas HTTP |
| `npm install react-router-dom` | Instala navegación de React |
| `npm install bootstrap` | Instala Bootstrap |
| `npm install axios react-router-dom bootstrap` | Instala las tres dependencias principales |
| `npm run dev` | Levanta el frontend |
| `Ctrl + C` | Detiene el servidor |
| `dir` | Lista archivos en PowerShell |
| `pwd` | Muestra la ruta actual |
| `cd ..` | Sube una carpeta |
| `npm list --depth=0` | Lista dependencias instaladas |
| `npm run build` | Genera versión de producción |
| `npm run preview` | Prueba la versión compilada |
| `npm audit` | Revisa vulnerabilidades |
| `npm update` | Actualiza dependencias compatibles |
| `git init` | Inicializa Git |
| `git status` | Muestra estado de archivos |
| `git add .` | Agrega cambios |
| `git commit -m "mensaje"` | Crea commit |
