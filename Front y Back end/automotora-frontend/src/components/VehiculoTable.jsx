/*
 * =====================================================================================================================
 * COMPONENTE: VehiculoTable
 * =====================================================================================================================
 *
 * Este componente muestra una tabla de vehículos usando Bootstrap.
 *
 * Responsabilidad del componente:
 * - Recibir una lista de vehículos.
 * - Mostrar cada vehículo en una fila.
 * - Mostrar la marca asociada al vehículo.
 * - Mostrar botones de editar y eliminar.
 *
 * Este componente NO llama directamente al backend.
 *
 * Las acciones de editar y eliminar se reciben desde el componente padre mediante props:
 * - onEditar
 * - onEliminar
 *
 * Separación de responsabilidades:
 *
 * VehiculoListPage.jsx  → carga datos, filtra, elimina y navega.
 * VehiculoTable.jsx     → solo muestra la tabla.
 */

function VehiculoTable({ vehiculos, onEditar, onEliminar }) {
  /*
   * ===================================================================================================================
   * VALIDACIÓN VISUAL
   * ===================================================================================================================
   *
   * Si no hay vehículos para mostrar, devolvemos un mensaje informativo.
   *
   * Array.isArray(vehiculos):
   * - Verifica que vehiculos realmente sea una lista.
   *
   * vehiculos.length === 0:
   * - Verifica que la lista esté vacía.
   */
  if (!Array.isArray(vehiculos) || vehiculos.length === 0) {
    return (
      <div className="alert alert-warning mb-0">
        No hay vehículos para mostrar.
      </div>
    );
  }

  /*
   * ===================================================================================================================
   * RETORNO DEL COMPONENTE
   * ===================================================================================================================
   *
   * Recorremos la lista de vehículos con map().
   *
   * Cada fila usa como key:
   * vehiculo.idVehiculo
   *
   * La marca se muestra desde:
   * vehiculo.marca.nombreMarca
   *
   * Usamos optional chaining:
   * vehiculo.marca?.nombreMarca
   *
   * Esto evita errores si por alguna razón marca viene null o undefined.
   */
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
              <td>
                {vehiculo.marca?.nombreMarca || "Sin marca"}
              </td>

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