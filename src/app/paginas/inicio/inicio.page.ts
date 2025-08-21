import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


interface estlista{
  name: string;
  redirectTo: string;
  icon: string;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  imports: [CommonModule, IonicModule, RouterModule], 
  
})
export class InicioPage implements OnInit {

  Elementos: estlista[] = [
    {
      name: 'Alert',
      redirectTo: '/alert',
      icon: 'warning-outline',
    },
    {
      name: 'Card',
      redirectTo: '/card',
      icon: 'albums-outline',
    },
    {
      name: 'Chip', 
      redirectTo: '/chip',
      icon: 'egg-outline'
    },
    {
      name: 'Checkbox', 
      redirectTo: '/checkbox',
      icon: 'checkbox-outline'
    },
    {
      name: 'Fab', 
      redirectTo: '/fab',
      icon: 'add-circle-outline'
    },
    {
      name: 'DateTime', 
      redirectTo: '/datetime',
      icon: 'calendar-outline'
    },
      {
      name: 'Grid', 
      redirectTo: '/grid',
      icon: 'grid-outline'
    },
    {
      name: 'Infinite Scroll', 
      redirectTo: '/infinity',
      icon: 'infinite-outline'
    },
    {
      name: 'Input', 
      redirectTo: '/input',
      icon: 'create-outline'
    },
    {
      name: 'Pop Over', 
      redirectTo: '/popover',
      icon: 'chatbox-outline'
    },
    {
      name: 'Modal', 
      redirectTo: '/modal',
      icon: 'browsers-outline'
    },
    {
      name: 'List',
      redirectTo: '/lista',
      icon: 'list-outline'
    },{
      name: 'Notificaciones',
      redirectTo: '/notificaciones',
      icon: 'notifications-outline'
    }
  
  ];

  constructor() { }

  ngOnInit() {
  }

  

}