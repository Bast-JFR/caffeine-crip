/*
 * =====================================================================================================================
 * SERVICIO FRONTEND: marcaService
 * =====================================================================================================================
 *
 * Este archivo centraliza todas las llamadas HTTP relacionadas con Marca.
 *
 * Es parecido a MarcaService.java en Spring Boot, pero aquí no contiene lógica de negocio.
 * Aquí solamente llamamos a los endpoints REST del backend usando Axios.
 *
 * Endpoints backend:
 *
 * GET     http://localhost:7070/marca
 * GET     http://localhost:7070/marca/{idMarca}
 * POST    http://localhost:7070/marca
 * PUT     http://localhost:7070/marca
 * DELETE  http://localhost:7070/marca/{idMarca}
 */

import api from "./axiosConfig";

/*
 * =====================================================================================================================
 * GET: obtenerTodasLasMarcas
 * =====================================================================================================================
 *
 * Llama al endpoint:
 * GET /marca
 *
 * Devuelve una lista de marcas.
 */
export const obtenerTodasLasMarcas = async () => {
  try {
    const respuesta = await api.get("/marca");
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener todas las marcas:", error);
    throw error;
  }
};

/*
 * =====================================================================================================================
 * GET: obtenerMarcaPorId
 * =====================================================================================================================
 *
 * Llama al endpoint:
 * GET /marca/{idMarca}
 *
 * El idMarca debe ser numérico porque en Spring Boot se recibe como int.
 */
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

/*
 * =====================================================================================================================
 * POST: agregarMarca
 * =====================================================================================================================
 *
 * Llama al endpoint:
 * POST /marca
 *
 * El backend espera este JSON:
 *
 * {
 *   "nombreMarca": "Toyota"
 * }
 */
export const agregarMarca = async (nuevaMarca) => {
  try {
    const respuesta = await api.post("/marca", nuevaMarca);
    return respuesta.data;
  } catch (error) {
    console.error("Error al agregar la marca:", error);
    throw error;
  }
};

/*
 * =====================================================================================================================
 * PUT: actualizarMarca
 * =====================================================================================================================
 *
 * Llama al endpoint:
 * PUT /marca
 *
 * Tu backend NO actualiza usando PUT /marca/{id}.
 * Tu backend espera el idMarca dentro del body.
 *
 * El backend espera este JSON:
 *
 * {
 *   "idMarca": 1,
 *   "nombreMarca": "Toyota"
 * }
 */
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

/*
 * =====================================================================================================================
 * DELETE: eliminarMarca
 * =====================================================================================================================
 *
 * Llama al endpoint:
 * DELETE /marca/{idMarca}
 */
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