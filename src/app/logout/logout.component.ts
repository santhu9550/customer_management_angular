import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-logout',

})
export class LogoutComponent implements OnInit {

  constructor(public authService: AuthService) {
    authService.doLogout();
   }

  ngOnInit(): void {
  }

}
