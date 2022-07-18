import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigFishComponent } from './big-fish.component';

describe('BigFishComponent', () => {
  let component: BigFishComponent;
  let fixture: ComponentFixture<BigFishComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigFishComponent ]
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
