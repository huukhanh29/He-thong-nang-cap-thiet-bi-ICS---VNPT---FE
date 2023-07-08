import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InfoComponent } from '../../nhatky/info/info.component';
import { GoiService } from 'src/app/data/_services/goi.service';

@Component({
  selector: 'app-chitietgoi',
  templateUrl: './chitietgoi.component.html',
  styleUrls: ['./chitietgoi.component.css']
})
export class ChitietgoiComponent {
  goi: any;
  file: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InfoComponent>,
    private goiService: GoiService
  ) {}
  ngOnInit(): void {
    this.layGoi(this.data.id);
    this.layThongTinFile(this.data.id)
  }

  layGoi(id: any) {
    this.goiService.LayGoi(id).subscribe((goiData) => {
      this.goi = goiData;
    });
  }
  layThongTinFile(id: any){
    this.goiService.ThongTinFile(id).subscribe((file) => {
      this.file = file;
    });
  }
  closePopup() {
    this.dialogRef.close();
  }
}
