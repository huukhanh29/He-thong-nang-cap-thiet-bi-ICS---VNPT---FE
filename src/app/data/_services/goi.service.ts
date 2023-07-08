import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
const url = 'api/goi-nang-cap'
@Injectable({
  providedIn: 'root'
})
export class GoiService {
  constructor(private http: HttpClient) {}
  LayDsGoi(): Observable<any> {
    return this.http.get(url);
  }
  ThemGoi(data: any) {
    return this.http.post(url, data);
  }
  LayGoi(id: any) {
    return this.http.get(`${url}/${id}`);
  }
  SuaGoi(id: any, data: any) {
    return this.http.put(`${url}/${id}`, data);
  }
  ThongTinFile(id: any) {
    return this.http.get(`${url}/${id}/info`);
  }
  TaiGoi(id: any): Observable<any> {
    return this.http.get(`${url}/${id}/download` , { responseType: 'blob' });
  }

}
