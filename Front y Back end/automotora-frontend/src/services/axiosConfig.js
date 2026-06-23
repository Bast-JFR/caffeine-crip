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
 *
 * Backend:
 * http://localhost:7070
 *
 * Frontend:
 * http://localhost:5173 o http://localhost:5174
 */

import axios from "axios";

/*
 * =====================================================================================================================
 * INSTANCIA DE AXIOS
 * =====================================================================================================================
 *
 * import.meta.env.VITE_API_URL lee el valor definido en el archivo .env:
 *
 * VITE_API_URL=http://localhost:7070
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json"
  }
});

export default api;