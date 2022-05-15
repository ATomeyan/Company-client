import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CountDialogComponent} from "./count-dialog.component";
import {MatTableModule} from "@angular/material/table";
import {TranslateModule} from "@ngx-translate/core";
import {MatSortModule} from "@angular/material/sort";

@NgModule({
  declarations: [CountDialogComponent],
    imports: [
        CommonModule,
        MatTableModule,
        TranslateModule,
        MatSortModule
    ]
})
export class CountModule { }
