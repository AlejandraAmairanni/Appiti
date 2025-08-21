import { Component, OnInit, inject } from '@angular/core';
import { NotificacionService } from './services/notificacion.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  private notificationService: NotificacionService = inject(NotificacionService);
  
  async ngOnInit(): Promise<void> {
    await this.notificationService.init();
  }
  
  constructor() {}
}