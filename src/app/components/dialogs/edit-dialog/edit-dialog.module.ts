import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EditDialogComponent} from "./edit-dialog.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatRadioModule} from "@angular/material/radio";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {EmployeesModule} from "../../employee-list/employees.module";

@NgModule({
  declarations: [EditDialogComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    TranslateModule,
    MatDatepickerModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    EmployeesModule
  ]
})
export class EditDialogModule {
}
