import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
const url = 'api/nen-tang'
@Injectable({
  providedIn: 'root'
})
export class NenTangService {
  constructor(private http: HttpClient) {}

  LayDsNenTang(): Observable<any> {
    return this.http.get(url);
  }

  ThemNenTang(data: any) {
    return this.http.post(url, data);
  }

  LayNenTang(id: any) {
    return this.http.get(`${url}/${id}`);
  }

  SuaNenTang(id: any, data: any) {
    return this.http.put(`${url}/${id}`, data);
  }

  XoaNenTang(id: any) {
    return this.http.delete(`${url}/${id}`);
  }
}
