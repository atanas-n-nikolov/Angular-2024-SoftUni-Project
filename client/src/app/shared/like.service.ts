import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { Animals } from '../types/animal';
import { catchError, Observable, of } from 'rxjs';
import { NotificationService } from './notification.service';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(
    private apiService: ApiService,
    private userService: UserService,
    private notificationSevice: NotificationService
  ) {}

  canLike(animal: Animals, userId: string): boolean {
    return !animal.likes.includes(userId);
  }

  toggleLike(
    animalId: string,
    canLike: boolean,
    userId: string
  ): Observable<unknown> {
    const likeAction = canLike
      ? this.userService.addLike(animalId, userId)
      : this.userService.removeLike(animalId, userId);
    return likeAction.pipe(
      catchError((error) => {
        console.log('Error toggling like:', error);
        this.notificationSevice.showMessage(
          'An error occurred while updating the like status.',
          'error'
        );
        return of(null);
      })
    );
  }

  getLikesCount(animal: Animals): number {
    return animal.likes.length;
  }
}
