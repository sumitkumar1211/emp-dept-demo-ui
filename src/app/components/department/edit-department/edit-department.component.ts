import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-department',
  templateUrl: './edit-department.component.html',
  styleUrls: ['./edit-department.component.css'],
})
export class EditDepartmentComponent {
  departmentId!: number;
  model!: Department;
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
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe((params) => {
      this.departmentId = +params['id'];
      this.departmentService.get(this.departmentId).subscribe((dept) => {
        this.model = dept;
        this.form.patchValue({
          id: this.model.id,
          name: this.model.name,
          readOnly: this.model.readOnly,
          required: this.model.required,
          employees: this.model.employees,
        });
      });
    });
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      readOnly: [],
      required: [],
      employees: [],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      this.departmentService.updateDepartment(this.form.value).subscribe(
        async (data) => {
          if (data != null) {
            var resultData = data;
            if (resultData != null) {
              if (resultData != null) {
                this.toastr.success('updated');
                setTimeout(() => {
                  this.router.navigate(['/departments']);
                }, 500);
              }
            }
          }
        },
        async (error) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/departments']);
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
