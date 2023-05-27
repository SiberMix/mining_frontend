/*
eslint-disable
  no-multi-spaces,
*/

export enum httpMethod {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete',
  PATCH = 'patch'
}

export enum responseStatus {
  SUCCESS = 'success',
  ERROR = 'error'
}

export enum comparingMethod {
  LIKE = 'like',
  IN = 'in',
  EXCEPT = 'except',
  MORE = 'more',
  LESS = 'less',
  MORE_LESS = 'more_less',
  MORE_EQUALS = 'more_equals',
  LESS_EQUALS = 'less_equals',
  EQUALS = 'equals',
  RANGE = 'range'
}
