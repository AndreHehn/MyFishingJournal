import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteEntryComponent } from './dialog-delete-entry.component';

describe('DialogDeleteEntryComponent', () => {
  let component: DialogDeleteEntryComponent;
  let fixture: ComponentFixture<DialogDeleteEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogDeleteEntryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogDeleteEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
