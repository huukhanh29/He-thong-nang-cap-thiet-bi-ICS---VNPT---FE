import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanlysubnetComponent } from './quanlysubnet.component';

describe('QuanlysubnetComponent', () => {
  let component: QuanlysubnetComponent;
  let fixture: ComponentFixture<QuanlysubnetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuanlysubnetComponent]
    });
    fixture = TestBed.createComponent(QuanlysubnetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
