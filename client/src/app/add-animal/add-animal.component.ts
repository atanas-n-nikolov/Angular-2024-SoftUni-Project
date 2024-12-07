import { Component, ViewChild,  } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-animal',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-animal.component.html',
  styleUrl: './add-animal.component.css'
})
export class AddAnimalComponent {
@ViewChild('createForm') form: NgForm | undefined;
userId: string | undefined;

constructor(private userService: UserService, private router: Router) {}

  createAnimal() {
    if(this.form?.invalid) {
      console.log('Creating form is invalid!');
      return;
    };

    const {
      status,
      name,
      type,
      age,
      size,
      gender,
      specialNeeds,
      location,
      image,
      description
    } = this.form?.value;
    this.userService.createAnimal(status,
      name,
      type,
      age,
      size,
      gender,
      specialNeeds,
      location,
      image,
      description).subscribe(() => {
        this.router.navigate(['/home'])
      })
  }
}
