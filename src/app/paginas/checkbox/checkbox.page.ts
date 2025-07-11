import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.page.html',
  styleUrls: ['./checkbox.page.scss'],
  imports: [CommonModule, IonicModule,RouterModule, FormsModule], 
})
export class CheckboxPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  infoNombres = [
    {
      name: 'Zapata Cordova',
      beca: true
    },
    {
      name: 'Leal Treviño',
      beca: false
    },
    {
      name: 'Rivera De los Santos',
      beca: true
    }
  ]

}
