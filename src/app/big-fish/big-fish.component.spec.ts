import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { BigFishComponent } from './big-fish.component';

describe('BigFishComponent', () => {
  let component: BigFishComponent;
  let fixture: ComponentFixture<BigFishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigFishComponent ],
      imports: [
        MatDialogModule,
        AngularFireModule.initializeApp(environment.firebase)
      ],
      providers: [{
        provide: MatDialogRef,
        useValue: {}
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigFishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
