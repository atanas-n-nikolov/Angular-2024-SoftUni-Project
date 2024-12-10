import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { UserService } from '../user/user.service';
import { Animals } from '../types/animal';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikeService {

  constructor(private apiService: ApiService, private userService: UserService) {}

  canLike(animal: Animals, userId: string): boolean {
    return !animal.likes.includes(userId);
  }

  toggleLike(animalId: string, canLike: boolean, userId: string): Observable<any> {
    return canLike ? this.userService.addLike(animalId, userId) : this.userService.removeLike(animalId, userId);
  }

  getLikesCount(animal: any): number {
    return animal.likes.length;
  }
}
