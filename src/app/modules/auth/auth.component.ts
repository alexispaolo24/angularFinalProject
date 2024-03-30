import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  username: string = ''
  password: string = ''
  errorMessage: string = ''

  constructor(private router: Router){}

  login(){
    if(this.username === 'admin' && this.password === 'password'){
      console.log('correct user and password')
      this.router.navigate(['/dashboard'])
    } else{
      this.errorMessage = 'Invalid Username or Password'
    }
  }
}
