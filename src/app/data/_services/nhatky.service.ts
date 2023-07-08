import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const url = 'api/nhat-ky-nang-cap'

@Injectable({
  providedIn: 'root',
})
export class NhatKyService {
  constructor(private http: HttpClient) {}
  LayDsNhatKy(): Observable<any> {
    return this.http.get(url);
  }
  ThemNhatKy(id: any, data: any) {
    return this.http.put(`${url}/${id}`, data);
  }
  LayNhatKy(id:any): Observable<any> {
    return this.http.get(`${url}/${id}`);
  }
}
