export interface Technique {
  id: number;
  name: string;
  master: string;
  type: string;
  info: string;
  source: string;
  animation?: string;
}

// If this file is removed things break

export const techniquesFiore: Technique[] = [
  {
    id: 1,
    name: "TEST1",
    master: "Fiore dei Liberi",
    type: "Guard Position",
    info: "test",
    source: "Fior di Battaglia, ca. 1404",
  },
  {
    id: 2,
    name: "TEST2",
    master: "Fiore dei Liberi",
    type: "Guard Position",
    info: "test",
    source: "Fior di Battaglia, ca. 1404",
  },
  {
    id: 3,
    name: "TEST3",
    master: "Fiore dei Liberi",
    type: "Guard Position",
    info: "test",
    source: "Fior di Battaglia, ca. 1404",
  },
];
