import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Department } from 'src/app/models/department.model';
import { DepartmentService } from 'src/app/services/department.service';

@Component({
  selector: 'app-view-department',
  templateUrl: './view-department.component.html',
  styleUrls: ['./view-department.component.css'],
})
export class ViewDepartmentComponent implements OnInit {
  departmentId!: number;
  model!: Department;
  form!: FormGroup;

  constructor(
    private departmentService: DepartmentService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
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

  initForm(): void {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      departments: [],
    });
  }
}
