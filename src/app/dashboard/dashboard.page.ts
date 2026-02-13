import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [IonicModule, CommonModule],
  templateUrl: './dashboard.page.html',
})
export class DashboardPage {
  constructor(public auth: AuthService) {}

  logout() {
    this.auth.logout();
    window.location.href = '/home';
  }
}