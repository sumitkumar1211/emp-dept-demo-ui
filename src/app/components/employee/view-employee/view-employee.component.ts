import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee.model';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css'],
})
export class ViewEmployeeComponent implements OnInit {
  employeeId!: number;
  employee!: Employee;
  model!: Employee;
  form!: FormGroup;

  constructor(
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.route.params.subscribe((params) => {
      this.employeeId = +params['id'];
      this.employeeService.get(this.employeeId).subscribe((emp) => {
        this.employee = emp;
        this.form.patchValue({
          id: this.employee.id,
          name: this.employee.name,
          departments: this.employee.departments,
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
