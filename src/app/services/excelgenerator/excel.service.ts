import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class ExcelService {
  private url = environment.url;

  constructor(private http: HttpClient) {
  }

  public exportAsExcelFile(): Observable<Blob> {
    return this.http.get(`${this.url}/download`, {responseType: 'blob'});
  }
}
