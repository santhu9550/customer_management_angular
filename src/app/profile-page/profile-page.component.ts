import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/auth/auth.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
item: any = {};
  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    if(this.authService.currentUser?.role?.length<=0 || !this.authService.currentUser?.role){
      this.authService.getUserProfile().subscribe((res) => {
        this.authService.currentUser=res;
        this.item=res;
      });
  }
  else{
    this.item = this.authService.currentUser;
  }

}
}
