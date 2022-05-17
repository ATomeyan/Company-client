import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecordsComponent} from "./records.component";
import {TranslateModule} from "@ngx-translate/core";
import {MatTableModule} from "@angular/material/table";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {NgxMatDatetimePickerModule, NgxMatNativeDateModule} from "@angular-material-components/datetime-picker";
import {MAT_DIALOG_DATA, MatDialogModule} from "@angular/material/dialog";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [RecordsComponent],
  exports: [
    RecordsComponent
  ],
    imports: [
        CommonModule,
        TranslateModule,
        MatTableModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatIconModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        MatDialogModule,
        MatPaginatorModule
    ],

  providers:[
    {provide: MAT_DIALOG_DATA, useValue: ''}
  ]
})
export class RecordsModule {
}
