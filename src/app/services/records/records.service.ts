import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {catchError, Observable, throwError} from "rxjs";
import {Records} from "../../models/records";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RecordsService {
  private url = environment.url;

  constructor(private http: HttpClient) { }

  getRecordsByCriteria(data: any): Observable<Records[]> {
    return this.http.post<Records[]>(`${this.url}/records`, data).pipe(catchError(this.handleError));
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
