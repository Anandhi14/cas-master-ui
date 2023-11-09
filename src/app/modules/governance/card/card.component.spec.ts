import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

fdescribe('CardComponent', () => {
  let component: CardComponent;
  let fixture: ComponentFixture<CardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardComponent],
      providers: [],
      imports: [RouterTestingModule], // Import RouterTestingModule to mock the Router
    }).compileComponents();

    fixture = TestBed.createComponent(CardComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to persona when child item is clicked from the home page', () => {
    component.page = 'home';
    const router = TestBed.inject(Router);
    const navigateSpy = spyOn(router, 'navigate');

    component.childIteamClik('Governance');
    expect(navigateSpy).toHaveBeenCalledWith(['persona']);
  });

  // Add more test cases to cover other navigation scenarios.

  xit('should emit cardClicked event when onNameClick is called', () => {
    const item = { name: 'Sample Item', level: 1 };
    spyOn(component.cardClicked, 'emit');
    component.onNameClick(item);
    expect(component.cardClicked.emit).toHaveBeenCalledWith({ item, page: component.page });
  });
});
