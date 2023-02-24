import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowingsComponent } from './admin-showings.component';

describe('AdminShowingsComponent', () => {
  let component: AdminShowingsComponent;
  let fixture: ComponentFixture<AdminShowingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShowingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShowingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
