package com.example.HolaMundoOficial.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class ControllerHolaMundoOficial {
    @GetMapping("/hola")

    public String holaMundo(){
        return "¡HOLA MUNDO!";
    }
}
