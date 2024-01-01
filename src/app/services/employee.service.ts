import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';
import { GenericService } from './generic.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends GenericService<Employee> {
  override getResourceUrl(): string {
    return environment.EMPLOYEE_BASE_URL;
  }

  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAllEmployees(): Observable<Employee[]> {
    return this.getAll();
  }

  getEmployeeById(id: number): Observable<Employee> {
    return this.get(id);
  }

  createEmployee(employee: Employee): Observable<Employee> {
    return this.create(employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.update(employee);
  }

  deleteEmployee(id: number): Observable<number> {
    return this.delete(id);
  }
}
