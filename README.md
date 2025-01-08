# Petstore Final Project

Este proyecto implementa una tienda de mascotas en línea utilizando una arquitectura de microservicios. Cada servicio está encapsulado en un contenedor Docker para facilitar su despliegue y gestión. Se utilizan JWT (JSON Web Tokens) para la autenticación y autorización, y Axios para la conexión entre los microservicios y el frontend.

## Tabla de Contenidos

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Servicios](#servicios)
  - [API Gateway](#api-gateway)
  - [Cart Service](#cart-service)
  - [Categories Service](#categories-service)
  - [Orders Service](#orders-service)
  - [Products Service](#products-service)
  - [Reviews Service](#reviews-service)
  - [Users Service](#users-service)
- [Archivos Principales](#archivos-principales)
  - [docker-compose.yml](#docker-composeyml)
  - [package.json y package-lock.json](#packagejson-y-package-lockjson)
  - [.gitignore](#gitignore)
- [Seguridad y Autenticación](#seguridad-y-autenticación)
- [Uso del Proyecto](#uso-del-proyecto)
  - [Requisitos Previos](#requisitos-previos)
  - [Configuración Inicial](#configuración-inicial)
  - [Despliegue con Docker](#despliegue-con-docker)
- [Contribuciones](#contribuciones)
- [Licencia](#licencia)

## Estructura del Proyecto

El proyecto está organizado en los siguientes directorios y archivos:

```
petstore-final-project/
├── api_gateway/
├── cart-service/
├── categories-service/
├── orders-service/
├── products-service/
├── reviews-service/
├── users-service/
├── docker-compose.yml
├── package.json
├── package-lock.json
└── .gitignore
```

## Servicios

### API Gateway
- **Ubicación**: `api_gateway/`
- **Descripción**: Actúa como punto de entrada unificado para las solicitudes de los clientes, redirigiendo las peticiones a los microservicios correspondientes.
- **Tecnologías utilizadas**: Express, JWT, Axios.

### Cart Service
- **Ubicación**: `cart-service/`
- **Descripción**: Gestiona las operaciones relacionadas con el carrito de compras, como agregar o eliminar productos.
- **Autenticación**: Protegido mediante JWT.
- **Conexión con otros servicios**: Axios para comunicarse con Products Service.

### Categories Service
- **Ubicación**: `categories-service/`
- **Descripción**: Maneja las categorías de productos disponibles en la tienda.
- **Autenticación**: JWT.

### Orders Service
- **Ubicación**: `orders-service/`
- **Descripción**: Se encarga de la creación y gestión de los pedidos realizados por los clientes.
- **Autenticación**: JWT.
- **Conexión**: Axios para verificar productos en el carrito antes de proceder con la orden.

### Products Service
- **Ubicación**: `products-service/`
- **Descripción**: Administra la información de los productos disponibles en la tienda.
- **Autenticación**: Protegido con JWT.

### Reviews Service
- **Ubicación**: `reviews-service/`
- **Descripción**: Gestiona las reseñas y calificaciones que los clientes dejan sobre los productos.
- **Autenticación**: JWT.

### Users Service
- **Ubicación**: `users-service/`
- **Descripción**: Maneja la información y autenticación de los usuarios de la plataforma.
- **Tecnología de autenticación**: JWT (creación y verificación de tokens durante el inicio de sesión y registro).

## Archivos Principales

### docker-compose.yml
- **Descripción**: Define y configura los servicios de Docker para el proyecto, permitiendo su orquestación y despliegue conjunto.

### package.json y package-lock.json
- **Descripción**: Contienen las dependencias y scripts necesarios para el entorno de Node.js utilizado en el proyecto.
- **Dependencias clave**: Express, Axios, jsonwebtoken.

### .gitignore
- **Descripción**: Especifica los archivos y directorios que Git debe ignorar, como dependencias instaladas y archivos de configuración locales.

## Seguridad y Autenticación
- **JWT (JSON Web Tokens)**: Se utilizan para la autenticación y autorización de usuarios.
- **Axios**: Axios es utilizado para realizar peticiones HTTP entre microservicios de manera eficiente.
- **Middleware de autenticación**: Cada servicio contiene un middleware que verifica la validez del token JWT antes de permitir el acceso a rutas protegidas.


### Configuración Inicial
1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/Mawy23/petstore-final-project.git
   cd petstore-final-project
   ```
2. **Instalar dependencias**:
   ```bash
    npm install axios bcrypt dotenv express jsonwebtoken mongoose swagger-jsdoc swagger-ui-express
   ```

### Despliegue con Docker
1. **Construir y levantar los servicios**:
   ```bash
   docker-compose up --build
   ```
2. **Acceder a la aplicación**:
   ```
   http://localhost:3000
   ```
3. **Detener los servicios**:
   ```bash
   docker-compose down
   ```


