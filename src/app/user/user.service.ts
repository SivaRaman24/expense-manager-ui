import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getUserDetail(email: string) {}

  isAuthenticated(): boolean {
    return true;
  }
}
