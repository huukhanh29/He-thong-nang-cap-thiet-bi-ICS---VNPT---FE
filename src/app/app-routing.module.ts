import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ThietbiComponent } from './modules/danhmuc/thietbi/thietbi.component';
import { NentangComponent } from './modules/danhmuc/nentang/nentang.component';
import { QuanlygoiComponent } from './modules/quanlygoi/quanlygoi.component';
import { NangcapthietbiComponent } from './modules/nangcapthietbi/nangcapthietbi.component';
import { NhatkyComponent } from './modules/nhatky/nhatky.component';
import { HomeComponent } from './modules/home/home.component';
import { QuanlysubnetComponent } from './modules/danhmuc/quanlysubnet/quanlysubnet.component';
import { MainLayoutComponent } from './layouts/main_layout.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { MapComponent } from './modules/map/map.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: HomeComponent, data: { titulo: 'Trang chủ' }},
      { path: 'home', component: HomeComponent, data: { titulo: 'Trang chủ', breadcrumbs: [{ label: 'Trang chủ', url: '/' }] } },
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard', breadcrumbs: [{ label: 'Dashboard', url: '/' }] } },
      { path: 'thietbi', component: ThietbiComponent, data: { titulo: 'Danh mục Thiết bị' } },
      { path: 'nentang', component: NentangComponent, data: { titulo: 'Danh mục Nền tảng' } },
      { path: 'quanlysubnet', component: QuanlysubnetComponent, data: { titulo: 'Quản lý Subnet' } },
      { path: 'quanlygoi', component: QuanlygoiComponent, data: { titulo: 'Quản lý gói' } },
      { path: 'nangcapthietbi', component: NangcapthietbiComponent, data: { titulo: 'Nâng cấp thiết bị' } },
      { path: 'nhatky', component: NhatkyComponent, data: { titulo: 'Nhật ký nâng cấp' } },
      { path: 'bando', component: MapComponent, data: { titulo: 'Bản đồ thiết bị' } },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,

  },
  {
    path: 'logout',
    component: LogoutComponent,

  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
