export type PolygonType = {
  id: number | string,
  coords: [number, number][][],
  name: string,
  middle_coord: [number, number],
  activeStatus: number,
  sequence: {
    id: string,
    name: string,
    color: string
  },
  square: string
};
