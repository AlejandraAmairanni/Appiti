import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentesModule } from '../../componentes/componentes.module';


@Component({
  selector: 'app-fab',
  templateUrl: './fab.page.html',
  styleUrls: ['./fab.page.scss'],
  imports: [CommonModule, IonicModule,RouterModule, ComponentesModule],
})



export class FabPage implements OnInit {
  items = Array(140);
  constructor() { }

  ngOnInit() {
  }


}