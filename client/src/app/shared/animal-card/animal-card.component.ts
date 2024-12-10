import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Animals } from '../../types/animal';
import { LikeService } from '../like.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-animal-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './animal-card.component.html',
  styleUrl: './animal-card.component.css'
})
export class AnimalCardComponent implements OnInit{
  @Input() animal!: Animals;
  userId: string = '';
  canLike: boolean = false;
  isOwner: boolean = false;

  constructor(private likeService: LikeService, private userService: UserService) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.userId = user?._id || '';

    // Преобразуване на owner на string (в случай че е обект)
    const ownerId = typeof this.animal.owner === 'string' ? this.animal.owner : this.animal.owner?._id;

    // Проверка дали текущият потребител е собственик
    this.isOwner = ownerId === this.userId;

    // Проверка дали бутонът "Like" трябва да се показва
    this.canLike = 
      this.animal.status === 'Adopt' && // Само за Adopt статус
      !this.isOwner &&                  // Ако не е собственик
      !this.animal.likes.includes(this.userId); 
  }

  toggleLike(animal: Animals) {
    if (this.isOwner || this.animal.status !== 'Adopt') return;

    const currentLikeState = this.likeService.canLike(this.animal, this.userId);

    this.likeService.toggleLike(this.animal._id, currentLikeState, this.userId).subscribe(() => {
      this.canLike = !currentLikeState;

      if (currentLikeState) {
        this.animal.likes = this.animal.likes.filter(id => id !== this.userId);
      } else {
        this.animal.likes.push(this.userId);
      }
    });
  }
}
