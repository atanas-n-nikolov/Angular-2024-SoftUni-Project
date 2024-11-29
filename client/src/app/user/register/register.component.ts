import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  @ViewChild('registerForm') form: NgForm | undefined;

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

    console.log(firstName,
      lastName,
      email,
      password,
      rePassword);
  }
}
