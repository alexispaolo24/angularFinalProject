import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  users: Observable<any>;

  constructor(private userService:UserService){
    this.users = this.userService.getUsers()
  }

  addUser(){

  }

  getUsers() {
    this.userService.getUsers().subscribe();
  }

  deactivateUser(userId: number){
    this.userService.deactivateUser(userId).subscribe();
  }
}
