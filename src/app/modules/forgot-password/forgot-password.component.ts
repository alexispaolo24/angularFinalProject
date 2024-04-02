import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  username: string = ''
  email: string = ''
  mobileNo: string = ''
  errorMessage: string = ''
  newPassword: string = ''

  backgroundImageUrl = 'assets/image/golden-shopping-carts-black-background.jpg';

  constructor(private userService: UserService, private router:Router){}

  onSubmit(): void {
    this.userService.resetPassword(this.username, this.email, this.mobileNo)
      .subscribe(
        (password) => { 
          this.newPassword = password;
          this.router.navigate(['/acknowledgment', password]); 
        },
        (error) => {
          console.error('An error occurred:', error);
          this.errorMessage = 'Invalid credentials. Please try again.';
        }
      );
  }
}
