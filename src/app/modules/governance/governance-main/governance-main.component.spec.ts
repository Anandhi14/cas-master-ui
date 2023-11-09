import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GovernanceMainComponent } from './governance-main.component';
import { GovernanceService } from '../services/governance.service';
import { of } from 'rxjs';

fdescribe('GovernanceMainComponent', () => {
  let component: GovernanceMainComponent;
  let fixture: ComponentFixture<GovernanceMainComponent>;
  let governanceService: jasmine.SpyObj<GovernanceService>;

  beforeEach(() => {
    governanceService = jasmine.createSpyObj('GovernanceService', ['getProcessCount', 'getMetricsCount']);

    TestBed.configureTestingModule({
      declarations: [GovernanceMainComponent],
      providers: [
        { provide: GovernanceService, useValue: governanceService },
      ],
    });

    fixture = TestBed.createComponent(GovernanceMainComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize loader to false', () => {
    expect(component.loader).toBe(false);
  });

  it('should initialize ItemList and ItemList1 as empty arrays', () => {
    expect(component.ItemList).toEqual([]);
    expect(component.ItemList1).toEqual([]);
  });

  it('should call getProcessCount and getMetricsCount on ngOnInit', () => {
    governanceService.getProcessCount.and.returnValue(of({ name: 'ProcessCount' }));
    governanceService.getMetricsCount.and.returnValue(of({ name: 'MetricsCount' }));

    component.ngOnInit();

    expect(governanceService.getProcessCount).toHaveBeenCalled();
    expect(governanceService.getMetricsCount).toHaveBeenCalled();

    expect(component.ItemList).toEqual([{ name: 'MetricsCount' }, { name: 'ProcessCount' }]);
  });

  it('sortItemList1Alphabetically should sort the list alphabetically', () => {
    const list = [{ name: 'C' }, { name: 'A' }, { name: 'B' }];
    component.sortItemList1Alphabetically(list);
    expect(list).toEqual([{ name: 'A' }, { name: 'B' }, { name: 'C' }]);
  });
});
