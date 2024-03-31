import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';
  mobile: string = '';

  backgroundImageUrl = 'assets/image/black-friday-arrangement-with-black-gifts.jpg';

  signup() {
    console.log('Signing up...');
  }
}
