import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { QuanLySubnetService } from '../../../data/_services/quanlysubnet.service';

export interface quanLySubnetData {
  id: number;
  diaChiIp: string;
  moTa: string;
}


@Component({
  selector: 'app-quanlysubnet',
  templateUrl: './quanlysubnet.component.html',
  styleUrls: ['./quanlysubnet.component.css']
})
export class QuanlysubnetComponent {

  displayedColumns: string[] = ['id', 'diaChiIp', 'moTa'];
  dataSource!: MatTableDataSource<quanLySubnetData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private quanLySubnetService: QuanLySubnetService,
    private dialog: MatDialog
  ) {
    this.fetchQuanLySubnetData();
  }

  fetchQuanLySubnetData() {
    this.quanLySubnetService.LayDsQuanLySubnet().subscribe((data) => {
      this.dataSource = new MatTableDataSource<quanLySubnetData>(data);
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
