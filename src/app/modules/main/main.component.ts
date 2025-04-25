import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';
import {MenuItem} from 'primeng/api';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {Role, User} from '../../core/domain/user';

@Component({
  selector: 'main',
  imports: [
    RouterOutlet,
    NgForOf,
    RouterLinkActive,
    RouterLink,
    NgIf
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'

})
export class MainComponent implements OnInit {

  items: MenuItem[] | undefined;

  authenticatedUser?: User | null;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
  }

  ngOnInit(): void {
    this.findUsers();
    if(this.isAmazon()) this.router.navigate(['main/subscriptions']);
    else this.router.navigate(['main/users']);
  }

  public logout(): void {
    this.authenticationService.logOut();
    this.router.navigate(['login']);
  }

  private findUsers(): void {
    this.authenticatedUser = this.authenticationService.getUser();
    this.items = [
      {
        label: 'Utilisateurs',
        routerLink: 'users',
        visible: this.isAdmin()
      },
      {
        label: 'Produits',
        routerLink: 'products',
        visible: this.isAdmin()
      },
      {
        label: 'Souscriptions',
        routerLink: 'subscriptions',
        visible: this.isAdmin() || this.isAmazon()
      }
    ];
  }

  private isAdmin(): boolean {
    return this.authenticatedUser?.role.libelle === Role.ADMIN;
  }

  private isAmazon(): boolean {
    return this.authenticatedUser?.role.libelle === Role.AMAZON;
  }
}
