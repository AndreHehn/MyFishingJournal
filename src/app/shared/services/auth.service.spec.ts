import { TestBed } from '@angular/core/testing';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterModule } from '@angular/router';
import { environment } from 'src/environments/environment';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({

      imports: [AngularFireModule.initializeApp(environment.firebase), RouterModule.forRoot([])]
    })


      .compileComponents();

    service = TestBed.inject(AuthService);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
