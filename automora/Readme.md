🚗 API Automora Marcas REST - Documentación Completa
📋 RESUMEN EJECUTIVO
Microservicio: AutomoraApplication.java (aplicación Spring Boot completa)
API REST: MarcaController.java (5 endpoints CRUD marcas)
Base de datos: MySQL (tablas: marca, vehiculo)
Puerto: http://localhost:8080
Formato: JSON

🔗 ENDPOINTS DISPONIBLES (5)
GET /marca - Lista todas las marcas - http://localhost:8080/marca

GET /marca/{id} - Obtiene marca por ID - http://localhost:8080/marca/5

POST /marca - Crea nueva marca - Body: {"nombreMarca":"Toyota"}

PUT /marca - Actualiza marca - Body: {"idMarca":5,"nombreMarca":"Tesla"}

DELETE /marca/{id} - Elimina marca - http://localhost:8080/marca/5

🏗️ ARQUITECTURA CAPAS (Flujo Completo)
"La comunicación de este programa funciona de la siguiente manera:

1. **MICROSERVICIO**: AutomoraApplication.java ejecuta el MICROSERVICIO COMPLETO 
   (inicia API, BD, config, etc.)

2. **API**: MarcaController.java (gestor HTTP) recibe la solicitud HTTP
   - **ENDPOINTS** (5 URLs específicas):
     * ENDPOINT 1: GET /marca
     * ENDPOINT 2: GET /marca/{id}
     * ENDPOINT 3: POST /marca  
     * ENDPOINT 4: PUT /marca
     * ENDPOINT 5: DELETE /marca/{id}
   - NO ejecuta lógica, solo redistribuye al Service

3. **MarcaService.java** recibe llamada del Controller → EJECUTA lógica + errores → Llama Repository

4. **MarcaRepository.java** → SQL → Entidades Marca/Vehiculo → MySQL

5. **application.properties** → CONEXIÓN BD (URL, usuario, password)

6. **MySQL** ejecuta → devuelve datos

7. Respuesta: Repository → Service → Controller → JSON automático
"


Flujo visual: CLIENTE → Controller → Service → Repository → MySQL → JSON

📄 DEFINICIONES TÉCNICAS
MICROSERVICIO: AutomoraApplication.java (1 aplicación Java independiente)
API: MarcaController.java (1 conjunto de 5 endpoints HTTP)
ENDPOINTS: 5 métodos anotados @GetMapping/@PostMapping/etc.

🚀 EJEMPLOS PRÁCTICOS (Postman/cURL)
CREAR MARCA:
curl -X POST http://localhost:8080/marca -H "Content-Type: application/json" -d '{"nombreMarca":"Toyota"}'
Respuesta: {"id_marca":1,"nombre_marca":"Toyota"}

LISTAR TODAS:
curl http://localhost:8080/marca

OBTENER POR ID:
curl http://localhost:8080/marca/1

ACTUALIZAR:
curl -X PUT http://localhost:8080/marca -H "Content-Type: application/json" -d '{"idMarca":1,"nombreMarca":"Toyota SA"}'

ELIMINAR:
curl -X DELETE http://localhost:8080/marca/1

🗄️ ESQUEMA BASE DE DATOS
TABLA marca: id_marca (PK, AUTO_INCREMENT), nombre_marca (VARCHAR, NOT NULL)
TABLA vehiculo: id_vehiculo (PK), patente (NOT NULL), anio (NOT NULL), color (NULL), modelo (NULL), id_marca (FK)

⚙️ CONFIGURACIÓN (application.properties)
spring.application.name=automora
spring.datasource.url=jdbc:mysql://localhost:3306/full_Stack_1
spring.jpa.hibernate.ddl-auto=create-drop
server.port=8080

📱 DTOS (Data Transfer Objects)
AgregarMarca: {"nombreMarca":"Toyota"} → POST
ActualizarMarca: {"idMarca":1,"nombreMarca":""} → PUT

🧪 PRUEBAS RÁPIDAS
Iniciar: mvn spring-boot:run

Probar: http://localhost:8080/marca

Postman: Usar ejemplos de arriba

🔍 ESTRUCTURA DE ARCHIVOS
src/main/java/com/example/automora/

AutomoraApplication.java (Microservicio)

controller/MarcaController.java (API + 5 endpoints)

services/MarcaService.java (Lógica negocio)

repositories/MarcaRepository.java (SQL)

models/entities/Marca.java (Tabla BD)

models/requests/ (DTOs)

🚀 API LISTA PARA PRODUCCIÓN
Desarrollado con Spring Boot + JPA + MySQL + Lombok
DUOC UC - Desarrollo Full Stack