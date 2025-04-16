# Nuxt Minimal Starter

Consulta la [documentación de Nuxt](https://nuxt.com/docs/getting-started/introduction) para obtener más información.

## Configuración

Asegúrate de instalar las dependencias:

```bash
npm install
```

### Configuración del archivo .env

Antes de iniciar la aplicación, debes crear un archivo `.env` en la raíz del proyecto basado en el archivo `.env.example` proporcionado. Este archivo contiene las credenciales necesarias para el acceso directo al sistema y la URL base de la API.

Para configurarlo:
1. Copia el archivo `.env.example` y renómbralo a `.env`
2. Modifica los valores según sea necesario para tu entorno

## Consideraciones importantes

**Nota sobre las operaciones de eliminación:**
Los endpoints de deleteUser y deleteProduct de la API externa (fakestoreapi.com) existen pero no eliminan realmente el usuario o producto, solo devuelven un mensaje de éxito. Por lo tanto, la eliminación se maneja solo en el frontend, pero al recargar la página se mostrarán nuevamente todos los usuarios o productos.

## Servidor de desarrollo

Inicia el servidor de desarrollo en `http://localhost:3000`:

```bash
npm run dev
```

## Producción

Construye la aplicación para producción:

```bash
npm run build
```

Vista previa local de la compilación de producción:

```bash
npm run preview
```

Consulta la [documentación de despliegue](https://nuxt.com/docs/getting-started/deployment) para obtener más información.
