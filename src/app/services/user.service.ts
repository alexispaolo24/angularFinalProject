import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from '../models/user';
import { switchMap } from 'rxjs/operators';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private users: any[] = [
  //   {id:1,username: 'alexis_paolo', email:'example@example.com', type:'admin', isActive: true, password: 'examplePassword123'}
  // ]

  serverUrl = 'http://localhost:3000';
  constructor(private http: HttpClient,
    private cartService: CartService) { }

  // getUsers(){
  //   return [...this.users]
  // }

  getUsers(username: string, password: string): Observable<User> {
    return this.http.get<User[]>(`${this.serverUrl}/users`).pipe(
      catchError((error) => {
        return throwError('Failed to retrieve user data');
      }),
      map((users: User[]) => {
        const user = users.find((u) => u.username === username);
        if (!user) {
          throw new Error('User not found');
        }
        if (user.password !== password) {
          throw new Error('Invalid password');
        }
        user.type === 'admin';
        return user;
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.serverUrl}/users`).pipe(
      catchError((error) => {
        return throwError('Failed to retrieve user data');
      })
    );
  }

  // addUser(user:any){
  //   this.users.push(user)
  // }

  // createUser(user: User): Observable<any> {
  //   return this.http.post(`${this.serverUrl}/users`, user).pipe(
  //     tap(response => {
  //       console.log('Response from server:', response);
  //     }),
  //     catchError(error => {
  //       console.error('Error creating user:', error);
  //       return throwError('Failed to create user');
  //     })
  //   );
  // }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.serverUrl}/users`, user).pipe(
      tap((response: any) => {
        console.log('Response from server:', response);
      }),
      switchMap((response: any) => {
        const userId = response.id; // Assuming the API returns the ID of the newly created user
        // Create an empty cart for the user
        return this.cartService.createEmptyCart(userId);
      }),
      catchError(error => {
        console.error('Error creating user:', error);
        return throwError('Failed to create user');
      })
    );
  }
  

  // deactivateUser(userId:number){
  //   const index = this.users.findIndex(user => user.id === userId)
  //   if(index !== -1){
  //     this.users[index].isActive = false
  //   }
  // }

  deactivateUser(userId: number): Observable<any> {
    console.log("calling deactivate in service");
    return this.http.get<any>(`${this.serverUrl}/users/${userId}`).pipe(
      tap((user: User) => {
        user.isActive = false;
        console.log(user.username)
        return this.http.put(`${this.serverUrl}/users/${userId}`, user).subscribe();
      }),
    //switchMap(() => this.getUsers())
    );
  }

  resetPassword(username: string, email: string, mobileNo: string): Observable<string> {
    // Fetch the user by username, email, and mobile number
    return this.http.get<User[]>(`${this.serverUrl}/users?username=${username}&email=${email}&mobileNo=${mobileNo}`).pipe(
      catchError((error) => {
        return throwError('Failed to retrieve user data');
      }),
      switchMap((users: User[]) => {
        const user = users.find((u) => u.username === username && u.email === email && u.mobileNo === mobileNo);
        if (!user) {
          return throwError('User not found');
        }
        // Return the user's password
        return of(user.password);
      }),
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}