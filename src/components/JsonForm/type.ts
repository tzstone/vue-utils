export interface FormItem {
  type: 'input' | 'search' | 'textarea' | 'select' | 'slot';
  field?: string;
  label?: string;
  props?: {
    [key: string]: any
  }
  runtimeProps?: (form) => { [key: string]: any }
  options?: any[];
  runtimeOptions?: (form) => Promise<any[]>
  optionKey?: {
    label: string,
    value: string
  }
  required?: boolean;
  rules?: any[]
  on?: {
    [key: string]: (e) => void
  }
  style?: {
    [key: string]: any;
  }
  class?: string;
}
export interface Schema {
  formItems: FormItem[];
  submitBtn: {
    click: (e) => void,
    innerText?: string
  }
  resetBtn: boolean | {
    click?: (e) => void,
    innerText?: string
  }
}