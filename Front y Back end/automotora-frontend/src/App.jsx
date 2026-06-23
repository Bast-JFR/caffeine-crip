/*
 * =====================================================================================================================
 * COMPONENTE RAÍZ: App
 * =====================================================================================================================
 *
 * App.jsx define la navegación principal de la aplicación.
 *
 * Rutas:
 * /                              → Inicio
 * /marcas                        → Listar marcas
 * /marcas/agregar                → Agregar marca
 * /marcas/editar/:idMarca        → Editar marca
 * /vehiculos                     → Listar vehículos
 * /vehiculos/agregar             → Agregar vehículo
 * /vehiculos/editar/:idVehiculo  → Editar vehículo
 */

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";

import MarcaListPage from "./pages/MarcaListPage";
import MarcaFormPage from "./pages/MarcaFormPage";

import VehiculoListPage from "./pages/VehiculoListPage";
import VehiculoFormPage from "./pages/VehiculoFormPage";

function App() {
  return (
    <>
      <Navbar />

      <main className="container mb-5">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/marcas" element={<MarcaListPage />} />
          <Route path="/marcas/agregar" element={<MarcaFormPage />} />
          <Route path="/marcas/editar/:idMarca" element={<MarcaFormPage />} />

          <Route path="/vehiculos" element={<VehiculoListPage />} />
          <Route path="/vehiculos/agregar" element={<VehiculoFormPage />} />
          <Route
            path="/vehiculos/editar/:idVehiculo"
            element={<VehiculoFormPage />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;