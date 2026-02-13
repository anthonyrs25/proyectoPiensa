import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DashboardStore } from '../../dashboard.store';
import { Proforma } from '../../dashboard.models';

@Component({
  selector: 'app-proformas-section',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './proformas-section.component.html',
  styleUrls: ['./proformas-section.component.scss'],
})
export class ProformasSectionComponent {
  q = '';

  // Form base
  codigoProforma = 0;
  fecha = new Date().toISOString().slice(0, 10);
  codigoCliente: number | null = null;
  placa = '';
  generadoPorCedula = '';

  // Carrito
  addServicioId: number | null = null;
  addServicioCant = 1;

  addRepuestoId: number | null = null;
  addRepuestoCant = 1;

  itemsServicios: { codigoServicio: number; cantidad: number }[] = [];
  itemsRepuestos: { codigoRepuesto: number; cantidad: number }[] = [];

  editingId: number | null = null;

  constructor(public store: DashboardStore) {}

  get filtered(): Proforma[] {
    const s = this.q.trim().toLowerCase();
    if (!s) return this.store.proformas;
    return this.store.proformas.filter(p =>
      `${p.codigoProforma} ${p.fecha} ${p.codigoCliente} ${p.placa} ${p.generadoPorCedula}`.toLowerCase().includes(s)
    );
  }

  newId(): number {
    const max = this.store.proformas.reduce((m, x) => Math.max(m, x.codigoProforma), 0);
    return max + 1;
  }

  clienteLabel(id: number): string {
    const c = this.store.clientes.find(x => x.codigoCliente === id);
    if (!c) return `Cliente #${id}`;
    return c.tipo === 'PERSONA'
      ? `${c.nombre} ${c.apellido ?? ''}`.trim()
      : c.nombre;
  }

  personalLabel(ced: string): string {
    const p = this.store.personal.find(x => x.cedula === ced);
    return p ? `${p.nombre} ${p.apellido}` : ced;
  }

  servicioLabel(id: number): string {
    const s = this.store.servicios.find(x => x.codigoServicio === id);
    return s ? s.descripcion : `Servicio #${id}`;
  }

  repuestoLabel(id: number): string {
    const r = this.store.repuestos.find(x => x.codigoRepuesto === id);
    return r ? r.descripcion : `Repuesto #${id}`;
  }

  vehiculosDelCliente(): { placa: string }[] {
    if (!this.codigoCliente) return [];
    return this.store.vehiculos.filter(v => v.codigoCliente === this.codigoCliente);
  }

  reset() {
    this.codigoProforma = 0;
    this.fecha = new Date().toISOString().slice(0, 10);
    this.codigoCliente = null;
    this.placa = '';
    this.generadoPorCedula = '';
    this.itemsServicios = [];
    this.itemsRepuestos = [];
    this.addServicioId = null;
    this.addServicioCant = 1;
    this.addRepuestoId = null;
    this.addRepuestoCant = 1;
    this.editingId = null;
  }

  edit(p: Proforma) {
    this.editingId = p.codigoProforma;
    this.codigoProforma = p.codigoProforma;
    this.fecha = p.fecha.slice(0, 10);
    this.codigoCliente = p.codigoCliente;
    this.placa = p.placa;
    this.generadoPorCedula = p.generadoPorCedula;
    this.itemsServicios = JSON.parse(JSON.stringify(p.itemsServicios));
    this.itemsRepuestos = JSON.parse(JSON.stringify(p.itemsRepuestos));
  }

  addServicio() {
    if (!this.addServicioId) return;
    const cant = Number(this.addServicioCant || 1);
    const idx = this.itemsServicios.findIndex(i => i.codigoServicio === this.addServicioId);
    if (idx >= 0) this.itemsServicios[idx].cantidad += cant;
    else this.itemsServicios.push({ codigoServicio: this.addServicioId, cantidad: cant });
    this.addServicioId = null;
    this.addServicioCant = 1;
  }

  addRepuesto() {
    if (!this.addRepuestoId) return;
    const cant = Number(this.addRepuestoCant || 1);
    const idx = this.itemsRepuestos.findIndex(i => i.codigoRepuesto === this.addRepuestoId);
    if (idx >= 0) this.itemsRepuestos[idx].cantidad += cant;
    else this.itemsRepuestos.push({ codigoRepuesto: this.addRepuestoId, cantidad: cant });
    this.addRepuestoId = null;
    this.addRepuestoCant = 1;
  }

  removeServ(id: number) {
    this.itemsServicios = this.itemsServicios.filter(i => i.codigoServicio !== id);
  }

  removeRep(id: number) {
    this.itemsRepuestos = this.itemsRepuestos.filter(i => i.codigoRepuesto !== id);
  }

  total(): number {
    const totalServicios = this.itemsServicios.reduce((sum, i) => {
      const s = this.store.servicios.find(x => x.codigoServicio === i.codigoServicio);
      return sum + (s ? s.precio * i.cantidad : 0);
    }, 0);

    const totalRepuestos = this.itemsRepuestos.reduce((sum, i) => {
      const r = this.store.repuestos.find(x => x.codigoRepuesto === i.codigoRepuesto);
      return sum + (r ? r.pvp * i.cantidad : 0);
    }, 0);

    return Math.round((totalServicios + totalRepuestos) * 100) / 100;
  }

  save() {
    if (!this.codigoCliente) { alert('Selecciona un cliente.'); return; }
    if (!this.placa.trim()) { alert('Selecciona/ingresa placa.'); return; }
    if (!this.generadoPorCedula.trim()) { alert('Selecciona el personal que genera la proforma.'); return; }
    if (this.itemsServicios.length === 0 && this.itemsRepuestos.length === 0) {
      alert('Agrega al menos 1 servicio o repuesto.');
      return;
    }

    // Validación: la placa debe pertenecer al cliente
    const okPlaca = this.store.vehiculos.some(v => v.codigoCliente === this.codigoCliente && v.placa === this.placa);
    if (!okPlaca) { alert('La placa no pertenece a ese cliente.'); return; }

    // Validación: personal existe
    const okPers = this.store.personal.some(p => p.cedula === this.generadoPorCedula);
    if (!okPers) { alert('El personal seleccionado no existe.'); return; }

    const id = this.codigoProforma || this.newId();

    const p: Proforma = {
      codigoProforma: id,
      fecha: new Date(this.fecha).toISOString(),
      codigoCliente: this.codigoCliente,
      placa: this.placa,
      generadoPorCedula: this.generadoPorCedula,
      itemsServicios: this.itemsServicios,
      itemsRepuestos: this.itemsRepuestos,
    };

    const idx = this.store.proformas.findIndex(x => x.codigoProforma === (this.editingId ?? id));
    if (idx >= 0) this.store.proformas[idx] = p;
    else this.store.proformas.unshift(p);

    this.reset();
  }

  remove(id: number) {
    // Si ya quieres ligar Proforma->OT, aquí bloquearías si está convertida
    this.store.proformas = this.store.proformas.filter(p => p.codigoProforma !== id);
  }
  totalProforma(p: any): string {
  let total = 0;

  for (const i of p.itemsServicios) {
    const s = this.store.servicios.find(x => x.codigoServicio === i.codigoServicio);
    if (s) total += s.precio * i.cantidad;
  }

  for (const i of p.itemsRepuestos) {
    const r = this.store.repuestos.find(x => x.codigoRepuesto === i.codigoRepuesto);
    if (r) total += r.pvp * i.cantidad;
  }

  return total.toFixed(2);
}
}