import { Component, OnInit } from '@angular/core';
import { Animals } from '../../types/animal';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  animal: Animals | undefined;
  animalId: string | undefined;
  canLike: boolean = false;
  userId: string | undefined
  animalLikes: number = 0;
  isOwner: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private userService: UserService
  ) {}

  editAnimal(id: string) {
    this.router.navigate([`/animals/${id}/edit`]);
  }

  toggleLike(): void {

    if (!this.userId) {
      return;
    }

    if (!this.animalId) {
      return;
    }

    if (this.canLike) {
      this.userService.addLike(this.animalId, this.userId).subscribe(() => {
        this.animalLikes++;
        this.canLike = false;
      });
    } else {
      this.userService.removeLike(this.animalId, this.userId).subscribe(() => {
        this.animalLikes--;
        this.canLike = true;
      });
    }
  }

  deleteAnimal(id: string) {
      const confirmed = confirm('Are you sure you want to delete this animal?');
      if (confirmed) {
        this.apiService.deleteAnimal(id).subscribe(
          () => {
            alert('Animal deleted successfully!');
            this.router.navigate(['/home']);
          },
          (error) => {
            console.error(error);
            alert('Error deleting animal');
          }
        );
      }
  }

  ngOnInit(): void {
    this.animalId = this.route.snapshot.params['id'];
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    this.userId = user._id;

    if (user && user._id) {
      this.userId = user._id;
    }

    if (this.animalId) {
      this.apiService.getAnimal(this.animalId).subscribe((animal) => {
        this.animal = animal;
        this.animalLikes = animal.likes.length;
        if(this.userId) {
          this.isOwner = this.animal.owner.toString() === this.userId;
          this.canLike = !this.isOwner && !this.animal.likes.some(id => id === this.userId)
        }
        
      });
    } else {
      console.log('No animal id');
    }
  }
}
