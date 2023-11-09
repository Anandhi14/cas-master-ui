import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GoalsComponent } from './goals.component';

fdescribe('GoalsComponent', () => {
  let component: GoalsComponent;
  let fixture: ComponentFixture<GoalsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoalsComponent],
    });

    fixture = TestBed.createComponent(GoalsComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize menuItems', () => {
    expect(component.menuItems).toEqual([
      { label: 'Definitions', url: '#/definitions', target: '_self' },
      { label: 'Goals', url: '#/definitions/goals', target: '_self' },
    ]);
  });

 

  it('should update fileName when fileChange is called', () => {
    const fileName = 'example.txt';
    const event = {
      target: {
        files: [{ name: fileName }],
      },
    };
    component.fileChange(event);
    expect(component.fileName).toBe(fileName);
  });

  it('ngAfterViewInit should log processDetailPopup', () => {
    const consoleSpy = spyOn(console, 'log');
    component.ngAfterViewInit();
    expect(consoleSpy).toHaveBeenCalledWith(component.processDetailPopup);
  });
  it('should initialize goalValues with 14 items in ngOnInit', () => {
    component.ngOnInit();
    expect(component.goalValues.length).toBe(14);
    
    // You can also check the structure of the initialized items
    const expectedItem = { period: '_', ltl: null, ll: null, goal: null, ul: null, utl: null };
    for (const item of component.goalValues) {
      expect(item).toEqual(expectedItem);
    }
  });
});
