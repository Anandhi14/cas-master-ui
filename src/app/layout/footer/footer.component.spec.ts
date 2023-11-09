import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

fdescribe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FooterComponent],
    });

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize displayDialog as false', () => {
    expect(component.displayDialog).toBeFalse();
  });

  it('should initialize loader as false', () => {
    expect(component.loader).toBeFalse();
  });

  it('should set loader to true and displayDialog to true when showDialog is called', () => {
    component.showDialog();
    expect(component.displayDialog).toBeTrue();
    expect(component.loader).toBeTrue();
  });

  it('should set loader to false when onPrivacyPolicyLinkLoaded is called', () => {
    component.loader = true; 
    component.onPrivacyPolicyLinkLoaded();
    expect(component.loader).toBeFalse();
  });
});
