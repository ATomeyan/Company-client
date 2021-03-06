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

  logOut(): Observable<any> {
    return this.http.post<any>(`${this.url}/authenticate/logout`, true).pipe(catchError(this.handleError));
  }

  public setToken(token: string) {
    window.sessionStorage.setItem('token', token);
  }

  public getToken() {
    return window.sessionStorage.getItem('token');
  }

  public clear() {
    window.sessionStorage.removeItem('token');
  }

  public isLoggedIn(): any{
    return this.getToken();
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
