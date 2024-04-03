import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  users$: Observable<User[]> | undefined;

  newUser: User = {
    username: '',
    email: '',
    type: '',
    isActive: true,
    password: '',
    firstName: '',
    middleName: '',
    lastName: '',
    mobileNo: '',
    listOfInterests: []
  };

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
  }

  addUser(form: NgForm) {
    console.log(this.newUser);
    this.userService.createUser(this.newUser).subscribe(() => {
      this.getUsers();
    }, (error) => {
      console.error('Failed to add user:', error);
    });
    form.resetForm();
  }
  
  
  

  getUsers() {
    this.users$ = this.userService.getAllUsers();
  }

  deactivateUser(userId: number) {
    this.userService.deactivateUser(userId).subscribe(() => {
      this.getUsers(); // Refresh the list of users after deactivating a user
    }, (error) => {
      console.error('Failed to deactivate user:', error);
    });
  }
}