import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatchComponent } from './add-catch.component';

describe('AddCatchComponent', () => {
  let component: AddCatchComponent;
  let fixture: ComponentFixture<AddCatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCatchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
