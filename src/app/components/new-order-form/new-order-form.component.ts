import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AuthService} from "../../auth/auth.service";

interface Option{
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-order-form',
  templateUrl: './new-order-form.component.html',
  styleUrls: ['./new-order-form.component.css']
})
export class NewOrderFormComponent implements OnInit {
  data:any;
  orderForm: FormGroup;
  status: string;

  options: Option[] = [
    {value: 'Pending', viewValue: 'pending'},
    {value: 'Completed', viewValue: 'completed'}
  ];
  

  constructor(private fb: FormBuilder,    public authService: AuthService,  public dialogRef: MatDialogRef<NewOrderFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public dataInp: any
  ) {
    this.data = dataInp;
  }

  
  ngOnInit(): void {
    this.orderForm = this.fb.group({
    name: ['',Validators.required],
      amount: ['', Validators.required]
    });
   
  }

  submitHandler() {
    let { value } = this.orderForm;
   
  
      value.user=this.data._id;  
      value.status= this.status; 
      this.authService.createOrder(value).subscribe((res) => {    
        this.data.endDialog();
        this.data.refetchOrders();
        
       });
    }

}
