import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { User } from '../user/model/user.interface';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { LoginResponse } from './model/loginResponse';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  API_BASE_URL = 'http://localhost:3000/auth';
  AUTH_TOKEN_KEY = 'authToken';
  LOGGED_IN_USER_DETAIL_KEY = 'authToken';
  _authToken: string | null | undefined;
  _loggedInUserDetails: any;

  isLoggedIn: boolean = false;

  constructor(private httpClient: HttpClient) {}

  setAuthToken(token: string) {
    localStorage.setItem(this.AUTH_TOKEN_KEY, token);
    this._authToken = token;
  }

  getAuthToken(): string | null | undefined {
    return this._authToken || localStorage.getItem(this.AUTH_TOKEN_KEY);
  }

  setAuthUserDetails(userDetail: any) {
    localStorage.setItem(this.LOGGED_IN_USER_DETAIL_KEY, userDetail);
    this._loggedInUserDetails = userDetail;
  }

  getAuthUserDetails(): string | null | undefined {
    return this._loggedInUserDetails || localStorage.getItem(this.LOGGED_IN_USER_DETAIL_KEY);
  }

  removeAuthUserDetails() {
    localStorage.removeItem(this.AUTH_TOKEN_KEY);
    this._authToken = null;
    this._loggedInUserDetails = null;
    this.isLoggedIn = false;
  }

  login(email: string, password: string) {
    const authDetails = {
      email,
      password,
    };
    return this.httpClient
      .post<LoginResponse>(`${this.API_BASE_URL}/login`, authDetails)
    // return this.httpClient
    //   .post<LoginResponse>(`${this.API_BASE_URL}/login`, authDetails)
    //   .pipe(
    //     tap((data) => {
    //       this.isLoggedIn = true;
    //     }),
    //     catchError(this.handleError)
    //   );
  }

  signUp(userDetails: User) {
    console.log(userDetails);
    return this.httpClient
      .post(`${this.API_BASE_URL}/signup`, userDetails)
      .pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    console.log('Handle Error', error);
    // this.isLoggedIn = false;
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  isAuthenticated(): boolean {
    return !!this.getAuthToken();
  }

  logout() {
    this.removeAuthUserDetails();
  }
}
