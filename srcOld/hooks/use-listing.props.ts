import type { ReactNode } from 'react'
//@ts-ignore
import type {
  ListRequestType,
  MessageResponseType,
  promiseResponse
} from 'types/api'
//@ts-ignore
import type { ContentHeaderProps } from 'components/content-header'
//@ts-ignore
import type { localeStringType } from '../../types/common'

export interface UseListingCustomLimitSelect {
  label: string,
  options: limitItemType[],
  onChangeHandler: (limit: number) => void
}

export interface UseListingProps<Type> {
  /**
   * Данные для шапки
   *
   * Если передать `null` - то шапка не будет рендериться
   */
  headerData?: ContentHeaderProps | null,

  /**
   * Метод определения имени/названия айтема списка.
   *
   * Если не передавать - то будет браться просто `item.name`
   */
  getName?: ((item: Type) => localeStringType | string) | null,

  /**
   * Действия в таблице
   */
  tableActions?: actionButtonType[],

  /**
   * Действия в дропдауне под таблицей
   */
  tableSelectActions?: DropdownOption[],

  /**
   * Алиасы всех колонок
   */
  columnNames?: string[],

  /**
   * Алиасы сортируемых колонок
   */
  sortableColumns?: string[],

  /**
   * Кастомный плейсходдер инпута поиска
   */
  searchPlaceholder?: string,

  /**
   * Данные фильтров.
   *
   * Если `undefined` (по дефолту) - не рендерит пенель фильтров.
   *
   * Если `[]` - то рендерит панель фильтров с поиском, но без фильтров.
   */
  filterData?: filterItemType[],

  /**
   * Отключает действия таблицы (в том числе редактирование и удаления)
   */
  disableActions?: boolean,

  /**
   * Разрешить переносы слов в кебабе действий таблицы
   */
  multilineKebabItems?: boolean,

  /**
   * Показывать дропдаун _Показывать на транице_
   */
  showLimitSelector?: boolean,

  /**
   * Включает функционал drag and drop.
   * В таблице появляются draggable-кнопки
   */
  hasDragAndDrop?: boolean,

  /**
   * статус для обновленя query по страницам,
   * нужно отключать, когда листинг например в форме
   */
  isUpdatePageQuery?: boolean,

  /**
   * Кастомный заголовок модального окна подтверждения удаления
   */
  removeModalTitle?: (removingName: string) => string,

  /**
   * Кастомный контент модального окна подтверждения удаления
   */
  removeModalContent?: (removingName: string) => ReactNode,

  /**
   * Метод предзагрузки данных.
   *
   * Вызывается при монтировании. После завершения отправляется запрос на получение списка
   */
  prefetchMethod?: (() => Promise<void>) | null,

  /**
   * Метод получения списка
   */
  fetchListHandler?: (
    params?: ListRequestType,
    relation?: string[]
  ) => promiseResponse<Type[]> | null,

  /**
   * Метод смены порядка в списке
   */
  fetchOrderHandler?: (
    orderData: number[]
  ) => promiseResponse<MessageResponseType>,

  /**
   * Метод удаления айтемов
   */
  deleteItemHandler?: (idList: number) => promiseResponse<MessageResponseType>,

  /**
   * Метод удаления айтемов
   */
  editItemHandler?: (idList: number) => promiseResponse<MessageResponseType>,

  /**
   * Метод преобразования данных для таблицы
   */
  mapTableData?: (data: Type[]) => tableType,

  /**
   * Метод сортировки массива для rowOrderData
   */
  changeRowOrderDataHandler?: (item: Type[]) => number[],

  /**
   * Handler клика по действию в таблице
   * (кроме редактирования и удаления)
   */
  onAdditionalActionClick?: (
    id: number,
    action: string,
    state?: boolean | null
  ) => void,

  /**
   * Handler выбора действия в дропдауне под таблицей
   * (кроме удаления выбранных)
   */
  onAdditionalActionSubmit?: (items: string[], action: string) => void,

  /**
   * данные для замены limitSelector-a кастомным селектом
   */
  customLimitSelectData?: UseListingCustomLimitSelect | null,

  /**
   * Кастомный метод для поиска в фильтре
   */
  customSearchMethod?: (query: string, filters?: sendFiltersType[]) => void,

  /**
   * Кастомный метод для управления фильтрами
   */
  customFilterChangeHandler?:
    | null
    | ((
        filters: sendFiltersType[],
        query?: string
      ) => void | Promise<sendFiltersType[] | void>)
}
