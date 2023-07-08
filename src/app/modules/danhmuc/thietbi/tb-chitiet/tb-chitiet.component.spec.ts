import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbChitietComponent } from './tb-chitiet.component';

describe('TbChitietComponent', () => {
  let component: TbChitietComponent;
  let fixture: ComponentFixture<TbChitietComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TbChitietComponent]
    });
    fixture = TestBed.createComponent(TbChitietComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
