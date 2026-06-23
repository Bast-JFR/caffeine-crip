/* 
MarcaRepository.java es un archivo tipo repository, con el cual mediante la comunicacion con las Java Class, podemos
Acceder a las bases de datos de nuestro sistema, el cual convierte nuestro programa a SQL
*/
package com.example.automora.repositories;

/*
 * ========================================
 * IMPORTS PARA REPOSITORY DE SPRING DATA JPA
 * ========================================
 */
import org.springframework.data.jpa.repository.JpaRepository;  // Base para todos los repositories JPA
import org.springframework.stereotype.Repository;             // Marca como componente de Spring
import com.example.automora.models.entities.Marca;            // Entidad Marca (tabla BD)

/*
 * ========================================
 * REPOSITORY/DAO - ACCESO A BASE DE DATOS
 * ========================================
 * Interfaz que maneja TODO el CRUD automático contra tabla "marca"
 * Spring Data JPA genera el código SQL por ti
 */
@Repository                                    // Spring gestiona esta interfaz automáticamente
public interface MarcaRepository extends JpaRepository<Marca, Integer> {
    /*
     * ========================================
     * JpaRepository<Marca, Integer> EXPLICADO
     * ========================================
     * Marca  → Tipo de entidad (nuestra clase Marca)
     * Integer → Tipo de la clave primaria (id_marca es int)
     * 
     * MÉTODOS GRATIS que hereda (SIN escribir código):
     */
    
    // findAll()           → obteneTodasLasMarcas()
    // findById(id)        → obtenerMarcaPorID(id)
    // save(marca)         → agregMarca() / actualizarMarca()
    // deleteById(id)      → eliminarMarca(id)
    // count()             → total de marcas
    // existsById(id)      → ¿existe esta marca?
    
    /*
     * ========================================
     * INTERFACE VACÍA = MÁGIA DE SPRING DATA
     * ========================================
     * NO necesitas implementar métodos
     * Spring genera TODO el código SQL automáticamente
     */
}

//==================================================================================================================
//CODIGO SIN COMENTARIOS, SOLO SACAR EL COMENTARIOS GENERAL
//==================================================================================================================


/* 
package com.example.automora.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.automora.models.entities.Marca;

@Repository
public interface MarcaRepository extends JpaRepository<Marca, Integer> {
    
    
}
*/