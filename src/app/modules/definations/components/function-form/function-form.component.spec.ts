import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FunctionFormComponent } from './function-form.component';
import { ProcessService } from 'src/app/modules/governance/services/process.service';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

class MockProcessService {
  getFunctioList() {
    return of([{ id: 1, name: 'Function 1' }]);
  }

  getsubFunctioList(id: number) {
    return of([{ id: 1, name: 'Subfunction 1' }]);
  }
}

fdescribe('FunctionFormComponent', () => {
  let component: FunctionFormComponent;
  let fixture: ComponentFixture<FunctionFormComponent>;
  let processService: ProcessService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FunctionFormComponent],
      providers: [
        ProcessService,
        { provide: ProcessService, useClass: MockProcessService },
      ],
      imports: [HttpClientModule],
    });
    fixture = TestBed.createComponent(FunctionFormComponent);
    component = fixture.componentInstance;
    processService = TestBed.inject(ProcessService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getsubFunctioList when shouldShowExpandedIcon is called', () => {
    const rowData = { id: 1 };
    spyOn(processService, 'getsubFunctioList').and.returnValue(of([{ name: 'Subfunction 1' }]));

    component.shouldShowExpandedIcon(rowData);

    expect(processService.getsubFunctioList).toHaveBeenCalledWith(1);
    expect(component.expandedRowId).toBe(1);
    expect(component.subgrouplist).toEqual(['Subfunction 1']);
  });

  it('should reset expandedRowId when shouldShowExpandedIcon is called with the same rowData id', () => {
    component.expandedRowId = 1;
    const rowData = { id: 1 };

    component.shouldShowExpandedIcon(rowData);

    expect(component.expandedRowId).toBe(null);
  });

  it('should not call getsubFunctioList when shouldShowExpandedIcon is called with the same rowData id', () => {
    component.expandedRowId = 1;
    const rowData = { id: 1 };
    spyOn(processService, 'getsubFunctioList');

    component.shouldShowExpandedIcon(rowData);

    expect(processService.getsubFunctioList).not.toHaveBeenCalled();
  });
});
