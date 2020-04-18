import { Component, OnInit, ViewChild } from "@angular/core";
import { CollectorService } from "../collector.service";
import { DieCast } from "../collection";
import {
  MatTableDataSource,
  MatSort,
  MatDialog,
  MatDialogConfig,
} from "@angular/material";
import { InputFormComponent } from "../input-form/input-form.component";

@Component({
  selector: "app-mat-display",
  templateUrl: "./mat-display.component.html",
  styleUrls: ["./mat-display.component.css"],
})
export class MatDisplayComponent implements OnInit {
  dataSource: MatTableDataSource<DieCast> = new MatTableDataSource<DieCast>();
  displayedColumns: string[] = [];

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private collectorService: CollectorService,
    public dialog: MatDialog
  ) {
    this.displayedColumns = [
      "id",
      "year",
      "name",
      "brand",
      "mfr",
      "edit",
      "delete",
      "test",
    ];
  }

  ngOnInit() {
    this.collectorService.refrestOnSubmit.subscribe(() => {
      this.getCollection();
    });
    this.getCollection();
  }

  private getCollection() {
    this.collectorService
      .getAllFromServer()
      .subscribe((dieCast: DieCast[]) => (this.dataSource.data = dieCast));
    this.dataSource.sort = this.sort;
  }

  public filter = (value: string) => {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  };

  // CLICK ON ADD NEW BUTTON TO OPEN DIALOG FORM FOR INPUT
  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "40%";
    this.dialog.open(InputFormComponent, dialogConfig);
  }

  // CLICK ON EDIT ICON TO OPEN DIALOG POPULATED WITH ROW DATA TO EDIT
  onEdit(item: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "60%";
    dialogConfig.height = "40%";
    dialogConfig.data = item;
    this.dialog.open(InputFormComponent, dialogConfig);
  }

  // CLICK ON DELETE ICON TO DELETE ROW FROM DATABASE
  onDelete(item: string): void {
    this.collectorService
      .deleteItem(item["id"])
      .subscribe((_response) => this.ngOnInit()); //ngOnInit() reloads display component on delete in stead of entire page as with location.reload();.
  }

  // DEV.. CONSOLE LOG ROW DATA
  logData(row: any) {
    console.log(`logData() from any click on a row = ${row.id}`);
    return row;
  }

  // DEV.. CLICK ON TEST ICON TO CONSOLE LOG DATA
  test(item: { id: number }) {
    let car = this.collectorService.getItem(item.id);
    car.subscribe((response) => {
      console.log("test() returns getItem(item.id) =", response);
      return response; // use response.id to return just the id
    });
  }
}