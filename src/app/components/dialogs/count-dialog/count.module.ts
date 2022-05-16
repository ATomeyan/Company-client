import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CountDialogComponent} from "./count-dialog.component";
import {MatTableModule} from "@angular/material/table";
import {TranslateModule} from "@ngx-translate/core";
import {MatSortModule} from "@angular/material/sort";
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [CountDialogComponent],
    imports: [
        CommonModule,
        MatTableModule,
        TranslateModule,
        MatSortModule,
        MatDialogModule,
        MatButtonModule
    ]
})
export class CountModule { }
