import { Component, VERSION, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "app/auth/auth.service";
import {MatDialog} from '@angular/material/dialog';
import { FormsComponent } from "../forms/forms.component";
import Swal from 'sweetalert2';


@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent implements OnInit {
  @Input() items: Array<any> = [];
  @Input() refetchCustomers: Function;
  @Output() selectedItem = new EventEmitter<object>();
  role="";
  name = "Angular " + VERSION.major;
    currentPage: any = 1;
  itemsPerPage: any = "5";
  totalPage: any = 0;
  term: any = "";
  prop: any = "";
  pageTabs: boolean = true;

  stylingProps: any = {
    backgroundColor: "#fff",
    textColor: "blue",
    activeBackgroundColor: "#359797",
    activeTextColor: "#fff",
    onHoverBackgroundColor: "#e9ecef",
    onHoverTextColor: "#0056b3"
  };

  constructor(public authService: AuthService, public dialog: MatDialog) {
    
  }

  ngOnInit() {
    if(this.authService.currentUser?.role?.length<=0 || !this.authService.currentUser?.role){
      this.authService.getUserProfile().subscribe((res) => {
        this.authService.currentUser=res;
        this.role=res.role;
      });
     

      
  } else{
    this.role=this.authService.currentUser?.role.toString();
  }
  
  }

  sendObject(obj) {
    this.selectedItem.emit(obj)
  }

 Alerts = (icon,heading,msg) => Swal.fire({
    icon: icon,
    title: heading,
    text: msg,
  });

 newCustomerHandler(): void {
 let customer:any={};
    customer.isEdit =false;
    customer.endDialog=() => this.dialog.closeAll();
    customer.Alerts = this.Alerts;
    customer.refetchCustomers = this.refetchCustomers;
    const dialogRef = this.dialog.open(FormsComponent, {
      data: customer
    });
}


  editClickHandler(customer): void {
    customer.isEdit =true;
    customer.Alerts = this.Alerts;
    customer.endDialog=() => this.dialog.closeAll();
    customer.refetchCustomers = this.refetchCustomers;
    const dialogRef = this.dialog.open(FormsComponent, {
      data: customer
    });
}

}