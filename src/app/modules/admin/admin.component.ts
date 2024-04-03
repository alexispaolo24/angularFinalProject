import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';

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
  selectedUser: User | undefined;

  constructor(private userService: UserService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  addUser() {
    this.userService.createUser(this.newUser).subscribe(() => {
      this.getUsers();
    }, (error) => {
      console.error('Failed to add user:', error);
    });
  }

  getUsers() {
    this.users$ = this.userService.getAllUsers();
  }

  deactivateUser(userId: number) {
    this.userService.deactivateUser(userId).subscribe(() => {
      this.getUsers();
    }, (error) => {
      console.error('Failed to deactivate user:', error);
    });
  }

  reActivateUser(userId: number) {
    this.userService.reActivateUser(userId).subscribe(() => {
      this.getUsers();
    }, (error) => {
      console.error('Failed to deactivate user:', error);
    });
  }

  editUser(user: User) {
    const dialogRef = this.dialog.open(EditComponent, {
      width: '1000px',
      panelClass: 'custom-dialog-container',
      data: user
    });

    dialogRef.afterClosed().subscribe(updatedUser => {
      if (updatedUser) {
        this.selectedUser = updatedUser; // Update selectedUser with the updated user data
        console.log('Updated user:', updatedUser);
        this.updateUser(); // Call updateUser after receiving the updated user data
      }
    });
  }

  updateUser() {
    if (this.selectedUser && this.selectedUser.id !== undefined) {
      this.userService.updateUser(this.selectedUser.id, this.selectedUser).subscribe(() => {
        this.getUsers(); // Refresh the user list after updating
        this.selectedUser = undefined; // Reset the selected user after updating
      }, (error) => {
        console.error('Failed to update user:', error);
      });
    } else {
      console.error('Invalid selected user or user ID:', this.selectedUser);
    }
  }
}
