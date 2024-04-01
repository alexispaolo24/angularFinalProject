import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  user: any = {
    username: 'alexis_paolo',
    firstName: 'Alexis Paolo',
    middleName: 'Ancog',
    lastName: 'Moneva',
    email: 'example@example.com',
    birthdate: '1995-04-24',
    interests: ['Programming','Gaming']
  }

  constructor(private router:Router){}

  editProfile(){
    this.router.navigate(['/edit-profile'])
  }
}
