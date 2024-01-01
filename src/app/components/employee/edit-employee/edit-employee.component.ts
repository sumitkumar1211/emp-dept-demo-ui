import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css'],
})
export class EditEmployeeComponent implements OnInit {
  employeeId!: number;
  employee!: Employee;
  employeeForm!: FormGroup;
  departments: Department[] = [];
  dropdownList: Department[] = [];
  selectedItems: Department[] = [];
  dropdownSettings: IDropdownSettings = {};

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe((params) => {
      this.employeeId = +params['id'];
      this.employeeService.get(this.employeeId).subscribe((emp) => {
        this.employee = emp;
        this.employeeForm.patchValue({
          id: this.employee.id,
          name: this.employee.name,
          departments: this.employee.departments,
        });
      });
    });

    this.getAllDepartments();

    this.dropdownSettings = {
      singleSelection: false,
      defaultOpen: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    };
  }

  private initForm(): void {
    this.employeeForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      departments: [],
    });
  }

  get getItems() {
    return this.dropdownList.reduce((acc, curr) => {
      // acc[curr.id] = curr;
      return acc;
    }, {});
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.employeeService.updateEmployee(this.employeeForm.value).subscribe(
        async (data) => {
          if (data != null) {
            var resultData = data;
            if (resultData != null) {
              if (resultData != null) {
                this.toastr.success('updated');
                setTimeout(() => {
                  this.router.navigate(['/employees']);
                }, 500);
              }
            }
          }
        },
        async (error) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/Home']);
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
}
