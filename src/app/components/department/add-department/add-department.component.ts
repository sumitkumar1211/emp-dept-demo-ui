import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-department',
  templateUrl: './add-department.component.html',
  styleUrls: ['./add-department.component.css'],
})
export class AddDepartmentComponent implements OnInit {
  form!: FormGroup;
  departments: Department[] = [];
  dropdownList: Department[] = [];
  selectedItems: Department[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
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
      this.departmentService.createDepartment(this.form.value).subscribe(
        (data) => {
          if (data != null) {
            var resultData = data;
            if (resultData != null) {
              this.toastr.success('created');
              setTimeout(() => {
                this.router.navigate(['/departments']);
              }, 500);
            }
          }
        },
        (error) => {
          this.toastr.error(error.message);
          setTimeout(() => {
            this.router.navigate(['/departments']);
          }, 500);
        }
      );
    }
  }

  onChange($event: any) {
    this.selectedItems = $event;
  }
}
