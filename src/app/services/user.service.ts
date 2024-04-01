import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {// private users: any[] = [
  //   {id:1,username: 'alexis_paolo', email:'example@example.com', type:'admin', isActive: true, password: 'examplePassword123'}
  // ]

  serverUrl = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  // getUsers(){
  //   return [...this.users]
  // }

  getUsers = (): Observable<Object> => {
    return this.http.get(`${this.serverUrl}/users`)
  }

  // addUser(user:any){
  //   this.users.push(user)
  // }

  createUser(user:User) {
    return this.http.post(`${this.serverUrl}/users`, user).pipe(
      tap(x => {
        console.log('creating', x);
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
}
