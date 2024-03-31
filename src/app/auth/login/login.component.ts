import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
  loginSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    console.log('login details', this.auth);
    this.authService
      .login(this.auth.email, this.auth.password)
      .subscribe((res) => {
        console.log('loginResponse', res);
        // localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
        this.authService.setAuthToken(res.authToken);
        this.authService.setAuthToken(res.authToken);
        this.router.navigate(['/transactions'])
      });
  }
}
