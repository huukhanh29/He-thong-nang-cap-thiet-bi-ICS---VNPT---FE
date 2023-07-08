import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NenTangService } from 'src/app/data/_services/nentang.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

export interface nenTangData {
  id: number;
  tenNenTang: string;
  donViSanXuat: string;
  phienBan: string;
}

@Component({
  selector: 'app-nentang',
  templateUrl: './nentang.component.html',
  styleUrls: ['./nentang.component.css']
})
export class NentangComponent {
  displayedColumns: string[] = ['id', 'tenNenTang', 'donViSanXuat', 'phienBan'];
  dataSource!: MatTableDataSource<nenTangData>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isLoading: boolean = false;
  constructor(
    private http: HttpClient,
    private nenTangservice: NenTangService,
    private dialog: MatDialog
  ) {
    this.fetchNenTangData();
  }

  fetchNenTangData() {
    this.isLoading = true;
    this.nenTangservice.LayDsNenTang().subscribe((data) => {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<nenTangData>(data);
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
