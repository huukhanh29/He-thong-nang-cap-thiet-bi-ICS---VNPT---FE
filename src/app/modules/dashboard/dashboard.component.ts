import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { KhachhangService } from 'src/app/data/_services/khachhang.service';
import { MatDialog } from '@angular/material/dialog';

export interface khachHangData {
  id: number;
  hoTen: string;
  diaChi: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  displayedColumns: string[] = ['id', 'hoTen', 'diaChi'];
  dataSource!: MatTableDataSource<khachHangData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private khachHangservice: KhachhangService,
    private dialog: MatDialog
  ) {
    this.fetchKhachHangData();
  }

  fetchKhachHangData() {
    this.khachHangservice.LayDsKhachHang().subscribe((data) => {
      this.dataSource = new MatTableDataSource<khachHangData>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
