import {environment} from "../../../environments/environment";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Employee} from "../../models/employee";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})

export class EmployeeService {
  private url = environment.url;

  constructor(private http: HttpClient) {
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.url}/employees`).pipe(catchError(this.handleError));
  }

  addEmployee(data: Employee): Observable<Employee> {
    return this.http.post<Employee>(`${this.url}/employees`, data).pipe(catchError(this.handleError));
  }

  updateEmployee(id: number, data: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.url}/employees/${id}`, data).pipe(catchError(this.handleError));
  }

  deleteById(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.url}/employees/${id}`).pipe(catchError(this.handleError));
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
