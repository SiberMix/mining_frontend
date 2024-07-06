export type FieldsStore = {
  fieldList: FieldType[],
  showAddFieldModal: boolean,
  editedField: FieldType | undefined,
  setVisibleAddFieldModal: (val: boolean) => void,
  setChangeFieldModal: (id: number) => void,
  getAllFields: () => void,
  addField: (field: FieldAddType) => void,
  changeField: (field: FieldType) => Promise<void>,
  deleteField: (id: number) => void
}

export type FieldType = {
  id: number,
  name: string,
  color: string
}
type FieldAddType = {
  name: string,
  color: string
}
