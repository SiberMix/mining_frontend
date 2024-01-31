import type { FieldType } from '../../../../srcOld/redux/slices/fieldSlice'

export const getContrastColor = (hexColor: string) => {
  // Преобразование цвета из HEX в RGB
  const r = parseInt(hexColor.slice(1, 3), 16)
  const g = parseInt(hexColor.slice(3, 5), 16)
  const b = parseInt(hexColor.slice(5, 7), 16)

  // Вычисление яркости по формуле
  const brightness = (r * 299 + g * 587 + b * 114) / 1000

  // Возвращение белого цвета для темных фонов и черного для светлых
  return brightness > 128 ? 'var(--gray-600)' : '#ffffff'
}

export const createBGColorForCustomSelect = (culture: string | null | undefined, allFields: FieldType[]) => {
  if (culture === null || culture === undefined) {
    return '#565656'
  }
  return allFields.find(field => field.name === culture)?.color
}
