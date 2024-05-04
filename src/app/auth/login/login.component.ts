import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { Observable, catchError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  auth = {
    email: '',
    password: '',
  };
  loginSuccess: boolean;
  formSubmitted: boolean;

  constructor(private authService: AuthService, private router: Router) {}

  login() {

    if (!this.auth.email || !this.auth.password) return false;

    this.formSubmitted = true;
    this.authService.login(this.auth.email, this.auth.password).subscribe({
      next: (res) => {
        this.loginSuccess = true;
        this.formSubmitted = false;
        // localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
        this.authService.setAuthToken(res.authToken);
        this.router.navigate(['/transactions']);
      },
      error: (errRes) => {
        this.loginSuccess = false;
        console.log(errRes);
      }
    });
  }
}
