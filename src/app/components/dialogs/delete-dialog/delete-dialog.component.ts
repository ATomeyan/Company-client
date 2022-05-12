import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {EmployeeService} from "../../../services/employee/employee-service";
import {Employee} from "../../../models/employee";

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, private employeeService: EmployeeService,
              @Inject(MAT_DIALOG_DATA) public data: Employee) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.employeeService.deleteById(this.data.id);
  }
}
