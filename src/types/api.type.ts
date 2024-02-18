export interface Token {
  type: string | null;
  value: string | null;
}

export interface Response<T> {
  success: boolean;
  data: T
}

export interface Options {
  throwException?: boolean;
}
