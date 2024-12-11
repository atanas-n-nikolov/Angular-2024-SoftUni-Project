import { Component, OnInit } from '@angular/core';
import { Animals } from '../../types/animal';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../user/user.service';
import { LikeService } from '../like.service';

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
    private userService: UserService,
    private likeService: LikeService
  ) {}

  editAnimal(id: string) {
    this.router.navigate([`/animals/${id}/edit`]);
  }

  toggleLike(): void {

    if (!this.userId || !this.animalId) {
      return;
    }

    this.likeService.toggleLike(this.animalId, this.canLike, this.userId).subscribe(() => {
      this.animalLikes += this.canLike ? 1 : -1;
      this.canLike = !this.canLike;
    })
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
    this.userId = user?._id;

    if (this.animalId) {
      this.apiService.getAnimal(this.animalId).subscribe((animal) => {
        this.animal = animal;
        this.animalLikes = this.likeService.getLikesCount(animal);          
        if(this.userId) {
          this.isOwner = this.animal.owner.toString() === this.userId;
          if(!this.isOwner) {
            this.canLike = this.likeService.canLike(animal, this.userId);
          }

        }
        
      });
    } else {
      console.log('No animal id');
    }
  }
}
