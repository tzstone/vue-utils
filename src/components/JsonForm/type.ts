export type RuntimeOptions = (form) => Promise<any[]>;
export type RuntimeShow = (form) => boolean;
export interface FormItem {
  type:
    | 'input'
    | 'search'
    | 'textarea'
    | 'select'
    | 'slot'
    | 'checkbox'
    | 'checkboxGroup'
    | 'date'
    | 'dateRange'
    | 'upload';
  field?: string;
  label?: string;
  props?: {
    [key: string]: any;
  };
  runtimeProps?: (form) => { [key: string]: any };
  // select/checkboxGroup
  options?: any[] | RuntimeOptions;
  optionKey?: {
    label: string;
    value: string;
  };
  // button/checkbox
  innerText?: string;
  required?: boolean;
  show?: boolean | RuntimeShow;
  rules?: any[];
  on?: {
    [key: string]: (e) => void;
  };
  style?: {
    [key: string]: any;
  };
  class?: string;
  // TODO: 组件布局规则
  col?: {
    span: number;
  };
}

export interface RenderFormItem extends FormItem {
  display?: boolean;
  component?: string;
}
export interface OperateBtns {
  icon?: string;
  innerText?: string;
  click: (e) => void;
}
export interface Schema {
  prefixBtns: OperateBtns[];
  formItems: FormItem[];
  submitBtn: {
    click: (e) => void;
    innerText?: string;
  };
  resetBtn:
    | boolean
    | {
        click?: (e) => void;
        innerText?: string;
      };
}
