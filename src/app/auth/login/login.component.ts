
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/data/_services/auth.service';
import { StorageService } from 'src/app/data/_services/storage.service';
import { ToastrService } from 'ngx-toastr';
import { KeycloakService } from 'keycloak-angular';

@Component({
  selector: 'my-login-form',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})

export class LoginComponent implements OnInit {

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  form: any = {
    username: null,
    password: null
  };

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router,

    private toastr: ToastrService,

  ) { }

  ngOnInit(): void {
    // if (this.storageService.isLoggedIn()) {
    //   this.isLoggedIn = true;
    //   this.router.navigate(['/home']);
    // }
  }

  submit() {
    const { username, password } = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.router.navigate(['/home']);
        this.toastr.success('Đăng nhập thành công');
      },
      error: err => {
        if (err.status === 0) {
          this.errorMessage = 'Lỗi server!';
          this.isLoginFailed = true;
        } else {
          this.errorMessage = 'Sai thông tin tài khoản hoặc mật khẩu!<br>Vui lòng kiểm tra lại!';
          this.isLoginFailed = true;
        }
        this.router.navigate(['/login']);
      }
    });
  }
}
