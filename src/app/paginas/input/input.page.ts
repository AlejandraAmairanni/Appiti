import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.page.html',
  styleUrls: ['./input.page.scss'],
  imports: [CommonModule, IonicModule,RouterModule, FormsModule],
})
export class InputPage implements OnInit {
   alumnos = [
    {
      nombre: 'Amairanni ',
      apellidopaterno: 'Vázquez',
      apellidomaterno: 'Abundiz',
      matricula: '202000056',
      fechaNacimiento: '2002-11-21'
    },
  ];

  constructor() { }

  ngOnInit() { }

  calcularEdad(fechaNacimiento: string): number {
    if (!fechaNacimiento) return 0;
    const hoy = new Date();
    const fechaNac = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mes = hoy.getMonth() - fechaNac.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
      edad--;
    }
    return edad;
  }

  get edad() {
    return this.calcularEdad(this.alumnos[0].fechaNacimiento);
  }



}
