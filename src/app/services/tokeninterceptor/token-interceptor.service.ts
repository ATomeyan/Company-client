import {Injectable, Injector} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthenticationService} from "../authentication/authentication.service";

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor{

  constructor(private inject: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let authService = this.inject.get(AuthenticationService);

    let token = req.clone({
      setHeaders:{
        Authorization: 'Bearer ' + authService.getToken()
      }
    });

    return next.handle(token);
  }
}
