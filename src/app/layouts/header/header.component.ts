import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChangepassComponent } from 'src/app/auth/changepass/changepass.component';
import { LogoutComponent } from 'src/app/auth/logout/logout.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  opened = true;

  constructor(private dialog: MatDialog, @Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.checkScreenWidth();
    this.addResizeListener();
  }

  // Kiểm tra độ rộng màn hình và đặt giá trị cho biến opened
  checkScreenWidth(): void {
    this.opened = this.isSmallScreen() ? false : true;
  }

  // Kiểm tra xem màn hình có đúng là nhỏ hơn hoặc bằng 800px hay không
  isSmallScreen(): boolean {
    return this.document.documentElement.clientWidth <= 800;
  }

  // Thêm sự kiện lắng nghe cho sự thay đổi kích thước cửa sổ
  addResizeListener(): void {
    window.addEventListener('resize', () => {
      this.checkScreenWidth();
    });
  }

  // Mã cho hàm mở dialog để đăng xuất
  openDialog(): void {
    this.dialog.open(LogoutComponent, {
      width: '350px',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
  }

  //mở form đổi mật khẩu
  DoiMatKhau() {
    this.OpenFormDMK();
  }
  OpenFormDMK() {
    var _popup = this.dialog.open(ChangepassComponent, {
      width: '40%',
      enterAnimationDuration: '300ms',
      exitAnimationDuration: '300ms',
    });
    _popup.afterClosed().subscribe((item) => {
      // console.log(item)
    });
  }
}
