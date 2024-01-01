import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css'],
})
export class AddEmployeeComponent implements OnInit {
  employeeId!: number;
  employee!: Employee;
  form!: FormGroup;
  departments: Department[] = [];
  dropdownList: Department[] = [];
  selectedItems: Department[] = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllDepartments();

    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
      idField: 'department',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      departments: [],
    });
  }

  onSubmit() {
    this.form.controls['departments'].setValue(this.selectedItems);
    console.log(this.form.value);
    if (this.form.valid) {
      this.employeeService.createEmployee(this.form.value).subscribe(
        (data) => {
          if (data != null) {
            var resultData = data;
            if (resultData != null) {
              this.toastr.success('created');
              setTimeout(() => {
                this.router.navigate(['/employees']);
              }, 500);
            }
          }
        },
        (error) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/home']);
          }, 500);
        }
      );
    }
  }

  onItemSelect(item: any) {
    console.log(item);
  }

  onSelectAll(items: any) {
    console.log(items);
  }

  getAllDepartments() {
    this.departmentService.getAll().subscribe((dept) => {
      this.departments = dept;
      this.dropdownList = dept;
    });
  }

  onChange($event: any) {
    this.selectedItems = $event;
  }
}
