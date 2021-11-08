import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFormsTableComponent } from './manage-forms-table.component';

describe('ManageFormsTableComponent', () => {
  let component: ManageFormsTableComponent;
  let fixture: ComponentFixture<ManageFormsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageFormsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFormsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
