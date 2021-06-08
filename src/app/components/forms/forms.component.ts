import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {AuthService} from "../../auth/auth.service";


@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.css']
})
export class FormsComponent implements OnInit {
  data:any;
  userForm: FormGroup;

  constructor(private fb: FormBuilder,    public authService: AuthService,  public dialogRef: MatDialogRef<FormsComponent>,
      @Optional() @Inject(MAT_DIALOG_DATA) public dataInp: any
    ) {
      this.data = dataInp;
    }

    ngOnInit(): void {
      this.userForm = this.fb.group({
        firstname: ['',Validators.required],
        lastname: ['',Validators.required],
        email: ['', Validators.email],
        password: ['', Validators.required],
        mobile: ['',Validators.required],
        address: this.fb.group({
          line1: ['',Validators.required],
          line2: ['',Validators.required],
          city: ['',Validators.required],
          state: ['',Validators.required],
          pincode: ['',Validators.required],
        }),
      });
      if(this.data?.isEdit){
        const {firstname,lastname,email, mobile, address} = this.data;
        this.userForm.setValue({firstname,lastname,email,password:'  ',mobile: Number(mobile), address});
      }

    }
  
    submitHandler() {
      let { value } = this.userForm;
      console.log(value);
      if(this.data?.isEdit){
        this.authService.updateCustomer(this.data._id, value).subscribe((res) => {    
          console.log(res);
          this.data.endDialog();
          this.data.refetchCustomers();
          this.data.Alerts('success', 'Success', 'Updated Customer');
          
         });
      } else {
        value.role='Customer';
        this.authService.createCustomer(value).subscribe((res) => {    
          console.log(res);
          this.data.endDialog();
          this.data.refetchCustomers();
          this.data.Alerts('success', 'Success', 'Created New Customer');
          
         });
      }
      
    }

    
  
}
