import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLoggedIn = false;
  token = '';
  dialogForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService) {
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

    this.userService.getLogIn(data).subscribe((result) => {
      this.isLoggedIn = true
    });

    console.log(this.dialogForm.value)
  }
}
