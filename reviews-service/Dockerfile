# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de dependencias primero (esto mejora el caching de Docker)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto en el que corre tu app (por defecto 3000)
EXPOSE 3006

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
