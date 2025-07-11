import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.page.html',
  styleUrls: ['./popover.page.scss'],
  imports: [CommonModule, IonicModule,RouterModule],
})
export class PopoverPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
