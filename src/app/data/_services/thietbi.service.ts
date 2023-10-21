import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
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
  deleteHeader(id: number): Observable<string> {
    const url = `/api/Header/${id}`;
    return this.http.delete(url, { responseType: 'text' }).pipe(
      map(() => 'Delete successful'), // Trả về một chuỗi văn bản sau khi xóa thành công
      catchError((error) => {
        console.error('Delete failed:', error);
        throw error;
      })
    );
  }

}
