import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { SignupFormFields } from '../model/signup-form-fields.interface';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  user!: SignupFormFields;
  isSignupSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      mobileNumber: '',
    };
  }

  signup() {
    this.authService
      .signUp({
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        password: this.user.password,
        mobileNumber: this.user.mobileNumber,
      })
      .subscribe(
        (res) => {
          this.isSignupSuccess = true;
          setTimeout(() => {
            this.router.navigate(['auth/login']);
          }, 3000);
        }
      );
  }
}
