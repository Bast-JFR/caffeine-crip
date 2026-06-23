/*
 * =====================================================================================================================
 * SERVICIO FRONTEND: vehiculoService
 * =====================================================================================================================
 *
 * Este archivo centraliza todas las llamadas HTTP relacionadas con Vehiculo.
 *
 * Es parecido a VehiculoService.java en Spring Boot, pero aquí solamente llamamos a los endpoints REST.
 *
 * Endpoints backend:
 *
 * GET     http://localhost:7070/vehiculo
 * GET     http://localhost:7070/vehiculo/{idVehiculo}
 * POST    http://localhost:7070/vehiculo
 * PUT     http://localhost:7070/vehiculo
 * DELETE  http://localhost:7070/vehiculo/{idVehiculo}
 */

import api from "./axiosConfig";

/*
 * =====================================================================================================================
 * GET: obtenerTodosLosVehiculos
 * =====================================================================================================================
 *
 * Llama al endpoint:
 * GET /vehiculo
 *
 * Devuelve una lista de vehículos.
 */
export const obtenerTodosLosVehiculos = async () => {
  try {
    const respuesta = await api.get("/vehiculo");
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener todos los vehículos:", error);
    throw error;
  }
};

/*
 * =====================================================================================================================
 * GET: obtenerVehiculoPorId
 * =====================================================================================================================
 *
 * Llama al endpoint:
 * GET /vehiculo/{idVehiculo}
 */
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

/*
 * =====================================================================================================================
 * POST: agregarVehiculo
 * =====================================================================================================================
 *
 * Llama al endpoint:
 * POST /vehiculo
 *
 * El backend espera este JSON:
 *
 * {
 *   "patente": "ABCD12",
 *   "modelo": "Corolla",
 *   "idMarca": 1
 * }
 */
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

/*
 * =====================================================================================================================
 * PUT: actualizarVehiculo
 * =====================================================================================================================
 *
 * Llama al endpoint:
 * PUT /vehiculo
 *
 * Tu backend NO actualiza usando PUT /vehiculo/{id}.
 * Tu backend espera el idVehiculo dentro del body.
 *
 * El backend espera este JSON:
 *
 * {
 *   "idVehiculo": 1,
 *   "patente": "ABCD12",
 *   "modelo": "Corolla",
 *   "idMarca": 1
 * }
 */
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

/*
 * =====================================================================================================================
 * DELETE: eliminarVehiculo
 * =====================================================================================================================
 *
 * Llama al endpoint:
 * DELETE /vehiculo/{idVehiculo}
 */
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