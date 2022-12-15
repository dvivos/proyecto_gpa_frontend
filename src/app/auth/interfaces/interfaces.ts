export interface Usuario {
  id?:        number;
  cusuario?:  string;
  nombre?:    string;
  apellidos?: string;
  email?:     string;
  password?:  string;
  activo?:    boolean;
  createAt?:  Date;
  permisos?:  Permiso[];
  centidad?:  Centidad;
  cutramit?:  Cutramit;
}

export interface Centidad {
  id?:       number;
  centidad?: string;
  xentidad?: string;
  createAt?: Date;
}

export interface Cutramit {
  id?:          number;
  cutramit?:    string;
  descorta?:    string;
  descripcion?: string;
  createAt?:    Date;
}

export interface Permiso {
  id?:          number;
  cpermiso?:    string;
  descripcion?: string;
  createAt?:    Date;
}

export interface Pago {
  id?:          number;
  centidad?:    Centidad;
  ymandpag?:    number;
  nmandpag?:    number;
  descripcion?: string;
  importe?:     number;
  faprobacion?: string;
  documento?:   Documento;
  yrelorpg?:    number;
  nrelorpg?:    number;
  cacredeu?:    Cacredeu;
  fordenpago?:  string;
  faprobpago?:  string;
  fanulacion?:  string;
  tfpgoper?:    Tfpgoper;
  createAt?:    Date;
}

export interface Documento {
  id?:          number;
  centidad?:    Centidad;
  yejecont?:    number;
  ydoconta?:    number;
  ndoconta?:    number;
  noperdia?:    number;
  facuerop?:    string;
  foperdia?:    string;
  importe?:     number;
  descripcion?: string;
  cacredeu?:    Cacredeu;
  yreldoco?:    number;
  nreldoco?:    number;
  codfirma?:    string;
  createAt?:    Date;
}

export interface Cacredeu {
  id?:         number;
  cacredeu?:   number;
  nombre?:     string;
  apellido1?:  string;
  apellido2?:  string;
  cdocumento?: string;
  codigocif?:  string;
  letradni?:   string;
  iadfisju?:   number;
  embargado?:  boolean;
  baja?:       number;
  createAt?:   Date;
}

export interface Tfpgoper {
  id?:          number;
  tfpgoper?:    string;
  descripcion?: string;
  createAt?:    Date;
}
