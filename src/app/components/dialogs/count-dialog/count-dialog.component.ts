import {Component, Inject, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {RecordsService} from "../../../services/records/records.service";
import {Records} from "../../../models/records";

@Component({
  selector: 'app-count-dialog',
  templateUrl: './count-dialog.component.html',
  styleUrls: ['./count-dialog.component.css']
})
export class CountDialogComponent implements OnInit {

  public errMessage: string | undefined = undefined;
  public displayedColumns = ['firstName', 'lastName', 'time'];
  dataSource = new MatTableDataSource<Records>();

  constructor(@Inject(MAT_DIALOG_DATA) public data: Records, private service: RecordsService) {
  }

  ngOnInit(): void {
    this.service.getRecordsCount(this.data).subscribe({
      next: (res) => this.dataSource.data = res,
      error: (err) => this.errMessage = err
    });
  }
}
