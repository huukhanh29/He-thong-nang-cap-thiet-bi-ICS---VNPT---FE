import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as mapboxgl from 'mapbox-gl';
import { ThietbiService } from 'src/app/data/_services/thietbi.service';
import { thietBiData } from '../danhmuc/thietbi/thietbi.component';
import MapboxLanguage from '@mapbox/mapbox-gl-language';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit, AfterViewInit, OnDestroy {
  map!: mapboxgl.Map;
  marker!: mapboxgl.Marker;
  markerImage = 'https://img.icons8.com/?size=512&id=lPhhD1Q9YkT2&format=png';
  locationName = '';
  locationCoordinates: number[] = [];
  data: thietBiData[] = [];
  popup: mapboxgl.Popup | null = null;
  currentMarker: mapboxgl.Marker | null = null;
  addingLocation: boolean = false;
  buttonName: string = 'Add Location';
  address!: string;

  constructor(
    private http: HttpClient,
    private thietBiService: ThietbiService,
  ) { }

  ngOnInit() {
    mapboxgl!.accessToken =
      'pk.eyJ1IjoiYjE5MTA0ODAiLCJhIjoiY2xpaW12ZjJ5MXZ2ajNqczF4Y2NzYmNrdiJ9.DaXt-2gXJinZeoBDM63rAA';
    this.getLocations();
  }

  ngAfterViewInit() {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v12',
      zoom: 12,
    });

    // Lấy vị trí hiện tại
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      // Thay thế vị trí hiện tại vào center của bản đồ
      this.map.setCenter([longitude, latitude]);
    });

    // Tắt popup nếu không phải marker
    this.map.on('click', (event) => {
      const targetElement = event.originalEvent.target as HTMLElement;
      const isMarker = targetElement.closest('.mapboxgl-marker');
      if (!isMarker) {
        this.removePopup();
      }
    });

    // Đổi ngôn ngữ bản đồ
    this.map.addControl(new MapboxLanguage({
      defaultLanguage: 'vi'
    }));
  }

  ngOnDestroy() {
    this.map.remove();
  }

  getLocations() {
    this.thietBiService.LayDsThietBi().subscribe((data) => {
      this.data = data;
      this.displayLocationsOnMap();
    });
  }

  displayLocationsOnMap() {
    this.data.forEach((data) => {
      if (data.kinhDo && data.viDo) {
        const coordinates = new mapboxgl.LngLat(
          parseFloat(data.kinhDo),
          parseFloat(data.viDo)
        );
        const element = document.createElement('div');
        element.className = 'custom-marker';
        element.style.backgroundImage = `url(${this.markerImage})`;
        element.style.backgroundSize = 'cover';
        element.style.width = '30px';
        element.style.height = '30px';
        const marker = new mapboxgl.Marker({
          element: element,
          color: '#F84C4C' // color it red
        })
          .setLngLat(coordinates)
          .addTo(this.map);
        marker.getElement()?.addEventListener('click', () => {
          this.removePopup();
          this.createPopupInfo(coordinates, data.ten, data.serial);
        });
      }
    });
  }

  removePopup() {
    if (this.popup) {
      this.popup.remove();
      this.popup = null;
    }
  }

  createPopupInfo(coordinates: mapboxgl.LngLat, ten: string, serial: string) {
    this.removePopup();

    this.popup = new mapboxgl.Popup({
      closeOnClick: false,
      offset: 25
    })
      .setLngLat(coordinates)
      .setHTML(
        `<p>${ten}</p>
        <p>${serial}</p>`
      )
      .addTo(this.map);
  }

}
