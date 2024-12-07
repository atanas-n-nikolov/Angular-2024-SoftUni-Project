import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from '../../types/user';
import { AnimalCardComponent } from '../../shared/animal-card/animal-card.component';
import { FormsModule, NgForm } from '@angular/forms';
import { Animals } from '../../types/animal';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [AnimalCardComponent, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  user: User | undefined;
  isEditMode: boolean = false;
  animalLength: number = 0;
  likedLength: number = 0;
  @ViewChild('profileForm') form: NgForm | undefined;

  constructor(private route: ActivatedRoute, private userService: UserService) {};

  ngOnInit(): void {
  this.userService.getProfile().subscribe((user) => {
    this.user = user;
    this.animalLength = user.createdAnimals!.length;
    this.likedLength = user.likedAnimals!.length;
  });
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
      this.userService.getProfile().subscribe((user) => {
        this.user = user;
        this.toggleEditMode();
      })
    });
  }

  }
