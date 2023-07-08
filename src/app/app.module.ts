import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { MenuComponent } from './layouts/menu/menu.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './util/material.module';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { ThietbiComponent } from './modules/danhmuc/thietbi/thietbi.component';
import { NentangComponent } from './modules/danhmuc/nentang/nentang.component';
import { QuanlysubnetComponent } from './modules/danhmuc/quanlysubnet/quanlysubnet.component';
import { QuanlygoiComponent } from './modules/quanlygoi/quanlygoi.component';
import { NangcapthietbiComponent } from './modules/nangcapthietbi/nangcapthietbi.component';
import { NhatkyComponent } from './modules/nhatky/nhatky.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { MainLayoutComponent } from './layouts/main_layout.component';

import { LogoutComponent } from './auth/logout/logout.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { httpInterceptorProviders } from './data/_helpers/http.interceptor';
import { HttpClientModule } from '@angular/common/http';

import { BreadcrumbsComponent } from './layouts/breadcrumbs/breadcrumbs.component';

import { BackToTopComponent } from './layouts/back-to-top/back-to-top.component';
//thông báo
import { ToastrModule } from 'ngx-toastr';
import { InfoComponent } from './modules/nhatky/info/info.component';
import { TbChitietComponent } from './modules/danhmuc/thietbi/tb-chitiet/tb-chitiet.component';
import { MapComponent } from './modules/map/map.component';
import { ChitietgoiComponent } from './modules/quanlygoi/chitietgoi/chitietgoi.component';
import { PopupComponent } from './modules/quanlygoi/popup/popup.component';
import { ChangepassComponent } from './auth/changepass/changepass.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    DashboardComponent,
    ThietbiComponent,
    NentangComponent,
    QuanlysubnetComponent,
    QuanlygoiComponent,
    PopupComponent,
    NangcapthietbiComponent,
    NhatkyComponent,
    HomeComponent,
    LoginComponent,
    MainLayoutComponent,
    LogoutComponent,
    BreadcrumbsComponent,
    BackToTopComponent,
    InfoComponent,
    TbChitietComponent,
    MapComponent,
    ChitietgoiComponent,
    ChangepassComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 1500 // Thiết lập thời gian hiển thị là 1,5 giây
    }),
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
