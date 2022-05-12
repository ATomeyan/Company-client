import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Employee} from "../../../models/employee";
import {EmployeeService} from "../../../services/employee/employee-service";
import {PositionService} from "../../../services/position/position.service";
import {DepartmentService} from "../../../services/department/department.service";
import {Position} from "../../../models/position";
import {HttpErrorResponse} from "@angular/common/http";
import {Department} from "../../../models/department";
import * as moment from "moment";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css']
})
export class EditDialogComponent implements OnInit {

  positions: Map<number, string>;
  departments: Map<number, string>;
  dialogForm: FormGroup;
  genders: string[] = ['Male', 'Female'];

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Employee, private employeeService: EmployeeService,
    private positionService: PositionService, private departmentService: DepartmentService, fb: FormBuilder) {

    this.positions = {} as Map<number, string>;
    this.departments = {} as Map<number, string>;

    this.dialogForm = fb.group({
      'firstName': ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      'lastName': ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      'dateOfBirth': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      'gender': ['', Validators.required],
      'positionId': ['', Validators.required],
      'departmentId': ['', Validators.required]
    });
  }

  ngOnInit(): void {

    this.positions = this.getPositions();
    this.departments = this.getDepartments();

    const formValue = {
      firstName: this.data.firstName,
      lastName: this.data.lastName,
      dateOfBirth: this.data.dateOfBirth,
      email: this.data.email,
      gender: this.data.gender,
      positionId: this.data.position.id,
      departmentId: this.data.department.id
    }
    this.dialogForm.setValue(formValue);

    this.dialogForm.controls['dateOfBirth'].valueChanges.subscribe((value) => {
      if (value) {
        this.dialogForm.controls['dateOfBirth'].patchValue(moment(value).format('YYYY-MM-DD'))
      }
    });
  }

  close() {
    this.dialogRef.close();
  }

  public getPositions(): Map<number, string> {
    let temp = new Map();

    this.positionService.getAllPositions().subscribe({
      next: (response: Position[]) => response.forEach(n =>
        temp.set(n.id, n.name)),
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      }
    });
    return temp;
  }

  public getDepartments(): Map<number, string> {
    let temp = new Map();

    this.departmentService.getAllDepartments().subscribe({
      next: (response: Department[]) => response.forEach(n => {
        temp.set(n.id, n.name);
      }),
      error: (error: HttpErrorResponse) => {
        alert(error.message)
      }
    });
    return temp;
  }

  save(): void {
    this.dialogForm.value.id = this.data.id;

    this.dialogForm.value.position = {
      id: this.dialogForm.value.positionId
    }

    this.dialogForm.value.department = {
      id: this.dialogForm.value.departmentId
    }

    this.dialogRef.close(this.dialogForm.value);
  }
}
