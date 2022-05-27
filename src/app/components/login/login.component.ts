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

  dialogForm: FormGroup;
  public errMessage: string | undefined = undefined;

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService, private router: Router,) {
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

    this.authenticationService.authenticate(data).pipe(first()).subscribe({
      next: (result: any) => {
        this.authenticationService.setToken(result.token);

        this.router.navigate(['/']).then();
      },
      error: err => this.errMessage = err
    });
  }
}
