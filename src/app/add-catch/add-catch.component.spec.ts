import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AddCatchComponent } from './add-catch.component';

describe('AddCatchComponent', () => {
  let component: AddCatchComponent;
  let fixture: ComponentFixture<AddCatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCatchComponent ],
      imports: [
        AngularFireModule.initializeApp(environment.firebase),
        RouterModule.forRoot([])
      ],
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
