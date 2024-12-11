import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {
  message: string | null = null;
  messageType: string = '';

  constructor(private notificationService: NotificationService) {
    this.notificationService.message$.subscribe(msg => {
      if(msg) {
        const [type, ...content] = msg.split(': ');
        this.messageType = type.toLowerCase();
        this.message = content.join(': ');
      }else {
        this.message = null;
        this.messageType = '';
      }
    })
  }
}
