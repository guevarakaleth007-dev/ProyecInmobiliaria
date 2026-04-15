# GestiApar — Sistema de Gestión Inmobiliaria

Sistema web para gestión de una inmobiliaria. Backend con Spring Boot 4 + JPA + Oracle XE. Frontend con HTML/CSS/JS vanilla.

## Requisitos

- Java 21
- Oracle Database XE 10g (o superior)
- Maven (incluido via `mvnw`)

## Configuración de la base de datos

1. Crear un usuario en Oracle:

```sql
CREATE USER GestiApar2 IDENTIFIED BY Pass234;
GRANT CONNECT, RESOURCE TO GestiApar2;
```

2. Conectarse con ese usuario y ejecutar el script DDL completo (ver sección abajo).

3. El archivo `application.properties` ya apunta a:
   - Host: `localhost:1521`
   - SID: `XE`
   - Usuario: `GestiApar2`
   - Contraseña: `Pass234`

## Ejecutar el proyecto

```bash
.\mvnw.cmd spring-boot:run
```

Al iniciar, la aplicación inserta automáticamente los datos base:
- Perfiles: Administrador, Usuario
- Tipos de persona: Cliente, Empleado, Propietario

## Acceder al sistema

Abrir en el navegador: `front/login/index.html`

Registrarse con un usuario nuevo y luego iniciar sesión.

---

## Script DDL — Base de datos

```sql
CREATE TABLE TipoPersona (
    idTipoPersona NUMBER PRIMARY KEY,
    descripcion VARCHAR2(50) NOT NULL
);
CREATE SEQUENCE seq_tipopersona;
CREATE OR REPLACE TRIGGER trg_tipopersona
BEFORE INSERT ON TipoPersona FOR EACH ROW
BEGIN
    IF :NEW.idTipoPersona IS NULL THEN
        SELECT seq_tipopersona.NEXTVAL INTO :NEW.idTipoPersona FROM dual;
    END IF;
END;
/

CREATE TABLE Persona (
    idPersona NUMBER PRIMARY KEY,
    idTipoPersona NUMBER NOT NULL,
    nombre VARCHAR2(100) NOT NULL,
    apellido VARCHAR2(100) NOT NULL,
    fechaNacimiento DATE,
    domicilio VARCHAR2(200),
    telefono VARCHAR2(20),
    correo VARCHAR2(100),
    CONSTRAINT fk_persona_tipo FOREIGN KEY (idTipoPersona) REFERENCES TipoPersona(idTipoPersona)
);
CREATE SEQUENCE seq_persona;
CREATE OR REPLACE TRIGGER trg_persona
BEFORE INSERT ON Persona FOR EACH ROW
BEGIN
    IF :NEW.idPersona IS NULL THEN
        SELECT seq_persona.NEXTVAL INTO :NEW.idPersona FROM dual;
    END IF;
END;
/

CREATE TABLE Perfil (
    idPerfil NUMBER PRIMARY KEY,
    nombre VARCHAR2(50) NOT NULL
);
CREATE SEQUENCE seq_perfil;
CREATE OR REPLACE TRIGGER trg_perfil
BEFORE INSERT ON Perfil FOR EACH ROW
BEGIN
    IF :NEW.idPerfil IS NULL THEN
        SELECT seq_perfil.NEXTVAL INTO :NEW.idPerfil FROM dual;
    END IF;
END;
/

CREATE TABLE Usuario (
    idUsuario NUMBER PRIMARY KEY,
    idPersona NUMBER NOT NULL,
    idPerfil NUMBER NOT NULL,
    username VARCHAR2(50) UNIQUE NOT NULL,
    password VARCHAR2(100) NOT NULL,
    CONSTRAINT fk_usuario_persona FOREIGN KEY (idPersona) REFERENCES Persona(idPersona),
    CONSTRAINT fk_usuario_perfil FOREIGN KEY (idPerfil) REFERENCES Perfil(idPerfil)
);
CREATE SEQUENCE seq_usuario;
CREATE OR REPLACE TRIGGER trg_usuario
BEFORE INSERT ON Usuario FOR EACH ROW
BEGIN
    IF :NEW.idUsuario IS NULL THEN
        SELECT seq_usuario.NEXTVAL INTO :NEW.idUsuario FROM dual;
    END IF;
END;
/

CREATE TABLE Pais (
    idPais NUMBER PRIMARY KEY,
    nombre VARCHAR2(100) NOT NULL,
    fechaCreacion DATE DEFAULT SYSDATE
);
CREATE SEQUENCE seq_pais;
CREATE OR REPLACE TRIGGER trg_pais
BEFORE INSERT ON Pais FOR EACH ROW
BEGIN
    IF :NEW.idPais IS NULL THEN
        SELECT seq_pais.NEXTVAL INTO :NEW.idPais FROM dual;
    END IF;
END;
/

CREATE TABLE Departamento (
    idDepartamento NUMBER PRIMARY KEY,
    idPais NUMBER NOT NULL,
    nombre VARCHAR2(100) NOT NULL,
    fechaCreacion DATE DEFAULT SYSDATE,
    CONSTRAINT fk_dep_pais FOREIGN KEY (idPais) REFERENCES Pais(idPais)
);
CREATE SEQUENCE seq_departamento;
CREATE OR REPLACE TRIGGER trg_departamento
BEFORE INSERT ON Departamento FOR EACH ROW
BEGIN
    IF :NEW.idDepartamento IS NULL THEN
        SELECT seq_departamento.NEXTVAL INTO :NEW.idDepartamento FROM dual;
    END IF;
END;
/

CREATE TABLE Ciudad (
    idCiudad NUMBER PRIMARY KEY,
    idDepartamento NUMBER NOT NULL,
    nombre VARCHAR2(100) NOT NULL,
    fechaCreacion DATE DEFAULT SYSDATE,
    CONSTRAINT fk_ciudad_dep FOREIGN KEY (idDepartamento) REFERENCES Departamento(idDepartamento)
);
CREATE SEQUENCE seq_ciudad;
CREATE OR REPLACE TRIGGER trg_ciudad
BEFORE INSERT ON Ciudad FOR EACH ROW
BEGIN
    IF :NEW.idCiudad IS NULL THEN
        SELECT seq_ciudad.NEXTVAL INTO :NEW.idCiudad FROM dual;
    END IF;
END;
/

CREATE TABLE Propietario (
    idPropietario NUMBER PRIMARY KEY,
    idPersona NUMBER NOT NULL,
    CONSTRAINT fk_prop_persona FOREIGN KEY (idPersona) REFERENCES Persona(idPersona)
);
CREATE SEQUENCE seq_propietario;
CREATE OR REPLACE TRIGGER trg_propietario
BEFORE INSERT ON Propietario FOR EACH ROW
BEGIN
    IF :NEW.idPropietario IS NULL THEN
        SELECT seq_propietario.NEXTVAL INTO :NEW.idPropietario FROM dual;
    END IF;
END;
/

CREATE TABLE Cliente (
    idCliente NUMBER PRIMARY KEY,
    idPersona NUMBER NOT NULL,
    CONSTRAINT fk_cli_persona FOREIGN KEY (idPersona) REFERENCES Persona(idPersona)
);
CREATE SEQUENCE seq_cliente;
CREATE OR REPLACE TRIGGER trg_cliente
BEFORE INSERT ON Cliente FOR EACH ROW
BEGIN
    IF :NEW.idCliente IS NULL THEN
        SELECT seq_cliente.NEXTVAL INTO :NEW.idCliente FROM dual;
    END IF;
END;
/

CREATE TABLE Empleado (
    idEmpleado NUMBER PRIMARY KEY,
    idPersona NUMBER NOT NULL,
    cargo VARCHAR2(100),
    CONSTRAINT fk_emp_persona FOREIGN KEY (idPersona) REFERENCES Persona(idPersona)
);
CREATE SEQUENCE seq_empleado;
CREATE OR REPLACE TRIGGER trg_empleado
BEFORE INSERT ON Empleado FOR EACH ROW
BEGIN
    IF :NEW.idEmpleado IS NULL THEN
        SELECT seq_empleado.NEXTVAL INTO :NEW.idEmpleado FROM dual;
    END IF;
END;
/

CREATE TABLE Apartamento (
    idApartamento NUMBER PRIMARY KEY,
    idPropietario NUMBER NOT NULL,
    idCiudad NUMBER NOT NULL,
    direccion VARCHAR2(200),
    numeroHabitaciones NUMBER,
    estado VARCHAR2(50),
    pagoMensual NUMBER,
    fechaCreacion DATE DEFAULT SYSDATE,
    CONSTRAINT fk_apto_prop FOREIGN KEY (idPropietario) REFERENCES Propietario(idPropietario),
    CONSTRAINT fk_apto_ciudad FOREIGN KEY (idCiudad) REFERENCES Ciudad(idCiudad)
);
CREATE SEQUENCE seq_apartamento;
CREATE OR REPLACE TRIGGER trg_apartamento
BEFORE INSERT ON Apartamento FOR EACH ROW
BEGIN
    IF :NEW.idApartamento IS NULL THEN
        SELECT seq_apartamento.NEXTVAL INTO :NEW.idApartamento FROM dual;
    END IF;
END;
/

CREATE TABLE Contrato (
    idContrato NUMBER PRIMARY KEY,
    idCliente NUMBER NOT NULL,
    idApartamento NUMBER NOT NULL,
    fechaInicio DATE,
    fechaFin DATE,
    valorMensual NUMBER,
    CONSTRAINT fk_contrato_cliente FOREIGN KEY (idCliente) REFERENCES Cliente(idCliente),
    CONSTRAINT fk_contrato_apto FOREIGN KEY (idApartamento) REFERENCES Apartamento(idApartamento)
);
CREATE SEQUENCE seq_contrato;
CREATE OR REPLACE TRIGGER trg_contrato
BEFORE INSERT ON Contrato FOR EACH ROW
BEGIN
    IF :NEW.idContrato IS NULL THEN
        SELECT seq_contrato.NEXTVAL INTO :NEW.idContrato FROM dual;
    END IF;
END;
/

CREATE TABLE FormaPago (
    idFormaPago NUMBER PRIMARY KEY,
    descripcion VARCHAR2(100)
);
CREATE SEQUENCE seq_formapago;
CREATE OR REPLACE TRIGGER trg_formapago
BEFORE INSERT ON FormaPago FOR EACH ROW
BEGIN
    IF :NEW.idFormaPago IS NULL THEN
        SELECT seq_formapago.NEXTVAL INTO :NEW.idFormaPago FROM dual;
    END IF;
END;
/

CREATE TABLE PagoContrato (
    idPagoContrato NUMBER PRIMARY KEY,
    idContrato NUMBER,
    idFormaPago NUMBER,
    fechaPago DATE,
    valor NUMBER,
    CONSTRAINT fk_pc_contrato FOREIGN KEY (idContrato) REFERENCES Contrato(idContrato),
    CONSTRAINT fk_pc_fp FOREIGN KEY (idFormaPago) REFERENCES FormaPago(idFormaPago)
);
CREATE SEQUENCE seq_pagocontrato;
CREATE OR REPLACE TRIGGER trg_pagocontrato
BEFORE INSERT ON PagoContrato FOR EACH ROW
BEGIN
    IF :NEW.idPagoContrato IS NULL THEN
        SELECT seq_pagocontrato.NEXTVAL INTO :NEW.idPagoContrato FROM dual;
    END IF;
END;
/

CREATE TABLE Mantenimiento (
    idMantenimiento NUMBER PRIMARY KEY,
    idApartamento NUMBER,
    idEmpleado NUMBER,
    fecha DATE,
    descripcion VARCHAR2(200),
    CONSTRAINT fk_mant_apto FOREIGN KEY (idApartamento) REFERENCES Apartamento(idApartamento),
    CONSTRAINT fk_mant_emp FOREIGN KEY (idEmpleado) REFERENCES Empleado(idEmpleado)
);
CREATE SEQUENCE seq_mantenimiento;
CREATE OR REPLACE TRIGGER trg_mantenimiento
BEFORE INSERT ON Mantenimiento FOR EACH ROW
BEGIN
    IF :NEW.idMantenimiento IS NULL THEN
        SELECT seq_mantenimiento.NEXTVAL INTO :NEW.idMantenimiento FROM dual;
    END IF;
END;
/

CREATE TABLE PagoMantenimiento (
    idPagoMantenimiento NUMBER PRIMARY KEY,
    idMantenimiento NUMBER,
    idFormaPago NUMBER,
    fechaPago DATE,
    valor NUMBER,
    CONSTRAINT fk_pm_mant FOREIGN KEY (idMantenimiento) REFERENCES Mantenimiento(idMantenimiento),
    CONSTRAINT fk_pm_fp FOREIGN KEY (idFormaPago) REFERENCES FormaPago(idFormaPago)
);
CREATE SEQUENCE seq_pagomant;
CREATE OR REPLACE TRIGGER trg_pagomant
BEFORE INSERT ON PagoMantenimiento FOR EACH ROW
BEGIN
    IF :NEW.idPagoMantenimiento IS NULL THEN
        SELECT seq_pagomant.NEXTVAL INTO :NEW.idPagoMantenimiento FROM dual;
    END IF;
END;
/
```

## Estructura del proyecto

```
gestiApar/
├── src/main/java/          # Backend Spring Boot
│   └── .../gestiApar/
│       ├── controller/     # Endpoints REST
│       ├── service/        # Lógica de negocio
│       ├── repository/     # Acceso a BD (JPA)
│       └── model/          # Entidades JPA
├── src/main/resources/
│   └── application.properties
└── front/                  # Frontend HTML/CSS/JS
    ├── login/
    ├── register/
    ├── inicio/
    └── tipoPersona/
```
