import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../user/model/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  login(email: string, password: string) {
    console.log(email, password);
    const authDetails = {
      email,
      password
    };
    return this.httpClient.post('http://localhost:3000/auth/login', authDetails);
  }

  signUp(user: User) {
    console.log(user);
  }

  logout() {}
}
