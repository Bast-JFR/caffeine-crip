package com.example.vehiculo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.example.vehiculo.models.entities.Vehiculo;

@Repository
public interface VehiculoRepository extends JpaRepository<Vehiculo,Integer> {

    
  
}
