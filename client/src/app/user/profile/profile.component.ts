import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../types/user';
import { AnimalCardComponent } from '../../shared/animal-card/animal-card.component';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AnimalCardComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: User | null = null;
  isEditMode: boolean = false;
  animalLength: number = 0;
  likedLength: number = 0;
  @ViewChild('profileForm') form: NgForm | undefined;

  constructor(private route: ActivatedRoute, private userService: UserService) {};

  ngOnInit(): void {
  this.userService.getUser().subscribe({
    next: (user) => {
      if (user) {
        this.user = user;
        this.animalLength = user.createdAnimals?.length || 0;
        this.likedLength = user.likedAnimals?.length || 0;
      } else {
        this.user = null;
        this.animalLength = 0;
        this.likedLength = 0;
      }
    },
    error: (err) => {

    }
  })

  
  }

  toggleEditMode() {
    this.isEditMode = !this.isEditMode;
  };

  profileEdit() {
    if(this.form?.invalid) {
      return;
    };

    const {
      firstName,
      lastName,
      email
    } = this.form?.value;

    this.userService.updateProfile(firstName, lastName, email).subscribe(() => {
      this.userService.getUser().subscribe((user) => {
        this.user = user;
        this.toggleEditMode();
      })
    });
  }

  }
