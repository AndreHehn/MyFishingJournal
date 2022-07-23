import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditEntryComponent } from './dialog-edit-entry.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MatDialogRef } from '@angular/material/dialog';

describe('DialogEditEntryComponent', () => {
  let component: DialogEditEntryComponent;
  let fixture: ComponentFixture<DialogEditEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogEditEntryComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
      ],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      }]
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
