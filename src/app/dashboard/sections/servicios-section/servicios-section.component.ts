import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DashboardStore } from '../../dashboard.store';
import { Servicio } from '../../dashboard.models';

@Component({
  selector: 'app-servicios-section',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './servicios-section.component.html',
  styleUrls: ['./servicios-section.component.scss'],
})
export class ServiciosSectionComponent {
  q = '';

  codigoServicio = 0;
  descripcion = '';
  precio: number | null = null;

  constructor(public store: DashboardStore) {}

  get filtered(): Servicio[] {
    const s = this.q.trim().toLowerCase();
    if (!s) return this.store.servicios;
    return this.store.servicios.filter(x =>
      `${x.codigoServicio} ${x.descripcion} ${x.precio}`.toLowerCase().includes(s)
    );
  }

  newId(): number {
    const max = this.store.servicios.reduce((m, x) => Math.max(m, x.codigoServicio), 0);
    return max + 1;
  }

  reset() {
    this.codigoServicio = 0;
    this.descripcion = '';
    this.precio = null;
  }

  edit(x: Servicio) {
    this.codigoServicio = x.codigoServicio;
    this.descripcion = x.descripcion;
    this.precio = x.precio;
  }

  save() {
    const desc = this.descripcion.trim();
    const precio = Number(this.precio ?? 0);
    if (!desc) { alert('Descripción requerida.'); return; }
    if (!(precio > 0)) { alert('Precio inválido.'); return; }

    const id = this.codigoServicio || this.newId();
    const item: Servicio = { codigoServicio: id, descripcion: desc, precio };

    const idx = this.store.servicios.findIndex(s => s.codigoServicio === id);
    if (idx >= 0) this.store.servicios[idx] = item;
    else this.store.servicios.unshift(item);

    this.reset();
  }

  remove(id: number) {
    const used =
      this.store.proformas.some(p => p.itemsServicios.some(i => i.codigoServicio === id)) ||
      this.store.ordenes.some(o => o.itemsServicios.some(i => i.codigoServicio === id));

    if (used) { alert('No se puede eliminar: este servicio está usado en Proformas u OT.'); return; }

    this.store.servicios = this.store.servicios.filter(s => s.codigoServicio !== id);
  }
}