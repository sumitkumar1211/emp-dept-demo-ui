import { Component, Type } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Department } from 'src/app/models/department.model';
import { Employee } from 'src/app/models/employee.model';
import { DepartmentService } from 'src/app/services/department.service';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'ng-modal-confirm',
  template: `
    <div class="modal-header">
      <h5 class="modal-title" id="modal-title">Delete Confirmation</h5>
      <button
        type="button"
        class="btn close"
        aria-label="Close button"
        aria-describedby="modal-title"
        (click)="modal.dismiss('Cross click')"
      >
        <span aria-hidden="true">X</span>
      </button>
    </div>
    <div class="modal-body">
      <p>Are you sure you want to delete?</p>
    </div>
    <div class="modal-footer">
      <button
        type="button"
        class="btn btn-outline-secondary"
        (click)="modal.dismiss('cancel click')"
      >
        CANCEL
      </button>
      <button
        type="button"
        ngbAutofocus
        class="btn btn-success"
        (click)="modal.close('Ok click')"
      >
        OK
      </button>
    </div>
  `,
})
export class NgModalConfirm {
  constructor(public modal: NgbActiveModal) {}
}

const MODALS: { [name: string]: Type<any> } = {
  deleteModal: NgModalConfirm,
};

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent {
  closeResult = '';
  model: Department[] = [];
  constructor(
    private router: Router,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private departmentService: DepartmentService
  ) {}

  ngOnInit(): void {
    this.getAllDepartments();
  }

  async getAllDepartments() {
    this.departmentService.getAllDepartments().subscribe(
      (data: any) => {
        if (data != null) {
          var resultData = data;
          if (resultData) {
            this.model = resultData;
          }
        }
      },
      (error: any) => {
        if (error) {
          if (error.status == 404) {
            if (error.error && error.error.message) {
              this.model = [];
            }
          }
        }
      }
    );
  }

  addEmployee() {
    this.router.navigate(['add-department']);
  }

  deleteDepartmentConfirmation(department: Department) {
    this.modalService
      .open(MODALS['deleteModal'], {
        ariaLabelledBy: 'modal-basic-title',
      })
      .result.then(
        (result) => {
          this.deleteDepartment(department);
        },
        (reason) => {}
      );
  }

  deleteDepartment(department: Department) {
    this.departmentService.deleteDepartment(department.id).subscribe(
      (data: number) => {
        if (data != null) {
          var resultData = data;
          this.toastr.success('department got deleted');
          this.getAllDepartments();
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
