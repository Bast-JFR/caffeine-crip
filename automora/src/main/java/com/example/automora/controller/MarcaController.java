/*
MarcaController.java es un archivo que funciona como APIRest, es decir recibe las peticiones HTTP.
Cada @XxXMapping, es un endpoint, ya que realiza una función en especiFico, en este caso tenemos 5 endpoint, lo cual forma
nuestra API.
*/

package com.example.automora.controller;

/*
 * ========================================
 * IMPORTS BÁSICOS DE SPRING WEB
 * ========================================
 */
import java.util.List;                             // Para listas de marcas

/*
 * IMPORTS PARA INYECCIÓN DE DEPENDENCIAS Y ANOTACIONES WEB
 */
import org.springframework.beans.factory.annotation.Autowired;  // Inyecta servicios automáticamente
import org.springframework.web.bind.annotation.RequestMapping; // Define ruta base del controlador
import org.springframework.web.bind.annotation.RestController; // Controlador REST que devuelve JSON

/*
 * IMPORTS DE MODELOS Y SERVICIOS
 */
import com.example.automora.models.entities.Marca;           // Entidad Marca (tabla BD)
import com.example.automora.models.requests.ActualizarMarca; // DTO para actualizar marca
import com.example.automora.models.requests.AgregarMarca;    // DTO para crear nueva marca
import com.example.automora.services.MarcaService;          // Lógica de negocio de marcas

/*
 * IMPORTS DE ANOTACIONES HTTP (CRUD)
 */
import org.springframework.web.bind.annotation.DeleteMapping; // DELETE HTTP
import org.springframework.web.bind.annotation.GetMapping;    // GET HTTP
import org.springframework.web.bind.annotation.PathVariable; // Parámetros en URL
import org.springframework.web.bind.annotation.RequestBody;  // Datos JSON del body
import org.springframework.web.bind.annotation.PutMapping;   // PUT HTTP
import org.springframework.web.bind.annotation.PostMapping;  // POST HTTP

/*
 * ========================================
 * CONTROLADOR REST MARCAS (API ENDPOINTS)
 * ========================================
 * Maneja peticiones HTTP a /marca/* y devuelve JSON
 */
@RequestMapping("marca")                           // Todas las rutas empiezan con /marca
@RestController                                    // Es un controlador REST (devuelve JSON directo)
public class MarcaController {
    
    /*
     * ========================================
     * INYECCIÓN DE SERVICIO (DEPENDENCY INJECTION)
     * ========================================
     */
    @Autowired                                       // Spring inyecta automáticamente MarcaService
    private MarcaService marcaService;              // Servicio que contiene la lógica de negocio

    /*
     * ========================================
     * GET - OBTENER TODAS LAS MARCAS
     * ========================================
     * URL: GET /marca
     * Devuelve: Lista JSON de todas las marcas
     */
    @GetMapping("")                                 // Ruta vacía después de /marca
    public List<Marca> obteneTodasLasMarcas(){      // Método público que retorna List<Marca>
        return marcaService.obteneTodasLasMarcas(); // Llama al servicio y devuelve resultado
    }

    /*
     * ========================================
     * GET - OBTENER MARCA POR ID
     * ========================================
     * URL: GET /marca/5 (devuelve marca con id=5)
     */
    @GetMapping("/{idMarca}")                       // {idMarca} es parámetro de la URL
    public Marca obtenerMarcaPorId(@PathVariable int idMarca) { // Recibe el ID de la URL
        return marcaService.obtenerMarcaPorID(idMarca); // Busca en BD y devuelve Marca
    }
    
    /*
     * ========================================
     * POST - CREAR NUEVA MARCA
     * ========================================
     * URL: POST /marca
     * Body: {"nombre_marca": "Tesla"}
     */
    @PostMapping("")                                // POST a /marca (ruta vacía)
    public Marca agregarMarca(@RequestBody AgregarMarca nuevaMarca) { // JSON → Objeto
        return marcaService.agregMarca(nuevaMarca); // Guarda en BD y devuelve nueva Marca
    }
   
    /*
     * ========================================
     * PUT - ACTUALIZAR MARCA
     * ========================================
     * URL: PUT /marca
     * Body: {"id_marca": 5, "nombre_marca": "Tesla Motors"}
     */
    @PutMapping("")                                 // PUT a /marca (actualizar)
    public Marca actualizarMarca(@RequestBody ActualizarMarca actualizar){ // JSON → DTO
        return marcaService.actualizarMarca(actualizar); // Actualiza en BD
    }

    /*
     * ========================================
     * DELETE - ELIMINAR MARCA
     * ========================================
     * URL: DELETE /marca/5 (elimina marca con id=5)
     */
    @DeleteMapping("/{idMarca}")                    // {idMarca} de la URL
    public String eliminarMarca(@PathVariable int idMarca){ // Recibe ID de URL
        return marcaService.eliminarMarca(idMarca); // Elimina de BD, devuelve mensaje
    }
}

//==================================================================================================================
//CODIGO SIN COMENTARIOS, SOLO SACAR EL COMENTARIOS GENERAL
//==================================================================================================================

/*
package com.example.automora.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.automora.models.entities.Marca;
import com.example.automora.models.requests.ActualizarMarca;
import com.example.automora.models.requests.AgregarMarca;
import com.example.automora.services.MarcaService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PostMapping;

@RequestMapping("marca") 
@RestController
public class MarcaController {
    
    @Autowired
    private MarcaService marcaService;

    @GetMapping("")
    public List<Marca> obteneTodasLasMarcas(){
        return marcaService.obteneTodasLasMarcas();
    }

    @GetMapping("/{idMarca}")
    public Marca obtenerMarcaPorId(@PathVariable int idMarca) {
        return marcaService.obtenerMarcaPorID(idMarca);
    }
    
    @PostMapping("")
    public Marca agregarMarca(@RequestBody AgregarMarca nuevaMarca) {
        return marcaService.agregMarca(nuevaMarca);
    }
   
    @PutMapping("")
    public Marca actualizarMarca (@RequestBody ActualizarMarca actualizar){
        return marcaService.actualizarMarca(actualizar);
    }

    @DeleteMapping("/{idMarca}")
        public String eliminarMarca(@PathVariable int idMarca){
        return marcaService.eliminarMarca(idMarca);
        }

}
*/
    

