export type ClienteTipo = 'PERSONA' | 'EMPRESA';

export interface Cliente {
  codigoCliente: number;
  tipo: ClienteTipo;
  nombre: string;
  direccion: string;
  telefono: string;
  correo: string;
  // Persona
  cedula?: string;
  apellido?: string;
  // Empresa
  ruc?: string;
}

export interface Vehiculo {
  placa: string;
  marca: string;
  modelo: string;
  anio: number;
  cilindraje: string;
  codigoCliente: number; // Pertenece a cliente
}

export interface Personal {
  cedula: string;
  nombre: string;
  apellido: string;
  celular: string;
  rol: 'ADMIN' | 'RECEPCION' | 'TECNICO';
}

export interface Servicio {
  codigoServicio: number;
  descripcion: string;
  precio: number;
}

export interface Repuesto {
  codigoRepuesto: number;
  descripcion: string;
  costo: number;
  pvp: number;
}

export interface Proforma {
  codigoProforma: number;
  fecha: string; // ISO
  codigoCliente: number;
  placa: string;
  generadoPorCedula: string; // personalGeneraProforma
  itemsServicios: { codigoServicio: number; cantidad: number }[];
  itemsRepuestos: { codigoRepuesto: number; cantidad: number }[];
}

export interface OrdenTrabajo {
  codigoOrden: number;
  fecha: string;
  codigoCliente: number;
  placa: string;
  generadoPorCedula: string; // personalGeneraOT
  itemsServicios: { codigoServicio: number; cantidad: number }[];
  itemsRepuestos: { codigoRepuesto: number; cantidad: number }[];
}