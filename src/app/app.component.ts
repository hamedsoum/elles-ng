import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {Button} from 'primeng/button';
import {Menu} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {log} from '@angular-devkit/build-angular/src/builders/ssr-dev-server';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgForOf, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      {
        label: 'Utilisateurs',
        routerLink: 'users'
      },
      {
        label: 'Produits',
        routerLink: 'products'
      },
      {
        label: 'Souscriptions',
        routerLink: 'subscriptions'
      }
    ];
  }
}
