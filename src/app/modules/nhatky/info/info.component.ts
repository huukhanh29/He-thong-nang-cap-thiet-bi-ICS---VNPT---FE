import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NhatKyService } from 'src/app/data/_services/nhatky.service';

@Component({
  selector: 'app-popup-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent {
  nhatKy: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<InfoComponent>,
    private nhatKyService: NhatKyService
  ) {}
  ngOnInit(): void {
    this.layNhatKy(this.data.id);
  }

  layNhatKy(id: any) {
    this.nhatKyService.LayNhatKy(id).subscribe((nhatKyData) => {
      this.nhatKy = nhatKyData;
      console.log(nhatKyData)
    });
  }
  closePopup() {
    this.dialogRef.close();
  }
}
