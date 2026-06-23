/*
 * =====================================================================================================================
 * COMPONENTE: MarcaTable
 * =====================================================================================================================
 *
 * Este componente muestra una tabla de marcas usando Bootstrap.
 *
 * Responsabilidad del componente:
 * - Recibir una lista de marcas.
 * - Mostrar cada marca en una fila.
 * - Mostrar botones de editar y eliminar.
 *
 * Este componente NO llama directamente al backend.
 *
 * Las acciones de editar y eliminar se reciben desde el componente padre mediante props:
 * - onEditar
 * - onEliminar
 *
 * De esta forma mantenemos separación de responsabilidades:
 *
 * MarcaListPage.jsx  → carga datos, filtra, elimina y navega.
 * MarcaTable.jsx     → solo muestra la tabla.
 */

function MarcaTable({ marcas, onEditar, onEliminar }) {
  /*
   * ===================================================================================================================
   * VALIDACIÓN VISUAL
   * ===================================================================================================================
   *
   * Si no hay marcas para mostrar, devolvemos un mensaje informativo.
   *
   * Array.isArray(marcas):
   * - Verifica que marcas realmente sea una lista.
   *
   * marcas.length === 0:
   * - Verifica que la lista esté vacía.
   */
  if (!Array.isArray(marcas) || marcas.length === 0) {
    return (
      <div className="alert alert-warning mb-0">
        No hay marcas para mostrar.
      </div>
    );
  }

  /*
   * ===================================================================================================================
   * RETORNO DEL COMPONENTE
   * ===================================================================================================================
   *
   * Recorremos la lista de marcas con map().
   *
   * Cada fila debe tener una propiedad key única.
   * En este caso usamos marca.idMarca porque viene desde la entidad Marca del backend.
   */
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