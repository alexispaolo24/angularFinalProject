import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EditComponent } from '../edit/edit.component';import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  username: string = '';
  isAdmin: boolean = false;
  users$: Observable<User[]> | undefined;
  currentPage: number = 1;
  itemsPerPage: number = 5;
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

  constructor(private userService: UserService, private dialog: MatDialog, 
    private router: Router,
    private route: ActivatedRoute,) { }

  ngOnInit() {
    const isAdminParam = this.route.snapshot.paramMap.get('isAdmin');
this.isAdmin = isAdminParam === 'true';
    const usernameParam = this.route.snapshot.paramMap.get('username');
    this.username = usernameParam ? usernameParam : ''; // Provide a default value if usernameParam is null
    this.getUsers();
    console.log(this.isAdmin);
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

  pageChanged(event: any) {
    this.currentPage = event.pageIndex + 1; // Adjusted for 0-based index
    // Call your API again here with updated page number
    this.getUsers();
  }
}
