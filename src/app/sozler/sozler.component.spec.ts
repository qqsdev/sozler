import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SozlerComponent } from './sozler.component';

describe('SozlerComponent', () => {
  let component: SozlerComponent;
  let fixture: ComponentFixture<SozlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SozlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SozlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
