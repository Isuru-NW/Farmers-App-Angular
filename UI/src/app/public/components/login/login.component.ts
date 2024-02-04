import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';  // Ensure this import statement is present
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) { }

  loginFailure = false;
  loginErrorMessage = '';

  private handleLoginFailure(errorMessage: string): void {
    console.error('Login failed:', errorMessage);
    this.loginFailure = true;
    this.loginErrorMessage = errorMessage;
  }

  login() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      // Assuming your API endpoint is something like the following
      const apiUrl = `https://localhost:44323/login/${username}/${password}`;

      this.http.get(apiUrl).subscribe(
        (response: any) => {
          if (response && response.success === true) {
            console.log("Login successful");
            this.router.navigate(['../../dashboard']);
          } else {
            this.handleLoginFailure(response?.error || 'An unknown error occurred');
          }
        },
        (error) => {
          console.error('API call error:', error);
          this.handleLoginFailure('An unknown error occurred during login. Invalid user');
        }
      );
    }
  }
}
