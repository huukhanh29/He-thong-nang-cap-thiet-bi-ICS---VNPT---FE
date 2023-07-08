import { NenTangService } from './../../../data/_services/nentang.service';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { GoiService } from '../../../data/_services/goi.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {
  nenTangList: any[] = [];
  selectedNenTang: any;
  isFileRequiredError = false;
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  constructor(
    private dialogRef: MatDialogRef<PopupComponent>,
    private formBuilder: FormBuilder,
    private goiService: GoiService,
    private nenTangService: NenTangService,
    private toastr: ToastrService
  ) {}

  get formControls() {
    return this.myform.controls;
  }

  ngOnInit(): void {
    this.layDsNenTang();
  }
  layDsNenTang(){
    this.nenTangService.LayDsNenTang().subscribe((data: any) => {
      this.nenTangList = data; // Lưu danh sách Nền tảng vào biến nenTangList
    });
  }

  closePopup() {
    this.dialogRef.close('Closed using function');
  }

  myform = this.formBuilder.group({
    tenGoi: ['', Validators.required],
    noiLuu: ['', Validators.required],
    moTa: ['', Validators.required],
    phienBan: ['', Validators.required],
    nenTangId: ['', Validators.required],
    file: [null as File | null]
  });

  saveGoiNangCap() {
    if (this.myform.valid) {
      const formData = new FormData();
      formData.append('tenGoi', this.myform.value.tenGoi as string);
      formData.append('noiLuu', this.myform.value.noiLuu as string);
      formData.append('moTa', this.myform.value.moTa as string);
      formData.append('phienBan', this.myform.value.phienBan as string);
      formData.append('nenTangId', this.myform.value.nenTangId as string);
      const file = this.myform.get('file')!.value;
      if (file) {
        formData.append('file', file);
        this.isFileRequiredError = false;
        this.goiService.ThemGoi(formData).subscribe(() => {
          this.closePopup();
          this.toastr.success("Thêm gói nâng cấp thành công!")
        });
      } else {
        this.isFileRequiredError = true;
      }
    } else {
      this.myform.markAllAsTouched();
    }
  }

  uploadFile(fileInput: HTMLInputElement) {
    const file: File | null = fileInput.files![0];
    if (file) {
      this.myform.patchValue({ file });
    }
  }
}
