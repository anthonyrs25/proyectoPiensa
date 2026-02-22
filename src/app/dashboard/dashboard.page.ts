import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { DashboardStore } from './dashboard.store';

// Secciones
import { ClientesSectionComponent } from './sections/clientes-section/clientes-section.component';
import { VehiculosSectionComponent } from './sections/vehiculos-section/vehiculos-section.component';
import { ProformasSectionComponent } from './sections/proformas-section/proformas-section.component';
import { OrdenesSectionComponent } from './sections/ordenes-section/ordenes-section.component';
import { ServiciosSectionComponent } from './sections/servicios-section/servicios-section.component';
import { RepuestosSectionComponent } from './sections/repuestos-section/repuestos-section.component';
import { PersonalSectionComponent } from './sections/personal-section/personal-section.component';

type TabKey = 'clientes' | 'vehiculos' | 'proformas' | 'ordenes' | 'servicios' | 'repuestos' | 'personal';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    IonicModule, CommonModule,
    ClientesSectionComponent, VehiculosSectionComponent,
    ProformasSectionComponent, OrdenesSectionComponent,
    ServiciosSectionComponent, RepuestosSectionComponent,
    PersonalSectionComponent
  ],
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {
  tab: TabKey = 'clientes';

  constructor(public auth: AuthService, public store: DashboardStore) {}

  setTab(t: TabKey) { this.tab = t; }

  logout() {
    this.auth.logout();
    window.location.href = '/home';
  }
}