import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = [
    {id:1,username: 'alexis_paolo', email:'example@example.com', type:'admin', isActive: true, password: 'examplePassword123'}
  ]

  getUsers(){
    return [...this.users]
  }

  addUser(user:any){
    this.users.push(user)
  }

  deactivateUser(userId:number){
    const index = this.users.findIndex(user => user.id === userId)
    if(index !== -1){
      this.users[index].isActive = false
    }
  }
}
