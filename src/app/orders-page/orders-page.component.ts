import { Component, OnInit, VERSION } from '@angular/core';
import {AuthService} from "../auth/auth.service";
import * as moment from 'moment';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrls: ['./orders-page.component.css']
})
export class OrdersPageComponent implements OnInit {
  orders=[];
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


  constructor(public authService:AuthService) { }

  ngOnInit(): void {
    this.authService.getOrders().subscribe((res) => {

      this.orders = res.map((order) => {
        order.createdAt =moment(order.createdAt).format('YYYY-MM-DD');
        if(order.status === 'Pending'){
          order.estDel = moment(order.createdAt).add(3,'days').format('YYYY-MM-DD');
        }
       return order
      } )
      
    });
  }

}
