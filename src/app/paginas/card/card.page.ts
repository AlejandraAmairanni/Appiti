import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
  imports: [CommonModule, IonicModule,RouterModule, ComponentesModule], 
})
export class CardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}