/*
MarcaService.java es un archivo que contiene los metodos principales de acciones, es decir la logica del negocio,
y los ejecuta segun la llamada del MarcaController
*/

package com.example.automora.services;

/*
 * ========================================
 * IMPORTS PARA SERVICIO DE MARCAS
 * ========================================
 */
import java.util.List;                                    // Para listas de marcas

/*
 * IMPORTS DE SPRING FRAMEWORK
 */
import org.springframework.beans.factory.annotation.Autowired;  // Inyección de dependencias
import org.springframework.http.HttpStatus;                  // Códigos de estado HTTP
import org.springframework.stereotype.Service;               // Marca como servicio de Spring
import org.springframework.web.server.ResponseStatusException; // Excepciones HTTP personalizadas

/*
 * IMPORTS DE MODELOS Y REPOSITORY
 */
import com.example.automora.models.entities.Marca;           // Entidad Marca (tabla BD)
import com.example.automora.models.requests.ActualizarMarca; // DTO para actualizar
import com.example.automora.models.requests.AgregarMarca;    // DTO para crear
import com.example.automora.repositories.MarcaRepository;   // Acceso a base de datos

/*
 * ========================================
 * SERVICIO DE NEGOCIO - LÓGICA MARCAS
 * ========================================
 * Capa intermedia entre Controller y Repository
 * Contiene la lógica de negocio y validaciones
 */
@Service                                    // Spring gestiona este servicio como bean
public class MarcaService {
    
    /*
     * ========================================
     * INYECCIÓN DEL REPOSITORY
     * ========================================
     */
    @Autowired                                // Spring inyecta MarcaRepository automáticamente
    private MarcaRepository marcaRepository;  // Conexión directa con tabla "marca"

    /*
     * ========================================
     * GET ALL - OBTENER TODAS LAS MARCAS
     * ========================================
     */
    public List<Marca> obteneTodasLasMarcas(){
        return marcaRepository.findAll();    // Llama al método automático del Repository
    }

    /*
     * ========================================
     * GET BY ID - BUSCAR MARCA POR ID
     * ========================================
     */
    public Marca obtenerMarcaPorID(int idMarca){
        Marca marca = marcaRepository.findById(idMarca).orElse(null); // Busca o null
        if (marca == null){
            /* 
             * LANZA ERROR HTTP 404 si no existe
             * El Controller recibirá este error automáticamente
             */
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Marca no encontrada.");
        }
        return marca;                        // Devuelve la marca encontrada
    }

    /*
     * ========================================
     * POST - CREAR NUEVA MARCA
     * ========================================
     */
    public Marca agregMarca(AgregarMarca nuevaMarca){
        Marca marcaNueva = new Marca();      // Crea nuevo objeto Marca (entidad BD)
        marcaNueva.setNombre_marca(nuevaMarca.getNombreMarca()); // Copia nombre del DTO
        return marcaRepository.save(marcaNueva); // Guarda en BD (INSERT SQL)
    }

    /*
     * ========================================
    * DELETE - ELIMINAR MARCA
     * ========================================
     */
    public String eliminarMarca(int idMarca){
        if (marcaRepository.existsById(idMarca)) { // Verifica si existe ANTES de borrar
            marcaRepository.deleteById(idMarca);   // Borra de BD (DELETE SQL)
            return "Marca Eliminada correctamente."; // Mensaje de éxito
        }else{
            /* 
             * ERROR 404 si no existe la marca
             * Cliente recibe JSON con error
             */
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Marca no encontrada.");
        }
    }

    /*
     * ========================================
     * PUT - ACTUALIZAR MARCA
     * ========================================
     */
    public Marca actualizarMarca(ActualizarMarca actMarca){
        Marca Marca = marcaRepository.findById(actMarca.getIdMarca()).orElse(null); // Busca
        if(Marca == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Marca no encontrada.");
        }else{
            /* 
             * ACTUALIZA solo el nombre
             * save() detecta que ya existe → UPDATE SQL
             */
            Marca.setNombre_marca(actMarca.getNombreMarca());
            return marcaRepository.save(Marca); // Actualiza en BD
        }
    }
}

//==================================================================================================================
//CODIGO SIN COMENTARIOS, SOLO SACAR EL COMENTARIOS GENERAL
//==================================================================================================================


/*
package com.example.automora.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.example.automora.models.entities.Marca;
import com.example.automora.models.requests.ActualizarMarca;
import com.example.automora.models.requests.AgregarMarca;
import com.example.automora.repositories.MarcaRepository;

@Service
public class MarcaService {
    
    @Autowired
    private MarcaRepository marcaRepository;

    public List<Marca> obteneTodasLasMarcas(){
        return marcaRepository.findAll();

    }

    public Marca obtenerMarcaPorID(int idMarca){
        Marca marca = marcaRepository.findById(idMarca).orElse(null);
        if (marca == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Marca no encontrada.");
        }
        return marca;
    }

    public Marca agregMarca(AgregarMarca nuevaMarca){
        Marca marcaNueva = new Marca();
        marcaNueva.setNombre_marca(nuevaMarca.getNombreMarca());
        return marcaRepository.save(marcaNueva);
    }

    public String eliminarMarca(int idMarca){
        if (marcaRepository.existsById(idMarca)) {
            marcaRepository.deleteById(idMarca);
            return "Marca Eliminada correctamente.";
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Marca no encontrada.");
        }
    }

    public Marca actualizarMarca(ActualizarMarca actMarca){
        Marca Marca = marcaRepository.findById(actMarca.getIdMarca()).orElse(null);
        if(Marca == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Marca no encontrada.");
        }else{
            Marca.setNombre_marca(actMarca.getNombreMarca());
            return marcaRepository.save(Marca);
        }
    }

}

*/