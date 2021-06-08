import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { AuthService } from 'app/auth/auth.service';
import * as moment from 'moment';
import {NewOrderFormComponent} from "../new-order-form/new-order-form.component";

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.css']
})
export class ProfileCardComponent implements OnInit {
  @Input() item:any = {};
  @Output() handleClick = new EventEmitter<boolean>();
  constructor(public dialog: MatDialog, public authService: AuthService) { }

  ngOnInit(): void {
     this.item.orders = this.item.orders.map((order) => {
       order.order.createdAt =moment(order.order.createdAt).format('YYYY-MM-DD');
       if(order.order.status === 'Pending'){
         order.order.estDel = moment(order.order.createdAt).add(3,'days').format('YYYY-MM-DD');
       }
      return order;} )
    
  }

  setHandleClick() {
    this.handleClick.emit(false)
  }

  refetchOrder = () => this.authService.getUserById(this.item._id).subscribe((res) => {
    this.item= res;
  })

  newOrderHandler(): void {
    let order:any={};
       order.isEdit =false;
       order.endDialog=() => this.dialog.closeAll();
       order.refetchOrders = this.refetchOrder;
       order._id = this.item._id;
       const dialogRef = this.dialog.open(NewOrderFormComponent, {
         data: order
       });
   }
   
   
     editClickHandler(order): void {
       order.isEdit =true;
       order.endDialog=() => this.dialog.closeAll();
       order.refetchOrders = this.refetchOrder;
       const dialogRef = this.dialog.open(NewOrderFormComponent, {
         data: this.item
       });
   }

 

}
