import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  hideSideNav = false;

  constructor() { }

  toggleSideNav(): void {
    this.hideSideNav = !this.hideSideNav;
  }
}
