/*
 * =====================================================================================================================
 * PÁGINA: VehiculoListPage
 * =====================================================================================================================
 *
 * Esta página administra el listado de vehículos.
 *
 * Funcionalidades:
 * - Listar vehículos.
 * - Filtrar por ID.
 * - Filtrar por patente.
 * - Filtrar por modelo.
 * - Filtrar por marca.
 * - Eliminar vehículos.
 * - Navegar a agregar vehículo.
 * - Navegar a editar vehículo.
 *
 * Restricciones frontend en filtros:
 * - filtroId: máximo 10 caracteres.
 * - filtroPatente: máximo 10 caracteres.
 * - filtroModelo: máximo 50 caracteres.
 * - filtroMarca: máximo 50 caracteres.
 */

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import VehiculoTable from "../components/VehiculoTable";

import {
  obtenerTodosLosVehiculos,
  eliminarVehiculo
} from "../services/vehiculoService";

function VehiculoListPage() {
  const navigate = useNavigate();

  /*
   * ===================================================================================================================
   * CONSTANTES DE VALIDACIÓN PARA FILTROS
   * ===================================================================================================================
   */
  const MAX_FILTRO_ID = 10;
  const MAX_FILTRO_PATENTE = 10;
  const MAX_FILTRO_MODELO = 50;
  const MAX_FILTRO_MARCA = 50;

  /*
   * ===================================================================================================================
   * ESTADOS DE LA PÁGINA
   * ===================================================================================================================
   */
  const [vehiculos, setVehiculos] = useState([]);
  const [filtroId, setFiltroId] = useState("");
  const [filtroPatente, setFiltroPatente] = useState("");
  const [filtroModelo, setFiltroModelo] = useState("");
  const [filtroMarca, setFiltroMarca] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");

  /*
   * ===================================================================================================================
   * FUNCIÓN: cargarVehiculos
   * ===================================================================================================================
   */
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

  /*
   * ===================================================================================================================
   * useEffect: CARGA INICIAL
   * ===================================================================================================================
   */
  useEffect(() => {
    cargarVehiculos();
  }, []);

  /*
   * ===================================================================================================================
   * FUNCIÓN: manejarCambioFiltroId
   * ===================================================================================================================
   *
   * Permitimos solo dígitos y limitamos a 10 caracteres.
   */
  const manejarCambioFiltroId = (evento) => {
    const valor = evento.target.value;
    const soloNumeros = valor.replace(/\D/g, "");

    if (soloNumeros.length <= MAX_FILTRO_ID) {
      setFiltroId(soloNumeros);
    }
  };

  /*
   * ===================================================================================================================
   * FUNCIÓN: manejarCambioFiltroPatente
   * ===================================================================================================================
   *
   * Limita patente a 10 caracteres.
   */
  const manejarCambioFiltroPatente = (evento) => {
    const valor = evento.target.value;

    if (valor.length <= MAX_FILTRO_PATENTE) {
      setFiltroPatente(valor);
    }
  };

  /*
   * ===================================================================================================================
   * FUNCIÓN: manejarCambioFiltroModelo
   * ===================================================================================================================
   *
   * Limita modelo a 50 caracteres.
   */
  const manejarCambioFiltroModelo = (evento) => {
    const valor = evento.target.value;

    if (valor.length <= MAX_FILTRO_MODELO) {
      setFiltroModelo(valor);
    }
  };

  /*
   * ===================================================================================================================
   * FUNCIÓN: manejarCambioFiltroMarca
   * ===================================================================================================================
   *
   * Limita marca a 50 caracteres.
   */
  const manejarCambioFiltroMarca = (evento) => {
    const valor = evento.target.value;

    if (valor.length <= MAX_FILTRO_MARCA) {
      setFiltroMarca(valor);
    }
  };

  /*
   * ===================================================================================================================
   * FILTROS DE VEHÍCULOS
   * ===================================================================================================================
   */
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

  /*
   * ===================================================================================================================
   * NAVEGACIÓN
   * ===================================================================================================================
   */
  const manejarAgregarVehiculo = () => {
    navigate("/vehiculos/agregar");
  };

  const manejarEditarVehiculo = (idVehiculo) => {
    navigate(`/vehiculos/editar/${idVehiculo}`);
  };

  /*
   * ===================================================================================================================
   * ELIMINAR VEHÍCULO
   * ===================================================================================================================
   */
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

  /*
   * ===================================================================================================================
   * FUNCIÓN: limpiarFiltros
   * ===================================================================================================================
   */
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
        {mensaje !== "" && (
          <div className="alert alert-success">
            {mensaje}
          </div>
        )}

        {error !== "" && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

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