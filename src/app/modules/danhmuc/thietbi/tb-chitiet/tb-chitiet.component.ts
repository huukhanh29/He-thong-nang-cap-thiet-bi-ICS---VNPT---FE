
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ThietbiService } from 'src/app/data/_services/thietbi.service';


@Component({
  selector: 'app-tb-chitiet',
  templateUrl: './tb-chitiet.component.html',
  styleUrls: ['./tb-chitiet.component.css']
})
export class TbChitietComponent {
  thietbi: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<TbChitietComponent>,
    private thietBiService: ThietbiService
  ) { }

  ngOnInit(): void {

    this.layThietBi(this.data.id);
  }

  layThietBi(id: any) {
    this.thietBiService.LayDsThietBi().subscribe((thietBiData) => {
      this.thietbi = thietBiData.find((x: { id: any; }) => x.id === id);
    });
  }

  closePopup() {
    this.dialogRef.close();
  }
}
