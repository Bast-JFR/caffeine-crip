package com.example.vehiculo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.vehiculo.models.entities.Vehiculo;
import com.example.vehiculo.models.request.ActualizarVehiculo;
import com.example.vehiculo.models.request.AgregarVehiculo;
import com.example.vehiculo.service.VehiculoService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;




@RequestMapping("vehiculo")
@RestController
public class VehiculoController {
    
    @Autowired
    private VehiculoService vehiculoService;

    @GetMapping("")
    public List<Vehiculo> obtenerTodosLosVehiculos() {
        return vehiculoService.obtenerTodosLosVehiculos();
    }

    @GetMapping("/{id_vehiculo}")
    public Vehiculo obtenerVehiculoPorID(@PathVariable int id_vehiculo) {
        return vehiculoService.obtenerVehiculoPorID(id_vehiculo);       
    }

    @PostMapping("")
    public Vehiculo agregarVehiculo(@RequestBody AgregarVehiculo agregarVehiculo){
        return vehiculoService.agregarVehiculo(agregarVehiculo);
    }

    @PutMapping("{id_vehiculo}")
    public Vehiculo actualizarVehiculo(@PathVariable int id_vehiculo, @RequestBody ActualizarVehiculo actualizarVehiculo) {
        return vehiculoService.actualizarVehiculo(actualizarVehiculo, id_vehiculo);
    }

    @DeleteMapping("/{id_vehiculo}")
        public String eliminarVehiculo(@PathVariable int id_vehiculo){
            return vehiculoService.eliminarVehiculo(id_vehiculo);
        }
    
    
    
    

}
