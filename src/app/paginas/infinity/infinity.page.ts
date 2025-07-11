import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentesModule } from '../../componentes/componentes.module';

@Component({
  selector: 'app-infinity',
  templateUrl: './infinity.page.html',
  styleUrls: ['./infinity.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule, ComponentesModule],
})
export class InfinityPage implements OnInit {
  datos: any[] = [];

  constructor() {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    const add = Array(28).fill(null);
    this.datos.push(...add);
  }

  loadMore(event: any) {
    setTimeout(() => {
      this.loadData();
      event.target.complete();
    }, 500); 
  }
}