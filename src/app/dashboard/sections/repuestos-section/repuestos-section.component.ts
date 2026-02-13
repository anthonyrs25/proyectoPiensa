import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DashboardStore } from '../../dashboard.store';
import { Repuesto } from '../../dashboard.models';

@Component({
  selector: 'app-repuestos-section',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './repuestos-section.component.html',
  styleUrls: ['./repuestos-section.component.scss'],
})
export class RepuestosSectionComponent {
  q = '';

  codigoRepuesto = 0;
  descripcion = '';
  costo: number | null = null;
  pvp: number | null = null;

  constructor(public store: DashboardStore) {}

  get filtered(): Repuesto[] {
    const s = this.q.trim().toLowerCase();
    if (!s) return this.store.repuestos;
    return this.store.repuestos.filter(x =>
      `${x.codigoRepuesto} ${x.descripcion} ${x.costo} ${x.pvp}`.toLowerCase().includes(s)
    );
  }

  newId(): number {
    const max = this.store.repuestos.reduce((m, x) => Math.max(m, x.codigoRepuesto), 0);
    return max + 1;
  }

  reset() {
    this.codigoRepuesto = 0;
    this.descripcion = '';
    this.costo = null;
    this.pvp = null;
  }

  edit(x: Repuesto) {
    this.codigoRepuesto = x.codigoRepuesto;
    this.descripcion = x.descripcion;
    this.costo = x.costo;
    this.pvp = x.pvp;
  }

  save() {
    const desc = this.descripcion.trim();
    const costo = Number(this.costo ?? 0);
    const pvp = Number(this.pvp ?? 0);

    if (!desc) { alert('Descripción requerida.'); return; }
    if (!(costo >= 0)) { alert('Costo inválido.'); return; }
    if (!(pvp > 0)) { alert('PVP inválido.'); return; }
    if (pvp < costo) { alert('PVP no puede ser menor que costo.'); return; }

    const id = this.codigoRepuesto || this.newId();
    const item: Repuesto = { codigoRepuesto: id, descripcion: desc, costo, pvp };

    const idx = this.store.repuestos.findIndex(r => r.codigoRepuesto === id);
    if (idx >= 0) this.store.repuestos[idx] = item;
    else this.store.repuestos.unshift(item);

    this.reset();
  }

  remove(id: number) {
    const used =
      this.store.proformas.some(p => p.itemsRepuestos.some(i => i.codigoRepuesto === id)) ||
      this.store.ordenes.some(o => o.itemsRepuestos.some(i => i.codigoRepuesto === id));

    if (used) { alert('No se puede eliminar: este repuesto está usado en Proformas u OT.'); return; }

    this.store.repuestos = this.store.repuestos.filter(r => r.codigoRepuesto !== id);
  }
}