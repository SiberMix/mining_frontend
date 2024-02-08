import { ModalTypeEnum } from '~entities/polygon/ui/polygon-edit-modal/model/modal-type-enum'

import type { PolygonType } from '../../../../../srcOld/redux/slices/mapSlice'

export function createEditModalInitialValue(showEditModal: ModalTypeEnum | null, polygon: PolygonType): string {
  return showEditModal === ModalTypeEnum.EDIT_POLYGON_NAME
    ? polygon.name
    : polygon.sequence?.name ?? ''
}
