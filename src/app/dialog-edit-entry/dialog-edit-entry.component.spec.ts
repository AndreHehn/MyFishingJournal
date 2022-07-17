import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditEntryComponent } from './dialog-edit-entry.component';

describe('DialogEditEntryComponent', () => {
  let component: DialogEditEntryComponent;
  let fixture: ComponentFixture<DialogEditEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogEditEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
