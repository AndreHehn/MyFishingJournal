import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { FishingComponent } from './fishing.component';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { MatMenuModule } from '@angular/material/menu';

describe('FishingComponent', () => {
  let component: FishingComponent;
  let fixture: ComponentFixture<FishingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FishingComponent],
      imports: [
        MatDialogModule,
        MatMenuModule,
        RouterModule.forRoot([]),
        AngularFireModule.initializeApp(environment.firebase)
      ],
    })
      .compileComponents();

    fixture = TestBed.createComponent(FishingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
