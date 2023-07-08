import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoiService } from '../../data/_services/goi.service';
import { ThietbiService } from '../../data/_services/thietbi.service';
import { GoiNangCap } from '../quanlygoi/quanlygoi.component';
import { debounceTime } from 'rxjs';
import { thietBiData } from '../danhmuc/thietbi/thietbi.component';
import * as mapboxgl from 'mapbox-gl';
import { MatSelectChange } from '@angular/material/select';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nangcapthietbi',
  templateUrl: './nangcapthietbi.component.html',
  styleUrls: ['./nangcapthietbi.component.css'],
})
export class NangcapthietbiComponent implements OnInit {
  myForm!: FormGroup;
  goiList!: GoiNangCap[];
  deviceList!: thietBiData[];
  validDevices!: thietBiData[];
  inValidDevices!: thietBiData[];
  deviceName: string = '';
  goiName: string = '';
  diachi: string = '';
  device: thietBiData | undefined; // Thêm biến device để lưu thông tin thiết bị
  goi: GoiNangCap | undefined; // Thêm biến goi để lưu thông tin gói nâng cấp
  selectedDevices: thietBiData[] = [];
  goiNangCapId: any;
  isLoading: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private goiService: GoiService,
    private thietBiService: ThietbiService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    mapboxgl!.accessToken =
      'pk.eyJ1IjoiYjE5MTA0ODAiLCJhIjoiY2xpaW12ZjJ5MXZ2ajNqczF4Y2NzYmNrdiJ9.DaXt-2gXJinZeoBDM63rAA';
    this.initializeForm();
    this.loadGoiList();
    this.loadDeviceList();

    this.myForm
      .get('selectedDevice')
      ?.valueChanges.pipe(debounceTime(0))
      .subscribe(() => {
        this.infoThietbi();
      });
    this.myForm
      .get('selectedGoi')
      ?.valueChanges.pipe(debounceTime(0))
      .subscribe(() => {
        this.infoGoi();
      });
  }

  initializeForm(): void {
    this.myForm = this.formBuilder.group({
      selectedDevice: ['', Validators.required],
      selectedGoi: ['', Validators.required],
    });
    this.selectedDevices = []; // Xóa các thiết bị đã chọn khi form được khởi tạo lại
  }

  loadGoiList(): void {
    this.goiService.LayDsGoi().subscribe((data: any) => {
      this.goiList = data;
    });
  }

  loadDeviceList() {
    this.thietBiService.LayDsThietBi().subscribe((data) => {
      this.deviceList = data;
    });
  }

  infoThietbi() {
    const selectedDevices = this.myForm.value.selectedDevice;
    // Xóa các thiết bị không được chọn khỏi mảng selectedDevices
    this.selectedDevices = this.selectedDevices.filter(device => selectedDevices.includes(device.id));
    // Thêm các thiết bị được chọn vào mảng selectedDevices nếu chưa tồn tại
    for (const deviceId of selectedDevices) {
      const isDeviceSelected = this.selectedDevices.some(item => item.id === deviceId);
      if (!isDeviceSelected) {
        this.device = this.deviceList.find(item => item.id === deviceId);
        if (this.device) {
          this.selectedDevices.push(this.device);
          this.layDiaChi(parseFloat(this.device!.kinhDo), parseFloat(this.device!.viDo));
        }
      }
    }
  }

  infoGoi() {
    const selectedGoi = this.myForm.value.selectedGoi;
    this.goi = this.goiList.find((item) => item.id === selectedGoi);
  }

  // Hàm lấy địa chỉ của vị trí
  async layDiaChi(longitude: number, latitude: number): Promise<void> {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const place = data.features[0];
      if (place && place.place_name) {
        this.diachi = place.place_name;
      }
    } catch (error) {
      console.error('Error during reverse geocoding:', error);
    }
  }

  removeDevice(device: thietBiData) {
    const index = this.selectedDevices.indexOf(device);
    if (index !== -1) {
      this.selectedDevices.splice(index, 1);

      // Xóa tùy chọn từ form control khi người dùng nhấn xóa
      const selectedDeviceControl = this.myForm.get('selectedDevice');
      if (selectedDeviceControl) {
        const selectedDevices = selectedDeviceControl.value.filter((deviceId: number) => deviceId !== device.id);
        selectedDeviceControl.setValue(selectedDevices);
      }
    }
  }

  onGoiSelectionChange(event: MatSelectChange): void {
    this.goiNangCapId = event.value;
  }
  onSubmit(): void {
    if (this.myForm.valid) {
      const selectedDeviceIds = this.selectedDevices.map((device) => device.id);
      const data = {
        thietBiId: selectedDeviceIds,
        goiNangCapId: this.goiNangCapId,
      };
      this.isLoading = true; // Hiển thị spinner
      this.thietBiService.NangCapThietBi(data).subscribe((res) => {
        console.log(res);
        this.isLoading = false;
        this.toastr.success('Nâng cấp thành công!');
        // Lọc danh sách ID thiết bị hợp lệ
        const validDeviceIds = selectedDeviceIds.filter(
          (deviceId) => !res.khongHopLe.includes(deviceId)
        );

        // Lấy danh sách thiết bị hợp lệ từ selectedDevices
        this.validDevices = this.selectedDevices.filter((device) =>
          validDeviceIds.includes(device.id)
        );
         // Lấy danh sách thiết bị không hợp lệ từ selectedDevices
        this.inValidDevices = this.selectedDevices.filter((device) =>
          !validDeviceIds.includes(device.id)
        );
        // console.log('Danh sách thiết bị không hợp lệ:', inValidDevices);
        // console.log('Danh sách thiết bị hợp lệ:', validDevices);
      });
    }
  }
}
