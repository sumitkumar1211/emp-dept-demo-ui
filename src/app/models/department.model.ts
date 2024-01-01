import { Employee } from './employee.model';

export class Department {
  readonly id: number;
  name: string;
  readOnly: boolean;
  required: boolean;
  employees?: Employee[];

  constructor(
    id: number,
    name: string,
    readOnly: boolean,
    required: boolean,
    employees: Employee[]
  ) {
    this.id = id;
    this.name = name;
    this.readOnly = readOnly;
    this.required = required;
    this.employees = this.employees;
  }
}
