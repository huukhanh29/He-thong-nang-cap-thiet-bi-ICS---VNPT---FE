import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NangcapthietbiComponent } from './nangcapthietbi.component';

describe('NangcapthietbiComponent', () => {
  let component: NangcapthietbiComponent;
  let fixture: ComponentFixture<NangcapthietbiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NangcapthietbiComponent]
    });
    fixture = TestBed.createComponent(NangcapthietbiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
