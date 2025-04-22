# Tatiana te escucha - Guía de Configuración

## Requisitos previos
- Una cuenta en OpenAI con acceso a la API
- Una clave de API de OpenAI

## Configuración de la API
Para que Tatiana te escucha funcione correctamente, debes configurar tu clave de API de OpenAI:

1. Regístrate o inicia sesión en [OpenAI](https://platform.openai.com/)
2. Genera una clave de API en la sección de API Keys
3. Abre el archivo `script.js` y reemplaza `TU_API_KEY_AQUI` con tu clave de API real

```javascript
// Reemplaza esta línea
const API_KEY = 'TU_API_KEY_AQUI';

// Por algo como esto (usando tu clave real)
const API_KEY = 'sk-abcdefghijklmnopqrstuvwxyz123456789';
```

## Sobre Tatiana te escucha
Tatiana te escucha es un asistente personal de Vospodes diseñado para ofrecer apoyo emocional y consejos prácticos. Con un enfoque empático y comprensivo, Tatiana valora tus historias personales y te ayuda a encontrar tu propio potencial para superar desafíos.

## Consideraciones de seguridad
**IMPORTANTE**: En un entorno de producción, nunca debes incluir tu clave de API directamente en el código JavaScript del frontend, ya que esto expondría tu clave a cualquier usuario que inspeccione el código de la página.

Para una implementación segura, deberías:
1. Crear un backend (usando Node.js, Python, etc.)
2. Almacenar la clave de API en el servidor
3. Hacer que las solicitudes a la API de OpenAI pasen a través de tu servidor

## Uso local
Para pruebas locales, puedes usar la implementación actual, pero recuerda que tu clave de API estará expuesta en el código fuente del frontend.
