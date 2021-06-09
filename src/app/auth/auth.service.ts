import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'https://customermanagementbackend.herokuapp.com';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  public currentUser:User;

  constructor(
    private http: HttpClient,
    public router: Router,
    private loader: NgxUiLoaderService
  ) {
    
   
  }


  
 
  // Sign-in
  signIn(user: User, loginFailAlert: Function) {
    this.loader.start();
          return this.http.post<any>(`${this.endpoint}/v1/auth`, user).subscribe((res: any) => {        
        localStorage.setItem('access_token', res.token)
        this.getUserProfile().subscribe((res) => {
          this.loader.stop();
          this.currentUser = res;
          this.router.navigate(['/app/customers']);
          
        })
      },(err:any) => {
        this.loader.stop();
        loginFailAlert(err.error);
      })
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout() {
    this.loader.start();
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.loader.stop();
      this.router.navigate(['login']);
    }
  }

  // User profile
  getUserProfile(): Observable<any> {
    let api = `${this.endpoint}/v1/auth`;
    this.loader.start();
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {
        this.loader.stop();
        return res || {};
      }),
      catchError((e) => this.handleError(e))
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    this.loader.stop();
    console.log(error.error);
    if(error?.error === 'Unauthorized'){
      this.doLogout();
    }
    
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(msg);
  }

  //get users
getUsers(): Observable<any> {
  this.loader.start();
  let api = `${this.endpoint}/v1/users/customers`;
  return this.http.get(api, { headers: this.headers }).pipe(
    map((res: Response) => {
      this.loader.stop();
      return res || [];
    }),
    catchError((e) => this.handleError(e))
  )
}

//get user by id
getUserById(id): Observable<any> {
  this.loader.start();
  let api = `${this.endpoint}/v1/users/${id}`;
  return this.http.get(api, { headers: this.headers }).pipe(
    map((res: Response) => {
      this.loader.stop();
      
      return res || [];
    }),
    catchError((e) => this.handleError(e))
  )
}

//create customer
createCustomer(customer): Observable<any> {
  this.loader.start();
  let api = `${this.endpoint}/v1/users`;
  return this.http.post(api, customer, { headers: this.headers }).pipe(
    map((res: Response) => {
      this.loader.stop();
      return res || [];
    }),
    catchError((e) => this.handleError(e))
  )
}

  //update customer
  updateCustomer(id, customer): Observable<any> {
    this.loader.start();
    let api = `${this.endpoint}/v1/users/${id}`;

    return this.http.post(api, customer, { headers: this.headers }).pipe(
      map((res: Response) => {
        this.loader.stop();
        return res || [];
      }),
      catchError((e) => this.handleError(e))
    )
  }

    //get Orders
    getOrders(): Observable<any> {
      this.loader.start();
      let api = `${this.endpoint}/v1/orders`;
      return this.http.get(api, { headers: this.headers }).pipe(
        map((res: Response) => {
          this.loader.stop();
          
          return res || [];
        }),
        catchError((e) => this.handleError(e))
      )
    }

    //createOrder
   createOrder(order): Observable<any> {

    this.loader.start();
      let api = `${this.endpoint}/v1/orders`;
      return this.http.post(api,order,  { headers: this.headers }).pipe(
        map((res: Response) => {
          this.loader.stop();
          
          return res || [];
        }),
        catchError((e) => this.handleError(e))
      )
    }

    //edit Order
   editOrder(id,order): Observable<any> {
    let api = `${this.endpoint}/v1/orders/${id}`;
    
    return this.http.post(api,order,  { headers: this.headers }).pipe(
      map((res: Response) => {
        
        
        return res || [];
      }),
      catchError((e) => this.handleError(e))
    )
  }

}


