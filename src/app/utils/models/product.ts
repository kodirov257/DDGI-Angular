import {Group, Klass, View} from '@app/utils/models';

export class Product {
  id: number;
  name: string;
  group_id: number;
  klass_id: number;
  view_id: number;
  group?: Group;
  klass?: Klass;
  view?: View;
}
