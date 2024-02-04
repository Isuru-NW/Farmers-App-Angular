import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomValidators } from '../../custom-validator';
import { AuthService } from '../../services/auth-service/auth.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  roles = ['Admin', 'Wholesale Buyer', 'Retail Buyer', 'Farmer'];

  registerForm = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    role: new FormControl(null, [Validators.required]),
    firstname: new FormControl(null, [Validators.required]),
    lastname: new FormControl(null, [Validators.required]),
    password: new FormControl(null, [Validators.required]),
    passwordConfirm: new FormControl(null, [Validators.required]),
  },
  { validators: CustomValidators.passwordsMatching }
  );
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private http: HttpClient
  ) { }

  registrationFailure = false;
  registrationErrorMessage = '';

  private handleLoginFailure(errorMessage: string): void {
    console.error('Registration failed:', errorMessage);
    this.registrationFailure = true;
    this.registrationErrorMessage = errorMessage;
  }

  register() {
      const email = this.registerForm.get('email')?.value;
      const role = this.registerForm.get('role')?.value;
      const firstname = this.registerForm.get('firstname')?.value;
      const lastname = this.registerForm.get('lastname')?.value;
      const password = this.registerForm.get('password')?.value;

      // Assuming your API endpoint is something like the following
      const apiUrl = `https://localhost:44323/register/${email}/${role}/${firstname}/${lastname}/${password}`;
      console.log(apiUrl);
      this.http.post(apiUrl,{}).subscribe(
        (response: any) => {
          if (response && response.success === true) {
            console.log("Registration successful");
            this.router.navigate(['/login']);
          } else {
            this.handleLoginFailure(response?.error || 'An unknown error occurred');
          }
        },
        (error) => {
          console.error('API call error:', error);
          this.handleLoginFailure('Error occurred during registration. User already exists.');
        }
      );
  }
}
