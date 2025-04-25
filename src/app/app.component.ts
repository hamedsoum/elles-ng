import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Button} from 'primeng/button';
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {NgForOf, NgIf} from '@angular/common';
import {AuthenticationService} from './shared/services/authentication.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService, private router: Router) {
  }
  ngOnInit(): void {

    if(this.authenticationService.isAuthenticated()) this.router.navigate(['main']);
    else this.router.navigate(['login']);
  }
}
