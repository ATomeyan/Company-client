import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private url = environment.url;

  constructor(private http: HttpClient) {
  }

  authenticate(data: any): Observable<any> {
    return this.http.post<any>(`${this.url}/authenticate/login`, data).pipe(catchError(this.handleError));
  }

  public getToken() {
    return localStorage.getItem('token') || '';
  }

  public isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  private handleError(error: HttpErrorResponse) {
    let errMessage: string = '';

    if (error.status === 0) {
      errMessage = `An error occurred: ${error.error}`;
    } else {
      errMessage = `${error.status}, ${error.error}`;
    }
    errMessage += '\n Something bad happened; please try again later.';
    return throwError(() => errMessage);
  }
}