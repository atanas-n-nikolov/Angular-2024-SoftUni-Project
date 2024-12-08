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

  editAnimal(id: string) {
    this.router.navigate([`/animals/${id}/edit`]);
  }

  toggleLike(): void {}

  deleteAnimal(id: string) {
    
  }

  ngOnInit(): void {
    this.animalId = this.route.snapshot.params['id'];
    if (this.animalId) {
      this.apiService.getAnimal(this.animalId).subscribe((animal) => {
        this.animal = animal;
        this.animalLikes = animal.likes.length;
      });
    } else {
      console.log('No animal id');
    }
  }
}
