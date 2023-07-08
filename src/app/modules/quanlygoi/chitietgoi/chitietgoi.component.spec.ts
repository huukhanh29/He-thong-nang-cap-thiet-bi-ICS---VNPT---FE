import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChitietgoiComponent } from './chitietgoi.component';

describe('ChitietgoiComponent', () => {
  let component: ChitietgoiComponent;
  let fixture: ComponentFixture<ChitietgoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChitietgoiComponent]
    });
    fixture = TestBed.createComponent(ChitietgoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
