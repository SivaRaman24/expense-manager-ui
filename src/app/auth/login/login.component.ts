import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  auth = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService) { }

  login() {
    this.authService.login(this.auth.email, this.auth.password).subscribe((res) => {
      console.log('loginResponse', res);
    });
  }
}
