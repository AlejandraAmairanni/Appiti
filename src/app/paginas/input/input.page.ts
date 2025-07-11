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
  nombre: string = 'Alejandra Amairanni';
  apellidos: string = 'Vázquez Abundiz';
  edad: string = '22';
  fechaNacimiento: string = '2002-11-21'; 


  constructor() { }

  ngOnInit() {
  }

}
