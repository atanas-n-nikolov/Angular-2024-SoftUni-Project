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
  userLike = false;
  userId: string | undefined;
  animalLikes: number = 0;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private userService: UserService
  ) {}

  toggleLike(): void {}

  ngOnInit(): void {
    this.animalId = this.route.snapshot.params['id'];
    if (this.animalId) {
      this.apiService.getAnimal(this.animalId).subscribe((animal) => {
        this.animal = animal;
        this.animalLikes = animal.likes.length;

        this.userService
          .getProfile()
          .subscribe((user) => (this.userId = user._id));
        this.userLike = this.animal?.likes.some(
          (like) => like.user?._id === this.userId
        );
      });
    } else {
      console.log('No animal id');
    }
  }
}
