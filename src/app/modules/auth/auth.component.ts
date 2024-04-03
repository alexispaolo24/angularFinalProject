import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';
  
  backgroundImageUrl = 'assets/image/arrangement-black-friday-shopping-carts-with-copy-space.jpg';

  constructor(private userService: UserService, private router: Router) {}

  login() {
    if (!this.username || !this.password) {
      this.errorMessage = 'Please provide both username and password';
      return;
    }
    this.userService.getUsers(this.username, this.password)
      .subscribe(
        (user: User) => {
          if (user.type === 'admin') {
            this.router.navigate(['/admin'], { queryParams: { isAdmin: 'true', username:this.username } });
          } else {
            this.router.navigate(['/dashboard'], { queryParams: { isAdmin: 'false',  username:this.username } }); 
          }
        },
        (errorMessage) => {
          this.errorMessage = errorMessage || 'Invalid username or password';
        }
      );
  }
}
