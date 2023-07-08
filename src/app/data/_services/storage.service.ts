import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

const SECRET_KEY = 'frontend-duonghuukhanh-prolaydo';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor(private cookieService: CookieService, private router: Router) {}
  public saveUser(user: any): void {
    this.cookieService.deleteAll();
    const { access_token, refresh_token} = user;

    // Mã hóa từng trường trước khi lưu vào cookie
    const encryptedAccessToken = CryptoJS.AES.encrypt(access_token, SECRET_KEY).toString();
    const encryptedRefreshToken = CryptoJS.AES.encrypt(refresh_token, SECRET_KEY).toString();

    // Lưu từng trường đã được mã hóa vào cookie
    this.cookieService.set('access_token', encryptedAccessToken, { expires: 7 });
    this.cookieService.set('refresh_token', encryptedRefreshToken, { expires: 7 });
  }

  public getUser(): any {
    const encryptedAccessToken = this.cookieService.get('access_token');
    const encryptedRefreshToken = this.cookieService.get('refresh_token');

    // Giải mã từng trường khi đọc từ cookie
    const access_token = CryptoJS.AES.decrypt(encryptedAccessToken, SECRET_KEY).toString(CryptoJS.enc.Utf8);
    const refresh_token = CryptoJS.AES.decrypt(encryptedRefreshToken, SECRET_KEY).toString(CryptoJS.enc.Utf8);

    // Tạo đối tượng user từ các trường đã được giải mã
    const user = {
      access_token,
      refresh_token
    };
    return user;
  }

  public isLoggedIn(): boolean {
    return this.cookieService.check('access_token');
  }

  public signOut(): void {
    this.cookieService.deleteAll();
    this.router.navigate(['/login']);
  }
}
