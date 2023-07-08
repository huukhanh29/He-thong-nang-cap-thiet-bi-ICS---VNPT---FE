import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const url = 'api/goi-nang-cap'
@Injectable({
  providedIn: 'root'
})
export class KhachhangService {
  constructor(private http: HttpClient) { }
  LayDsKhachHang(): Observable<any> {
    return this.http.get(url + 'khachhang');
  }
  LayKhachHang(id: any): Observable<any> {
    return this.http.get(`${url}khachhang/${id}`);
  }
}
