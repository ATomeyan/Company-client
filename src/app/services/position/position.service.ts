import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Position} from "../../models/position";

@Injectable({
  providedIn: 'root'
})
export class PositionService {
  private url = environment.url;

  constructor(private http: HttpClient) {
  }

  getAllPositions(): Observable<Position[]> {
    return this.http.get<Position[]>(`${this.url}/positions`).pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
