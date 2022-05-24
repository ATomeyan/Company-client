import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {first} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  token = '';
  dialogForm: FormGroup;
  responseData: any;
  public errMessage: string | undefined = undefined;

  constructor(private formBuilder: FormBuilder, private userService: AuthenticationService, private router: Router,) {
    this.dialogForm = formBuilder.group({
      'username': ['', [Validators.required]],
      'password': ['', [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  login() {

    const data = {
      username: this.dialogForm.controls['username'].value,
      password: this.dialogForm.controls['password'].value
    }

    this.userService.authenticate(data).pipe(first()).subscribe((result) => {
      if (result != null) {
        this.responseData = result,
          localStorage.setItem('token', this.responseData.jwtToken),
          localStorage.setItem('sessionId', this.responseData.data),
          this.router.navigate(['/'])
      }

      console.log(result)
    });
  }
}
