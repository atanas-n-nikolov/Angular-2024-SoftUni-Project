import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private messageSubject = new BehaviorSubject<string | null>(null);
  message$ = this.messageSubject.asObservable();
  
  showMessage(message: string, type: 'success' | 'error' = 'success', duration: number = 3000):void {
    this.messageSubject.next(`${type.toLocaleLowerCase()}: ${message}`);
    setTimeout(() => this.clearMessage(), duration);
  };

  clearMessage():void {
    this.messageSubject.next(null);
  };
  
   constructor() { }
}
