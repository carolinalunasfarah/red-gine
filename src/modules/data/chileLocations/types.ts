export interface Comuna {
  id: string;
  nombre: string;
}

export interface Region {
  id: string;
  nombre: string;
  comunas: Comuna[];
}
