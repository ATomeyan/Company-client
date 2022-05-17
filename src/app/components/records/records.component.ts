import {Component, Inject, OnInit, ViewChild} from '@angular/core';
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
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css'],
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

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  dialogForm = this.fb.group({
    entranceTime: ['', Validators.required],
    exitTime: ['', Validators.required],
    employee: ['', Validators.required]
  });

  ngOnInit(): void {
    this.departments = this.getDepartments();
  }

  criteria() {
    const entrTime = this.dialogForm.controls['entranceTime'].value;
    const exitTime = this.dialogForm.controls['exitTime'].value;
    const depId = this.dialogForm.controls['employee'].value;
    const departmentId = {
      id: depId.key,
      name: depId.value
    };

    return {
      entranceTime: moment(entrTime).format("YYYY-MM-DD HH:mm:ss"),
      exitTime: moment(exitTime).format("YYYY-MM-DD HH:mm:ss"),
      department: departmentId
    };
  }

  search() {
    this.recordsService.getRecordsByCriteria(this.criteria()).subscribe({
      next: (res) => this.dataSource.data = res,
      error: err => this.errMessage = err
    });
  }

  count() {
    let data = this.criteria();

    this.dialog.open(CountDialogComponent, {
      width: '100%',
      maxWidth: '400px',
      height: 'auto',
      hasBackdrop: true,
      maxHeight: '700px',
      data: data
    });
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
