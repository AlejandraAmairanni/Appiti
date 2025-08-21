import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/push-notifications';
import OneSignal from 'onesignal-cordova-plugin';
import { environment } from 'src/environments/environment.prod';
import { Browser } from '@capacitor/browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

interface NotificacionData {
  titulo: string;
  mensaje: string;
  url?: string;
  fechaEnvio?: string;
}

interface OneSignalResponse {
  id?: string;
  recipients?: number;
  errors?: any;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private readonly APP_ID = environment.oneSignalID;
  private readonly REST_API_KEY = environment.oneSignalRestApi;
  private readonly ONESIGNAL_API_URL = 'https://onesignal.com/api/v1/notifications';

  constructor(private http: HttpClient) { }

  async init(){
    const isPushNotificationAvailable = Capacitor.
    isPluginAvailable('PushNotifications');

    if(isPushNotificationAvailable){
      PushNotifications.requestPermissions().then(async (result: any) => {
        if(result.receive){
          OneSignal.initialize(environment.oneSignalID)

          // Android 13+: muestra prompt
          await OneSignal.Notifications.requestPermission(true);

          // DEBUG de suscripción
          const perm = OneSignal.Notifications.hasPermission();
          const optedIn = OneSignal.User.pushSubscription.optedIn;
          const playerId = OneSignal.User.pushSubscription.id;
          const pushToken = OneSignal.User.pushSubscription.token;
          console.log('perm:', perm, 'optedIn:', optedIn, 'playerId:', playerId, 'pushToken:', pushToken);

          OneSignal.Notifications.addEventListener('click', async (e: any) => {
            const notification = e.notification;
            if(notification.additionalData && notification.additionalData['url']){
              await Browser.open({url: notification.additionalData['url']});
            }
          })
        }
      })
    }
  }

  async enviarNotificacion(notificacion: NotificacionData): Promise<{success: boolean, error?: string, data?: any}> {
    try {
      console.log('=== INICIO ENVÍO NOTIFICACIÓN ===');
      console.log('APP_ID:', this.APP_ID);
      console.log('API_URL:', this.ONESIGNAL_API_URL);
      console.log('REST_API_KEY (primeros 20 chars):', this.REST_API_KEY.substring(0, 20) + '...');
      
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ${this.REST_API_KEY}`
      });

      console.log('Headers configurados:', {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${this.REST_API_KEY.substring(0, 20)}...`
      });

      // Preparar el payload para OneSignal - configuración de prueba
      const payload: any = {
        app_id: this.APP_ID,
        // Usar included_segments para evitar errores de UUID
        included_segments: ["All"],
        headings: {
          en: notificacion.titulo,
          es: notificacion.titulo
        },
        contents: {
          en: notificacion.mensaje,
          es: notificacion.mensaje
        }
      };

      // Si hay URL, agregarla como web_url con protocolo https://
      if (notificacion.url) {
        let urlCompleta = notificacion.url;
        // Asegurar que la URL tenga protocolo
        if (!urlCompleta.startsWith('http://') && !urlCompleta.startsWith('https://')) {
          urlCompleta = 'https://' + urlCompleta;
        }
        payload.web_url = urlCompleta;
        payload.data = { url: urlCompleta };
      }

      console.log('NOTA: Usando segmento "Subscribed Users". Si no hay usuarios suscritos, la notificación no se enviará pero no dará error.');

      console.log('Payload completo:', JSON.stringify(payload, null, 2));

      console.log('Realizando petición HTTP...');
      
      const response = await firstValueFrom(
        this.http.post<OneSignalResponse>(this.ONESIGNAL_API_URL, payload, { 
          headers,
          observe: 'response'
        })
      );

      console.log('Respuesta HTTP completa:', {
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        body: response.body
      });
      
      const responseBody = response.body;

      if (responseBody?.id) {
        return {
          success: true,
          data: responseBody
        };
      } else if (responseBody?.errors) {
        return {
          success: false,
          error: this.formatearErrores(responseBody.errors)
        };
      } else {
        return {
          success: false,
          error: 'Respuesta inesperada del servidor'
        };
      }

    } catch (error: any) {
      console.error('Error completo al enviar notificación:', error);
      
      let mensajeError = 'Error desconocido';
      
      // Manejo más detallado de errores HTTP
      if (error.status) {
        switch (error.status) {
          case 400:
            mensajeError = `Error 400: Datos inválidos. ${error.error?.errors ? this.formatearErrores(error.error.errors) : 'Verifica los datos del formulario.'}`;
            break;
          case 401:
            mensajeError = 'Error 401: API Key inválida o expirada';
            break;
          case 403:
            mensajeError = 'Error 403: Sin permisos para enviar notificaciones';
            break;
          case 429:
            mensajeError = 'Error 429: Límite de envíos excedido. Intenta más tarde.';
            break;
          case 500:
            mensajeError = 'Error 500: Error interno del servidor de OneSignal';
            break;
          default:
            mensajeError = `Error HTTP ${error.status}: ${error.statusText || 'Error del servidor'}`;
        }
      } else if (error.error) {
        if (error.error.errors) {
          mensajeError = this.formatearErrores(error.error.errors);
        } else if (error.error.message) {
          mensajeError = error.error.message;
        } else {
          mensajeError = JSON.stringify(error.error);
        }
      } else if (error.message) {
        mensajeError = error.message;
      } else {
        // Para errores como {"isTrusted":true} que son eventos del navegador
        mensajeError = 'Error de conexión. Verifica tu conexión a internet y que el servidor esté funcionando.';
      }

      return {
        success: false,
        error: mensajeError
      };
    }
  }

  private esFechaFutura(fecha: string): boolean {
    const fechaEnvio = new Date(fecha);
    const ahora = new Date();
    return fechaEnvio > ahora;
  }

  private formatearErrores(errors: any): string {
    if (Array.isArray(errors)) {
      return errors.join(', ');
    } else if (typeof errors === 'object') {
      return Object.values(errors).join(', ');
    } else {
      return errors.toString();
    }
  }

  // Método para probar la conexión con OneSignal
  async probarConexion(): Promise<boolean> {
    try {
      const testNotification = {
        titulo: 'Prueba de conexión',
        mensaje: 'Esta es una notificación de prueba',
        fechaEnvio: new Date().toISOString()
      };

      const resultado = await this.enviarNotificacion(testNotification);
      return resultado.success;
    } catch (error) {
      console.error('Error en prueba de conexión:', error);
      return false;
    }
  }
}
