import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailsPopupComponent } from './user-details-popup.component';

describe('UserDetailsPopupComponent', () => {
  let component: UserDetailsPopupComponent;
  let fixture: ComponentFixture<UserDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserDetailsPopupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
