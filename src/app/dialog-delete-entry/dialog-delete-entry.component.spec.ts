import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatDialogRef } from '@angular/material/dialog';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

import { DialogDeleteEntryComponent } from './dialog-delete-entry.component';

describe('DialogDeleteEntryComponent', () => {
  let component: DialogDeleteEntryComponent;
  let fixture: ComponentFixture<DialogDeleteEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDeleteEntryComponent],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot([])
      ],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      }]
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
