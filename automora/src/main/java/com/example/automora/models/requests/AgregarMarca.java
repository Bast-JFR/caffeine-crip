/*
Valida Json del Post, archivo tipo DTO (Data Transfer Object), el cual sirve para la comunicación entre el proyecto
*/

package com.example.automora.models.requests;

/*
 * ========================================
 * IMPORTS PARA DTO DE PETICIÓN AGREGAR MARCA
 * ========================================
 */
import jakarta.validation.constraints.NotBlank;  // Validación: campo NO puede estar vacío
import lombok.Data;                             // Genera getters/setters/toString automáticamente

/*
 * ========================================
 * DTO (DATA TRANSFER OBJECT) - AGREGAR MARCA
 * ========================================
 * Objeto simple para recibir datos JSON del frontend en POST /marca
 * NO es una entidad de BD, solo transporta datos de entrada
 */
@Data                                    // Lombok: genera getters, setters, equals, hashCode
public class AgregarMarca {
    
    /*
     * ========================================
     * CAMPO NOMBRE_MARCA (VALIDADO - OBLIGATORIO)
     * ========================================
     */
    @NotBlank                           // VALIDACIÓN: NO puede ser null, vacío o solo espacios
    private String nombreMarca;         // Recibe el nombre de la marca del JSON
}

//==================================================================================================================
//CODIGO SIN COMENTARIOS, SOLO SACAR EL COMENTARIOS GENERAL
//==================================================================================================================

/*
package com.example.automora.models.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AgregarMarca {
    
    @NotBlank
    private String nombreMarca;
}
*/