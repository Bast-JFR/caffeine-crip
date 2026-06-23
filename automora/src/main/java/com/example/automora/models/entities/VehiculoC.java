package com.example.automora.models.entities;

/*
 * ========================================
 * IMPORTS DE JPA (JAKARTA PERSISTENCE API)
 * ========================================
 * Estas librerías permiten mapear clases Java a tablas de base de datos
 */
import jakarta.persistence.Column;      // Define columnas en la tabla
import jakarta.persistence.Entity;     // Marca clase como entidad (tabla en BD)
import jakarta.persistence.GeneratedValue; // Genera valores automáticos (IDs)
import jakarta.persistence.GenerationType; // Estrategias para generar IDs
import jakarta.persistence.Id;         // Define clave primaria de la tabla
import jakarta.persistence.JoinColumn; // Define columnas de relación FK
import jakarta.persistence.ManyToOne;  // Relación muchos-a-uno con otra tabla
import jakarta.persistence.Table;      // Especifica nombre de la tabla en BD
import lombok.Data;                    // Genera getters/setters automáticamente

/*
 * ========================================
 * ENTIDAD VEHÍCULO (TABLA EN BASE DE DATOS)
 * ========================================
 */
@Entity                           // Esta clase se convierte en tabla "vehiculo"
@Data                            // Lombok: genera automáticamente getters, setters, toString, equals, hashCode
@Table(name = "vehiculo")        // Nombre exacto de la tabla en MySQL
public class VehiculoC {

    /*
     * ========================================
     * CLAVE PRIMARIA (ID AUTOMÁTICO)
     * ========================================
     */
    @Id                           // Esta es la clave primaria de la tabla
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto-incremental (1,2,3...)
    private int id_vehiculo;      // ID único para cada vehículo (MySQL lo genera)

    /*
     * ========================================
     * COLUMNA PATENTE (OBLIGATORIA)
     * ========================================
     */
    @Column(nullable = false)     // NO puede ser NULL en la base de datos
    private String patente;       // Placa/patente del vehículo (ej: "ABCD12")

    /*
     * ========================================
     * COLUMNA AÑO (OBLIGATORIO)
     * ========================================
     */
    @Column(nullable = false)     // NO puede ser NULL
    private int anio;             // Año de fabricación (ej: 2023)

    /*
     * ========================================
     * COLUMNA COLOR (OPCIONAL)
     * ========================================
     */
    @Column(nullable = true)      // SÍ puede ser NULL (vacío)
    private String color;         // Color del vehículo (ej: "Rojo")

    /*
     * ========================================
     * COLUMNA MODELO (OPCIONAL)
     * ========================================
     */
    @Column(nullable = true)      // SÍ puede ser NULL
    private String modelo;        // Modelo del vehículo (ej: "Corolla")

    /*
     * ========================================
     * RELACIÓN CON TABLA MARCA (OBLIGATORIA)
     * ========================================
     */
    @ManyToOne                  // Muchos vehículos tienen UNA marca (Toyota, Ford...)
    @JoinColumn(name = "id_marca", nullable = false) // Columna FK en esta tabla
    private Marca marca;        // Objeto Marca relacionado (viene de otra clase/entidad)
}
