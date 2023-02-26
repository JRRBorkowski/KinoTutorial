import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowingFormComponent } from './admin-showing-form.component';

describe('AdminShowingFormComponent', () => {
  let component: AdminShowingFormComponent;
  let fixture: ComponentFixture<AdminShowingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShowingFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminShowingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
