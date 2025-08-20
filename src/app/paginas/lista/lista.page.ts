import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentesModule } from 'src/app/componentes/componentes.module';

export interface lista{
  name: string,
  image: string
  phone: string,
  email: string,
}
@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],
  imports: [CommonModule, IonicModule,RouterModule, ComponentesModule],
})
export class ListaPage implements OnInit {

  Elementos: lista[]=[
    {
    name: 'Juan Fernando Zapata Cordova',
    image: 'assets/fotos/fer.jpg',
    phone: '8979713312',
    email: 'miamor@gmail.com'
    },
    {
    name: 'Valentín Rivera De Los Santos',
    image: 'assets/fotos/vale.jpg',
    phone: '8971235789',
    email: 'valenton@gmail.com'
    },
    {
    name: 'Juan Raúl Leal Treviño',
    image: 'assets/fotos/juan.jpg',
    phone: '8971235789',
    email: 'hotcake@gmail.com'
    },
    {
    name: 'Josué Jahaziel Carballo Garcia',
    image: 'assets/fotos/jahaziel.jpg',
    phone: '8971235789',
    email: 'jamita@gmail.com'
    },
    {
    name: 'Roberto Abdon Hernández García',
    image: 'assets/fotos/robert.jpg',
    phone: '8971235789',
    email: 'elrobert@gmail.com'
    },
    {
    name: 'Edxel Yahir Villarreal López',
    image: 'assets/fotos/edxel.jpg',
    phone: '8971235789',
    email: 'jihyo@gmail.com'
    },
    {
    name: 'Pimienta el lomito',
    image: 'assets/fotos/pimienta.jpg',
    phone: '8971235789',
    email: 'guau@gmail.com'
    },

  ]

  constructor() { }

  ngOnInit() {
  }

}
