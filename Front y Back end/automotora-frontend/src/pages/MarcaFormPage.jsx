/*
 * =====================================================================================================================
 * PÁGINA: MarcaFormPage
 * =====================================================================================================================
 *
 * Esta página permite crear y editar marcas.
 *
 * Rutas asociadas:
 * - /marcas/agregar
 * - /marcas/editar/:idMarca
 *
 * Endpoints usados:
 * - GET  /marca/{idMarca}
 * - POST /marca
 * - PUT  /marca
 *
 * Validaciones frontend:
 * - nombreMarca obligatorio.
 * - nombreMarca máximo 50 caracteres.
 *
 * El backend espera:
 *
 * Crear marca:
 * {
 *   "nombreMarca": "Toyota"
 * }
 *
 * Actualizar marca:
 * {
 *   "idMarca": 1,
 *   "nombreMarca": "Toyota"
 * }
 */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  agregarMarca,
  actualizarMarca,
  obtenerMarcaPorId
} from "../services/marcaService";

function MarcaFormPage() {
  /*
   * ===================================================================================================================
   * HOOKS DE ROUTER
   * ===================================================================================================================
   *
   * useNavigate permite redirigir desde código.
   * useParams permite leer el idMarca desde la URL.
   */
  const navigate = useNavigate();
  const { idMarca } = useParams();

  /*
   * ===================================================================================================================
   * CONSTANTES DE VALIDACIÓN
   * ===================================================================================================================
   *
   * Centralizamos aquí los límites para no escribir números mágicos en el JSX.
   */
  const MAX_NOMBRE_MARCA = 50;

  /*
   * ===================================================================================================================
   * MODO DEL FORMULARIO
   * ===================================================================================================================
   *
   * Si existe idMarca, estamos editando.
   * Si no existe, estamos agregando.
   */
  const modoEdicion = Boolean(idMarca);

  /*
   * ===================================================================================================================
   * ESTADOS
   * ===================================================================================================================
   *
   * nombreMarca:
   * - Guarda el valor del input.
   *
   * cargando:
   * - Se usa cuando estamos cargando una marca para editar.
   *
   * guardando:
   * - Se usa cuando estamos enviando datos al backend.
   *
   * error:
   * - Guarda mensajes de error para mostrar al usuario.
   */
  const [nombreMarca, setNombreMarca] = useState("");
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  /*
   * ===================================================================================================================
   * FUNCIÓN: cargarMarca
   * ===================================================================================================================
   *
   * Se usa solamente en modo edición.
   *
   * Si el usuario entra a:
   * /marcas/editar/3
   *
   * Esta función llama a:
   * GET /marca/3
   */
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

  /*
   * ===================================================================================================================
   * useEffect
   * ===================================================================================================================
   *
   * Si estamos editando, cargamos la marca desde el backend.
   *
   * Si estamos agregando, no se carga nada y el formulario queda vacío.
   */
  useEffect(() => {
    if (modoEdicion) {
      cargarMarca();
    }
  }, [modoEdicion, idMarca]);

  /*
   * ===================================================================================================================
   * FUNCIÓN: manejarCambioNombreMarca
   * ===================================================================================================================
   *
   * Esta función mantiene el input conectado al estado.
   *
   * Además, aunque el input ya tiene maxLength, dejamos una protección extra:
   * si por alguna razón llega un texto más largo, lo cortamos al máximo permitido.
   */
  const manejarCambioNombreMarca = (evento) => {
    const valor = evento.target.value;

    if (valor.length <= MAX_NOMBRE_MARCA) {
      setNombreMarca(valor);
    }
  };

  /*
   * ===================================================================================================================
   * FUNCIÓN: manejarEnvioFormulario
   * ===================================================================================================================
   *
   * Crea o actualiza la marca según el modo.
   */
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
        /*
         * Actualizar marca:
         *
         * PUT /marca
         *
         * JSON enviado:
         * {
         *   "idMarca": 1,
         *   "nombreMarca": "Toyota"
         * }
         */
        await actualizarMarca({
          idMarca: parseInt(idMarca),
          nombreMarca: nombreLimpio
        });
      } else {
        /*
         * Crear marca:
         *
         * POST /marca
         *
         * JSON enviado:
         * {
         *   "nombreMarca": "Toyota"
         * }
         */
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

  /*
   * ===================================================================================================================
   * FUNCIÓN: cancelar
   * ===================================================================================================================
   *
   * Vuelve al listado de marcas sin guardar cambios.
   */
  const cancelar = () => {
    navigate("/marcas");
  };

  /*
   * ===================================================================================================================
   * RETORNO EN ESTADO DE CARGA
   * ===================================================================================================================
   */
  if (cargando) {
    return (
      <div className="alert alert-info">
        Cargando información de la marca...
      </div>
    );
  }

  /*
   * ===================================================================================================================
   * RETORNO PRINCIPAL
   * ===================================================================================================================
   */
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
        {error !== "" && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

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