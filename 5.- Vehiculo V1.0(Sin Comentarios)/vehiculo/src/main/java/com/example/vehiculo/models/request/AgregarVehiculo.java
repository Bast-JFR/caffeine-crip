package com.example.vehiculo.models.request;

import jakarta.persistence.Column;
import lombok.Data;

@Data
public class AgregarVehiculo {
    
    @Column(nullable = false)
    private String patente;

    @Column(nullable = false)
    private String modelo;

    @Column(nullable = false)
    private int id_marca;
}
