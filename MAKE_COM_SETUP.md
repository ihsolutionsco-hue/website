# Configuración de Integración con make.com

Este documento explica cómo conectar el chat de conserje con un flujo de make.com.

## Requisitos

Para conectar el chat de conserje con make.com, necesitas:

1. **Una cuenta de make.com** (anteriormente Integromat)
2. **Un escenario (scenario) en make.com** configurado con un módulo Webhook
3. **La URL del webhook** generada por make.com

## Pasos para Configurar make.com

### 1. Crear un Webhook en make.com

1. Inicia sesión en [make.com](https://www.make.com)
2. Crea un nuevo escenario o abre uno existente
3. Agrega el módulo **"Webhooks" > "Custom webhook"**
4. Selecciona **"Instant webhook"** o **"Custom webhook"** según tus necesidades
5. Configura el webhook:
   - **Nombre**: "Chat Concierge Webhook" (o el nombre que prefieras)
   - **Método HTTP**: POST
   - **Tipo de respuesta**: JSON
6. Guarda el escenario y copia la **URL del webhook** que make.com genera

### 2. Configurar el Flujo en make.com

Tu escenario en make.com debe:

1. **Recibir el payload** del webhook con la siguiente estructura:
   ```json
   {
     "message": "Mensaje del usuario",
     "history": [
       {
         "role": "user",
         "text": "Mensaje anterior del usuario"
       },
       {
         "role": "model",
         "text": "Respuesta anterior del modelo"
       }
     ],
     "timestamp": "2024-01-01T00:00:00.000Z",
     "sessionId": "opcional-session-id"
   }
   ```

2. **Procesar el mensaje** usando tu lógica (puede incluir:
   - Conexión a una API de IA (OpenAI, Anthropic, etc.)
   - Consultas a bases de datos
   - Integraciones con otros servicios
   - Lógica de negocio personalizada

3. **Responder con el formato correcto**:

   **Opción 1: JSON (recomendado)**
   ```json
   {
     "response": "Respuesta del agente al usuario"
   }
   ```

   O en caso de error:
   ```json
   {
     "response": "",
     "error": "Descripción del error"
   }
   ```

   **Opción 2: Texto plano**
   También puedes responder directamente con texto plano. El código manejará ambos formatos automáticamente:
   ```
   Respuesta del agente al usuario
   ```

   > **Nota**: El código está diseñado para manejar ambos formatos. Si make.com devuelve texto plano, se usará directamente. Si devuelve JSON, se extraerá el campo `response`.

### 3. Ejemplo de Escenario en make.com

Un ejemplo básico de escenario sería:

```
1. Webhook (Custom webhook) - Recibe el POST
   ↓
2. HTTP Request (o módulo de IA) - Procesa el mensaje
   ↓
3. Webhook Response - Devuelve la respuesta
```

**Configuración del módulo Webhook Response:**
- **Status**: 200
- **Response body**: 
  
  **Si quieres devolver JSON:**
  ```json
  {
    "response": "{{1.response}}"
  }
  ```
  (Donde `{{1.response}}` es la respuesta del módulo anterior)
  
  **O simplemente devuelve texto plano:**
  ```
  {{1.response}}
  ```
  
  El código manejará ambos formatos automáticamente.

## Configuración en el Proyecto

### 1. Variables de Entorno

1. Crea un archivo `.env` en la raíz del proyecto (copia `.env.example`)
2. Agrega la URL de tu webhook:

```env
VITE_MAKE_WEBHOOK_URL=https://hook.eu1.make.com/xxxxxxxxxxxxxxxxxxxxx
```

### 2. Reiniciar el Servidor de Desarrollo

Si estás ejecutando el servidor de desarrollo, reinícialo para que cargue las nuevas variables de entorno:

```bash
npm run dev
```

## Estructura de Datos

### Payload Enviado a make.com

El chat envía el siguiente payload a make.com:

```typescript
{
  message: string;           // Mensaje actual del usuario
  history: Array<{           // Historial de la conversación
    role: string;            // "user" o "model"
    text: string;            // Contenido del mensaje
  }>;
  timestamp?: string;        // ISO timestamp del mensaje
  sessionId?: string;        // ID de sesión (opcional)
}
```

### Respuesta Esperada de make.com

make.com puede responder de dos formas:

**Formato 1: JSON (recomendado)**
```typescript
{
  response: string;          // Respuesta del agente
  error?: string;           // Mensaje de error (opcional)
}
```

**Formato 2: Texto plano**
```typescript
string  // Respuesta directa del agente
```

El código maneja ambos formatos automáticamente. Si make.com devuelve texto plano, se usará directamente. Si devuelve JSON, se extraerá el campo `response`.

## Características Implementadas

- ✅ Envío de mensajes al webhook de make.com
- ✅ Envío del historial completo de conversación
- ✅ Manejo de errores
- ✅ Streaming simulado de respuestas (para mejor UX)
- ✅ Soporte para sesiones (sessionId)
- ✅ Soporte para respuestas en formato JSON o texto plano

## Pruebas

Para probar la integración:

1. Asegúrate de que tu escenario en make.com esté activo
2. Verifica que la variable `VITE_MAKE_WEBHOOK_URL` esté configurada
3. Abre el chat de conserje en la aplicación
4. Envía un mensaje de prueba
5. Verifica en make.com que el webhook recibió la petición
6. Verifica que la respuesta aparezca en el chat

## Troubleshooting

### El chat no responde

1. Verifica que la URL del webhook sea correcta
2. Verifica que el escenario en make.com esté activo
3. Revisa la consola del navegador para ver errores
4. Verifica en make.com los logs de ejecución del escenario

### Error: "MAKE_WEBHOOK_URL no está configurada"

- Asegúrate de tener un archivo `.env` con `VITE_MAKE_WEBHOOK_URL`
- Reinicia el servidor de desarrollo después de crear/modificar `.env`

### El webhook recibe datos pero no responde correctamente

- Verifica que el módulo "Webhook Response" esté configurado correctamente
- El código ahora acepta tanto JSON (`{"response": "..."}`) como texto plano
- Si make.com devuelve texto plano, se usará directamente sin necesidad de formato JSON
- Revisa los logs en la consola del navegador para ver el formato exacto de la respuesta

## Notas Adicionales

- El servicio actualmente simula streaming dividiendo la respuesta en palabras. Si make.com soporta streaming real (Server-Sent Events), puedes modificar `makeService.ts` para implementarlo.
- El `sessionId` se almacena en `sessionStorage` para mantener contexto entre recargas de página.
- Puedes agregar más campos al payload si tu flujo en make.com los requiere.

