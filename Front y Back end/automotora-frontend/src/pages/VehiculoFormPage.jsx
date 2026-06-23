/*
 * =====================================================================================================================
 * PÁGINA: VehiculoFormPage
 * =====================================================================================================================
 *
 * Esta página permite crear y editar vehículos.
 *
 * Rutas asociadas:
 * - /vehiculos/agregar
 * - /vehiculos/editar/:idVehiculo
 *
 * Endpoints usados:
 * - GET  /marca                  → cargar marcas para el select
 * - GET  /vehiculo/{idVehiculo}  → cargar vehículo para edición
 * - POST /vehiculo               → crear vehículo
 * - PUT  /vehiculo               → actualizar vehículo
 *
 * Validaciones frontend:
 * - patente obligatoria.
 * - patente máximo 10 caracteres.
 * - modelo obligatorio.
 * - modelo máximo 50 caracteres.
 * - idMarca obligatorio.
 *
 * El backend espera:
 *
 * Crear vehículo:
 * {
 *   "patente": "ABCD12",
 *   "modelo": "Corolla",
 *   "idMarca": 1
 * }
 *
 * Actualizar vehículo:
 * {
 *   "idVehiculo": 1,
 *   "patente": "ABCD12",
 *   "modelo": "Corolla",
 *   "idMarca": 1
 * }
 */

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { obtenerTodasLasMarcas } from "../services/marcaService";

import {
  agregarVehiculo,
  actualizarVehiculo,
  obtenerVehiculoPorId
} from "../services/vehiculoService";

function VehiculoFormPage() {
  /*
   * ===================================================================================================================
   * HOOKS DE REACT ROUTER
   * ===================================================================================================================
   *
   * useNavigate:
   * - Permite redirigir al usuario desde código JavaScript.
   *
   * useParams:
   * - Permite leer el idVehiculo desde la URL.
   */
  const navigate = useNavigate();
  const { idVehiculo } = useParams();

  /*
   * ===================================================================================================================
   * CONSTANTES DE VALIDACIÓN
   * ===================================================================================================================
   *
   * Centralizamos aquí los límites máximos de caracteres.
   */
  const MAX_PATENTE = 10;
  const MAX_MODELO = 50;

  /*
   * ===================================================================================================================
   * MODO DEL FORMULARIO
   * ===================================================================================================================
   *
   * Si existe idVehiculo, estamos editando.
   * Si no existe, estamos creando.
   */
  const modoEdicion = Boolean(idVehiculo);

  /*
   * ===================================================================================================================
   * ESTADOS DEL FORMULARIO
   * ===================================================================================================================
   *
   * vehiculo:
   * - Guarda los datos del formulario.
   *
   * marcas:
   * - Guarda la lista de marcas para llenar el select.
   *
   * cargando:
   * - Indica si estamos cargando datos iniciales.
   *
   * guardando:
   * - Indica si estamos enviando datos al backend.
   *
   * error:
   * - Guarda mensajes de error.
   */
  const [vehiculo, setVehiculo] = useState({
    patente: "",
    modelo: "",
    idMarca: ""
  });

  const [marcas, setMarcas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");

  /*
   * ===================================================================================================================
   * FUNCIÓN: cargarDatosIniciales
   * ===================================================================================================================
   *
   * Esta función carga:
   * 1. Las marcas para el select.
   * 2. El vehículo existente si estamos en modo edición.
   */
  const cargarDatosIniciales = async () => {
    try {
      setCargando(true);
      setError("");

      /*
       * Primero cargamos las marcas.
       *
       * Esto es necesario tanto para crear como para editar,
       * porque el usuario debe seleccionar una marca.
       */
      const datosMarcas = await obtenerTodasLasMarcas();

      if (Array.isArray(datosMarcas)) {
        setMarcas(datosMarcas);
      } else {
        setMarcas([]);
        setError("El backend no devolvió una lista válida de marcas.");
        return;
      }

      /*
       * Si estamos editando, cargamos el vehículo.
       */
      if (modoEdicion) {
        const idVehiculoNumerico = parseInt(idVehiculo);

        if (Number.isNaN(idVehiculoNumerico) || idVehiculoNumerico <= 0) {
          setError("El ID del vehículo no es válido.");
          return;
        }

        const vehiculoEncontrado = await obtenerVehiculoPorId(
          idVehiculoNumerico
        );

        /*
         * El backend devuelve el vehículo con una marca anidada:
         *
         * {
         *   idVehiculo: 1,
         *   patente: "ABCD12",
         *   modelo: "Corolla",
         *   marca: {
         *     idMarca: 3,
         *     nombreMarca: "Toyota"
         *   }
         * }
         *
         * Para el formulario necesitamos guardar:
         * - patente
         * - modelo
         * - idMarca
         */
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

  /*
   * ===================================================================================================================
   * useEffect: CARGA INICIAL
   * ===================================================================================================================
   *
   * Cuando el usuario entra al formulario:
   * - Cargamos marcas.
   * - Si está editando, también cargamos el vehículo.
   */
  useEffect(() => {
    cargarDatosIniciales();
  }, [modoEdicion, idVehiculo]);

  /*
   * ===================================================================================================================
   * FUNCIÓN: manejarCambioFormulario
   * ===================================================================================================================
   *
   * Esta función permite manejar todos los inputs con una sola función.
   *
   * Para que funcione, cada input debe tener un atributo name:
   * - name="patente"
   * - name="modelo"
   * - name="idMarca"
   *
   * Además aplicamos límites de caracteres desde el estado como segunda protección.
   */
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

  /*
   * ===================================================================================================================
   * FUNCIÓN: validarFormulario
   * ===================================================================================================================
   *
   * Valida en frontend antes de enviar al backend.
   *
   * El backend también valida, pero React valida primero para mejorar la experiencia del usuario.
   */
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

  /*
   * ===================================================================================================================
   * FUNCIÓN: manejarEnvioFormulario
   * ===================================================================================================================
   *
   * Esta función se ejecuta cuando el usuario envía el formulario.
   *
   * Flujo:
   * 1. Evita recarga de página con preventDefault().
   * 2. Valida patente, modelo e idMarca.
   * 3. Si estamos creando, llama a POST /vehiculo.
   * 4. Si estamos editando, llama a PUT /vehiculo.
   * 5. Redirige a /vehiculos.
   */
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
        /*
         * Actualizar vehículo:
         *
         * PUT /vehiculo
         *
         * JSON enviado:
         * {
         *   "idVehiculo": 1,
         *   "patente": "ABCD12",
         *   "modelo": "Corolla",
         *   "idMarca": 1
         * }
         */
        await actualizarVehiculo({
          idVehiculo: parseInt(idVehiculo),
          ...datosVehiculo
        });
      } else {
        /*
         * Crear vehículo:
         *
         * POST /vehiculo
         *
         * JSON enviado:
         * {
         *   "patente": "ABCD12",
         *   "modelo": "Corolla",
         *   "idMarca": 1
         * }
         */
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

  /*
   * ===================================================================================================================
   * FUNCIÓN: manejarCancelar
   * ===================================================================================================================
   *
   * Vuelve al listado de vehículos sin guardar cambios.
   */
  const manejarCancelar = () => {
    navigate("/vehiculos");
  };

  /*
   * ===================================================================================================================
   * RETORNO CON ESTADO DE CARGA
   * ===================================================================================================================
   */
  if (cargando) {
    return (
      <div className="alert alert-info">
        Cargando información del formulario...
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
          {modoEdicion ? "Editar vehículo" : "Agregar vehículo"}
        </h2>

        <small className="text-muted">
          {modoEdicion
            ? "Modifica los datos del vehículo seleccionado."
            : "Registra un nuevo vehículo en el sistema."}
        </small>
      </div>

      <div className="card-body">
        {error !== "" && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

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