import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DashboardStore } from '../../dashboard.store';
import { Cliente, ClienteTipo } from '../../dashboard.models';

@Component({
  selector: 'app-clientes-section',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './clientes-section.component.html',
  styleUrls: ['./clientes-section.component.scss'],
})
export class ClientesSectionComponent {
  q = '';

  // Form
  tipo: ClienteTipo = 'PERSONA';
  codigoCliente = 0;
  nombre = '';
  apellido = '';
  cedula = '';
  ruc = '';
  direccion = '';
  telefono = '';
  correo = '';

  constructor(public store: DashboardStore) {}

  get filtered(): Cliente[] {
    const s = this.q.trim().toLowerCase();
    if (!s) return this.store.clientes;
    return this.store.clientes.filter(c =>
      `${c.codigoCliente} ${c.tipo} ${c.nombre} ${c.apellido ?? ''} ${c.cedula ?? ''} ${c.ruc ?? ''} ${c.telefono} ${c.correo}`
        .toLowerCase()
        .includes(s)
    );
  }

  newId(): number {
    const max = this.store.clientes.reduce((m, c) => Math.max(m, c.codigoCliente), 0);
    return max + 1;
  }

  resetForm() {
    this.codigoCliente = 0;
    this.nombre = '';
    this.apellido = '';
    this.cedula = '';
    this.ruc = '';
    this.direccion = '';
    this.telefono = '';
    this.correo = '';
    this.tipo = 'PERSONA';
  }

  edit(c: Cliente) {
    this.codigoCliente = c.codigoCliente;
    this.tipo = c.tipo;
    this.nombre = c.nombre;
    this.apellido = c.apellido ?? '';
    this.cedula = c.cedula ?? '';
    this.ruc = c.ruc ?? '';
    this.direccion = c.direccion;
    this.telefono = c.telefono;
    this.correo = c.correo;
  }

  save() {
    const id = this.codigoCliente || this.newId();

    const base: Cliente = {
      codigoCliente: id,
      tipo: this.tipo,
      nombre: this.nombre.trim(),
      direccion: this.direccion.trim(),
      telefono: this.telefono.trim(),
      correo: this.correo.trim(),
    };

    const cliente: Cliente =
      this.tipo === 'PERSONA'
        ? { ...base, apellido: this.apellido.trim(), cedula: this.cedula.trim() }
        : { ...base, ruc: this.ruc.trim() };

    const idx = this.store.clientes.findIndex(x => x.codigoCliente === id);
    if (idx >= 0) this.store.clientes[idx] = cliente;
    else this.store.clientes.unshift(cliente);

    this.resetForm();
  }

  remove(codigoCliente: number) {
    // bloqueo si tiene vehículos asociados (según diagrama pertenece)
    const hasVeh = this.store.vehiculos.some(v => v.codigoCliente === codigoCliente);
    if (hasVeh) {
      alert('No se puede eliminar: este cliente tiene vehículos registrados.');
      return;
    }
    this.store.clientes = this.store.clientes.filter(c => c.codigoCliente !== codigoCliente);
  }
}