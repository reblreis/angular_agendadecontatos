import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContactsComponent } from './edit-contacts.component';

describe('EditContactsComponent', () => {
  let component: EditContactsComponent;
  let fixture: ComponentFixture<EditContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditContactsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
