import {Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {RecordsByTime} from "../../../models/records-by-time";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-count-dialog',
  templateUrl: './count-dialog.component.html',
  styleUrls: ['./count-dialog.component.css']
})
export class CountDialogComponent implements OnInit {

  public displayedColumns = ['firstName', 'lastName', 'time'];
  dataSource = new MatTableDataSource<RecordsByTime>();

  constructor() { }

  ngOnInit(): void {
  }


}
