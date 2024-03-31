import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ExceptionService implements ErrorHandler {

  constructor(private router: Router, private authService: AuthService) {}

  handleError(error: HttpErrorResponse): void {
    console.warn('There is an error in our application');
    console.error(error, error.status);
    if(error && error.status) {
      switch(error.status) {
        case 401: // UnAuthenticated user
          this.handleUnAuthenticated(error);
          break;
        case 403: // Forbidden - Insufficient privileges to access the requested file.
          this.handleUnAuthorized(error);
          break;
      }
    }
  }

  handleUnAuthenticated(err: HttpErrorResponse): void {
    console.warn('User is not authenticated', err);
    this.authService.removeAuthUserDetails();
    this.router.navigate(['auth/login']);
  }

  handleUnAuthorized(err: HttpErrorResponse): void {
    console.warn('User is not having permission', err);
    alert("You don't have permission!");
  }
}
