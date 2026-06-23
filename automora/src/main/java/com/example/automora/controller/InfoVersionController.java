package com.example.automora.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.automora.models.requests.InfoVersion;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;


@RequestMapping("/")
@RestController
public class InfoVersionController {

    @Value("${app.name}")
    private String name;

    @Value("${app.version}")
    private String version;
    



    @GetMapping("")
    public InfoVersion infoApp() {
        return new InfoVersion(name,version);
    }
    
}
