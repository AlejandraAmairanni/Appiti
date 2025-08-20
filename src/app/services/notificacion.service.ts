import { Injectable } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { PushNotifications } from '@capacitor/core';
import OneSignal from 'onesignal-cordova-plugin';
import { environment } from 'src/environments/environment.prod';
import { Browser } from '@capacitor/browser';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  init(){
    const isPushNotificationAvailable = Capacitor.
    isPluginAvailable('PushNotifications');

    if(isPushNotificationAvailable){
      PushNotifications.requestPermissions().then( (result)
      => {
        if(result.receive){
          OneSignal.initialize(environment.oneSignalID)

          OneSignal.Notifications.addEventListener('click',
            (e) => {
            const notification = e.notification;
            if(notification.additionalData['url']){
              await Browser.open(notification.additionalData
              ['url'])
            }
          })
        }
      })
    }
  }

  constructor() { }
}
