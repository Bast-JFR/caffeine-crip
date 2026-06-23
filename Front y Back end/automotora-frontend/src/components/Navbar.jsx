/*
 * =====================================================================================================================
 * COMPONENTE: Navbar
 * =====================================================================================================================
 *
 * Menú superior de navegación de la aplicación.
 */

import { NavLink } from "react-router-dom";

function Navbar() {
  const obtenerClaseNavLink = ({ isActive }) => {
    return isActive ? "nav-link active fw-bold" : "nav-link";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          Automora
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarAutomora"
          aria-controls="navbarAutomora"
          aria-expanded="false"
          aria-label="Mostrar navegación"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarAutomora">
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