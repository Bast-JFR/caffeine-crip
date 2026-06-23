package com.example.vehiculo.models.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ActualizarVehiculo {
    
    @NotBlank
    private String patente;

    @NotBlank
    private String modelo;

    @NotBlank
    private int id_marca;

}
