import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTE_NAMES } from './core/constants/route-path';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'parking-management-system';

  constructor(private router:Router){}

  navigateToRegister():void {
    this.router.navigate([ROUTE_NAMES.REGISTER])
  }

  navigateToList():void {
    this.router.navigate([ROUTE_NAMES.LIST])

  }

  navigateToDashboard():void {
    this.router.navigate([ROUTE_NAMES.DASHBOARD])

  }
}
