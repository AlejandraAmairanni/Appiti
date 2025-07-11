import { Component, OnInit } from '@angular/core';
import { AlertController, IonAlert, IonButton } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.page.html',
  styleUrls: ['./alert.page.scss'],
  imports: [CommonModule, IonicModule,RouterModule, ComponentesModule],
  
})

export class AlertPage implements OnInit {

  constructor(private CtrlAlert: AlertController) { }

  ngOnInit() {
  }

  
  async funcionalerta1() {
    const alert = await this.CtrlAlert.create({
      header: 'A Header.',
      subHeader: 'A Sub Header.',
      message: 'A short message.',
      buttons: ['Action'],
    });

    await alert.present();
  }


  async funcioninput() {
    const alert = await this.CtrlAlert.create({
      header: 'Introduzca los siguientes datos:',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre',
        },
        {
          name: 'apellidoPaterno',
          type: 'text',
          placeholder: 'Apellido Paterno',
          attributes: {
            maxlength: 20,
          },
        },
        {
          name: 'apellidoMaterno',
          type: 'text',
          placeholder: 'Apellido Materno',
          attributes: {
            maxlength: 20,
          },
        },
        {
          name: 'edad',
          type: 'number',
          placeholder: 'Edad',
          min: 1,
          max: 100,
          
        },
        
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
      },
      {
        text: 'OK',
        handler: (data) => {
          console.log(data);
      },
    },
    ],
    });

    await alert.present();
  }
  async funcionconsola() {
  const alert = await this.CtrlAlert.create({
    header: 'Confirma',
    message: 'Estás seguro de proceder?',
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        handler: () => {
          console.log('Alerta cancelada');
        },
      },
      {
        text: 'OK',
        role: 'confirm',
        handler: () => {
          console.log('Bienvenido');
        },
      },
    ],
  });

  await alert.present();
}

  async funcionalertap(){
    const alertaPersonalizada = await this.CtrlAlert.create({
    backdropDismiss: false,
    header: '¿Qué quieres hacer con tu producto?',
    subHeader: 'Soy algo referente al producto que debes de elegir',
    message: 'Selecciona una opción.',
    
    buttons: ['Guardar', 'Borrar', 'Cancelar'],
    });
    await alertaPersonalizada.present();
  };

}
