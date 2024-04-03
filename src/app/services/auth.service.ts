import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  getUserRole(): string {
    return 'Admin'
  }

  isAdmin(): boolean{
    return this.getUserRole() === 'Admin'
  }
}