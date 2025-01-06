# Middleware de Verificación de Token

Este middleware se encarga de verificar la validez de un token JWT (JSON Web Token) en las solicitudes HTTP. Específicamente, extrae el token del encabezado de autorización, lo decodifica y verifica su validez utilizando una clave secreta. Si el token es válido, agrega el `id` del usuario al objeto `req` para que pueda ser utilizado en las siguientes funciones de la cadena de middleware.

## Uso

Para utilizar este middleware, simplemente inclúyelo en tu aplicación Express de la siguiente manera:

```javascript
const express = require('express');
const verifyToken = require('./middleware/verifyToken');

const app = express();

app.use(verifyToken);

// ...otras rutas y middlewares...
```

## Descripción del Código

```javascript
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // Obtenemos el token del encabezado Authorization (formato: "Bearer <token>")
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: "Token no proporcionado" });
    }

    try {
        // Decodificamos el token usando la clave secreta
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verificamos que el token contenga el 'id' en el payload
        if (!decoded.id) {
            return res.status(400).json({ message: "El token no contiene un id válido" });
        }

        // Agregamos el id al objeto req
        req.userId = decoded.id; // Aquí asignamos el 'id' a 'req.userId'

        console.log('Token Decodificado:', decoded);  // Verifica el contenido del token decodificado

        // Continuamos con la siguiente función
        next();
    } catch (error) {
        console.error('Error al verificar el token:', error.message);
        return res.status(401).json({ message: "Token inválido", error: error.message });
    }
};

module.exports = verifyToken;
```

### Explicación Detallada

1. **Importación de Dependencias**:
    ```javascript
    const jwt = require('jsonwebtoken');
    ```
    Se importa el módulo `jsonwebtoken` para trabajar con JWT.

2. **Extracción del Token**:
    ```javascript
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    ```
    Se obtiene el token del encabezado de autorización de la solicitud HTTP. El formato esperado es "Bearer <token>".

3. **Verificación de la Existencia del Token**:
    ```javascript
    if (!token) {
        return res.status(403).json({ message: "Token no proporcionado" });
    }
    ```
    Si no se proporciona un token, se responde con un estado 403 (Prohibido).

4. **Decodificación y Verificación del Token**:
    ```javascript
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ```
    Se decodifica el token utilizando la clave secreta almacenada en `process.env.JWT_SECRET`.

5. **Verificación del Payload del Token**:
    ```javascript
    if (!decoded.id) {
        return res.status(400).json({ message: "El token no contiene un id válido" });
    }
    ```
    Se verifica que el token contenga un `id` válido en su payload.

6. **Asignación del ID del Usuario al Objeto `req`**:
    ```javascript
    req.userId = decoded.id;
    ```
    Si el token es válido, se asigna el `id` del usuario al objeto `req` para su uso posterior.

7. **Manejo de Errores**:
    ```javascript
    } catch (error) {
        console.error('Error al verificar el token:', error.message);
        return res.status(401).json({ message: "Token inválido", error: error.message });
    }
    ```
    Si ocurre un error durante la verificación del token, se responde con un estado 401 (No autorizado) y se registra el error.

