import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlikComponent } from './blik.component';

describe('BlikComponent', () => {
  let component: BlikComponent;
  let fixture: ComponentFixture<BlikComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlikComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlikComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
