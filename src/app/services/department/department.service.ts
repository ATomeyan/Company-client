import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Department} from "../../models/department";

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  private url = environment.url;

  constructor(private http: HttpClient) { }

  getAllDepartments(): Observable<Department[]>{
    return this.http.get<Department[]>(`${this.url}/departments`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      alert(
        `Backend returned code ${error.status}, body was: `);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
