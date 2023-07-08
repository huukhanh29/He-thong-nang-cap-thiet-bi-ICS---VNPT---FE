import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const url = 'api/goi-nang-cap'
@Injectable({
  providedIn: 'root'
})
export class QuanLySubnetService {
  constructor(private http: HttpClient) {}
  LayDsQuanLySubnet(): Observable<any> {
    return this.http.get(url + 'quanlysubnet');
  }
  LayQuanLySubnet(id:any): Observable<any> {
    return this.http.get(`${url}quanlysubnet/${id}`);
  }
}
