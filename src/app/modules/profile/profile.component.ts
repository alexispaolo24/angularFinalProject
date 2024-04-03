import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service'; 
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  username: string = '';
  isAdmin: boolean = false;
  user!: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService // Inject UserService here
  ) {}

  ngOnInit(): void {
    const isAdminQueryParam = this.route.snapshot.queryParamMap.get('isAdmin');
    this.isAdmin = isAdminQueryParam === 'true'; 
    const usernameParam = this.route.snapshot.paramMap.get('username');
    if (usernameParam) {
      this.username = usernameParam;
      this.userService.getUserByUsername(usernameParam).subscribe(
        (users: User[]) => {
          if (users && users.length > 0) {
            this.user = users[0];
            console.log('user', this.user)
          } else {
            console.log(`No user found with username ${this.username}`);
          }
        },
        (error) => {
          console.error('Error fetching user:', error);
        }
      );
    }
  }

  updateUser(): void {
    if (!this.user || this.user.id === undefined) {
      console.error('No user data or user ID is undefined');
      return;
    }
  
    this.userService.updateUser(this.user.id, this.user).subscribe(
      () => {
        console.log('User updated successfully');
      },
      (error) => {
        console.error('Error updating user:', error);
      }
    );
  }
  

  editProfile() {
    this.router.navigate(['/edit-profile']);
  }
}
