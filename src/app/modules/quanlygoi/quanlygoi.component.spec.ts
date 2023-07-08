import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlygoiComponent } from './quanlygoi.component';

describe('QuanlygoiComponent', () => {
  let component: QuanlygoiComponent;
  let fixture: ComponentFixture<QuanlygoiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanlygoiComponent]
    });
    fixture = TestBed.createComponent(QuanlygoiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
