import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent implements OnInit {
  message$: Observable<{ message: string, type: 'success' | 'error' } | null>;  message: string | null = null;
  messageType: 'success' | 'error' | 'info' | 'warning' = 'success';
  showNotification: boolean = false;

  constructor(private notificationService: NotificationService) {
    this.message$ = this.notificationService.message$;
  }

  ngOnInit(): void {
    this.message$.subscribe((msg) => {
      if (msg) {
        this.message = msg.message;
        this.messageType = msg.type;
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 3000); 
      } else {
        this.message = null;
      }
    });
  }

  getClasses() {
    return {
      'show': this.showNotification,
      'hide': !this.showNotification,
      [this.messageType]: true
    };
  }

  clearMessage() {
    this.showNotification = false;
  }
}
