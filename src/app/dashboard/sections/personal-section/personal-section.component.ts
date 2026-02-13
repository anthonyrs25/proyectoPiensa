import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DashboardStore } from '../../dashboard.store';
import { Personal } from '../../dashboard.models';

@Component({
  selector: 'app-personal-section',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './personal-section.component.html',
  styleUrls: ['./personal-section.component.scss'],
})
export class PersonalSectionComponent {
  q = '';

  cedula = '';
  nombre = '';
  apellido = '';
  celular = '';
  rol: Personal['rol'] = 'TECNICO';

  editingCedula: string | null = null;

  constructor(public store: DashboardStore) {}

  get filtered(): Personal[] {
    const s = this.q.trim().toLowerCase();
    if (!s) return this.store.personal;
    return this.store.personal.filter(p =>
      `${p.cedula} ${p.nombre} ${p.apellido} ${p.celular} ${p.rol}`.toLowerCase().includes(s)
    );
  }

  reset() {
    this.cedula = '';
    this.nombre = '';
    this.apellido = '';
    this.celular = '';
    this.rol = 'TECNICO';
    this.editingCedula = null;
  }

  edit(p: Personal) {
    this.editingCedula = p.cedula;
    this.cedula = p.cedula;
    this.nombre = p.nombre;
    this.apellido = p.apellido;
    this.celular = p.celular;
    this.rol = p.rol;
  }

  save() {
    const ced = this.cedula.trim();
    if (!ced) { alert('Cédula requerida.'); return; }
    if (!this.nombre.trim()) { alert('Nombre requerido.'); return; }
    if (!this.apellido.trim()) { alert('Apellido requerido.'); return; }

    const item: Personal = {
      cedula: ced,
      nombre: this.nombre.trim(),
      apellido: this.apellido.trim(),
      celular: this.celular.trim(),
      rol: this.rol,
    };

    const idx = this.store.personal.findIndex(x => x.cedula === this.editingCedula);
    if (idx >= 0) this.store.personal[idx] = item;
    else {
      // evitar duplicados
      if (this.store.personal.some(x => x.cedula === ced)) {
        alert('Ya existe personal con esa cédula.');
        return;
      }
      this.store.personal.unshift(item);
    }

    this.reset();
  }

  remove(cedula: string) {
    const used =
      this.store.proformas.some(p => p.generadoPorCedula === cedula) ||
      this.store.ordenes.some(o => o.generadoPorCedula === cedula);

    if (used) { alert('No se puede eliminar: este personal genera Proformas u OT.'); return; }

    this.store.personal = this.store.personal.filter(p => p.cedula !== cedula);
  }
}