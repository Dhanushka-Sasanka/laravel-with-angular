import { NotificationType } from './../enum/notificaiton-type.enum';
import { Injectable } from '@angular/core';
import { NotifierService } from 'angular-notifier';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifierService: NotifierService) { }

  public notify(type: NotificationType, message: string) {
    console.log("weda");
    
    this.notifierService.notify(type, message);
    console.log("wedawww");
  }
}
