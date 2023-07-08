import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TbChitietComponent } from './tb-chitiet/tb-chitiet.component';
import { MatDialog } from '@angular/material/dialog';
import { ThietbiService } from 'src/app/data/_services/thietbi.service';
import { HttpClient } from '@angular/common/http';

export interface thietBiData {
  id: number;
  ten: string;
  serial: string;
  mac: string;
  kinhDo: string;
  viDo: string;
  donViHanhChinh: string;
  soDienThoai: string;
  soLoa: string;
  ghiChu: string;
  activated: string;
  delete: string;
  maModelThietBi: string;
  maLoaiThietBi: string;
}


@Component({
  selector: 'app-thietbi',
  templateUrl: './thietbi.component.html',
  styleUrls: ['./thietbi.component.css']
})
export class ThietbiComponent {
  displayedColumns: string[] = ['id', 'ten', 'serial', 'mac', 'soDienThoai', 'soLoa', 'action'];
  dataSource!: MatTableDataSource<thietBiData>;
  isLoading: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private http: HttpClient,
    private thietBiService: ThietbiService,
    private dialog: MatDialog
  ) {
    this.fetchThietBiData();
  }

  fetchThietBiData() {
    this.isLoading = true;
    this.thietBiService.LayDsThietBi().subscribe((data) => {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<thietBiData>(data);
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

  //hiển thị popup thông tin chi tiết
  info(id: any) {
    this.dialog.open(TbChitietComponent, {
      width: '400px',
      data: { id: id/* Truyền dữ liệu cần thiết vào đây */ },
    });
  }

}
