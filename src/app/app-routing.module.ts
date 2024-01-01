import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { DepartmentComponent } from './components/department/department.component';
import { HomeComponent } from './components/home/home.component';
import { AddEmployeeComponent } from './components/employee/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/employee/edit-employee/edit-employee.component';
import { ViewEmployeeComponent } from './components/employee/view-employee/view-employee.component';
import { AddDepartmentComponent } from './components/department/add-department/add-department.component';
import { EditDepartmentComponent } from './components/department/edit-department/edit-department.component';
import { ViewDepartmentComponent } from './components/department/view-department/view-department.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'edit-employee/:id', component: EditEmployeeComponent },
  { path: 'view-employee/:id', component: ViewEmployeeComponent },
  { path: 'add-department', component: AddDepartmentComponent },
  { path: 'edit-department/:id', component: EditDepartmentComponent },
  { path: 'view-department/:id', component: ViewDepartmentComponent },
  { path: 'employees', component: EmployeeComponent },
  { path: 'departments', component: DepartmentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
