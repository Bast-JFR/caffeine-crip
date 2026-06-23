# Guía completa del proyecto Automotora: Spring Boot + React + REST API

## Objetivo de esta guía

Esta guía documenta, de forma ordenada y detallada, todo el proceso realizado para construir el frontend en React del proyecto **Automotora**, conectado a un backend ya existente desarrollado con **Spring Boot**, **JPA/Hibernate**, **MySQL** y endpoints REST.

El propósito es que este Markdown sirva como respaldo del proyecto, material de estudio y guía paso a paso para reconstruir o explicar el desarrollo completo.

No se incluyen errores puntuales de ejecución ni correcciones accidentales. El documento describe el camino final recomendado y el resultado funcional.

---

# 1. Base del proyecto backend

## 1.1 Tecnologías usadas en backend

El backend está desarrollado con:

```txt
Spring Boot
Maven
JPA / Hibernate
MySQL Workbench
Jakarta Bean Validation
Springdoc OpenAPI / Swagger
```

El backend corre localmente en:

```txt
http://localhost:7070
```

Swagger está configurado en:

```txt
http://localhost:7070/automotora.html
```

La base de datos MySQL está configurada desde `application.properties`.

---

## 1.2 Estructura general del backend

La estructura del backend sigue una arquitectura por capas:

```txt
src/main/java/com/example/Automotora/
├── config/
├── controller/
├── models/
│   ├── entities/
│   ├── requests/
│   └── DTO/
├── repositories/
└── services/
```

Significado de cada carpeta:

```txt
config/        → Configuración global del backend, como CORS.
controller/    → Controladores REST que exponen endpoints.
entities/      → Entidades JPA que representan tablas de MySQL.
requests/      → DTOs de entrada usados en POST y PUT.
DTO/           → DTOs de salida. En este proyecto está vacía.
repositories/  → Interfaces JpaRepository para acceder a la base de datos.
services/      → Lógica de negocio y validaciones.
```

---

# 2. Entidades del backend

El proyecto tiene dos entidades principales:

```txt
Marca
Vehiculo
```

La relación entre ellas es:

```txt
Una Marca puede tener muchos Vehículos.
Un Vehículo pertenece a una Marca.
```

En JPA esto está representado como una relación `ManyToOne` desde `Vehiculo` hacia `Marca`.

---

## 2.1 Entidad `Marca`

Archivo:

```txt
models/entities/Marca.java
```

```java
package com.example.Automotora.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "marca")
public class Marca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idMarca;

    @Column(nullable = false)
    private String nombreMarca;
}
```

Esta entidad representa la tabla `marca`.

Campos:

```txt
idMarca     → ID autoincremental de la marca.
nombreMarca → Nombre de la marca. No puede ser null.
```

---

## 2.2 Entidad `Vehiculo`

Archivo:

```txt
models/entities/Vehiculo.java
```

```java
package com.example.Automotora.models.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "vehiculo")
public class Vehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idVehiculo;

    @Column(nullable = false)
    private String patente;

    @Column(nullable = false)
    private String modelo;

    @ManyToOne
    @JoinColumn(name = "idMarca", nullable = false)
    private Marca marca;
}
```

Esta entidad representa la tabla `vehiculo`.

Campos:

```txt
idVehiculo → ID autoincremental del vehículo.
patente    → Patente del vehículo.
modelo     → Modelo del vehículo.
marca      → Marca asociada mediante ManyToOne.
```

Cuando el backend devuelve un vehículo en JSON, la marca suele venir anidada:

```json
{
  "idVehiculo": 1,
  "patente": "ABCD12",
  "modelo": "Corolla",
  "marca": {
    "idMarca": 1,
    "nombreMarca": "Toyota"
  }
}
```

---

# 3. DTOs de entrada del backend

Los DTOs de entrada definen qué JSON espera el backend en las operaciones `POST` y `PUT`.

---

## 3.1 `AgregarMarca`

```java
package com.example.Automotora.models.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AgregarMarca {
    
    @NotBlank
    private String nombreMarca;
}
```

JSON esperado por `POST /marca`:

```json
{
  "nombreMarca": "Toyota"
}
```

---

## 3.2 `ActualizarMarca`

```java
package com.example.Automotora.models.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class ActualizarMarca {

    @NotNull
    private Integer idMarca;

    @NotBlank
    private String nombreMarca;
}
```

JSON esperado por `PUT /marca`:

```json
{
  "idMarca": 1,
  "nombreMarca": "Toyota"
}
```

Punto importante: el backend **no** actualiza con `PUT /marca/{id}`. El ID viaja dentro del body.

---

## 3.3 `AgregarVehiculo`

```java
package com.example.Automotora.models.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AgregarVehiculo {
      
    @NotBlank
    private String patente;
  
    @NotBlank
    private String modelo;

    @NotNull
    private Integer idMarca;
}
```

JSON esperado por `POST /vehiculo`:

```json
{
  "patente": "ABCD12",
  "modelo": "Corolla",
  "idMarca": 1
}
```

---

## 3.4 `ActualizarVehiculo`

```java
package com.example.Automotora.models.requests;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class ActualizarVehiculo {

    @NotNull
    @Positive
    private Integer idVehiculo;

    @NotBlank
    private String patente;

    @NotBlank
    private String modelo;

    @NotNull
    @Positive
    private Integer idMarca;
}
```

JSON esperado por `PUT /vehiculo`:

```json
{
  "idVehiculo": 1,
  "patente": "ABCD12",
  "modelo": "Corolla",
  "idMarca": 1
}
```

También aquí el backend **no** actualiza con `PUT /vehiculo/{id}`. El ID viaja dentro del body.

---

# 4. Endpoints REST detectados

## 4.1 Endpoints de Marca

```txt
GET     http://localhost:7070/marca
GET     http://localhost:7070/marca/{idMarca}
POST    http://localhost:7070/marca
PUT     http://localhost:7070/marca
DELETE  http://localhost:7070/marca/{idMarca}
```

---

## 4.2 Endpoints de Vehículo

```txt
GET     http://localhost:7070/vehiculo
GET     http://localhost:7070/vehiculo/{idVehiculo}
POST    http://localhost:7070/vehiculo
PUT     http://localhost:7070/vehiculo
DELETE  http://localhost:7070/vehiculo/{idVehiculo}
```

---

# 5. Configuración CORS en Spring Boot

React con Vite corre normalmente en:

```txt
http://localhost:5173
```

Si ese puerto está ocupado, Vite puede usar:

```txt
http://localhost:5174
```

El backend corre en:

```txt
http://localhost:7070
```

Como son puertos distintos, el navegador los considera orígenes distintos. Por eso se configuró CORS globalmente en Spring Boot.

Archivo:

```txt
src/main/java/com/example/Automotora/config/WebConfig.java
```

```java
package com.example.Automotora.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/*
 * =====================================================================================================================
 * CONFIGURACIÓN GLOBAL DE CORS
 * =====================================================================================================================
 *
 * Este archivo permite que el frontend React pueda consumir los endpoints del backend Spring Boot.
 *
 * Backend Spring Boot:
 * http://localhost:7070
 *
 * Frontend React con Vite:
 * http://localhost:5173
 * http://localhost:5174
 *
 * Usamos configuración global para no repetir @CrossOrigin en cada controller.
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(
                        "http://localhost:5173",
                        "http://localhost:5174"
                )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
}
```

Después de crear o modificar este archivo, siempre se debe reiniciar Spring Boot.

---

# 6. Conceptos base de React trabajados

Antes de construir el CRUD real, se trabajaron los conceptos principales de React.

---

## 6.1 Bloque 0: ¿Qué es React?

React es una librería JavaScript para construir interfaces de usuario mediante componentes.

React no reemplaza a Spring Boot. React se ocupa de la vista. Spring Boot se ocupa del backend, la lógica de negocio y la base de datos.

Relación conceptual:

```txt
Spring Boot:
Controller → Service → Repository → MySQL

React:
Página → Componente → Servicio Axios → Endpoint REST
```

Analogía con Java:

```txt
Componente React = una función que combina lógica, datos y vista.
```

---

## 6.2 Bloque 1: Crear proyecto React con Vite

El proyecto React se creó separado del backend:

```txt
Proyectos/
├── Automotora/              → Backend Spring Boot
└── automotora-frontend/   → Frontend React
```

Comando usado:

```bash
npm create vite@latest automotora-frontend -- --template react
```

Luego:

```bash
cd automotora-frontend
npm install
npm run dev
```

Vite levanta el frontend en:

```txt
http://localhost:5173
```

O si el puerto está ocupado:

```txt
http://localhost:5174
```

Archivos importantes creados por Vite:

```txt
package.json   → dependencias y scripts del proyecto.
index.html     → HTML base con <div id="root"></div>.
src/main.jsx   → punto de entrada de React.
src/App.jsx    → componente raíz.
vite.config.js → configuración de Vite.
```

Analogía:

```txt
pom.xml       → dependencias en Spring Boot
package.json  → dependencias en React
```

---

## 6.3 Bloque 2: Componentes y JSX

Un componente es una función que retorna JSX.

Ejemplo:

```jsx
function Saludo() {
  return <h1>Hola desde React</h1>;
}
```

JSX parece HTML, pero se escribe dentro de JavaScript.

Diferencias importantes entre HTML y JSX:

```txt
HTML: class
JSX:  className

HTML: for
JSX:  htmlFor

HTML: <input>
JSX:  <input />
```

Ejemplo de componente demo:

```jsx
function Saludo() {
  return (
    <div className="alert alert-primary">
      <h2>Bienvenido a Automotora</h2>
      <p>Este es nuestro primer componente reutilizable en React.</p>
    </div>
  );
}

export default Saludo;
```

---

## 6.4 Bloque 3: Props

Las props son datos que un componente padre envía a un componente hijo.

Analogía con Java:

```txt
Props en React = parámetros de un constructor o método en Java.
```

Ejemplo:

```jsx
<TituloPagina
  titulo="Sistema Automotora"
  descripcion="Frontend React conectado a Spring Boot."
/>
```

Componente receptor:

```jsx
function TituloPagina({ titulo, descripcion }) {
  return (
    <div className="mb-4">
      <h1>{titulo}</h1>
      <p>{descripcion}</p>
    </div>
  );
}
```

---

## 6.5 Bloque 4: Estado con useState

El estado es una variable especial. Cuando cambia, React actualiza la pantalla automáticamente.

Ejemplo:

```jsx
const [cantidadVehiculos, setCantidadVehiculos] = useState(0);
```

Significado:

```txt
cantidadVehiculos    → valor actual.
setCantidadVehiculos → función para actualizarlo.
useState(0)          → valor inicial.
```

Regla importante:

```txt
Nunca modificar el estado directamente.
Siempre usar la función set.
```

Incorrecto:

```jsx
cantidadVehiculos = cantidadVehiculos + 1;
```

Correcto:

```jsx
setCantidadVehiculos(cantidadVehiculos + 1);
```

---

## 6.6 Bloque 5: useEffect y ciclo de vida

`useEffect` permite ejecutar código en momentos específicos del componente.

Caso más usado:

```jsx
useEffect(() => {
  cargarMarcas();
}, []);
```

El array vacío significa:

```txt
Ejecutar solo cuando el componente se monta por primera vez.
```

En este proyecto se usa para:

```txt
Cargar marcas al abrir /marcas.
Cargar vehículos al abrir /vehiculos.
Cargar marcas al abrir formulario de vehículo.
Cargar una marca específica al editar.
Cargar un vehículo específico al editar.
```

---

## 6.7 Bloque 6: Axios y llamadas REST

Se instaló Axios:

```bash
npm install axios
```

Axios permite hacer peticiones HTTP desde React hacia Spring Boot.

Flujo:

```txt
Página React
  ↓
Servicio React
  ↓
Axios
  ↓
Endpoint Spring Boot
```

---

# 7. Configuración del frontend React

## 7.1 Archivo `.env`

Archivo ubicado en la raíz del proyecto React:

```txt
automotora-frontend/.env
```

Contenido:

```env
VITE_API_URL=http://localhost:7070
```

En Vite, las variables de entorno que se usan en React deben comenzar con `VITE_`.

Se lee así:

```js
import.meta.env.VITE_API_URL
```

Después de crear o modificar `.env`, se debe reiniciar Vite:

```bash
Ctrl + C
npm run dev
```

---

## 7.2 Configuración central de Axios

Archivo:

```txt
src/services/axiosConfig.js
```

```js
/*
 * =====================================================================================================================
 * CONFIGURACIÓN CENTRAL DE AXIOS
 * =====================================================================================================================
 *
 * Axios es la librería que usamos para hacer peticiones HTTP desde React hacia Spring Boot.
 *
 * Este archivo centraliza:
 * - URL base del backend.
 * - Header Content-Type para enviar JSON.
 */

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;
```

Con esta configuración:

```js
api.get("/marca")
```

equivale a:

```txt
GET http://localhost:7070/marca
```

---

# 8. Servicios frontend

Los servicios frontend centralizan las llamadas REST. No contienen lógica de negocio del backend; solo llaman a endpoints.

---

## 8.1 Servicio de marcas

Archivo:

```txt
src/services/marcaService.js
```

```js
import api from "./axiosConfig";

export const obtenerTodasLasMarcas = async () => {
  try {
    const respuesta = await api.get("/marca");
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener todas las marcas:", error);
    throw error;
  }
};

export const obtenerMarcaPorId = async (idMarca) => {
  try {
    const idMarcaNumerico = parseInt(idMarca);
    const respuesta = await api.get(`/marca/${idMarcaNumerico}`);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener la marca por ID:", error);
    throw error;
  }
};

export const agregarMarca = async (nuevaMarca) => {
  try {
    const respuesta = await api.post("/marca", nuevaMarca);
    return respuesta.data;
  } catch (error) {
    console.error("Error al agregar la marca:", error);
    throw error;
  }
};

export const actualizarMarca = async (marcaActualizada) => {
  try {
    const datosMarca = {
      idMarca: parseInt(marcaActualizada.idMarca),
      nombreMarca: marcaActualizada.nombreMarca
    };

    const respuesta = await api.put("/marca", datosMarca);
    return respuesta.data;
  } catch (error) {
    console.error("Error al actualizar la marca:", error);
    throw error;
  }
};

export const eliminarMarca = async (idMarca) => {
  try {
    const idMarcaNumerico = parseInt(idMarca);
    const respuesta = await api.delete(`/marca/${idMarcaNumerico}`);
    return respuesta.data;
  } catch (error) {
    console.error("Error al eliminar la marca:", error);
    throw error;
  }
};
```

---

## 8.2 Servicio de vehículos

Archivo:

```txt
src/services/vehiculoService.js
```

```js
import api from "./axiosConfig";

export const obtenerTodosLosVehiculos = async () => {
  try {
    const respuesta = await api.get("/vehiculo");
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener todos los vehículos:", error);
    throw error;
  }
};

export const obtenerVehiculoPorId = async (idVehiculo) => {
  try {
    const idVehiculoNumerico = parseInt(idVehiculo);
    const respuesta = await api.get(`/vehiculo/${idVehiculoNumerico}`);
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener el vehículo por ID:", error);
    throw error;
  }
};

export const agregarVehiculo = async (nuevoVehiculo) => {
  try {
    const datosVehiculo = {
      patente: nuevoVehiculo.patente,
      modelo: nuevoVehiculo.modelo,
      idMarca: parseInt(nuevoVehiculo.idMarca)
    };

    const respuesta = await api.post("/vehiculo", datosVehiculo);
    return respuesta.data;
  } catch (error) {
    console.error("Error al agregar el vehículo:", error);
    throw error;
  }
};

export const actualizarVehiculo = async (vehiculoActualizado) => {
  try {
    const datosVehiculo = {
      idVehiculo: parseInt(vehiculoActualizado.idVehiculo),
      patente: vehiculoActualizado.patente,
      modelo: vehiculoActualizado.modelo,
      idMarca: parseInt(vehiculoActualizado.idMarca)
    };

    const respuesta = await api.put("/vehiculo", datosVehiculo);
    return respuesta.data;
  } catch (error) {
    console.error("Error al actualizar el vehículo:", error);
    throw error;
  }
};

export const eliminarVehiculo = async (idVehiculo) => {
  try {
    const idVehiculoNumerico = parseInt(idVehiculo);
    const respuesta = await api.delete(`/vehiculo/${idVehiculoNumerico}`);
    return respuesta.data;
  } catch (error) {
    console.error("Error al eliminar el vehículo:", error);
    throw error;
  }
};
```

---

# 9. React Router DOM

Se instaló:

```bash
npm install react-router-dom bootstrap
```

React Router permite tener varias páginas internas:

```txt
/                              → Inicio
/marcas                        → Listado de marcas
/marcas/agregar                → Crear marca
/marcas/editar/:idMarca        → Editar marca
/vehiculos                     → Listado de vehículos
/vehiculos/agregar             → Crear vehículo
/vehiculos/editar/:idVehiculo  → Editar vehículo
```

---

## 9.1 `main.jsx`

Archivo:

```txt
src/main.jsx
```

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

`BrowserRouter` habilita las rutas en toda la aplicación.

---

## 9.2 `App.jsx`

Archivo:

```txt
src/App.jsx
```

```jsx
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

import MarcaListPage from "./pages/MarcaListPage";
import MarcaFormPage from "./pages/MarcaFormPage";

import VehiculoListPage from "./pages/VehiculoListPage";
import VehiculoFormPage from "./pages/VehiculoFormPage";

function App() {
  return (
    <>
      <Navbar />

      <main className="container mb-5">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/marcas" element={<MarcaListPage />} />
          <Route path="/marcas/agregar" element={<MarcaFormPage />} />
          <Route path="/marcas/editar/:idMarca" element={<MarcaFormPage />} />

          <Route path="/vehiculos" element={<VehiculoListPage />} />
          <Route path="/vehiculos/agregar" element={<VehiculoFormPage />} />
          <Route
            path="/vehiculos/editar/:idVehiculo"
            element={<VehiculoFormPage />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
```

---

# 10. Estructura final del frontend

```txt
src/
├── components/
│   ├── Navbar.jsx
│   ├── MarcaTable.jsx
│   └── VehiculoTable.jsx
│
├── pages/
│   ├── HomePage.jsx
│   ├── MarcaListPage.jsx
│   ├── MarcaFormPage.jsx
│   ├── VehiculoListPage.jsx
│   └── VehiculoFormPage.jsx
│
├── services/
│   ├── axiosConfig.js
│   ├── marcaService.js
│   └── vehiculoService.js
│
├── App.jsx
└── main.jsx
```

---

# 11. Componentes reutilizables

---

## 11.1 `Navbar.jsx`

Archivo:

```txt
src/components/Navbar.jsx
```

```jsx
import { NavLink } from "react-router-dom";

function Navbar() {
  const obtenerClaseNavLink = ({ isActive }) => {
    return isActive ? "nav-link active fw-bold" : "nav-link";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Automotora
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarAutomotora"
          aria-controls="navbarAutomotora"
          aria-expanded="false"
          aria-label="Mostrar navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarAutomotora">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <NavLink className={obtenerClaseNavLink} to="/" end>
                Inicio
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={obtenerClaseNavLink} to="/marcas">
                Marcas
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className={obtenerClaseNavLink} to="/vehiculos">
                Vehículos
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
```

`NavLink` permite navegar sin recargar toda la página y además marcar visualmente la ruta activa.

---

## 11.2 `MarcaTable.jsx`

Archivo:

```txt
src/components/MarcaTable.jsx
```

```jsx
function MarcaTable({ marcas, onEditar, onEliminar }) {
  if (!Array.isArray(marcas) || marcas.length === 0) {
    return (
      <div className="alert alert-warning mb-0">
        No hay marcas para mostrar.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID Marca</th>
            <th scope="col">Nombre de la marca</th>
            <th scope="col" className="text-center">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {marcas.map((marca) => (
            <tr key={marca.idMarca}>
              <td>{marca.idMarca}</td>
              <td>{marca.nombreMarca}</td>

              <td className="text-center">
                <div className="d-flex justify-content-center gap-2">
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={() => onEditar(marca.idMarca)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => onEliminar(marca.idMarca)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MarcaTable;
```

Responsabilidad:

```txt
Mostrar marcas en tabla.
Recibir acciones desde la página padre.
No llamar directamente al backend.
```

---

## 11.3 `VehiculoTable.jsx`

Archivo:

```txt
src/components/VehiculoTable.jsx
```

```jsx
function VehiculoTable({ vehiculos, onEditar, onEliminar }) {
  if (!Array.isArray(vehiculos) || vehiculos.length === 0) {
    return (
      <div className="alert alert-warning mb-0">
        No hay vehículos para mostrar.
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover align-middle">
        <thead className="table-dark">
          <tr>
            <th scope="col">ID Vehículo</th>
            <th scope="col">Patente</th>
            <th scope="col">Modelo</th>
            <th scope="col">Marca</th>
            <th scope="col" className="text-center">
              Acciones
            </th>
          </tr>
        </thead>

        <tbody>
          {vehiculos.map((vehiculo) => (
            <tr key={vehiculo.idVehiculo}>
              <td>{vehiculo.idVehiculo}</td>
              <td>{vehiculo.patente}</td>
              <td>{vehiculo.modelo}</td>
              <td>{vehiculo.marca?.nombreMarca || "Sin marca"}</td>

              <td className="text-center">
                <div className="d-flex justify-content-center gap-2">
                  <button
                    type="button"
                    className="btn btn-warning btn-sm"
                    onClick={() => onEditar(vehiculo.idVehiculo)}
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => onEliminar(vehiculo.idVehiculo)}
                  >
                    Eliminar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default VehiculoTable;
```

Se usa optional chaining:

```jsx
vehiculo.marca?.nombreMarca
```

Esto evita errores si `marca` viene null o undefined.

---

# 12. Formularios controlados

En React, los formularios se manejan con estado.

Ejemplo:

```jsx
const [nombreMarca, setNombreMarca] = useState("");
```

Input controlado:

```jsx
<input
  value={nombreMarca}
  onChange={(evento) => setNombreMarca(evento.target.value)}
/>
```

Esto significa:

```txt
El input muestra lo que hay en el estado.
Cuando el usuario escribe, React actualiza el estado.
```

Para evitar que el formulario recargue la página:

```jsx
evento.preventDefault();
```

---

# 13. Páginas principales

---

## 13.1 `HomePage.jsx`

Archivo:

```txt
src/pages/HomePage.jsx
```

```jsx
function HomePage() {
  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Sistema Automotora</h1>

        <p className="card-text">
          Frontend desarrollado con React y conectado a un backend Spring Boot.
        </p>

        <p className="card-text">
          Desde esta aplicación podrás administrar marcas y vehículos mediante operaciones CRUD completas.
        </p>

        <div className="alert alert-info mb-0">
          Backend esperado: <strong>http://localhost:7070</strong>
          <br />
          Frontend Vite: <strong>http://localhost:5173 o http://localhost:5174</strong>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
```

---

# 14. CRUD de Marca

Funcionalidades implementadas:

```txt
Listar marcas.
Filtrar por ID.
Filtrar por nombre.
Agregar marca.
Editar marca.
Eliminar marca.
Limitar caracteres de filtros y formulario.
```

---

## 14.1 `MarcaListPage.jsx`

Archivo:

```txt
src/pages/MarcaListPage.jsx
```

```jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import MarcaTable from "../components/MarcaTable";

import {
  obtenerTodasLasMarcas,
  eliminarMarca
} from "../services/marcaService";

function MarcaListPage() {
  const navigate = useNavigate();

  const MAX_FILTRO_ID = 10;
  const MAX_FILTRO_NOMBRE_MARCA = 50;

  const [marcas, setMarcas] = useState([]);
  const [filtroId, setFiltroId] = useState("");
  const [filtroNombre, setFiltroNombre] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarMarcas = async () => {
    try {
      setCargando(true);
      setError("");
      setMensaje("");

      const datos = await obtenerTodasLasMarcas();

      if (Array.isArray(datos)) {
        setMarcas(datos);
      } else {
        setMarcas([]);
        setError("El backend respondió, pero no devolvió una lista válida de marcas.");
      }
    } catch (errorPeticion) {
      console.error("Error al cargar marcas:", errorPeticion);
      setMarcas([]);
      setError("No se pudieron cargar las marcas desde el backend.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarMarcas();
  }, []);

  const manejarCambioFiltroId = (evento) => {
    const valor = evento.target.value;
    const soloNumeros = valor.replace(/\D/g, "");

    if (soloNumeros.length <= MAX_FILTRO_ID) {
      setFiltroId(soloNumeros);
    }
  };

  const manejarCambioFiltroNombre = (evento) => {
    const valor = evento.target.value;

    if (valor.length <= MAX_FILTRO_NOMBRE_MARCA) {
      setFiltroNombre(valor);
    }
  };

  const textoFiltroId = filtroId.trim();
  const textoFiltroNombre = filtroNombre.trim().toLowerCase();

  const marcasFiltradas = marcas.filter((marca) => {
    const coincideId =
      textoFiltroId === ""
        ? true
        : marca.idMarca.toString().includes(textoFiltroId);

    const coincideNombre =
      textoFiltroNombre === ""
        ? true
        : marca.nombreMarca.toLowerCase().includes(textoFiltroNombre);

    return coincideId && coincideNombre;
  });

  const manejarAgregarMarca = () => {
    navigate("/marcas/agregar");
  };

  const manejarEditarMarca = (idMarca) => {
    navigate(`/marcas/editar/${idMarca}`);
  };

  const manejarEliminarMarca = async (idMarca) => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar la marca con ID ${idMarca}?`
    );

    if (!confirmar) {
      return;
    }

    try {
      setError("");
      setMensaje("");

      await eliminarMarca(idMarca);
      setMensaje("Marca eliminada correctamente.");
      await cargarMarcas();
    } catch (errorPeticion) {
      console.error("Error al eliminar marca:", errorPeticion);

      const mensajeBackend =
        errorPeticion.response?.data?.message ||
        errorPeticion.response?.data?.error ||
        "";

      setError(
        mensajeBackend !== ""
          ? `No se pudo eliminar la marca. ${mensajeBackend}`
          : "No se pudo eliminar la marca. Puede tener vehículos asociados."
      );
    }
  };

  const limpiarFiltros = () => {
    setFiltroId("");
    setFiltroNombre("");
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-0">Gestión de Marcas</h2>
          <small className="text-muted">
            Listar, filtrar, editar y eliminar marcas.
          </small>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={manejarAgregarMarca}
        >
          Agregar marca
        </button>
      </div>

      <div className="card-body">
        {mensaje !== "" && <div className="alert alert-success">{mensaje}</div>}
        {error !== "" && <div className="alert alert-danger">{error}</div>}

        <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="filtroIdMarca" className="form-label">
              Filtrar por ID
            </label>

            <input
              id="filtroIdMarca"
              type="text"
              inputMode="numeric"
              className="form-control"
              placeholder="Ejemplo: 1"
              value={filtroId}
              onChange={manejarCambioFiltroId}
              maxLength={MAX_FILTRO_ID}
            />

            <div className="form-text">
              {filtroId.length}/{MAX_FILTRO_ID} caracteres
            </div>
          </div>

          <div className="col-md-5">
            <label htmlFor="filtroNombreMarca" className="form-label">
              Filtrar por nombre de marca
            </label>

            <input
              id="filtroNombreMarca"
              type="text"
              className="form-control"
              placeholder="Ejemplo: Toyota"
              value={filtroNombre}
              onChange={manejarCambioFiltroNombre}
              maxLength={MAX_FILTRO_NOMBRE_MARCA}
            />

            <div className="form-text">
              {filtroNombre.length}/{MAX_FILTRO_NOMBRE_MARCA} caracteres
            </div>
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={limpiarFiltros}
            >
              Limpiar
            </button>
          </div>

          <div className="col-md-2 d-flex align-items-end">
            <button
              type="button"
              className="btn btn-dark w-100"
              onClick={cargarMarcas}
            >
              Recargar
            </button>
          </div>
        </div>

        {cargando ? (
          <div className="alert alert-info mb-0">
            Cargando marcas desde el backend...
          </div>
        ) : (
          <MarcaTable
            marcas={marcasFiltradas}
            onEditar={manejarEditarMarca}
            onEliminar={manejarEliminarMarca}
          />
        )}
      </div>
    </div>
  );
}

export default MarcaListPage;
```

---

## 14.2 `MarcaFormPage.jsx`

Archivo:

```txt
src/pages/MarcaFormPage.jsx
```

El formulario sirve para crear y editar marcas.

```jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  agregarMarca,
  actualizarMarca,
  obtenerMarcaPorId
} from "../services/marcaService";

function MarcaFormPage() {
  const navigate = useNavigate();
  const { idMarca } = useParams();

  const MAX_NOMBRE_MARCA = 50;
  const modoEdicion = Boolean(idMarca);

  const [nombreMarca, setNombreMarca] = useState("");
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const cargarMarca = async () => {
    try {
      setCargando(true);
      setError("");

      const idNumerico = parseInt(idMarca);

      if (Number.isNaN(idNumerico) || idNumerico <= 0) {
        setError("El ID de la marca no es válido.");
        return;
      }

      const marca = await obtenerMarcaPorId(idNumerico);
      setNombreMarca(marca.nombreMarca || "");
    } catch (errorPeticion) {
      console.error("Error al cargar marca:", errorPeticion);

      const mensajeBackend =
        errorPeticion.response?.data?.message ||
        errorPeticion.response?.data?.error ||
        "";

      setError(
        mensajeBackend !== ""
          ? `No se pudo cargar la marca. ${mensajeBackend}`
          : "No se pudo cargar la marca desde el backend."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    if (modoEdicion) {
      cargarMarca();
    }
  }, [modoEdicion, idMarca]);

  const manejarCambioNombreMarca = (evento) => {
    const valor = evento.target.value;

    if (valor.length <= MAX_NOMBRE_MARCA) {
      setNombreMarca(valor);
    }
  };

  const manejarEnvioFormulario = async (evento) => {
    evento.preventDefault();

    const nombreLimpio = nombreMarca.trim();

    if (nombreLimpio === "") {
      setError("El nombre de la marca es obligatorio.");
      return;
    }

    if (nombreLimpio.length > MAX_NOMBRE_MARCA) {
      setError(
        `El nombre de la marca no puede superar los ${MAX_NOMBRE_MARCA} caracteres.`
      );
      return;
    }

    try {
      setGuardando(true);
      setError("");

      if (modoEdicion) {
        await actualizarMarca({
          idMarca: parseInt(idMarca),
          nombreMarca: nombreLimpio
        });
      } else {
        await agregarMarca({
          nombreMarca: nombreLimpio
        });
      }

      navigate("/marcas");
    } catch (errorPeticion) {
      console.error("Error al guardar marca:", errorPeticion);

      const mensajeBackend =
        errorPeticion.response?.data?.message ||
        errorPeticion.response?.data?.error ||
        "";

      setError(
        mensajeBackend !== ""
          ? `No se pudo guardar la marca. ${mensajeBackend}`
          : "No se pudo guardar la marca. Verifica el backend y los datos enviados."
      );
    } finally {
      setGuardando(false);
    }
  };

  const cancelar = () => {
    navigate("/marcas");
  };

  if (cargando) {
    return (
      <div className="alert alert-info">
        Cargando información de la marca...
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="mb-0">
          {modoEdicion ? "Editar marca" : "Agregar marca"}
        </h2>

        <small className="text-muted">
          {modoEdicion
            ? "Modifica el nombre de la marca seleccionada."
            : "Registra una nueva marca en el sistema."}
        </small>
      </div>

      <div className="card-body">
        {error !== "" && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={manejarEnvioFormulario}>
          <div className="mb-3">
            <label htmlFor="nombreMarca" className="form-label">
              Nombre de la marca
            </label>

            <input
              id="nombreMarca"
              type="text"
              className="form-control"
              placeholder="Ejemplo: Toyota"
              value={nombreMarca}
              onChange={manejarCambioNombreMarca}
              maxLength={MAX_NOMBRE_MARCA}
              disabled={guardando}
            />

            <div className="form-text">
              {nombreMarca.length}/{MAX_NOMBRE_MARCA} caracteres
            </div>
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={guardando}
            >
              {guardando
                ? "Guardando..."
                : modoEdicion
                  ? "Actualizar marca"
                  : "Guardar marca"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelar}
              disabled={guardando}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MarcaFormPage;
```

---

# 15. CRUD de Vehículo

Funcionalidades implementadas:

```txt
Listar vehículos.
Filtrar por ID.
Filtrar por patente.
Filtrar por modelo.
Filtrar por marca.
Agregar vehículo.
Editar vehículo.
Eliminar vehículo.
Limitar caracteres de filtros y formulario.
```

---

## 15.1 `VehiculoListPage.jsx`

Archivo:

```txt
src/pages/VehiculoListPage.jsx
```

```jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import VehiculoTable from "../components/VehiculoTable";

import {
  obtenerTodosLosVehiculos,
  eliminarVehiculo
} from "../services/vehiculoService";

function VehiculoListPage() {
  const navigate = useNavigate();

  const MAX_FILTRO_ID = 10;
  const MAX_FILTRO_PATENTE = 10;
  const MAX_FILTRO_MODELO = 50;
  const MAX_FILTRO_MARCA = 50;

  const [vehiculos, setVehiculos] = useState([]);
  const [filtroId, setFiltroId] = useState("");
  const [filtroPatente, setFiltroPatente] = useState("");
  const [filtroModelo, setFiltroModelo] = useState("");
  const [filtroMarca, setFiltroMarca] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarVehiculos = async () => {
    try {
      setCargando(true);
      setError("");
      setMensaje("");

      const datos = await obtenerTodosLosVehiculos();

      if (Array.isArray(datos)) {
        setVehiculos(datos);
      } else {
        setVehiculos([]);
        setError("El backend respondió, pero no devolvió una lista válida de vehículos.");
      }
    } catch (errorPeticion) {
      console.error("Error al cargar vehículos:", errorPeticion);
      setVehiculos([]);
      setError(
        "No se pudieron cargar los vehículos. Verifica que el backend esté corriendo y que CORS esté configurado."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarVehiculos();
  }, []);

  const manejarCambioFiltroId = (evento) => {
    const valor = evento.target.value;
    const soloNumeros = valor.replace(/\D/g, "");

    if (soloNumeros.length <= MAX_FILTRO_ID) {
      setFiltroId(soloNumeros);
    }
  };

  const manejarCambioFiltroPatente = (evento) => {
    const valor = evento.target.value;

    if (valor.length <= MAX_FILTRO_PATENTE) {
      setFiltroPatente(valor);
    }
  };

  const manejarCambioFiltroModelo = (evento) => {
    const valor = evento.target.value;

    if (valor.length <= MAX_FILTRO_MODELO) {
      setFiltroModelo(valor);
    }
  };

  const manejarCambioFiltroMarca = (evento) => {
    const valor = evento.target.value;

    if (valor.length <= MAX_FILTRO_MARCA) {
      setFiltroMarca(valor);
    }
  };

  const textoFiltroId = filtroId.trim();
  const textoFiltroPatente = filtroPatente.trim().toLowerCase();
  const textoFiltroModelo = filtroModelo.trim().toLowerCase();
  const textoFiltroMarca = filtroMarca.trim().toLowerCase();

  const vehiculosFiltrados = vehiculos.filter((vehiculo) => {
    const coincideId =
      textoFiltroId === ""
        ? true
        : vehiculo.idVehiculo.toString().includes(textoFiltroId);

    const coincidePatente =
      textoFiltroPatente === ""
        ? true
        : vehiculo.patente.toLowerCase().includes(textoFiltroPatente);

    const coincideModelo =
      textoFiltroModelo === ""
        ? true
        : vehiculo.modelo.toLowerCase().includes(textoFiltroModelo);

    const nombreMarca = vehiculo.marca?.nombreMarca || "";

    const coincideMarca =
      textoFiltroMarca === ""
        ? true
        : nombreMarca.toLowerCase().includes(textoFiltroMarca);

    return coincideId && coincidePatente && coincideModelo && coincideMarca;
  });

  const manejarAgregarVehiculo = () => {
    navigate("/vehiculos/agregar");
  };

  const manejarEditarVehiculo = (idVehiculo) => {
    navigate(`/vehiculos/editar/${idVehiculo}`);
  };

  const manejarEliminarVehiculo = async (idVehiculo) => {
    const confirmar = window.confirm(
      `¿Estás seguro de que deseas eliminar el vehículo con ID ${idVehiculo}?`
    );

    if (!confirmar) {
      return;
    }

    try {
      setError("");
      setMensaje("");

      await eliminarVehiculo(idVehiculo);
      setMensaje("Vehículo eliminado correctamente.");
      await cargarVehiculos();
    } catch (errorPeticion) {
      console.error("Error al eliminar vehículo:", errorPeticion);

      const mensajeBackend =
        errorPeticion.response?.data?.message ||
        errorPeticion.response?.data?.error ||
        "";

      if (mensajeBackend !== "") {
        setError(`No se pudo eliminar el vehículo. ${mensajeBackend}`);
      } else {
        setError("No se pudo eliminar el vehículo. Verifica el backend.");
      }
    }
  };

  const limpiarFiltros = () => {
    setFiltroId("");
    setFiltroPatente("");
    setFiltroModelo("");
    setFiltroMarca("");
  };

  return (
    <div className="card">
      <div className="card-header d-flex justify-content-between align-items-center">
        <div>
          <h2 className="mb-0">Gestión de Vehículos</h2>
          <small className="text-muted">
            Listar, filtrar, editar y eliminar vehículos.
          </small>
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={manejarAgregarVehiculo}
        >
          Agregar vehículo
        </button>
      </div>

      <div className="card-body">
        {mensaje !== "" && <div className="alert alert-success">{mensaje}</div>}
        {error !== "" && <div className="alert alert-danger">{error}</div>}

        <div className="row mb-3">
          <div className="col-md-2">
            <label htmlFor="filtroIdVehiculo" className="form-label">
              Filtrar por ID
            </label>

            <input
              id="filtroIdVehiculo"
              type="text"
              inputMode="numeric"
              className="form-control"
              placeholder="Ej: 1"
              value={filtroId}
              onChange={manejarCambioFiltroId}
              maxLength={MAX_FILTRO_ID}
            />

            <div className="form-text">
              {filtroId.length}/{MAX_FILTRO_ID} caracteres
            </div>
          </div>

          <div className="col-md-3">
            <label htmlFor="filtroPatenteVehiculo" className="form-label">
              Filtrar por patente
            </label>

            <input
              id="filtroPatenteVehiculo"
              type="text"
              className="form-control"
              placeholder="Ej: ABCD12"
              value={filtroPatente}
              onChange={manejarCambioFiltroPatente}
              maxLength={MAX_FILTRO_PATENTE}
            />

            <div className="form-text">
              {filtroPatente.length}/{MAX_FILTRO_PATENTE} caracteres
            </div>
          </div>

          <div className="col-md-3">
            <label htmlFor="filtroModeloVehiculo" className="form-label">
              Filtrar por modelo
            </label>

            <input
              id="filtroModeloVehiculo"
              type="text"
              className="form-control"
              placeholder="Ej: Corolla"
              value={filtroModelo}
              onChange={manejarCambioFiltroModelo}
              maxLength={MAX_FILTRO_MODELO}
            />

            <div className="form-text">
              {filtroModelo.length}/{MAX_FILTRO_MODELO} caracteres
            </div>
          </div>

          <div className="col-md-4">
            <label htmlFor="filtroMarcaVehiculo" className="form-label">
              Filtrar por marca
            </label>

            <input
              id="filtroMarcaVehiculo"
              type="text"
              className="form-control"
              placeholder="Ej: Toyota"
              value={filtroMarca}
              onChange={manejarCambioFiltroMarca}
              maxLength={MAX_FILTRO_MARCA}
            />

            <div className="form-text">
              {filtroMarca.length}/{MAX_FILTRO_MARCA} caracteres
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-secondary w-100"
              onClick={limpiarFiltros}
            >
              Limpiar filtros
            </button>
          </div>

          <div className="col-md-6">
            <button
              type="button"
              className="btn btn-dark w-100"
              onClick={cargarVehiculos}
            >
              Recargar vehículos
            </button>
          </div>
        </div>

        {cargando ? (
          <div className="alert alert-info mb-0">
            Cargando vehículos desde el backend...
          </div>
        ) : (
          <VehiculoTable
            vehiculos={vehiculosFiltrados}
            onEditar={manejarEditarVehiculo}
            onEliminar={manejarEliminarVehiculo}
          />
        )}
      </div>
    </div>
  );
}

export default VehiculoListPage;
```

---

## 15.2 `VehiculoFormPage.jsx`

Archivo:

```txt
src/pages/VehiculoFormPage.jsx
```

El formulario sirve para crear y editar vehículos, cargando marcas desde `GET /marca`.

```jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { obtenerTodasLasMarcas } from "../services/marcaService";

import {
  agregarVehiculo,
  actualizarVehiculo,
  obtenerVehiculoPorId
} from "../services/vehiculoService";

function VehiculoFormPage() {
  const navigate = useNavigate();
  const { idVehiculo } = useParams();

  const MAX_PATENTE = 10;
  const MAX_MODELO = 50;

  const modoEdicion = Boolean(idVehiculo);

  const [vehiculo, setVehiculo] = useState({
    patente: "",
    modelo: "",
    idMarca: ""
  });

  const [marcas, setMarcas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  const cargarDatosIniciales = async () => {
    try {
      setCargando(true);
      setError("");

      const datosMarcas = await obtenerTodasLasMarcas();

      if (Array.isArray(datosMarcas)) {
        setMarcas(datosMarcas);
      } else {
        setMarcas([]);
        setError("El backend no devolvió una lista válida de marcas.");
        return;
      }

      if (modoEdicion) {
        const idVehiculoNumerico = parseInt(idVehiculo);

        if (Number.isNaN(idVehiculoNumerico) || idVehiculoNumerico <= 0) {
          setError("El ID del vehículo no es válido.");
          return;
        }

        const vehiculoEncontrado = await obtenerVehiculoPorId(
          idVehiculoNumerico
        );

        setVehiculo({
          patente: vehiculoEncontrado.patente || "",
          modelo: vehiculoEncontrado.modelo || "",
          idMarca: vehiculoEncontrado.marca?.idMarca
            ? String(vehiculoEncontrado.marca.idMarca)
            : ""
        });
      }
    } catch (errorPeticion) {
      console.error("Error al cargar datos iniciales:", errorPeticion);

      const mensajeBackend =
        errorPeticion.response?.data?.message ||
        errorPeticion.response?.data?.error ||
        "";

      setError(
        mensajeBackend !== ""
          ? `No se pudieron cargar los datos. ${mensajeBackend}`
          : "No se pudieron cargar los datos iniciales desde el backend."
      );
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarDatosIniciales();
  }, [modoEdicion, idVehiculo]);

  const manejarCambioFormulario = (evento) => {
    const { name, value } = evento.target;

    if (name === "patente" && value.length > MAX_PATENTE) {
      return;
    }

    if (name === "modelo" && value.length > MAX_MODELO) {
      return;
    }

    setVehiculo({
      ...vehiculo,
      [name]: value
    });
  };

  const validarFormulario = () => {
    if (vehiculo.patente.trim() === "") {
      setError("La patente es obligatoria.");
      return false;
    }

    if (vehiculo.patente.trim().length > MAX_PATENTE) {
      setError(`La patente no puede superar los ${MAX_PATENTE} caracteres.`);
      return false;
    }

    if (vehiculo.modelo.trim() === "") {
      setError("El modelo es obligatorio.");
      return false;
    }

    if (vehiculo.modelo.trim().length > MAX_MODELO) {
      setError(`El modelo no puede superar los ${MAX_MODELO} caracteres.`);
      return false;
    }

    const idMarcaNumerico = parseInt(vehiculo.idMarca);

    if (Number.isNaN(idMarcaNumerico) || idMarcaNumerico <= 0) {
      setError("Debes seleccionar una marca válida.");
      return false;
    }

    return true;
  };

  const manejarEnvioFormulario = async (evento) => {
    evento.preventDefault();
    setError("");

    if (!validarFormulario()) {
      return;
    }

    try {
      setGuardando(true);

      const datosVehiculo = {
        patente: vehiculo.patente.trim(),
        modelo: vehiculo.modelo.trim(),
        idMarca: parseInt(vehiculo.idMarca)
      };

      if (modoEdicion) {
        await actualizarVehiculo({
          idVehiculo: parseInt(idVehiculo),
          ...datosVehiculo
        });
      } else {
        await agregarVehiculo(datosVehiculo);
      }

      navigate("/vehiculos");
    } catch (errorPeticion) {
      console.error("Error al guardar vehículo:", errorPeticion);

      const mensajeBackend =
        errorPeticion.response?.data?.message ||
        errorPeticion.response?.data?.error ||
        "";

      setError(
        mensajeBackend !== ""
          ? `No se pudo guardar el vehículo. ${mensajeBackend}`
          : "No se pudo guardar el vehículo. Verifica los datos y el backend."
      );
    } finally {
      setGuardando(false);
    }
  };

  const manejarCancelar = () => {
    navigate("/vehiculos");
  };

  if (cargando) {
    return (
      <div className="alert alert-info">
        Cargando información del formulario...
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="mb-0">
          {modoEdicion ? "Editar vehículo" : "Agregar vehículo"}
        </h2>

        <small className="text-muted">
          {modoEdicion
            ? "Modifica los datos del vehículo seleccionado."
            : "Registra un nuevo vehículo en el sistema."}
        </small>
      </div>

      <div className="card-body">
        {error !== "" && <div className="alert alert-danger">{error}</div>}

        {marcas.length === 0 && (
          <div className="alert alert-warning">
            No hay marcas disponibles. Debes crear al menos una marca antes de
            registrar vehículos.
          </div>
        )}

        <form onSubmit={manejarEnvioFormulario}>
          <div className="mb-3">
            <label htmlFor="patente" className="form-label">
              Patente
            </label>

            <input
              id="patente"
              name="patente"
              type="text"
              className="form-control"
              placeholder="Ejemplo: ABCD12"
              value={vehiculo.patente}
              onChange={manejarCambioFormulario}
              maxLength={MAX_PATENTE}
              disabled={guardando}
            />

            <div className="form-text">
              {vehiculo.patente.length}/{MAX_PATENTE} caracteres
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="modelo" className="form-label">
              Modelo
            </label>

            <input
              id="modelo"
              name="modelo"
              type="text"
              className="form-control"
              placeholder="Ejemplo: Corolla"
              value={vehiculo.modelo}
              onChange={manejarCambioFormulario}
              maxLength={MAX_MODELO}
              disabled={guardando}
            />

            <div className="form-text">
              {vehiculo.modelo.length}/{MAX_MODELO} caracteres
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="idMarca" className="form-label">
              Marca
            </label>

            <select
              id="idMarca"
              name="idMarca"
              className="form-select"
              value={vehiculo.idMarca}
              onChange={manejarCambioFormulario}
              disabled={guardando || marcas.length === 0}
            >
              <option value="">Selecciona una marca</option>

              {marcas.map((marca) => (
                <option key={marca.idMarca} value={marca.idMarca}>
                  {marca.nombreMarca}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex gap-2">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={guardando || marcas.length === 0}
            >
              {guardando
                ? "Guardando..."
                : modoEdicion
                  ? "Actualizar vehículo"
                  : "Guardar vehículo"}
            </button>

            <button
              type="button"
              className="btn btn-secondary"
              onClick={manejarCancelar}
              disabled={guardando}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VehiculoFormPage;
```

---

# 16. Límites de caracteres aplicados

Los límites definidos en frontend son:

```txt
nombreMarca → máximo 50 caracteres
patente     → máximo 10 caracteres
modelo      → máximo 50 caracteres

filtro ID marca      → máximo 10 caracteres
filtro nombre marca  → máximo 50 caracteres
filtro ID vehículo   → máximo 10 caracteres
filtro patente       → máximo 10 caracteres
filtro modelo        → máximo 50 caracteres
filtro marca         → máximo 50 caracteres
```

Además, los filtros de ID usan:

```js
valor.replace(/\D/g, "")
```

Esto elimina cualquier caracter que no sea número.

---

# 17. Conversión de IDs con parseInt

En React, los valores de input, select y URL llegan como string.

Ejemplo:

```txt
"1"
```

Pero el backend espera:

```java
Integer
```

Por eso usamos:

```js
parseInt(idMarca)
parseInt(idVehiculo)
parseInt(vehiculo.idMarca)
```

Esto se aplica en:

```txt
Editar marca.
Eliminar marca.
Buscar marca por ID.
Crear vehículo.
Editar vehículo.
Eliminar vehículo.
Buscar vehículo por ID.
```

---

# 18. Flujo final de Marca

## 18.1 Listar marcas

```txt
Usuario entra a /marcas
↓
MarcaListPage se monta
↓
useEffect ejecuta cargarMarcas()
↓
marcaService ejecuta GET /marca
↓
Spring Boot devuelve la lista
↓
React guarda la lista en useState
↓
MarcaTable muestra la tabla
```

---

## 18.2 Crear marca

```txt
Usuario entra a /marcas/agregar
↓
MarcaFormPage se abre en modo creación
↓
Usuario escribe nombreMarca
↓
React valida que no esté vacío y no supere 50 caracteres
↓
React llama agregarMarca()
↓
Axios ejecuta POST /marca
↓
Backend guarda la marca
↓
React navega a /marcas
```

---

## 18.3 Editar marca

```txt
Usuario presiona Editar
↓
React navega a /marcas/editar/{idMarca}
↓
MarcaFormPage detecta modo edición
↓
useEffect carga la marca con GET /marca/{idMarca}
↓
Usuario modifica nombreMarca
↓
React valida
↓
React llama actualizarMarca()
↓
Axios ejecuta PUT /marca
↓
Backend actualiza la marca
↓
React navega a /marcas
```

---

## 18.4 Eliminar marca

```txt
Usuario presiona Eliminar
↓
React pide confirmación
↓
React llama eliminarMarca(idMarca)
↓
Axios ejecuta DELETE /marca/{idMarca}
↓
Backend elimina la marca
↓
React recarga la lista
```

---

# 19. Flujo final de Vehículo

## 19.1 Listar vehículos

```txt
Usuario entra a /vehiculos
↓
VehiculoListPage se monta
↓
useEffect ejecuta cargarVehiculos()
↓
vehiculoService ejecuta GET /vehiculo
↓
Spring Boot devuelve la lista
↓
React guarda la lista en useState
↓
VehiculoTable muestra la tabla
```

---

## 19.2 Crear vehículo

```txt
Usuario entra a /vehiculos/agregar
↓
VehiculoFormPage carga marcas con GET /marca
↓
Usuario escribe patente
↓
Usuario escribe modelo
↓
Usuario selecciona marca
↓
React valida patente, modelo e idMarca
↓
React convierte idMarca con parseInt
↓
React llama agregarVehiculo()
↓
Axios ejecuta POST /vehiculo
↓
Backend busca la Marca por idMarca
↓
Backend guarda el Vehículo
↓
React navega a /vehiculos
```

---

## 19.3 Editar vehículo

```txt
Usuario presiona Editar
↓
React navega a /vehiculos/editar/{idVehiculo}
↓
VehiculoFormPage carga marcas con GET /marca
↓
VehiculoFormPage carga vehículo con GET /vehiculo/{idVehiculo}
↓
React llena patente, modelo e idMarca
↓
Usuario modifica datos
↓
React valida
↓
React llama actualizarVehiculo()
↓
Axios ejecuta PUT /vehiculo
↓
Backend actualiza el vehículo
↓
React navega a /vehiculos
```

---

## 19.4 Eliminar vehículo

```txt
Usuario presiona Eliminar
↓
React pide confirmación
↓
React llama eliminarVehiculo(idVehiculo)
↓
Axios ejecuta DELETE /vehiculo/{idVehiculo}
↓
Backend elimina el vehículo
↓
React recarga la lista
```

---

# 20. Recomendación de validación en backend

Aunque el frontend limita caracteres, el backend también debería reforzar esas restricciones.

Ejemplo recomendado:

```java
@NotBlank
@Size(max = 50)
private String nombreMarca;
```

Para vehículo:

```java
@NotBlank
@Size(max = 10)
private String patente;

@NotBlank
@Size(max = 50)
private String modelo;
```

Esto protege el sistema incluso si alguien intenta enviar datos desde Postman, Swagger u otro cliente externo.

---

# 21. Estado final del proyecto

Al finalizar este proceso, el frontend React quedó conectado al backend Spring Boot con CRUD completo para ambas entidades.

## Marca

```txt
Listar marcas
Filtrar por ID
Filtrar por nombre
Agregar marca
Editar marca
Eliminar marca
Límites de caracteres en formulario y filtros
```

## Vehículo

```txt
Listar vehículos
Filtrar por ID
Filtrar por patente
Filtrar por modelo
Filtrar por marca
Agregar vehículo
Editar vehículo
Eliminar vehículo
Límites de caracteres en formulario y filtros
```

---

# 22. Conceptos React aplicados en el proyecto

```txt
Componentes reutilizables
JSX
Props
useState
useEffect
Axios
React Router DOM
BrowserRouter
Routes
Route
NavLink
useNavigate
useParams
Formularios controlados
Validación frontend
Consumo de endpoints REST
Separación de pages, components y services
```

---

# 23. Comandos principales usados

Crear proyecto:

```bash
npm create vite@latest automotora-frontend -- --template react
```

Entrar al proyecto:

```bash
cd automotora-frontend
```

Instalar dependencias base:

```bash
npm install
```

Instalar Axios:

```bash
npm install axios
```

Instalar React Router y Bootstrap:

```bash
npm install react-router-dom bootstrap
```

Ejecutar frontend:

```bash
npm run dev
```

---

# 24. Conclusión

Este proyecto quedó organizado como una aplicación fullstack real:

```txt
Spring Boot expone endpoints REST.
React consume esos endpoints con Axios.
React Router organiza las páginas.
Bootstrap da estructura visual.
Los servicios frontend separan las llamadas HTTP.
Las páginas manejan estado, filtros y formularios.
Los componentes reutilizables muestran tablas y navegación.
```

La arquitectura final mantiene separación de responsabilidades tanto en backend como en frontend.

