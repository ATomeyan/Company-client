import {Component, Inject, OnInit} from '@angular/core';
import {RecordsService} from "../../services/records/records.service";
import {Records} from "../../models/records";
import {MatTableDataSource} from "@angular/material/table";
import {FormBuilder, Validators} from "@angular/forms";
import {Department} from "../../models/department";
import {HttpErrorResponse} from "@angular/common/http";
import {DepartmentService} from "../../services/department/department.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import * as moment from "moment";
import {CountDialogComponent} from "../dialogs/count-dialog/count-dialog.component";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  public errMessage: string | undefined = undefined;
  public displayedColumns = ['entranceTime', 'exitTime', 'employeeFname', 'employeeLname'];
  dataSource = new MatTableDataSource<Records>();
  departments: Map<number, string>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: Records, private departmentService: DepartmentService,
              private recordsService: RecordsService, private fb: FormBuilder, private dialog: MatDialog) {

    this.departments = {} as Map<number, string>
  }

  dialogForm = this.fb.group({
    entranceTime: ['', Validators.required],
    exitTime: ['', Validators.required],
    employee: ['', Validators.required]
  });

  ngOnInit(): void {
    this.departments = this.getDepartments();
  }

  search() {
    const entrTime = this.dialogForm.controls['entranceTime'].value;
    const exitTime = this.dialogForm.controls['exitTime'].value;
    const depId = this.dialogForm.controls['employee'].value;
    const departmentId = {
      id: depId.key,
      name: depId.value
    };

    const req = {
      entranceTime: moment(entrTime).format("YYYY-MM-DD HH:mm:ss"),
      exitTime: moment(exitTime).format("YYYY-MM-DD HH:mm:ss"),
      department: departmentId
    };

    this.recordsService.getRecordsByCriteria(req).subscribe({
      next: (res) => this.dataSource.data = res,
      error: err => this.errMessage = err
    });
  }

  count() {
    this.dialog.open(CountDialogComponent,{
    });

    this.recordsService.getRecordsCount(this.data).subscribe()
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
}
