export type Polygon = {
  sequence: string | number,
  id: number | string,
  coords: [number, number][],
  name: string,
  middle_coord: [number, number],
  activeStatus: number,
  field: {
    name: string,
    color: string
  }
};
