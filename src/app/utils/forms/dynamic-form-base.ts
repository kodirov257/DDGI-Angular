export class DynamicFormBase<T> {
  value: T;
  key: string;
  name: string;
  required: boolean;
  order: number;
  type: string;
  default: string;
  options: {key: string, value: string}[];

  constructor(options: {
      value?: T;
      key?: string;
      name?: string;
      required?: boolean;
      order?: number;
      type?: string;
      options?: {key: string, value: string}[];
      default?: string;
    } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.name = options.name || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.type = options.type || '';
    this.options = options.options || [];
    this.default = options.default || '';
  }
}
