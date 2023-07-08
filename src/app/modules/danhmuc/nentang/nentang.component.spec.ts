import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NentangComponent } from './nentang.component';

describe('NentangComponent', () => {
  let component: NentangComponent;
  let fixture: ComponentFixture<NentangComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NentangComponent]
    });
    fixture = TestBed.createComponent(NentangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
