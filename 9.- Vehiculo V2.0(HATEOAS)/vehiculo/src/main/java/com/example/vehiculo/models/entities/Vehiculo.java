package com.example.vehiculo.models.entities;

import org.springframework.hateoas.RepresentationModel;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Data
@Table(name = "vehiculo")
public class Vehiculo extends RepresentationModel<Vehiculo> {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id_vehiculo;

    @Column(nullable = false)
    private String patente;

    @Column(nullable = false)
    private String modelo;

    @Column(nullable = false)
    private int id_marca;
}
