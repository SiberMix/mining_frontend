import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

import { PolygonType } from '~processes/redux/slices/mapSlice';

type Polygon = {
  name: string;
  sequence: {
    id: number;
    name: string;
    color: string;
  };
  square: number;
};

export const exportPolygonsToExcel = (polygons: PolygonType[]) => {
  if (!polygons?.length) return;

  const rows = polygons.map((item) => ({
    'Имя Блока': item.name ?? '',
    'Материал': item.sequence ?? '',
    'Площадь Блока': item.square ?? ''
  }))

  const worksheet = XLSX.utils.json_to_sheet(rows);

  // Настроим ширину колонок (по желанию)
  worksheet['!cols'] = [
    { wch: 30 }, // Имя Блока
    { wch: 20 }, // Материал
    { wch: 15 } // Площадь
  ]

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Поля');

  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([excelBuffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  saveAs(blob, 'blocks.xlsx');
};
