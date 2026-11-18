"use client";

import { Map } from "./Map";
import { Ginecologa } from "./Map";

export const MOCK_GINECOLOGAS: Ginecologa[] = [
  {
    id: "1",
    nombre: "María José",
    apellidos: "González Pérez",
    contacto: {
      instagram: "@dra.mjgonzalez",
      email: "contacto@dramj.cl",
    },
    centros: [
      {
        nombreCentro: "Centro Médico Providencia",
        comuna: "Providencia",
        region: "Región Metropolitana",
        lat: -33.4312,
        lng: -70.6134,
      },
    ],
    verificado: true,
  },
  {
    id: "2",
    nombre: "Camila",
    apellidos: "Valenzuela Soto",
    contacto: {
      instagram: "@dra.camilavalenzuela",
      email: "cvalenzuela@redsalud.cl",
    },
    centros: [
      {
        nombreCentro: "Clínica RedSalud Vitacura",
        comuna: "Vitacura",
        region: "Región Metropolitana",
        lat: -33.3985,
        lng: -70.5741,
      },
      {
        nombreCentro: "Consulta Privada Las Condes",
        comuna: "Las Condes",
        region: "Región Metropolitana",
        lat: -33.4152,
        lng: -70.5812,
      },
    ],
    verificado: true,
  },
  {
    id: "3",
    nombre: "Francisca",
    apellidos: "Rojas Morales",
    contacto: {
      instagram: "@dra.franciscarojas",
    },
    centros: [
      {
        nombreCentro: "Hospital Clínico UC Christus",
        comuna: "Santiago",
        region: "Región Metropolitana",
        lat: -33.4442,
        lng: -70.6391,
      },
    ],
    verificado: true,
  },
  {
    id: "4",
    nombre: "Daniela",
    apellidos: "Fuentes Araya",
    contacto: {
      email: "dfuentes@viñasalud.cl",
    },
    centros: [
      {
        nombreCentro: "Centro Médico Reñaca",
        comuna: "Viña del Mar",
        region: "Región de Valparaíso",
        lat: -32.9683,
        lng: -71.5516,
      },
    ],
    verificado: true,
  },
  {
    id: "5",
    nombre: "Andrea",
    apellidos: "Silva Tapia",
    contacto: {
      instagram: "@dra.andreasilva",
    },
    centros: [
      {
        nombreCentro: "Consultorio Adelaida La Fetra",
        comuna: "Concepción",
        region: "Región del Biobío",
        lat: -36.8261,
        lng: -73.0498,
      },
    ],
    verificado: true,
  },
];

export function HomePageContent() {
  return (
    <div className="grid h-dvh w-full grid-rows-2 gap-4 p-4 md:grid-cols-3 md:grid-rows-1">
      <section className="min-h-0 overflow-y-auto rounded-lg border border-brand-text p-4" />
      <section className="flex min-h-0 flex-col overflow-hidden rounded-lg border border-brand-text p-4 md:col-span-2">
        <div className="min-h-0 flex-1">
          <Map ginecologas={MOCK_GINECOLOGAS} />
        </div>
      </section>
    </div>
  );
}
