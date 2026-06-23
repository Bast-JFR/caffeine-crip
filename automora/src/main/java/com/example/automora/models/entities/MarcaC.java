package com.example.automora.models.entities;

/*
 * ========================================
 * IMPORTS DE JPA Y LOMBOK PARA ENTIDAD MARCA
 * ========================================
 * Librerías para convertir esta clase en tabla de base de datos
 */
import jakarta.persistence.Column;      // Define columnas específicas de la tabla
import jakarta.persistence.Entity;     // Marca clase como tabla en la BD
import jakarta.persistence.GeneratedValue; // Genera IDs automáticos
import jakarta.persistence.GenerationType; // Tipo de generación de IDs
import jakarta.persistence.Id;         // Define clave primaria
import jakarta.persistence.Table;      // Nombre exacto de la tabla
import lombok.Data;                    // Genera getters/setters/toString automáticamente

/*
 * ========================================
 * ENTIDAD MARCA (TABLA EN BASE DE DATOS)
 * ========================================
 * Esta clase se convierte en tabla "marca" que contiene Toyota, Ford, etc.
 */
@Entity                           // Convierte clase en tabla de MySQL
@Data                            // Lombok: getters, setters, equals, hashCode automáticos
@Table(name = "marca")           // Nombre exacto de la tabla: "marca"
public class MarcaC {


    /*
     * ========================================
     * CLAVE PRIMARIA (ID AUTOMÁTICO)
     * ========================================
     */
    @Id                           // Esta es la PRIMARY KEY de la tabla marca
    @GeneratedValue(strategy = GenerationType.IDENTITY) // MySQL genera: 1,2,3...
    private int id_marca;         // ID único para cada marca (Toyota=1, Ford=2, etc.)

    /*
     * ========================================
     * COLUMNA NOMBRE_MARCA (OBLIGATORIA)
     * ========================================
     */
    @Column(nullable = false)     // NO puede estar vacío en la base de datos
    private String nombre_marca;  // Nombre de la marca (ej: "Toyota", "Ford", "Kia")
}
