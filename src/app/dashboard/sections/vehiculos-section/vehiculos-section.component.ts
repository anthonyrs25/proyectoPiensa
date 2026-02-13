import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DashboardStore } from '../../dashboard.store';
import { Vehiculo } from '../../dashboard.models';

@Component({
  selector: 'app-vehiculos-section',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './vehiculos-section.component.html',
  styleUrls: ['./vehiculos-section.component.scss'],
})
export class VehiculosSectionComponent {
  q = '';

  placa = '';
  marca = '';
  modelo = '';
  anio: number | null = null;
  cilindraje = '';
  codigoCliente: number | null = null;

  editingPlaca: string | null = null;

  constructor(public store: DashboardStore) {}

  get filtered(): Vehiculo[] {
    const s = this.q.trim().toLowerCase();
    if (!s) return this.store.vehiculos;
    return this.store.vehiculos.filter(v =>
      `${v.placa} ${v.marca} ${v.modelo} ${v.anio} ${v.cilindraje} ${v.codigoCliente}`
        .toLowerCase()
        .includes(s)
    );
  }

  clientLabel(id: number): string {
    const c = this.store.clientes.find(x => x.codigoCliente === id);
    if (!c) return `Cliente #${id}`;
    return c.tipo === 'PERSONA'
      ? `${c.nombre} ${c.apellido ?? ''}`.trim()
      : c.nombre;
  }

  reset() {
    this.placa = '';
    this.marca = '';
    this.modelo = '';
    this.anio = null;
    this.cilindraje = '';
    this.codigoCliente = null;
    this.editingPlaca = null;
  }

  edit(v: Vehiculo) {
    this.editingPlaca = v.placa;
    this.placa = v.placa;
    this.marca = v.marca;
    this.modelo = v.modelo;
    this.anio = v.anio;
    this.cilindraje = v.cilindraje;
    this.codigoCliente = v.codigoCliente;
  }

  save() {
    if (!this.codigoCliente) { alert('Selecciona un cliente.'); return; }
    if (!this.placa.trim()) { alert('Placa requerida.'); return; }

    const veh: Vehiculo = {
      placa: this.placa.trim().toUpperCase(),
      marca: this.marca.trim(),
      modelo: this.modelo.trim(),
      anio: Number(this.anio ?? 0),
      cilindraje: this.cilindraje.trim(),
      codigoCliente: this.codigoCliente,
    };

    const idx = this.store.vehiculos.findIndex(x => x.placa === this.editingPlaca);
    if (idx >= 0) this.store.vehiculos[idx] = veh;
    else this.store.vehiculos.unshift(veh);

    this.reset();
  }

  remove(placa: string) {
    // Nota: en real deberías bloquear si placa está en proformas/OT
    const used =
      this.store.proformas.some(p => p.placa === placa) ||
      this.store.ordenes.some(o => o.placa === placa);

    if (used) {
      alert('No se puede eliminar: este vehículo está usado en Proformas u OT.');
      return;
    }

    this.store.vehiculos = this.store.vehiculos.filter(v => v.placa !== placa);
  }
}