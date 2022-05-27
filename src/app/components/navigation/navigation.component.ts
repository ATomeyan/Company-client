import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public authService: AuthenticationService, private router: Router) {
  }

  ngOnInit(): void {
  }

  public logOut() {
    this.authService.clear();
    window.location.reload();
    this.router.navigate(['/']).then();
  }
}
