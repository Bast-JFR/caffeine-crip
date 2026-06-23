/*
Valida JSON del PUT, archivo tipo DTO (Data Transfer Object), el cual sirve para la comunicación entre el proyecto
*/

package com.example.automora.models.requests;

/*
 * ========================================
 * IMPORTS PARA DTO DE ACTUALIZAR MARCA
 * ========================================
 */
import jakarta.validation.constraints.NotBlank;  // Validación: campo NO puede estar vacío
import lombok.Data;                             // Genera getters/setters/toString automáticamente

/*
 * ========================================
 * DTO (DATA TRANSFER OBJECT) - ACTUALIZAR MARCA
 * ========================================
 * Objeto para recibir datos JSON del frontend en PUT /marca
 * Transporta ID + nuevo nombre para actualizar en base de datos
 */
@Data                                    // Lombok: genera getters, setters, equals, hashCode
public class ActualizarMarca {

    /*
     * ========================================
     * CAMPO ID_MARCA 
     * ========================================
     */
    @NotBlank                           
    private int idMarca;                // ID de la marca a actualizar (ej: 5)

    /*
     * ========================================
     * CAMPO NOMBRE_MARCA (CORRECTO)
     * ========================================
     */
    @NotBlank                           // ✅ CORRECTO: NO puede ser null/vacío/espacios
    private String nombreMarca;         // Nuevo nombre para actualizar (ej: "Toyota Motors")
}

//==================================================================================================================
//CODIGO SIN COMENTARIOS, SOLO SACAR EL COMENTARIOS GENERAL
//==================================================================================================================


/* 
package com.example.automora.models.requests;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ActualizarMarca {

    @NotBlank
    private int idMarca;

    @NotBlank
    private String nombreMarca;
}
*/