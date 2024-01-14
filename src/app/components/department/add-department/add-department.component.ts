import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';

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

  get name(): AbstractControl {
    return this.form.controls['name'];
  }

  onSubmit() {
    if (this.form.valid) {
      this.departmentService.createDepartment(this.form.value).subscribe({
        next: (res) => {
          if (res) {
            this.toastr.success('created');
            setTimeout(() => {
              this.router.navigate(['/departments']);
            }, 500);
          }
        },
        error: (err) => {
          this.toastr.error(err.message);
          setTimeout(() => {
            this.router.navigate(['/departments']);
          }, 500);
        },
      });
    }
  }

  onChange($event: any) {
    this.selectedItems = $event;
  }
}
