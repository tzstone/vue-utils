export interface FormItem {
  type: 'input' | 'search' | 'textarea' | 'select' | 'slot' | 'checkbox' | 'checkboxGroup' | 'date' | 'dateRange';
  field?: string;
  label?: string;
  props?: {
    [key: string]: any;
  };
  runtimeProps?: (form) => { [key: string]: any };
  // select/checkboxGroup
  options?: any[] | ((form) => Promise<any[]>);
  optionKey?: {
    label: string;
    value: string;
  };
  // button/checkbox
  innerText?: string;
  required?: boolean;
  show?: boolean | ((form) => boolean);
  rules?: any[];
  on?: {
    [key: string]: (e) => void;
  };
  style?: {
    [key: string]: any;
  };
  class?: string;
  col?: number; // 组件布局规则
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
