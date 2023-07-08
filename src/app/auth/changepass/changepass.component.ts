import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/data/_services/auth.service';
import { StorageService } from 'src/app/data/_services/storage.service';

@Component({
  selector: 'app-changepass',
  templateUrl: './changepass.component.html',
  styleUrls: ['./changepass.component.css'],
})
export class ChangepassComponent {
  invalidPass =false;
  invalidPassOld =false;
  userId: string='';
  username: string='';
  token: string='';
  constructor(
    private dialogRef: MatDialogRef<ChangepassComponent>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthService,
    private storageService: StorageService
  ) {}
  showMatKhauMoi: boolean = false;
  showXnMatKhau: boolean = false;
  showMatKhauCu: boolean = false;
  toggleMatKhauMoi() {
    this.showMatKhauMoi = !this.showMatKhauMoi;
  }
  toggleXnMatKhau() {
    this.showXnMatKhau = !this.showXnMatKhau;
  }
  toggleMatKhauCu() {
    this.showMatKhauCu = !this.showMatKhauCu;
  }
  get formControls() {
    return this.myform.controls;
  }
  ngOnInit(): void {
    const user = this.storageService.getUser();
    this.token = user.access_token;
    // this.auth.getUserInfo(user.access_token)
    this.auth.getUserInfo(this.token).subscribe({
      next: data => {
        this.userId = data.sub
        this.username = data.preferred_username
      },
      error: err => {
        console.log(err)
      }
    });
  }

  closePopup() {
    this.dialogRef.close('Closed using function');
  }

  myform = this.formBuilder.group({
    matKhauCu: ['', Validators.required],
    matKhauMoi: ['', Validators.required],
    xnMatKhau: ['', Validators.required],
  });

  savePass() {
    if (this.myform.valid) {
      if (this.myform.value.matKhauMoi !== this.myform.value.xnMatKhau) {
        this.invalidPass = true;
      } else {
        this.auth.login(this.username, this.myform.value.matKhauCu as string).subscribe({
          next: data => {
            this.auth.resetPassword(this.userId, this.myform.value.matKhauMoi as string, this.token ).subscribe({
              next: data => {
                this.toastr.success("Đổi mật khẩu thành công")
                this.closePopup()
              },
              error: err => {
                console.log(err)
              }
            });
          },
          error: err => {
            this.invalidPassOld=true;
            console.log(err)
          }
        });

      }
    } else {
      this.myform.markAllAsTouched();
    }
  }
}
