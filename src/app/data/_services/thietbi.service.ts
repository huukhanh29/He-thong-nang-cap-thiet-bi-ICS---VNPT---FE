import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const url = 'api/thiet-bi'
@Injectable({
  providedIn: 'root'
})
export class ThietbiService {
  constructor(private http: HttpClient) {}
  LayDsThietBi(): Observable<any> {
    return this.http.get(url);
  }
  LayThietBi(id:any): Observable<any> {
    return this.http.get(`${url}/${id}`);
  }
  NangCapThietBi(data:any): Observable<any> {
    return this.http.post(url + '/upgrade', data);
  }
}
