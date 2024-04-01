import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router:Router){}

  submit(){
    this.router.navigate(['/acknowledgement'])
  }
}
