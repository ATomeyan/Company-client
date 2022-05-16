import {Component, OnInit, ViewChild} from '@angular/core';
import {EmployeeService} from "../../services/employee/employee-service";
import {Employee} from "../../models/employee";
import {MatTableDataSource} from "@angular/material/table";
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {AddDialogComponent} from "../dialogs/add-dialog/add-dialog.component";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {DeleteDialogComponent} from "../dialogs/delete-dialog/delete-dialog.component";
import {ExcelService} from "../../services/excel.service";
import {EditDialogComponent} from "../dialogs/edit-dialog/edit-dialog.component";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})

export class EmployeeListComponent implements OnInit {

  public errMessage: string | undefined = undefined;
  public displayedColumns = ['firstName', 'lastName', 'birthDay', 'email', 'gender', 'positionName', 'departmentName', 'actions'];
  dataSource = new MatTableDataSource<Employee>();
  private employee: any;

  constructor(private service: EmployeeService, private dialog: MatDialog, public translate: TranslateService, private excelService: ExcelService) {
    const browserLang = translate.getBrowserLang();
    this.translate.use(browserLang?.match(/en|ru|hy/) ? browserLang : 'en');
  }

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    if (this.dataSource) {
      this.dataSource.paginator = value;
    }
  }

  @ViewChild(MatSort)
  set sort(value: MatSort) {
    if (this.dataSource) {
      this.dataSource.sort = value;
    }
  }

  ngOnInit() {
    this.service.getAllEmployees().subscribe({
      next: (res) => this.dataSource.data = res,
      error: (error) => this.errMessage = error
    });
    this.dataSource.paginator = this.paginator;
  }

  addEmployee(selected?: Employee) {
    const emp = {...selected};
    const newRow = this.dialog.open(AddDialogComponent, {
      width: '50%',
      height: 'auto',
      hasBackdrop: true,
      maxHeight: '1000',
      data: selected ? emp : {
        id: 0,
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        email: '',
        gender: '',
        position: {
          id: 0,
          name: ''
        },
        department: {
          id: 0,
          name: ''
        }
      }
    });

    newRow.afterClosed().subscribe(result => {

      this.service.addEmployee(result).subscribe({
        next: (response: Employee) => {
          console.log("Added successfully", response);
        },
        error: err => this.errMessage = err
      })
    });
  }

  editEmployee(employee: any) {

    const newRow = this.dialog.open(EditDialogComponent, {
      width: '50%',
      height: 'auto',
      hasBackdrop: true,
      maxHeight: '1000',
      data: employee
    });

    newRow.afterClosed().subscribe(result => {

      this.service.updateEmployee(result.id, result).subscribe({
        next: (response: Employee) => {
          console.log("Updated successfully", response);
        },
        error: err => this.errMessage = err
      })
    });
  }

  delete(id: number) {

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {id: id}
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result) {
        this.service.deleteById(id).subscribe({
          next: () => this.dataSource.data = this.dataSource.data.filter(
            (e: Employee) => e.id !== id
          ),
          error: err => this.errMessage = err
        });

        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  download(): void {
    this.excelService.exportAsExcelFile(this.dataSource.data, 'employee');
  }
}
