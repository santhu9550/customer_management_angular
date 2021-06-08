import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-customers-page',
  templateUrl: './customers-page.component.html',
  styleUrls: ['./customers-page.component.css']
})
export class CustomersPageComponent implements OnInit {
  customers: Array<any> = [];
  selectedCustomer={};
  isSelected: boolean = false;

  constructor(public authService: AuthService) { }
  getCustomers = () =>this.authService.getUsers()
  .subscribe(res => {
    let temp: any = res;
    this.customers = temp;
  });

  ngOnInit(): void {  
    
    this.getCustomers();
  }

  receiveObject($event) {
    this.selectedCustomer = $event;
    this.isSelected = true;
    
  }

  clickHandler($event){
    this.isSelected = $event;
  }
}
