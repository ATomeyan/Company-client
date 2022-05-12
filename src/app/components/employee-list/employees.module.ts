import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EmployeeListComponent} from "./employee-list.component";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {TranslateModule} from "@ngx-translate/core";
import {MatSortModule} from "@angular/material/sort";
import {TransformPipe} from '../pipe/transform.pipe';
import {ExcelService} from "../../services/excel.service";

@NgModule({
  declarations: [EmployeeListComponent, TransformPipe],
  exports: [
    EmployeeListComponent,
    MatPaginatorModule,
    TransformPipe
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    TranslateModule,
    MatSortModule
  ],
  providers:[ExcelService]
})
export class EmployeesModule {
}
