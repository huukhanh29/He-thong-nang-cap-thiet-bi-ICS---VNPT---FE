import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { StorageService } from './storage.service';
const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private storageService: StorageService) {}

  login(taikhoan: string, matkhau: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new HttpParams()
      .set('grant_type', 'password')
      .set('client_id', 'angular-pkce-client')
      .set('client_secret', 'XQMZDm3fLXWQQNzTL0QAZNzzMNdywu0T')
      .set('username', taikhoan)
      .set('password', matkhau)
      //post by proxy "target": "http://10.82.24.11:30141/realms/ics/protocol/openid-connect"
    return this.http.post(
      '/token',
      body.toString(),
      { headers: headers }
    ).pipe(
      tap(response => {
        // Lưu thông tin người dùng vào cookie sau khi đăng nhập thành công
        this.storageService.saveUser(response)
      })
    );
  }
  refreshAccessToken(refreshToken: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('client_id', 'angular-pkce-client')
      .set('client_secret', 'XQMZDm3fLXWQQNzTL0QAZNzzMNdywu0T')
      .set('refresh_token', refreshToken);

    return this.http.post(
      '/token',
      body.toString(),
      { headers: headers }
    );
  }

  getUserInfo(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get('/userinfo', { headers });
  }
  resetPassword(userId: string, newPassword: string, accessToken: string) {
    const url = `http://10.82.24.11:30141/admin/realms/ics/users/${userId}/reset-password`;
    const headers = new HttpHeaders()
      .set('Authorization', `Bearer ${accessToken}`)
      .set('Content-Type', 'application/json');
    const body = {
      type: 'password',
      temporary: false,
      value: newPassword
    };
    return this.http.put(url, body, { headers });
  }

}
