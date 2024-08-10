import { ModalTypeEnum } from '~entities/polygon/components/polygon-edit-modal/model/modal-type-enum'
import type { PolygonType } from '~processes/redux/slices/mapSlice'

export function createEditModalInitialValue(showEditModal: ModalTypeEnum | null, polygon: PolygonType): string {
  return showEditModal === ModalTypeEnum.EDIT_POLYGON_NAME
    ? polygon.name
    : polygon.sequence?.name ?? ''
}
