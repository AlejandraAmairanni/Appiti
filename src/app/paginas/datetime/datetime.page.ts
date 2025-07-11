import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ComponentesModule } from 'src/app/componentes/componentes.module';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-datetime',
  templateUrl: './datetime.page.html',
  styleUrls: ['./datetime.page.scss'],
    imports: [
    RouterModule,
    IonicModule,
    CommonModule,
    ComponentesModule]
})
export class DatetimePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
selectDate: string = new Date().toISOString();
formattedDate: string = '';

date(): void {
  console.log('Fecha actual:', this.selectDate);
}

getDate(event: any): void {
  const selectedValue = event.detail?.value;
  if (selectedValue) {
    const date = new Date(selectedValue);

    this.formattedDate = date.toLocaleDateString('es-MX', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    this.selectDate = selectedValue;

    console.log('Fecha seleccionada:', this.formattedDate);
  }
}

  
}