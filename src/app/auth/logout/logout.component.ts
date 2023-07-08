import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import {  ToastrService } from 'ngx-toastr';
import { StorageService } from 'src/app/data/_services/storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  constructor(
    public dialogRef: MatDialogRef<LogoutComponent>,
        private storageService: StorageService,
        private router: Router, private toastr: ToastrService
  ) {}
  closedialog() {
    this.dialogRef.close('Closed using function');
  }
  accept() {
    this.storageService.signOut();
    this.toastr.success("Bạn đã đăng xuất!")
  }
}
