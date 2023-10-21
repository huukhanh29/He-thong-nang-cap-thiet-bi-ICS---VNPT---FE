import { NhatKyService } from './../../data/_services/nhatky.service';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import * as XLSX from 'xlsx';
import * as XLSXStyle from 'xlsx-js-style';
import { InfoComponent } from './info/info.component';
import { MatDialog } from '@angular/material/dialog';

export interface NhatKyData {
  id: number;
  thoiDiemNangCap: string;
  goiNangCap: any;
  nguoiNangCap: string;
  trangThai: string;
  thoiDiemNhanLenh: string;
  thoiDiemTcTb: string;
  lyDo: string;
}

@Component({
  selector: 'app-nhatky',
  templateUrl: './nhatky.component.html',
  styleUrls: ['./nhatky.component.css'],
})
export class NhatkyComponent {
  displayedColumns: string[] = [
    'stt',
    'goiNangCap',
    'nguoiNangCap',
    'thoiDiemNangCap',
    'lyDo',
    'trangThai',
    'action',
  ];
  dataSource!: MatTableDataSource<NhatKyData>;
  dataExel: any;
  namOptions: string[] = ['của tất cả năm']; // Tên của file excel xuất  ra
  selectedYear: string = 'của tất cả năm';
  nameFile = 'Nhật ký nâng cấp';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  isLoading: boolean = false;
  constructor(private http: HttpClient, private nhatKyService: NhatKyService,
    private dialog: MatDialog) {
    this.fetchNhatKyData();
  }

  fetchNhatKyData() {
    this.isLoading = true;
    this.nhatKyService.LayDsNhatKy().subscribe((data) => {
      this.isLoading = false;
      this.dataSource = new MatTableDataSource<NhatKyData>(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataExel = this.dataSource.filteredData;
      // Tạo danh sách các năm từ trường thoiDiemNangCap
      this.namOptions = Array.from(
        new Set(
          data.map((item: { thoiDiemNangCap: string | number | Date }) =>
            new Date(item.thoiDiemNangCap).getFullYear()
          )
        )
      );

      if (this.selectedYear !== 'của tất cả năm') {
        this.filterByYear(this.selectedYear);
      }
    });
  }
  // excel theo năm
  filterByYear(year: string) {
    this.selectedYear = year;
    if (this.selectedYear === 'của tất cả năm') {
      this.dataSource.filter = '';
    } else {
      this.dataSource.filterPredicate = (data: NhatKyData, filter: string) => {
        const yearFilter = new Date(data.thoiDiemNangCap)
          .getFullYear()
          .toString();
        return yearFilter === filter;
      };
      this.dataSource.filter = this.selectedYear.toString();
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }

    this.nameFile = `Nhật ký nâng cấp ${this.selectedYear}`;
    this.dataExel = this.dataSource.filteredData;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  //hiển thị popup thông tin chi tiết
  info(id:any) {
    this.dialog.open(InfoComponent, {
      width: '400px',
      data: {  id: id/* Truyền dữ liệu cần thiết vào đây */ },
    });
  }
  // Export excel
  exportToExcel(): void {
    const element = document.getElementById('season-tble');
    const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    //gộp ô
    worksheet['!merges'] = [{ s: { r: 0, c: 0 }, e: { r: 0, c: 7 } }];
    //custom style
    worksheet['A1'] = {
      t: 's',
      v: 'Nhật Ký Nâng Cấp',
      s: { alignment: { horizontal: 'center' }, font: { bold: true } },
    };

    for (let col = 0; col <= 7; col++) {
      const cell = XLSX.utils.encode_cell({ r: 1, c: col });
      worksheet[cell].s = { font: { bold: true } };
    }
    const columnWidths = [
      { wch: 5 }, // A
      { wch: 15 }, // B
      { wch: 15 }, // C
      { wch: 20 }, // D
      { wch: 20 }, // E
      { wch: 15 }, // F
      { wch: 20 }, // G
      { wch: 15 }, // H
    ];
    worksheet['!cols'] = columnWidths;

    const book: XLSXStyle.WorkBook = XLSXStyle.utils.book_new();
    XLSXStyle.utils.book_append_sheet(book, worksheet, 'Sheet1');
    XLSXStyle.writeFile(book, `${this.nameFile}.xlsx`);
  }
}
