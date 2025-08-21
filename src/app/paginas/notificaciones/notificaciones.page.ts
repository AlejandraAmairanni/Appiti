import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NotificacionService } from '../../services/notificacion.service';
import { AlertController, LoadingController } from '@ionic/angular';

interface NotificacionData {
  titulo: string;
  mensaje: string;
  url?: string;
  fechaEnvio?: string;
}

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule, FormsModule], 
})
export class NotificacionesPage implements OnInit {

  // Datos del formulario
  notificacion: NotificacionData = {
    titulo: '',
    mensaje: '',
    url: '',
    fechaEnvio: this.obtenerFechaActual()
  };

  private obtenerFechaActual(): string {
    // Crear una nueva fecha con la hora actual real
    const ahora = new Date();
    
    // Verificar que estamos obteniendo la fecha correcta
    console.log('Fecha completa del sistema:', ahora.toString());
    console.log('Timestamp:', ahora.getTime());
    
    // Formatear manualmente para asegurar la fecha correcta
    const year = ahora.getFullYear();
    const month = String(ahora.getMonth() + 1).padStart(2, '0');
    const day = String(ahora.getDate()).padStart(2, '0');
    const hours = String(ahora.getHours()).padStart(2, '0');
    const minutes = String(ahora.getMinutes()).padStart(2, '0');
    
    const fechaFormateada = `${year}-${month}-${day}T${hours}:${minutes}`;
    
    console.log('Fecha formateada para input:', fechaFormateada);
    console.log('Detalles:', {
      año: year,
      mes: month,
      día: day,
      hora: hours,
      minutos: minutes,
      zonaHoraria: Intl.DateTimeFormat().resolvedOptions().timeZone
    });
    
    return fechaFormateada;
  }

  enviando = false;
  mensajeEstado = '';
  tipoEstado: 'success' | 'danger' | 'warning' = 'success';

  constructor(
    private notificacionService: NotificacionService,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) { }

  ngOnInit() {
    // Establecer fecha actual por defecto usando la función local
    this.notificacion.fechaEnvio = this.obtenerFechaActual();
  }

  async enviarNotificacion() {
    if (!this.notificacion.titulo || !this.notificacion.mensaje) {
      await this.mostrarAlerta('Error', 'Por favor completa todos los campos obligatorios.');
      return;
    }

    const loading = await this.loadingController.create({
      message: 'Enviando notificación...',
      spinner: 'crescent'
    });
    await loading.present();

    this.enviando = true;
    this.mensajeEstado = '';

    try {
      const resultado = await this.notificacionService.enviarNotificacion(this.notificacion);
      
      if (resultado.success) {
        this.mensajeEstado = 'Notificación enviada exitosamente';
        this.tipoEstado = 'success';
        this.limpiarFormulario();
        await this.mostrarAlerta('Éxito', 'La notificación se ha enviado correctamente.');
      } else {
        this.mensajeEstado = 'Error al enviar la notificación: ' + resultado.error;
        this.tipoEstado = 'danger';
      }
    } catch (error) {
      console.error('Error al enviar notificación:', error);
      this.mensajeEstado = 'Error inesperado al enviar la notificación';
      this.tipoEstado = 'danger';
      await this.mostrarAlerta('Error', 'Ocurrió un error inesperado. Por favor intenta nuevamente.');
    } finally {
      this.enviando = false;
      await loading.dismiss();
    }
  }

  private limpiarFormulario() {
    this.notificacion = {
      titulo: '',
      mensaje: '',
      url: '',
      fechaEnvio: this.obtenerFechaActual()
    };
    this.mensajeEstado = '';
  }

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

}
