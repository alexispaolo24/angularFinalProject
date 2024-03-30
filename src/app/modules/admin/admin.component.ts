import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  users: any[] = []

  constructor(private userService:UserService){
    this.users = this.userService.getUsers()
  }

  addUser(){

  }

  deactivateUser(userId: number){
    this.userService.deactivateUser(userId)
    this.users = this.userService.getUsers()
  }
}
