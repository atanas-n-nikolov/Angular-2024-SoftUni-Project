import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../types/user';
import { AnimalCardComponent } from '../../shared/animal-card/animal-card.component';
import { FormsModule, NgForm } from '@angular/forms';
import { NotificationService } from '../../shared/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AnimalCardComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit, OnDestroy {
  user: User | null = null;
  isEditMode: boolean = false;
  animalLength: number = 0;
  likedLength: number = 0;
  @ViewChild('profileForm') form: NgForm | undefined;
  private profileSubscription: Subscription | undefined;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
      },
      error: (error) => {
        this.notificationService.showMessage(
          'Failed to load profile data.',
          'error'
        );
      },
    });
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  }

  profileEdit() {
    if (this.form?.invalid) {
      this.notificationService.showMessage(
        'Please fill in all the required fields.',
        'error'
      );
      return;
    }

    const { firstName, lastName, email } = this.form?.value;

    this.userService.updateProfile(firstName, lastName, email).subscribe({
      next: () => {
        this.userService.getProfile().subscribe({
          next: (user) => {
            this.user = user;
            this.toggleEditMode();
          },
          error: (err) => {
            this.notificationService.showMessage(
              'Failed to update profile. Please try again later.',
              'error'
            );
          },
        });
      },
      error: (err) => {
        this.notificationService.showMessage(
          'Error updating profile. Please try again later.',
          'error'
        );
      },
    });
  }

  ngOnDestroy(): void {
    if (this.profileSubscription) {
      this.profileSubscription.unsubscribe();
    }
  }
}
