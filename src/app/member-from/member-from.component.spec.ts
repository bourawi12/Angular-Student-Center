import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberFromComponent } from './member-from.component';

describe('MemberFromComponent', () => {
  let component: MemberFromComponent;
  let fixture: ComponentFixture<MemberFromComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberFromComponent]
    });
    fixture = TestBed.createComponent(MemberFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
