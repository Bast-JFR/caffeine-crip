//ARCHIVO QUE INICIA NUESTRO PROYECTO DE MICROSERVICIOS, ESTE ARCHIVO ES INICIA TODO, API, BD ETC

package com.example.automora;

/*
 * ========================================
 * IMPORTS DEL SPRING BOOT STARTER
 * ========================================
 */
import org.springframework.boot.SpringApplication;    // Clase para iniciar la aplicación
import org.springframework.boot.autoconfigure.SpringBootApplication; // Anotación principal

/*
 * ========================================
 * CLASE PRINCIPAL - PUNTO DE ENTRADA
 * ========================================
 * Archivo principal que Spring Boot ejecuta para iniciar toda la aplicación
 */
@SpringBootApplication
public class AutomoraApplication {

    /*
     * ========================================
     * MÉTODO MAIN - INICIO DE LA APLICACIÓN
     * ========================================
     * Punto de entrada cuando ejecutas "java -jar automora.jar" o desde IDE
     */
    public static void main(String[] args) {
        /* 
         * INICIA Spring Boot:
         * 1. Escanea @Controller, @Service, @Repository en todos los paquetes
         * 2. Crea beans (MarcaController, MarcaService, MarcaRepository...)
         * 3. Lee application.properties (MySQL, puerto, etc.)
         * 4. Arranca servidor Tomcat en puerto 8080
         * 5. Crea tablas BD (ddl-auto=create-drop)
         * 6. ¡API lista! http://localhost:8080/marca
         */
        SpringApplication.run(AutomoraApplication.class, args);
    }
}



//==================================================================================================================
//CODIGO SIN COMENTARIOS, SOLO SACAR EL COMENTARIOS GENERAL
//==================================================================================================================

/* 
package com.example.automora;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class AutomoraApplication {

	public static void main(String[] args) {
		SpringApplication.run(AutomoraApplication.class, args);
	}

}
*/