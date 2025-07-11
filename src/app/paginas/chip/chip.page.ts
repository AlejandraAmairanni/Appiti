import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-chip',
  templateUrl: './chip.page.html',
  styleUrls: ['./chip.page.scss'],
  imports: [CommonModule, IonicModule,RouterModule], 
})
export class ChipPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
