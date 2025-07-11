import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import type { OverlayEventDetail } from '@ionic/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentesModule } from '../../componentes/componentes.module';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
  standalone: true, 
  imports: [CommonModule, IonicModule, RouterModule, ComponentesModule, FormsModule],
})
export class ModalPage implements OnInit {
  @ViewChild('modal') modal!: HTMLIonModalElement;

  message = 'Este modal está bonito';
  name!: string;

  constructor() {}

  ngOnInit() {}

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }

  onWillDismiss(event: CustomEvent<OverlayEventDetail>) {
    if (event.detail.role === 'confirm') {
      this.message = `Hello, ${event.detail.data}!`;
    }
  }
}