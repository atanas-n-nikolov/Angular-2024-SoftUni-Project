import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('registerForm') form: NgForm | undefined;

  constructor(private userService: UserService, private router: Router) {}

  registerSubmitHandler() {
    if(this.form?.invalid) {
      console.log('This form is invalid!');
      return;
    };

    const {
      firstName,
      lastName,
      email,
      password,
      rePassword
    } = this.form?.value;
      
      this.userService.register(firstName, lastName, email, password).subscribe(() => {
        this.router.navigate(['/home'])
      })
  }
}
