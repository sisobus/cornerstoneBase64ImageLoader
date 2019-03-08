export interface Option {
  channel: number
  width?: number | null
  height?: number | null
  schema: string
}
export const _defaultOptions: Option = {
  channel: 4,
  width: null,
  height: null,
  schema: 'base64://'
}
