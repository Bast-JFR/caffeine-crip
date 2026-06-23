package com.example.vehiculo.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.server.ResponseStatusException;

import com.example.vehiculo.models.dto.MarcaDTO;
import com.example.vehiculo.models.entities.Vehiculo;
import com.example.vehiculo.models.request.ActualizarVehiculo;
import com.example.vehiculo.models.request.AgregarVehiculo;
import com.example.vehiculo.repository.VehiculoRepository;

@Service
public class VehiculoService {
    
    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private WebClient marcaWebClientConfig;

    //LISTAR TODOS LOS VEHICULOS
    public List<Vehiculo> obtenerTodosLosVehiculos(){
        return vehiculoRepository.findAll();
    }

    //OBTENER VEHICULO POR ID
    public Vehiculo obtenerVehiculoPorID(int idVehiculo){
        Vehiculo vehiculo = vehiculoRepository.findById(idVehiculo).orElse(null);
        if (vehiculo == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Vehiculo no encontrado.");
        }
        return vehiculo;
    }

    //AGREGAR VEHICULO
    public Vehiculo agregarVehiculo(AgregarVehiculo nuevVehiculo){
        MarcaDTO marcadto = null;
        try {
            marcadto = marcaWebClientConfig.get()
            .uri("/marca/{id_marca}",nuevVehiculo.getId_marca())
            .retrieve()
            .bodyToMono(MarcaDTO.class)
            .block(); 
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Marca de vehiculo a ingresar no encontrada.");
        }
        if (marcadto == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"ENDPOINT agregarVehiculo no ha encontrado la marca ingresada(IF).");
        }
        
        Vehiculo v = new Vehiculo();
        v.setId_marca(nuevVehiculo.getId_marca());
        v.setPatente(nuevVehiculo.getPatente());
        v.setModelo(nuevVehiculo.getModelo());
        return vehiculoRepository.save(v); 
    }

    //ACTUALIZAR VEHICULO POR ID
    public Vehiculo actualizarVehiculo(ActualizarVehiculo actualizarVehiculo, int id_vehiculo){
        //validar id_vehiculo
        Vehiculo vehiculoexistente = vehiculoRepository.findById(id_vehiculo).orElse(null);
        if (vehiculoexistente == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"ENDPOINT actualizarVehiculo no ha encontrado el id de vehiculo ingresado.");
        }
        //validar id_marca
        MarcaDTO marcadto = null;
        try {
            marcadto = marcaWebClientConfig.get()
            .uri("/marca/{id_marca}",actualizarVehiculo.getId_marca())
            .retrieve()
            .bodyToMono(MarcaDTO.class)
            .block(); 
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Marca de vehiculo a actualizar no encontrada.");
        }
        if (marcadto == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"ENDPOINT actualizarVehiculo no ha encontrado la marca ingresada(IF).");
        }

        vehiculoexistente.setPatente(actualizarVehiculo.getPatente());
        vehiculoexistente.setModelo(actualizarVehiculo.getModelo());
        vehiculoexistente.setId_marca(actualizarVehiculo.getId_marca());
        return vehiculoRepository.save(vehiculoexistente);

    }

    //ELIMINAR VEHICULO POR ID
    public String eliminarVehiculo(int id_vehiculo){
        if (vehiculoRepository.existsById(id_vehiculo)) {
            vehiculoRepository.deleteById(id_vehiculo);
            return "Vehiculo eliminado correctamente";
        }else{
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"ENDPOINT eliminarVehiculo no ha encontrado la id_vehiculo ingresado(IF).");
        }
    }


}
