import { Injectable } from '@angular/core';
import { User } from './user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  endpoint: string = 'http://localhost:5000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  public currentUser:User;

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
    
   
  }

  
  // Sign-up
  signUp(user): Observable<any> {
    let api = `${this.endpoint}/register-user`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user: User, loginFailAlert: Function) {
          return this.http.post<any>(`${this.endpoint}/v1/auth`, user).subscribe((res: any) => {        
        localStorage.setItem('access_token', res.token)
        this.getUserProfile().subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['customers']);
        })
      },(err:any) => {loginFailAlert(err.error);
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
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null) {
      this.router.navigate(['login']);
    }
  }

  // User profile
  getUserProfile(): Observable<any> {
    let api = `${this.endpoint}/v1/auth`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: Response) => {        
        return res || {};
      }),
      catchError(this.handleError)
    )
  }

  // Error 
  handleError(error: HttpErrorResponse) {
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
  let api = `${this.endpoint}/v1/users/customers`;
  return this.http.get(api, { headers: this.headers }).pipe(
    map((res: Response) => {
      console.log(res);
      
      return res || [];
    }),
    catchError(this.handleError)
  )
}

//get user by id
getUserById(id): Observable<any> {
  let api = `${this.endpoint}/v1/users/${id}`;
  return this.http.get(api, { headers: this.headers }).pipe(
    map((res: Response) => {
      console.log(res);
      
      return res || [];
    }),
    catchError(this.handleError)
  )
}

//create customer
createCustomer(customer): Observable<any> {
  let api = `${this.endpoint}/v1/users`;
  return this.http.post(api, customer, { headers: this.headers }).pipe(
    map((res: Response) => {
      console.log(res);
      
      return res || [];
    }),
    catchError(this.handleError)
  )
}

  //update customer
  updateCustomer(id, customer): Observable<any> {
    let api = `${this.endpoint}/v1/users/${id}`;
    return this.http.post(api, customer, { headers: this.headers }).pipe(
      map((res: Response) => {
        console.log(res);
        
        return res || [];
      }),
      catchError(this.handleError)
    )
  }

    //get Orders
    getOrders(): Observable<any> {
      let api = `${this.endpoint}/v1/orders`;
      return this.http.get(api, { headers: this.headers }).pipe(
        map((res: Response) => {
          console.log(res);
          
          return res || [];
        }),
        catchError(this.handleError)
      )
    }

    //createOrder
   createOrder(order): Observable<any> {
     console.log(order);
     
      let api = `${this.endpoint}/v1/orders`;
      return this.http.post(api,order,  { headers: this.headers }).pipe(
        map((res: Response) => {
          console.log(res);
          
          return res || [];
        }),
        catchError(this.handleError)
      )
    }

    //edit Order
   editOrder(id,order): Observable<any> {
    let api = `${this.endpoint}/v1/orders/${id}`;
    return this.http.post(api,order,  { headers: this.headers }).pipe(
      map((res: Response) => {
        console.log(res);
        
        return res || [];
      }),
      catchError(this.handleError)
    )
  }

}


