import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NhatkyComponent } from './nhatky.component';

describe('NhatkyComponent', () => {
  let component: NhatkyComponent;
  let fixture: ComponentFixture<NhatkyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NhatkyComponent]
    });
    fixture = TestBed.createComponent(NhatkyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
