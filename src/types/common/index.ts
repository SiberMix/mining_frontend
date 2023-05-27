import type { ReactNode } from 'react'
import type { DropdownOption } from '@zemka4/technoavia.ui.dropdown/dropdown'
import type { sendFiltersType } from '@zemka4/technoavia.components.filters.filter-panel'
import type { sortOrderBy } from 'enums/common'
import type {
  comparingMethod,
  comparingMethodBigLetter
} from 'enums/api'
import type { langAlias } from 'enums/language'

export type OnOffType = (0 | 1)

export type langAliasType = `${langAlias}`

export type localeStringType = {
  [key in langAliasType]?: string
}

export type LocaleFieldDataType<FieldName extends string> = {
  [lang in langAliasType as `${FieldName}-${lang}`]: string
}

export type intervalFilterType = {
  start_at: string | null,
  end_at: string | null
}

export type metaDataType = {
  title: localeStringType,
  description: localeStringType,
  keywords: localeStringType
}

export type checkboxFilterType = (string | number)[]

export interface rowOrderChangeType {
  from: number,
  to: number
}

export interface searchDataType {
  name: string,
  value: string
}

export interface requestFilterDataType {
  name: string,
  value: intervalFilterType | checkboxFilterType | null,
  comparing: `${comparingMethod}` | `${comparingMethodBigLetter}`
}

export interface searchFilterDataType {
  id: string | number,
  value: string
}

export type sortOrderType = `${sortOrderBy.ASC}` | `${sortOrderBy.DESC}`

export interface sortType {
  sortBy: string | null,
  sortOrder: sortOrderType | null
}

export type paginationType = {
  limit: number,
  current: number,
  last: number,
  to: number,
  total: number
}

export type paginationLinksType = {
  url: string | null,
  label: string,
  active: boolean
}

export interface localeInputValueType {
  lang: langAliasType, value: string
}

export interface FormPageProps {
  editId?: string | null
}

export interface stringKeyObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

export type validationRuleType<formDataType> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  method: string | ((field: any, formData: formDataType) => string | any[] | null),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  params?: any
}

export type CommonValidationType<formDataType> = {
  [key in string]?: validationRuleType<formDataType>[]
}

export type CommonEditItemValidationType<editItemStateType> =
  CommonValidationType<editItemStateType> & {
    [key in keyof editItemStateType]?: validationRuleType<editItemStateType>[]
  }

export type FormDataErrorType<FormDataType> = {
  [key in keyof FormDataType]?: FormDataType[key] extends unknown[]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ? any : string
}

export type tabNamesListType<tabNamesType extends string, FormDataType> = {
  [key in tabNamesType]?: (keyof FormDataErrorType<FormDataType>)[]
}

export type IsFormValidType<FormDataType,
  DataKeys extends keyof FormDataType = keyof FormDataType> = (
  validationRules: CommonEditItemValidationType<FormDataType>,
  formData: {
    [key in DataKeys]: FormDataType[key]
  },
  errorData: FormDataErrorType<FormDataType>,
  isNotShowErrorTab?: boolean
) => boolean

export type RawDropDownLabelType = string | ReactNode | localeStringType

export interface RawDropDownOption {
  id?: number | string,
  name?: RawDropDownLabelType
}

export interface UrlType {
  original?: string,
  small?: string,
  standart?: string,
  large?: string
}

export type keySizeType = Exclude<keyof UrlType, 'original'>

export interface SizesDropdownOption extends DropdownOption {
  value: keySizeType
}

export type SortDataRequestType = (
  & { [x: number]: number }
)

export type comparingType = `${comparingMethod}` | `${comparingMethodBigLetter}`

export type comparingTypeItem = { [comparingKey in comparingMethod]?: comparingType }

export type CustomComparingType = {
  [id in sendFiltersType['id']]: comparingTypeItem
}

export type SubmitHandlerProps = {
  /**
   * Закрывать форму после сохранения
   */
  isRedirectToList?: boolean,
  /**
   * Отправлять запрос на изменение после создания
   */
  withUpdateAfterCreate?: boolean
}
