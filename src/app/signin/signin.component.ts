import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  signinForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    if(authService.isLoggedIn){
      router.navigate(['/app/customers']);
    }
  }

  ngOnInit(): void {
    this.signinForm = this.fb.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    })
  }

  loginFailAlert = (msg) => Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: msg,
  });

  loginUser() {
    this.authService.signIn(this.signinForm.value, this.loginFailAlert);
  }
}