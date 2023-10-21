
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StorageService } from '../data/_services/storage.service';

@Component({
  selector: 'app-main-layout',
  template: '<app-header></app-header>',
  styles: [`
  .mat-toolbar.mat-dark {
      background: #000;
      color: #fff;
  }
  app-menu {
      position: absolute;
      width: 100%;
      top: 4rem;
      z-index: 1;
  }
  `]
})
export class MainLayoutComponent {
  //thêm kiểm tra token
  title = 'angularmaterial';
  isLoggedIn = false;
  constructor(private storageService: StorageService, private router: Router) {}

  ngOnInit(): void {
    // this.isLoggedIn = this.storageService.isLoggedIn();
    // if (!this.isLoggedIn) {
    //   this.router.navigate(['/login']);
    // }
  }
}
