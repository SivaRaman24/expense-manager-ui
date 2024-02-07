import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SignupFormFields } from '../model/signup-form-fields.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  user!: SignupFormFields;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  signup() {
    this.authService.signUp({
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      password: this.user.password
    });
  }
}
