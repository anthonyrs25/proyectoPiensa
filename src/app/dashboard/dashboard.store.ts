import { Injectable } from '@angular/core';
import { Cliente, Vehiculo, Personal, Servicio, Repuesto, Proforma, OrdenTrabajo } from './dashboard.models';

@Injectable({ providedIn: 'root' })
export class DashboardStore {
  // Cambia a localStorage si quieres persistencia demo
  clientes: Cliente[] = [
    { codigoCliente: 1, tipo: 'PERSONA', nombre: 'Anthony', apellido: '...', cedula: '0102030405', direccion: 'Quito', telefono: '099...', correo: 'a@demo.com' },
    { codigoCliente: 2, tipo: 'EMPRESA', nombre: 'MOTRISERVICE', ruc: '179...', direccion: 'Quito', telefono: '02...', correo: 'info@demo.com' },
  ];

  vehiculos: Vehiculo[] = [
    { placa: 'ABC-1234', marca: 'Toyota', modelo: 'Corolla', anio: 2015, cilindraje: '1.8', codigoCliente: 1 },
  ];

  personal: Personal[] = [
    { cedula: '1100110011', nombre: 'Admin', apellido: 'Principal', celular: '098...', rol: 'ADMIN' },
    { cedula: '2200220022', nombre: 'Técnico', apellido: '1', celular: '097...', rol: 'TECNICO' },
  ];

  servicios: Servicio[] = [
    { codigoServicio: 1, descripcion: 'Cambio de aceite', precio: 35 },
    { codigoServicio: 2, descripcion: 'Diagnóstico general', precio: 20 },
  ];

  repuestos: Repuesto[] = [
    { codigoRepuesto: 1, descripcion: 'Filtro de aceite', costo: 6, pvp: 10 },
    { codigoRepuesto: 2, descripcion: 'Aceite 10W40 (1L)', costo: 5, pvp: 8 },
  ];

  proformas: Proforma[] = [
    {
      codigoProforma: 1,
      fecha: new Date().toISOString(),
      codigoCliente: 1,
      placa: 'ABC-1234',
      generadoPorCedula: '1100110011',
      itemsServicios: [{ codigoServicio: 1, cantidad: 1 }],
      itemsRepuestos: [{ codigoRepuesto: 2, cantidad: 4 }],
    },
  ];

  ordenes: OrdenTrabajo[] = [
    {
      codigoOrden: 1,
      fecha: new Date().toISOString(),
      codigoCliente: 1,
      placa: 'ABC-1234',
      generadoPorCedula: '2200220022',
      itemsServicios: [{ codigoServicio: 2, cantidad: 1 }],
      itemsRepuestos: [],
    },
  ];

  // Helpers (KPIs)
  get kpis() {
    return {
      clientes: this.clientes.length,
      vehiculos: this.vehiculos.length,
      proformas: this.proformas.length,
      ordenes: this.ordenes.length,
      servicios: this.servicios.length,
      repuestos: this.repuestos.length,
      personal: this.personal.length,
    };
  }
}