/*
 * =====================================================================================================================
 * PÁGINA: HomePage
 * =====================================================================================================================
 *
 * Esta es la página inicial del sistema Automora.
 *
 * En React Router, una página es un componente que se muestra cuando el usuario entra a una ruta específica.
 *
 * Ruta asociada:
 * /
 */

function HomePage() {
  return (
    <div className="card">
      <div className="card-body">
        <h1 className="card-title">Sistema Automora</h1>

        <p className="card-text">
          Frontend desarrollado con React y conectado a un backend Spring Boot.
        </p>

        <p className="card-text">
          Desde esta aplicación podrás administrar marcas y vehículos mediante operaciones CRUD completas.
        </p>

        <div className="alert alert-info mb-0">
          Backend esperado: <strong>http://localhost:7070</strong>
          <br />
          Frontend Vite: <strong>http://localhost:5173</strong>
        </div>
      </div>
    </div>
  );
}

export default HomePage;