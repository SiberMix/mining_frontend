export enum EquipmentSideOutTabsEnum {
  EQUIPMENT_LIST = 'equipment_list',
  EQUIPMENT_TYPE_LIST = 'equipment_type_list',
  EQUIPMENT_MODEL_LIST = 'equipment_model_list',
  EQUIPMENT_TRAILER_LIST = 'equipment_trailer_list'
}

export const equipmentSideOutTabs: { id: EquipmentSideOutTabsEnum, title: string }[] = [
  {
    id: EquipmentSideOutTabsEnum.EQUIPMENT_LIST,
    title: 'Оборудование'
  },
  {
    id: EquipmentSideOutTabsEnum.EQUIPMENT_TYPE_LIST,
    title: 'Тип'
  },
  {
    id: EquipmentSideOutTabsEnum.EQUIPMENT_MODEL_LIST,
    title: 'Модель'
  },
  {
    id: EquipmentSideOutTabsEnum.EQUIPMENT_TRAILER_LIST,
    title: 'Навесное' // Оставляем строку здесь, а переводим ниже
  }
];
