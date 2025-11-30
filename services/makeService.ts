import { ChatMessage } from '../types';

/**
 * Servicio para conectar con make.com webhook
 * 
 * Para usar este servicio, necesitas:
 * 1. Crear un webhook en make.com
 * 2. Configurar la variable de entorno MAKE_WEBHOOK_URL con la URL del webhook
 * 3. Asegurarte de que el webhook en make.com reciba y responda con el formato correcto
 */

const WEBHOOK_URL = import.meta.env.VITE_MAKE_WEBHOOK_URL || '';

interface MakeWebhookRequest {
  message: string;
  history: Array<{
    role: string;
    text: string;
  }>;
  timestamp?: string;
  sessionId?: string;
}

interface MakeWebhookResponse {
  response: string;
  error?: string;
}

/**
 * Envía un mensaje al webhook de make.com y obtiene la respuesta
 * 
 * @param history - Historial de mensajes de la conversación
 * @param userMessage - Mensaje del usuario
 * @returns Promise con la respuesta del agente
 */
export const sendMessageToMake = async (
  history: ChatMessage[],
  userMessage: string
): Promise<string> => {
  if (!WEBHOOK_URL) {
    throw new Error('MAKE_WEBHOOK_URL no está configurada. Por favor, configura la variable de entorno VITE_MAKE_WEBHOOK_URL');
  }

  try {
    // Preparar el payload para make.com
    const payload: MakeWebhookRequest = {
      message: userMessage,
      history: history.map(msg => ({
        role: msg.role,
        text: msg.text
      })),
      timestamp: new Date().toISOString(),
      // Opcional: puedes generar un sessionId para mantener contexto entre sesiones
      sessionId: sessionStorage.getItem('chatSessionId') || undefined
    };

    // Enviar petición POST al webhook de make.com
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Error del webhook: ${response.status} ${response.statusText}`);
    }

    // Obtener el contenido de la respuesta como texto primero
    const responseText = await response.text();
    
    // Intentar parsear como JSON, si falla usar el texto plano directamente
    let responseData: MakeWebhookResponse | string;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      // Si no es JSON válido, usar el texto plano como respuesta
      console.log('make.com devolvió texto plano en lugar de JSON, usando directamente');
      return responseText.trim() || 'Lo siento, no recibí una respuesta válida.';
    }

    // Si es un objeto JSON, verificar si tiene la estructura esperada
    if (typeof responseData === 'object' && responseData !== null) {
      const data = responseData as MakeWebhookResponse;
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Si tiene la propiedad 'response', usarla
      if (data.response) {
        return data.response;
      }
      
      // Si no tiene 'response' pero tiene otras propiedades, intentar usar el primer valor string
      // o devolver el objeto stringificado
      const firstStringValue = Object.values(data).find(v => typeof v === 'string') as string | undefined;
      if (firstStringValue) {
        return firstStringValue;
      }
    }

    // Si llegamos aquí, devolver el texto original o un mensaje por defecto
    return responseText.trim() || 'Lo siento, no recibí una respuesta válida.';

  } catch (error) {
    console.error('Error comunicándose con make.com:', error);
    
    if (error instanceof Error) {
      throw error;
    }
    
    throw new Error('Error desconocido al comunicarse con make.com');
  }
};

/**
 * Versión con streaming (si make.com soporta Server-Sent Events o similar)
 * Por ahora, esta función devuelve la respuesta completa
 * Puedes modificarla si tu webhook de make.com soporta streaming
 */
export const streamMessageToMake = async function* (
  history: ChatMessage[],
  userMessage: string
): AsyncGenerator<{ text: () => string }, void, unknown> {
  try {
    const response = await sendMessageToMake(history, userMessage);
    
    // Simular streaming dividiendo la respuesta en chunks
    // Si make.com soporta streaming real, puedes modificar esto
    const words = response.split(' ');
    for (let i = 0; i < words.length; i++) {
      const chunk = (i === 0 ? words[i] : ' ' + words[i]);
      yield {
        text: () => chunk
      };
      // Pequeña pausa para simular streaming
      await new Promise(resolve => setTimeout(resolve, 30));
    }
  } catch (error) {
    console.error('Error en streaming de make.com:', error);
    throw error;
  }
};

