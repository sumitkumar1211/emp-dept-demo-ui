import { Department } from './department.model';

export class Employee {
  // readonly id: number;
  id: number;
  name: string;
  departments: Department[];

  constructor(id?: number, name?: string, departments?: Department[]) {
    this.id = id ?? 0;
    this.name = name ?? '';
    this.departments = departments ?? [];
  }
}
