import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Department } from '../models/department.model';
import { GenericService } from './generic.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService extends GenericService<Department> {
  override getResourceUrl(): string {
    return environment.DEPARTMENT_BASE_URL;
  }

  constructor(protected override http: HttpClient) {
    super(http);
  }

  getAllDepartments(): Observable<Department[]> {
    return this.getAll();
  }

  getDepartmentById(id: number): Observable<Department> {
    return this.get(id);
  }

  createDepartment(department: Department): Observable<Department> {
    return this.create(department);
  }

  updateDepartment(department: Department): Observable<Department> {
    return this.update(department);
  }

  deleteDepartment(id: number): Observable<number> {
    return this.delete(id);
  }
}
